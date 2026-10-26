import React from 'react';
import { Worker } from '../../types';
import { MapPin, Navigation, ShieldCheck } from 'lucide-react';

interface InteractiveMapProps {
  workers: Worker[];
  selectedWorkerId?: string;
  onSelectWorker?: (workerId: string) => void;
  userNeighborhood?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  workers,
  selectedWorkerId,
  onSelectWorker,
  userNeighborhood = 'Koramangala'
}) => {
  // Pin coordinate offsets to place realistically on SVG grid
  const pinPositions = [
    { x: 38, y: 35, label: 'Indiranagar' },
    { x: 62, y: 55, label: 'Koramangala' },
    { x: 50, y: 72, label: 'HSR Layout' },
    { x: 80, y: 30, label: 'Whitefield' },
    { x: 25, y: 25, label: 'Malleshwaram' },
    { x: 70, y: 80, label: 'Sarjapur' }
  ];

  return (
    <div className="relative w-full h-full min-h-[380px] bg-slate-900 rounded-3xl overflow-hidden shadow-card border border-slate-800">
      
      {/* Background Map Visual */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#map-grid)" />
        
        {/* Abstract road curves */}
        <path d="M-50,200 Q200,100 450,250 T900,150" fill="none" stroke="#475569" strokeWidth="4" />
        <path d="M150,-50 Q250,200 180,450 T300,700" fill="none" stroke="#475569" strokeWidth="3" />
        <path d="M-50,380 Q300,320 600,450" fill="none" stroke="#334155" strokeWidth="6" />
      </svg>

      {/* User Location Radar */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-24 h-24 rounded-full bg-trust-500/10 animate-ping absolute -top-8 -left-8" />
        <div className="w-8 h-8 rounded-full bg-trust-500/20 flex items-center justify-center border border-trust-400">
          <div className="w-3 h-3 rounded-full bg-trust-500 shadow-md" />
        </div>
      </div>

      {/* Map Header Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700 flex items-center space-x-2 text-white shadow-lg pointer-events-auto">
          <Navigation className="w-3.5 h-3.5 text-trust-400" />
          <span className="text-xs font-semibold">
            {userNeighborhood === 'all' ? 'Bengaluru Metro' : `Near ${userNeighborhood}`}
          </span>
          <span className="text-[10px] bg-trust-900/60 text-trust-300 font-bold px-2 py-0.5 rounded-full border border-trust-700">
            {workers.length} Pros Active
          </span>
        </div>
      </div>

      {/* Worker Interactive Map Pins */}
      <div className="absolute inset-0 p-6 pointer-events-none">
        {workers.map((worker, idx) => {
          const pos = pinPositions[idx % pinPositions.length];
          const isSelected = selectedWorkerId === worker.id;

          return (
            <div
              key={worker.id}
              style={{ top: `${pos.y}%`, left: `${pos.x}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-transform hover:scale-110 z-20"
            >
              <button
                onClick={() => onSelectWorker && onSelectWorker(worker.id)}
                className={`group flex items-center space-x-1.5 p-1 rounded-full backdrop-blur-md transition-all ${
                  isSelected
                    ? 'bg-trust-600 text-white ring-4 ring-trust-400/40 shadow-floating scale-110'
                    : 'bg-slate-950/90 text-slate-100 border border-slate-700 hover:border-trust-400 shadow-md'
                }`}
              >
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/20">
                  <img src={worker.avatarUrl} alt={worker.name} className="w-full h-full object-cover" />
                </div>
                <div className="pr-2 text-left hidden sm:block">
                  <div className="text-[11px] font-bold leading-tight flex items-center space-x-1">
                    <span>{worker.name.split(' ')[0]}</span>
                    <ShieldCheck className="w-3 h-3 text-trust-400" />
                  </div>
                  <div className="text-[9px] text-slate-300 font-medium">
                    {worker.trustMetrics.overallScore} Trust · ~{Math.round(worker.distanceKm * 6)}m
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Map Footer Help */}
      <div className="absolute bottom-3 left-4 right-4 text-center pointer-events-none">
        <span className="text-[10px] text-slate-400 bg-slate-950/70 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-800">
          Click any pin on the map to inspect live availability & verify ratings
        </span>
      </div>

    </div>
  );
};
