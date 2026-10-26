import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  KeyRound, 
  CheckCircle2, 
  Lock, 
  ArrowLeft, 
  Phone, 
  AlertCircle,
  ArrowRight,
  Check
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export const WorkerJobDetailPage: React.FC = () => {
  const { bookings, routeParams, updateBookingStatus, verifyBookingOtp, navigateTo } = useApp();

  const [otpInput, setOtpInput] = useState('');
  const [otpModalType, setOtpModalType] = useState<'start' | 'completion' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const booking = bookings.find(b => b.id === routeParams.bookingId) || bookings[0];

  const isAccepted = booking.status === 'accepted';
  const isOnTheWay = booking.status === 'on_the_way';
  const isInProgress = booking.status === 'in_progress';
  const isCompleted = booking.status === 'completed';

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpModalType) return;

    const result = verifyBookingOtp(booking.id, otpInput, otpModalType);
    if (result.success) {
      setOtpModalType(null);
      setOtpInput('');
      setErrorMessage('');
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('worker-dashboard')}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Worker Dashboard</span>
        </button>

        <span className="text-xs font-mono text-slate-500 font-bold">{booking.id}</span>
      </div>

      {/* Main Execution Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-warm-300 space-y-6">
        
        {/* Status Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-warm-200">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Active Job Execution</span>
            <h1 className="text-2xl font-black text-slate-950 tracking-tight">{booking.serviceItemName}</h1>
            <p className="text-xs text-slate-500 mt-0.5">Scheduled for {booking.scheduledDate} · {booking.scheduledTimeSlot}</p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Payout</span>
            <div className="text-xl font-black text-slate-950">{formatINR(booking.baseAmount * 0.85)}</div>
            <span className="text-[10px] text-trust-700 font-bold">100% Escrow Protected</span>
          </div>
        </div>

        {/* Customer & Site Details */}
        <div className="p-5 rounded-2xl bg-warm-50 border border-warm-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                {booking.customerName.charAt(0)}
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">{booking.customerName}</h3>
                <p className="text-xs text-slate-500 font-medium">{booking.customerPhone}</p>
              </div>
            </div>

            <a
              href={`tel:${booking.customerPhone}`}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center space-x-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-trust-400" />
              <span>Call Customer</span>
            </a>
          </div>

          <div className="pt-2 border-t border-warm-200 text-xs text-slate-700 space-y-1">
            <div className="flex items-center space-x-1.5 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{booking.address.addressLine1}, {booking.address.city}</span>
            </div>
            {booking.address.landmark && (
              <div className="text-slate-500 pl-5">Landmark: {booking.address.landmark}</div>
            )}
          </div>

          <div className="p-3 bg-white rounded-xl border border-warm-200 text-xs text-slate-600 italic">
            Customer Note: "{booking.problemDescription}"
          </div>
        </div>

        {/* 2-PHASE ACTION CARDS (TRANSIT, START OTP, COMPLETE OTP) */}
        <div className="space-y-4 pt-2">
          
          {/* Action 1: On The Way Transit */}
          {isAccepted && (
            <div className="p-5 bg-blue-50 rounded-2xl border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-blue-950 text-sm">Step 1: Depart for Customer Site</h3>
                <p className="text-xs text-blue-800">Notify the customer that you have departed with your tools and spares.</p>
              </div>
              <button
                onClick={() => updateBookingStatus(booking.id, 'on_the_way')}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-extrabold text-xs shadow-sm transition-all"
              >
                Mark "On The Way"
              </button>
            </div>
          )}

          {/* Action 2: Start OTP Verification */}
          {isOnTheWay && (
            <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-amber-950 text-sm">Step 2: Enter Start OTP</h3>
                <p className="text-xs text-amber-800">Ask the customer for their 4-digit Start OTP to begin diagnostic and repair work.</p>
              </div>
              <button
                onClick={() => {
                  setOtpModalType('start');
                  setOtpInput('');
                  setErrorMessage('');
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-sm transition-all flex items-center justify-center space-x-2"
              >
                <KeyRound className="w-4 h-4 text-trust-400" />
                <span>Verify Start OTP</span>
              </button>
            </div>
          )}

          {/* Action 3: Completion OTP Verification */}
          {isInProgress && (
            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-emerald-950 text-sm">Step 3: Enter Completion OTP & Release Payment</h3>
                <p className="text-xs text-emerald-800">Have customer inspect the completed work and enter their 4-digit Completion OTP.</p>
              </div>
              <button
                onClick={() => {
                  setOtpModalType('completion');
                  setOtpInput('');
                  setErrorMessage('');
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-sm transition-all flex items-center justify-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Verify Completion OTP</span>
              </button>
            </div>
          )}

          {/* Completed Settlement Status */}
          {isCompleted && (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-black text-emerald-950 text-lg">Job Completed & Payment Released!</h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto">
                {formatINR(booking.baseAmount * 0.85)} has been deposited into your CivicServe earnings wallet.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* OTP Input Modal */}
      {otpModalType && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-floating border border-slate-100 space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-warm-200 flex items-center justify-center mx-auto text-slate-900">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-950 text-lg">
                Enter {otpModalType === 'start' ? 'Start OTP' : 'Completion OTP'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Ask {booking.customerName.split(' ')[0]} for their 4-digit code shown on their tracking screen.
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <input
                type="text"
                maxLength={4}
                autoFocus
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                placeholder="4-digit code"
                className="w-full text-center tracking-widest text-3xl font-black bg-warm-100 border border-warm-300 rounded-2xl py-3 text-slate-950 focus:outline-none focus:border-slate-900"
              />

              {errorMessage && (
                <div className="text-xs font-bold text-rose-600 text-center bg-rose-50 p-2 rounded-xl border border-rose-200">
                  {errorMessage}
                </div>
              )}

              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOtpModalType(null)}
                  className="flex-1 py-2.5 rounded-xl bg-warm-200 hover:bg-warm-300 text-slate-800 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={otpInput.length !== 4}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-extrabold transition-all shadow-sm"
                >
                  Verify & Proceed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
