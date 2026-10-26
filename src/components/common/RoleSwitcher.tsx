import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Users, Wrench, ShieldAlert, ChevronUp, ChevronDown, Check } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { currentRole, setCurrentRole, t } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const roles: { role: UserRole; label: string; sub: string; icon: any }[] = [
    {
      role: 'customer',
      label: t.citizenClient,
      sub: t.citizenClientSub,
      icon: Users
    },
    {
      role: 'worker',
      label: t.verifiedPro,
      sub: t.verifiedProSub,
      icon: Wrench
    },
    {
      role: 'admin',
      label: t.civicAuditor,
      sub: t.civicAuditorSub,
      icon: ShieldAlert
    }
  ];

  return (
    <aside aria-label="Demo Role Switcher" className="fixed bottom-6 left-6 z-50">
      <div className="bg-slate-950 text-white rounded-2xl shadow-floating border border-slate-800 overflow-hidden transition-all duration-200">
        
        {/* Toggle Button Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-3 px-4 py-2.5 hover:bg-slate-900 transition-colors w-full text-left"
        >
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-trust-500 animate-pulse" />
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-slate-400">
              {t.demoRole}
            </span>
          </div>
          <span className="text-xs font-bold text-white pl-1 border-l border-slate-700">
            {currentRole === 'customer' ? t.citizenClient : currentRole === 'worker' ? t.verifiedPro : t.civicAuditor}
          </span>
          {isExpanded ? (
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 text-slate-400 ml-1" />
          )}
        </button>


        {/* Expanded Persona List */}
        {isExpanded && (
          <div className="p-2 border-t border-slate-800 space-y-1 bg-slate-900/90 backdrop-blur-md">
            {roles.map(({ role, label, sub, icon: Icon }) => (
              <button
                key={role}
                onClick={() => {
                  setCurrentRole(role);
                  setIsExpanded(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                  currentRole === role
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    currentRole === role ? 'bg-trust-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">{label}</div>
                    <div className="text-[10px] text-slate-400 leading-tight">{sub}</div>
                  </div>
                </div>
                {currentRole === role && (
                  <Check className="w-3.5 h-3.5 text-trust-400" />
                )}
              </button>
            ))}
          </div>
        )}

      </div>
    </aside>
  );
};
