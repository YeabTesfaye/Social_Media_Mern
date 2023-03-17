import dotenv from 'dotenv'
import mongoose from "mongoose";
dotenv.config()
mongoose.set("strictQuery", false);

const url = process.env.MONGO_URI;
export const CONNECTDB = async () => {
  try {
    const conn = await mongoose.connect(url);
    console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};


