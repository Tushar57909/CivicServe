import express from 'express';
import { getWorkerTrustBreakdown } from '../controllers/trustController.js';

const router = express.Router();

router.get('/worker/:workerId', getWorkerTrustBreakdown);

export default router;
