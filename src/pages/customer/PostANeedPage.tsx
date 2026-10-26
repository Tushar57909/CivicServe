import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Send, 
  Sparkles, 
  MapPin, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquare, 
  Plus, 
  ArrowRight,
  TrendingDown,
  UserCheck,
  Zap,
  Filter
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export const PostANeedPage: React.FC = () => {
  const { 
    postedNeeds, 
    createPostedNeed, 
    acceptNeedBid, 
    submitNeedBid, 
    currentRole, 
    activeWorker, 
    customerUser, 
    navigateTo, 
    t 
  } = useApp();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // New Need Form state
  const [title, setTitle] = useState('');
  const [categorySlug, setCategorySlug] = useState('electrician');
  const [description, setDescription] = useState('');
  const [budgetMin, setBudgetMin] = useState(300);
  const [budgetMax, setBudgetMax] = useState(750);
  const [location, setLocation] = useState('Indiranagar 100ft Rd, Bengaluru');
  const [urgency, setUrgency] = useState<'immediate' | 'today' | 'flexible'>('immediate');

  // Worker Direct Quote Modal State
  const [activeQuoteNeedId, setActiveQuoteNeedId] = useState<string | null>(null);
  const [quotePrice, setQuotePrice] = useState<number>(450);
  const [quoteEta, setQuoteEta] = useState<number>(15);
  const [quoteMessage, setQuoteMessage] = useState('');

  const handleCreateNeedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    createPostedNeed({
      customerId: customerUser.id,
      customerName: customerUser.name,
      customerPhone: customerUser.phone,
      customerAadhaarVerified: true,
      categorySlug,
      title,
      description,
      budgetMin: Number(budgetMin),
      budgetMax: Number(budgetMax),
      location,
      urgency
    });

    setTitle('');
    setDescription('');
    setIsCreateModalOpen(false);
  };

  const handleWorkerQuoteSubmit = (needId: string) => {
    submitNeedBid(needId, {
      workerId: activeWorker.id,
      workerName: activeWorker.name,
      workerAvatar: activeWorker.avatarUrl,
      workerProfession: activeWorker.profession,
      trustScore: activeWorker.trustMetrics.overallScore,
      quotedPrice: Number(quotePrice),
      estimatedArrivalMinutes: Number(quoteEta),
      message: quoteMessage || `I am ready with certified tools in ${location}. Can reach in ${quoteEta} mins.`
    });

    setActiveQuoteNeedId(null);
    setQuoteMessage('');
  };

  const filteredNeeds = postedNeeds.filter(need => 
    selectedCategory === 'all' || need.categorySlug === selectedCategory
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-32">
      
      {/* Top Banner: Reverse Marketplace & Fair Negotiation */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-floating relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-trust-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-trust-400 font-extrabold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Two-Way Reverse Marketplace (Tier-2/3 Access)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Post a Need & Receive Real-Time Quotes
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Don't get locked into rigid metro pricing. Post your exact problem, set your expected budget range, and let verified nearby pros offer competitive bids. Compare side-by-side and choose.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
            {currentRole === 'customer' && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-5 py-3 rounded-2xl bg-trust-500 hover:bg-trust-400 text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4 text-slate-950" />
                <span>Post Your Work Requirement</span>
              </button>
            )}

            <button
              onClick={() => navigateTo('services')}
              className="px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 transition-colors text-center"
            >
              Direct Search Instead →
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pillars Info Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-white p-4 rounded-2xl border border-warm-300 shadow-sm flex items-start space-x-3">
          <div className="w-8 h-8 rounded-xl bg-trust-50 text-trust-700 flex items-center justify-center font-bold flex-shrink-0">
            1
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900">Fair Price Engine</h4>
            <p className="text-slate-500 text-[11px] mt-0.5">Never a forced price. Multiple pros bid with transparent rates.</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-warm-300 shadow-sm flex items-start space-x-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0">
            2
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900">Dual-Sided Verification</h4>
            <p className="text-slate-500 text-[11px] mt-0.5">Both citizens & workers Aadhaar-screened before job confirmation.</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-warm-300 shadow-sm flex items-start space-x-3">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">
            3
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900">3-Strike Enforcement</h4>
            <p className="text-slate-500 text-[11px] mt-0.5">Zero tolerance for bad actors. Automatic visibility penalties.</p>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { slug: 'all', label: 'All Requirements' },
          { slug: 'electrician', label: '⚡ Electrical & Power' },
          { slug: 'plumber', label: '💧 Plumbing & Sanitary' },
          { slug: 'carpenter', label: '🪚 Woodwork & Carpentry' },
          { slug: 'appliance', label: '❄️ AC & Appliance' }
        ].map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
              selectedCategory === cat.slug
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-warm-300 hover:border-slate-400'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Posted Needs Live Feed */}
      <div className="space-y-6">
        {filteredNeeds.map((need) => (
          <div 
            key={need.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-warm-300 shadow-card hover:border-slate-400 transition-all space-y-5"
          >
            {/* Need Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-warm-100 text-slate-900 flex items-center justify-center font-black text-sm border border-warm-300">
                  {need.customerName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-slate-950 text-sm">{need.customerName}</span>
                    {need.customerAadhaarVerified && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-extrabold border border-emerald-200 flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Aadhaar Verified Resident</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{need.location}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{need.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Budget Badge */}
              <div className="flex items-center space-x-3 self-start sm:self-auto">
                <div className="bg-warm-100 px-3.5 py-1.5 rounded-xl border border-warm-200 text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Budget Expectation</span>
                  <span className="text-sm font-black text-slate-950">
                    {formatINR(need.budgetMin)} - {formatINR(need.budgetMax)}
                  </span>
                </div>

                <span className={`px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase ${
                  need.urgency === 'immediate'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {need.urgency === 'immediate' ? 'Immediate Urgent' : 'Today Flexible'}
                </span>
              </div>
            </div>

            {/* Need Problem Title & Description */}
            <div className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-black text-slate-950">{need.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {need.description}
              </p>
            </div>

            {/* Bids & Competitive Quotes Rail */}
            <div className="pt-4 border-t border-warm-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center space-x-1.5">
                  <DollarSign className="w-4 h-4 text-trust-600" />
                  <span>Submitted Verified Quotes ({need.bids.length})</span>
                </span>

                {/* If Worker, provide button to send custom bid */}
                {currentRole === 'worker' && need.status === 'open' && (
                  <button
                    onClick={() => {
                      setActiveQuoteNeedId(need.id);
                      setQuotePrice(need.budgetMin);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold transition-colors flex items-center space-x-1"
                  >
                    <Send className="w-3 h-3 text-trust-400" />
                    <span>Send Custom Quote</span>
                  </button>
                )}
              </div>

              {need.bids.length === 0 ? (
                <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 text-center text-xs text-slate-500 font-medium">
                  Awaiting quotes from nearby active pros. Broadcasting across {need.location}...
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {need.bids.map((bid) => (
                    <div 
                      key={bid.id}
                      className="p-4 rounded-2xl bg-warm-50/80 border border-warm-200 flex flex-col justify-between space-y-3 hover:border-slate-400 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center space-x-2.5">
                          <img src={bid.workerAvatar} alt={bid.workerName} className="w-10 h-10 rounded-xl object-cover" />
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="font-extrabold text-slate-900 text-xs">{bid.workerName}</span>
                              <ShieldCheck className="w-3.5 h-3.5 text-trust-600" />
                            </div>
                            <span className="text-[10px] text-slate-500">{bid.workerProfession}</span>
                            <div className="text-[10px] font-bold text-trust-700">{bid.trustScore}/100 Trust Score</div>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-base font-black text-slate-950">{formatINR(bid.quotedPrice)}</span>
                          <span className="text-[10px] text-slate-400 font-bold block">~{bid.estimatedArrivalMinutes}m ETA</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 italic bg-white p-2 rounded-xl border border-warm-200/60 leading-relaxed">
                        "{bid.message}"
                      </p>

                      {/* Accept Bid Button for Customer */}
                      {currentRole === 'customer' && need.status === 'open' && (
                        <button
                          onClick={() => acceptNeedBid(need.id, bid.id)}
                          className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-sm"
                        >
                          <span>Accept Quote & Lock in Escrow</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* MODAL: Create New Work Need */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-floating border border-slate-100 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-warm-200">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                  <Plus className="w-4 h-4 text-trust-400" />
                </div>
                <h3 className="font-extrabold text-slate-950 text-base">Broadcast Work Need</h3>
              </div>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold text-sm">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNeedSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Service Category</label>
                <select
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  className="w-full bg-warm-100 border border-warm-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                >
                  <option value="electrician">Electrical & Power</option>
                  <option value="plumber">Plumbing & Water Systems</option>
                  <option value="carpenter">Woodwork & Carpentry</option>
                  <option value="appliance">AC & Appliance Repair</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Issue Summary Title</label>
                <input
                  type="text"
                  placeholder="e.g. Master bedroom MCB spark & AC tripped"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-warm-100 border border-warm-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Detailed Work Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe parts, exact symptoms, and timing requirements..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full bg-warm-100 border border-warm-300 rounded-xl p-3 text-xs font-semibold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Min Budget (₹)</label>
                  <input
                    type="number"
                    value={budgetMin}
                    onChange={(e) => setBudgetMin(Number(e.target.value))}
                    className="w-full bg-warm-100 border border-warm-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-950"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Max Budget (₹)</label>
                  <input
                    type="number"
                    value={budgetMax}
                    onChange={(e) => setBudgetMax(Number(e.target.value))}
                    className="w-full bg-warm-100 border border-warm-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-950"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Area / Neighborhood</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-warm-100 border border-warm-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Urgency</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full bg-warm-100 border border-warm-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                  >
                    <option value="immediate">Immediate (Within 45m)</option>
                    <option value="today">Today (Flexible)</option>
                    <option value="flexible">Planned / Weekend</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <span>Broadcast to Verified Pros in Area</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Worker Submit Custom Quote */}
      {activeQuoteNeedId && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-floating border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-warm-200">
              <h3 className="font-extrabold text-slate-950 text-sm">Submit Custom Quote</h3>
              <button onClick={() => setActiveQuoteNeedId(null)} className="text-slate-400 font-bold">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Your Quoted Price (₹)</label>
                <input
                  type="number"
                  value={quotePrice}
                  onChange={(e) => setQuotePrice(Number(e.target.value))}
                  className="w-full bg-warm-100 border border-warm-300 rounded-xl px-3 py-2 text-sm font-black text-slate-950"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Estimated Arrival (Mins)</label>
                <input
                  type="number"
                  value={quoteEta}
                  onChange={(e) => setQuoteEta(Number(e.target.value))}
                  className="w-full bg-warm-100 border border-warm-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Note to Client (Tools & Readiness)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Equipped with genuine parts and ready in service van..."
                  value={quoteMessage}
                  onChange={(e) => setQuoteMessage(e.target.value)}
                  className="w-full bg-warm-100 border border-warm-300 rounded-xl p-2.5 text-xs font-medium text-slate-900"
                />
              </div>

              <button
                onClick={() => handleWorkerQuoteSubmit(activeQuoteNeedId)}
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <span>Send Formal Quote</span>
                <Send className="w-3.5 h-3.5 text-trust-400" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
