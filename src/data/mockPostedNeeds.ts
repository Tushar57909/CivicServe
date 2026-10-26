import { PostedNeed, WorkerStrike } from '../types';

export const INITIAL_POSTED_NEEDS: PostedNeed[] = [
  {
    id: 'need-101',
    customerId: 'cust-arjun-01',
    customerName: 'Arjun Menon',
    customerPhone: '+91 98801 22334',
    customerAadhaarVerified: true,
    categorySlug: 'electrician',
    title: 'Short circuit sparking in master bedroom main board & AC trip',
    description: 'The 32A MCB keeps tripping whenever the split AC turns on. Need an expert electrician with digital multimeter to isolate ground fault and replace faulty breaker today.',
    budgetMin: 350,
    budgetMax: 700,
    location: 'Indiranagar 100ft Road, Bengaluru',
    urgency: 'immediate',
    status: 'open',
    createdAt: '15 mins ago',
    bids: [
      {
        id: 'bid-1',
        workerId: 'w-rajesh-01',
        workerName: 'Rajesh Sharma',
        workerAvatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
        workerProfession: 'Certified Senior Electrician',
        trustScore: 98,
        quotedPrice: 450,
        estimatedArrivalMinutes: 18,
        message: 'I am in Indiranagar 12th Main with insulated toolkit and spare Siemens 32A MCBs. Can reach in 15 mins.',
        createdAt: '10 mins ago'
      },
      {
        id: 'bid-2',
        workerId: 'w-vikram-04',
        workerName: 'Vikram Singh',
        workerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
        workerProfession: 'HVAC & Power Specialist',
        trustScore: 94,
        quotedPrice: 500,
        estimatedArrivalMinutes: 25,
        message: 'Can diagnose both the AC compressor load and the distribution board wiring with thermal scanner.',
        createdAt: '6 mins ago'
      }
    ]
  },
  {
    id: 'need-102',
    customerId: 'cust-sunita-02',
    customerName: 'Sunita Rao',
    customerPhone: '+91 98450 67890',
    customerAadhaarVerified: true,
    categorySlug: 'plumber',
    title: 'Kitchen sink pipe burst & main overhead tank valve replacement',
    description: 'Heavy water leakage under modular kitchen cabinet. Need CPVC heat-welding and high pressure gate valve repair.',
    budgetMin: 400,
    budgetMax: 850,
    location: 'Koramangala 4th Block, Bengaluru',
    urgency: 'immediate',
    status: 'open',
    createdAt: '42 mins ago',
    bids: [
      {
        id: 'bid-3',
        workerId: 'w-suresh-02',
        workerName: 'Suresh Kumar',
        workerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
        workerProfession: 'Master Plumber & Pipefitter',
        trustScore: 96,
        quotedPrice: 550,
        estimatedArrivalMinutes: 20,
        message: 'Carrying Astral CPVC fittings and rotary pipe threader in my service van.',
        createdAt: '30 mins ago'
      }
    ]
  },
  {
    id: 'need-103',
    customerId: 'cust-rohit-03',
    customerName: 'Rohit Kulkarni',
    customerPhone: '+91 99001 55443',
    customerAadhaarVerified: true,
    categorySlug: 'carpenter',
    title: 'Teak wood main door lock realignment & hydraulic closer fitting',
    description: 'Heavy main door scraping floor after monsoon swelling. Need leveling and Godrej heavy-duty mortise lock alignment.',
    budgetMin: 500,
    budgetMax: 1000,
    location: 'HSR Layout Sector 2, Bengaluru',
    urgency: 'today',
    status: 'open',
    createdAt: '2 hours ago',
    bids: [
      {
        id: 'bid-4',
        workerId: 'w-manoj-03',
        workerName: 'Manoj Panchal',
        workerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
        workerProfession: 'Architectural Carpenter',
        trustScore: 95,
        quotedPrice: 650,
        estimatedArrivalMinutes: 35,
        message: 'Equipped with electric planer, precision chisel set, and Godrej certified mortise tools.',
        createdAt: '1 hour ago'
      }
    ]
  }
];

export const INITIAL_STRIKES_AUDIT: Record<string, WorkerStrike[]> = {
  'w-anil-06': [
    {
      strikeNumber: 1,
      reason: 'Late arrival by >45 mins without customer notification in Koramangala',
      date: '2026-08-14',
      penalty: 'Formal warning logged on verified pro ledger'
    },
    {
      strikeNumber: 2,
      reason: 'Unjustified off-platform cash quote dispute reported by verified resident',
      date: '2026-08-19',
      penalty: 'Search visibility reduced by 40% for 7 days + Escrow mandatory flag'
    }
  ]
};
