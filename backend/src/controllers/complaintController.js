import { prisma } from '../prisma.js';

export const createComplaint = async (req, res, next) => {
  try {
    const { bookingId, reason, priority = 'medium' } = req.body;
    const customerId = req.user?.id || req.body.customerId || 'cust-arjun-01';

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { worker: true }
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking reference not found.' });
    }

    const complaint = await prisma.complaint.create({
      data: {
        id: `DSP-${Math.floor(1000 + Math.random() * 9000)}`,
        bookingId: booking.id,
        customerId,
        workerId: booking.workerId,
        customerName: booking.customerName,
        workerName: booking.worker?.profession?.split(' ')[0] || 'Pro',
        serviceName: booking.serviceItemName,
        amount: booking.totalAmount,
        reason,
        status: 'UNDER_INVESTIGATION',
        priority
      }
    });

    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'DISPUTED' }
    });

    res.status(201).json({
      success: true,
      message: 'Dispute submitted. A Civic Trust Mediation Officer has been assigned.',
      data: complaint
    });
  } catch (error) {
    next(error);
  }
};

export const getComplaints = async (req, res, next) => {
  try {
    const complaints = await prisma.complaint.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      count: complaints.length,
      data: complaints.map(d => ({
        id: d.id,
        bookingId: d.bookingId,
        customerName: d.customerName,
        workerName: d.workerName,
        serviceName: d.serviceName,
        amount: d.amount,
        reason: d.reason,
        status: d.status.toLowerCase(),
        priority: d.priority,
        createdAt: d.createdAt.toISOString()
      }))
    });
  } catch (error) {
    next(error);
  }
};
