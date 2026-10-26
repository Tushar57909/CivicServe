import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';
import { User, MapPin, Phone, Mail, Wallet, ShieldCheck, Award, Bell } from 'lucide-react';

export const CustomerProfilePage: React.FC = () => {
  const { customerUser, bookings, navigateTo, t } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
          {t.customerProfileTitle}
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant font-label mt-0.5">
          {t.customerProfileSub}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1 bg-white border border-outline-variant/40 rounded-3xl p-6 shadow-card space-y-4 text-center">
          <div className="w-20 h-20 rounded-full bg-primary-fixed text-primary font-extrabold text-2xl flex items-center justify-center mx-auto shadow-sm">
            AM
          </div>
          <div>
            <h2 className="text-lg font-bold text-on-surface">{customerUser.name}</h2>
            <span className="text-xs text-emerald-700 font-label font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block mt-1">
              {t.verifiedHomeowner}
            </span>
          </div>

          <div className="pt-4 border-t border-outline-variant/30 space-y-2 text-left text-xs font-label">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{customerUser.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{customerUser.email}</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{customerUser.city}</span>
            </div>
          </div>
        </div>

        {/* Saved Addresses & Escrow Wallet */}
        <div className="md:col-span-2 space-y-6">
          {/* Wallet Card */}
          <div className="bg-gradient-to-r from-primary to-indigo-900 text-white rounded-3xl p-6 shadow-md flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-label text-white/75 uppercase tracking-wider block">
                {t.escrowBalance}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-label">
                {formatCurrency(customerUser.walletBalance)}
              </h3>
              <p className="text-[11px] text-white/80 font-label">
                {t.escrowProtected100}
              </p>
            </div>
            <button 
              onClick={() => alert('Razorpay / UPI sandbox gateway simulation')}
              className="px-4 py-2 bg-white text-slate-950 font-bold text-xs rounded-xl shadow hover:bg-slate-100 transition-all"
            >
              {t.addMoney}
            </button>
          </div>

          {/* Saved Addresses */}
          <div className="bg-white border border-outline-variant/40 rounded-3xl p-6 shadow-card space-y-4 font-label text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <span className="font-bold text-on-surface text-sm">{t.savedAddresses}</span>
              <span className="text-primary font-bold cursor-pointer">+ Add New Address</span>
            </div>

            <div className="p-3.5 bg-surface-container-low rounded-2xl border border-outline-variant/30 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-on-surface text-xs">{t.primaryHome}</span>
                  <span className="text-[10px] bg-primary-fixed text-primary px-1.5 py-0.5 rounded font-bold">
                    Default
                  </span>
                </div>
                <p className="text-on-surface-variant text-xs mt-0.5 leading-relaxed">
                  {customerUser.address}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
