import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  ShieldCheck, 
  Users, 
  Wrench, 
  ShieldAlert, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  Sparkles,
  Phone,
  Mail,
  UserCheck,
  MapPin,
  Briefcase,
  Upload,
  FileText,
  AlertCircle,
  Clock,
  X,
  Camera,
  Image as ImageIcon
} from 'lucide-react';
import { LanguageSelector } from '../common/LanguageSelector';


interface AuthModalProps {
  isOpen: boolean;
  onSuccess: (role: UserRole) => void;
  canDismiss?: boolean;
}

export const AuthRoleModal: React.FC<AuthModalProps> = ({ isOpen, onSuccess, canDismiss = true }) => {
  const { setCurrentRole, loginUser, registerUser, setIsAuthModalOpen, t } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Login credentials state
  const [loginEmail, setLoginEmail] = useState('arjun@civicserve.in');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Register form fields state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regCity, setRegCity] = useState('Bengaluru');
  const [regArea, setRegArea] = useState('Indiranagar');
  const [regProfession, setRegProfession] = useState('Electrician');
  const [regExperienceYears, setRegExperienceYears] = useState('5');
  const [regAadhaarNumber, setRegAadhaarNumber] = useState('');

  // Upload Document states (Citizen: ID & Address Proof | Worker: ID, Address, Skill Proof & Face Photo)
  const [idProofFileName, setIdProofFileName] = useState<string>('');
  const [addressProofFileName, setAddressProofFileName] = useState<string>('');
  const [skillCertFileName, setSkillCertFileName] = useState<string>('');
  const [facePhotoPreview, setFacePhotoPreview] = useState<string | null>(null);
  const [facePhotoFileName, setFacePhotoFileName] = useState<string>('');

  // Verification Gate State for Worker (Admin Verification Pending Alert Modal)
  const [showPendingAdminApprovalModal, setShowPendingAdminApprovalModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  if (!isOpen) return null;

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'customer') {
      setLoginEmail('arjun@civicserve.in');
      setLoginPassword('password123');
    } else if (role === 'worker') {
      setLoginEmail('rajesh@civicserve.in');
      setLoginPassword('password123');
    } else if (role === 'admin') {
      setLoginEmail('admin@civicserve.in');
      setLoginPassword('password123');
    }
  };

  const handleFileUpload = (type: 'id' | 'address' | 'skill' | 'face', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'id') setIdProofFileName(file.name);
      if (type === 'address') setAddressProofFileName(file.name);
      if (type === 'skill') setSkillCertFileName(file.name);
      if (type === 'face') {
        setFacePhotoFileName(file.name);
        const reader = new FileReader();
        reader.onloadend = () => {
          setFacePhotoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (authMode === 'login') {
        await loginUser(loginEmail, loginPassword, selectedRole);
        setCurrentRole(selectedRole);
        onSuccess(selectedRole);
        setIsAuthModalOpen(false);
      } else {
        // Registration flow with Document Proofs and Face Photo
        await registerUser({
          name: regName || (selectedRole === 'customer' ? 'Citizen Client' : 'Verified Pro'),
          email: regEmail || `${Date.now()}@civicserve.in`,
          phone: regPhone || '+91 98801 22334',
          password: regPassword || 'password123',
          role: selectedRole,
          city: regCity,
          address: `${regArea}, ${regCity}`,
          profession: regProfession,
          experienceYears: Number(regExperienceYears) || 5,
          idProofType: 'Aadhaar Card',
          idProofUrl: idProofFileName || 'Aadhaar_Document_Uploaded.pdf',
          addressProofType: 'Electricity Bill',
          addressProofUrl: addressProofFileName || 'Utility_Bill_Uploaded.pdf',
          skillCertificateName: skillCertFileName || 'National Trade Certificate (DGT)',
          facePhotoUrl: facePhotoPreview || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80'
        });


        // If Worker registered: Gated with Admin Verification Pending Popup
        if (selectedRole === 'worker') {
          setShowPendingAdminApprovalModal(true);
          return;
        }

        // Customer & Admin proceed directly
        setCurrentRole(selectedRole);
        onSuccess(selectedRole);
        setIsAuthModalOpen(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render Admin Verification Pending Gated Modal for Worker
  if (showPendingAdminApprovalModal) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-floating border border-slate-100 text-center space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-amber-50 border-2 border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
            <Clock className="w-8 h-8 animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              Verification Pending
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950">
              Admin Verification in Progress
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Thank you, <strong>{regName || 'Professional'}</strong>! Your Aadhaar Identity, Address Proof, and Skill Certificate documents have been uploaded to the Civic Trust Protocol queue.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-warm-100/70 border border-warm-200 text-left space-y-2 text-xs font-medium text-slate-700">
            <div className="flex items-center space-x-2 text-slate-900 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Documents Received:</span>
            </div>
            <p className="text-[11px] text-slate-500 pl-6">
              • ID Proof: {idProofFileName || 'Aadhaar_Card_Front_Back.pdf'}<br />
              • Address Proof: {addressProofFileName || 'Utility_Bill_Proof.pdf'}<br />
              • Skill Proof: {skillCertFileName || `${regProfession}_National_Certificate.pdf`}
            </p>
            <div className="pt-2 border-t border-warm-200 text-[11px] text-amber-800 font-bold flex items-center space-x-1.5">
              <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Direct platform access is locked until an auditor reviews your KYC queue. We will notify you via SMS once approved.</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                setShowPendingAdminApprovalModal(false);
                setIsAuthModalOpen(false);
                setCurrentRole('customer');
                onSuccess('customer');
              }}
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-md"
            >
              Explore Platform as Citizen Client
            </button>

            <button
              onClick={() => {
                setShowPendingAdminApprovalModal(false);
                setCurrentRole('admin');
                onSuccess('admin');
                setIsAuthModalOpen(false);
              }}
              className="w-full py-2.5 rounded-2xl bg-warm-100 hover:bg-warm-200 text-slate-800 font-bold text-xs transition-colors"
            >
              Switch to Civic Auditor to Approve KYC Now →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-floating border border-slate-100 space-y-6 max-h-[95vh] overflow-y-auto relative">
        
        {/* Top Controls: Dismiss & Language Selector */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LanguageSelector compact={true} />
          </div>

          {canDismiss && (
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="p-2 rounded-full hover:bg-warm-100 text-slate-500 transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-7 h-7 text-trust-400" />
          </div>
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">
            Welcome to Civic<span className="text-trust-600">Serve</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {t.brandSub}
          </p>
        </div>

        {/* 1. AUTH MODE SEGMENTED TOGGLE (Sign In vs Register New User) */}
        <div className="grid grid-cols-2 p-1.5 bg-warm-100 rounded-2xl border border-warm-200 text-xs font-black">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              authMode === 'login'
                ? 'bg-slate-950 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Sign In (Existing)</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              authMode === 'register'
                ? 'bg-slate-950 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-trust-400" />
            <span>Register New Account</span>
          </button>
        </div>

        {/* 2. ROLE SELECTION CARDS */}
        <div className="space-y-2">
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
            {authMode === 'login' ? 'Select Role to Sign In' : 'Select Account Type to Register'}
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            
            {/* Customer Option */}
            <button
              type="button"
              onClick={() => handleRoleSelect('customer')}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
                selectedRole === 'customer'
                  ? 'border-slate-950 bg-slate-900 text-white ring-2 ring-slate-900/20 shadow-sm'
                  : 'border-warm-300 bg-warm-50/80 text-slate-700 hover:border-slate-400'
              }`}
            >
              <Users className={`w-5 h-5 ${selectedRole === 'customer' ? 'text-trust-400' : 'text-slate-600'}`} />
              <span className="text-xs font-bold leading-tight">{t.citizenClient}</span>
              <span className={`text-[9px] ${selectedRole === 'customer' ? 'text-slate-300' : 'text-slate-500'}`}>
                Book & Post Needs
              </span>
            </button>

            {/* Worker Option */}
            <button
              type="button"
              onClick={() => handleRoleSelect('worker')}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
                selectedRole === 'worker'
                  ? 'border-slate-950 bg-slate-900 text-white ring-2 ring-slate-900/20 shadow-sm'
                  : 'border-warm-300 bg-warm-50/80 text-slate-700 hover:border-slate-400'
              }`}
            >
              <Wrench className={`w-5 h-5 ${selectedRole === 'worker' ? 'text-trust-400' : 'text-slate-600'}`} />
              <span className="text-xs font-bold leading-tight">{t.verifiedPro}</span>
              <span className={`text-[9px] ${selectedRole === 'worker' ? 'text-slate-300' : 'text-slate-500'}`}>
                KYC & Jobs
              </span>
            </button>

            {/* Admin Option */}
            <button
              type="button"
              onClick={() => handleRoleSelect('admin')}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
                selectedRole === 'admin'
                  ? 'border-slate-950 bg-slate-900 text-white ring-2 ring-slate-900/20 shadow-sm'
                  : 'border-warm-300 bg-warm-50/80 text-slate-700 hover:border-slate-400'
              }`}
            >
              <ShieldAlert className={`w-5 h-5 ${selectedRole === 'admin' ? 'text-trust-400' : 'text-slate-600'}`} />
              <span className="text-xs font-bold leading-tight">{t.civicAuditor}</span>
              <span className={`text-[9px] ${selectedRole === 'admin' ? 'text-slate-300' : 'text-slate-500'}`}>
                Approve Pros
              </span>
            </button>

          </div>
        </div>

        {/* 3. FORM VIEW (LOGIN vs REGISTER) */}
        <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
          
          {authMode === 'login' ? (
            /* --- SIGN IN FORM --- */
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="w-full bg-warm-100 border border-warm-300 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="w-full bg-warm-100 border border-warm-300 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              {/* Service Provider Face Verification Photo on Sign In */}
              {selectedRole === 'worker' && (
                <div className="p-3.5 bg-warm-50 rounded-2xl border border-warm-300 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 font-extrabold text-slate-900">
                      <Camera className="w-3.5 h-3.5 text-trust-600" />
                      <span>Provider Live Face Photo Verification</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Biometric Liveness
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 pt-1">
                    {facePhotoPreview ? (
                      <div className="relative">
                        <img 
                          src={facePhotoPreview} 
                          alt="Face Photo" 
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-trust-600 shadow-sm"
                        />
                        <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                        </span>
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-warm-200 border-2 border-dashed border-warm-400 flex flex-col items-center justify-center text-slate-400">
                        <Camera className="w-5 h-5 text-slate-500" />
                      </div>
                    )}

                    <div className="flex-1 space-y-1">
                      <p className="text-[11px] text-slate-600 font-medium leading-tight">
                        {facePhotoFileName 
                          ? `Uploaded: ${facePhotoFileName}` 
                          : 'Capture / Upload current live face photo for session authentication'}
                      </p>
                      <label className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-[11px] cursor-pointer transition-colors shadow-sm">
                        <Upload className="w-3 h-3 text-trust-400" />
                        <span>{facePhotoPreview ? 'Retake / Change Photo' : 'Upload Face Photo'}</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          capture="user"
                          className="hidden" 
                          onChange={(e) => handleFileUpload('face', e)} 
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Demo Pre-fill note */}
              <div className="p-3 bg-warm-100 rounded-xl border border-warm-200 text-[11px] text-slate-600 flex items-center justify-between">
                <span className="font-medium">
                  Active Persona: <strong className="text-slate-900 capitalize">{selectedRole}</strong>
                </span>
                <span className="text-[10px] font-extrabold text-trust-700 bg-trust-50 px-2 py-0.5 rounded border border-trust-200">
                  Ready to Sign In
                </span>
              </div>
            </div>

          ) : (
            /* --- REGISTER NEW USER FORM WITH MANDATORY PROOF UPLOADS --- */
            <div className="space-y-3.5">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                  className="w-full bg-warm-100 border border-warm-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="ramesh@gmail.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                    className="w-full bg-warm-100 border border-warm-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Mobile Phone (OTP)</label>
                  <input
                    type="tel"
                    placeholder="+91 98800 12345"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    required
                    className="w-full bg-warm-100 border border-warm-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Area / Neighborhood</label>
                  <select
                    value={regArea}
                    onChange={(e) => setRegArea(e.target.value)}
                    className="w-full bg-warm-100 border border-warm-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="Indiranagar">Indiranagar, Bengaluru</option>
                    <option value="Koramangala">Koramangala, Bengaluru</option>
                    <option value="HSR Layout">HSR Layout, Bengaluru</option>
                    <option value="Whitefield">Whitefield, Bengaluru</option>
                    <option value="Malleshwaram">Malleshwaram, Bengaluru</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Create Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    className="w-full bg-warm-100 border border-warm-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              {/* Worker Specific Fields (Trade & Experience) */}
              {selectedRole === 'worker' && (
                <div className="p-3.5 bg-warm-50 rounded-2xl border border-warm-300 space-y-2.5">
                  <div className="flex items-center space-x-1.5 text-xs font-extrabold text-slate-900">
                    <Briefcase className="w-3.5 h-3.5 text-trust-600" />
                    <span>Technician Skill & Experience</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Primary Trade</label>
                      <select
                        value={regProfession}
                        onChange={(e) => setRegProfession(e.target.value)}
                        className="w-full bg-white border border-warm-300 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-900"
                      >
                        <option value="Electrician">Certified Electrician</option>
                        <option value="Plumber">Master Plumber</option>
                        <option value="HVAC Technician">AC & HVAC Specialist</option>
                        <option value="Carpenter">Precision Carpenter</option>
                        <option value="Appliance Specialist">Appliance Technician</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Experience</label>
                      <select
                        value={regExperienceYears}
                        onChange={(e) => setRegExperienceYears(e.target.value)}
                        className="w-full bg-white border border-warm-300 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-900"
                      >
                        <option value="2">2+ Years (Junior Pro)</option>
                        <option value="5">5+ Years (Certified)</option>
                        <option value="8">8+ Years (Master)</option>
                        <option value="12">12+ Years (Veteran)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Aadhaar / National ID Number</label>
                    <input
                      type="text"
                      placeholder="XXXX-XXXX-XXXX"
                      value={regAadhaarNumber}
                      onChange={(e) => setRegAadhaarNumber(e.target.value)}
                      className="w-full bg-white border border-warm-300 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-900"
                    />
                  </div>
                </div>
              )}

              {/* DOCUMENT PROOF UPLOADS (Citizen: ID + Address Proof | Worker: ID + Address + Skill Proof) */}
              <div className="p-3.5 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center space-x-1.5 text-xs font-black text-trust-400">
                  <Upload className="w-3.5 h-3.5" />
                  <span>
                    {selectedRole === 'customer' 
                      ? 'Citizen Verification Documents (Required)' 
                      : 'Verified Pro Onboarding Proofs (Required)'}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  
                  {/* 1. Identity Proof Upload */}
                  <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-200 block text-[11px]">1. Identity Proof (Aadhaar / Voter ID)</span>
                      <span className="text-[10px] text-slate-400">{idProofFileName || 'Not uploaded yet'}</span>
                    </div>
                    <label className="cursor-pointer px-2.5 py-1 bg-trust-600 hover:bg-trust-500 text-white rounded-lg font-bold text-[10px] transition-colors flex items-center space-x-1">
                      <span>{idProofFileName ? 'Change' : 'Upload'}</span>
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload('id', e)} />
                    </label>
                  </div>

                  {/* 2. Address Proof Upload */}
                  <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-200 block text-[11px]">2. Address Proof (Utility Bill / Rent Agreement)</span>
                      <span className="text-[10px] text-slate-400">{addressProofFileName || 'Not uploaded yet'}</span>
                    </div>
                    <label className="cursor-pointer px-2.5 py-1 bg-trust-600 hover:bg-trust-500 text-white rounded-lg font-bold text-[10px] transition-colors flex items-center space-x-1">
                      <span>{addressProofFileName ? 'Change' : 'Upload'}</span>
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload('address', e)} />
                    </label>
                  </div>

                  {/* 3. Skill / Training Certificate (Worker Only) */}
                  {selectedRole === 'worker' && (
                    <>
                      <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-200 block text-[11px]">3. Skill / Trade Training Certificate</span>
                          <span className="text-[10px] text-slate-400">{skillCertFileName || 'ITI / Skill Council / Govt Cert'}</span>
                        </div>
                        <label className="cursor-pointer px-2.5 py-1 bg-trust-600 hover:bg-trust-500 text-white rounded-lg font-bold text-[10px] transition-colors flex items-center space-x-1">
                          <span>{skillCertFileName ? 'Change' : 'Upload'}</span>
                          <input type="file" className="hidden" onChange={(e) => handleFileUpload('skill', e)} />
                        </label>
                      </div>

                      {/* 4. Live Face Photo / Selfie */}
                      <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          {facePhotoPreview ? (
                            <img src={facePhotoPreview} alt="Worker Face" className="w-8 h-8 rounded-lg object-cover border border-trust-400" />
                          ) : (
                            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-trust-400">
                              <Camera className="w-4 h-4" />
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-slate-200 block text-[11px]">4. Live Face Photo / Biometric Profile</span>
                            <span className="text-[10px] text-slate-400">{facePhotoFileName || 'Clear front-facing selfie'}</span>
                          </div>
                        </div>
                        <label className="cursor-pointer px-2.5 py-1 bg-trust-600 hover:bg-trust-500 text-white rounded-lg font-bold text-[10px] transition-colors flex items-center space-x-1">
                          <span>{facePhotoFileName ? 'Change' : 'Upload Photo'}</span>
                          <input type="file" accept="image/*" capture="user" className="hidden" onChange={(e) => handleFileUpload('face', e)} />
                        </label>
                      </div>
                    </>
                  )}


                </div>
              </div>

            </div>
          )}

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-extrabold text-xs transition-all shadow-md flex items-center justify-center space-x-2 mt-2"
          >
            {isSubmitting ? (
              <span>Processing Onboarding Documents...</span>
            ) : (
              <>
                <span>
                  {authMode === 'login'
                    ? `Sign In as ${selectedRole === 'customer' ? 'Citizen Client' : selectedRole === 'worker' ? 'Verified Pro' : 'Civic Auditor'}`
                    : `Submit Documents & Register as ${selectedRole === 'customer' ? 'Citizen Client' : 'Verified Pro'}`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Bottom Switch Link */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-xs font-bold text-trust-700 hover:underline"
            >
              {authMode === 'login'
                ? "Don't have an account? Register with Identity Proofs"
                : 'Already registered? Click here to Sign In'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
