import React from 'react';
import { useApp } from '../../context/AppContext';
import { AvailabilityStatus } from '../../types';
import { Power, Check, Clock, EyeOff } from 'lucide-react';

export const AvailabilityToggle: React.FC = () => {
  const { activeWorker, setWorkerAvailability } = useApp();

  const statuses: { key: AvailabilityStatus; label: string; desc: string; color: string }[] = [
    {
      key: 'online',
      label: 'Online & Available',
      desc: 'Receiving live requests within 10 km',
      color: 'bg-emerald-500 text-white'
    },
    {
      key: 'busy',
      label: 'Busy on Job',
      desc: 'Currently performing scheduled service',
      color: 'bg-amber-500 text-white'
    },
    {
      key: 'offline',
      label: 'Offline',
      desc: 'Not accepting new requests',
      color: 'bg-slate-400 text-white'
    }
  ];

  return (
    <div className="bg-white border border-outline-variant/40 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
      <div className="flex items-center gap-3">
        <div className={`w-3.5 h-3.5 rounded-full ${
          activeWorker.availability === 'online'
            ? 'bg-emerald-500 animate-ping'
            : activeWorker.availability === 'busy'
            ? 'bg-amber-500'
            : 'bg-slate-400'
        }`} />
        <div>
          <h4 className="text-xs font-bold text-on-surface font-label uppercase tracking-wider">
            Live Dispatch Status: <span className="text-primary capitalize">{activeWorker.availability}</span>
          </h4>
          <p className="text-[11px] text-on-surface-variant font-label">
            {activeWorker.availability === 'online'
              ? 'Visible on customer search with ~4 min response guarantee.'
              : 'You are paused from receiving new emergency bookings.'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 bg-surface-container-low p-1 rounded-xl border border-outline-variant/30 font-label text-xs">
        {statuses.map((st) => {
          const isActive = activeWorker.availability === st.key;
          return (
            <button
              key={st.key}
              onClick={() => setWorkerAvailability(activeWorker.id, st.key)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                isActive
                  ? `${st.color} shadow-xs`
                  : 'text-slate-600 hover:text-on-surface hover:bg-white/60'
              }`}
            >
              {st.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
