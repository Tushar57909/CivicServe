import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting CivicServe database seed...');

  // Clear existing data
  await prisma.notification.deleteMany();
  await prisma.complaint.deleteMany();
  await prisma.review.deleteMany();
  await prisma.bookingStatusHistory.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.workerVerification.deleteMany();
  await prisma.workerService.deleteMany();
  await prisma.worker.deleteMany();
  await prisma.service.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);
  const adminHashedPassword = await bcrypt.hash('admin123', 10);

  // 1. Create Users
  const customerUser = await prisma.user.create({
    data: {
      id: 'cust-arjun-01',
      name: 'Arjun Menon',
      email: 'arjun@civicserve.in',
      phone: '+91 98801 22334',
      password: hashedPassword,
      role: 'CUSTOMER',
      city: 'Bengaluru',
      address: 'Flat 402, Shanti Niketan Residency, HAL 2nd Stage, Indiranagar',
      walletBalance: 2450.0
    }
  });

  const adminUser = await prisma.user.create({
    data: {
      id: 'admin-auditor-01',
      name: 'Civic Trust Auditor',
      email: 'admin@civicserve.in',
      phone: '+91 98000 00001',
      password: adminHashedPassword,
      role: 'ADMIN',
      city: 'Bengaluru',
      address: 'Civic Governance Center, MG Road, Bengaluru'
    }
  });

  // 2. Create Services
  const electricianService = await prisma.service.create({
    data: {
      id: 'srv-electrician',
      name: 'Electrical & Power',
      slug: 'electrician',
      iconName: 'Zap',
      description: 'Certified wiremen, short-circuit diagnostics, MCB replacement, inverter setups & heavy load rewiring.',
      startingPrice: 199.0,
      activeWorkersCount: 48,
      averageRating: 4.86,
      tags: JSON.stringify(['MCB Tripping', 'Switchboard Repair', 'Inverter Setup', 'Ceiling Fan', 'Earthing Test']),
      rateCards: JSON.stringify([
        { id: 'el-1', name: 'Standard Diagnostic & Inspection', description: 'Comprehensive load & wiring inspection with multimeter report', basePrice: 199, estimatedDurationMinutes: 45, isPopular: true },
        { id: 'el-2', name: 'MCB / Distribution Board Repair', description: 'Isolate trip causes, replace burnt breakers, torque test busbars', basePrice: 449, estimatedDurationMinutes: 60, isPopular: true },
        { id: 'el-3', name: 'Inverter & Dual Battery Wiring', description: 'Install high-capacity inverter, bypass switch & backup line wiring', basePrice: 799, estimatedDurationMinutes: 90 },
        { id: 'el-4', name: 'Ceiling Fan & Heavy Fixture Fitting', description: 'Secure down-rod installation with safety pin & speed capacitor', basePrice: 249, estimatedDurationMinutes: 30 },
        { id: 'el-5', name: 'Complete Room Rewiring (Concealed)', description: 'FR-grade PVC conduit wiring with fire-retardant copper wires', basePrice: 1499, estimatedDurationMinutes: 180 }
      ])
    }
  });

  const acService = await prisma.service.create({
    data: {
      id: 'srv-ac',
      name: 'AC & Cooling Repair',
      slug: 'ac-repair',
      iconName: 'Snowflake',
      description: 'Split & inverter AC deep jet cleaning, gas charging (R32/R410A), PCB repair & compressor troubleshooting.',
      startingPrice: 499.0,
      activeWorkersCount: 52,
      averageRating: 4.91,
      tags: JSON.stringify(['Jet Service', 'Gas Leakage', 'Not Cooling', 'Water Dripping', 'PCB Diagnostic']),
      rateCards: JSON.stringify([
        { id: 'ac-1', name: 'High-Pressure Foam Jet Foam Clean', description: 'Indoor & outdoor coil pressure cleaning, blower wash, tray de-clog', basePrice: 499, estimatedDurationMinutes: 60, isPopular: true },
        { id: 'ac-2', name: 'Nitrogen Pressure Test & Gas Refill', description: 'Zero-leak nitrogen hold test, vacuuming and precision scale gas charge', basePrice: 1799, estimatedDurationMinutes: 90, isPopular: true },
        { id: 'ac-3', name: 'Indoor Unit Water Dripping & Drain Fix', description: 'Condensate slope alignment, chemical flush of drain tube', basePrice: 349, estimatedDurationMinutes: 45 },
        { id: 'ac-4', name: 'Inverter AC Micro-controller PCB Repair', description: 'Micro-controller component repair with 90-day guarantee', basePrice: 1250, estimatedDurationMinutes: 120 }
      ])
    }
  });

  const plumberService = await prisma.service.create({
    data: {
      id: 'srv-plumber',
      name: 'Plumbing & Water Systems',
      slug: 'plumber',
      iconName: 'Wrench',
      description: 'Leak detection, pressure pump fitting, RO servicing, concealed pipe fixes & sanitary ware installation.',
      startingPrice: 249.0,
      activeWorkersCount: 39,
      averageRating: 4.79,
      tags: JSON.stringify(['Pipe Leakage', 'Drain Blockage', 'Motor Pump', 'Tap Replacement', 'Flush Tank']),
      rateCards: JSON.stringify([
        { id: 'pl-1', name: 'Tap & Mixer Valve Overhaul', description: 'Spindle replacement, ceramic disc renewal, thread sealant leak fix', basePrice: 249, estimatedDurationMinutes: 30, isPopular: true },
        { id: 'pl-2', name: 'Severe Drain & Sewer Blockage Clearing', description: 'Mechanical drain auger clearing with anti-odor enzyme flush', basePrice: 499, estimatedDurationMinutes: 60, isPopular: true },
        { id: 'pl-3', name: 'Automatic Water Pump / Booster Installation', description: 'Plumbing union joints, check valve fitting, dry-run sensor wiring', basePrice: 899, estimatedDurationMinutes: 90 }
      ])
    }
  });

  const applianceService = await prisma.service.create({
    data: {
      id: 'srv-appliance',
      name: 'Home Appliance Repair',
      slug: 'appliance-repair',
      iconName: 'Tv',
      description: 'Washing machines, microwave ovens, refrigerators, chimneys & water purifiers serviced by certified techs.',
      startingPrice: 299.0,
      activeWorkersCount: 44,
      averageRating: 4.84,
      tags: JSON.stringify(['Washing Machine', 'Refrigerator', 'Microwave', 'Kitchen Chimney', 'RO Water']),
      rateCards: JSON.stringify([
        { id: 'ap-1', name: 'Front/Top Load Washing Machine Diagnostic', description: 'Belt, drain motor, suspension damper, inlet valve testing', basePrice: 299, estimatedDurationMinutes: 45, isPopular: true },
        { id: 'ap-2', name: 'Refrigerator Frost-Free Sensor & Compressor Fix', description: 'Bimetal sensor, defrost timer, relay capacitor test & repair', basePrice: 650, estimatedDurationMinutes: 75, isPopular: true }
      ])
    }
  });

  const carpenterService = await prisma.service.create({
    data: {
      id: 'srv-carpenter',
      name: 'Carpentry & Furniture',
      slug: 'carpenter',
      iconName: 'Hammer',
      description: 'Custom cabinetry, lock replacement, sliding wardrobe rollers, hinge repair & teak wood restoration.',
      startingPrice: 299.0,
      activeWorkersCount: 31,
      averageRating: 4.82,
      tags: JSON.stringify(['Door Lock', 'Hinges Fix', 'Wardrobe Sliding', 'Bed Assembly', 'Modular Kitchen']),
      rateCards: JSON.stringify([
        { id: 'cp-1', name: 'High-Security Door Lock & Deadbolt Fitting', description: 'Precision mortise cutting, strike plate alignment with master keys', basePrice: 349, estimatedDurationMinutes: 45, isPopular: true },
        { id: 'cp-2', name: 'Heavy Sliding Wardrobe Channel & Roller Repair', description: 'Heavy-duty nylon bearing wheels with aluminum track alignment', basePrice: 649, estimatedDurationMinutes: 75, isPopular: true }
      ])
    }
  });

  const painterService = await prisma.service.create({
    data: {
      id: 'srv-painter',
      name: 'Painting & Waterproofing',
      slug: 'painter',
      iconName: 'Paintbrush',
      description: 'Interior emulsion, exterior weather coats, wall putty smoothening & damp wall chemical injection.',
      startingPrice: 799.0,
      activeWorkersCount: 28,
      averageRating: 4.88,
      tags: JSON.stringify(['Wall Dampness', 'Putty & Sanding', 'Single Room Paint', 'Texture Wall', 'Waterproofing']),
      rateCards: JSON.stringify([
        { id: 'pt-1', name: 'Single Accent Wall Stencil & Velvet Finish', description: 'Primer, 2 coats luxury emulsion with geometric/metallic design', basePrice: 1299, estimatedDurationMinutes: 180, isPopular: true },
        { id: 'pt-2', name: 'Waterproofing Dampness Polymer Injection', description: 'Elastomeric membrane application with anti-efflorescence primer', basePrice: 1899, estimatedDurationMinutes: 240, isPopular: true }
      ])
    }
  });

  // 3. Create Workers
  // Worker 1: Rajesh Sharma (Electrician)
  const rajeshUser = await prisma.user.create({
    data: {
      id: 'usr-rajesh-01',
      name: 'Rajesh Sharma',
      email: 'rajesh@civicserve.in',
      phone: '+91 98112 34567',
      password: hashedPassword,
      role: 'WORKER',
      city: 'Bengaluru',
      address: 'Indiranagar, Bengaluru'
    }
  });

  const rajeshWorker = await prisma.worker.create({
    data: {
      id: 'w-rajesh-01',
      userId: rajeshUser.id,
      profession: 'Senior Electrical Engineer & Master Wireman',
      categorySlug: 'electrician',
      avatarUrl: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=400',
      phoneNumber: '+91 98112 34567',
      experienceYears: 12,
      city: 'Bengaluru',
      neighborhood: 'Indiranagar & Koramangala',
      distanceKm: 1.8,
      availability: 'ONLINE',
      hourlyRate: 350.0,
      startingPrice: 199.0,
      about: 'Government certified Grade-A electrical contractor. 12+ years specializing in domestic DB panel upgrades, heavy load calculations, inverter wiring, and smart home lighting installations with 100% adherence to safety norms.',
      spokenLanguages: JSON.stringify(['English', 'Hindi', 'Kannada']),
      serviceRadiusKm: 10,
      toolsEquipped: JSON.stringify(['Fluke True-RMS Digital Multimeter', 'Insulated 1000V Toolset', 'Rotary Hammer Drill', 'Non-contact Voltage Detector']),
      pastWorkPhotos: JSON.stringify([
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600'
      ]),
      specialties: JSON.stringify(['Concealed Wiring Diagnostics', 'Heavy Inverter Installations', '3-Phase Load Balancing', 'Earthing Pit Resistance Testing']),
      badges: JSON.stringify(['Civic Master Pro', 'Govt Certified', 'Police Verified', 'Insured Up to ₹5L']),
      overallScore: 98,
      ratingAverage: 4.94,
      totalReviews: 248,
      completedJobsCount: 412,
      onTimeArrivalRate: 99.2,
      cancellationRate: 0.4,
      repeatCustomerRate: 48.5,
      zeroComplaintStreakDays: 310,
      averageResponseMinutes: 4,
      skillCertificationLevel: 'Master Craftsman'
    }
  });

  await prisma.workerVerification.create({
    data: {
      workerId: rajeshWorker.id,
      aadhaarNumberMasked: 'XXXX-XXXX-4821',
      aadhaarStatus: 'VERIFIED',
      tradeCertificateName: 'National Trade Certificate (NTC) - Electrician Grade A',
      tradeCertificateIssuer: 'Directorate General of Training (DGT), Ministry of Skill Development',
      tradeCertificateStatus: 'VERIFIED',
      policeClearanceNumber: 'KA-BLR-CR-88291',
      policeClearanceDate: '2025-11-10',
      policeClearanceStatus: 'VERIFIED',
      insurancePolicyNumber: 'HDFC-ERGO-WRK-99481',
      insuranceCoverageAmount: '₹5,00,000 Property & Accidental Damage',
      insuranceStatus: 'active'
    }
  });

  await prisma.workerService.create({
    data: { workerId: rajeshWorker.id, serviceId: electricianService.id }
  });

  // Worker 2: Vikram Patel (AC Tech)
  const vikramUser = await prisma.user.create({
    data: {
      id: 'usr-vikram-02',
      name: 'Vikram Patel',
      email: 'vikram@civicserve.in',
      phone: '+91 97234 56789',
      password: hashedPassword,
      role: 'WORKER',
      city: 'Bengaluru',
      address: 'HSR Layout, Bengaluru'
    }
  });

  const vikramWorker = await prisma.worker.create({
    data: {
      id: 'w-vikram-02',
      userId: vikramUser.id,
      profession: 'Certified HVAC & Inverter AC Specialist',
      categorySlug: 'ac-repair',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      phoneNumber: '+91 97234 56789',
      experienceYears: 9,
      city: 'Bengaluru',
      neighborhood: 'HSR Layout & BTM',
      distanceKm: 2.3,
      availability: 'ONLINE',
      hourlyRate: 400.0,
      startingPrice: 499.0,
      about: 'Daikin & Voltas trained AC technician. Specializing in high-pressure foam jet cleaning, zero-loss refrigerant charging with digital manifold gauges, and inverter PCB circuit board repairs with a 90-day warranty.',
      spokenLanguages: JSON.stringify(['English', 'Hindi', 'Gujarati', 'Kannada']),
      serviceRadiusKm: 12,
      toolsEquipped: JSON.stringify(['High-Pressure Water Jet Pump', 'Digital Dual-Manifold Gauge', 'Refrigerant Recovery Unit', 'Electronic Leak Sniffer']),
      pastWorkPhotos: JSON.stringify([
        'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=600'
      ]),
      specialties: JSON.stringify(['Dual-Inverter Gas Charging', 'Water Drain Pipe De-clogging', 'PCB Chip Level Diagnostics', 'Pressure Jet Foam Wash']),
      badges: JSON.stringify(['Civic Certified Pro', 'HVAC Skill Council', 'Police Verified', '90-Day Guarantee']),
      overallScore: 96,
      ratingAverage: 4.88,
      totalReviews: 189,
      completedJobsCount: 320,
      onTimeArrivalRate: 97.8,
      cancellationRate: 0.8,
      repeatCustomerRate: 44.0,
      zeroComplaintStreakDays: 240,
      averageResponseMinutes: 6,
      skillCertificationLevel: 'Certified Professional'
    }
  });

  await prisma.workerVerification.create({
    data: {
      workerId: vikramWorker.id,
      aadhaarNumberMasked: 'XXXX-XXXX-9134',
      aadhaarStatus: 'VERIFIED',
      tradeCertificateName: 'RAC Level 4 Certification',
      tradeCertificateIssuer: 'Electronics Sector Skills Council of India (ESSCI)',
      tradeCertificateStatus: 'VERIFIED',
      policeClearanceNumber: 'KA-BLR-CR-77120',
      policeClearanceDate: '2025-10-15',
      policeClearanceStatus: 'VERIFIED',
      insurancePolicyNumber: 'ICICI-LOMB-AC-8812',
      insuranceCoverageAmount: '₹3,00,000 Protection',
      insuranceStatus: 'active'
    }
  });

  await prisma.workerService.create({
    data: { workerId: vikramWorker.id, serviceId: acService.id }
  });

  // Worker 3: Amit Kumar (Plumber)
  const amitUser = await prisma.user.create({
    data: {
      id: 'usr-amit-03',
      name: 'Amit Kumar',
      email: 'amit@civicserve.in',
      phone: '+91 98450 12398',
      password: hashedPassword,
      role: 'WORKER',
      city: 'Bengaluru',
      address: 'Whitefield, Bengaluru'
    }
  });

  const amitWorker = await prisma.worker.create({
    data: {
      id: 'w-amit-03',
      userId: amitUser.id,
      profession: 'Master Plumber & Pipe Flow Technician',
      categorySlug: 'plumber',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      phoneNumber: '+91 98450 12398',
      experienceYears: 14,
      city: 'Bengaluru',
      neighborhood: 'Whitefield & Marathahalli',
      distanceKm: 3.5,
      availability: 'ONLINE',
      hourlyRate: 300.0,
      startingPrice: 249.0,
      about: '14 years of commercial and residential plumbing expertise. Skilled in hydro-jet sewer cleaning, CPVC/PPR solvent welding, and acoustic leak detection.',
      spokenLanguages: JSON.stringify(['Hindi', 'English', 'Bengali', 'Kannada']),
      serviceRadiusKm: 15,
      toolsEquipped: JSON.stringify(['Heavy Electric Drain Auger', 'Acoustic Ultrasonic Leak Detector', 'Rothenberger Pipe Wrenches']),
      pastWorkPhotos: JSON.stringify(['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600']),
      specialties: JSON.stringify(['Drain Snake De-clogging', 'Booster Pump Installation', 'Concealed Valve Repair']),
      badges: JSON.stringify(['Civic Master Pro', 'IPSC Verified', 'Police Cleared']),
      overallScore: 95,
      ratingAverage: 4.87,
      totalReviews: 210,
      completedJobsCount: 380,
      onTimeArrivalRate: 98.1,
      cancellationRate: 1.0,
      repeatCustomerRate: 46.2,
      zeroComplaintStreakDays: 180,
      averageResponseMinutes: 5,
      skillCertificationLevel: 'Master Craftsman'
    }
  });

  await prisma.workerVerification.create({
    data: {
      workerId: amitWorker.id,
      aadhaarNumberMasked: 'XXXX-XXXX-6029',
      aadhaarStatus: 'VERIFIED',
      tradeCertificateName: 'Plumbing Craftsman Diploma',
      tradeCertificateIssuer: 'Indian Plumbing Skills Council (IPSC)',
      tradeCertificateStatus: 'VERIFIED',
      policeClearanceNumber: 'KA-BLR-CR-66230',
      policeClearanceDate: '2025-09-20',
      policeClearanceStatus: 'VERIFIED',
      insurancePolicyNumber: 'STAR-PLB-441',
      insuranceCoverageAmount: '₹3,00,000 Guarantee',
      insuranceStatus: 'active'
    }
  });

  await prisma.workerService.create({
    data: { workerId: amitWorker.id, serviceId: plumberService.id }
  });

  // Worker 4: Sunita Devi (Appliance)
  const sunitaUser = await prisma.user.create({
    data: {
      id: 'usr-sunita-04',
      name: 'Sunita Devi',
      email: 'sunita@civicserve.in',
      phone: '+91 98765 43210',
      password: hashedPassword,
      role: 'WORKER',
      city: 'Bengaluru',
      address: 'Koramangala, Bengaluru'
    }
  });

  const sunitaWorker = await prisma.worker.create({
    data: {
      id: 'w-sunita-04',
      userId: sunitaUser.id,
      profession: 'Certified Home Appliance Engineer',
      categorySlug: 'appliance-repair',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      phoneNumber: '+91 98765 43210',
      experienceYears: 8,
      city: 'Bengaluru',
      neighborhood: 'Koramangala & Jayanagar',
      distanceKm: 2.9,
      availability: 'ONLINE',
      hourlyRate: 320.0,
      startingPrice: 299.0,
      about: 'Specialist in IFB, Bosch, Samsung front-load washing machines and microwaves. Transparent OEM parts pricing and 100% on-time record.',
      spokenLanguages: JSON.stringify(['Hindi', 'English', 'Kannada', 'Tamil']),
      serviceRadiusKm: 12,
      toolsEquipped: JSON.stringify(['Digital Oscilloscope', 'Universal Bearing Puller Set', 'Direct-Drive Motor Analyzer']),
      pastWorkPhotos: JSON.stringify(['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600']),
      specialties: JSON.stringify(['Front Load Drum Bearing Renewal', 'PCB Relay Diagnostics', 'RO Membrane Rejuvenation']),
      badges: JSON.stringify(['Top Rated Pro', 'Skill India Certified', 'Police Verified', '100% On-Time']),
      overallScore: 99,
      ratingAverage: 4.98,
      totalReviews: 164,
      completedJobsCount: 290,
      onTimeArrivalRate: 99.7,
      cancellationRate: 0.0,
      repeatCustomerRate: 52.0,
      zeroComplaintStreakDays: 365,
      averageResponseMinutes: 3,
      skillCertificationLevel: 'Master Craftsman'
    }
  });

  await prisma.workerVerification.create({
    data: {
      workerId: sunitaWorker.id,
      aadhaarNumberMasked: 'XXXX-XXXX-1934',
      aadhaarStatus: 'VERIFIED',
      tradeCertificateName: 'Home Appliance Tech Cert',
      tradeCertificateIssuer: 'Skill India / NSDC',
      tradeCertificateStatus: 'VERIFIED',
      policeClearanceNumber: 'KA-BLR-CR-90412',
      policeClearanceDate: '2025-12-01',
      policeClearanceStatus: 'VERIFIED',
      insurancePolicyNumber: 'DIGIT-APPL-774',
      insuranceCoverageAmount: '₹5,00,000 Safety Cover',
      insuranceStatus: 'active'
    }
  });

  await prisma.workerService.create({
    data: { workerId: sunitaWorker.id, serviceId: applianceService.id }
  });

  // Worker 5: Mohammed Farooq (Carpenter)
  const farooqUser = await prisma.user.create({
    data: {
      id: 'usr-farooq-05',
      name: 'Mohammed Farooq',
      email: 'farooq@civicserve.in',
      phone: '+91 99887 76655',
      password: hashedPassword,
      role: 'WORKER',
      city: 'Bengaluru',
      address: 'Malleshwaram, Bengaluru'
    }
  });

  const farooqWorker = await prisma.worker.create({
    data: {
      id: 'w-farooq-05',
      userId: farooqUser.id,
      profession: 'Precision Woodworker & Architectural Carpenter',
      categorySlug: 'carpenter',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
      phoneNumber: '+91 99887 76655',
      experienceYears: 16,
      city: 'Bengaluru',
      neighborhood: 'Malleshwaram & Rajajinagar',
      distanceKm: 4.1,
      availability: 'BUSY',
      hourlyRate: 350.0,
      startingPrice: 299.0,
      about: 'Master carpenter with 16 years experience in modular kitchen adjustments, soft-close hardware retrofit, and Godrej lock fitting.',
      spokenLanguages: JSON.stringify(['Hindi', 'Urdu', 'Kannada', 'English']),
      serviceRadiusKm: 14,
      toolsEquipped: JSON.stringify(['Festool Dustless Plunge Saw', 'Makita Cordless Impact Driver']),
      pastWorkPhotos: JSON.stringify(['https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=600']),
      specialties: JSON.stringify(['High Security Deadbolt Fitting', 'Sliding Door Channel Realignment']),
      badges: JSON.stringify(['FFSC Master', 'Police Cleared', 'Precision Joinery']),
      overallScore: 94,
      ratingAverage: 4.85,
      totalReviews: 175,
      completedJobsCount: 310,
      onTimeArrivalRate: 96.5,
      cancellationRate: 1.2,
      repeatCustomerRate: 41.5,
      zeroComplaintStreakDays: 190,
      averageResponseMinutes: 8,
      skillCertificationLevel: 'Master Craftsman'
    }
  });

  await prisma.workerVerification.create({
    data: {
      workerId: farooqWorker.id,
      aadhaarNumberMasked: 'XXXX-XXXX-7201',
      aadhaarStatus: 'VERIFIED',
      tradeCertificateName: 'Advanced Carpentry Master Certification',
      tradeCertificateIssuer: 'FFSC Council',
      tradeCertificateStatus: 'VERIFIED',
      policeClearanceNumber: 'KA-BLR-CR-55410',
      policeClearanceDate: '2025-08-14',
      policeClearanceStatus: 'VERIFIED',
      insurancePolicyNumber: 'BAJAJ-CRP-331',
      insuranceCoverageAmount: '₹3,00,000 Cover',
      insuranceStatus: 'active'
    }
  });

  await prisma.workerService.create({
    data: { workerId: farooqWorker.id, serviceId: carpenterService.id }
  });

  // Worker 6: Suresh Nair (Painter)
  const sureshUser = await prisma.user.create({
    data: {
      id: 'usr-suresh-06',
      name: 'Suresh Nair',
      email: 'suresh@civicserve.in',
      phone: '+91 97123 88990',
      password: hashedPassword,
      role: 'WORKER',
      city: 'Bengaluru',
      address: 'Sarjapur, Bengaluru'
    }
  });

  const sureshWorker = await prisma.worker.create({
    data: {
      id: 'w-suresh-06',
      userId: sureshUser.id,
      profession: 'Waterproofing Engineer & Texture Painter',
      categorySlug: 'painter',
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400',
      phoneNumber: '+91 97123 88990',
      experienceYears: 11,
      city: 'Bengaluru',
      neighborhood: 'Sarjapur & Bellandur',
      distanceKm: 4.8,
      availability: 'ONLINE',
      hourlyRate: 380.0,
      startingPrice: 799.0,
      about: 'Specialized in wall dampness diagnosis, Asian Paints Royale luxury finishes, and moisture barrier chemical coatings.',
      spokenLanguages: JSON.stringify(['English', 'Malayalam', 'Hindi', 'Kannada']),
      serviceRadiusKm: 16,
      toolsEquipped: JSON.stringify(['Protimeter Digital Moisture Meter', 'Wagner Airless Paint Sprayer']),
      pastWorkPhotos: JSON.stringify(['https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600']),
      specialties: JSON.stringify(['Wall Dampness Thermal Scanning', 'Single Accent Luxury Stencil']),
      badges: JSON.stringify(['PCSC Certified', 'Thermal Moisture Pro', 'Police Verified']),
      overallScore: 93,
      ratingAverage: 4.83,
      totalReviews: 142,
      completedJobsCount: 220,
      onTimeArrivalRate: 97.0,
      cancellationRate: 1.5,
      repeatCustomerRate: 38.0,
      zeroComplaintStreakDays: 150,
      averageResponseMinutes: 7,
      skillCertificationLevel: 'Certified Professional'
    }
  });

  await prisma.workerVerification.create({
    data: {
      workerId: sureshWorker.id,
      aadhaarNumberMasked: 'XXXX-XXXX-3891',
      aadhaarStatus: 'VERIFIED',
      tradeCertificateName: 'Paints Master Applicator Certification',
      tradeCertificateIssuer: 'Paints and Coatings Skill Council',
      tradeCertificateStatus: 'VERIFIED',
      policeClearanceNumber: 'KA-BLR-CR-44129',
      policeClearanceDate: '2025-10-02',
      policeClearanceStatus: 'VERIFIED',
      insurancePolicyNumber: 'SBI-PNT-998',
      insuranceCoverageAmount: '₹3,00,000 Safety Cover',
      insuranceStatus: 'active'
    }
  });

  await prisma.workerService.create({
    data: { workerId: sureshWorker.id, serviceId: painterService.id }
  });

  // 4. Create Initial Bookings
  const booking1 = await prisma.booking.create({
    data: {
      id: 'BK-2026-8812',
      serviceId: electricianService.id,
      serviceName: electricianService.name,
      serviceItemName: 'MCB / Distribution Board Repair',
      categorySlug: 'electrician',
      workerId: rajeshWorker.id,
      customerId: customerUser.id,
      customerName: customerUser.name,
      customerPhone: customerUser.phone,
      status: 'IN_PROGRESS',
      scheduledDate: '2026-08-22',
      scheduledTimeSlot: '10:30 AM - 11:30 AM',
      problemDescription: 'Main 32A MCB switch repeatedly tripping whenever geyser and AC run together. Needs load balance & breaker replacement.',
      address: JSON.stringify({
        fullName: 'Arjun Menon',
        phoneNumber: '+91 98801 22334',
        addressLine1: 'Flat 402, Shanti Niketan Residency, HAL 2nd Stage',
        landmark: 'Opposite Toit Brewpub',
        city: 'Bengaluru',
        pincode: '560038'
      }),
      baseAmount: 449.0,
      civicGuaranteeFee: 29.0,
      taxes: 81.0,
      totalAmount: 559.0,
      paymentStatus: 'HELD_IN_ESCROW',
      startOtp: '4829',
      completionOtp: '9103'
    }
  });

  await prisma.bookingStatusHistory.createMany({
    data: [
      { bookingId: booking1.id, status: 'REQUESTED', note: 'Customer placed booking with Civic Escrow Protection.', timestamp: '08:45 AM' },
      { bookingId: booking1.id, status: 'ASSIGNED', note: 'Smart Match assigned to top-ranked Master Wireman Rajesh Sharma.', timestamp: '08:46 AM' },
      { bookingId: booking1.id, status: 'ACCEPTED', note: 'Worker confirmed appointment and verified required spares.', timestamp: '08:48 AM' },
      { bookingId: booking1.id, status: 'ON_THE_WAY', note: 'Rajesh departed on Hero Electric scooter with tools.', timestamp: '09:40 AM' },
      { bookingId: booking1.id, status: 'IN_PROGRESS', note: 'Verified Start OTP #4829. Diagnostics & busbar testing started.', timestamp: '10:15 AM' }
    ]
  });

  const booking2 = await prisma.booking.create({
    data: {
      id: 'BK-2026-8794',
      serviceId: acService.id,
      serviceName: acService.name,
      serviceItemName: 'High-Pressure Foam Jet Foam Clean',
      categorySlug: 'ac-repair',
      workerId: vikramWorker.id,
      customerId: customerUser.id,
      customerName: customerUser.name,
      customerPhone: customerUser.phone,
      status: 'COMPLETED',
      scheduledDate: '2026-08-19',
      scheduledTimeSlot: '02:00 PM - 03:00 PM',
      problemDescription: 'Master bedroom Daikin 1.5 ton split AC blowing weak air and foul odor.',
      address: JSON.stringify({
        fullName: 'Arjun Menon',
        phoneNumber: '+91 98801 22334',
        addressLine1: 'Flat 402, Shanti Niketan Residency, HAL 2nd Stage',
        landmark: 'Opposite Toit Brewpub',
        city: 'Bengaluru',
        pincode: '560038'
      }),
      baseAmount: 499.0,
      civicGuaranteeFee: 29.0,
      taxes: 90.0,
      totalAmount: 618.0,
      paymentStatus: 'RELEASED_TO_WORKER',
      startOtp: '1194',
      completionOtp: '7721',
      reviewSubmitted: true
    }
  });

  // 5. Create Reviews
  await prisma.review.create({
    data: {
      id: 'rev-1',
      workerId: rajeshWorker.id,
      customerId: customerUser.id,
      bookingId: booking1.id,
      customerName: 'Ananya S.',
      customerCity: 'Bengaluru, Indiranagar',
      rating: 5,
      serviceRendered: 'MCB Tripping & Short Circuit Fix',
      comment: 'Rajesh arrived within 25 minutes! He used a digital thermal tester to find a melted wire inside a switchboard that two other electricians missed. Completely transparent pricing.',
      verifiedBooking: true,
      aiSentiment: 'Positive',
      aiSuspiciousFlag: false
    }
  });

  // 6. Create Complaint
  await prisma.complaint.create({
    data: {
      id: 'DSP-9041',
      bookingId: booking1.id,
      customerId: customerUser.id,
      workerId: rajeshWorker.id,
      customerName: 'Rohit Bansal',
      workerName: 'Suresh Nair',
      serviceName: 'Waterproofing Dampness Polymer Injection',
      amount: 1899.0,
      reason: 'Customer reported paint discoloration on corner after 48 hours. Worker requested site visit to inspect surface curing.',
      status: 'UNDER_INVESTIGATION',
      priority: 'medium'
    }
  });

  console.log('✅ CivicServe seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
