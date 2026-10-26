import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, FileCheck, CheckCircle2, Award, Upload, ArrowLeft } from 'lucide-react';

export const WorkerVerificationPage: React.FC = () => {
  const { activeWorker, navigateTo } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      <button
        onClick={() => navigateTo('worker-dashboard')}
        className="inline-flex items-center gap-1.5 text-xs font-bold font-label text-slate-600 hover:text-primary transition-colors mb-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </button>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
          KYC & Accreditation Documents
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant font-label mt-0.5">
          Civic Trust Protocol requires government ID, trade diploma, and police station clearance verification
        </p>
      </div>

      <div className="space-y-4">
        {/* Document 1: Aadhaar */}
        <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-on-surface">Government Aadhaar ID</h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold font-label px-2 py-0.2 rounded">
                  Verified
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Number: {activeWorker.kyc.aadhaarNumberMasked} (Biometrically authenticated via UIDAI)
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 font-label flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Verified by Civic Auditor</span>
          </span>
        </div>

        {/* Document 2: Trade Diploma */}
        <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-on-surface">{activeWorker.kyc.tradeCertificateName}</h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold font-label px-2 py-0.2 rounded">
                  Verified
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Issuer: {activeWorker.kyc.tradeCertificateIssuer}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 font-label flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Certified Master Pro</span>
          </span>
        </div>

        {/* Document 3: Police Clearance */}
        <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-on-surface">Local Police Verification Certificate</h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold font-label px-2 py-0.2 rounded">
                  Verified
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Reference: {activeWorker.kyc.policeClearanceNumber} • Cleared on {activeWorker.kyc.policeClearanceDate}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 font-label flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Clean Background Record</span>
          </span>
        </div>

        {/* Document 4: Damage Insurance */}
        <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-on-surface">Public Liability Insurance</h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold font-label px-2 py-0.2 rounded">
                  Active
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Policy: {activeWorker.kyc.insurancePolicyNumber} ({activeWorker.kyc.insuranceCoverageAmount})
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 font-label flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Property & Client Insured</span>
          </span>
        </div>
      </div>
    </div>
  );
};
