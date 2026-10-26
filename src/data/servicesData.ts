import { ServiceCategory } from '../types';

export const INITIAL_SERVICES: ServiceCategory[] = [
  {
    id: 'srv-electrician',
    name: 'Electrical & Power',
    slug: 'electrician',
    iconName: 'Zap',
    description: 'Certified wiremen, short-circuit diagnostics, MCB replacement, inverter setups & heavy load rewiring.',
    startingPrice: 199,
    activeWorkersCount: 48,
    averageRating: 4.86,
    tags: ['MCB Tripping', 'Switchboard Repair', 'Inverter Setup', 'Ceiling Fan', 'Earthing Test'],
    rateCards: [
      { id: 'el-1', name: 'Standard Diagnostic & Inspection', description: 'Comprehensive load & wiring inspection with multimeter report', basePrice: 199, estimatedDurationMinutes: 45, isPopular: true },
      { id: 'el-2', name: 'MCB / Distribution Board Repair', description: 'Isolate trip causes, replace burnt breakers, torque test busbars', basePrice: 449, estimatedDurationMinutes: 60, isPopular: true },
      { id: 'el-3', name: 'Inverter & Dual Battery Wiring', description: 'Install high-capacity inverter, bypass switch & backup line wiring', basePrice: 799, estimatedDurationMinutes: 90 },
      { id: 'el-4', name: 'Ceiling Fan & Heavy Fixture Fitting', description: 'Secure down-rod installation with safety pin & speed capacitor', basePrice: 249, estimatedDurationMinutes: 30 },
      { id: 'el-5', name: 'Complete Room Rewiring (Concealed)', description: 'FR-grade PVC conduit wiring with fire-retardant copper wires', basePrice: 1499, estimatedDurationMinutes: 180 }
    ]
  },
  {
    id: 'srv-plumber',
    name: 'Plumbing & Water Systems',
    slug: 'plumber',
    iconName: 'Wrench',
    description: 'Leak detection, pressure pump fitting, RO servicing, concealed pipe fixes & sanitary ware installation.',
    startingPrice: 249,
    activeWorkersCount: 39,
    averageRating: 4.79,
    tags: ['Pipe Leakage', 'Drain Blockage', 'Motor Pump', 'Tap Replacement', 'Flush Tank'],
    rateCards: [
      { id: 'pl-1', name: 'Tap & Mixer Valve Overhaul', description: 'Spindle replacement, ceramic disc renewal, thread sealant leak fix', basePrice: 249, estimatedDurationMinutes: 30, isPopular: true },
      { id: 'pl-2', name: 'Severe Drain & Sewer Blockage Clearing', description: 'Mechanical drain auger clearing with anti-odor enzyme flush', basePrice: 499, estimatedDurationMinutes: 60, isPopular: true },
      { id: 'pl-3', name: 'Automatic Water Pump / Booster Installation', description: 'Plumbing union joints, check valve fitting, dry-run sensor wiring', basePrice: 899, estimatedDurationMinutes: 90 },
      { id: 'pl-4', name: 'Concealed Wall Leakage Acoustic Detection', description: 'Non-invasive acoustic sensor pinpointing to prevent demolition', basePrice: 1199, estimatedDurationMinutes: 120 },
      { id: 'pl-5', name: 'Western Toilet Flush Tank Overhaul', description: 'Syphon replacement, inlet valve calibrating, anti-siphon check', basePrice: 399, estimatedDurationMinutes: 45 }
    ]
  },
  {
    id: 'srv-ac',
    name: 'AC & Cooling Repair',
    slug: 'ac-repair',
    iconName: 'Snowflake',
    description: 'Split & inverter AC deep jet cleaning, gas charging (R32/R410A), PCB repair & compressor troubleshooting.',
    startingPrice: 499,
    activeWorkersCount: 52,
    averageRating: 4.91,
    tags: ['Jet Service', 'Gas Leakage', 'Not Cooling', 'Water Dripping', 'PCB Diagnostic'],
    rateCards: [
      { id: 'ac-1', name: 'High-Pressure Foam Jet Foam Clean', description: 'Indoor & outdoor coil pressure cleaning, blower wash, tray de-clog', basePrice: 499, estimatedDurationMinutes: 60, isPopular: true },
      { id: 'ac-2', name: 'Nitrogen Pressure Test & Gas Refill', description: 'Zero-leak nitrogen hold test, vacuuming and precision scale gas charge', basePrice: 1799, estimatedDurationMinutes: 90, isPopular: true },
      { id: 'ac-3', name: 'Indoor Unit Water Dripping & Drain Fix', description: 'Condensate slope alignment, chemical flush of drain tube', basePrice: 349, estimatedDurationMinutes: 45 },
      { id: 'ac-4', name: 'Inverter AC Micro-controller PCB Repair', description: 'Micro-controller component repair with 90-day guarantee', basePrice: 1250, estimatedDurationMinutes: 120 },
      { id: 'ac-5', name: 'Uninstallation & Safe Transit Dismantle', description: 'Refrigerant lockdown pump-down, bracket removal, pipe flare cap', basePrice: 699, estimatedDurationMinutes: 60 }
    ]
  },
  {
    id: 'srv-carpenter',
    name: 'Carpentry & Furniture',
    slug: 'carpenter',
    iconName: 'Hammer',
    description: 'Custom cabinetry, lock replacement, sliding wardrobe rollers, hinge repair & teak wood restoration.',
    startingPrice: 299,
    activeWorkersCount: 31,
    averageRating: 4.82,
    tags: ['Door Lock', 'Hinges Fix', 'Wardrobe Sliding', 'Bed Assembly', 'Modular Kitchen'],
    rateCards: [
      { id: 'cp-1', name: 'High-Security Door Lock & Deadbolt Fitting', description: 'Precision mortise cutting, strike plate alignment with master keys', basePrice: 349, estimatedDurationMinutes: 45, isPopular: true },
      { id: 'cp-2', name: 'Soft-Close Hydraulic Hinge Replacement (Pair)', description: 'Auto-closing tension tuning with anti-corrosion stainless screws', basePrice: 299, estimatedDurationMinutes: 30 },
      { id: 'cp-3', name: 'Heavy Sliding Wardrobe Channel & Roller Repair', description: 'Heavy-duty nylon bearing wheels with aluminum track alignment', basePrice: 649, estimatedDurationMinutes: 75, isPopular: true },
      { id: 'cp-4', name: 'Modular Kitchen Drawer Channel Overhaul', description: 'Telescopic drawer channel installation (45kg weight rated)', basePrice: 499, estimatedDurationMinutes: 60 },
      { id: 'cp-5', name: 'Wooden Door Trimming & Anti-Draft Adjustment', description: 'Laser plane trimming for swelling floors and weather stripping', basePrice: 399, estimatedDurationMinutes: 40 }
    ]
  },
  {
    id: 'srv-appliance',
    name: 'Home Appliance Repair',
    slug: 'appliance-repair',
    iconName: 'Tv',
    description: 'Washing machines, microwave ovens, refrigerators, chimneys & water purifiers serviced by certified techs.',
    startingPrice: 299,
    activeWorkersCount: 44,
    averageRating: 4.84,
    tags: ['Washing Machine', 'Refrigerator', 'Microwave', 'Kitchen Chimney', 'RO Water'],
    rateCards: [
      { id: 'ap-1', name: 'Front/Top Load Washing Machine Diagnostic', description: 'Belt, drain motor, suspension damper, inlet valve testing', basePrice: 299, estimatedDurationMinutes: 45, isPopular: true },
      { id: 'ap-2', name: 'Refrigerator Frost-Free Sensor & Compressor Fix', description: 'Bimetal sensor, defrost timer, relay capacitor test & repair', basePrice: 650, estimatedDurationMinutes: 75, isPopular: true },
      { id: 'ap-3', name: 'Kitchen Chimney Deep Chemical Degreasing', description: 'Baffle filter ultrasonic caustic clean, centrifugal blower grease strip', basePrice: 799, estimatedDurationMinutes: 90 },
      { id: 'ap-4', name: 'RO Water Purifier Membrane & Filter Upgrade', description: 'TDS reduction test, 100 GPD membrane + activated carbon stage', basePrice: 599, estimatedDurationMinutes: 60 }
    ]
  },
  {
    id: 'srv-painter',
    name: 'Painting & Waterproofing',
    slug: 'painter',
    iconName: 'Paintbrush',
    description: 'Interior emulsion, exterior weather coats, wall putty smoothening & damp wall chemical injection.',
    startingPrice: 799,
    activeWorkersCount: 28,
    averageRating: 4.88,
    tags: ['Wall Dampness', 'Putty & Sanding', 'Single Room Paint', 'Texture Wall', 'Waterproofing'],
    rateCards: [
      { id: 'pt-1', name: 'Single Accent Wall Stencil & Velvet Finish', description: 'Primer, 2 coats luxury emulsion with geometric/metallic design', basePrice: 1299, estimatedDurationMinutes: 180, isPopular: true },
      { id: 'pt-2', name: 'Waterproofing Dampness Polymer Injection', description: 'Elastomeric membrane application with anti-efflorescence primer', basePrice: 1899, estimatedDurationMinutes: 240, isPopular: true },
      { id: 'pt-3', name: 'Standard Room Touchup & Spot Putty Repair', description: 'Cracks filling, sanding with dustless sander, 2 coats color match', basePrice: 899, estimatedDurationMinutes: 120 }
    ]
  }
];
