
import type { Request, Response } from "express";
import { OrderModel } from "../model/order.js";
import { ItemModel } from "../model/item.js";

const order = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                msg: "Unauthorized"
            });
        }

        const { items, deliveryAddress , user } = req.body;
        console.log("USER:", req.user);
console.log("BODY:", req.body);
console.log("ITEMS:", req.body.items);
console.log("ADDRESS:", req.body.deliveryAddress);

        if (!user || !items || !deliveryAddress) {
            return res.status(400).json({
                msg: "All fields are required"
            });
        }

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                msg: "Cart cannot be empty"
            });
        }

        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await ItemModel.findById(item.itemId);

            if (!product) {
                return res.status(404).json({
                    msg: "Product not found"
                });
            }

            if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
                return res.status(400).json({
                    msg: "Invalid quantity"
                });
            }

            if (product.quantity < item.quantity) {
                return res.status(400).json({
                    msg: `Insufficient stock for ${product.title}`
                });
            }

            orderItems.push({
                itemId: product._id,
                title: product.title,
                price: product.price,
                quantity: item.quantity
            });

            totalAmount += product.price * item.quantity;
        }

        const newOrder = await OrderModel.create({
            userId: user._id,
            items: orderItems,
            totalAmount,
            deliveryAddress
        });

        return res.status(201).json({
            msg: "Order created successfully",
            order: newOrder
        });

    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};

export default order;
