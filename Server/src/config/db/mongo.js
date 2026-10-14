import "dotenv/config";
import mongoose from "mongoose";

const DB_URL = process.env.MONGO_DB_URL || `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/myapp?authSource=admin`;

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(DB_URL);
        }
        console.log(`Connected to mongodb.\nHost : ${mongoose.connection.host}`);
    } catch (err) {
        console.log("Error in mongodb connection");
        console.log("Error : ", err.message);
        process.exit(1);
    }
};

export default connectDB;

