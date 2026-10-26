import { Worker } from '../types';

export const INITIAL_WORKERS: Worker[] = [
  {
    id: 'w-rajesh-01',
    name: 'Rajesh Sharma',
    profession: 'Senior Electrical Engineer & Master Wireman',
    categorySlug: 'electrician',
    avatarUrl: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=400',
    phoneNumber: '+91 98112 34567',
    experienceYears: 12,
    city: 'Bengaluru',
    neighborhood: 'Indiranagar & Koramangala',
    distanceKm: 1.8,
    availability: 'online',
    hourlyRate: 350,
    startingPrice: 199,
    about: 'Government certified Grade-A electrical contractor. 12+ years specializing in domestic DB panel upgrades, heavy load calculations, inverter wiring, and smart home lighting installations with 100% adherence to safety norms.',
    spokenLanguages: ['English', 'Hindi', 'Kannada'],
    serviceRadiusKm: 10,
    toolsEquipped: ['Fluke True-RMS Digital Multimeter', 'Insulated 1000V Toolset', 'Rotary Hammer Drill', 'Non-contact Voltage Detector'],
    pastWorkPhotos: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600'
    ],
    kyc: {
      aadhaarNumberMasked: 'XXXX-XXXX-4821',
      aadhaarStatus: 'verified',
      tradeCertificateName: 'National Trade Certificate (NTC) - Electrician Grade A',
      tradeCertificateIssuer: 'Directorate General of Training (DGT), Ministry of Skill Development',
      tradeCertificateStatus: 'verified',
      policeClearanceNumber: 'KA-BLR-CR-88291',
      policeClearanceDate: '2025-11-10',
      policeClearanceStatus: 'verified',
      insurancePolicyNumber: 'HDFC-ERGO-WRK-99481',
      insuranceCoverageAmount: '₹5,00,000 Property & Accidental Damage',
      insuranceStatus: 'active'
    },
    trustMetrics: {
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
    },
    specialties: ['Concealed Wiring Diagnostics', 'Heavy Inverter Installations', '3-Phase Load Balancing', 'Earthing Pit Resistance Testing'],
    badges: ['Civic Master Pro', 'Govt Certified', 'Police Verified', 'Insured Up to ₹5L'],
    reviews: [
      {
        id: 'rev-1',
        customerName: 'Ananya S.',
        customerCity: 'Bengaluru, Indiranagar',
        rating: 5,
        date: '3 days ago',
        serviceRendered: 'MCB Tripping & Short Circuit Fix',
        comment: 'Rajesh arrived within 25 minutes! He used a digital thermal tester to find a melted wire inside a switchboard that two other electricians missed. Completely transparent pricing and showed me the burnt component before replacement.',
        verifiedBooking: true
      },
      {
        id: 'rev-2',
        customerName: 'Vivek Kulkarni',
        customerCity: 'Bengaluru, Domlur',
        rating: 5,
        date: '2 weeks ago',
        serviceRendered: 'Dual Inverter & Battery Wiring',
        comment: 'Very professional, wore neat shoe covers, brought high-grade copper wires and clean cable ties. Even gave me a handwritten test certificate. 100% trustworthy.',
        verifiedBooking: true
      }
    ]
  },
  {
    id: 'w-vikram-02',
    name: 'Vikram Patel',
    profession: 'Certified HVAC & Inverter AC Specialist',
    categorySlug: 'ac-repair',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    phoneNumber: '+91 97234 56789',
    experienceYears: 9,
    city: 'Bengaluru',
    neighborhood: 'HSR Layout & BTM',
    distanceKm: 2.3,
    availability: 'online',
    hourlyRate: 400,
    startingPrice: 499,
    about: 'Daikin & Voltas trained AC technician. Specializing in high-pressure foam jet cleaning, zero-loss refrigerant charging with digital manifold gauges, and inverter PCB circuit board repairs with a 90-day warranty.',
    spokenLanguages: ['English', 'Hindi', 'Gujarati', 'Kannada'],
    serviceRadiusKm: 12,
    toolsEquipped: ['High-Pressure Water Jet Pump', 'Digital Dual-Manifold Gauge', 'Refrigerant Recovery Unit', 'Electronic Leak Sniffer'],
    pastWorkPhotos: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=600'
    ],
    kyc: {
      aadhaarNumberMasked: 'XXXX-XXXX-9134',
      aadhaarStatus: 'verified',
      tradeCertificateName: 'RAC (Refrigeration & Air Conditioning) Level 4',
      tradeCertificateIssuer: 'Electronics Sector Skills Council of India (ESSCI)',
      tradeCertificateStatus: 'verified',
      policeClearanceNumber: 'KA-BLR-CR-77120',
      policeClearanceDate: '2025-10-15',
      policeClearanceStatus: 'verified',
      insurancePolicyNumber: 'ICICI-LOMB-AC-8812',
      insuranceCoverageAmount: '₹3,00,000 Protection',
      insuranceStatus: 'active'
    },
    trustMetrics: {
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
    },
    specialties: ['Dual-Inverter Gas Charging', 'Water Drain Pipe De-clogging', 'PCB Chip Level Diagnostics', 'Pressure Jet Foam Wash'],
    badges: ['Civic Certified Pro', 'HVAC Skill Council', 'Police Verified', '90-Day Guarantee'],
    reviews: [
      {
        id: 'rev-3',
        customerName: 'Megha Reddy',
        customerCity: 'Bengaluru, HSR Layout',
        rating: 5,
        date: '1 week ago',
        serviceRendered: 'High-Pressure Jet Foam Clean',
        comment: 'Vikram did a phenomenal job. He used a protective canvas jacket so not a single drop of water spilled on my wall or sofa. The cooling is back to 100% ice cold.',
        verifiedBooking: true
      }
    ]
  },
  {
    id: 'w-amit-03',
    name: 'Amit Kumar',
    profession: 'Master Plumber & Pipe Flow Technician',
    categorySlug: 'plumber',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    phoneNumber: '+91 98450 12398',
    experienceYears: 14,
    city: 'Bengaluru',
    neighborhood: 'Whitefield & Marathahalli',
    distanceKm: 3.5,
    availability: 'online',
    hourlyRate: 300,
    startingPrice: 249,
    about: '14 years of commercial and residential plumbing expertise. Skilled in hydro-jet sewer cleaning, CPVC/PPR solvent welding, automatic booster pressure pumps, and acoustic wall leak detection without damaging tiles.',
    spokenLanguages: ['Hindi', 'English', 'Bengali', 'Kannada'],
    serviceRadiusKm: 15,
    toolsEquipped: ['Heavy Electric Drain Auger (20m)', 'Acoustic Ultrasonic Leak Detector', 'PPR Pipe Fusion Welder', 'Rothenberger Pipe Wrenches'],
    pastWorkPhotos: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600'
    ],
    kyc: {
      aadhaarNumberMasked: 'XXXX-XXXX-6029',
      aadhaarStatus: 'verified',
      tradeCertificateName: 'Plumbing & Sanitation Craftsman Diploma',
      tradeCertificateIssuer: 'Indian Plumbing Skills Council (IPSC)',
      tradeCertificateStatus: 'verified',
      policeClearanceNumber: 'KA-BLR-CR-66230',
      policeClearanceDate: '2025-09-20',
      policeClearanceStatus: 'verified',
      insurancePolicyNumber: 'STAR-HEALTH-PLB-441',
      insuranceCoverageAmount: '₹3,00,000 Guarantee',
      insuranceStatus: 'active'
    },
    trustMetrics: {
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
    },
    specialties: ['Drain Snake De-clogging', 'Booster Pump Installation', 'Concealed Valve Repair', 'Overhead Tank Automation'],
    badges: ['Civic Master Pro', 'IPSC Verified', 'Police Cleared', 'Zero Demolition'],
    reviews: [
      {
        id: 'rev-4',
        customerName: 'Karan Malhotra',
        customerCity: 'Bengaluru, Whitefield',
        rating: 5,
        date: '5 days ago',
        serviceRendered: 'Automatic Pressure Pump Setup',
        comment: 'Amit resolved a low water pressure issue that had plagued our top floor apartment for 6 months. Clean piping layout, test run done, and gave clear warranty instructions.',
        verifiedBooking: true
      }
    ]
  },
  {
    id: 'w-sunita-04',
    name: 'Sunita Devi',
    profession: 'Certified Home Appliance & Washing Machine Engineer',
    categorySlug: 'appliance-repair',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    phoneNumber: '+91 98765 43210',
    experienceYears: 8,
    city: 'Bengaluru',
    neighborhood: 'Koramangala & Jayanagar',
    distanceKm: 2.9,
    availability: 'online',
    hourlyRate: 320,
    startingPrice: 299,
    about: 'Pioneering woman appliance technician certified in IFB, Bosch, and Samsung washing machines, microwave magnetrons, and water purifiers. Known for extreme punctuality, transparent parts pricing, and spotless work ethics.',
    spokenLanguages: ['Hindi', 'English', 'Kannada', 'Tamil'],
    serviceRadiusKm: 12,
    toolsEquipped: ['Digital Component Oscilloscope', 'Universal Bearing Puller Set', 'Direct-Drive Motor Analyzer', 'Food-Grade RO TDS Meter'],
    pastWorkPhotos: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600'
    ],
    kyc: {
      aadhaarNumberMasked: 'XXXX-XXXX-1934',
      aadhaarStatus: 'verified',
      tradeCertificateName: 'Consumer Electronics & Home Appliance Tech Cert',
      tradeCertificateIssuer: 'Skill India / NSDC Certified',
      tradeCertificateStatus: 'verified',
      policeClearanceNumber: 'KA-BLR-CR-90412',
      policeClearanceDate: '2025-12-01',
      policeClearanceStatus: 'verified',
      insurancePolicyNumber: 'DIGIT-INS-APPL-774',
      insuranceCoverageAmount: '₹5,00,000 Safety Cover',
      insuranceStatus: 'active'
    },
    trustMetrics: {
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
    },
    specialties: ['Front Load Drum Bearing Renewal', 'PCB Relay Diagnostics', 'Microwave High Voltage Diode Fix', 'RO Membrane Rejuvenation'],
    badges: ['Top Rated Pro', 'Skill India Certified', 'Police Verified', '100% On-Time Record'],
    reviews: [
      {
        id: 'rev-5',
        customerName: 'Shalini Gupta',
        customerCity: 'Bengaluru, Koramangala',
        rating: 5,
        date: 'Yesterday',
        serviceRendered: 'Front Load Washing Machine Diagnostic',
        comment: 'Sunita is exceptional! Identified a faulty drain pump valve in 10 minutes, showed me the exact cost of the OEM replacement part on the manufacturer portal, and fixed it promptly. 5 stars all the way.',
        verifiedBooking: true
      }
    ]
  },
  {
    id: 'w-farooq-05',
    name: 'Mohammed Farooq',
    profession: 'Precision Woodworker & Architectural Carpenter',
    categorySlug: 'carpenter',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    phoneNumber: '+91 99887 76655',
    experienceYears: 16,
    city: 'Bengaluru',
    neighborhood: 'Malleshwaram & Rajajinagar',
    distanceKm: 4.1,
    availability: 'busy',
    hourlyRate: 350,
    startingPrice: 299,
    about: 'Master carpenter with 16 years experience in modular kitchen adjustments, soft-close hardware retrofit, Godrej digital lock fitting, and hardwood furniture repair. Clean dust-controlled working methodology.',
    spokenLanguages: ['Hindi', 'Urdu', 'Kannada', 'English'],
    serviceRadiusKm: 14,
    toolsEquipped: ['Festool Dustless Plunge Saw', 'Laser Measurement Meter', 'Hettich Hinge Template Jigs', 'Makita Cordless Impact Driver'],
    pastWorkPhotos: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=600'
    ],
    kyc: {
      aadhaarNumberMasked: 'XXXX-XXXX-7201',
      aadhaarStatus: 'verified',
      tradeCertificateName: 'Advanced Carpentry & Joinery Master Certification',
      tradeCertificateIssuer: 'Furniture & Fittings Skill Council (FFSC)',
      tradeCertificateStatus: 'verified',
      policeClearanceNumber: 'KA-BLR-CR-55410',
      policeClearanceDate: '2025-08-14',
      policeClearanceStatus: 'verified',
      insurancePolicyNumber: 'BAJAJ-ALLZ-CRP-331',
      insuranceCoverageAmount: '₹3,00,000 Cover',
      insuranceStatus: 'active'
    },
    trustMetrics: {
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
    },
    specialties: ['High Security Deadbolt Fitting', 'Sliding Door Channel Realignment', 'Hydraulic Bed Lift Mechanism', 'Modular Drawer Telescopic Channels'],
    badges: ['FFSC Master', 'Police Cleared', 'Precision Joinery', 'Civic Verified'],
    reviews: [
      {
        id: 'rev-6',
        customerName: 'Deepak Joshi',
        customerCity: 'Bengaluru, Malleshwaram',
        rating: 5,
        date: '4 days ago',
        serviceRendered: 'Sliding Wardrobe Channel Repair',
        comment: 'Farooq repaired two heavy mirror wardrobe doors that were completely jammed. Replaced the bottom nylon wheels with heavy-duty steel bearings. Sliding like butter now.',
        verifiedBooking: true
      }
    ]
  },
  {
    id: 'w-suresh-06',
    name: 'Suresh Nair',
    profession: 'Waterproofing Engineer & Texture Painter',
    categorySlug: 'painter',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400',
    phoneNumber: '+91 97123 88990',
    experienceYears: 11,
    city: 'Bengaluru',
    neighborhood: 'Sarjapur & Bellandur',
    distanceKm: 4.8,
    availability: 'online',
    hourlyRate: 380,
    startingPrice: 799,
    about: 'Specialized in wall dampness diagnosis, Asian Paints Royale luxury finishes, anti-efflorescence chemical injection, and moisture barrier coatings with a 3-year warranty certificate.',
    spokenLanguages: ['English', 'Malayalam', 'Hindi', 'Kannada'],
    serviceRadiusKm: 16,
    toolsEquipped: ['Protimeter Digital Moisture Meter', 'Wagner Airless Paint Sprayer', 'Dust-Free Wall Sander with HEPA Vacuum', 'Thermal Imaging Dampness Camera'],
    pastWorkPhotos: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600'
    ],
    kyc: {
      aadhaarNumberMasked: 'XXXX-XXXX-3891',
      aadhaarStatus: 'verified',
      tradeCertificateName: 'Paints and Coatings Master Applicator Certification',
      tradeCertificateIssuer: 'Paints and Coatings Skill Council (PCSC)',
      tradeCertificateStatus: 'verified',
      policeClearanceNumber: 'KA-BLR-CR-44129',
      policeClearanceDate: '2025-10-02',
      policeClearanceStatus: 'verified',
      insurancePolicyNumber: 'SBI-GEN-PNT-998',
      insuranceCoverageAmount: '₹3,00,000 Safety Cover',
      insuranceStatus: 'active'
    },
    trustMetrics: {
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
    },
    specialties: ['Wall Dampness Thermal Scanning', 'Single Accent Luxury Stencil', 'Anti-Fungal Balcony Coatings', 'Spot Putty Laser Leveling'],
    badges: ['PCSC Certified', 'Thermal Moisture Pro', 'Police Verified', '3-Yr Dampness Warranty'],
    reviews: [
      {
        id: 'rev-7',
        customerName: 'Pooja Iyer',
        customerCity: 'Bengaluru, Sarjapur Road',
        rating: 5,
        date: '2 weeks ago',
        serviceRendered: 'Waterproofing Dampness Polymer Injection',
        comment: 'Used a thermal camera to show us exactly where the external rain seepage was coming from. Treated the wall with hydrophobic polymer and repainted with perfect shade matching.',
        verifiedBooking: true
      }
    ]
  }
];
