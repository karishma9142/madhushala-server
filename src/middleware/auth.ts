
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { UserModer } from "../model/user.js";

export const IsAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                msg: "Please login"
            });
            return;
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            res.status(401).json({
                msg: "Token missing"
            });
            return;
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SEC!
        ) as JwtPayload;

        const user = await UserModer.findById(decoded.id);

        if (!user) {
            res.status(401).json({
                msg: "User not found"
            });
            return;
        }

        req.user = {
            _id: user._id.toString(),
            email: user.email,
            role: user.role
        };

        next();

    } catch (error) {
        console.log(error);

        res.status(401).json({
            msg: "Invalid or expired token"
        });
    }
};
