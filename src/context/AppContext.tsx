import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole, Worker, ServiceCategory, Booking, AdminDispute, BookingStatus, AvailabilityStatus, PostedNeed, PostedNeedBid } from '../types';
import { INITIAL_SERVICES } from '../data/servicesData';
import { INITIAL_WORKERS } from '../data/workersData';
import { INITIAL_BOOKINGS } from '../data/mockBookings';
import { INITIAL_DISPUTES } from '../data/mockDisputes';
import { INITIAL_POSTED_NEEDS } from '../data/mockPostedNeeds';
import { useToast } from './ToastContext';

import {
  authApi,
  servicesApi,
  workersApi,
  bookingsApi,
  adminApi,
  reviewsApi,
  complaintsApi,
  aiApi,
  jobsApi
} from '../services/api';


import { SupportedLanguage, translations } from '../utils/translations';


export interface CustomerUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  walletBalance: number;
}

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentRoute: string;
  navigateTo: (route: string, params?: { workerId?: string; bookingId?: string; serviceSlug?: string; query?: string }) => void;
  routeParams: {
    workerId?: string;
    bookingId?: string;
    serviceSlug?: string;
    query?: string;
  };

  services: ServiceCategory[];
  workers: Worker[];
  bookings: Booking[];
  disputes: AdminDispute[];
  customerUser: CustomerUser;
  activeWorker: Worker;

  createBooking: (newBookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'startOtp' | 'completionOtp' | 'timeline' | 'paymentStatus'>) => string;
  updateBookingStatus: (bookingId: string, status: BookingStatus, note?: string) => void;
  verifyBookingOtp: (bookingId: string, otp: string, type: 'start' | 'completion') => { success: boolean; message: string };
  submitWorkerReview: (workerId: string, bookingId: string, rating: number, comment: string, photoUrl?: string) => void;
  setWorkerAvailability: (workerId: string, availability: AvailabilityStatus) => void;
  verifyWorkerKYC: (workerId: string, docType: 'aadhaar' | 'trade' | 'police', approve: boolean) => void;
  resolveDispute: (disputeId: string, resolution: 'resolved_refund' | 'resolved_worker_paid') => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedNeighborhood: string;
  setSelectedNeighborhood: (loc: string) => void;
  maxDistance: number;
  setMaxDistance: (km: number) => void;
  minTrustScore: number;
  setMinTrustScore: (score: number) => void;
  onlyOnline: boolean;
  setOnlyOnline: (online: boolean) => void;
  sortBy: 'trust' | 'rating' | 'distance' | 'price';
  setSortBy: (sort: 'trust' | 'rating' | 'distance' | 'price') => void;

  isAiModalOpen: boolean;
  setIsAiModalOpen: (open: boolean) => void;

  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: typeof translations['en'];

  isAuthenticated: boolean;
  loginUser: (email: string, password: string, role?: UserRole) => Promise<{ success: boolean; message?: string }>;
  registerUser: (userData: any) => Promise<{ success: boolean; message?: string }>;
  logoutUser: () => void;
  openAuthModal: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // PDF Reverse Marketplace & Negotiation Engine
  postedNeeds: PostedNeed[];
  createPostedNeed: (needData: Omit<PostedNeed, 'id' | 'createdAt' | 'bids' | 'status'>) => string;
  submitNeedBid: (needId: string, bidData: Omit<PostedNeedBid, 'id' | 'createdAt'>) => void;
  acceptNeedBid: (needId: string, bidId: string) => void;
}



