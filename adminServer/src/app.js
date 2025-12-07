import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./models/connect.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import backendRoutes from "./routes/backendRoutes.js";

const app = express();
const PORT = process.env.PORT || 8001;

//Database connection
connectDB(process.env.MONGO_URI);

//Middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/backends", backendRoutes);

export default app;
