import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';
import { FileSpreadsheet, Search, ArrowLeft, CheckCircle2, Lock } from 'lucide-react';

export const AdminBookingsPage: React.FC = () => {
  const { bookings, navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = bookings.filter(b =>
    b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.serviceItemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      <button
        onClick={() => navigateTo('admin-dashboard')}
        className="inline-flex items-center gap-1.5 text-xs font-bold font-label text-slate-600 hover:text-primary transition-colors mb-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Admin Dashboard</span>
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Platform Booking & Escrow Transactions
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant font-label mt-0.5">
            System-wide transaction ledger with real-time OTP status and payment reconciliation
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search by ID, customer, or pro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-xs font-label p-2.5 pl-8 rounded-xl border border-outline-variant/60 bg-white text-on-surface w-64"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
        </div>
      </div>

      {/* Bookings Ledger Table */}
      <div className="bg-white border border-outline-variant/40 rounded-3xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-label text-xs">
            <thead className="bg-surface-container-low border-b border-outline-variant/30 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="p-4">Booking Ref</th>
                <th className="p-4">Service & Task</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Assigned Pro</th>
                <th className="p-4">Status</th>
                <th className="p-4">Escrow Amount</th>
                <th className="p-4">Payment State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4 font-bold text-on-surface">
                    #{b.id}
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-on-surface font-sans text-xs block">{b.serviceItemName}</span>
                    <span className="text-[11px] text-slate-500">{b.scheduledDate}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-on-surface block">{b.customerName}</span>
                    <span className="text-slate-400">{b.customerPhone}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-on-surface block">{b.workerName}</span>
                    <span className="text-emerald-700 font-bold">{b.workerTrustScore}/100 Trust</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                      b.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : b.status === 'in_progress'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {b.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-on-surface text-sm">
                    {formatCurrency(b.totalAmount)}
                  </td>
                  <td className="p-4">
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>{b.paymentStatus.replace('_', ' ')}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