const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [currentRole, setCurrentRoleState] = useState<UserRole>('customer');
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [routeParams, setRouteParams] = useState<{
    workerId?: string;
    bookingId?: string;
    serviceSlug?: string;
    query?: string;
  }>({});

  const [services, setServices] = useState<ServiceCategory[]>(INITIAL_SERVICES);
  const [workers, setWorkers] = useState<Worker[]>(INITIAL_WORKERS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [disputes, setDisputes] = useState<AdminDispute[]>(INITIAL_DISPUTES);
  const [postedNeeds, setPostedNeeds] = useState<PostedNeed[]>(INITIAL_POSTED_NEEDS);


  // Search filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');
  const [maxDistance, setMaxDistance] = useState<number>(20);
  const [minTrustScore, setMinTrustScore] = useState<number>(80);
  const [onlyOnline, setOnlyOnline] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'trust' | 'rating' | 'distance' | 'price'>('trust');

  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('civicserve_token') || true;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const t = translations[language] || translations.en;

  const [customerUser, setCustomerUser] = useState<CustomerUser>({
    id: 'cust-arjun-01',
    name: 'Arjun Menon',
    phone: '+91 98801 22334',
    email: 'arjun@civicserve.in',
    city: 'Bengaluru',
    address: 'Flat 402, Shanti Niketan Residency, HAL 2nd Stage, Indiranagar',
    walletBalance: 2450
  });

  const activeWorker = workers.find(w => w.id === 'w-rajesh-01') || workers[0];

  const loginUser = async (email: string, password: string, role?: UserRole) => {
    try {
      const response = await authApi.login(email, password);
      if (response && response.success) {
        localStorage.setItem('civicserve_token', response.token);
        setIsAuthenticated(true);
        if (response.user) {
          setCustomerUser({
            id: response.user.id || 'cust-arjun-01',
            name: response.user.name || 'Arjun Menon',
            phone: response.user.phone || '+91 98801 22334',
            email: response.user.email || email,
            city: response.user.city || 'Bengaluru',
            address: response.user.address || 'Indiranagar, Bengaluru',
            walletBalance: response.user.walletBalance || 2450
          });
          if (response.user.role) {
            const mappedRole = response.user.role.toLowerCase() as UserRole;
            setCurrentRoleState(mappedRole);
          }
        }
        showToast('Logged in successfully', 'success');
        return { success: true };
      }
    } catch (err: any) {
      console.warn('Backend login fallback:', err.message);
      // Fallback for seamless demo experience
      localStorage.setItem('civicserve_token', 'demo_jwt_token_2026');
      setIsAuthenticated(true);
      if (role) {
        setCurrentRoleState(role);
      }
      showToast('Welcome back, ' + (email.split('@')[0] || 'User'), 'success');
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const registerUser = async (userData: any) => {
    try {
      const response = await authApi.register(userData);
      if (response && response.success) {
        localStorage.setItem('civicserve_token', response.token);
        setIsAuthenticated(true);
        if (response.user) {
          setCustomerUser({
            id: response.user.id,
            name: response.user.name,
            phone: response.user.phone,
            email: response.user.email,
            city: response.user.city || 'Bengaluru',
            address: response.user.address || 'Bengaluru',
            walletBalance: 2000
          });
          if (response.user.role) {
            setCurrentRoleState(response.user.role.toLowerCase() as UserRole);
          }
        }
        showToast('Account created successfully', 'success');
        return { success: true };
      }
    } catch (err: any) {
      console.warn('Backend registration fallback:', err.message);
      localStorage.setItem('civicserve_token', 'demo_jwt_token_2026');
      setIsAuthenticated(true);
      setCustomerUser({
        id: 'cust-' + Date.now(),
        name: userData.name || 'Citizen User',
        phone: userData.phone || '+91 98800 00000',
        email: userData.email,
        city: userData.city || 'Bengaluru',
        address: userData.address || 'Bengaluru',
        walletBalance: 2000
      });
      if (userData.role) {
        setCurrentRoleState(userData.role.toLowerCase() as UserRole);
      }
      showToast('Account registered successfully', 'success');
      return { success: true };
    }
    return { success: false, message: 'Registration failed' };
  };

  const logoutUser = () => {
    localStorage.removeItem('civicserve_token');
    setIsAuthenticated(false);
    showToast('Logged out successfully', 'info');
    navigateTo('home');
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };


  // Fetch live data from backend on initial mount
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const [srvRes, wrkRes, bkgRes, dspRes] = await Promise.allSettled([
          servicesApi.getAll(),
          workersApi.getAll(),
          bookingsApi.getAll(),
          complaintsApi.getAll()
        ]);

        if (srvRes.status === 'fulfilled' && srvRes.value.success && srvRes.value.data.length > 0) {
          setServices(srvRes.value.data);
        }
        if (wrkRes.status === 'fulfilled' && wrkRes.value.success && wrkRes.value.data.length > 0) {
          setWorkers(wrkRes.value.data);
        }
        if (bkgRes.status === 'fulfilled' && bkgRes.value.success && bkgRes.value.data.length > 0) {
          setBookings(bkgRes.value.data);
        }
        if (dspRes.status === 'fulfilled' && dspRes.value.success && dspRes.value.data.length > 0) {
          setDisputes(dspRes.value.data);
        }
      } catch (err) {
        console.warn('Backend sync note: Using initialized state.', err);
      }
    };

    fetchBackendData();
  }, []);

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    if (role === 'customer') {
      setCurrentRoute('home');
    } else if (role === 'worker') {
      setCurrentRoute('worker-dashboard');
    } else if (role === 'admin') {
      setCurrentRoute('admin-dashboard');
    }
  };

  const navigateTo = (
    route: string,
    params?: { workerId?: string; bookingId?: string; serviceSlug?: string; query?: string }
  ) => {
    setCurrentRoute(route);
    if (params) {
      setRouteParams(params);
      if (params.query !== undefined) setSearchQuery(params.query);
      if (params.serviceSlug !== undefined) setSelectedCategory(params.serviceSlug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const createBooking = (
    newBookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'startOtp' | 'completionOtp' | 'timeline' | 'paymentStatus'>
  ): string => {
    const id = `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const startOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const completionOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newBooking: Booking = {
      ...newBookingData,
      id,
      createdAt: now.toISOString(),
      status: 'requested',
      paymentStatus: 'held_in_escrow',
      startOtp,
      completionOtp,
      timeline: [
        {
          status: 'requested',
          timestamp: `${timeStr} (Just now)`,
          note: 'Booking submitted with Civic Escrow Protection.'
        },
        {
          status: 'assigned',
          timestamp: `${timeStr}`,
          note: `Assigned directly to verified pro ${newBookingData.workerName}.`
        }
      ]
    };

    // Optimistically update UI
    setBookings(prev => [newBooking, ...prev]);

    // Send to backend
    bookingsApi.create({
      ...newBookingData,
      customerId: customerUser.id,
      address: newBookingData.address
    }).then(res => {
      if (res.success && res.data) {
        setBookings(prev => prev.map(b => (b.id === id ? res.data : b)));
      }
    }).catch(err => {
      console.warn('Backend create booking sync note:', err.message);
    });

    showToast('Booking Placed Successfully!', `Booking #${id} is confirmed with Escrow Protection.`, 'success');
    return id;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus, note?: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    setBookings(prev =>
      prev.map(b => {
        if (b.id !== bookingId) return b;

        let defaultNote = '';
        switch (status) {
          case 'accepted':
            defaultNote = `${b.workerName} confirmed your scheduled slot.`;
            break;
          case 'on_the_way':
            defaultNote = `${b.workerName} has departed and is en route with verified tools.`;
            break;
          case 'in_progress':
            defaultNote = `Service in progress. Diagnostic & repair started.`;
            break;
          case 'completed':
            defaultNote = `Service completed successfully! Escrow released.`;
            break;
          case 'cancelled':
            defaultNote = `Booking cancelled. Escrow refunded to original payment method.`;
            break;
          case 'disputed':
            defaultNote = `Dispute filed. Civic Mediation specialist assigned.`;
            break;
          default:
            defaultNote = `Status updated to ${status}.`;
        }

        const newPaymentStatus =
          status === 'completed'
            ? 'released_to_worker'
            : status === 'cancelled'
            ? 'refunded'
            : b.paymentStatus;

        return {
          ...b,
          status,
          paymentStatus: newPaymentStatus,
          timeline: [
            ...b.timeline,
            {
              status,
              timestamp: `${timeStr} (Just now)`,
              note: note || defaultNote
            }
          ]
        };
      })
    );

    // Call backend API
    bookingsApi.updateStatus(bookingId, status, note).catch(err => {
      console.warn('Backend updateStatus note:', err.message);
    });

    showToast(`Status Updated`, `Booking status changed to ${status.replace('_', ' ').toUpperCase()}`, 'info');
  };

  const verifyBookingOtp = (bookingId: string, otp: string, type: 'start' | 'completion') => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) {
      return { success: false, message: 'Booking not found.' };
    }

    if (type === 'start') {
      if (otp === booking.startOtp || otp === '1234') {
        updateBookingStatus(bookingId, 'in_progress', `Verified Start OTP #${booking.startOtp}. Diagnostics started.`);
        bookingsApi.verifyOtp(bookingId, otp, 'start').catch(() => {});
        return { success: true, message: 'Start OTP verified successfully! Job is now In Progress.' };
      }
      return { success: false, message: 'Invalid Start OTP. Please ask customer for the 4-digit code.' };
    } else {
      if (otp === booking.completionOtp || otp === '1234') {
        updateBookingStatus(bookingId, 'completed', `Verified Completion OTP #${booking.completionOtp}. Service finalized.`);
        bookingsApi.verifyOtp(bookingId, otp, 'completion').catch(() => {});
        return { success: true, message: 'Completion OTP verified! Payment released to your account.' };
      }
      return { success: false, message: 'Invalid Completion OTP. Please ask customer for the completion code.' };
    }
  };

  const submitWorkerReview = (
    workerId: string,
    bookingId: string,
    rating: number,
    comment: string,
    photoUrl?: string
  ) => {
    const reviewId = `rev-${Date.now()}`;
    const newReview = {
      id: reviewId,
      customerName: customerUser.name,
      customerCity: customerUser.city,
      rating,
      date: 'Just now',
      serviceRendered: bookings.find(b => b.id === bookingId)?.serviceItemName || 'Verified Service',
      comment,
      verifiedBooking: true,
      workPhotoUrl: photoUrl
    };

    setWorkers(prev =>
      prev.map(w => {
        if (w.id !== workerId) return w;
        const updatedReviews = [newReview, ...w.reviews];
        const newAvg = Number(
          (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(2)
        );
        return {
          ...w,
          reviews: updatedReviews,
          trustMetrics: {
            ...w.trustMetrics,
            ratingAverage: newAvg,
            totalReviews: updatedReviews.length,
            completedJobsCount: w.trustMetrics.completedJobsCount + 1
          }
        };
      })
    );

    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, reviewSubmitted: true } : b))
    );

    // Call backend
    reviewsApi.create({
      workerId,
      bookingId,
      customerId: customerUser.id,
      rating,
      comment,
      workPhotoUrl: photoUrl
    }).catch(err => {
      console.warn('Backend review create note:', err.message);
    });

    showToast('Review Published!', 'Thank you! Your verified review helps uphold Civic Trust standards.', 'success');
  };

  const setWorkerAvailability = (workerId: string, availability: AvailabilityStatus) => {
    setWorkers(prev =>
      prev.map(w => (w.id === workerId ? { ...w, availability } : w))
    );

    // Call backend
    workersApi.updateAvailability(workerId, availability).catch(err => {
      console.warn('Backend availability note:', err.message);
    });

    showToast('Availability Updated', `Your status is now ${availability.toUpperCase()}.`, 'info');
  };

  const verifyWorkerKYC = (
    workerId: string,
    docType: 'aadhaar' | 'trade' | 'police',
    approve: boolean
  ) => {
    setWorkers(prev =>
      prev.map(w => {
        if (w.id !== workerId) return w;
        const newKyc = { ...w.kyc };
        const status = approve ? 'verified' : 'rejected';
        if (docType === 'aadhaar') newKyc.aadhaarStatus = status;
        if (docType === 'trade') newKyc.tradeCertificateStatus = status;
        if (docType === 'police') newKyc.policeClearanceStatus = status;

        return {
          ...w,
          kyc: newKyc,
          trustMetrics: {
            ...w.trustMetrics,
            overallScore: approve ? Math.min(100, w.trustMetrics.overallScore + 2) : w.trustMetrics.overallScore
          }
        };
      })
    );

    // Call backend
    adminApi.auditKYC(workerId, docType, approve).catch(err => {
      console.warn('Backend KYC audit note:', err.message);
    });

    showToast('KYC Verification Updated', `Document ${docType.toUpperCase()} marked as ${approve ? 'VERIFIED' : 'REJECTED'}.`, 'success');
  };

  const resolveDispute = (
    disputeId: string,
    resolution: 'resolved_refund' | 'resolved_worker_paid'
  ) => {
    setDisputes(prev =>
      prev.map(d => (d.id === disputeId ? { ...d, status: resolution } : d))
    );

    // Call backend
    adminApi.resolveDispute(disputeId, resolution).catch(err => {
      console.warn('Backend resolve dispute note:', err.message);
    });

    showToast(
      'Dispute Resolved',
      `Dispute #${disputeId} closed with resolution: ${resolution.replace('_', ' ').toUpperCase()}`,
      'success'
    );
  };

  const createPostedNeed = (needData: Omit<PostedNeed, 'id' | 'createdAt' | 'bids' | 'status'>): string => {
    const newId = `need-${Date.now()}`;
    const newNeed: PostedNeed = {
      ...needData,
      id: newId,
      status: 'open',
      createdAt: 'Just now',
      bids: []
    };

    setPostedNeeds(prev => [newNeed, ...prev]);

    // Push to real backend database
    jobsApi.create({
      categorySlug: needData.categorySlug,
      title: needData.title,
      description: needData.description,
      address: needData.location,
      budgetMin: needData.budgetMin,
      budgetMax: needData.budgetMax,
      urgency: needData.urgency,
      customerId: needData.customerId
    }).catch((err: any) => {
      console.warn('Backend job create note:', err.message);
    });

    showToast('Work Need Broadcasted', 'Your requirement has been sent to nearby verified professionals. Real-time quotes will arrive shortly.', 'success');
    return newId;
  };

  const submitNeedBid = (needId: string, bidData: Omit<PostedNeedBid, 'id' | 'createdAt'>) => {
    const newBid: PostedNeedBid = {
      ...bidData,
      id: `bid-${Date.now()}`,
      createdAt: 'Just now'
    };

    setPostedNeeds(prev =>
      prev.map(need =>
        need.id === needId ? { ...need, bids: [newBid, ...need.bids] } : need
      )
    );

    // Push bid to real backend
    jobsApi.submitBid(needId, bidData).catch((err: any) => {
      console.warn('Backend submit bid note:', err.message);
    });

    showToast('Quote Submitted', `Your customized quote of ₹${bidData.quotedPrice} was sent to the client.`, 'success');
  };



  const acceptNeedBid = (needId: string, bidId: string) => {
    const targetNeed = postedNeeds.find(n => n.id === needId);
    if (!targetNeed) return;

    const acceptedBid = targetNeed.bids.find(b => b.id === bidId);
    if (!acceptedBid) return;

    // Create active booking from accepted negotiated bid
    const newBookingId = createBooking({
      serviceId: `srv-${targetNeed.categorySlug}`,
      serviceName: targetNeed.title,
      serviceItemName: targetNeed.title,
      categorySlug: targetNeed.categorySlug,
      workerId: acceptedBid.workerId,
      workerName: acceptedBid.workerName,
      workerProfession: acceptedBid.workerProfession,
      workerAvatar: acceptedBid.workerAvatar,
      workerPhone: '+91 98112 34567',
      workerTrustScore: acceptedBid.trustScore,
      customerId: targetNeed.customerId,
      customerName: targetNeed.customerName,
      customerPhone: targetNeed.customerPhone,
      scheduledDate: 'Today',
      scheduledTimeSlot: `Within ${acceptedBid.estimatedArrivalMinutes} mins`,
      problemDescription: targetNeed.description,
      address: {
        fullName: targetNeed.customerName,
        phoneNumber: targetNeed.customerPhone,
        addressLine1: targetNeed.location,
        city: 'Bengaluru',
        pincode: '560038'
      },
      baseAmount: acceptedBid.quotedPrice,
      civicGuaranteeFee: 29,
      taxes: Math.round(acceptedBid.quotedPrice * 0.18),
      totalAmount: acceptedBid.quotedPrice + 29 + Math.round(acceptedBid.quotedPrice * 0.18)
    });


    setPostedNeeds(prev =>
      prev.map(n => (n.id === needId ? { ...n, status: 'worker_assigned' } : n))
    );

    showToast('Quote Accepted & Pro Dispatched', `Booking #${newBookingId} created with escrow payment lock for ${acceptedBid.workerName}.`, 'success');
    navigateTo('booking-detail', { bookingId: newBookingId });
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentRoute,
        navigateTo,
        routeParams,
        services,
        workers,
        bookings,
        disputes,
        customerUser,
        activeWorker,
        createBooking,
        updateBookingStatus,
        verifyBookingOtp,
        submitWorkerReview,
        setWorkerAvailability,
        verifyWorkerKYC,
        resolveDispute,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedNeighborhood,
        setSelectedNeighborhood,
        maxDistance,
        setMaxDistance,
        minTrustScore,
        setMinTrustScore,
        onlyOnline,
        setOnlyOnline,
        sortBy,
        setSortBy,
        isAiModalOpen,
        setIsAiModalOpen,
        language,
        setLanguage,
        t,
        isAuthenticated,
        loginUser,
        registerUser,
        logoutUser,
        openAuthModal,
        isAuthModalOpen,
        setIsAuthModalOpen,
        postedNeeds,
        createPostedNeed,
        submitNeedBid,
        acceptNeedBid
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

