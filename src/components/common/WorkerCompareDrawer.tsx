import React from 'react';
import { Worker } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, Star, Clock, MapPin, Sparkles, Check } from 'lucide-react';
import { formatINR } from '../../utils/formatters';


interface WorkerCompareDrawerProps {
  workers: Worker[];
  isOpen: boolean;
  onClose: () => void;
  onBookWorker: (workerId: string) => void;
  onRemoveWorker: (workerId: string) => void;
}

export const WorkerCompareDrawer: React.FC<WorkerCompareDrawerProps> = ({
  workers,
  isOpen,
  onClose,
  onBookWorker,
  onRemoveWorker
}) => {
  const { t } = useApp();

  if (!isOpen || workers.length === 0) return null;

  // Best match is worker with highest overall score & lowest response time
  const bestMatchWorker = [...workers].sort(
    (a, b) => b.trustMetrics.overallScore - a.trustMetrics.overallScore
  )[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-5xl rounded-t-3xl sm:rounded-3xl shadow-floating border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-warm-200 flex items-center justify-between bg-warm-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-trust-400" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">{t.compareSideBySide}</h2>
              <p className="text-xs text-slate-500">{t.compareSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-warm-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>


        {/* Comparison Grid */}
        <div className="p-6 overflow-x-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 min-w-[650px]">
            {workers.map((worker) => {
              const isBest = worker.id === bestMatchWorker?.id;

              return (
                <div
                  key={worker.id}
                  className={`relative p-5 rounded-2xl border transition-all ${
                    isBest
                      ? 'border-trust-500 bg-trust-50/20 ring-2 ring-trust-400/30 shadow-card'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Best Match Ribbon */}
                  {isBest && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-trust-600 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full flex items-center space-x-1 shadow-sm">
                      <Sparkles className="w-3 h-3" />
                      <span>RECOMMENDED BEST MATCH</span>
                    </div>
                  )}

                  {/* Remove button */}
                  <button
                    onClick={() => onRemoveWorker(worker.id)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 p-1"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Worker Avatar & Info */}
                  <div className="flex items-center space-x-3 mb-4 mt-1">
                    <img
                      src={worker.avatarUrl}
                      alt={worker.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{worker.name}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{worker.profession}</p>
                    </div>
                  </div>

                  {/* Comparison Metrics */}
                  <div className="space-y-3 divide-y divide-slate-100 text-xs">
                    
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Trust Score</span>
                      <div className="flex items-center space-x-1 bg-trust-50 px-2 py-0.5 rounded-md border border-trust-200 text-trust-800 font-extrabold">
                        <ShieldCheck className="w-3.5 h-3.5 text-trust-600" />
                        <span>{worker.trustMetrics.overallScore}/100</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Customer Rating</span>
                      <div className="flex items-center space-x-1 font-bold text-slate-900">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{worker.trustMetrics.ratingAverage}</span>
                        <span className="text-slate-400 font-normal">({worker.trustMetrics.totalReviews})</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Estimated Call-out</span>
                      <span className="font-extrabold text-slate-950 text-sm">
                        {formatINR(worker.startingPrice)}
                      </span>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Distance & ETA</span>
                      <div className="flex items-center space-x-1 text-slate-700 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{worker.distanceKm} km (~{Math.round(worker.distanceKm * 6)}m)</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Avg Response</span>
                      <div className="flex items-center space-x-1 text-slate-700 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>~{worker.trustMetrics.averageResponseMinutes} mins</span>
                      </div>
                    </div>

                    <div className="pt-2 space-y-1">
                      <span className="text-slate-500 font-medium block">4-Layer Verification</span>
                      <div className="flex flex-wrap gap-1">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                          ✓ Aadhaar
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                          ✓ Trade Cert
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                          ✓ Police Clear
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Book CTA */}
                  <div className="mt-5">
                    <button
                      onClick={() => onBookWorker(worker.id)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm ${
                        isBest
                          ? 'bg-slate-900 hover:bg-slate-800 text-white'
                          : 'bg-warm-200 hover:bg-warm-300 text-slate-900'
                      }`}
                    >
                      Book {worker.name.split(' ')[0]}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-warm-100/80 border-t border-warm-200 flex items-center justify-between text-xs text-slate-500">
          <span>All bookings include Civic Guarantee Protection and zero upfront deposit fees.</span>
          <button
            onClick={onClose}
            className="font-bold text-slate-800 hover:underline"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
};
