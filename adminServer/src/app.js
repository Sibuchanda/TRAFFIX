import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './models/connect';
import cors from 'cors'


const app = express();
const PORT = process.env.PORT || 8001;

//Database connection
connectDB(process.env.MONGO_URI);

//Middlewares
app.use(cors());
app.use(express.json());



export default app;

