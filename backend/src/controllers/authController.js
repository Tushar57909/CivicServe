import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma.js';
import { config } from '../config/index.js';

export const register = async (req, res, next) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      password, 
      role = 'CUSTOMER', 
      city = 'Bengaluru', 
      state = 'Karnataka',
      pincode = '560038',
      address = '',
      idProofType = 'Aadhaar',
      idProofUrl = '',
      addressProofType = 'Electricity Bill',
      addressProofUrl = '',
      profession = 'Electrician',
      experienceYears = 5,
      skillCertificateName = 'National Trade Certificate',
      skillCertificateIssuer = 'DGT Trade Council'
    } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, phone, and password are required.' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists with this email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRoleUpper = role.toUpperCase();

    // If worker, documents start as PENDING for admin review
    const docInitialStatus = userRoleUpper === 'WORKER' ? 'PENDING' : 'VERIFIED';

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: userRoleUpper,
        city,
        state,
        pincode,
        address: address || `${city}, ${state} - ${pincode}`,
        idProofType,
        idProofUrl: idProofUrl || `${idProofType}_Doc_${Date.now()}.pdf`,
        idProofStatus: docInitialStatus,
        addressProofType,
        addressProofUrl: addressProofUrl || `${addressProofType}_Doc_${Date.now()}.pdf`,
        addressProofStatus: docInitialStatus
      }
    });

    let createdWorker = null;

    // If registered as Worker/Verified Pro, create Worker & Verification record with PENDING status
    if (userRoleUpper === 'WORKER') {
      const categorySlug = profession.toLowerCase().replace(/[^a-z0-9]/g, '');

      createdWorker = await prisma.worker.create({
        data: {
          userId: user.id,
          profession,
          categorySlug: categorySlug.includes('plumb') ? 'plumber' : categorySlug.includes('carp') ? 'carpenter' : categorySlug.includes('appliance') || categorySlug.includes('ac') ? 'appliance' : 'electrician',
          avatarUrl: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
          phoneNumber: phone,
          experienceYears: Number(experienceYears) || 5,
          city,
          neighborhood: address.split(',')[0] || 'Indiranagar',
          distanceKm: 2.0,
          availability: 'ONLINE',
          hourlyRate: 350.0,
          startingPrice: 199.0,
          about: `Verified professional specialist in ${profession} with ${experienceYears} years of field experience in ${city}.`,
          spokenLanguages: JSON.stringify(['English', 'Hindi', 'Kannada']),
          serviceRadiusKm: 15,
          overallScore: 92,
          ratingAverage: 4.8,
          totalReviews: 8,
          completedJobsCount: 15
        }
      });

      await prisma.workerVerification.create({
        data: {
          workerId: createdWorker.id,
          aadhaarNumberMasked: `XXXX-XXXX-${phone.slice(-4)}`,
          aadhaarStatus: 'PENDING',
          tradeCertificateName: skillCertificateName,
          tradeCertificateIssuer: skillCertificateIssuer,
          tradeCertificateStatus: 'PENDING',
          policeClearanceNumber: `KA-BLR-CR-${Date.now().toString().slice(-4)}`,
          policeClearanceDate: new Date().toISOString().split('T')[0],
          policeClearanceStatus: 'PENDING',
          insurancePolicyNumber: `HDFC-WRK-${Date.now().toString().slice(-3)}`,
          insuranceCoverageAmount: '₹5,00,000 Safety Cover',
          insuranceStatus: 'active'
        }
      });

      // Send admin notification
      const adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
      if (adminUser) {
        await prisma.notification.create({
          data: {
            userId: adminUser.id,
            title: 'New Verified Pro Application',
            message: `${name} (${profession} from ${city}) submitted documents for KYC audit.`,
            type: 'warning'
          }
        });
      }
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    // Welcome Notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: userRoleUpper === 'WORKER' ? 'Verified Pro Application Received' : 'Welcome to CivicServe',
        message: userRoleUpper === 'WORKER' 
          ? 'Your application & credentials are in the Admin Verification Queue. We will notify you upon approval.'
          : 'Your citizen account is active. Find verified local pros or post custom work requirements.',
        type: 'success'
      }
    });

    res.status(201).json({
      success: true,
      message: userRoleUpper === 'WORKER' 
        ? 'Application submitted for Admin verification.' 
        : 'Registered successfully.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        city: user.city,
        state: user.state,
        pincode: user.pincode,
        address: user.address,
        walletBalance: user.walletBalance,
        idProofStatus: user.idProofStatus,
        addressProofStatus: user.addressProofStatus,
        worker: createdWorker ? {
          id: createdWorker.id,
          profession: createdWorker.profession,
          status: 'PENDING'
        } : null
      }
    });
  } catch (error) {
    next(error);
  }
};


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { worker: { include: { verification: true } } }
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    res.json({
      success: true,
      message: 'Logged in successfully.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        city: user.city,
        address: user.address,
        walletBalance: user.walletBalance,
        worker: user.worker ? {
          id: user.worker.id,
          profession: user.worker.profession,
          categorySlug: user.worker.categorySlug,
          overallScore: user.worker.overallScore,
          availability: user.worker.availability
        } : null
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        role: req.user.role,
        city: req.user.city,
        address: req.user.address,
        walletBalance: req.user.walletBalance,
        worker: req.user.worker
      }
    });
  } catch (error) {
    next(error);
  }
};
