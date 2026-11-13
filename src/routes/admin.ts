import express, { Router } from 'express';
import { IsAuth } from '../middleware/auth.js';
import Admin from '../middleware/admin.js';
import { AddItem } from '../controller/addItem.js';

const AdminRouter = express.Router();

AdminRouter.post('/addItem' , IsAuth , Admin , AddItem);

export default AdminRouter;