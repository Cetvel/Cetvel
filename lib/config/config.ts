import mongoose from "mongoose";
const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(process.env.MONGO_URI as string, {
            serverSelectionTimeoutMS: 5000,
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error: any) {
        console.error(`Error: ${error.message}`)
    }
}
export default connectDB;

