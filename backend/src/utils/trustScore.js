/**
 * Calculates the Civic Trust Protocol score (0 - 100)
 * 
 * Breakdown:
 * 1. KYC Verification (max 30 pts)
 * 2. Customer Rating Quality (max 30 pts)
 * 3. Volume & Repeat Loyalty (max 20 pts)
 * 4. Punctuality & Discipline (max 20 pts)
 */
export const calculateTrustScore = (worker, verification) => {
  let score = 0;
  const breakdown = {};

  // 1. Verification (30 pts)
  let kycPts = 0;
  if (verification?.aadhaarStatus === 'VERIFIED') kycPts += 10;
  if (verification?.tradeCertificateStatus === 'VERIFIED') kycPts += 10;
  if (verification?.policeClearanceStatus === 'VERIFIED') kycPts += 10;
  score += kycPts;
  breakdown.kycPoints = { score: kycPts, max: 30 };

  // 2. Rating Quality (30 pts)
  const ratingAvg = worker.ratingAverage || 5.0;
  const ratingPts = Math.round((ratingAvg / 5.0) * 30);
  score += ratingPts;
  breakdown.ratingPoints = { score: ratingPts, max: 30, average: ratingAvg };

  // 3. Volume & Repeat Loyalty (20 pts)
  const jobVolumePts = Math.min(10, Math.round((worker.completedJobsCount || 0) * 0.1));
  const repeatRate = worker.repeatCustomerRate || 40.0;
  const repeatPts = Math.round((repeatRate / 100) * 10);
  const loyaltyPts = jobVolumePts + repeatPts;
  score += loyaltyPts;
  breakdown.loyaltyPoints = { score: loyaltyPts, max: 20, completedJobs: worker.completedJobsCount, repeatRate };

  // 4. Punctuality & Discipline (20 pts)
  const onTimeRate = worker.onTimeArrivalRate || 98.0;
  const onTimePts = Math.round((onTimeRate / 100) * 15);
  const cancelRate = worker.cancellationRate || 0.5;
  const penalty = Math.min(5, Math.round(cancelRate * 2));
  const disciplinePts = Math.max(0, onTimePts + 5 - penalty);
  score += disciplinePts;
  breakdown.disciplinePoints = { score: disciplinePts, max: 20, onTimeRate, cancelRate };

  const finalScore = Math.min(100, Math.max(0, score));

  return {
    overallScore: finalScore,
    tier: finalScore >= 95 ? 'Elite Civic Pro' : finalScore >= 90 ? 'Verified Master' : 'Civic Certified',
    breakdown
  };
};
