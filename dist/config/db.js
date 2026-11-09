import mongoose from 'mongoose';
export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("mongodb is connected");
    }
    catch (error) {
        console.log("db connection failed");
    }
};
// export default connectBd();
//# sourceMappingURL=db.js.map