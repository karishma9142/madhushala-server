import mongoose, { Schema } from "mongoose";

export interface IOrder {
    itemId : mongoose.Types.ObjectId;
    userId : mongoose.Types.ObjectId;
    time : Date;
}

const orderScehma = new Schema<IOrder>({
    itemId : {
        type : mongoose.Types.ObjectId,
        ref : "Item",
        required : true,
    },
    userId :{
        type : mongoose.Types.ObjectId,
        ref : "user",
        required : true,
    },
    time : {
        type : Date,
        default : Date.now()
    }
});

export const OrderModel = mongoose.model("Order" , orderScehma);