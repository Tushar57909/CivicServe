import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  AlertCircle, 
  ShieldCheck, 
  ArrowLeft, 
  Check, 
  RotateCcw, 
  DollarSign 
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export const AdminDisputesPage: React.FC = () => {
  const { disputes, resolveDispute, navigateTo } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Top Bar */}
      <div>
        <button
          onClick={() => navigateTo('admin-dashboard')}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors mb-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Admin Console</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Civic Mediation & Dispute Resolution</h1>
        <p className="text-xs text-slate-500 font-medium">Arbitrate customer dissatisfaction claims and issue escrow refunds or releases.</p>
      </div>

      {/* Disputes List */}
      <div className="space-y-4">
        {disputes.map((d) => {
          const isOpen = d.status === 'under_investigation' || d.status === 'open';

          return (
            <div key={d.id} className="bg-white rounded-3xl p-6 border border-warm-300 shadow-card space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-warm-200">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-bold text-slate-500">{d.id}</span>
                  <h3 className="font-extrabold text-slate-900 text-base">{d.serviceName}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    isOpen ? 'bg-amber-50 text-amber-800' : 'bg-emerald-50 text-emerald-800'
                  }`}>
                    {d.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-400 uppercase">Escrow Held:</span>
                  <span className="text-base font-black text-slate-950 ml-1.5">{formatINR(d.amount)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-warm-50 rounded-2xl border border-warm-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Customer Claim</span>
                  <div className="font-bold text-slate-900">{d.customerName} (Ref: {d.bookingId})</div>
                  <p className="text-slate-600 italic">"{d.reason}"</p>
                </div>

                <div className="p-4 bg-warm-50 rounded-2xl border border-warm-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Assigned Technician</span>
                  <div className="font-bold text-slate-900">{d.workerName}</div>
                  <p className="text-slate-500">Master trade verified. 0 complaints in last 150 days.</p>
                </div>
              </div>

              {isOpen && (
                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    onClick={() => resolveDispute(d.id, 'resolved_refund')}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors flex items-center space-x-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Issue Full Escrow Refund to Customer</span>
                  </button>

                  <button
                    onClick={() => resolveDispute(d.id, 'resolved_worker_paid')}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center space-x-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-trust-400" />
                    <span>Release Escrow to Technician</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
