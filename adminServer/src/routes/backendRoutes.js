import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import { addBackend } from '../controlers/backendControler.js';

const router = express.Router();

router.post('/add', authMiddleware, addBackend);



export default router;
