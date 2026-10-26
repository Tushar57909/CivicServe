import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/formatters';
import {
  DollarSign,
  TrendingUp,
  Download,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  CreditCard,
  Building,
  ArrowLeft,
  Wallet,
  Clock,
  ChevronRight,
  Check
} from 'lucide-react';

export const WorkerEarningsPage: React.FC = () => {
  const { activeWorker, bookings, navigateTo } = useApp();
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('month');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  // Dynamic calculations from bookings
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const dynamicLaborSum = completedBookings.reduce((sum, b) => sum + (b.baseAmount * 0.85), 0);

  const availableBalance = dynamicLaborSum + 14850;
  const totalGrossEarnings = dynamicLaborSum + 48620;
  const trustIncentives = 3200;

  const transactions = [
    { 
      id: 'TXN-8841', 
      date: 'Today, 01:30 PM', 
      jobRef: 'BK-1001', 
      service: 'Electrical Short Circuit & MCB Repair', 
      customer: 'Arjun Menon', 
      amount: 450, 
      platformFee: 45, 
      netPayout: 405, 
      type: 'Escrow Released', 
      status: 'Settled' 
    },
    { 
      id: 'TXN-8799', 
      date: 'Yesterday, 04:15 PM', 
      jobRef: 'BK-1002', 
      service: 'Dual Inverter & Battery Wiring', 
      customer: 'Vivek Kulkarni', 
      amount: 800, 
      platformFee: 80, 
      netPayout: 720, 
      type: 'Escrow Released', 
      status: 'Settled' 
    },
    { 
      id: 'TXN-8712', 
      date: 'Aug 20, 2026', 
      jobRef: 'BK-1003', 
      service: 'MCB Load Diagnostic & Fix', 
      customer: 'Ananya S.', 
      amount: 500, 
      platformFee: 50, 
      netPayout: 450, 
      type: 'Escrow Released', 
      status: 'Settled' 
    },
    { 
      id: 'TXN-8690', 
      date: 'Aug 19, 2026', 
      jobRef: 'BONUS-98', 
      service: 'Civic Master Trust 100% On-Time Incentive', 
      customer: 'Civic Platform Escrow', 
      amount: 500, 
      platformFee: 0, 
      netPayout: 500, 
      type: 'Trust Bonus', 
      status: 'Settled' 
    }
  ];

  const handleInstantWithdraw = () => {
    setWithdrawSuccess(true);
    setTimeout(() => {
      setShowWithdrawModal(false);
      setWithdrawSuccess(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans pb-32">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigateTo('worker-dashboard')}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors mb-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Earnings, Payouts & Escrow Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Real-time direct transfers from civic escrow directly into your verified bank account.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowWithdrawModal(true)}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-2xl shadow-md transition-all flex items-center space-x-2"
          >
            <Wallet className="w-4 h-4 text-trust-400" />
            <span>Instant Payout (UPI)</span>
          </button>

          <button
            onClick={() => alert('Downloading GST Statement PDF...')}
            className="px-4 py-2.5 bg-white border border-warm-300 hover:border-slate-400 rounded-2xl text-xs font-bold text-slate-800 flex items-center space-x-1.5 shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export GST Invoice</span>
          </button>
        </div>
      </div>

      {/* Main Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Available Balance */}
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-7 shadow-floating relative overflow-hidden space-y-4 border border-slate-800">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-trust-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider block">
              Available Escrow Balance
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Ready for Payout</span>
            </span>
          </div>

          <div className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            {formatINR(availableBalance)}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Daily Automated Transfer:</span>
            <span className="text-emerald-400 font-bold">Tomorrow at 06:00 AM</span>
          </div>
        </div>

        {/* Card 2: This Month Gross */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-warm-300 shadow-card space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-extrabold uppercase tracking-wider">Gross Volume (This Month)</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-950">
            {formatINR(totalGrossEarnings)}
          </div>
          <div className="text-xs text-emerald-700 font-bold flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>42 completed jobs (100% Escrow settled)</span>
          </div>
        </div>

        {/* Card 3: Trust Streak Bonuses */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-warm-300 shadow-card space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-extrabold uppercase tracking-wider">Civic Trust Bonuses</span>
            <ShieldCheck className="w-4 h-4 text-trust-600" />
          </div>
          <div className="text-3xl font-black text-trust-700">
            {formatINR(trustIncentives)}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Awarded for 0 complaints streak & 99.2% on-time arrival rate.
          </div>
        </div>

      </div>

      {/* Registered Payout Account Card */}
      <div className="bg-white border border-warm-300 rounded-3xl p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-sm">
            <Building className="w-6 h-6 text-trust-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-slate-950 text-base">HDFC Bank Primary Payout Account</span>
              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-200">
                Verified IMPS/UPI
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Account: •••• •••• 9021 • IFSC: HDFC0001242 • Beneficiary: {activeWorker.name}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <span className="px-3 py-1.5 rounded-xl bg-warm-100 text-slate-700 font-bold text-xs">
            Instant Transfer Enabled (0% Fee)
          </span>
        </div>
      </div>

      {/* Itemized Payout Ledger Table */}
      <div className="bg-white rounded-3xl border border-warm-300 shadow-card p-6 sm:p-7 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-950">Itemized Job Settlement Ledger</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">All customer payments released through Civic Trust Protocol</p>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center space-x-1 p-1 bg-warm-100 rounded-xl border border-warm-200 text-xs font-bold">
            {(['week', 'month', 'all'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1 rounded-lg transition-all capitalize ${
                  timeframe === t
                    ? 'bg-white text-slate-950 shadow-sm font-extrabold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {t === 'all' ? 'All Time' : `This ${t}`}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-warm-200">
          {transactions.map((txn) => (
            <div key={txn.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-slate-950 text-sm">{txn.service}</span>
                  <span className="bg-warm-100 text-slate-700 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold">
                    {txn.jobRef}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
                  <span>Client: <strong>{txn.customer}</strong></span>
                  <span>•</span>
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{txn.date}</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end space-x-6">
                <div className="text-right">
                  <span className="text-base font-black text-emerald-700 block">
                    +{formatINR(txn.netPayout)}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Gross: {formatINR(txn.amount)} (10% Fee)
                  </span>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold">
                  {txn.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WITHDRAW TO BANK / UPI MODAL */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-floating border border-slate-100 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-warm-200">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                  <Wallet className="w-4 h-4 text-trust-400" />
                </div>
                <h3 className="font-extrabold text-slate-950 text-base">Instant Bank / UPI Transfer</h3>
              </div>
              <button onClick={() => setShowWithdrawModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            {withdrawSuccess ? (
              <div className="py-8 text-center space-y-3 animate-in zoom-in-95">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200 shadow-sm">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="font-black text-slate-950 text-lg">₹{availableBalance.toLocaleString('en-IN')} Transferred!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Amount deposited via IMPS / UPI to HDFC Bank A/c •••• 9021. UTR: 6234901827.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 space-y-1 text-center">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Transfer Amount</span>
                  <div className="text-3xl font-black text-slate-950">{formatINR(availableBalance)}</div>
                  <span className="text-[11px] text-emerald-700 font-bold">0% Transfer Fee • 100% Escrow Released</span>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-700 block">Select Destination:</span>
                  <div className="p-3 bg-warm-100 rounded-xl border border-warm-300 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-trust-600" />
                      <div>
                        <span className="font-extrabold text-slate-900 block">HDFC Bank A/c (•••• 9021)</span>
                        <span className="text-[10px] text-slate-500">Rajesh Sharma • Indiranagar</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-trust-600">Default</span>
                  </div>
                </div>

                <button
                  onClick={handleInstantWithdraw}
                  className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Transfer {formatINR(availableBalance)} to Bank Now</span>
                  <ArrowUpRight className="w-4 h-4 text-trust-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
