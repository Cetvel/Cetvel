import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    // Eğer MongoDB zaten bağlıysa, tekrar bağlantı kurma
    if (mongoose.connection.readyState === 1) {
        console.log('MongoDB already connected');
        return;
    }

    // MONGO_URI environment variable'ı kontrol edilmelidir
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not defined');
    }

    // Bağlantı ayarları
    const options = {
        maxPoolSize: 10, // Maksimum bağlantı havuzu boyutu
        minPoolSize: 5,  // Minimum bağlantı havuzu boyutu
        socketTimeoutMS: 45000, // Bağlantı zaman aşımı
        connectTimeoutMS: 30000, // Bağlantı kurulum süresi
    };

    try {
        // Bağlantı kur
        await mongoose.connect(process.env.MONGO_URI, options);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); // Bağlantı kurulamazsa uygulama sonlanır
    }

    // Bağlantı hatası
    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });

    // Bağlantı kesildiğinde
    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
    });

    // Uygulama kapatıldığında bağlantıyı kapat
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
};

export default connectDB;
