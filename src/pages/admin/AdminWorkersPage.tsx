import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  FileCheck, 
  Check, 
  X, 
  ArrowLeft, 
  Search, 
  Award, 
  CheckCircle2, 
  AlertCircle,
  MapPin,
  Phone,
  Briefcase,
  UserCheck,
  UserX,
  FileText,
  Clock,
  Filter
} from 'lucide-react';
import { Worker } from '../../types';

export const AdminWorkersPage: React.FC = () => {
  const { workers, verifyWorkerKYC, setWorkerAvailability, navigateTo } = useApp();
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [search, setSearch] = useState('');
  const [filterCity, setFilterCity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredWorkers = workers.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.profession.toLowerCase().includes(search.toLowerCase()) ||
      w.neighborhood.toLowerCase().includes(search.toLowerCase());
    
    const matchesCity = filterCity === 'all' || w.city === filterCity;
    const isFullyVerified = w.kyc.aadhaarStatus === 'verified' && w.kyc.tradeCertificateStatus === 'verified';
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'verified' && isFullyVerified) ||
      (filterStatus === 'pending' && !isFullyVerified);

    return matchesSearch && matchesCity && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-32">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigateTo('admin-dashboard')}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Operations Console</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Service Provider Management & Manual KYC Verification
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Review service provider location, identity proof, address proof, trade skill certification, and toggle active status.
          </p>
        </div>

        <div className="flex items-center space-x-3 flex-wrap">
          <div className="w-full sm:w-64">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search provider, skill, area..."
              className="w-full bg-white border border-warm-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap bg-white p-4 rounded-2xl border border-warm-300 shadow-sm text-xs">
        <div className="flex items-center space-x-3 flex-wrap">
          <span className="font-bold text-slate-500 flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Roster:</span>
          </span>

          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="bg-warm-100 border border-warm-300 rounded-xl px-3 py-1.5 font-bold text-slate-900"
          >
            <option value="all">All Locations (Bengaluru, Mysuru, Hubli)</option>
            <option value="Bengaluru">Bengaluru Hubs</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-warm-100 border border-warm-300 rounded-xl px-3 py-1.5 font-bold text-slate-900"
          >
            <option value="all">All Verification Statuses</option>
            <option value="verified">Verified (Approved)</option>
            <option value="pending">Pending Audit</option>
          </select>
        </div>

        <span className="font-extrabold text-slate-900">
          Showing {filteredWorkers.length} Providers
        </span>
      </div>

      {/* Workers Management Table */}
      <div className="bg-white rounded-3xl border border-warm-300 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-warm-100/80 border-b border-warm-200 text-slate-500 font-extrabold uppercase text-[10px]">
              <tr>
                <th className="px-6 py-4">Service Provider</th>
                <th className="px-6 py-4">Location / Hub</th>
                <th className="px-6 py-4">Aadhaar ID Proof</th>
                <th className="px-6 py-4">Skill & Training Proof</th>
                <th className="px-6 py-4">Police Clearance</th>
                <th className="px-6 py-4">Trust Score</th>
                <th className="px-6 py-4 text-right">Manual Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-200">
              {filteredWorkers.map((w) => {
                const isFullyVerified = w.kyc.aadhaarStatus === 'verified' && w.kyc.tradeCertificateStatus === 'verified';

                return (
                  <tr key={w.id} className="hover:bg-warm-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img src={w.avatarUrl} alt={w.name} className="w-11 h-11 rounded-2xl object-cover border border-warm-300 shadow-sm" />
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="font-extrabold text-slate-950 block text-sm">{w.name}</span>
                            {isFullyVerified ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Clock className="w-3.5 h-3.5 text-amber-500" />
                            )}
                          </div>
                          <span className="text-slate-500 font-medium">{w.profession} • {w.experienceYears}y exp</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1 font-bold text-slate-800">
                        <MapPin className="w-3.5 h-3.5 text-trust-600 flex-shrink-0" />
                        <span>{w.neighborhood}, {w.city}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Radius: {w.serviceRadiusKm} km</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase inline-flex items-center space-x-1 ${
                        w.kyc.aadhaarStatus === 'verified' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        <span>{w.kyc.aadhaarStatus}</span>
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase inline-flex items-center space-x-1 ${
                        w.kyc.tradeCertificateStatus === 'verified' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        <span>{w.kyc.tradeCertificateStatus}</span>
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase inline-flex items-center space-x-1 ${
                        w.kyc.policeClearanceStatus === 'verified' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        <span>{w.kyc.policeClearanceStatus}</span>
                      </span>
                    </td>

                    <td className="px-6 py-4 font-black text-slate-950 text-sm">
                      <div className="flex items-center space-x-1">
                        <Award className="w-3.5 h-3.5 text-trust-600" />
                        <span>{w.trustMetrics.overallScore} / 100</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedWorker(w)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-sm"
                      >
                        Manage & Verify
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* KYC Detailed Management & Approval Modal */}
      {selectedWorker && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-floating border border-slate-100 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-warm-200">
              <div className="flex items-center space-x-3.5">
                <img src={selectedWorker.avatarUrl} alt={selectedWorker.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-900 shadow-md" />
                <div>
                  <h3 className="font-extrabold text-slate-950 text-lg">{selectedWorker.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{selectedWorker.profession} • {selectedWorker.neighborhood}, {selectedWorker.city}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedWorker(null)}
                className="p-2 rounded-full hover:bg-warm-100 text-slate-500 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Document Verification Controls */}
            <div className="space-y-4 text-xs">
              
              {/* 1. Aadhaar ID Proof */}
              <div className="p-4 bg-warm-50 rounded-2xl border border-warm-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-1.5">
                    <FileText className="w-4 h-4 text-trust-600" />
                    <span className="font-extrabold text-slate-900">1. National Identity Proof (Aadhaar)</span>
                  </div>
                  <span className="text-slate-500 font-mono text-[11px] block">{selectedWorker.kyc.aadhaarNumberMasked}</span>
                  <span className="text-[10px] font-bold text-slate-400">Current Status: {selectedWorker.kyc.aadhaarStatus.toUpperCase()}</span>
                </div>
                <div className="flex items-center space-x-1.5 self-end sm:self-auto">
                  <button
                    onClick={() => {
                      verifyWorkerKYC(selectedWorker.id, 'aadhaar', true);
                      setSelectedWorker(prev => prev ? { ...prev, kyc: { ...prev.kyc, aadhaarStatus: 'verified' } } : null);
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center space-x-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => {
                      verifyWorkerKYC(selectedWorker.id, 'aadhaar', false);
                      setSelectedWorker(prev => prev ? { ...prev, kyc: { ...prev.kyc, aadhaarStatus: 'rejected' } } : null);
                    }}
                    className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition-colors flex items-center space-x-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>

              {/* 2. Trade Skill Certificate */}
              <div className="p-4 bg-warm-50 rounded-2xl border border-warm-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-1.5">
                    <Briefcase className="w-4 h-4 text-trust-600" />
                    <span className="font-extrabold text-slate-900">2. Trade Skill & Training Certificate</span>
                  </div>
                  <span className="text-slate-600 font-medium text-[11px] block">{selectedWorker.kyc.tradeCertificateName} ({selectedWorker.kyc.tradeCertificateIssuer})</span>
                  <span className="text-[10px] font-bold text-slate-400">Current Status: {selectedWorker.kyc.tradeCertificateStatus.toUpperCase()}</span>
                </div>
                <div className="flex items-center space-x-1.5 self-end sm:self-auto">
                  <button
                    onClick={() => {
                      verifyWorkerKYC(selectedWorker.id, 'trade', true);
                      setSelectedWorker(prev => prev ? { ...prev, kyc: { ...prev.kyc, tradeCertificateStatus: 'verified' } } : null);
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center space-x-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => {
                      verifyWorkerKYC(selectedWorker.id, 'trade', false);
                      setSelectedWorker(prev => prev ? { ...prev, kyc: { ...prev.kyc, tradeCertificateStatus: 'rejected' } } : null);
                    }}
                    className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition-colors flex items-center space-x-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>

              {/* 3. Police Background Clearance */}
              <div className="p-4 bg-warm-50 rounded-2xl border border-warm-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-trust-600" />
                    <span className="font-extrabold text-slate-900">3. Police Clearance Certificate</span>
                  </div>
                  <span className="text-slate-500 font-mono text-[11px] block">Clearance #{selectedWorker.kyc.policeClearanceNumber}</span>
                  <span className="text-[10px] font-bold text-slate-400">Current Status: {selectedWorker.kyc.policeClearanceStatus.toUpperCase()}</span>
                </div>
                <div className="flex items-center space-x-1.5 self-end sm:self-auto">
                  <button
                    onClick={() => {
                      verifyWorkerKYC(selectedWorker.id, 'police', true);
                      setSelectedWorker(prev => prev ? { ...prev, kyc: { ...prev.kyc, policeClearanceStatus: 'verified' } } : null);
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center space-x-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => {
                      verifyWorkerKYC(selectedWorker.id, 'police', false);
                      setSelectedWorker(prev => prev ? { ...prev, kyc: { ...prev.kyc, policeClearanceStatus: 'rejected' } } : null);
                    }}
                    className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition-colors flex items-center space-x-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Save & Dismiss */}
            <button
              onClick={() => setSelectedWorker(null)}
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-md"
            >
              Close Verification Audit
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
