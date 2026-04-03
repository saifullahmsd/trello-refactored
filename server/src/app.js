import express from "express";
import helemet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import env from "./config/validateEnv.js";
import logger from './config/logger.js';

import authRoutes from "./routes/authRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
const app = express();

app.use(helemet());
app.use(cors({
    origin: (origin, callback) => {
        const allowed = [
            process.env.CORS_ORIGIN,
            'http://localhost:5173',
            'http://localhost:3000',
        ].filter(Boolean);
        if (!origin || allowed.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan("dev", {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}))


app.get("/api/health", (req, res) => {
    res.status(200).json({ status: 'success', message: "Trello clonning api is running" });
});

app.use("/api/auth", authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/cards', cardRoutes);

app.use(notFound);
app.use(errorHandler);

export default app