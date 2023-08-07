import express from 'express';
import productRoutes from './routes/productRoutes.js';
import { notFound , errorHandler } from './middleware/errorMiddleware.js';
import dotenv from "dotenv";
import connectDB from './config/db.js';
dotenv.config();

connectDB();


const PORT = process.env.PORT || 5000;

const app = express();



app.get('/', (req, res) => {
    res.send('APP is running');
});

app.use("/api/products" , productRoutes);



app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

