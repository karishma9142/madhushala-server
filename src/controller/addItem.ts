
import type { Request, Response } from "express";
import { ItemModel } from "../model/item.js";
import { z } from "zod";

export const verify = z.object({
    title: z.string().min(1).max(100),
    price: z.number().min(0),
    originalPrice: z.number().min(0).optional(),
    description: z.string().min(1),
    image: z.string().min(1),
    rating: z.number().min(0).max(5).default(0),
    quantity: z.number().min(0).default(0),
    brand: z.string().min(1).max(100),
    category: z.enum([
        "Wine", "Whiskey", "Vodka", "Beer",
        "Rum", "Gin", "Other"
    ]),
    volume: z.number().min(1),
    alcoholPercentage: z.number().min(0).max(100),
    countryOfOrigin: z.string().min(1),
    isFeatured: z.boolean().default(false),
    isOnSale: z.boolean().default(false),
    sku: z.string().min(1).trim()
});

export const AddItem = async (req: Request, res: Response) => {
    try {
        const result = verify.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                msg: result.error.issues
            });
        }

        const {
            title, price, description, image, rating,
            quantity, brand, category, volume,
            alcoholPercentage, countryOfOrigin,
            originalPrice, isFeatured, isOnSale, sku
        } = result.data;

        const existingItem = await ItemModel.findOne({ sku });

        if (existingItem) {
            return res.status(409).json({
                msg: "Item with this SKU already exists"
            });
        }

        const item = await ItemModel.create({
            title,
            price,
            description,
            image,
            rating,
            quantity,
            brand,
            category,
            volume,
            alcoholPercentage,
            countryOfOrigin,
            ...(originalPrice !== undefined && { originalPrice }),
            isFeatured,
            isOnSale,
            sku
        });

        return res.status(201).json({
            msg: "Item added successfully",
            item
        });

    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};
