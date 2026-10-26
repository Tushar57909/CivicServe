import express from 'express';
import { getWorkers, getWorkerById, updateAvailability } from '../controllers/workerController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getWorkers);
router.get('/:id', getWorkerById);
router.patch('/:id/availability', updateAvailability);

export default router;
