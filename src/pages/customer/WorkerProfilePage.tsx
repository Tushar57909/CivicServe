import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Star, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  FileCheck, 
  ArrowLeft, 
  Wrench, 
  Calendar, 
  Sparkles, 
  Award, 
  Phone,
  ArrowRight
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export const WorkerProfilePage: React.FC = () => {
  const { workers, routeParams, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'rate-card' | 'verification' | 'portfolio' | 'reviews'>('rate-card');

  const worker = workers.find(w => w.id === routeParams.workerId) || workers[0];

  const rateCards = [
    { name: 'Comprehensive Diagnostic & Fault Isolation', price: worker.startingPrice, duration: '45 mins', desc: 'Precision multimeter/pressure testing with digital load report before work begins.' },
    { name: 'Standard Component Repair & Tuning', price: worker.hourlyRate, duration: '60 mins', desc: 'Replacement of worn breakers, valves, capacitors, or channels with genuine parts.' },
    { name: 'Major Overhaul & Heavy Installation', price: worker.hourlyRate * 2.2, duration: '120 mins', desc: 'Complete rewiring, high-pressure foam jet wash, or booster pump plumbing overhaul.' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-32">
      
      {/* Back Button */}
      <button
        onClick={() => navigateTo('services')}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to search results</span>
      </button>

      {/* Hero Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-warm-300">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Avatar & Main Credentials */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <img
                src={worker.avatarUrl}
                alt={worker.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-slate-900 shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 bg-slate-950 text-white p-1.5 rounded-xl shadow-sm">
                <ShieldCheck className="w-4 h-4 text-trust-400" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">{worker.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold">
                  VERIFIED PRO
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-600">{worker.profession}</p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
                <div className="flex items-center space-x-1 font-extrabold text-slate-950">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>{worker.trustMetrics.ratingAverage}</span>
                  <span className="text-slate-400 font-normal">({worker.trustMetrics.totalReviews} reviews)</span>
                </div>

                <div className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{worker.neighborhood} ({worker.distanceKm} km)</span>
                </div>

                <div className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>~{worker.trustMetrics.averageResponseMinutes} min response</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Score & CTA Box */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-warm-200 gap-4">
            <div className="flex items-center space-x-3 bg-warm-100 px-4 py-2.5 rounded-2xl border border-warm-200">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm">
                {worker.trustMetrics.overallScore}
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Civic Trust</div>
                <div className="text-xs font-black text-slate-900">Top 1% Ranked</div>
              </div>
            </div>

            <button
              onClick={() => navigateTo('new-booking', { workerId: worker.id, serviceSlug: worker.categorySlug })}
              className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-extrabold shadow-sm transition-all flex items-center space-x-2"
            >
              <span>Book Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-warm-300 space-x-8 text-sm font-bold">
        {[
          { id: 'rate-card', label: 'Transparent Rate Card' },
          { id: 'verification', label: 'Verified by CivicServe' },
          { id: 'portfolio', label: 'Proof of Work' },
          { id: 'reviews', label: `Verified Reviews (${worker.reviews.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 transition-colors relative ${
              activeTab === tab.id
                ? 'text-slate-950 border-b-2 border-slate-950'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: TRANSPARENT RATE CARD */}
      {activeTab === 'rate-card' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-warm-50 p-4 rounded-2xl border border-warm-200 text-xs text-slate-600 font-medium">
            <span className="font-bold text-slate-900">Civic Price Promise:</span> Upfront itemized rates. The final quote is confirmed in person before work begins with zero hidden call-out surprises.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rateCards.map((card, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-warm-300 shadow-card flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.duration}</span>
                    <span className="text-base font-extrabold text-slate-950">{formatINR(card.price)}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{card.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                </div>

                <button
                  onClick={() => navigateTo('new-booking', { workerId: worker.id, serviceSlug: worker.categorySlug })}
                  className="w-full py-2 rounded-xl bg-warm-100 hover:bg-slate-900 hover:text-white text-slate-900 text-xs font-bold transition-colors"
                >
                  Select & Book
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: 4-LAYER VERIFICATION BADGES */}
      {activeTab === 'verification' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
          {[
            {
              title: 'Aadhaar Biometric Verification',
              idNumber: worker.kyc.aadhaarNumberMasked,
              status: worker.kyc.aadhaarStatus,
              desc: 'Legal identity and national ID verified via DigiLocker / UIDAI verification pipeline.'
            },
            {
              title: 'Technical Skill Certification',
              idNumber: worker.kyc.tradeCertificateName,
              status: worker.kyc.tradeCertificateStatus,
              desc: `Issued by ${worker.kyc.tradeCertificateIssuer} with grade-A trade qualifications.`
            },
            {
              title: 'Police Station Background Clearance',
              idNumber: worker.kyc.policeClearanceNumber,
              status: worker.kyc.policeClearanceStatus,
              desc: 'Official certificate confirming zero criminal background from local police station.'
            },
            {
              title: 'Civic Guarantee & Damage Insurance',
              idNumber: worker.kyc.insuranceCoverageAmount,
              status: 'active',
              desc: 'Insured for up to ₹5,00,000 for any accidental property or wiring damage.'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-warm-300 shadow-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 text-sm">{item.title}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-extrabold border border-emerald-200 uppercase">
                  ✓ {item.status}
                </span>
              </div>
              <div className="text-xs font-mono text-slate-600 bg-warm-100 px-2.5 py-1 rounded-md">
                Ref: {item.idNumber}
              </div>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: PROOF OF WORK PORTFOLIO */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {worker.pastWorkPhotos.map((photo, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-warm-300 shadow-card">
                <img src={photo} alt="Work Proof" className="w-full h-48 object-cover" />
                <div className="p-3 bg-white">
                  <div className="text-xs font-bold text-slate-800">Completed Installation #{idx + 1}</div>
                  <div className="text-[11px] text-slate-500">Verified on-site completion in Bengaluru</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-5 rounded-2xl border border-warm-300 shadow-card space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900">Equipped Professional Toolset</h3>
            <div className="flex flex-wrap gap-2">
              {worker.toolsEquipped.map((tool, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl bg-warm-100 text-slate-800 text-xs font-semibold border border-warm-200 flex items-center space-x-1.5">
                  <Wrench className="w-3 h-3 text-slate-500" />
                  <span>{tool}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: VERIFIED CUSTOMER REVIEWS */}
      {activeTab === 'reviews' && (
        <div className="space-y-4 animate-in fade-in">
          {worker.reviews.map((rev) => (
            <div key={rev.id} className="bg-white p-5 rounded-2xl border border-warm-300 shadow-card space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    {rev.customerName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 text-xs">{rev.customerName}</div>
                    <div className="text-[10px] text-slate-500">{rev.customerCity} · {rev.date}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-700 font-medium italic">"{rev.comment}"</p>
              <div className="text-[10px] font-bold text-trust-700 pt-1">
                ✓ Verified Booking: {rev.serviceRendered}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sticky Bottom Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-warm-300 py-3 px-4 shadow-floating">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Upfront Estimate</span>
            <div className="text-base font-black text-slate-950">
              {formatINR(worker.startingPrice)}
              <span className="text-xs text-slate-500 font-normal"> / visit</span>
            </div>
          </div>

          <button
            onClick={() => navigateTo('new-booking', { workerId: worker.id, serviceSlug: worker.categorySlug })}
            className="px-8 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black shadow-sm flex items-center space-x-2"
          >
            <span>Book with {worker.name.split(' ')[0]}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
