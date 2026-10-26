import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';
import { CheckCircle2, XCircle, MapPin, Calendar, Clock, ArrowLeft, ChevronRight, Phone } from 'lucide-react';

export const WorkerRequestsPage: React.FC = () => {
  const { bookings, updateBookingStatus, navigateTo } = useApp();

  const requests = bookings.filter(b => b.status === 'requested' || b.status === 'assigned');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigateTo('worker-dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-bold font-label text-slate-600 hover:text-primary transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Incoming Job Requests ({requests.length})
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant font-label mt-0.5">
            Accept or decline assigned customer requests within the standard 10-minute SLA
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {requests.length > 0 ? (
          requests.map((req) => (
            <div
              key={req.id}
              className="bg-white border border-outline-variant/40 rounded-3xl p-6 shadow-card space-y-4 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 font-label text-xs">
                  <span className="font-bold text-slate-400">#{req.id}</span>
                  <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                    Awaiting Your Confirmation
                  </span>
                </div>

                <h3 className="text-lg font-bold text-on-surface">
                  {req.serviceItemName}
                </h3>

                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {req.problemDescription}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 font-label pt-2 flex-wrap">
                  <span className="flex items-center gap-1 font-semibold text-primary">
                    <MapPin className="w-3.5 h-3.5" />
                    {req.address.addressLine1} ({req.address.landmark})
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {req.scheduledDate} ({req.scheduledTimeSlot})
                  </span>
                  <span>•</span>
                  <span>Customer: {req.customerName}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col items-end gap-3 flex-shrink-0 font-label">
                <div className="text-right">
                  <span className="text-[10px] uppercase text-slate-400 font-bold block">Labor Payout</span>
                  <span className="text-xl font-extrabold text-on-surface">{formatCurrency(req.baseAmount)}</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => updateBookingStatus(req.id, 'cancelled', 'Worker declined due to schedule conflict')}
                    className="px-4 py-2.5 bg-surface-container-low hover:bg-surface-container text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                  >
                    <XCircle className="w-4 h-4 text-rose-500" />
                    <span>Decline</span>
                  </button>
                  <button
                    onClick={() => {
                      updateBookingStatus(req.id, 'accepted');
                      navigateTo('worker-job-detail', { bookingId: req.id });
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition-all flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Accept Job</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white border border-outline-variant/40 rounded-3xl p-6 shadow-sm space-y-2">
            <h3 className="text-base font-bold text-on-surface">No Pending Requests</h3>
            <p className="text-xs text-on-surface-variant font-label max-w-sm mx-auto">
              Your queue is clean! New matching requests in Indiranagar & Koramangala will pop up here in real time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
