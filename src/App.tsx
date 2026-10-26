import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { BottomNav } from './components/common/BottomNav';
import { RoleSwitcher } from './components/common/RoleSwitcher';
import { AIAssistantModal } from './components/ai/AIAssistantModal';
import { SplashScreen } from './components/common/SplashScreen';
import { AuthRoleModal } from './components/auth/AuthRoleModal';
import { UserRole } from './types';

// Customer Pages
import { HomePage } from './pages/customer/HomePage';
import { ServiceSearchPage } from './pages/customer/ServiceSearchPage';
import { WorkerProfilePage } from './pages/customer/WorkerProfilePage';
import { NewBookingPage } from './pages/customer/NewBookingPage';
import { BookingsListPage } from './pages/customer/BookingsListPage';
import { BookingDetailPage } from './pages/customer/BookingDetailPage';
import { CustomerProfilePage } from './pages/customer/CustomerProfilePage';
import { PostANeedPage } from './pages/customer/PostANeedPage';


// Worker Pages
import { WorkerDashboardPage } from './pages/worker/WorkerDashboardPage';
import { WorkerRequestsPage } from './pages/worker/WorkerRequestsPage';
import { WorkerJobDetailPage } from './pages/worker/WorkerJobDetailPage';
import { WorkerEarningsPage } from './pages/worker/WorkerEarningsPage';
import { WorkerReputationPage } from './pages/worker/WorkerReputationPage';
import { WorkerVerificationPage } from './pages/worker/WorkerVerificationPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminWorkersPage } from './pages/admin/AdminWorkersPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminDisputesPage } from './pages/admin/AdminDisputesPage';
import { ThreeStrikeAuditPage } from './pages/admin/ThreeStrikeAuditPage';

import { ShieldCheck } from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    currentRoute, 
    currentRole, 
    isAiModalOpen, 
    setIsAiModalOpen, 
    navigateTo, 
    setCurrentRole,
    isAuthModalOpen,
    setIsAuthModalOpen
  } = useApp();

  // Startup Splash Screen and Auth Role Modal states
  const [showSplash, setShowSplash] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSplashFinish = () => {
    setShowSplash(false);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (role: UserRole) => {
    setShowAuthModal(false);
    setIsAuthModalOpen(false);
    if (role === 'worker') {
      navigateTo('worker-dashboard');
    } else if (role === 'admin') {
      navigateTo('admin-dashboard');
    }
  };


  const renderActiveRoute = () => {
    switch (currentRoute) {
      // Customer Routes
      case 'home':
        return <HomePage />;
      case 'services':
        return <ServiceSearchPage />;
      case 'post-a-need':
      case 'post-need':
        return <PostANeedPage />;
      case 'worker-profile':
      case 'worker-detail':
        return <WorkerProfilePage />;
      case 'new-booking':
      case 'booking-new':
        return <NewBookingPage />;
      case 'bookings-list':
      case 'bookings':
        return <BookingsListPage />;
      case 'booking-detail':
        return <BookingDetailPage />;
      case 'customer-profile':
      case 'profile':
        return <CustomerProfilePage />;

      // Worker Routes
      case 'worker-dashboard':
        return <WorkerDashboardPage />;
      case 'worker-requests':
        return <WorkerRequestsPage />;
      case 'worker-job-detail':
        return <WorkerJobDetailPage />;
      case 'worker-earnings':
        return <WorkerEarningsPage />;
      case 'worker-reputation':
        return <WorkerReputationPage />;
      case 'worker-verification':
        return <WorkerVerificationPage />;

      // Admin Routes
      case 'admin':
      case 'admin-dashboard':
        return <AdminDashboardPage />;
      case 'admin-workers':
        return <AdminWorkersPage />;
      case 'admin-bookings':
        return <AdminBookingsPage />;
      case 'admin-disputes':
        return <AdminDisputesPage />;
      case 'three-strike-audit':
      case 'strikes':
        return <ThreeStrikeAuditPage />;

      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-warm-100 text-slate-900 font-sans">
      
      {/* 1. Initial Startup Splash Screen */}
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}

      {/* 2. Role Selection & Auth Modal */}
      {(showAuthModal || isAuthModalOpen) && (
        <AuthRoleModal
          isOpen={showAuthModal || isAuthModalOpen}
          onSuccess={handleAuthSuccess}
          canDismiss={!showSplash}
        />
      )}


      {/* Role-Aware Sticky Navbar */}
      <Navbar />

      {/* Main Page Viewport */}
      <main className="flex-1 pb-20 lg:pb-12">
        {renderActiveRoute()}
      </main>

      {/* Global AI Assistant Modal */}
      <AIAssistantModal 
        isOpen={isAiModalOpen} 
        onClose={() => setIsAiModalOpen(false)} 
      />

      {/* Floating Demo Role Switcher Toolbar */}
      <RoleSwitcher />

      {/* Mobile App Bottom Navigation */}
      <BottomNav />

      {/* Civic Trust Footer */}
      <footer className="bg-white border-t border-warm-200 pt-10 pb-20 lg:pb-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-trust-400" />
            </div>
            <span className="font-extrabold text-slate-900">CivicServe</span>
            <span className="text-slate-400">• Reliable Service Workers Initiative</span>
          </div>

          <div className="flex items-center space-x-3 text-slate-500 font-semibold">
            <span>Aadhaar Verified</span>
            <span>•</span>
            <span>Escrow Protected</span>
            <span>•</span>
            <span>Bengaluru Metro</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ToastProvider>
  );
}

export default App;
