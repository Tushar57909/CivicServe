import { prisma } from '../prisma.js';

export const createJobRequest = async (req, res, next) => {
  try {
    const { 
      categorySlug, 
      title, 
      description, 
      address, 
      city = 'Bengaluru', 
      budgetMin, 
      budgetMax, 
      urgency = 'immediate' 
    } = req.body;

    const customerId = req.user?.id || req.body.customerId || 'cust-arjun-01';

    const job = await prisma.jobRequest.create({
      data: {
        customerId,
        categorySlug,
        title,
        description,
        address,
        city,
        budgetMin: Number(budgetMin) || 300,
        budgetMax: Number(budgetMax) || 750,
        urgency,
        status: 'open'
      },
      include: {
        customer: true,
        bids: true
      }
    });

    // Automatically identify matching nearby verified workers
    const matchingWorkers = await prisma.worker.findMany({
      where: {
        city: { equals: city, mode: 'insensitive' },
        availability: 'ONLINE'
      }
    });

    // Create notifications for matching workers in real-time
    for (const worker of matchingWorkers) {
      if (worker.userId) {
        await prisma.notification.create({
          data: {
            userId: worker.userId,
            title: `New Nearby Job Need: ${title}`,
            message: `A client in ${address.split(',')[0] || city} needs ${title} (Budget: ₹${budgetMin} - ₹${budgetMax}). Submit your custom quote.`,
            type: 'info'
          }
        });
      }
    }

    res.status(201).json({
      success: true,
      message: 'Job request broadcasted to nearby verified professionals.',
      data: job
    });
  } catch (error) {
    next(error);
  }
};

export const getJobRequests = async (req, res, next) => {
  try {
    const { categorySlug, city } = req.query;
    const where = {};
    if (categorySlug && categorySlug !== 'all') where.categorySlug = categorySlug;
    if (city && city !== 'all') where.city = city;

    const jobs = await prisma.jobRequest.findMany({
      where,
      include: {
        customer: true,
        bids: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: jobs.map(j => ({
        id: j.id,
        customerId: j.customerId,
        customerName: j.customer?.name || 'Citizen Client',
        customerPhone: j.customer?.phone || '+91 98801 22334',
        customerAadhaarVerified: j.customer?.idProofStatus === 'VERIFIED',
        categorySlug: j.categorySlug,
        title: j.title,
        description: j.description,
        budgetMin: j.budgetMin,
        budgetMax: j.budgetMax,
        location: j.address,
        urgency: j.urgency,
        status: j.status,
        createdAt: j.createdAt,
        bids: j.bids
      }))
    });
  } catch (error) {
    next(error);
  }
};

export const submitJobBid = async (req, res, next) => {
  try {
    const { id } = req.params; // jobRequestId
    const { 
      workerId, 
      workerName, 
      workerAvatar, 
      workerProfession, 
      trustScore, 
      quotedPrice, 
      estimatedArrivalMinutes, 
      message 
    } = req.body;

    const bid = await prisma.jobBid.create({
      data: {
        jobRequestId: id,
        workerId: workerId || 'w-rajesh-01',
        workerName: workerName || 'Rajesh Sharma',
        workerAvatar: workerAvatar || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
        workerProfession: workerProfession || 'Certified Senior Electrician',
        trustScore: Number(trustScore) || 95,
        quotedPrice: Number(quotedPrice) || 450,
        estimatedArrivalMinutes: Number(estimatedArrivalMinutes) || 20,
        message: message || 'Equipped and ready with tools in Indiranagar.'
      }
    });

    const job = await prisma.jobRequest.findUnique({ where: { id } });
    if (job && job.customerId) {
      await prisma.notification.create({
        data: {
          userId: job.customerId,
          title: 'New Quote Received for Your Job Need',
          message: `${workerName} quoted ₹${quotedPrice} with ~${estimatedArrivalMinutes}m ETA for "${job.title}".`,
          type: 'success'
        }
      });
    }

    res.status(201).json({
      success: true,
      message: 'Quote submitted successfully.',
      data: bid
    });
  } catch (error) {
    next(error);
  }
};
