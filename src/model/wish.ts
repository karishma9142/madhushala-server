
import mongoose, { Schema } from "mongoose";

export interface IWish {
    userId: mongoose.Types.ObjectId;
    itemId: mongoose.Types.ObjectId;
}

const wishSchema = new Schema<IWish>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        required: true
    }
}, {
    timestamps: true
});


wishSchema.index(
    { userId: 1, itemId: 1 },
    { unique: true }
);

export const WishModel = mongoose.model<IWish>("Wish", wishSchema);
