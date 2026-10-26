import express from 'express';
import {
  getAdminMetrics,
  getWorkerVerificationQueue,
  auditWorkerKYC,
  resolveDispute,
  approveWorker,
  rejectWorker
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/metrics', getAdminMetrics);
router.get('/workers/verification', getWorkerVerificationQueue);
router.patch('/workers/:workerId/verify-kyc', auditWorkerKYC);
router.post('/workers/:workerId/approve', approveWorker);
router.post('/workers/:workerId/reject', rejectWorker);
router.patch('/disputes/:disputeId/resolve', resolveDispute);

export default router;
