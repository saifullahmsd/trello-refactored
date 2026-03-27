import logger from '../config/logger.js';
import env from '../config/validateEnv.js';

export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found. Invalid ID format.';
    }

    logger.error(`[${req.method}] ${req.originalUrl} >> StatusCode:: ${statusCode}, Message:: ${message}`);

    res.status(statusCode).json({
        error: message,
        stack: env.NODE_ENV === 'production' ? null : err.stack,
    });
};
