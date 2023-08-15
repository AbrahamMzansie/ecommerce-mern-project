import path from "path";
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";


dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);



if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  console.log(__dirname);
  
  app.use('/uploads', express.static('uploads'));
  
  // Update the path to reach the 'build' folder inside 'frontend'
  app.use(express.static(path.join(__dirname, '..', 'frontend/build')));
  
  const root = path.join(__dirname, '..', 'frontend', 'build', 'index.html')
  
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(root) , 'index.html')
  });
} else {
  app.get('/', (req, res) => {
      res.send({ message: 'API is working fine.' });
  })
}
app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`);
});
