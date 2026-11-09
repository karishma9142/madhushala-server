import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './config/db.js';
dotenv.config();
connectDb();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
//# sourceMappingURL=index.js.map