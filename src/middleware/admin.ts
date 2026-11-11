import type { NextFunction, Request, Response } from "express";
import type { IUser } from "../model/user.js";

export interface AuthenticatedRequest extends Request{
    user?: IUser | null
}
const Admin = async (req:AuthenticatedRequest , res:Response , next : NextFunction) => {
    try {
        const user = req.user;

        if (!user || user.role !== "admin") {
            return res.status(403).json({
                msg: "Not authorized for this request"
            });
        }

        next();

    } catch (error) {
         res.status(500).json({
            msg : "please login - jwt error"
        })
    }
}

export default Admin;