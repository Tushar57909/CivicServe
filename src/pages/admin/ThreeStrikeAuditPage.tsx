import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Ban, 
  EyeOff, 
  ShieldCheck, 
  FileText, 
  UserX,
  History,
  Lock
} from 'lucide-react';
import { INITIAL_STRIKES_AUDIT } from '../../data/mockPostedNeeds';

export const ThreeStrikeAuditPage: React.FC = () => {
  const { workers, navigateTo } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-32">
      
      {/* Header Banner */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-floating space-y-4">
        <div className="flex items-center space-x-2 text-rose-400 font-extrabold text-xs uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Zero-Tolerance Accountability Engine (PDF Page 4 & 7)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Three-Strike Enforcement & Audit Console
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Unlike unverified informal listings, CivicServe enforces escalating penalties for misconduct, unverified overcharging, or no-shows to maintain consumer trust across Tier-2/3 India.
        </p>
      </div>

      {/* 3 Strikes Protocol Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Strike 1 */}
        <div className="bg-white p-6 rounded-3xl border-2 border-amber-200 shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 font-black text-xs">
              1st Strike
            </span>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <h3 className="font-extrabold text-slate-950 text-base">Formal Warning Logged</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Logged on immutable audit profile upon verified customer grievance or unexplained late arrival.
          </p>
          <div className="pt-2 text-[11px] font-bold text-amber-700">
            Penalty: Mandatory review by Civic Trust Auditor.
          </div>
        </div>

        {/* Strike 2 */}
        <div className="bg-white p-6 rounded-3xl border-2 border-orange-200 shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-xl bg-orange-100 text-orange-900 font-black text-xs">
              2nd Strike
            </span>
            <EyeOff className="w-5 h-5 text-orange-500" />
          </div>
          <h3 className="font-extrabold text-slate-950 text-base">Visibility & Rank Demotion</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Automatic 40% reduction in search recommendations, AI match exclusion, and mandatory escrow lock.
          </p>
          <div className="pt-2 text-[11px] font-bold text-orange-700">
            Penalty: 7-day algorithmic throttling.
          </div>
        </div>

        {/* Strike 3 */}
        <div className="bg-white p-6 rounded-3xl border-2 border-rose-200 shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-xl bg-rose-100 text-rose-900 font-black text-xs">
              3rd Strike
            </span>
            <Ban className="w-5 h-5 text-rose-600" />
          </div>
          <h3 className="font-extrabold text-slate-950 text-base">Permanent Blacklist</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Account permanently terminated. National Aadhaar & device hardware ID blocked to prevent re-registration.
          </p>
          <div className="pt-2 text-[11px] font-bold text-rose-700">
            Penalty: Permanent platform ban & forfeited badges.
          </div>
        </div>

      </div>

      {/* Live Active Worker Strike Ledger */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-warm-300 shadow-card space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-950">Active Worker Accountability Roster</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Real-time status of all 6 onboarded professionals</p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-warm-100 px-3 py-1.5 rounded-xl">
            Audit Ledger v2.4
          </span>
        </div>

        <div className="divide-y divide-warm-200">
          {workers.map((worker) => {
            const strikes = INITIAL_STRIKES_AUDIT[worker.id] || [];
            const strikeCount = strikes.length;

            return (
              <div key={worker.id} className="py-4.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <img src={worker.avatarUrl} alt={worker.name} className="w-12 h-12 rounded-2xl object-cover border border-warm-300" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-slate-950 text-sm">{worker.name}</span>
                      <span className="text-xs text-slate-500">({worker.profession})</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium mt-0.5">
                      <span>Trust Score: <strong>{worker.trustMetrics.overallScore}/100</strong></span>
                      <span>•</span>
                      <span>Zero-Complaint Streak: <strong>{worker.trustMetrics.zeroComplaintStreakDays} days</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 self-start md:self-auto">
                  {/* Strike Status Badge */}
                  {strikeCount === 0 ? (
                    <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>0 Strikes (Clean Record)</span>
                    </div>
                  ) : strikeCount === 1 ? (
                    <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-black">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>1 Strike (Warning Issued)</span>
                    </div>
                  ) : strikeCount === 2 ? (
                    <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-orange-50 text-orange-800 border border-orange-200 text-xs font-black">
                      <EyeOff className="w-4 h-4 text-orange-600" />
                      <span>2 Strikes (Throttled -40%)</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-black">
                      <Ban className="w-4 h-4 text-rose-600" />
                      <span>3 Strikes (Blacklisted)</span>
                    </div>
                  )}

                  <button
                    onClick={() => navigateTo('worker-detail', { workerId: worker.id })}
                    className="px-3.5 py-1.5 rounded-xl bg-warm-100 hover:bg-warm-200 text-slate-800 text-xs font-bold transition-colors"
                  >
                    View Audit Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
