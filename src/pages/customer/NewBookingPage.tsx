import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  Info,
  Upload,
  FileText,
  AlertCircle,
  X,
  FileCheck
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';

interface UploadedDoc {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'Required' | 'Uploaded' | 'Under Review' | 'Verified';
}

export const NewBookingPage: React.FC = () => {
  const { workers, services, routeParams, createBooking, customerUser, navigateTo, t } = useApp();


  const worker = workers.find(w => w.id === routeParams.workerId) || workers[0];
  const service = services.find(s => s.slug === (routeParams.serviceSlug || worker.categorySlug)) || services[0];

  const rateCardItems = typeof service.rateCards === 'string' ? JSON.parse(service.rateCards) : service.rateCards;
  
  // Multi-step progressive flow: Step 1 (Service) -> Step 2 (Task Details) -> Step 3 (Document Upload) -> Step 4 (Schedule & Review)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  const [selectedRateCard, setSelectedRateCard] = useState<any>(rateCardItems[0] || {
    id: 'rc-1',
    name: 'Comprehensive Diagnostic & Service',
    basePrice: worker.startingPrice,
    estimatedDurationMinutes: 45
  });

  const [problemDescription, setProblemDescription] = useState('Need inspection and certified repair.');
  const [selectedDate, setSelectedDate] = useState('Today (Within 45 mins)');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('Immediate Express Slot');
  const [addressLine, setAddressLine] = useState(customerUser.address);
  const [landmark, setLandmark] = useState('Opposite Toit Brewpub, 100ft Road');

  // Document Upload States
  const [documents, setDocuments] = useState<UploadedDoc[]>([
    { id: 'doc-1', name: 'Address Proof / Society Pass (Optional)', type: 'PDF / Image', size: '—', status: 'Required' },
    { id: 'doc-2', name: 'Prior Repair / Equipment Photo', type: 'JPG / PNG', size: '—', status: 'Required' }
  ]);

  const [uploadLoading, setUploadLoading] = useState(false);

  const handleSimulateUpload = (docId: string) => {
    setUploadLoading(true);
    setTimeout(() => {
      setDocuments(prev => prev.map(d => {
        if (d.id === docId) {
          return { ...d, status: 'Uploaded', size: '1.4 MB' };
        }
        return d;
      }));
      setUploadLoading(false);
    }, 400);
  };

  const handleVerifyDocs = () => {
    setDocuments(prev => prev.map(d => ({ ...d, status: 'Verified' })));
  };

  const baseAmount = selectedRateCard.basePrice || worker.startingPrice;
  const civicGuaranteeFee = 29.0;
  const taxes = Math.round(baseAmount * 0.18);
  const totalAmount = baseAmount + civicGuaranteeFee + taxes;

  const handleConfirmBooking = () => {
    const bookingId = createBooking({
      serviceId: service.id,
      serviceName: service.name,
      serviceItemName: selectedRateCard.name,
      categorySlug: service.slug,
      workerId: worker.id,
      workerName: worker.name,
      workerProfession: worker.profession,
      workerAvatar: worker.avatarUrl,
      workerPhone: worker.phoneNumber,
      workerTrustScore: worker.trustMetrics.overallScore,
      customerId: customerUser.id,
      customerName: customerUser.name,
      customerPhone: customerUser.phone,
      scheduledDate: selectedDate,
      scheduledTimeSlot: selectedTimeSlot,
      problemDescription,
      address: {
        fullName: customerUser.name,
        phoneNumber: customerUser.phone,
        addressLine1: addressLine,
        landmark,
        city: 'Bengaluru',
        pincode: '560038'
      },
      baseAmount,
      civicGuaranteeFee,
      taxes,
      totalAmount
    });

    navigateTo('booking-detail', { bookingId });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24 font-sans">
      
      {/* Back Button */}
      <button
        onClick={() => navigateTo('worker-profile', { workerId: worker.id })}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to {worker.name.split(' ')[0]}'s profile</span>
      </button>

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          {t.requestVerifiedService}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          {t.bookingSubtitle}
        </p>
      </div>

      {/* Step Progression Bar */}
      <div className="grid grid-cols-4 gap-2 bg-white p-3 rounded-2xl border border-warm-300 shadow-sm text-xs">
        {[
          { step: 1, label: t.step1 },
          { step: 2, label: t.step2 },
          { step: 3, label: t.step3 },
          { step: 4, label: t.step4 }
        ].map(({ step, label }) => (
          <button
            key={step}
            onClick={() => setCurrentStep(step as any)}
            className={`py-2 px-3 rounded-xl font-extrabold text-center transition-all flex items-center justify-center space-x-2 ${
              currentStep === step
                ? 'bg-slate-900 text-white shadow-sm'
                : currentStep > step
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-warm-100 text-slate-400'
            }`}
          >
            <span>{label}</span>
            {currentStep > step && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 hidden sm:inline" />}
          </button>
        ))}
      </div>

      {/* Main 2-Column Checkout Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Progressive Form Step (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* STEP 1: SERVICE ITEM SELECTION */}
          {currentStep === 1 && (
            <div className="bg-white p-6 rounded-3xl border border-warm-300 shadow-card space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-950 text-base">{t.step1}</h3>
                <span className="text-xs text-slate-400 font-bold">1 / 4</span>
              </div>

              <div className="space-y-2.5">
                {rateCardItems.map((item: any) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedRateCard(item)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between ${
                      selectedRateCard.id === item.id
                        ? 'border-slate-900 bg-warm-100/70 ring-2 ring-slate-900/10'
                        : 'border-warm-200 bg-white hover:border-warm-300'
                    }`}
                  >
                    <div className="space-y-1 pr-4">
                      <div className="font-extrabold text-sm text-slate-900">{item.name}</div>
                      <div className="text-xs text-slate-500 leading-relaxed">{item.description}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-black text-base text-slate-950">
                        {formatINR(item.basePrice)}
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold">{item.estimatedDurationMinutes}m</div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all flex items-center justify-center space-x-2"
              >
                <span>{t.continueToDetails}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: PROBLEM DETAILS */}
          {currentStep === 2 && (
            <div className="bg-white p-6 rounded-3xl border border-warm-300 shadow-card space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-950 text-base">{t.step2}</h3>
                <span className="text-xs text-slate-400 font-bold">2 / 4</span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">
                  {t.describeIssue}
                </label>
                <textarea
                  rows={3}
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder={t.describePlaceholder}
                  className="w-full bg-warm-100/70 border border-warm-300 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-3 bg-warm-50 rounded-xl border border-warm-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Assigned Pro</span>
                  <span className="font-extrabold text-slate-900">{worker.name}</span>
                </div>
                <div className="p-3 bg-warm-50 rounded-xl border border-warm-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Selected Task</span>
                  <span className="font-extrabold text-slate-900 truncate block">{selectedRateCard.name}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-3 rounded-2xl bg-warm-200 hover:bg-warm-300 text-slate-800 font-bold text-xs"
                >
                  {t.back}
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all flex items-center justify-center space-x-2"
                >
                  <span>{t.continueToDocs}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DOCUMENT UPLOAD WITH 4 CLEAR STATES */}
          {currentStep === 3 && (
            <div className="bg-white p-6 rounded-3xl border border-warm-300 shadow-card space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-950 text-base">{t.docVerificationTitle}</h3>
                  <p className="text-xs text-slate-500">{t.docVerificationSub}</p>
                </div>
                <span className="text-xs text-slate-400 font-bold">3 / 4</span>
              </div>

              {/* Document List with Status Pills */}
              <div className="space-y-3">
                {documents.map((doc) => {
                  const isUploaded = doc.status === 'Uploaded' || doc.status === 'Verified';
                  const isVerified = doc.status === 'Verified';

                  return (
                    <div
                      key={doc.id}
                      className="p-4 rounded-2xl bg-warm-50 border border-warm-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isVerified ? 'bg-emerald-100 text-emerald-700' : isUploaded ? 'bg-blue-100 text-blue-700' : 'bg-warm-200 text-slate-500'
                        }`}>
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-extrabold text-slate-900 text-xs sm:text-sm block">{doc.name}</span>
                          <span className="text-[10px] text-slate-400 font-medium">Format: {doc.type} · Size: {doc.size}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          doc.status === 'Verified'
                            ? 'bg-emerald-100 text-emerald-800'
                            : doc.status === 'Uploaded'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-warm-200 text-slate-600'
                        }`}>
                          {doc.status}
                        </span>

                        {!isUploaded && (
                          <button
                            onClick={() => handleSimulateUpload(doc.id)}
                            disabled={uploadLoading}
                            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center space-x-1"
                          >
                            <Upload className="w-3 h-3" />
                            <span>{uploadLoading ? t.uploading : t.uploadBtn}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Status Helper */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>State: <strong>Required → Uploaded → Under Review → Verified</strong></span>
                </div>
                <button
                  onClick={handleVerifyDocs}
                  className="font-bold text-emerald-900 underline text-[10px]"
                >
                  {t.simulateVerification}
                </button>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-3 rounded-2xl bg-warm-200 hover:bg-warm-300 text-slate-800 font-bold text-xs"
                >
                  {t.back}
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex-1 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all flex items-center justify-center space-x-2"
                >
                  <span>{t.continueToSchedule}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SCHEDULE, ADDRESS & CONFIRMATION */}
          {currentStep === 4 && (
            <div className="bg-white p-6 rounded-3xl border border-warm-300 shadow-card space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-950 text-base">{t.step4}</h3>
                <span className="text-xs text-slate-400 font-bold">4 / 4</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase block mb-1">{t.dateLabel}</label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-warm-100 border border-warm-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="Today (Within 45 mins)">Today (Within 45 mins)</option>
                    <option value="Tomorrow (Morning)">Tomorrow (Morning)</option>
                    <option value="Tomorrow (Afternoon)">Tomorrow (Afternoon)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase block mb-1">{t.timeSlotLabel}</label>
                  <select
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="w-full bg-warm-100 border border-warm-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="Immediate Express Slot">Immediate Express Slot</option>
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase block">{t.addressLabel}</label>
                <input
                  type="text"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full bg-warm-100 border border-warm-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none"
                />
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder={t.landmarkPlaceholder}
                  className="w-full bg-warm-100 border border-warm-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-3 rounded-2xl bg-warm-200 hover:bg-warm-300 text-slate-800 font-bold text-xs"
                >
                  {t.back}
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <span>{t.confirmAndLockEscrow}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Sticky Summary & Escrow Card (5 cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          
          {/* Worker Info Card */}
          <div className="bg-white p-5 rounded-3xl border border-warm-300 shadow-card flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={worker.avatarUrl} alt={worker.name} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <span className="font-extrabold text-slate-900 text-sm block">{worker.name}</span>
                <span className="text-xs text-slate-500">{worker.profession}</span>
              </div>
            </div>
            <span className="text-xs font-black text-trust-700 bg-trust-50 px-2.5 py-1 rounded-lg border border-trust-200">
              {worker.trustMetrics.overallScore} {t.trustScore}
            </span>
          </div>

          {/* Pricing Ledger */}
          <div className="bg-white p-6 rounded-3xl border border-warm-300 shadow-card space-y-4">
            <h3 className="font-extrabold text-slate-950 text-sm">{t.escrowBreakdown}</h3>

            <div className="space-y-2.5 text-xs divide-y divide-warm-200">
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-600">{selectedRateCard.name}</span>
                <span className="font-bold text-slate-950">{formatINR(baseAmount)}</span>
              </div>

              <div className="flex items-center justify-between pt-2.5">
                <span className="text-slate-600">{t.civicGuaranteeFee}</span>
                <span className="font-bold text-slate-950">{formatINR(civicGuaranteeFee)}</span>
              </div>

              <div className="flex items-center justify-between pt-2.5">
                <span className="text-slate-600">{t.gstTax}</span>
                <span className="font-bold text-slate-950">{formatINR(taxes)}</span>
              </div>

              <div className="flex items-center justify-between pt-2.5 text-sm">
                <span className="font-black text-slate-950">{t.totalAmount}</span>
                <span className="font-black text-slate-950 text-base">{formatINR(totalAmount)}</span>
              </div>
            </div>

            {/* Escrow note */}
            <div className="p-3 bg-trust-50 rounded-2xl border border-trust-200 text-[11px] text-trust-800 space-y-1">
              <div className="flex items-center space-x-1.5 font-extrabold">
                <Lock className="w-3.5 h-3.5 text-trust-600" />
                <span>{t.escrowProtected100}</span>
              </div>
              <p className="leading-relaxed">
                {t.escrowGuaranteeDesc}
              </p>
            </div>
          </div>

        </div>


      </div>

    </div>
  );
};
