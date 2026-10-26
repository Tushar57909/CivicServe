/**
 * Formats price in Indian Rupees (INR - ₹)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatINR = formatCurrency;


/**
 * Returns trust badge color and label for a given score (0 - 100)
 */
export const getTrustScoreTier = (score: number) => {
  if (score >= 95) {
    return {
      label: 'Elite Civic Pro',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      ringColor: '#059669',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    };
  }
  if (score >= 90) {
    return {
      label: 'Verified Master',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      ringColor: '#1d4ed8',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200'
    };
  }
  if (score >= 80) {
    return {
      label: 'Civic Certified',
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      ringColor: '#d97706',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200'
    };
  }
  return {
    label: 'Standard Pro',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    ringColor: '#64748b',
    badgeClass: 'bg-slate-50 text-slate-700 border-slate-200'
  };
};
