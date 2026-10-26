import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  Wallet, 
  Star, 
  Award, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  Calendar, 
  AlertCircle 
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export const WorkerDashboardPage: React.FC = () => {
  const { bookings, activeWorker, updateBookingStatus, navigateTo, setWorkerAvailability, t } = useApp();

  const isOnline = activeWorker.availability === 'online';

  const pendingRequests = bookings.filter(b => b.status === 'requested');
  const activeJobs = bookings.filter(b => b.status === 'accepted' || b.status === 'on_the_way' || b.status === 'in_progress');
  const completedJobs = bookings.filter(b => b.status === 'completed');

  const todayEarnings = completedJobs.reduce((sum, b) => sum + (b.baseAmount * 0.85), 0) + 1850;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Top Header & Dispatch Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-warm-300 shadow-card">
        <div className="flex items-center space-x-4">
          <img
            src={activeWorker.avatarUrl}
            alt={activeWorker.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-900 shadow-sm"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950">{activeWorker.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-extrabold border border-emerald-200 uppercase">
                {t.verifiedPro}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">{activeWorker.profession}</p>
          </div>
        </div>

        {/* Live Dispatch Switch */}
        <div className="flex items-center space-x-3 bg-warm-100 p-2 rounded-2xl border border-warm-200">
          <span className="text-xs font-bold text-slate-700 pl-2">{t.dutyStatus}</span>
          <button
            onClick={() => setWorkerAvailability(activeWorker.id, isOnline ? 'offline' : 'online')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-2 shadow-sm ${
              isOnline
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-300 text-slate-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white pulse-available' : 'bg-slate-500'}`} />
            <span>{isOnline ? t.online : t.offline}</span>
          </button>
        </div>
      </div>

      {/* 1. OPERATIONAL SUMMARY METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-warm-300 shadow-card space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Today's Earnings</span>
            <Wallet className="w-4 h-4 text-trust-600" />
          </div>
          <div className="text-2xl font-black text-slate-950">{formatINR(todayEarnings)}</div>
          <div className="text-[11px] text-emerald-700 font-bold">+₹650 vs yesterday</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-warm-300 shadow-card space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Jobs</span>
            <Briefcase className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-950">{activeJobs.length}</div>
          <div className="text-[11px] text-slate-500 font-medium">1 in progress</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-warm-300 shadow-card space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Trust Score</span>
            <Award className="w-4 h-4 text-trust-600" />
          </div>
          <div className="text-2xl font-black text-slate-950">
            {activeWorker.trustMetrics.overallScore}
            <span className="text-xs text-slate-400 font-normal"> / 100</span>
          </div>
          <div className="text-[11px] text-trust-700 font-bold">Top 1% ranked pro</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-warm-300 shadow-card space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Rating</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
          </div>
          <div className="text-2xl font-black text-slate-950">{activeWorker.trustMetrics.ratingAverage}</div>
          <div className="text-[11px] text-slate-500 font-medium">{activeWorker.trustMetrics.totalReviews} verified reviews</div>
        </div>

      </div>

      {/* 2. INCOMING JOB REQUEST ALERT BANNER */}
      {pendingRequests.length > 0 && (
        <div className="bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-floating border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-trust-400 font-extrabold text-xs uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-trust-500 pulse-available" />
              <span>New Job Request · Instant Action</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">Response timeout: 02:45</span>
          </div>

          {pendingRequests.map((req) => (
            <div key={req.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-extrabold text-white">{req.serviceItemName}</h3>
                  <span className="text-xs font-extrabold text-trust-400 bg-trust-950 px-2 py-0.5 rounded border border-trust-800">
                    Est. {formatINR(req.baseAmount)}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-slate-400">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-trust-400" />
                    <span>{req.address.landmark || req.address.addressLine1} (~1.8 km)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{req.scheduledTimeSlot}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 italic pt-1">"{req.problemDescription}"</p>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto">
                <button
                  onClick={() => updateBookingStatus(req.id, 'cancelled', 'Worker declined due to distance.')}
                  className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={() => {
                    updateBookingStatus(req.id, 'accepted');
                    navigateTo('worker-job-detail', { bookingId: req.id });
                  }}
                  className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-trust-600 hover:bg-trust-500 text-white text-xs font-extrabold transition-all shadow-md flex items-center justify-center space-x-1.5"
                >
                  <span>Accept Job</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. ACTIVE JOBS IN PROGRESS */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-950">Active Work in Progress</h2>

        {activeJobs.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl border border-warm-300 text-center text-slate-500 text-xs font-medium">
            No active jobs at the moment. Keep your duty status ONLINE to receive incoming alerts!
          </div>
        ) : (
          <div className="space-y-4">
            {activeJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-3xl border border-warm-300 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-slate-500 font-bold">{job.id}</span>
                    <h3 className="font-extrabold text-slate-900 text-base">{job.serviceItemName}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-extrabold uppercase">
                      {job.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600">
                    Customer: <span className="font-bold text-slate-900">{job.customerName}</span> ({job.customerPhone}) · {job.address.addressLine1}
                  </div>

                  <div className="text-xs font-bold text-trust-700">
                    Escrow Locked: {formatINR(job.totalAmount)} (Releases immediately on Completion OTP)
                  </div>
                </div>

                <button
                  onClick={() => navigateTo('worker-job-detail', { bookingId: job.id })}
                  className="w-full md:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-2"
                >
                  <span>Open Job Execution & OTPs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
