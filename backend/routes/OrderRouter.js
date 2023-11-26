import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/order.js";
import { emailTemplate, isAuth } from "../utlis.js";

const orderRouter = express.Router();

// Your other imports and configurations...

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'cart is empty!' });
    } else {
        const newOrder = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            totalprice: req.body.totalprice,
            shippingPrice: req.body.shippingPrice,
            paymentId: req.body.paymentId,
            userId: req.user._id,
            email: req.body.email,
            userName: req.body.userName,
        });

        const order = await newOrder.save();

        // Simulate sending an email by logging to the console
        console.log(`Order placed successfully! Order ID: ${order._id}`);

        // Respond with a success message
        res.status(201).send({ message: 'Order Placed!', order: order });
    }
}));

// Your other routes...

export default orderRouter;
