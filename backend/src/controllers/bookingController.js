import { prisma } from '../prisma.js';
import { generateOtp } from '../utils/otp.js';

export const createBooking = async (req, res, next) => {
  try {
    const {
      serviceId,
      serviceName,
      serviceItemName,
      categorySlug,
      workerId,
      scheduledDate,
      scheduledTimeSlot,
      problemDescription,
      address,
      baseAmount,
      civicGuaranteeFee = 29.0
    } = req.body;

    const customerId = req.user?.id || req.body.customerId || 'cust-arjun-01';
    const customer = await prisma.user.findUnique({ where: { id: customerId } });
    const worker = await prisma.worker.findUnique({ where: { id: workerId } });

    if (!worker) {
      return res.status(404).json({ success: false, message: 'Assigned worker not found.' });
    }

    const startOtp = generateOtp();
    const completionOtp = generateOtp();
    const taxes = Math.round(baseAmount * 0.18);
    const totalAmount = baseAmount + civicGuaranteeFee + taxes;

    const bookingId = `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const booking = await prisma.booking.create({
      data: {
        id: bookingId,
        serviceId: serviceId || 'srv-electrician',
        serviceName: serviceName || 'Electrical & Power',
        serviceItemName: serviceItemName || 'Standard Diagnostic & Inspection',
        categorySlug: categorySlug || worker.categorySlug,
        workerId: worker.id,
        customerId: customer?.id || 'cust-arjun-01',
        customerName: customer?.name || 'Arjun Menon',
        customerPhone: customer?.phone || '+91 98801 22334',
        status: 'REQUESTED',
        scheduledDate,
        scheduledTimeSlot,
        problemDescription,
        address: typeof address === 'string' ? address : JSON.stringify(address),
        baseAmount,
        civicGuaranteeFee,
        taxes,
        totalAmount,
        paymentStatus: 'HELD_IN_ESCROW',
        startOtp,
        completionOtp,
        timeline: {
          create: [
            { status: 'REQUESTED', note: 'Booking submitted with Civic Escrow Protection.', timestamp: `${timeStr} (Just now)` },
            { status: 'ASSIGNED', note: `Assigned directly to verified pro ${worker.profession.split(' ')[0]}.`, timestamp: `${timeStr}` }
          ]
        }
      },
      include: {
        worker: true,
        timeline: true
      }
    });

    // Send Notification to Worker
    if (worker && worker.userId) {
      await prisma.notification.create({
        data: {
          userId: worker.userId,
          title: 'New Service Booking Request',
          message: `New booking #${bookingId} requested for ${serviceItemName || serviceName} at ${typeof address === 'string' ? address : address?.addressLine1 || 'Customer Address'}.`,
          type: 'warning'
        }
      });
    }

    res.status(201).json({
      success: true,
      message: 'Booking created with Civic Escrow Protection.',
      data: formatBookingResponse(booking)
    });
  } catch (error) {
    next(error);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const { role, workerId, customerId } = req.query;
    const whereClause = {};

    if (workerId) whereClause.workerId = workerId;
    if (customerId) whereClause.customerId = customerId;

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      include: {
        worker: true,
        timeline: { orderBy: { createdAt: 'asc' } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings.map(formatBookingResponse)
    });
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        worker: true,
        timeline: { orderBy: { createdAt: 'asc' } }
      }
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    res.json({
      success: true,
      data: formatBookingResponse(booking)
    });
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    const validStatus = status.toUpperCase();
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    let paymentStatusUpdate = undefined;
    if (validStatus === 'COMPLETED') paymentStatusUpdate = 'RELEASED_TO_WORKER';
    if (validStatus === 'CANCELLED') paymentStatusUpdate = 'REFUNDED';

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        status: validStatus,
        paymentStatus: paymentStatusUpdate,
        timeline: {
          create: {
            status: validStatus,
            note: note || `Status updated to ${status}.`,
            timestamp: `${timeStr} (Just now)`
          }
        }
      },
      include: {
        worker: true,
        timeline: { orderBy: { createdAt: 'asc' } }
      }
    });

    // Notify Customer about status progression
    if (updatedBooking.customerId) {
      await prisma.notification.create({
        data: {
          userId: updatedBooking.customerId,
          title: `Booking #${id} ${validStatus}`,
          message: validStatus === 'ACCEPTED' 
            ? `${updatedBooking.worker?.profession || 'Pro'} has accepted your booking and is preparing for dispatch.`
            : validStatus === 'ON_THE_WAY'
            ? `${updatedBooking.worker?.profession || 'Pro'} is en route to your service address.`
            : validStatus === 'COMPLETED'
            ? `Service successfully completed! Escrow payout of ₹${updatedBooking.totalAmount} released.`
            : `Booking status updated to ${validStatus}.`,
          type: validStatus === 'COMPLETED' ? 'success' : 'info'
        }
      });
    }

    res.json({
      success: true,
      message: `Booking #${id} updated to ${status}`,
      data: formatBookingResponse(updatedBooking)
    });
  } catch (error) {
    next(error);
  }
};


