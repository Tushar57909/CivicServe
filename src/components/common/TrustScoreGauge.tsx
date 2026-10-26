import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface TrustScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showLabel?: boolean;
}

export const TrustScoreGauge: React.FC<TrustScoreGaugeProps> = ({
  score,
  size = 'md',
  showLabel = true
}) => {
  const getTier = (s: number) => {
    if (s >= 95) return { label: 'Elite Trust', color: 'text-trust-600', stroke: '#059669', bg: 'bg-trust-50' };
    if (s >= 90) return { label: 'Master Pro', color: 'text-emerald-600', stroke: '#10B981', bg: 'bg-emerald-50' };
    if (s >= 80) return { label: 'Certified', color: 'text-slate-700', stroke: '#64748B', bg: 'bg-slate-50' };
    return { label: 'Standard', color: 'text-slate-500', stroke: '#94A3B8', bg: 'bg-slate-50' };
  };

  const tier = getTier(score);

  if (size === 'sm') {
    return (
      <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-trust-50 border border-trust-200 text-trust-800">
        <ShieldCheck className="w-3.5 h-3.5 text-trust-600" />
        <span className="text-xs font-black">{score}</span>
        <span className="text-[10px] font-semibold text-trust-600">TRUST</span>
      </div>
    );
  }

  if (size === 'hero') {
    return (
      <div className="flex items-center space-x-3 bg-white p-3 rounded-2xl border border-warm-200 shadow-card">
        <div className="relative w-14 h-14 flex items-center justify-center">
          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-100"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              strokeDasharray={`${score}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke={tier.stroke}
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-base font-black text-slate-950 leading-none">{score}</span>
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-1">
            <ShieldCheck className="w-4 h-4 text-trust-600" />
            <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">Civic Trust Score</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium leading-tight">Top 1% reliability rating</p>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center space-x-2">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-warm-200"
            strokeWidth="3.5"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            strokeDasharray={`${score}, 100`}
            strokeWidth="3.5"
            strokeLinecap="round"
            stroke={tier.stroke}
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <span className="absolute text-xs font-black text-slate-950">{score}</span>
      </div>
      {showLabel && (
        <div className="text-left">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Trust Score</div>
          <div className="text-xs font-extrabold text-slate-900 leading-tight">{tier.label}</div>
        </div>
      )}
    </div>
  );
};
