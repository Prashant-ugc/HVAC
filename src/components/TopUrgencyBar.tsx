import React from 'react';
import { Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';

interface TopUrgencyBarProps {
  onBookClick: () => void;
}

export const TopUrgencyBar: React.FC<TopUrgencyBarProps> = ({ onBookClick }) => {
  return (
    <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Live status with pulsing indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-emerald-400">LIVE STATUS:</span>
          <span className="text-slate-200">
            2 Technicians Available in Dallas Right Now
          </span>
          <span className="hidden sm:inline text-slate-400">·</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-amber-400 inline" />
            Avg. Response Time: <strong className="text-white">42 Mins</strong>
          </span>
        </div>

        {/* Right: Quick trust markers & phone */}
        <div className="flex items-center gap-4 ml-auto text-slate-300">
          <div className="hidden md:flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>TACLA #88392C Licensed & Insured</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden lg:inline">DFW Metroplex:</span>
            <a
              href="tel:2145550199"
              className="font-bold text-white hover:text-sky-400 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-sky-400" />
              (214) 555-0199
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
