export type UserRole = 'customer' | 'worker' | 'admin';

export type AvailabilityStatus = 'online' | 'busy' | 'offline';

export interface KYCDocuments {
  aadhaarNumberMasked: string;
  aadhaarStatus: 'verified' | 'pending' | 'rejected';
  tradeCertificateName: string;
  tradeCertificateIssuer: string;
  tradeCertificateStatus: 'verified' | 'pending' | 'rejected';
  policeClearanceNumber: string;
  policeClearanceDate: string;
  policeClearanceStatus: 'verified' | 'pending' | 'rejected';
  insurancePolicyNumber?: string;
  insuranceCoverageAmount?: string;
  insuranceStatus: 'active' | 'expired' | 'none';
}

export interface TrustMetrics {
  overallScore: number; // 0 - 100
  ratingAverage: number; // 0 - 5.0
  totalReviews: number;
  completedJobsCount: number;
  onTimeArrivalRate: number; // e.g. 98%
  cancellationRate: number; // e.g. 1.2%
  repeatCustomerRate: number; // e.g. 42%
  zeroComplaintStreakDays: number;
  averageResponseMinutes: number;
  skillCertificationLevel: 'Master Craftsman' | 'Certified Professional' | 'Apprentice';
}

export interface ServiceRateCardItem {
  id: string;
  name: string;
  description: string;
  basePrice: number; // in INR
  estimatedDurationMinutes: number;
  isPopular?: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  startingPrice: number;
  activeWorkersCount: number;
  averageRating: number;
  tags: string[];
  rateCards: ServiceRateCardItem[];
}

export interface WorkerReview {
  id: string;
  customerName: string;
  customerCity: string;
  rating: number;
  date: string;
  serviceRendered: string;
  comment: string;
  verifiedBooking: boolean;
  workPhotoUrl?: string;
}

export interface Worker {
  id: string;
  name: string;
  profession: string;
  categorySlug: string;
  avatarUrl: string;
  phoneNumber: string;
  experienceYears: number;
  city: string;
  neighborhood: string;
  distanceKm: number;
  availability: AvailabilityStatus;
  hourlyRate: number;
  startingPrice: number;
  about: string;
  spokenLanguages: string[];
  serviceRadiusKm: number;
  toolsEquipped: string[];
  pastWorkPhotos: string[];
  kyc: KYCDocuments;
  trustMetrics: TrustMetrics;
  reviews: WorkerReview[];
  specialties: string[];
  badges: string[];
}

export type BookingStatus = 
  | 'requested'
  | 'assigned'
  | 'accepted'
  | 'on_the_way'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'disputed';

export interface BookingAddress {
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  pincode: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceItemName: string;
  categorySlug: string;
  workerId: string;
  workerName: string;
  workerProfession: string;
  workerAvatar: string;
  workerPhone: string;
  workerTrustScore: number;
  customerId: string;
  customerName: string;
  customerPhone: string;
  status: BookingStatus;
  scheduledDate: string;
  scheduledTimeSlot: string;
  createdAt: string;
  problemDescription: string;
  problemPhotoUrl?: string;
  address: BookingAddress;
  baseAmount: number;
  civicGuaranteeFee: number;
  taxes: number;
  totalAmount: number;
  paymentStatus: 'pending' | 'held_in_escrow' | 'released_to_worker' | 'refunded';
  startOtp: string; // 4-digit code to start
  completionOtp: string; // 4-digit code to finish
  timeline: {
    status: BookingStatus;
    timestamp: string;
    note: string;
  }[];
  reviewSubmitted?: boolean;
}

export interface AdminDispute {
  id: string;
  bookingId: string;
  customerName: string;
  workerName: string;
  serviceName: string;
  amount: number;
  reason: string;
  status: 'open' | 'under_investigation' | 'resolved_refund' | 'resolved_worker_paid';
  createdAt: string;
  priority: 'high' | 'medium' | 'low';
}

export interface AIQueryResult {
  detectedCategory: string;
  detectedProblem: string;
  recommendedPriceRange: [number, number];
  urgency: 'immediate' | 'scheduled' | 'flexible';
  extractedLocation?: string;
  matchingWorkerIds: string[];
  explanation: string;
}

export interface WorkerStrike {
  strikeNumber: 1 | 2 | 3;
  reason: string;
  date: string;
  penalty: string;
}

export interface PostedNeedBid {
  id: string;
  workerId: string;
  workerName: string;
  workerAvatar: string;
  workerProfession: string;
  trustScore: number;
  quotedPrice: number;
  estimatedArrivalMinutes: number;
  message: string;
  createdAt: string;
}

export interface PostedNeed {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAadhaarVerified: boolean;
  categorySlug: string;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  location: string;
  urgency: 'immediate' | 'today' | 'flexible';
  status: 'open' | 'worker_assigned' | 'completed';
  bids: PostedNeedBid[];
  createdAt: string;
}

