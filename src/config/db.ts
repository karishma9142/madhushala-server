import mongoose from 'mongoose';

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        console.log("mongodb is connected");
    } catch (error) {
        console.log("db connection failed")
    }
}

// export default connectBd();