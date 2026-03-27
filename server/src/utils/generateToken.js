import jwt from "jsonwebtoken";
import env from "../config/validateEnv.js";

const generateTokenSetCookie = (res, userId) => {
    const token = jwt.sign({ userId },
        env.JWT_SECRET,
        { expiresIn: env.JWT_EXPIRES_IN })

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 15 * 24 * 60 * 60 * 1000,
    })

    return token;
};

export default generateTokenSetCookie;