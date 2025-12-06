import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import { addBackend, deleteBackend, getBackends, updateBackend } from '../controlers/backendControler.js';

const router = express.Router();

router.post('/add', authMiddleware, addBackend);
router.get('/all', authMiddleware, getBackends);
router.put('/:id', authMiddleware, updateBackend);
router.delete('/:id', authMiddleware, deleteBackend);



export default router;
