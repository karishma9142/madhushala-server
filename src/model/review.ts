
import mongoose, { Schema } from "mongoose";

export interface IReview {
    userId: mongoose.Types.ObjectId;
    itemId: mongoose.Types.ObjectId;
    comment?: string;
    image?: string;
    rating: number;
}

const reviewSchema = new Schema<IReview>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        required: true
    },
    comment: {
        type: String,
        trim: true
    },
    image: {
        type: String
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
}, {
    timestamps: true
});

reviewSchema.index(
    { userId: 1, itemId: 1 },
    { unique: true }
);

export const ReviewModel = mongoose.model<IReview>("Review", reviewSchema);
