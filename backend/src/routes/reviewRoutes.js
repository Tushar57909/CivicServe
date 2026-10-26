import express from 'express';
import { createReview, getWorkerReviews } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', createReview);
router.get('/worker/:workerId', getWorkerReviews);

export default router;
