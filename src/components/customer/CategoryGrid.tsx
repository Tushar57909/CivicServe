import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';
import { Zap, Wrench, Snowflake, Hammer, Tv, Paintbrush, ArrowRight } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const { services, navigateTo, setSelectedCategory } = useApp();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-6 h-6 text-amber-600" />;
      case 'Wrench': return <Wrench className="w-6 h-6 text-blue-600" />;
      case 'Snowflake': return <Snowflake className="w-6 h-6 text-cyan-600" />;
      case 'Hammer': return <Hammer className="w-6 h-6 text-amber-700" />;
      case 'Tv': return <Tv className="w-6 h-6 text-indigo-600" />;
      case 'Paintbrush': return <Paintbrush className="w-6 h-6 text-rose-600" />;
      default: return <Wrench className="w-6 h-6 text-primary" />;
    }
  };

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(slug);
    navigateTo('services', { serviceSlug: slug });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {services.map((service) => (
        <div
          key={service.id}
          onClick={() => handleCategoryClick(service.slug)}
          className="group relative bg-white border border-outline-variant/40 hover:border-primary/60 rounded-2xl p-4 text-center cursor-pointer shadow-subtle hover:shadow-cardHover transition-all duration-200 flex flex-col items-center justify-between"
        >
          <div className="w-12 h-12 rounded-2xl bg-surface-container-low group-hover:bg-primary-fixed/30 flex items-center justify-center transition-colors mb-3">
            {getServiceIcon(service.iconName)}
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
              {service.name}
            </h4>
            <p className="text-[11px] text-slate-500 font-label mt-1">
              From <span className="font-bold text-on-surface">{formatCurrency(service.startingPrice)}</span>
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-outline-variant/20 w-full flex items-center justify-between text-[10px] text-slate-400 font-label">
            <span>{service.activeWorkersCount} Pros</span>
            <span className="text-emerald-700 font-bold">{service.averageRating}★</span>
          </div>
        </div>
      ))}
    </div>
  );
};
