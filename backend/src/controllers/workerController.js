import { prisma } from '../prisma.js';

export const getWorkers = async (req, res, next) => {
  try {
    const {
      category,
      neighborhood,
      search,
      minTrustScore,
      maxDistance,
      onlyOnline,
      sortBy = 'trust'
    } = req.query;

    const whereClause = {};

    if (category && category !== 'all') {
      whereClause.categorySlug = category;
    }

    if (onlyOnline === 'true') {
      whereClause.availability = 'ONLINE';
    }

    if (minTrustScore) {
      whereClause.overallScore = { gte: parseInt(minTrustScore, 10) };
    }

    if (maxDistance) {
      whereClause.distanceKm = { lte: parseFloat(maxDistance) };
    }

    const workers = await prisma.worker.findMany({
      where: whereClause,
      include: {
        verification: true,
        reviews: { take: 5, orderBy: { createdAt: 'desc' } }
      }
    });

    let formattedWorkers = workers.map(w => ({
      id: w.id,
      name: w.profession.split(' ')[0] + ' ' + (w.id.includes('rajesh') ? 'Sharma' : w.id.includes('vikram') ? 'Patel' : 'Pro'),
      profession: w.profession,
      categorySlug: w.categorySlug,
      avatarUrl: w.avatarUrl,
      phoneNumber: w.phoneNumber,
      experienceYears: w.experienceYears,
      city: w.city,
      neighborhood: w.neighborhood,
      distanceKm: w.distanceKm,
      availability: w.availability.toLowerCase(),
      hourlyRate: w.hourlyRate,
      startingPrice: w.startingPrice,
      about: w.about,
      spokenLanguages: typeof w.spokenLanguages === 'string' ? JSON.parse(w.spokenLanguages) : w.spokenLanguages,
      serviceRadiusKm: w.serviceRadiusKm,
      toolsEquipped: typeof w.toolsEquipped === 'string' ? JSON.parse(w.toolsEquipped) : w.toolsEquipped,
      pastWorkPhotos: typeof w.pastWorkPhotos === 'string' ? JSON.parse(w.pastWorkPhotos) : w.pastWorkPhotos,
      specialties: typeof w.specialties === 'string' ? JSON.parse(w.specialties) : w.specialties,
      badges: typeof w.badges === 'string' ? JSON.parse(w.badges) : w.badges,
      kyc: {
        aadhaarNumberMasked: w.verification?.aadhaarNumberMasked || 'XXXX-XXXX-1234',
        aadhaarStatus: (w.verification?.aadhaarStatus || 'VERIFIED').toLowerCase(),
        tradeCertificateName: w.verification?.tradeCertificateName || 'Trade Certificate',
        tradeCertificateIssuer: w.verification?.tradeCertificateIssuer || 'DGT',
        tradeCertificateStatus: (w.verification?.tradeCertificateStatus || 'VERIFIED').toLowerCase(),
        policeClearanceNumber: w.verification?.policeClearanceNumber || 'KA-BLR-001',
        policeClearanceDate: w.verification?.policeClearanceDate || '2025-10-01',
        policeClearanceStatus: (w.verification?.policeClearanceStatus || 'VERIFIED').toLowerCase(),
        insurancePolicyNumber: w.verification?.insurancePolicyNumber || 'INS-991',
        insuranceCoverageAmount: w.verification?.insuranceCoverageAmount || '₹5,00,000',
        insuranceStatus: w.verification?.insuranceStatus || 'active'
      },
      trustMetrics: {
        overallScore: w.overallScore,
        ratingAverage: w.ratingAverage,
        totalReviews: w.totalReviews,
        completedJobsCount: w.completedJobsCount,
        onTimeArrivalRate: w.onTimeArrivalRate,
        cancellationRate: w.cancellationRate,
        repeatCustomerRate: w.repeatCustomerRate,
        zeroComplaintStreakDays: w.zeroComplaintStreakDays,
        averageResponseMinutes: w.averageResponseMinutes,
        skillCertificationLevel: w.skillCertificationLevel
      },
      reviews: w.reviews.map(r => ({
        id: r.id,
        customerName: r.customerName,
        customerCity: r.customerCity,
        rating: r.rating,
        date: r.createdAt.toLocaleDateString(),
        serviceRendered: r.serviceRendered,
        comment: r.comment,
        verifiedBooking: r.verifiedBooking,
        workPhotoUrl: r.workPhotoUrl
      }))
    }));

    // Handle search query filtering
    if (search) {
      const q = search.toLowerCase();
      formattedWorkers = formattedWorkers.filter(w =>
        w.name.toLowerCase().includes(q) ||
        w.profession.toLowerCase().includes(q) ||
        w.specialties.some(s => s.toLowerCase().includes(q)) ||
        w.neighborhood.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'trust') {
      formattedWorkers.sort((a, b) => b.trustMetrics.overallScore - a.trustMetrics.overallScore);
    } else if (sortBy === 'rating') {
      formattedWorkers.sort((a, b) => b.trustMetrics.ratingAverage - a.trustMetrics.ratingAverage);
    } else if (sortBy === 'distance') {
      formattedWorkers.sort((a, b) => a.distanceKm - b.distanceKm);
    } else if (sortBy === 'price') {
      formattedWorkers.sort((a, b) => a.startingPrice - b.startingPrice);
    }

    res.json({
      success: true,
      count: formattedWorkers.length,
      data: formattedWorkers
    });
  } catch (error) {
    next(error);
  }
};

export const getWorkerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const w = await prisma.worker.findUnique({
      where: { id },
      include: {
        verification: true,
        reviews: { orderBy: { createdAt: 'desc' } }
      }
    });

    if (!w) {
      return res.status(404).json({ success: false, message: 'Worker profile not found.' });
    }

    res.json({
      success: true,
      data: {
        id: w.id,
        name: w.profession.split(' ')[0] + ' ' + (w.id.includes('rajesh') ? 'Sharma' : w.id.includes('vikram') ? 'Patel' : 'Pro'),
        profession: w.profession,
        categorySlug: w.categorySlug,
        avatarUrl: w.avatarUrl,
        phoneNumber: w.phoneNumber,
        experienceYears: w.experienceYears,
        city: w.city,
        neighborhood: w.neighborhood,
        distanceKm: w.distanceKm,
        availability: w.availability.toLowerCase(),
        hourlyRate: w.hourlyRate,
        startingPrice: w.startingPrice,
        about: w.about,
        spokenLanguages: typeof w.spokenLanguages === 'string' ? JSON.parse(w.spokenLanguages) : w.spokenLanguages,
        serviceRadiusKm: w.serviceRadiusKm,
        toolsEquipped: typeof w.toolsEquipped === 'string' ? JSON.parse(w.toolsEquipped) : w.toolsEquipped,
        pastWorkPhotos: typeof w.pastWorkPhotos === 'string' ? JSON.parse(w.pastWorkPhotos) : w.pastWorkPhotos,
        specialties: typeof w.specialties === 'string' ? JSON.parse(w.specialties) : w.specialties,
        badges: typeof w.badges === 'string' ? JSON.parse(w.badges) : w.badges,
        kyc: {
          aadhaarNumberMasked: w.verification?.aadhaarNumberMasked || 'XXXX-XXXX-1234',
          aadhaarStatus: (w.verification?.aadhaarStatus || 'VERIFIED').toLowerCase(),
          tradeCertificateName: w.verification?.tradeCertificateName || 'Trade Certificate',
          tradeCertificateIssuer: w.verification?.tradeCertificateIssuer || 'DGT',
          tradeCertificateStatus: (w.verification?.tradeCertificateStatus || 'VERIFIED').toLowerCase(),
          policeClearanceNumber: w.verification?.policeClearanceNumber || 'KA-BLR-001',
          policeClearanceDate: w.verification?.policeClearanceDate || '2025-10-01',
          policeClearanceStatus: (w.verification?.policeClearanceStatus || 'VERIFIED').toLowerCase(),
          insurancePolicyNumber: w.verification?.insurancePolicyNumber || 'INS-991',
          insuranceCoverageAmount: w.verification?.insuranceCoverageAmount || '₹5,00,000',
          insuranceStatus: w.verification?.insuranceStatus || 'active'
        },
        trustMetrics: {
          overallScore: w.overallScore,
          ratingAverage: w.ratingAverage,
          totalReviews: w.totalReviews,
          completedJobsCount: w.completedJobsCount,
          onTimeArrivalRate: w.onTimeArrivalRate,
          cancellationRate: w.cancellationRate,
          repeatCustomerRate: w.repeatCustomerRate,
          zeroComplaintStreakDays: w.zeroComplaintStreakDays,
          averageResponseMinutes: w.averageResponseMinutes,
          skillCertificationLevel: w.skillCertificationLevel
        },
        reviews: w.reviews.map(r => ({
          id: r.id,
          customerName: r.customerName,
          customerCity: r.customerCity,
          rating: r.rating,
          date: r.createdAt.toLocaleDateString(),
          serviceRendered: r.serviceRendered,
          comment: r.comment,
          verifiedBooking: r.verifiedBooking,
          workPhotoUrl: r.workPhotoUrl
        }))
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { availability } = req.body;

    const validStatus = availability.toUpperCase();
    if (!['ONLINE', 'BUSY', 'OFFLINE'].includes(validStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid availability status.' });
    }

    const updated = await prisma.worker.update({
      where: { id },
      data: { availability: validStatus }
    });

    res.json({
      success: true,
      message: `Availability updated to ${availability}`,
      data: { id: updated.id, availability: updated.availability.toLowerCase() }
    });
  } catch (error) {
    next(error);
  }
};
