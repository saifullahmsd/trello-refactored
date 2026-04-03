import app from '../src/app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Cache DB connection across serverless invocations
let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
};

export default async function handler(req, res) {
    await connectDB();
    return app(req, res);
}
