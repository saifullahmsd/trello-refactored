import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import env from '../config/validateEnv.js';
import logger from '../config/logger.js';

export const protect = async (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    if (token) {
        try {
            // Verify token
            const decoded = jwt.verify(token, env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            logger.error(`Auth Middleware Error: Token Failed - ${error.message}`);
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ error: 'Not authorized, no token provided' });
    }
};
