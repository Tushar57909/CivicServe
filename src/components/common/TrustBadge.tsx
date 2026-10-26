import React from 'react';
import { ShieldCheck, Award, FileCheck, CheckCircle2, ShieldAlert } from 'lucide-react';

interface TrustBadgeProps {
  type: 'identity' | 'skill' | 'police' | 'insurance' | 'experience' | 'elite';
  label?: string;
  status?: 'verified' | 'pending' | 'active';
  size?: 'sm' | 'md';
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  type,
  label,
  status = 'verified',
  size = 'sm'
}) => {
  const getBadgeContent = () => {
    switch (type) {
      case 'identity':
        return {
          icon: <CheckCircle2 className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
          text: label || 'Govt ID Verified',
          color: 'bg-blue-50 text-blue-800 border-blue-200'
        };
      case 'skill':
        return {
          icon: <Award className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
          text: label || 'Skill Certified',
          color: 'bg-emerald-50 text-emerald-800 border-emerald-200'
        };
      case 'police':
        return {
          icon: <ShieldCheck className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
          text: label || 'Police Cleared',
          color: 'bg-indigo-50 text-indigo-800 border-indigo-200'
        };
      case 'insurance':
        return {
          icon: <FileCheck className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
          text: label || 'Damage Insured',
          color: 'bg-amber-50 text-amber-900 border-amber-200'
        };
      case 'elite':
        return {
          icon: <ShieldCheck className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
          text: label || 'Civic Master Pro',
          color: 'bg-primary text-white border-primary'
        };
      default:
        return {
          icon: <CheckCircle2 className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
          text: label || 'Verified',
          color: 'bg-slate-100 text-slate-800 border-slate-200'
        };
    }
  };

  const badge = getBadgeContent();

  if (status === 'pending') {
    return (
      <span className={`inline-flex items-center gap-1 font-label font-medium rounded-full border border-amber-200 bg-amber-50 text-amber-800 ${
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      }`}>
        <ShieldAlert className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
        {badge.text} (Verification In Progress)
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 font-label font-medium rounded-full border transition-all ${badge.color} ${
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      }`}
    >
      {badge.icon}
      <span>{badge.text}</span>
    </span>
  );
};
