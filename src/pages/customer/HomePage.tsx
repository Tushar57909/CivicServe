import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  FileCheck, 
  Zap, 
  ChevronRight,
  Shield,
  FileText
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';
import { WorkerCard } from '../../components/common/WorkerCard';
import { TierImpactStatsSection } from '../../components/common/TierImpactStatsSection';

export const HomePage: React.FC = () => {

  const { 
    services, 
    workers, 
    navigateTo, 
    selectedNeighborhood, 
    setSelectedNeighborhood,
    setSelectedCategory,
    setSearchQuery,
    setIsAiModalOpen,
    t
  } = useApp();


  const [inputQuery, setInputQuery] = useState('');

  const featuredPro = workers.find(w => w.id === 'w-rajesh-01') || workers[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      setSearchQuery(inputQuery);
      navigateTo('services', { query: inputQuery });
    } else {
      navigateTo('services');
    }
  };

  const handleQuickCategory = (slug: string) => {
    setSelectedCategory(slug);
    navigateTo('services', { serviceSlug: slug });
  };

  const categoryImages: Record<string, string> = {
    'electrician': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600',
    'ac-repair': 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=600',
    'plumber': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
    'appliance-repair': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
    'carpenter': 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=600',
    'painter': 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600'
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Hero Copy & Search CTA */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Trust Badge Pill */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-extrabold text-emerald-900 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t.trustPill}</span>
              </div>

              {/* Editorial Headline */}
              <div className="space-y-2.5">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
                  {t.heroHeadline1} <span className="text-trust-600">{t.heroHeadlineTrust}</span>.
                </h1>
                <p className="text-base sm:text-lg text-slate-600 font-medium max-w-xl leading-relaxed">
                  {t.heroSubtitle}
                </p>
              </div>

              {/* Natural Language Search Box */}
              <div className="bg-white p-3.5 sm:p-4 rounded-3xl shadow-floating border border-warm-300">
                <form onSubmit={handleSearchSubmit} className="space-y-3">
                  <div className="flex items-center space-x-3 px-3.5 py-2.5 bg-warm-100/70 rounded-2xl border border-warm-200 focus-within:border-slate-900 transition-colors">
                    <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    <input
                      type="text"
                      value={inputQuery}
                      onChange={(e) => setInputQuery(e.target.value)}
                      placeholder={t.searchPlaceholder}
                      className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-semibold focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setSelectedNeighborhood('Koramangala')}
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-1"
                    >
                      <MapPin className="w-3.5 h-3.5 text-trust-600" />
                      <span>{selectedNeighborhood === 'all' ? `${t.nearLocation} Koramangala` : `${t.nearLocation} ${selectedNeighborhood}`}</span>
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setIsAiModalOpen(true)}
                        className="px-3.5 py-2.5 rounded-xl bg-trust-50 hover:bg-trust-100 text-trust-800 text-xs font-bold transition-colors flex items-center space-x-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-trust-600" />
                        <span>{t.aiDiagnoser}</span>
                      </button>
                      <button
                        type="submit"
                        className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all shadow-md flex items-center justify-center space-x-1.5"
                      >
                        <span>{t.findServiceCTA}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Quick Search Chips */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px]">{t.frequentTags}</span>
                {[
                  { name: 'AC Jet Cleaning', slug: 'ac-repair' },
                  { name: 'MCB Tripping Fix', slug: 'electrician' },
                  { name: 'Pipe Leakage Repair', slug: 'plumber' },
                  { name: 'Appliance Motor Fix', slug: 'appliance-repair' }
                ].map((tag) => (
                  <button
                    key={tag.name}
                    onClick={() => handleQuickCategory(tag.slug)}
                    className="px-3 py-1 rounded-full bg-white hover:bg-warm-200 border border-warm-300 text-slate-700 font-semibold text-xs transition-colors"
                  >
                    {tag.name}
                  </button>
                ))}
              </div>

            </div>

            {/* Right Column: Verified Pro Spotlight */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-floating border border-warm-300 space-y-5">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-extrabold">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 pulse-available" />
                    <span>{t.availableNow}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">{t.arrivalEstimate}</span>
                </div>

                <div className="flex items-center space-x-4">
                  <img
                    src={featuredPro.avatarUrl}
                    alt={featuredPro.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-900 shadow-md"
                  />
                  <div>
                    <h3 className="text-xl font-black text-slate-950">{featuredPro.name}</h3>
                    <p className="text-xs font-semibold text-slate-600 mb-1">{featuredPro.profession}</p>
                    <div className="flex items-center space-x-1.5 text-xs">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                      <span className="font-extrabold text-slate-900">{featuredPro.trustMetrics.ratingAverage}</span>
                      <span className="text-slate-400">({featuredPro.trustMetrics.totalReviews} {t.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">{t.trustScore}</span>
                      <span className="text-xl font-black text-slate-950">{featuredPro.trustMetrics.overallScore} / 100</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">{t.completedJobs}</span>
                      <span className="text-base font-black text-slate-900">{featuredPro.trustMetrics.completedJobsCount}+</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-warm-200 text-[11px] font-bold text-slate-700">
                    <div className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-trust-600" />
                      <span>{t.govtLicense}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-trust-600" />
                      <span>{t.policeVerified}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">{t.diagnosticCallout}</span>
                    <span className="text-base font-black text-slate-950">{formatINR(featuredPro.startingPrice)}</span>
                  </div>

                  <button
                    onClick={() => navigateTo('new-booking', { workerId: featuredPro.id, serviceSlug: featuredPro.categorySlug })}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all shadow-sm flex items-center space-x-1.5"
                  >
                    <span>{t.startRequest}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TIER-2/3 CIVIC MARKETPLACE IMPACT & POST-A-NEED SECTION (PDF SPEC) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TierImpactStatsSection />
      </div>

      {/* 2. CORE SERVICE DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-trust-700">{t.serviceDirectory}</span>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">{t.availableServices}</h2>
          </div>
          <button
            onClick={() => navigateTo('services')}
            className="text-xs font-bold text-slate-900 hover:text-trust-700 transition-colors"
          >
            {t.viewAllServices}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => handleQuickCategory(service.slug)}
              className="group text-left bg-white rounded-2xl border border-warm-300 hover:border-slate-400 p-3 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div className="relative w-full h-24 rounded-xl overflow-hidden mb-2.5 bg-warm-200">
                <img
                  src={categoryImages[service.slug] || categoryImages['electrician']}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-1.5 left-1.5 text-[10px] font-black text-white bg-slate-950/80 px-2 py-0.5 rounded backdrop-blur-sm">
                  {t.fromPrice} {formatINR(service.startingPrice)}
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-xs group-hover:text-trust-700 leading-tight">
                {service.name}
              </h3>
            </button>
          ))}
        </div>
      </section>

      {/* 3. VERIFIED PROS NEARBY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-trust-700">{t.liveDispatch}</span>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">{t.topVerifiedPros} ({selectedNeighborhood === 'all' ? 'Bengaluru' : selectedNeighborhood})</h2>
          </div>
          <button
            onClick={() => navigateTo('services')}
            className="text-xs font-bold text-slate-900 hover:text-trust-700 transition-colors"
          >
            {t.viewAllPros} ({workers.length}) →
          </button>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workers.slice(0, 3).map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      </section>

    </div>
  );
};
