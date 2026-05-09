import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDb from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// ------------------------- connect to db
connectDb();

// -------------- create express app
const app = express();

//-----------------------------middlewares
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie parser middleware
app.use(cookieParser());
//----------------------------routes
// routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
// paypal routes
app.get("/api/config/paypal", (req, res) =>
  res.send({
    clientId: process.env.PAYPAL_CLIENT_ID,
  }),
);

//----------------------------static files
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//----------------------------  frontend
if (process.env.NODE_ENV === "production") {
  // static folder
  app.use(express.static(path.join(__dirname, "frontend", "build")));

  // send index.html for all unknown routes
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

//---------------------------- error middleware
app.use(notFound);
app.use(errorHandler);
//-------------------------------- server
// SERVER / PORT
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`),
);
