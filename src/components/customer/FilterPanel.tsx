import React from 'react';
import { useApp } from '../../context/AppContext';
import { SlidersHorizontal, MapPin, Award, CheckCircle, RotateCcw } from 'lucide-react';

export const FilterPanel: React.FC = () => {
  const {
    services,
    selectedCategory,
    setSelectedCategory,
    selectedNeighborhood,
    setSelectedNeighborhood,
    maxDistance,
    setMaxDistance,
    minTrustScore,
    setMinTrustScore,
    onlyOnline,
    setOnlyOnline,
    sortBy,
    setSortBy
  } = useApp();

  const neighborhoods = [
    { value: 'all', label: 'All Local Neighborhoods' },
    { value: 'indiranagar', label: 'Indiranagar & Domlur' },
    { value: 'koramangala', label: 'Koramangala & HSR' },
    { value: 'whitefield', label: 'Whitefield & Marathahalli' },
    { value: 'malleshwaram', label: 'Malleshwaram & Rajajinagar' },
    { value: 'sarjapur', label: 'Sarjapur & Bellandur' }
  ];

  const handleReset = () => {
    setSelectedCategory('all');
    setSelectedNeighborhood('all');
    setMaxDistance(20);
    setMinTrustScore(80);
    setOnlyOnline(false);
    setSortBy('trust');
  };

  return (
    <div className="bg-white border border-outline-variant/50 rounded-2xl p-5 shadow-sm space-y-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider font-label">
            Filter & Sort
          </h3>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-slate-500 hover:text-primary font-label flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Service Category */}
      <div>
        <label className="block text-xs font-bold text-on-surface font-label uppercase tracking-wider mb-2">
          Service Category
        </label>
        <div className="space-y-1.5 font-label text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
              selectedCategory === 'all'
                ? 'bg-primary text-white font-bold shadow-xs'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            <span>All Services</span>
          </button>
          {services.map(srv => (
            <button
              key={srv.id}
              onClick={() => setSelectedCategory(srv.slug)}
              className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                selectedCategory === srv.slug
                  ? 'bg-primary text-white font-bold shadow-xs'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              <span>{srv.name}</span>
              <span className={`text-[10px] font-bold ${selectedCategory === srv.slug ? 'text-emerald-200' : 'text-slate-400'}`}>
                {srv.activeWorkersCount}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-bold text-on-surface font-label uppercase tracking-wider mb-2">
          Sort By
        </label>
        <div className="grid grid-cols-2 gap-1.5 font-label text-xs">
          {[
            { key: 'trust', label: 'Trust Score' },
            { key: 'rating', label: 'Highest Rating' },
            { key: 'distance', label: 'Nearest Distance' },
            { key: 'price', label: 'Starting Price' }
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setSortBy(item.key as any)}
              className={`px-2.5 py-2 rounded-xl border text-center font-semibold transition-all ${
                sortBy === item.key
                  ? 'bg-primary-fixed/40 border-primary text-primary font-bold'
                  : 'border-outline-variant/40 bg-surface-container-low/40 text-on-surface hover:bg-surface-container-low'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Neighborhood Selector */}
      <div>
        <label className="block text-xs font-bold text-on-surface font-label uppercase tracking-wider mb-2">
          Neighborhood
        </label>
        <select
          value={selectedNeighborhood}
          onChange={(e) => setSelectedNeighborhood(e.target.value)}
          className="w-full text-xs font-label p-2.5 rounded-xl border border-outline-variant/60 bg-surface-container-low text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
        >
          {neighborhoods.map(n => (
            <option key={n.value} value={n.value}>{n.label}</option>
          ))}
        </select>
      </div>

      {/* Minimum Trust Score Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-on-surface font-label uppercase tracking-wider">
            Min Civic Trust Score
          </label>
          <span className="text-xs font-bold text-emerald-700 font-label bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {minTrustScore}+ / 100
          </span>
        </div>
        <input
          type="range"
          min="80"
          max="98"
          step="1"
          value={minTrustScore}
          onChange={(e) => setMinTrustScore(Number(e.target.value))}
          className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-label mt-1">
          <span>80 (Certified)</span>
          <span>90 (Master)</span>
          <span>98 (Elite)</span>
        </div>
      </div>

      {/* Max Distance Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-on-surface font-label uppercase tracking-wider">
            Max Distance
          </label>
          <span className="text-xs font-bold text-primary font-label bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            Within {maxDistance} km
          </span>
        </div>
        <input
          type="range"
          min="2"
          max="20"
          step="1"
          value={maxDistance}
          onChange={(e) => setMaxDistance(Number(e.target.value))}
          className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-label mt-1">
          <span>2 km (Local)</span>
          <span>10 km</span>
          <span>20 km (City)</span>
        </div>
      </div>

      {/* Instant Online Availability Checkbox */}
      <div className="pt-2 border-t border-outline-variant/30">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={onlyOnline}
            onChange={(e) => setOnlyOnline(e.target.checked)}
            className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary"
          />
          <div className="text-xs font-label">
            <span className="font-bold text-on-surface block">Available Right Now</span>
            <span className="text-[11px] text-slate-500">Show only workers with active online dispatch</span>
          </div>
        </label>
      </div>
    </div>
  );
};
