import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        // Eğer bağlantı zaten açık ise tekrar bağlanma
        if (mongoose.connection.readyState === 1) {
            console.log('MongoDB is already connected');
            return;
        }

        // MONGO_URI çevre değişkeni kontrolü
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in the environment variables');
        }

        // Mongoose bağlantı ayarları, connection pool dahil
        const options = {
            maxPoolSize: 10, // Maksimum 10 bağlantıya izin verir
            minPoolSize: 5,  // Minimum 5 bağlantı tutulur
            socketTimeoutMS: 45000, // 45 saniye sonra timeout olur
            connectTimeoutMS: 30000, // Bağlantı için maksimum bekleme süresi
        };

        // Veritabanına bağlan
        await mongoose.connect(process.env.MONGO_URI, options);

        console.log(`MongoDB Connected: ${mongoose.connection.host}`);

        // Hata ve bağlantı olaylarını dinleme
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        // Uygulama kapanırken bağlantıyı düzgün kapatma
        process.on('SIGINT', async () => {
            try {
                await mongoose.connection.close();
                console.log('MongoDB connection closed due to app termination');
                process.exit(0);
            } catch (err) {
                console.error('Error closing MongoDB connection:', err);
                process.exit(1);
            }
        });

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;
