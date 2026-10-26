import express from 'express';
import { createJobRequest, getJobRequests, submitJobBid } from '../controllers/jobController.js';

const router = express.Router();

router.post('/', createJobRequest);
router.get('/', getJobRequests);
router.post('/:id/bids', submitJobBid);

export default router;
