import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  Plus
} from 'lucide-react';

export const BookingsListPage: React.FC = () => {
  const { bookings, navigateTo, t } = useApp();
  const [filterTab, setFilterTab] = useState<'all' | 'active' | 'completed'>('all');

  const filteredBookings = bookings.filter((b) => {
    if (filterTab === 'active') return b.status !== 'completed' && b.status !== 'cancelled';
    if (filterTab === 'completed') return b.status === 'completed';
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'requested':
      case 'assigned':
        return <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded-full text-xs font-bold font-label">Requested</span>;
      case 'accepted':
        return <span className="bg-indigo-50 text-indigo-800 border border-indigo-200 px-2.5 py-0.5 rounded-full text-xs font-bold font-label">Confirmed</span>;
      case 'on_the_way':
        return <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full text-xs font-bold font-label animate-pulse">Pro On The Way</span>;
      case 'in_progress':
        return <span className="bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-0.5 rounded-full text-xs font-bold font-label">In Progress</span>;
      case 'completed':
        return <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-bold font-label">{t.stage5Title}</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-xs font-bold font-label">{status}</span>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            {t.bookingsPageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant font-label mt-0.5">
            {t.bookingsPageSub}
          </p>
        </div>

        <button
          onClick={() => navigateTo('services')}
          className="px-4 py-2.5 bg-primary text-white text-xs font-bold font-label rounded-xl shadow hover:bg-primary-container transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.bookAnotherService}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-outline-variant/40 font-label text-xs">
        {[
          { key: 'all', label: `${t.tabAll} (${bookings.length})` },
          { key: 'active', label: `${t.tabActive} (${bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled').length})` },
          { key: 'completed', label: `${t.tabCompleted} (${bookings.filter(b => b.status === 'completed').length})` }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterTab(tab.key as any)}
            className={`pb-3 px-4 font-bold border-b-2 transition-colors ${
              filterTab === tab.key
                ? 'border-primary text-primary'
                : 'border-transparent text-slate-500 hover:text-on-surface'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>


      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            onClick={() => navigateTo('booking-detail', { bookingId: booking.id })}
            className="group bg-white border border-outline-variant/40 hover:border-primary/50 rounded-2xl p-5 sm:p-6 shadow-card hover:shadow-cardHover transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            {/* Left Info */}
            <div className="flex items-start gap-4">
              <img
                src={booking.workerAvatar}
                alt={booking.workerName}
                className="w-14 h-14 rounded-2xl object-cover border border-surface-container-low shadow-sm flex-shrink-0"
              />

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold font-label text-slate-400">
                    #{booking.id}
                  </span>
                  {getStatusBadge(booking.status)}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                  {booking.serviceItemName}
                </h3>

                <p className="text-xs text-on-surface-variant font-label">
                  {t.assignedPro}: <span className="font-semibold text-on-surface">{booking.workerName}</span> ({booking.workerProfession})
                </p>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-label pt-1 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {booking.scheduledDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {booking.scheduledTimeSlot}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Status / Escrow CTA */}
            <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-outline-variant/30 font-label">
              <div className="text-left md:text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  {t.escrowAmount}
                </span>
                <span className="text-base sm:text-lg font-extrabold text-on-surface">
                  {formatCurrency(booking.totalAmount)}
                </span>
                <span className="text-[10px] text-emerald-700 block font-medium">
                  {booking.paymentStatus === 'held_in_escrow' ? t.heldInEscrow : t.releasedToPro}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTo('booking-detail', { bookingId: booking.id });
                  }}
                  className="px-4 py-2.5 bg-surface-container-low group-hover:bg-primary group-hover:text-white text-on-surface text-xs font-bold rounded-xl transition-all flex items-center gap-1"
                >
                  <span>{t.trackDetails}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
