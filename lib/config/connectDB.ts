import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    if (mongoose.connection.readyState === 1) {
        console.log('MongoDB already connected');
        return; // Bağlantı zaten kurulmuşsa, yeni bir bağlantı kurma
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not defined');
    }

    // Bağlantı ayarları
    const options = {
        maxPoolSize: 10,
        minPoolSize: 5,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 30000,
        autoReconnect: true,         // Bağlantı kaybolursa otomatik yeniden bağlan
        reconnectTries: Number.MAX_VALUE, // Yeniden bağlanma için sonsuz deneme sayısı
        reconnectInterval: 5000,     // Bağlantı koparsa her 5 saniyede bir yeniden dene
    };

    try {
        await mongoose.connect(process.env.MONGO_URI, options);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); // Bağlantı kurulamazsa uygulama sonlanır
    }

    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
    });

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
