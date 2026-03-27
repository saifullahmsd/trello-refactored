import { cleanEnv, str, port, url } from 'envalid';
import dotenv from 'dotenv';
dotenv.config();

const env = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
    PORT: port({ default: 5000 }),
    MONGODB_URI: str(),
    JWT_SECRET: str(),
    JWT_EXPIRES_IN: str({ default: '7d' }),
    CORS_ORIGIN: url({ default: 'http://localhost:3000' })
});

export default env;
