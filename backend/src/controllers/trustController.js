import { prisma } from '../prisma.js';
import { calculateTrustScore } from '../utils/trustScore.js';

export const getWorkerTrustBreakdown = async (req, res, next) => {
  try {
    const { workerId } = req.params;
    const worker = await prisma.worker.findUnique({
      where: { id: workerId },
      include: { verification: true }
    });

    if (!worker) {
      return res.status(404).json({ success: false, message: 'Worker profile not found.' });
    }

    const breakdownResult = calculateTrustScore(worker, worker.verification);

    res.json({
      success: true,
      data: {
        workerId: worker.id,
        workerName: worker.profession.split(' ')[0],
        ...breakdownResult
      }
    });
  } catch (error) {
    next(error);
  }
};
