import React, { useState } from 'react';
import { Sparkles, Search, ArrowRight, CornerDownLeft, ShieldCheck, Zap, Wrench, Snowflake, Droplets } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { parseNaturalLanguageServiceQuery } from '../../utils/aiMatcher';

interface AISearchBarProps {
  onSearchSubmit?: () => void;
  compact?: boolean;
}

export const AISearchBar: React.FC<AISearchBarProps> = ({ onSearchSubmit, compact = false }) => {
  const { workers, navigateTo, setSearchQuery, setSelectedCategory, setIsAiModalOpen } = useApp();
  const [inputValue, setInputValue] = useState('');
  const [previewResult, setPreviewResult] = useState<ReturnType<typeof parseNaturalLanguageServiceQuery> | null>(null);

  const samplePrompts = [
    'My AC is leaking water and not cooling in Koramangala',
    'Main MCB switch tripping repeatedly urgent',
    'Severe kitchen sink pipe blockage in Indiranagar',
    'Washing machine making loud vibration noise'
  ];

  const handleInputChange = (val: string) => {
    setInputValue(val);
    if (val.trim().length > 3) {
      const result = parseNaturalLanguageServiceQuery(val, workers);
      setPreviewResult(result);
    } else {
      setPreviewResult(null);
    }
  };

  const handleExecuteSearch = (queryText: string) => {
    const text = queryText || inputValue;
    if (!text.trim()) return;

    const result = parseNaturalLanguageServiceQuery(text, workers);
    setSearchQuery(text);
    setSelectedCategory(result.detectedCategory);
    navigateTo('services', { query: text, serviceSlug: result.detectedCategory });
    if (onSearchSubmit) onSearchSubmit();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Input Box with AI Gradient Glow */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-indigo-600 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300" />

        <div className="relative bg-white rounded-2xl p-2 sm:p-2.5 shadow-card flex flex-col sm:flex-row items-stretch sm:items-center gap-2 border border-outline-variant/50">
          <div className="flex items-center gap-2.5 pl-3 flex-1">
            <div className="w-8 h-8 rounded-xl bg-primary-fixed text-primary flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleExecuteSearch(inputValue)}
              placeholder="Describe your issue in plain English (e.g. AC leaking water tomorrow in Koramangala)..."
              className="w-full text-sm sm:text-base font-medium text-on-surface placeholder:text-slate-400 bg-transparent border-none focus:outline-none focus:ring-0"
            />
          </div>

          <div className="flex items-center gap-2 pr-1">
            <button
              onClick={() => handleExecuteSearch(inputValue)}
              className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-primary hover:bg-primary-container text-white text-xs sm:text-sm font-semibold font-label rounded-xl shadow transition-all flex items-center justify-center gap-2"
            >
              <span>Match Pro</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Natural Language Structured Extraction Tag Preview */}
      {previewResult && (
        <div className="mt-2.5 p-3 bg-white/90 backdrop-blur-sm border border-emerald-200 rounded-xl shadow-sm text-xs font-label animate-fadeIn flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              AI Parsed:
            </span>
            <span className="font-semibold text-on-surface bg-surface-container px-2 py-0.5 rounded">
              Category: {previewResult.detectedCategory.toUpperCase()}
            </span>
            <span className="text-on-surface-variant">
              Problem: <b>{previewResult.detectedProblem}</b>
            </span>
            {previewResult.extractedLocation && (
              <span className="bg-blue-50 text-blue-800 font-medium px-2 py-0.5 rounded">
                Near: {previewResult.extractedLocation}
              </span>
            )}
            <span className="text-emerald-700 font-bold">
              Found {previewResult.matchingWorkerIds.length} Verified Pros
            </span>
          </div>

          <button
            onClick={() => handleExecuteSearch(inputValue)}
            className="text-primary font-bold hover:underline flex items-center gap-1"
          >
            <span>View Matches</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Suggested Quick Natural Language Searches */}
      {!compact && (
        <div className="mt-3 flex items-center gap-2 flex-wrap text-xs text-on-surface-variant font-label">
          <span className="font-semibold text-slate-500">Try asking:</span>
          {samplePrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => {
                setInputValue(prompt);
                handleInputChange(prompt);
                handleExecuteSearch(prompt);
              }}
              className="px-2.5 py-1 bg-white/80 hover:bg-white border border-outline-variant/40 hover:border-primary/50 text-slate-700 rounded-lg transition-all text-[11px] shadow-2xs hover:text-primary"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
