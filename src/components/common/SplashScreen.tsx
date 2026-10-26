import React, { useEffect, useState } from 'react';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 200);
          return 100;
        }
        return prev + 25;
      });
    }, 180);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
      
      {/* Center Branding Animation */}
      <div className="text-center space-y-6 max-w-sm mx-auto">
        
        <div className="relative w-20 h-20 rounded-3xl bg-slate-900 border-2 border-trust-500 flex items-center justify-center mx-auto shadow-floating animate-bounce duration-1000">
          <ShieldCheck className="w-10 h-10 text-trust-400" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-trust-500 rounded-full animate-ping" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Civic<span className="text-trust-500">Serve</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium tracking-wide">
            Reliable Service Workers & Civic Trust Protocol
          </p>
        </div>

        {/* Loading Progress Bar */}
        <div className="space-y-2 pt-4">
          <div className="w-48 h-1.5 bg-slate-800 rounded-full mx-auto overflow-hidden">
            <div
              className="h-full bg-trust-500 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-400 font-semibold">
            <span>Loading Verified Registry</span>
            <span className="text-trust-400 font-bold">{progress}%</span>
          </div>
        </div>

        {/* Key Pillars Subtext */}
        <div className="pt-8 grid grid-cols-2 gap-2 text-[10px] text-slate-400 font-semibold border-t border-slate-900">
          <div className="flex items-center space-x-1 justify-center">
            <CheckCircle2 className="w-3 h-3 text-trust-500" />
            <span>Aadhaar Verified</span>
          </div>
          <div className="flex items-center space-x-1 justify-center">
            <CheckCircle2 className="w-3 h-3 text-trust-500" />
            <span>Escrow Protected</span>
          </div>
        </div>

      </div>

    </div>
  );
};
