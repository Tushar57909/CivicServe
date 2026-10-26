import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Phone, 
  KeyRound, 
  CheckCircle2, 
  ArrowLeft, 
  Receipt,
  Lock,
  Star,
  FileText,
  FileCheck,
  Building,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';
import { ReviewModal } from '../../components/customer/ReviewModal';
import { LiveWorkerMap } from '../../components/customer/LiveWorkerMap';


export const BookingDetailPage: React.FC = () => {
  const { bookings, routeParams, navigateTo, submitWorkerReview, t } = useApp();
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const booking = bookings.find(b => b.id === routeParams.bookingId) || bookings[0];

  const isCompleted = booking.status === 'completed';
  const isInProgress = booking.status === 'in_progress';
  const isOnTheWay = booking.status === 'on_the_way';
  const isAccepted = booking.status === 'accepted';
  const isRequested = booking.status === 'requested';

  const handleReviewSubmit = (rating: number, comment: string) => {
    submitWorkerReview(booking.workerId, booking.id, rating, comment);
    setIsReviewOpen(false);
  };

  // 5 Distinct Sequential Tracking Stages
  const trackingStages = [
    {
      id: 'submitted',
      title: t.stage1Title,
      sub: t.stage1Sub,
      isDone: true,
      isCurrent: isRequested
    },
    {
      id: 'assigned',
      title: t.stage2Title,
      sub: `${booking.workerName.split(' ')[0]} ${t.onTheWayMsg}`,
      isDone: isAccepted || isOnTheWay || isInProgress || isCompleted,
      isCurrent: isAccepted || isOnTheWay
    },
    {
      id: 'documents',
      title: t.stage3Title,
      sub: t.stage3Sub,
      isDone: isInProgress || isCompleted,
      isCurrent: false
    },
    {
      id: 'processing',
      title: t.stage4Title,
      sub: t.stage4Sub,
      isDone: isInProgress || isCompleted,
      isCurrent: isInProgress
    },
    {
      id: 'completed',
      title: t.stage5Title,
      sub: t.stage5Sub,
      isDone: isCompleted,
      isCurrent: isCompleted
    }
  ];


  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Top Header & Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-slate-500 font-bold">{booking.id}</span>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
            isCompleted
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : isInProgress
              ? 'bg-amber-50 text-amber-800 border border-amber-200'
              : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}>
            {booking.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* 1. VISUAL 5-STAGE PROGRESS TRACKER (OBVIOUS UNDER 5 SECONDS) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-warm-300 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-trust-600 pulse-available" />
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
              Live Stage Tracker
            </h2>
          </div>
          <span className="text-xs font-bold text-trust-700 bg-trust-50 px-2.5 py-1 rounded-lg border border-trust-200">
            Request #{booking.id}
          </span>
        </div>

        {/* Horizontal Visual Stage Line */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
          {trackingStages.map((stage, idx) => (
            <div
              key={stage.id}
              className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between space-y-1.5 ${
                stage.isCurrent
                  ? 'bg-slate-950 text-white border-slate-950 ring-2 ring-slate-950/20 shadow-md'
                  : stage.isDone
                  ? 'bg-emerald-50 text-emerald-950 border-emerald-200'
                  : 'bg-warm-50 text-slate-400 border-warm-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                  stage.isCurrent ? 'bg-slate-800 text-trust-400' : stage.isDone ? 'bg-emerald-200/60 text-emerald-800' : 'bg-warm-200 text-slate-500'
                }`}>
                  0{idx + 1}
                </span>
                {stage.isDone && <CheckCircle2 className={`w-3.5 h-3.5 ${stage.isCurrent ? 'text-trust-400' : 'text-emerald-600'}`} />}
              </div>

              <div>
                <span className="text-xs font-black block leading-tight">{stage.title}</span>
                <span className={`text-[10px] leading-tight block ${stage.isCurrent ? 'text-slate-300' : 'text-slate-500'}`}>
                  {stage.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. LIVE GPS WORKER TELEMETRY MAP */}
      <LiveWorkerMap
        booking={booking}
        workerName={booking.workerName}
        workerAvatar={booking.workerAvatar}
        workerPhone={booking.workerPhone}
        workerProfession={booking.workerProfession}
        trustScore={booking.workerTrustScore}
        userAddress={booking.address.addressLine1}
      />

      {/* 3. DISPATCH & WORKER INFO CARD */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-7 shadow-floating relative overflow-hidden space-y-6">

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-trust-400 font-extrabold text-xs uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-trust-500 pulse-available" />
              <span>
                {isCompleted ? 'Service Finalized' : isInProgress ? 'Work in Progress at Site' : 'Technician Dispatched'}
              </span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {isCompleted
                ? 'Task Approved & Escrow Released'
                : isInProgress
                ? 'On-Site Diagnostic & Execution'
                : `${booking.workerName.split(' ')[0]} is on the way`}
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-1">
              {isCompleted
                ? 'Payment released to technician. GST invoice generated.'
                : isInProgress
                ? 'Technician verified Start OTP and is actively executing your request.'
                : 'Estimated arrival in ~18 minutes at your service address.'}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Escrow Held</span>
            <span className="text-lg font-black text-white">{formatINR(booking.totalAmount)}</span>
          </div>
        </div>

        {/* Assigned Worker Banner */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <img
              src={booking.workerAvatar}
              alt={booking.workerName}
              className="w-12 h-12 rounded-xl object-cover border border-slate-700"
            />
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-white text-sm">{booking.workerName}</span>
                <ShieldCheck className="w-4 h-4 text-trust-400" />
              </div>
              <p className="text-xs text-slate-400">{booking.workerProfession}</p>
              <div className="text-[10px] font-bold text-trust-400 mt-0.5">
                {booking.workerTrustScore}/100 Trust Score · {booking.workerPhone}
              </div>
            </div>
          </div>

          <a
            href={`tel:${booking.workerPhone}`}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 border border-slate-700"
          >
            <Phone className="w-3.5 h-3.5 text-trust-400" />
            <span>Call Worker</span>
          </a>
        </div>
      </div>

      {/* 3. TWO-PHASE OTP CODES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* START OTP */}
        <div className={`p-6 rounded-3xl border transition-all ${
          isInProgress || isCompleted ? 'bg-emerald-50/50 border-emerald-200' : 'bg-white border-warm-300 shadow-card'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-slate-900 uppercase">{t.startOtpTitle}</span>
            {isInProgress || isCompleted ? (
              <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                ✓ {t.verifiedBadge}
              </span>
            ) : (
              <span className="text-[10px] font-extrabold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                ACTIVE
              </span>
            )}
          </div>
          <div className="bg-warm-100 p-3 rounded-2xl text-center space-y-0.5 my-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">{t.startOtpShare}</span>
            <span className="text-2xl font-black tracking-widest text-slate-950">{booking.startOtp}</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
            {t.startOtpDesc}
          </p>
        </div>

        {/* COMPLETION OTP */}
        <div className={`p-6 rounded-3xl border transition-all ${
          isCompleted ? 'bg-emerald-50/50 border-emerald-200' : 'bg-white border-warm-300 shadow-card'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-slate-900 uppercase">{t.completionOtpTitle}</span>
            {isCompleted ? (
              <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                ✓ {t.settledBadge}
              </span>
            ) : (
              <span className="text-[10px] font-extrabold text-slate-600 bg-warm-200 px-2 py-0.5 rounded">
                PROTECTED
              </span>
            )}
          </div>
          <div className="bg-warm-100 p-3 rounded-2xl text-center space-y-0.5 my-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">{t.completionOtpShare}</span>
            <span className="text-2xl font-black tracking-widest text-slate-950">{booking.completionOtp}</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
            {t.completionOtpDesc}
          </p>
        </div>

      </div>

      {/* 4. SUMMARY RECEIPT */}
      <div className="bg-white p-6 rounded-3xl border border-warm-300 shadow-card space-y-4">
        <h3 className="font-extrabold text-slate-950 text-sm flex items-center space-x-2">
          <Receipt className="w-4 h-4 text-slate-400" />
          <span>{t.requestDetails}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-warm-50 rounded-xl border border-warm-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">{t.serviceTask}</span>
            <span className="font-extrabold text-slate-900">{booking.serviceItemName}</span>
          </div>
          <div className="p-3 bg-warm-50 rounded-xl border border-warm-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">{t.scheduledWindow}</span>
            <span className="font-extrabold text-slate-900">{booking.scheduledDate}</span>
          </div>
          <div className="p-3 bg-warm-50 rounded-xl border border-warm-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">{t.serviceLocation}</span>
            <span className="font-extrabold text-slate-900 truncate block">{booking.address.addressLine1}</span>
          </div>
        </div>
      </div>


    </div>
  );
};
