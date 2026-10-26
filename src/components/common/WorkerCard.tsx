import React from 'react';
import { Worker } from '../../types';
import { useApp } from '../../context/AppContext';
import { Star, ShieldCheck, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { formatINR } from '../../utils/formatters';

interface WorkerCardProps {
  worker: Worker;
  isSelectedForCompare?: boolean;
  onToggleCompare?: (workerId: string) => void;
}

export const WorkerCard: React.FC<WorkerCardProps> = ({ 
  worker, 
  isSelectedForCompare = false, 
  onToggleCompare 
}) => {
  const { navigateTo, t } = useApp();

  const isOnline = worker.availability === 'online';

  return (
    <div className="group relative bg-white rounded-2xl border border-warm-300 hover:border-slate-400 p-5 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between">
      
      {/* Top Bar: Live Status & Compare Checkbox */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-warm-100 border border-warm-300 text-xs font-semibold text-slate-800">
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 pulse-available' : 'bg-slate-400'}`} />
            <span>{isOnline ? t.availableNow : t.bookLater}</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            ~{Math.round(worker.distanceKm * 6)} {t.minsAway}
          </span>
        </div>

        {onToggleCompare && (
          <label className="flex items-center space-x-1.5 cursor-pointer text-xs font-semibold text-slate-600 hover:text-slate-900 select-none">
            <input
              type="checkbox"
              checked={isSelectedForCompare}
              onChange={() => onToggleCompare(worker.id)}
              className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
            />
            <span className="hidden sm:inline">{t.compare}</span>
          </label>
        )}
      </div>

      {/* Main Info: Photo, Name, Rating, Trust */}
      <div className="flex items-start space-x-4 mb-4">
        {/* Pro Photo with Trust Badge */}
        <div className="relative flex-shrink-0">
          <img
            src={worker.avatarUrl}
            alt={worker.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-warm-300 shadow-sm"
          />
          <div className="absolute -bottom-1.5 -right-1.5 bg-slate-950 text-white p-1 rounded-lg shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-trust-400" />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg truncate group-hover:text-slate-950">
              {worker.name}
            </h3>
          </div>
          
          <p className="text-xs text-slate-600 font-medium mb-1.5 line-clamp-1">
            {worker.profession}
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <div className="flex items-center space-x-1 font-extrabold text-slate-900">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{worker.trustMetrics.ratingAverage}</span>
              <span className="text-slate-400 font-normal">({worker.trustMetrics.totalReviews} {t.reviewsCount})</span>
            </div>
            
            <span className="text-slate-300">•</span>

            <div className="text-slate-600 font-medium">
              {worker.trustMetrics.completedJobsCount}+ {t.completedJobs.toLowerCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Verification Pills */}
      <div className="p-3 rounded-xl bg-warm-50 border border-warm-200 mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-trust-50 border border-trust-200 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-trust-600" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{t.trustScore}</div>
            <div className="text-sm font-black text-slate-950">{worker.trustMetrics.overallScore}<span className="text-xs text-slate-400 font-normal">/100</span></div>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t.verifiedPill}</span>
        </div>
      </div>

      {/* Price & Action Row */}
      <div className="pt-3 border-t border-warm-200 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase">{t.startsFrom}</div>
          <div className="text-base font-extrabold text-slate-950">
            {formatINR(worker.startingPrice)}
            <span className="text-xs text-slate-500 font-normal"> {t.visit}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateTo('worker-profile', { workerId: worker.id })}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-warm-100 transition-colors"
          >
            {t.profile}
          </button>
          <button
            onClick={() => navigateTo('new-booking', { workerId: worker.id, serviceSlug: worker.categorySlug })}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5"
          >
            <span>{t.book}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};

