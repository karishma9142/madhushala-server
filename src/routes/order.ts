import express, { Router } from 'express';
import { IsAuth } from '../middleware/auth.js';
import order from '../controller/order.js';

const orderRouter = express.Router();

orderRouter.post('/order' , IsAuth , order);

export default orderRouter;