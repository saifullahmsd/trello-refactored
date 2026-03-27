import app from './app.js';
import connectDB from './config/database.js';
import logger from './config/logger.js';
import env from './config/validateEnv.js';

let server;

const startServer = async () => {
    try {
        await connectDB();

        server = app.listen(env.PORT, () => {
            logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
        });

    } catch (error) {
        logger.error(`Failed to start server: ${error.message}`);
        process.exit(1);
    }
};

startServer();

const gracefulShutdown = () => {
    logger.info('Shutting down gracefully...');
    if (server) {
        server.close(() => {
            logger.info('HTTP server closed.');
            process.exit(0);
        });
    } else {
        process.exit(0);
    }
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
