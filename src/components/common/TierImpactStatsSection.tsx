import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  UserCheck, 
  FileCheck, 
  Sparkles, 
  MapPin, 
  Lock, 
  Camera, 
  Award, 
  ArrowRight,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

export const TierImpactStatsSection: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <section className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-floating space-y-8 relative overflow-hidden border border-slate-800 my-8">
      <div className="absolute top-0 right-0 w-96 h-96 bg-trust-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center space-x-2 text-trust-400 font-extrabold text-xs uppercase tracking-wider mb-2">
            <TrendingUp className="w-4 h-4" />
            <span>Civic Market Impact · Tier-2 & Tier-3 India (PDF Page 6 & 7)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Unlocking Verified Livelihoods & Safer Homes
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Closing the trust and access gap across 600+ Indian urban centers without forced metro pricing or unverified strangers.
          </p>
        </div>

        <button
          onClick={() => navigateTo('post-a-need')}
          className="px-4 py-2.5 rounded-xl bg-trust-500 hover:bg-trust-400 text-slate-950 font-black text-xs transition-all shadow-md self-start md:self-auto flex items-center space-x-1.5"
        >
          <span>Explore Reverse Marketplace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Big Metrics Grid from PDF Page 6 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-3xl sm:text-4xl font-black text-trust-400">600+</div>
          <div className="text-xs font-bold text-white uppercase tracking-wider">Tier-2/3 Towns</div>
          <p className="text-[11px] text-slate-400 leading-relaxed">Brought onto a verified digital service platform for the first time.</p>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-3xl sm:text-4xl font-black text-emerald-400">10x</div>
          <div className="text-xs font-bold text-white uppercase tracking-wider">Service Coverage</div>
          <p className="text-[11px] text-slate-400 leading-relaxed">More service categories reachable from home vs. metro-only apps.</p>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-3xl sm:text-4xl font-black text-indigo-400">50K+</div>
          <div className="text-xs font-bold text-white uppercase tracking-wider">Verified Jobs</div>
          <p className="text-[11px] text-slate-400 leading-relaxed">Projected new verified livelihood opportunities for local tradesmen.</p>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-3xl sm:text-4xl font-black text-amber-400">Zero</div>
          <div className="text-xs font-bold text-white uppercase tracking-wider">City Trips Needed</div>
          <p className="text-[11px] text-slate-400 leading-relaxed">For mobile, electrical, appliance & skilled trade diagnostics.</p>
        </div>

      </div>

      {/* Dual-Sided Verification Highlight from PDF Page 4 */}
      <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-extrabold text-white text-sm">Dual-Sided Verification Protocol</h4>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
              <strong>Workers:</strong> Live selfie + Aadhaar + Trade Certificate + Police Clearance.<br />
              <strong>Citizens:</strong> Aadhaar verification required before booking access to close one-sided platform fraud.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-stretch sm:self-auto justify-end">
          <div className="text-right text-xs">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Protocol Confidence</span>
            <span className="text-emerald-400 font-extrabold">100% Escrow Protected</span>
          </div>
        </div>
      </div>

    </section>
  );
};
