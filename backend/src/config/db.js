import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log("Connect database successfully!")
    } catch (error) {
        console.error("Error when connecting database:", error)
        process.exit(1);
    }
}
