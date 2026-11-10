import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDb} from './config/db.js'
import userRouter from './routes/auth.js';


dotenv.config();
connectDb();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth' , userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT , () => {
    console.log(`server running on ${PORT}`);
})