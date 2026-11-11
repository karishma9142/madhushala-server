import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    "username": {
        type: String,
        required: true
    },
    "password": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["admin", "customer"],
        default: "customer"
    }
});
export const UserModer = mongoose.model('user', userSchema);
//# sourceMappingURL=user.js.map