import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Filter, 
  MapPin, 
  Sparkles, 
  SlidersHorizontal, 
  RotateCcw, 
  Map, 
  List, 
  Check, 
  ShieldCheck, 
  Users, 
  Star,
  Search
} from 'lucide-react';
import { WorkerCard } from '../../components/common/WorkerCard';
import { InteractiveMap } from '../../components/common/InteractiveMap';
import { WorkerCompareDrawer } from '../../components/common/WorkerCompareDrawer';

export const ServiceSearchPage: React.FC = () => {
  const { 
    workers, 
    services, 
    selectedCategory, 
    setSelectedCategory,
    selectedNeighborhood,
    setSelectedNeighborhood,
    searchQuery,
    setSearchQuery,
    maxDistance,
    setMaxDistance,
    minTrustScore,
    setMinTrustScore,
    onlyOnline,
    setOnlyOnline,
    sortBy,
    setSortBy,
    navigateTo,
    t
  } = useApp();


  const [compareWorkerIds, setCompareWorkerIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [selectedMapWorkerId, setSelectedMapWorkerId] = useState<string | undefined>(undefined);
  const [showMobileMap, setShowMobileMap] = useState(false);

  // Filter and sort workers
  const filteredWorkers = useMemo(() => {
    return workers.filter((w) => {
      // Category filter
      if (selectedCategory && selectedCategory !== 'all' && w.categorySlug !== selectedCategory) {
        return false;
      }
      // Neighborhood filter
      if (selectedNeighborhood && selectedNeighborhood !== 'all' && !w.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase())) {
        return false;
      }
      // Availability filter
      if (onlyOnline && w.availability !== 'online') {
        return false;
      }
      // Min Trust Score filter
      if (w.trustMetrics.overallScore < minTrustScore) {
        return false;
      }
      // Distance filter
      if (w.distanceKm > maxDistance) {
        return false;
      }
      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = w.name.toLowerCase().includes(q);
        const matchesTrade = w.profession.toLowerCase().includes(q);
        const matchesSpecialties = w.specialties.some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesTrade && !matchesSpecialties) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'trust') return b.trustMetrics.overallScore - a.trustMetrics.overallScore;
      if (sortBy === 'rating') return b.trustMetrics.ratingAverage - a.trustMetrics.ratingAverage;
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (sortBy === 'price') return a.startingPrice - b.startingPrice;
      return 0;
    });
  }, [workers, selectedCategory, selectedNeighborhood, onlyOnline, minTrustScore, maxDistance, searchQuery, sortBy]);

  const handleToggleCompare = (workerId: string) => {
    if (compareWorkerIds.includes(workerId)) {
      setCompareWorkerIds(compareWorkerIds.filter(id => id !== workerId));
    } else {
      if (compareWorkerIds.length >= 3) {
        setCompareWorkerIds([...compareWorkerIds.slice(1), workerId]);
      } else {
        setCompareWorkerIds([...compareWorkerIds, workerId]);
      }
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedNeighborhood('all');
    setSearchQuery('');
    setMaxDistance(20);
    setMinTrustScore(80);
    setOnlyOnline(false);
    setSortBy('trust');
  };

  const compareWorkersList = workers.filter(w => compareWorkerIds.includes(w.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Search & Filter Bar */}
      <div className="bg-white p-4 rounded-3xl shadow-card border border-warm-300 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search Query Input */}
        <div className="flex-1 flex items-center space-x-3 px-3.5 py-2 bg-warm-100/80 rounded-2xl border border-warm-200 focus-within:border-slate-900 transition-colors">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchProsPlaceholder}
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 overflow-x-auto pb-1 md:pb-0">
          
          {/* Compare Button */}
          {compareWorkerIds.length > 0 && (
            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-4 py-2 rounded-xl bg-trust-600 text-white text-xs font-bold shadow-sm hover:bg-trust-700 flex items-center space-x-1.5 animate-in zoom-in-95 flex-shrink-0"
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t.compareButton} ({compareWorkerIds.length}/3)</span>
            </button>
          )}

          {/* Mobile Map Toggle */}
          <button
            onClick={() => setShowMobileMap(!showMobileMap)}
            className="lg:hidden px-3.5 py-2 rounded-xl bg-warm-100 hover:bg-warm-200 border border-warm-300 text-xs font-bold text-slate-800 flex items-center space-x-1.5 flex-shrink-0"
          >
            {showMobileMap ? <List className="w-3.5 h-3.5" /> : <Map className="w-3.5 h-3.5 text-trust-600" />}
            <span>{showMobileMap ? t.showList : t.showMap}</span>
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center space-x-1.5 flex-shrink-0">
            <span className="text-xs font-bold text-slate-400">{t.sortBy}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-warm-100 border border-warm-300 text-xs font-bold text-slate-900 focus:outline-none"
            >
              <option value="trust">{t.highestTrust}</option>
              <option value="rating">{t.topRating}</option>
              <option value="distance">{t.nearestDistance}</option>
              <option value="price">{t.lowestPrice}</option>
            </select>
          </div>

        </div>


      </div>

      {/* Main 3-Column Layout: Filter Rail, Worker Results, Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Filter Rail (col-span-3) */}
        <aside className="lg:col-span-3 bg-white p-5 rounded-3xl shadow-card border border-warm-300 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-warm-200">
            <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-sm">
              <SlidersHorizontal className="w-4 h-4" />
              <span>{t.filters}</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.reset}</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">
              {t.tradeCategory}
            </label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-warm-100'
                }`}
              >
                <span>{t.allTrades}</span>
                <span>{workers.length}</span>
              </button>
              {services.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => setSelectedCategory(srv.slug)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                    selectedCategory === srv.slug
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-warm-100'
                  }`}
                >
                  <span>{srv.name}</span>
                  <span className="text-[11px] opacity-70 font-normal">
                    {workers.filter(w => w.categorySlug === srv.slug).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Trust Score Slider */}
          <div className="space-y-2 pt-2 border-t border-warm-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                {t.minTrustScore}
              </label>
              <span className="text-xs font-black text-slate-900">{minTrustScore}+</span>
            </div>
            <input
              type="range"
              min="70"
              max="98"
              step="2"
              value={minTrustScore}
              onChange={(e) => setMinTrustScore(parseInt(e.target.value, 10))}
              className="w-full accent-slate-900"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>70 (Certified)</span>
              <span>95+ (Elite)</span>
            </div>
          </div>

          {/* Max Distance Filter */}
          <div className="space-y-2 pt-2 border-t border-warm-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                {t.maxDistance}
              </label>
              <span className="text-xs font-black text-slate-900">{maxDistance} km</span>
            </div>
            <input
              type="range"
              min="3"
              max="35"
              step="2"
              value={maxDistance}
              onChange={(e) => setMaxDistance(parseInt(e.target.value, 10))}
              className="w-full accent-slate-900"
            />
          </div>

          {/* Availability Toggle */}
          <div className="pt-2 border-t border-warm-200">
            <label className="flex items-center space-x-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyOnline}
                onChange={(e) => setOnlyOnline(e.target.checked)}
                className="rounded text-slate-900 focus:ring-slate-900"
              />
              <span className="text-xs font-bold text-slate-900">{t.onlyAvailableNow}</span>
            </label>
          </div>

        </aside>

        {/* CENTER: Worker Results List (col-span-5 or 6) */}
        <main className={`space-y-6 ${showMobileMap ? 'hidden lg:block' : 'block'} lg:col-span-5 xl:col-span-5`}>
          
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-950">
              {t.verifiedProsFound} ({filteredWorkers.length})
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              {t.verifiedPill}
            </span>
          </div>

          {filteredWorkers.length === 0 ? (
            <div className="bg-white p-10 rounded-3xl border border-warm-300 text-center space-y-4 shadow-card">
              <div className="w-12 h-12 rounded-full bg-warm-200 flex items-center justify-center mx-auto text-slate-400">
                <Filter className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">{t.noProsMatch}</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                  {t.tryAdjustingFilters}
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                {t.resetAllFilters}
              </button>
            </div>
          ) : (


            <div className="space-y-5">
              {filteredWorkers.map((worker) => (
                <WorkerCard
                  key={worker.id}
                  worker={worker}
                  isSelectedForCompare={compareWorkerIds.includes(worker.id)}
                  onToggleCompare={handleToggleCompare}
                />
              ))}
            </div>
          )}

        </main>

        {/* RIGHT: Interactive Local Map (col-span-4) */}
        <aside className={`${showMobileMap ? 'block' : 'hidden lg:block'} lg:col-span-4 xl:col-span-4 sticky top-24`}>
          <InteractiveMap
            workers={filteredWorkers}
            selectedWorkerId={selectedMapWorkerId}
            onSelectWorker={(id) => {
              setSelectedMapWorkerId(id);
              navigateTo('worker-profile', { workerId: id });
            }}
            userNeighborhood={selectedNeighborhood}
          />
        </aside>

      </div>

      {/* Side-by-Side Worker Comparison Drawer */}
      <WorkerCompareDrawer
        workers={compareWorkersList}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onBookWorker={(id) => {
          setIsCompareOpen(false);
          const w = workers.find(item => item.id === id);
          navigateTo('new-booking', { workerId: id, serviceSlug: w?.categorySlug });
        }}
        onRemoveWorker={(id) => {
          setCompareWorkerIds(compareWorkerIds.filter(item => item !== id));
          if (compareWorkerIds.length <= 1) setIsCompareOpen(false);
        }}
      />

    </div>
  );
};
