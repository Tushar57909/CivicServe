import React from 'react';
import { TrustMetrics } from '../../types';
import { TrustScoreGauge } from '../common/TrustScoreGauge';
import { Award, ShieldCheck, Clock, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

interface ReputationBreakdownProps {
  trustMetrics: TrustMetrics;
}

export const ReputationBreakdown: React.FC<ReputationBreakdownProps> = ({ trustMetrics }) => {
  return (
    <div className="bg-white border border-outline-variant/40 rounded-3xl p-6 sm:p-8 shadow-card space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-extrabold text-on-surface">
              Civic Trust Score: {trustMetrics.overallScore} / 100
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant font-label mt-1 max-w-xl">
            You are ranked in the <b>Top 1% of Master Wiremen</b> in Bengaluru. High trust scores unlock instant job priority and zero commission deduction.
          </p>
        </div>

        <div className="bg-surface-container-low/80 p-3 rounded-2xl border border-outline-variant/30 flex-shrink-0">
          <TrustScoreGauge score={trustMetrics.overallScore} size="lg" showLabel={true} />
        </div>
      </div>

      {/* 6 Key Trust Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-label text-xs">
        <div className="p-4 bg-surface-container-low/60 rounded-2xl border border-outline-variant/30 space-y-1">
          <div className="flex justify-between text-slate-500">
            <span>Customer Rating</span>
            <span className="text-emerald-700 font-bold">100% Target</span>
          </div>
          <div className="text-lg font-bold text-on-surface">
            {trustMetrics.ratingAverage} ★ ({trustMetrics.totalReviews} reviews)
          </div>
          <p className="text-[11px] text-slate-500 font-sans">Based on verified post-service OTP submissions</p>
        </div>

        <div className="p-4 bg-surface-container-low/60 rounded-2xl border border-outline-variant/30 space-y-1">
          <div className="flex justify-between text-slate-500">
            <span>On-Time Arrival</span>
            <span className="text-emerald-700 font-bold">99.2%</span>
          </div>
          <div className="text-lg font-bold text-emerald-700">
            {trustMetrics.onTimeArrivalRate}% Accuracy
          </div>
          <p className="text-[11px] text-slate-500 font-sans">Calculated from GPS geofence arrival timestamps</p>
        </div>

        <div className="p-4 bg-surface-container-low/60 rounded-2xl border border-outline-variant/30 space-y-1">
          <div className="flex justify-between text-slate-500">
            <span>Total Completed Jobs</span>
            <span className="text-primary font-bold">Level: Master</span>
          </div>
          <div className="text-lg font-bold text-on-surface">
            {trustMetrics.completedJobsCount} Jobs
          </div>
          <p className="text-[11px] text-slate-500 font-sans">100% verified with zero unaddressed escalations</p>
        </div>

        <div className="p-4 bg-surface-container-low/60 rounded-2xl border border-outline-variant/30 space-y-1">
          <div className="flex justify-between text-slate-500">
            <span>Cancellation Rate</span>
            <span className="text-emerald-700 font-bold">Ultra-Low</span>
          </div>
          <div className="text-lg font-bold text-on-surface">
            {trustMetrics.cancellationRate}%
          </div>
          <p className="text-[11px] text-slate-500 font-sans">Industry average is ~8.5% across marketplaces</p>
        </div>

        <div className="p-4 bg-surface-container-low/60 rounded-2xl border border-outline-variant/30 space-y-1">
          <div className="flex justify-between text-slate-500">
            <span>Repeat Customers</span>
            <span className="text-blue-700 font-bold">High Loyalty</span>
          </div>
          <div className="text-lg font-bold text-primary">
            {trustMetrics.repeatCustomerRate}%
          </div>
          <p className="text-[11px] text-slate-500 font-sans">Clients in Indiranagar who specifically re-book you</p>
        </div>

        <div className="p-4 bg-surface-container-low/60 rounded-2xl border border-outline-variant/30 space-y-1">
          <div className="flex justify-between text-slate-500">
            <span>Clean Record Streak</span>
            <span className="text-emerald-700 font-bold">Shield Active</span>
          </div>
          <div className="text-lg font-bold text-emerald-700">
            {trustMetrics.zeroComplaintStreakDays} Days
          </div>
          <p className="text-[11px] text-slate-500 font-sans">Zero disputes or escrow freezes for 10+ months</p>
        </div>
      </div>
    </div>
  );
};
