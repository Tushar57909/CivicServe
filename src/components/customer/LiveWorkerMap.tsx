import React, { useState, useEffect } from 'react';
import { 
  Navigation, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Radio, 
  Compass, 
  Maximize2, 
  Clock, 
  CheckCircle2,
  AlertTriangle,
  LocateFixed
} from 'lucide-react';
import { Worker, Booking } from '../../types';
import { useApp } from '../../context/AppContext';

interface LiveWorkerMapProps {
  booking: Booking;
  workerName: string;
  workerAvatar: string;
  workerPhone: string;
  workerProfession: string;
  trustScore: number;
  userAddress: string;
}

export const LiveWorkerMap: React.FC<LiveWorkerMapProps> = ({
  booking,
  workerName,
  workerAvatar,
  workerPhone,
  workerProfession,
  trustScore,
  userAddress
}) => {
  const { t } = useApp();
  const [workerProgress, setWorkerProgress] = useState(0.42); // 0 (worker hub) to 1.0 (customer door)
  const [etaMinutes, setEtaMinutes] = useState(14);
  const [distanceKm, setDistanceKm] = useState(2.3);
  const [isSimulatingMove, setIsSimulatingMove] = useState(true);

  // Live GPS simulation loop
  useEffect(() => {
    if (booking.status === 'completed') {
      setWorkerProgress(1.0);
      setEtaMinutes(0);
      setDistanceKm(0);
      return;
    }

    if (!isSimulatingMove) return;

    const interval = setInterval(() => {
      setWorkerProgress((prev) => {
        if (prev >= 0.95) return 0.95;
        const next = prev + 0.015;
        setEtaMinutes(Math.max(2, Math.round((1 - next) * 22)));
        setDistanceKm(Math.max(0.2, parseFloat(((1 - next) * 4.2).toFixed(1))));
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [booking.status, isSimulatingMove]);

  // Coordinate math for SVG path
  // Route starting from worker base (Indiranagar 100ft Rd) to Customer Residence
  const startX = 80;
  const startY = 240;
  const endX = 540;
  const endY = 90;

  // Bezier curve control points mimicking Bengaluru city roads
  const cp1X = 220;
  const cp1Y = 260;
  const cp2X = 360;
  const cp2Y = 120;

  // Calculate current worker position along cubic bezier curve
  const tCoord = workerProgress;
  const currX =
    Math.pow(1 - tCoord, 3) * startX +
    3 * Math.pow(1 - tCoord, 2) * tCoord * cp1X +
    3 * (1 - tCoord) * Math.pow(tCoord, 2) * cp2X +
    Math.pow(tCoord, 3) * endX;

  const currY =
    Math.pow(1 - tCoord, 3) * startY +
    3 * Math.pow(1 - tCoord, 2) * tCoord * cp1Y +
    3 * (1 - tCoord) * Math.pow(tCoord, 2) * cp2Y +
    Math.pow(tCoord, 3) * endY;

  return (
    <div className="bg-white rounded-3xl border border-warm-300 shadow-card overflow-hidden transition-all duration-300">
      
      {/* Top Map Header & Controls */}
      <div className="p-4 sm:p-5 border-b border-warm-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-warm-50/70">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-slate-950 text-sm sm:text-base">
                {t.liveGpsTitle}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>{t.realTimeGps}</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {t.gpsSub}
            </p>
          </div>
        </div>

        {/* Live ETA Stats */}
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase block">{t.estArrival}</span>
            <span className="text-sm font-black text-emerald-400">
              {booking.status === 'completed' ? t.arrived : `~${etaMinutes} mins`}
            </span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-warm-200/80 text-slate-800 text-center">
            <span className="text-[9px] font-bold text-slate-500 uppercase block">{t.distance}</span>
            <span className="text-sm font-extrabold text-slate-950">
              {booking.status === 'completed' ? '0.0 km' : `${distanceKm} km`}
            </span>
          </div>
        </div>
      </div>


      {/* Map Canvas / Simulated GIS View */}
      <div className="relative w-full h-72 sm:h-84 bg-slate-900 overflow-hidden select-none">
        
        {/* Map Grid and Background Street Styling */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Map Glow */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-trust-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* SVG Route Rendering */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 620 320" preserveAspectRatio="none">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#10b981" stopOpacity="1" />
              <stop offset="100%" stopColor="#059669" stopOpacity="1" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Secondary road networks (decorative street grid) */}
          <path d="M 30 50 L 590 50" stroke="#334155" strokeWidth="2" strokeDasharray="4 6" opacity="0.4" />
          <path d="M 30 140 L 590 140" stroke="#334155" strokeWidth="2" strokeDasharray="4 6" opacity="0.4" />
          <path d="M 30 220 L 590 220" stroke="#334155" strokeWidth="2" strokeDasharray="4 6" opacity="0.4" />
          <path d="M 120 20 L 120 300" stroke="#334155" strokeWidth="2" strokeDasharray="4 6" opacity="0.4" />
          <path d="M 280 20 L 280 300" stroke="#334155" strokeWidth="2" strokeDasharray="4 6" opacity="0.4" />
          <path d="M 460 20 L 460 300" stroke="#334155" strokeWidth="2" strokeDasharray="4 6" opacity="0.4" />

          {/* Planned transit corridor (road trace) */}
          <path
            d={`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`}
            fill="none"
            stroke="#1e293b"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Active Navigation Path */}
          <path
            d={`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`}
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeDasharray="8 6"
            className="animate-pulse"
          />

          {/* Origin Landmark (Indiranagar Depot) */}
          <circle cx={startX} cy={startY} r="6" fill="#3b82f6" />
          <circle cx={startX} cy={startY} r="12" fill="#3b82f6" fillOpacity="0.2" />

          {/* Destination Landmark (User Home) */}
          <circle cx={endX} cy={endY} r="7" fill="#10b981" filter="url(#glow)" />
          <circle cx={endX} cy={endY} r="16" fill="#10b981" fillOpacity="0.2" className="animate-ping" />
        </svg>

        {/* ORIGIN PIN LABEL */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-full pointer-events-none"
          style={{ left: `${(startX / 620) * 100}%`, top: `${(startY / 320) * 100 - 4}%` }}
        >
          <div className="bg-slate-800/90 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-700 whitespace-nowrap shadow-md">
            Hub: Indiranagar 100ft Rd
          </div>
        </div>

        {/* CUSTOMER DESTINATION PIN */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-full pointer-events-none"
          style={{ left: `${(endX / 620) * 100}%`, top: `${(endY / 320) * 100 - 4}%` }}
        >
          <div className="bg-emerald-950/90 text-emerald-300 text-[10px] font-extrabold px-2.5 py-1 rounded-xl border border-emerald-500/40 whitespace-nowrap shadow-xl flex items-center space-x-1">
            <MapPin className="w-3 h-3 text-emerald-400" />
            <span>{t.serviceAddress}</span>
          </div>
        </div>

        {/* DYNAMIC LIVE WORKER VEHICLE / MARKER */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-linear z-20 cursor-pointer"
          style={{ left: `${(currX / 620) * 100}%`, top: `${(currY / 320) * 100}%` }}
        >
          {/* Pulse Ripple */}
          <div className="absolute -inset-3 bg-trust-400/20 rounded-full animate-ping pointer-events-none" />
          
          {/* Marker Card */}
          <div className="relative flex flex-col items-center">
            <div className="w-11 h-11 rounded-2xl bg-slate-950 border-2 border-trust-400 p-0.5 shadow-2xl overflow-hidden flex items-center justify-center">
              <img src={workerAvatar} alt={workerName} className="w-full h-full object-cover rounded-xl" />
            </div>

            {/* Float Badge with Pro Name & Velocity */}
            <div className="mt-1.5 bg-slate-950/95 text-white px-2 py-0.5 rounded-md border border-slate-700 shadow-lg text-[9px] font-bold whitespace-nowrap flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{workerName.split(' ')[0]}</span>
              <span className="text-slate-400">· 32 km/h</span>
            </div>
          </div>
        </div>

        {/* Floating Map Utility Bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-white text-[11px] font-bold flex items-center space-x-2 pointer-events-auto shadow-lg">
            <Compass className="w-3.5 h-3.5 text-trust-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>En Route via Old Airport Rd · Low Traffic</span>
          </div>

          <div className="flex items-center space-x-1 pointer-events-auto">
            <button 
              onClick={() => setIsSimulatingMove(!isSimulatingMove)}
              className="px-2.5 py-1 rounded-lg bg-slate-800/90 text-slate-200 text-[10px] font-bold hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              {isSimulatingMove ? t.pauseGps : t.resumeGps}
            </button>
          </div>
        </div>

      </div>

      {/* Map Footer: Contact Pro & Safety Protocol */}
      <div className="p-4 sm:p-5 bg-warm-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
            <ShieldCheck className="w-5 h-5 text-trust-400" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                {t.dispatchAssurance}
              </span>
              <span className="text-[10px] font-bold text-trust-700 bg-trust-50 px-2 py-0.5 rounded border border-trust-200">
                {trustScore}/100 {t.trustScore}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium truncate max-w-sm sm:max-w-md">
              {t.serviceLocation}: {userAddress}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <a
            href={`tel:${workerPhone}`}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-sm flex items-center justify-center space-x-2"
          >
            <Phone className="w-3.5 h-3.5 text-trust-400" />
            <span>{t.callWorker}</span>
          </a>
        </div>
      </div>


    </div>
  );
};
