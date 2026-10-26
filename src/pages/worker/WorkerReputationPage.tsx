import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Star, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Zap
} from 'lucide-react';

export const WorkerReputationPage: React.FC = () => {
  const { activeWorker } = useApp();

  const trustMetrics = activeWorker.trustMetrics;

  const scoreFactors = [
    { label: 'KYC & Trade Certification', score: 98, weight: '30% weight', desc: 'Aadhaar, DGT Skill Council certificate, and police clearance verified.' },
    { label: 'Customer Rating Quality', score: Math.round(trustMetrics.ratingAverage * 20), weight: '30% weight', desc: `${trustMetrics.ratingAverage}★ average across ${trustMetrics.totalReviews} verified bookings.` },
    { label: 'Job Volume & Repeat Loyalty', score: 94, weight: '20% weight', desc: `${trustMetrics.completedJobsCount}+ jobs completed with ${trustMetrics.repeatCustomerRate}% repeat rate.` },
    { label: 'Punctuality & Discipline', score: Math.round(trustMetrics.onTimeArrivalRate), weight: '20% weight', desc: `${trustMetrics.onTimeArrivalRate}% on-time arrival with ${trustMetrics.cancellationRate}% cancellation rate.` }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Top Banner */}
      <div>
        <span className="text-xs font-extrabold uppercase tracking-wider text-trust-700">Civic Reputation System</span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Your Civic Trust Scorecard</h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          Your Trust Score is calculated dynamically by the Civic Trust Protocol engine to determine search ranking and dispatch priority.
        </p>
      </div>

      {/* Main Scorecard Header */}
      <div className="bg-slate-950 text-white rounded-3xl p-8 shadow-floating flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-3xl bg-slate-900 border-2 border-trust-500 flex flex-col items-center justify-center shadow-lg">
            <span className="text-4xl font-black text-white">{trustMetrics.overallScore}</span>
            <span className="text-[10px] font-bold text-trust-400 uppercase tracking-wider">OUT OF 100</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold text-white">Elite Master Pro</span>
              <ShieldCheck className="w-5 h-5 text-trust-400" />
            </div>
            <p className="text-xs text-slate-400">Ranked in top 1% of electrical wiremen in Bengaluru</p>
            <div className="text-xs font-bold text-trust-400 pt-1">
              ✓ Eligible for Express Dispatch and 0% Platform Commission bonus
            </div>
          </div>
        </div>

        <div className="text-left md:text-right bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Current Zero-Complaint Streak</span>
          <span className="text-xl font-black text-white">{trustMetrics.zeroComplaintStreakDays} Consecutive Days</span>
        </div>
      </div>

      {/* 4-Pillar Score Breakdown */}
      <div className="space-y-4">
        <h2 className="text-base font-extrabold text-slate-950">Trust Score Factor Breakdown</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scoreFactors.map((factor, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-warm-300 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{factor.label}</h3>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{factor.weight}</span>
                </div>
                <span className="text-lg font-black text-slate-950">{factor.score}/100</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-warm-200 overflow-hidden">
                <div
                  className="h-full bg-trust-600 rounded-full"
                  style={{ width: `${factor.score}%` }}
                />
              </div>

              <p className="text-xs text-slate-500 leading-relaxed font-medium">{factor.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How to Improve Score (Gamification) */}
      <div className="bg-warm-100 p-6 sm:p-7 rounded-3xl border border-warm-300 space-y-4">
        <div className="flex items-center space-x-2 text-slate-950 font-extrabold text-sm">
          <TrendingUp className="w-4 h-4 text-trust-600" />
          <span>How to increase your score to 99+</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-white p-4 rounded-2xl border border-warm-200 space-y-1">
            <span className="font-extrabold text-slate-900 block">Fast Response Rate</span>
            <p className="text-slate-500">Accept incoming job requests within 3 minutes of notification.</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-warm-200 space-y-1">
            <span className="font-extrabold text-slate-900 block">Zero Cancellations</span>
            <p className="text-slate-500">Maintain your 0% cancellation streak across your next 10 jobs.</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-warm-200 space-y-1">
            <span className="font-extrabold text-slate-900 block">5-Star Verified Reviews</span>
            <p className="text-slate-500">Encourage customers to rate work cleanliness and tool hygiene.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
