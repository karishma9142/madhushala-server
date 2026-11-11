import mongoose, { Schema } from "mongoose";

export interface IUser {
    username : string,
    password : string,
    email : string,
    role : string
}

const userSchema = new Schema<IUser>({
    "username" : {
        type : String,
        required : true
    },
    "password" : {
        type : String,
        required : true
    },
    "email" : {
        type : String,
        required : true,
        unique : true
    },
    role: {
    type: String,
    enum: ["admin", "customer"],
    default: "customer"
}
});

export const UserModer = mongoose.model<IUser>('user' , userSchema);