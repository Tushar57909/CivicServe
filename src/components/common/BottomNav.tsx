import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Search, Calendar, User, LayoutDashboard, Inbox, DollarSign, Award, ShieldCheck, FileSpreadsheet, AlertTriangle } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentRole, currentRoute, navigateTo, bookings, disputes } = useApp();

  const pendingRequests = bookings.filter(b => b.status === 'requested' || b.status === 'assigned').length;
  const activeBookings = bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled').length;
  const openDisputes = disputes.filter(d => d.status === 'under_investigation' || d.status === 'open').length;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-outline-variant/50 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {currentRole === 'customer' && (
          <>
            <button
              onClick={() => navigateTo('home')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg font-label text-[10px] transition-colors ${
                currentRoute === 'home' ? 'text-primary font-bold' : 'text-slate-500'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
            <button
              onClick={() => navigateTo('services')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg font-label text-[10px] transition-colors ${
                currentRoute === 'services' ? 'text-primary font-bold' : 'text-slate-500'
              }`}
            >
              <Search className="w-5 h-5" />
              <span>Services</span>
            </button>
            <button
              onClick={() => navigateTo('bookings')}
              className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-lg font-label text-[10px] transition-colors ${
                currentRoute === 'bookings' || currentRoute === 'booking-detail' ? 'text-primary font-bold' : 'text-slate-500'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Bookings</span>
              {activeBookings > 0 && (
                <span className="absolute top-0 right-2 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {activeBookings}
                </span>
              )}
            </button>
            <button
              onClick={() => navigateTo('profile')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg font-label text-[10px] transition-colors ${
                currentRoute === 'profile' ? 'text-primary font-bold' : 'text-slate-500'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
          </>
        )}

        {currentRole === 'worker' && (
          <>
            <button
              onClick={() => navigateTo('worker-dashboard')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg font-label text-[10px] transition-colors ${
                currentRoute === 'worker-dashboard' ? 'text-primary font-bold' : 'text-slate-500'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigateTo('worker-requests')}
              className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-lg font-label text-[10px] transition-colors ${
                currentRoute === 'worker-requests' ? 'text-primary font-bold' : 'text-slate-500'
              }`}
            >
              <Inbox className="w-5 h-5" />
              <span>Requests</span>
              {pendingRequests > 0 && (
                <span className="absolute top-0 right-2 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {pendingRequests}
                </span>
              )}
            </button>
            <button
              onClick={() => navigateTo('worker-earnings')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg font-label text-[10px] transition-colors ${
                currentRoute === 'worker-earnings' ? 'text-primary font-bold' : 'text-slate-500'
              }`}
            >
              <DollarSign className="w-5 h-5" />
              <span>Earnings</span>
            </button>
            <button
              onClick={() => navigateTo('worker-reputation')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg font-label text-[10px] transition-colors ${
                currentRoute === 'worker-reputation' ? 'text-primary font-bold' : 'text-slate-500'
              }`}
            >
              <Award className="w-5 h-5" />
              <span>Trust</span>
            </button>
          </>
        )}

        {currentRole === 'admin' && (
          <>
            <button
              onClick={() => navigateTo('admin-dashboard')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg font-label text-[10px] transition-colors ${
                currentRoute === 'admin-dashboard' ? 'text-primary font-bold' : 'text-slate-500'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => navigateTo('admin-workers')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg font-label text-[10px] transition-colors ${
                currentRoute === 'admin-workers' ? 'text-primary font-bold' : 'text-slate-500'
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
              <span>KYC Queue</span>
            </button>
            <button
              onClick={() => navigateTo('admin-bookings')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg font-label text-[10px] transition-colors ${
                currentRoute === 'admin-bookings' ? 'text-primary font-bold' : 'text-slate-500'
              }`}
            >
              <FileSpreadsheet className="w-5 h-5" />
              <span>Bookings</span>
            </button>
            <button
              onClick={() => navigateTo('admin-disputes')}
              className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-lg font-label text-[10px] transition-colors ${
                currentRoute === 'admin-disputes' ? 'text-primary font-bold' : 'text-slate-500'
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
              <span>Disputes</span>
              {openDisputes > 0 && (
                <span className="absolute top-0 right-2 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {openDisputes}
                </span>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
