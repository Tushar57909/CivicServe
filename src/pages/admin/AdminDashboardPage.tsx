import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Users, 
  DollarSign, 
  AlertCircle, 
  FileCheck, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export const AdminDashboardPage: React.FC = () => {
  const { workers, bookings, disputes, navigateTo, t } = useApp();

  const totalBookings = bookings.length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  const verifiedWorkersCount = workers.filter(w => w.kyc.aadhaarStatus === 'verified').length;
  const verifiedRate = Math.round((verifiedWorkersCount / workers.length) * 100);

  const totalGMV = bookings.reduce((sum, b) => sum + b.totalAmount, 0) + 148500;
  const openDisputesCount = disputes.filter(d => d.status === 'under_investigation' || d.status === 'open').length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Console Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-floating">
        <div>
          <div className="flex items-center space-x-2 text-trust-400 font-extrabold text-xs uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Civic Trust Protocol Operations Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{t.adminConsoleTitle}</h1>
          <p className="text-xs text-slate-400 mt-1">{t.adminConsoleSub}</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateTo('admin-workers')}
            className="px-4 py-2.5 rounded-xl bg-trust-600 hover:bg-trust-500 text-white text-xs font-extrabold transition-colors flex items-center space-x-1.5"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>{t.reviewKycBtn}</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-warm-300 shadow-card space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">{t.platformGmv}</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-950">{formatINR(totalGMV)}</div>
          <div className="text-[11px] text-emerald-700 font-bold">{t.escrowProtected100}</div>
        </div>


        <div className="bg-white p-5 rounded-2xl border border-warm-300 shadow-card space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Verified Pro Ratio</span>
            <ShieldCheck className="w-4 h-4 text-trust-600" />
          </div>
          <div className="text-2xl font-black text-slate-950">{verifiedRate}%</div>
          <div className="text-[11px] text-slate-500 font-medium">{workers.length} active pros in Bengaluru</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-warm-300 shadow-card space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Completed Jobs</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-950">{completedBookings} / {totalBookings}</div>
          <div className="text-[11px] text-slate-500 font-medium">99.2% on-time fulfillment</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-warm-300 shadow-card space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Open Disputes</span>
            <AlertCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-slate-950">{openDisputesCount}</div>
          <div className="text-[11px] text-rose-700 font-bold">Avg resolution: 4.2 hrs</div>
        </div>

      </div>

      {/* Audit Queues Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Worker Verification Queue Preview */}
        <div className="bg-white p-6 rounded-3xl border border-warm-300 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-950">Pending Worker KYC Audits</h2>
            <button
              onClick={() => navigateTo('admin-workers')}
              className="text-xs font-bold text-trust-700 hover:underline flex items-center space-x-1"
            >
              <span>View all ({workers.length})</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {workers.slice(0, 3).map((w) => (
              <div key={w.id} className="p-3.5 bg-warm-50 rounded-2xl border border-warm-200 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <img src={w.avatarUrl} alt={w.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <span className="font-extrabold text-slate-900 block">{w.name}</span>
                    <span className="text-slate-500">{w.profession}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('admin-workers')}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-[11px]"
                >
                  Inspect Docs
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dispute Resolution Queue Preview */}
        <div className="bg-white p-6 rounded-3xl border border-warm-300 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-950">Mediation & Dispute Ledger</h2>
            <button
              onClick={() => navigateTo('admin-disputes')}
              className="text-xs font-bold text-trust-700 hover:underline flex items-center space-x-1"
            >
              <span>View all ({disputes.length})</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {disputes.map((d) => (
              <div key={d.id} className="p-3.5 bg-warm-50 rounded-2xl border border-warm-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 font-mono">{d.id}</span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 text-[10px] font-extrabold uppercase">
                    {d.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-slate-600 line-clamp-1">{d.reason}</p>
                <div className="flex items-center justify-between pt-1 border-t border-warm-200">
                  <span className="font-bold text-slate-900">{formatINR(d.amount)}</span>
                  <button
                    onClick={() => navigateTo('admin-disputes')}
                    className="text-[11px] font-bold text-slate-900 hover:underline"
                  >
                    Mediate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
