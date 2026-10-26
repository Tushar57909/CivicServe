import { prisma } from '../prisma.js';
import { auditReviewSentiment } from '../ai/openRouterClient.js';
import { calculateTrustScore } from '../utils/trustScore.js';

export const createReview = async (req, res, next) => {
  try {
    const { workerId, bookingId, rating, comment, workPhotoUrl } = req.body;
    const customerId = req.user?.id || req.body.customerId || 'cust-arjun-01';

    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking reference not found.' });
    }

    // AI Sentiment and Suspicious Anomaly detection
    const aiAnalysis = await auditReviewSentiment(comment, rating);

    const review = await prisma.review.create({
      data: {
        workerId,
        customerId,
        bookingId,
        customerName: booking.customerName,
        customerCity: 'Bengaluru',
        rating: parseInt(rating, 10),
        serviceRendered: booking.serviceItemName,
        comment,
        verifiedBooking: true,
        workPhotoUrl,
        aiSentiment: aiAnalysis.sentiment,
        aiSuspiciousFlag: aiAnalysis.suspicious
      }
    });

    // Mark booking review as submitted
    await prisma.booking.update({
      where: { id: bookingId },
      data: { reviewSubmitted: true }
    });

    // Recalculate Worker's Average Rating and Trust Score
    const allReviews = await prisma.review.findMany({ where: { workerId } });
    const newAverage = Number((allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(2));

    const worker = await prisma.worker.findUnique({
      where: { id: workerId },
      include: { verification: true }
    });

    const updatedWorkerData = {
      ...worker,
      ratingAverage: newAverage,
      totalReviews: allReviews.length
    };

    const trustCalculation = calculateTrustScore(updatedWorkerData, worker.verification);

    await prisma.worker.update({
      where: { id: workerId },
      data: {
        ratingAverage: newAverage,
        totalReviews: allReviews.length,
        overallScore: trustCalculation.overallScore
      }
    });

    res.status(201).json({
      success: true,
      message: 'Verified review submitted and trust score updated!',
      data: {
        review,
        updatedTrustScore: trustCalculation.overallScore,
        aiSentiment: aiAnalysis.sentiment
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getWorkerReviews = async (req, res, next) => {
  try {
    const { workerId } = req.params;
    const reviews = await prisma.review.findMany({
      where: { workerId },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};
