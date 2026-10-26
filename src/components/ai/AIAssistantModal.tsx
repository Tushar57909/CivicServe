import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, X, ArrowRight, ShieldCheck, MapPin, Clock, Star, CheckCircle2 } from 'lucide-react';
import { parseNaturalLanguageQuery } from '../../utils/aiMatcher';
import { formatINR } from '../../utils/formatters';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const { workers, navigateTo, t } = useApp();
  const [queryText, setQueryText] = useState('My AC is leaking water in Koramangala and I need someone today');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleDiagnose = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!queryText.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const parsed = parseNaturalLanguageQuery(queryText);
      setResult(parsed);
      setIsProcessing(false);
    }, 600);
  };

  const matchedWorkers = result
    ? workers.filter(w => w.categorySlug === result.detectedCategory).slice(0, 2)
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-floating border border-slate-100 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-warm-200">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-trust-400" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-950">{t.aiDiagnoserTitle}</h2>
              <p className="text-xs text-slate-500">{t.aiDiagnoserSub}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-warm-100 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>


        {/* Input Form */}
        <form onSubmit={handleDiagnose} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Describe your issue in plain words
            </label>
            <textarea
              rows={2}
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              placeholder="e.g. My master bedroom AC is dripping water on the floor and making a rattling sound..."
              className="w-full bg-warm-100 border border-warm-300 rounded-2xl p-3.5 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
              <span>Try:</span>
              <button
                type="button"
                onClick={() => {
                  setQueryText('Main MCB breaker tripping repeatedly in Indiranagar');
                }}
                className="font-bold text-slate-800 hover:underline"
              >
                MCB Tripping
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  setQueryText('Washing machine drum making heavy noise in Koramangala');
                }}
                className="font-bold text-slate-800 hover:underline"
              >
                Washing Machine
              </button>
            </div>

            <button
              type="submit"
              disabled={isProcessing || !queryText.trim()}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-extrabold transition-all shadow-sm flex items-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Diagnosing...</span>
                </>
              ) : (
                <>
                  <span>Diagnose & Match</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Diagnostic Results */}
        {result && (
          <div className="space-y-6 pt-4 border-t border-warm-200 animate-in fade-in">
            
            {/* Structured Understanding Cards */}
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-trust-700">
                We Understood
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-warm-50 rounded-xl border border-warm-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Trade Category</span>
                  <span className="font-extrabold text-slate-900 capitalize">{result.detectedCategory.replace('-', ' ')}</span>
                </div>

                <div className="p-3 bg-warm-50 rounded-xl border border-warm-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Urgency</span>
                  <span className="font-extrabold text-emerald-800 uppercase text-[11px]">{result.urgency} Dispatch</span>
                </div>

                <div className="p-3 bg-warm-50 rounded-xl border border-warm-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Location</span>
                  <span className="font-extrabold text-slate-900">{result.extractedLocation || 'Koramangala'}</span>
                </div>

                <div className="p-3 bg-warm-50 rounded-xl border border-warm-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Expected Price</span>
                  <span className="font-extrabold text-slate-950">
                    {formatINR(result.recommendedPriceRange[0])} - {formatINR(result.recommendedPriceRange[1])}
                  </span>
                </div>
              </div>
            </div>

            {/* Why These Workers? Rationale */}
            <div className="p-4 rounded-2xl bg-trust-50 border border-trust-200 space-y-1 text-xs">
              <div className="flex items-center space-x-1.5 font-extrabold text-trust-900">
                <ShieldCheck className="w-4 h-4 text-trust-600" />
                <span>Why these recommended pros?</span>
              </div>
              <p className="text-trust-800 text-[11px] font-medium leading-relaxed">
                Ranked by 95+ Civic Trust Scores, &lt;20 min live dispatch distance, verified specialized toolkits, and 0% cancellation history for similar repair requests.
              </p>
            </div>

            {/* Matched Pros List */}
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Recommended Verified Matches ({matchedWorkers.length})
              </span>

              <div className="space-y-3">
                {matchedWorkers.map((w) => (
                  <div
                    key={w.id}
                    className="p-4 bg-white rounded-2xl border border-warm-300 shadow-card flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3.5">
                      <img src={w.avatarUrl} alt={w.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-extrabold text-slate-900 text-sm">{w.name}</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-trust-600" />
                        </div>
                        <p className="text-xs text-slate-500">{w.profession}</p>
                        <div className="text-[10px] font-bold text-trust-700 mt-0.5">
                          {w.trustMetrics.overallScore}/100 Trust · {w.distanceKm} km away
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        navigateTo('worker-profile', { workerId: w.id });
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all flex items-center space-x-1.5"
                    >
                      <span>View Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
