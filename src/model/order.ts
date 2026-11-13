
import mongoose, { Schema } from "mongoose";

interface OrderItem {
    itemId: mongoose.Types.ObjectId;
    title: string;
    price: number;
    quantity: number;
}

export interface IOrder {
    userId: mongoose.Types.ObjectId;
    items: OrderItem[];
    totalAmount: number;
    paymentStatus: "pending" | "paid" | "failed";
    orderStatus: "pending" | "confirmed" | "delivered" | "cancelled";
    deliveryAddress: string;
}

const orderSchema = new Schema<IOrder>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [{
        itemId: {
            type: Schema.Types.ObjectId,
            ref: "Item",
            required: true
        },
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],

    totalAmount: {
        type: Number,
        required: true
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },

    orderStatus: {
        type: String,
        enum: ["pending", "confirmed", "delivered", "cancelled"],
        default: "pending"
    },

    deliveryAddress: {
        type: String,
        required: true
    }

}, { timestamps: true });

export const OrderModel = mongoose.model<IOrder>("Order", orderSchema);
