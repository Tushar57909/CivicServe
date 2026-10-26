import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  Calendar, 
  ChevronDown, 
  Search,
  Briefcase,
  LayoutDashboard,
  Award,
  Wallet,
  FileCheck,
  AlertCircle,
  LogIn,
  LogOut,
  User,
  UserCheck
} from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';

export const Navbar: React.FC = () => {
  const { 
    currentRole, 
    currentRoute, 
    navigateTo, 
    customerUser, 
    bookings, 
    selectedNeighborhood, 
    setSelectedNeighborhood,
    setIsAiModalOpen,
    isAuthenticated,
    logoutUser,
    openAuthModal,
    t
  } = useApp();

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);


  const neighborhoods = [
    { label: 'All Bengaluru', value: 'all' },
    { label: 'Indiranagar', value: 'Indiranagar' },
    { label: 'Koramangala', value: 'Koramangala' },
    { label: 'HSR Layout', value: 'HSR Layout' },
    { label: 'Whitefield', value: 'Whitefield' },
    { label: 'Malleshwaram', value: 'Malleshwaram' },
    { label: 'Sarjapur Road', value: 'Sarjapur' }
  ];

  const activeBookingsCount = bookings.filter(
    b => b.status !== 'completed' && b.status !== 'cancelled'
  ).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-warm-200 shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Location */}
          <div className="flex items-center space-x-4 lg:space-x-8">
            <button
              onClick={() => navigateTo(currentRole === 'customer' ? 'home' : currentRole === 'worker' ? 'worker-dashboard' : 'admin-dashboard')}
              className="flex items-center space-x-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm group-hover:bg-slate-800 transition-colors">
                <ShieldCheck className="w-6 h-6 text-trust-500" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-950 block leading-tight">
                  Civic<span className="text-trust-600">Serve</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase">
                  Verified Local Pros
                </span>
              </div>
            </button>

            {/* Location Selector (Customer view) */}
            {currentRole === 'customer' && (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsLocationOpen(!isLocationOpen)}
                  className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-warm-100 hover:bg-warm-200 border border-warm-300 text-sm font-medium text-slate-800 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-slate-600" />
                  <span>{selectedNeighborhood === 'all' ? 'Bengaluru (All Areas)' : selectedNeighborhood}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {isLocationOpen && (
                  <div className="absolute top-full mt-2 left-0 w-56 bg-white rounded-2xl shadow-floating border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Select Area in Bengaluru
                    </div>
                    {neighborhoods.map((loc) => (
                      <button
                        key={loc.value}
                        onClick={() => {
                          setSelectedNeighborhood(loc.value);
                          setIsLocationOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-warm-100 transition-colors ${
                          selectedNeighborhood === loc.value ? 'font-bold text-slate-950 bg-warm-100/80' : 'text-slate-700'
                        }`}
                      >
                        <span>{loc.label}</span>
                        {selectedNeighborhood === loc.value && (
                          <div className="w-2 h-2 rounded-full bg-trust-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Links based on Role */}
          {currentRole === 'customer' && (
            <div className="hidden lg:flex items-center space-x-1">
              <button
                onClick={() => navigateTo('home')}
                className={`px-3.5 py-2 rounded-full text-xs font-bold transition-colors ${
                  currentRoute === 'home'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-warm-100'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigateTo('services')}
                className={`px-3.5 py-2 rounded-full text-xs font-bold transition-colors ${
                  currentRoute === 'services'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-warm-100'
                }`}
              >
                Find Pros
              </button>
              <button
                onClick={() => navigateTo('post-a-need')}
                className={`px-3.5 py-2 rounded-full text-xs font-bold transition-colors ${
                  currentRoute === 'post-a-need'
                    ? 'bg-slate-900 text-white'
                    : 'text-trust-700 bg-trust-50 hover:bg-trust-100 border border-trust-200'
                }`}
              >
                ⚡ Post a Need
              </button>
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-trust-400" />
                <span>AI Problem Matcher</span>
              </button>
            </div>
          )}

          {currentRole === 'worker' && (
            <div className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => navigateTo('worker-dashboard')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                  currentRoute === 'worker-dashboard' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-warm-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Jobs & Telemetry</span>
              </button>
              <button
                onClick={() => navigateTo('post-a-need')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                  currentRoute === 'post-a-need' ? 'bg-slate-900 text-white' : 'text-trust-700 bg-trust-50 hover:bg-trust-100'
                }`}
              >
                <span>Browse Client Needs & Quote</span>
              </button>
              <button
                onClick={() => navigateTo('worker-earnings')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                  currentRoute === 'worker-earnings' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-warm-100'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>Earnings</span>
              </button>
            </div>
          )}

          {currentRole === 'admin' && (
            <div className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => navigateTo('admin')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                  currentRoute === 'admin' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-warm-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </button>
              <button
                onClick={() => navigateTo('admin-workers')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                  currentRoute === 'admin-workers' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-warm-100'
                }`}
              >
                <FileCheck className="w-4 h-4 text-trust-600" />
                <span>KYC Verification</span>
              </button>
              <button
                onClick={() => navigateTo('three-strike-audit')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                  currentRoute === 'three-strike-audit' ? 'bg-slate-900 text-white' : 'text-rose-700 bg-rose-50 hover:bg-rose-100'
                }`}
              >
                <span>3-Strike Ledger</span>
              </button>
            </div>
          )}


          {/* Right Action Rail */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Multilingual Selector (English, Hindi, Marathi) */}
            <LanguageSelector compact={true} />

            {/* User Profile & Auth Options */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-1.5 p-1 pr-2.5 rounded-full hover:bg-warm-200 border border-warm-300 transition-colors"
                >

                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    {currentRole === 'customer' ? customerUser.name.charAt(0) : currentRole === 'worker' ? 'R' : 'A'}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 hidden md:inline">
                    {currentRole === 'customer' ? customerUser.name.split(' ')[0] : currentRole === 'worker' ? 'Rajesh (Pro)' : 'Auditor'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-floating border border-warm-200 p-2 space-y-1 z-50 animate-in fade-in">
                    <div className="px-3 py-2 border-b border-warm-100">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {currentRole === 'customer' ? customerUser.name : currentRole === 'worker' ? 'Rajesh Sharma' : 'Civic Auditor'}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {currentRole === 'customer' ? customerUser.email : currentRole === 'worker' ? 'rajesh@civicserve.in' : 'admin@civicserve.in'}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        openAuthModal();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-warm-100 flex items-center space-x-2"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                      <span>Switch / Re-authenticate</span>
                    </button>

                    {currentRole === 'customer' && (
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          navigateTo('customer-profile');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-warm-100 flex items-center space-x-2"
                      >
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        <span>My Profile & Wallet</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logoutUser();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-600" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5 text-trust-400" />
                <span>Sign In</span>
              </button>
            )}

            {currentRole === 'customer' && (
              <button
                onClick={() => navigateTo('bookings-list')}
                className="relative p-2 rounded-full text-slate-700 hover:bg-warm-200 transition-colors hidden sm:block"
                title={t.myBookings}
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                {activeBookingsCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-trust-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {activeBookingsCount}
                  </span>
                )}
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};

