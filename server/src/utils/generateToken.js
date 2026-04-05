import jwt from "jsonwebtoken";
import env from "../config/validateEnv.js";

const generateTokenSetCookie = (res, userId) => {
    const token = jwt.sign({ userId },
        env.JWT_SECRET,
        { expiresIn: env.JWT_EXPIRES_IN })

    const isProduction = env.NODE_ENV !== "development";

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "strict",
        maxAge: 15 * 24 * 60 * 60 * 1000,
    })

    return token;
};

export default generateTokenSetCookie;