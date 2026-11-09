
import mongoose, { Schema } from "mongoose";

export interface IItem {
    title: string;
    price: number;
    description: string;
    image: string;
    rating: number;
    quantity: number;
    brand: string;
    category: string;
    volume: number;
    alcoholPercentage: number;
    countryOfOrigin: string;
    originalPrice?: number;
    isFeatured: boolean;
    isOnSale: boolean;
    sku: string;
}

const itemSchema = new Schema<IItem>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    originalPrice: {
        type: Number,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ["Wine", "Whiskey", "Vodka", "Beer", "Rum", "Gin", "Other"],
        required: true
    },
    volume: {
        type: Number,
        required: true,
        min: 1
    },
    alcoholPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    countryOfOrigin: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isOnSale: {
        type: Boolean,
        default: false
    },
    sku: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {
    timestamps: true
});

export const ItemModel = mongoose.model<IItem>("Item", itemSchema);
