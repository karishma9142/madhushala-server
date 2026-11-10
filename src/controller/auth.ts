
import type { Request, Response } from "express";
import { UserModer } from "../model/user.js";
import jwt from "jsonwebtoken";
import { z } from "zod";
import bcrypt from "bcryptjs";

const verify = z.object({
    username: z.string().min(5).max(30),
    password: z.string().min(4).max(20),
    email: z.email()
});

export const register = async (req: Request, res: Response) => {
    try {
        const result = verify.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                msg: result.error.issues
            });
        }

        const { username, password, email } = result.data;

        const isExist = await UserModer.findOne({ email });

        if (isExist) {
            return res.status(400).json({
                msg: "User already exists"
            });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModer.create({
            username,
            password: hashedPassword,
            email
        });

        const secret = process.env.JWT_SEC;

        if (!secret) {
            throw new Error("JWT secret is missing");
        }

        const token = jwt.sign(
            { id: user._id },
            secret,
            { expiresIn: "7d" }
        );

        return res.status(201).json({
            msg: "Registered successfully",
            token
        });

    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};

export const login = async (req : Request , res : Response) => {
    try {
        const {email , password} = req.body();

        if(!email || !password){
            return res.status(400).json({
                msg : "all paramters are requried"
            })
        }

        const findUser = await UserModer.findOne({email : email});

        if(!findUser){
            return res.status(400).json({
                msg : "user does not exist , sign up first please"
            })
        }

        const userPassword = findUser.password;
        if(!bcrypt.compare(userPassword,password)){
            return res.status(400).json({
                msg : "password is wrong"
            })
        }

        const token = jwt.sign(
            {id : findUser._id},
            process.env.JWT_SEC!,
            {expiresIn : "7d"}
        )

        return res.status(201).json({
            msg: "logged in  successfully",
            token
        }); 

    } catch (error : any) {
        console.log(error.message);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
}
