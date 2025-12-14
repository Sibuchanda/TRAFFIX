import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import { addBackend, deleteBackend, getAdmin, getBackends, getBackendsForLB, updateBackend} from '../controlers/backendControler.js';
import checkBackendStatus from '../controlers/checkBackendStatus.js';
import verifyLBSecret from '../middleware/verifyLBSecret.js';


const router = express.Router();

router.post('/add', authMiddleware, addBackend);
router.get('/all', authMiddleware, getBackends);
router.get('/internal/all', verifyLBSecret, getBackendsForLB);
router.put('/:id', authMiddleware, updateBackend);
router.delete('/:id', authMiddleware, deleteBackend);
router.post('/check-status',authMiddleware, checkBackendStatus);
router.get('/get-admin', authMiddleware, getAdmin);



export default router;
