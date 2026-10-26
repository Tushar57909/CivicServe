import express from 'express';
import { parseIntentAndMatchWorkers } from '../controllers/aiController.js';

const router = express.Router();

router.post('/parse-intent', parseIntentAndMatchWorkers);

export default router;
