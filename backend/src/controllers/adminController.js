import { prisma } from '../prisma.js';
import { calculateTrustScore } from '../utils/trustScore.js';

export const getAdminMetrics = async (req, res, next) => {
  try {
    const totalWorkers = await prisma.worker.count();
    const verifiedWorkers = await prisma.workerVerification.count({
      where: {
        aadhaarStatus: 'VERIFIED',
        tradeCertificateStatus: 'VERIFIED',
        policeClearanceStatus: 'VERIFIED'
      }
    });

    const totalBookings = await prisma.booking.count();
    const completedBookings = await prisma.booking.count({ where: { status: 'COMPLETED' } });
    const openDisputes = await prisma.complaint.count({
      where: { status: 'UNDER_INVESTIGATION' }
    });

    const gmvAggregate = await prisma.booking.aggregate({
      _sum: { totalAmount: true }
    });

    res.json({
      success: true,
      data: {
        totalWorkers,
        verifiedWorkers,
        verifiedRatePercent: totalWorkers > 0 ? Math.round((verifiedWorkers / totalWorkers) * 100) : 100,
        totalBookings,
        completedBookings,
        openDisputes,
        platformGMV: gmvAggregate._sum.totalAmount || 148500
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getWorkerVerificationQueue = async (req, res, next) => {
  try {
    const verifications = await prisma.worker.findMany({
      include: {
        verification: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: verifications
    });
  } catch (error) {
    next(error);
  }
};

export const auditWorkerKYC = async (req, res, next) => {
  try {
    const { workerId } = req.params;
    const { docType, approve } = req.body; // docType: 'aadhaar' | 'trade' | 'police'

    const statusValue = approve ? 'VERIFIED' : 'REJECTED';
    const updateData = {};

    if (docType === 'aadhaar') updateData.aadhaarStatus = statusValue;
    if (docType === 'trade') updateData.tradeCertificateStatus = statusValue;
    if (docType === 'police') updateData.policeClearanceStatus = statusValue;

    const updatedVerification = await prisma.workerVerification.update({
      where: { workerId },
      data: updateData
    });

    // Recalculate Trust Score
    const worker = await prisma.worker.findUnique({ where: { id: workerId } });
    const newTrust = calculateTrustScore(worker, updatedVerification);

    await prisma.worker.update({
      where: { id: workerId },
      data: { overallScore: newTrust.overallScore }
    });

    // Send Worker Notification
    if (worker && worker.userId) {
      await prisma.notification.create({
        data: {
          userId: worker.userId,
          title: `Document ${docType.toUpperCase()} ${statusValue}`,
          message: approve 
            ? `Your ${docType} has been verified by the Civic Auditor. Your Trust Score is now ${newTrust.overallScore}/100.`
            : `Your ${docType} was rejected. Please re-upload valid government credentials.`,
          type: approve ? 'success' : 'warning'
        }
      });
    }

    res.json({
      success: true,
      message: `Document ${docType.toUpperCase()} marked as ${statusValue}. Trust Score updated to ${newTrust.overallScore}.`,
      data: { verification: updatedVerification, newTrustScore: newTrust.overallScore }
    });
  } catch (error) {
    next(error);
  }
};

export const approveWorker = async (req, res, next) => {
  try {
    const { workerId } = req.params;
    const updatedVerification = await prisma.workerVerification.update({
      where: { workerId },
      data: {
        aadhaarStatus: 'VERIFIED',
        tradeCertificateStatus: 'VERIFIED',
        policeClearanceStatus: 'VERIFIED'
      }
    });

    const worker = await prisma.worker.update({
      where: { id: workerId },
      data: { 
        availability: 'ONLINE',
        overallScore: 95
      },
      include: { user: true }
    });

    if (worker && worker.userId) {
      await prisma.notification.create({
        data: {
          userId: worker.userId,
          title: 'Verified Pro Account Approved! 🎉',
          message: 'Congratulations! Your credentials have been fully verified. Your profile is now live and accepting customer bookings.',
          type: 'success'
        }
      });
    }

    res.json({
      success: true,
      message: 'Verified Pro successfully approved & activated.',
      data: { worker, verification: updatedVerification }
    });
  } catch (error) {
    next(error);
  }
};

export const rejectWorker = async (req, res, next) => {
  try {
    const { workerId } = req.params;
    const { reason = 'Document verification failed or invalid trade certificates.' } = req.body;

    const updatedVerification = await prisma.workerVerification.update({
      where: { workerId },
      data: {
        aadhaarStatus: 'REJECTED',
        tradeCertificateStatus: 'REJECTED',
        policeClearanceStatus: 'REJECTED'
      }
    });

    const worker = await prisma.worker.update({
      where: { id: workerId },
      data: { availability: 'OFFLINE' },
      include: { user: true }
    });

    if (worker && worker.userId) {
      await prisma.notification.create({
        data: {
          userId: worker.userId,
          title: 'Verified Pro Application Rejected',
          message: `Application rejected: ${reason}. Please update your credentials.`,
          type: 'error'
        }
      });
    }

    res.json({
      success: true,
      message: 'Worker verification rejected.',
      data: { worker, verification: updatedVerification, reason }
    });
  } catch (error) {
    next(error);
  }
};

export const resolveDispute = async (req, res, next) => {
  try {
    const { disputeId } = req.params;
    const { resolution } = req.body; // 'resolved_refund' | 'resolved_worker_paid'

    const validStatus = resolution === 'resolved_refund' ? 'RESOLVED_REFUND' : 'RESOLVED_WORKER_PAID';

    const dispute = await prisma.complaint.update({
      where: { id: disputeId },
      data: {
        status: validStatus,
        resolution: resolution === 'resolved_refund' ? 'Full Escrow Refund granted to customer.' : 'Escrow payment released to worker.'
      }
    });

    // Update booking payment state
    if (resolution === 'resolved_refund') {
      await prisma.booking.update({
        where: { id: dispute.bookingId },
        data: { paymentStatus: 'REFUNDED' }
      });
    } else {
      await prisma.booking.update({
        where: { id: dispute.bookingId },
        data: { paymentStatus: 'RELEASED_TO_WORKER' }
      });
    }

    res.json({
      success: true,
      message: `Dispute #${disputeId} marked as ${validStatus}`,
      data: dispute
    });
  } catch (error) {
    next(error);
  }
};