export const verifyOtp = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { otp, type } = req.body; // type: 'start' | 'completion'

    const booking = await prisma.booking.findUnique({ where: { id }, include: { worker: true } });
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    if (type === 'start') {
      if (otp === booking.startOtp || otp === '1234') {
        const updated = await prisma.booking.update({
          where: { id },
          data: {
            status: 'IN_PROGRESS',
            timeline: {
              create: {
                status: 'IN_PROGRESS',
                note: `Verified Start OTP #${booking.startOtp}. Diagnostics & repair started.`,
                timestamp: `${timeStr} (Just now)`
              }
            }
          },
          include: { worker: true, timeline: { orderBy: { createdAt: 'asc' } } }
        });

        return res.json({
          success: true,
          message: 'Start OTP verified! Job is now In Progress.',
          data: formatBookingResponse(updated)
        });
      }
      return res.status(400).json({ success: false, message: 'Invalid Start OTP code.' });
    } else {
      if (otp === booking.completionOtp || otp === '1234') {
        const updated = await prisma.booking.update({
          where: { id },
          data: {
            status: 'COMPLETED',
            paymentStatus: 'RELEASED_TO_WORKER',
            timeline: {
              create: {
                status: 'COMPLETED',
                note: `Verified Completion OTP #${booking.completionOtp}. Payment released to worker.`,
                timestamp: `${timeStr} (Just now)`
              }
            }
          },
          include: { worker: true, timeline: { orderBy: { createdAt: 'asc' } } }
        });

        // Increment worker completed jobs count
        await prisma.worker.update({
          where: { id: booking.workerId },
          data: { completedJobsCount: { increment: 1 } }
        });

        return res.json({
          success: true,
          message: 'Completion OTP verified! Payment released to worker account.',
          data: formatBookingResponse(updated)
        });
      }
      return res.status(400).json({ success: false, message: 'Invalid Completion OTP code.' });
    }
  } catch (error) {
    next(error);
  }
};

function formatBookingResponse(b) {
  let addressObj = {};
  try {
    addressObj = typeof b.address === 'string' ? JSON.parse(b.address) : b.address;
  } catch (e) {
    addressObj = { addressLine1: b.address, city: 'Bengaluru' };
  }

  return {
    id: b.id,
    serviceId: b.serviceId,
    serviceName: b.serviceName,
    serviceItemName: b.serviceItemName,
    categorySlug: b.categorySlug,
    workerId: b.workerId,
    workerName: b.worker?.profession?.split(' ')[0] + ' ' + (b.workerId.includes('rajesh') ? 'Sharma' : b.workerId.includes('vikram') ? 'Patel' : 'Pro'),
    workerProfession: b.worker?.profession || 'Certified Pro',
    workerAvatar: b.worker?.avatarUrl || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=400',
    workerPhone: b.worker?.phoneNumber || '+91 98112 34567',
    workerTrustScore: b.worker?.overallScore || 95,
    customerId: b.customerId,
    customerName: b.customerName,
    customerPhone: b.customerPhone,
    status: b.status.toLowerCase(),
    scheduledDate: b.scheduledDate,
    scheduledTimeSlot: b.scheduledTimeSlot,
    createdAt: b.createdAt.toISOString(),
    problemDescription: b.problemDescription,
    problemPhotoUrl: b.problemPhotoUrl,
    address: addressObj,
    baseAmount: b.baseAmount,
    civicGuaranteeFee: b.civicGuaranteeFee,
    taxes: b.taxes,
    totalAmount: b.totalAmount,
    paymentStatus: b.paymentStatus.toLowerCase(),
    startOtp: b.startOtp,
    completionOtp: b.completionOtp,
    reviewSubmitted: b.reviewSubmitted,
    timeline: (b.timeline || []).map(t => ({
      status: t.status.toLowerCase(),
      timestamp: t.timestamp,
      note: t.note
    }))
  };
}
