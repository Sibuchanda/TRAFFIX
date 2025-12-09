import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import { addBackend, deleteBackend, getBackends, updateBackend} from '../controlers/backendControler.js';
import checkBackendStatus from '../controlers/checkBackendStatus.js';


const router = express.Router();

router.post('/add', authMiddleware, addBackend);
router.get('/all', getBackends);
router.put('/:id', authMiddleware, updateBackend);
router.delete('/:id', authMiddleware, deleteBackend);
router.post('/check-status', checkBackendStatus);



export default router;
