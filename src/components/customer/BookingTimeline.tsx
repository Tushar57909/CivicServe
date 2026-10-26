import React from 'react';
import { BookingStatus } from '../../types';
import { CheckCircle2, Clock, Truck, Wrench, ShieldCheck, AlertCircle } from 'lucide-react';

interface BookingTimelineProps {
  currentStatus: BookingStatus;
  timeline: {
    status: BookingStatus;
    timestamp: string;
    note: string;
  }[];
}

export const BookingTimeline: React.FC<BookingTimelineProps> = ({ currentStatus, timeline }) => {
  const stages: { status: BookingStatus; label: string; icon: React.ReactNode }[] = [
    { status: 'requested', label: 'Requested', icon: <Clock className="w-4 h-4" /> },
    { status: 'assigned', label: 'Assigned', icon: <ShieldCheck className="w-4 h-4" /> },
    { status: 'accepted', label: 'Confirmed', icon: <CheckCircle2 className="w-4 h-4" /> },
    { status: 'on_the_way', label: 'On The Way', icon: <Truck className="w-4 h-4" /> },
    { status: 'in_progress', label: 'In Progress', icon: <Wrench className="w-4 h-4" /> },
    { status: 'completed', label: 'Completed', icon: <CheckCircle2 className="w-4 h-4" /> }
  ];

  const statusOrder: Record<BookingStatus, number> = {
    requested: 0,
    assigned: 1,
    accepted: 2,
    on_the_way: 3,
    in_progress: 4,
    completed: 5,
    cancelled: -1,
    disputed: -1
  };

  const currentIndex = statusOrder[currentStatus] ?? 0;

  if (currentStatus === 'cancelled' || currentStatus === 'disputed') {
    return (
      <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-800">
        <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
        <div className="text-xs font-label">
          <span className="font-bold uppercase block text-sm">
            {currentStatus === 'cancelled' ? 'Booking Cancelled' : 'Dispute In Review'}
          </span>
          <span className="text-rose-700">
            {currentStatus === 'cancelled'
              ? 'Escrow payment refunded to original source.'
              : 'Our Civic Trust mediation officer is inspecting the job records.'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Horizontal Step Bar */}
      <div className="relative flex items-center justify-between">
        {/* Background Track */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-surface-container -translate-y-1/2 z-0" />
        {/* Active Track */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(Math.max(0, currentIndex) / (stages.length - 1)) * 100}%` }}
        />

        {stages.map((stage, idx) => {
          const isDone = currentIndex > idx;
          const isCurrent = currentIndex === idx;

          return (
            <div key={stage.status} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                  isDone
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                    : isCurrent
                    ? 'bg-primary border-primary text-white ring-4 ring-primary/20 shadow-md scale-110'
                    : 'bg-white border-outline-variant/60 text-slate-400'
                }`}
              >
                {stage.icon}
              </div>
              <span
                className={`mt-2 text-[10px] sm:text-xs font-label text-center whitespace-nowrap font-medium ${
                  isCurrent ? 'font-bold text-primary' : isDone ? 'text-emerald-700' : 'text-slate-400'
                }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Detailed Activity Log */}
      <div className="mt-6 pt-4 border-t border-outline-variant/30 space-y-3 font-sans">
        <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider font-label">
          Live Verification & Status Log
        </h4>
        <div className="space-y-2.5">
          {timeline.map((entry, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-surface-container-low/60 rounded-xl text-xs"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-on-surface capitalize font-label">
                    {entry.status.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-slate-500 font-label">{entry.timestamp}</span>
                </div>
                <p className="text-on-surface-variant mt-0.5 leading-relaxed">{entry.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
