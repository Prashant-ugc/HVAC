import React, { useState } from 'react';
import {
  ThermometerSun,
  Volume2,
  Droplets,
  RotateCcw,
  AlertTriangle,
  Clock,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Calendar,
} from 'lucide-react';
import { SYMPTOMS_DATA, SymptomDiagnosis } from '../utils/hvacCalculations.ts';

interface TroubleshooterSectionProps {
  onBookSymptom: (symptom: SymptomDiagnosis) => void;
}

export const TroubleshooterSection: React.FC<TroubleshooterSectionProps> = ({
  onBookSymptom,
}) => {
  const [activeSymptomId, setActiveSymptomId] = useState<string>('warm_air');
  const activeSymptom = SYMPTOMS_DATA[activeSymptomId] || SYMPTOMS_DATA.warm_air;

  const symptomList = [
    {
      id: 'warm_air',
      label: 'Blowing Warm Air',
      icon: ThermometerSun,
      quickDesc: 'Fan is running but house won’t cool below 78°',
      color: 'text-amber-500',
      activeBorder: 'border-amber-500 bg-amber-50/60',
    },
    {
      id: 'buzzing_noise',
      label: 'Strange Buzzing or Grinding Noise',
      icon: Volume2,
      quickDesc: 'Rattling, metallic scraping, or loud electrical buzz',
      color: 'text-red-500',
      activeBorder: 'border-red-500 bg-red-50/60',
    },
    {
      id: 'water_leaking',
      label: 'Water Leaking Around Unit',
      icon: Droplets,
      quickDesc: 'Puddle in drain pan, closet floor, or attic ceiling',
      color: 'text-sky-500',
      activeBorder: 'border-sky-500 bg-sky-50/60',
    },
    {
      id: 'short_cycling',
      label: "System Won't Turn On / Short Cycling",
      icon: RotateCcw,
      quickDesc: 'Turns on for 60 seconds then cuts off repeatedly',
      color: 'text-purple-500',
      activeBorder: 'border-purple-500 bg-purple-50/60',
    },
  ];

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-100 text-red-800 border border-red-300">
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            CRITICAL RISK (Immediate Shut-Off Advised)
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            HIGH RISK (Structural / Motor Danger)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-sky-100 text-sky-900 border border-sky-300">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            MODERATE RISK (Efficiency & Wear Loss)
          </span>
        );
    }
  };

  return (
    <section id="troubleshooter" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            Interactive HVAC Diagnostic System
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Not Sure What’s Wrong? <br className="hidden sm:inline" />
            Click Your Symptom Below for an Instant Diagnosis
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Our master licensed technicians prepared this instant diagnosis engine to help DFW homeowners understand likely causes, repair windows, and urgent hazards before dispatch.
          </p>
        </div>

        {/* 4 Clickable Symptom Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {symptomList.map((item) => {
            const Icon = item.icon;
            const isSelected = activeSymptomId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSymptomId(item.id)}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? `${item.activeBorder} shadow-md ring-2 ring-sky-500/30 scale-[1.02]`
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-white shadow-xs' : 'bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  {isSelected && (
                    <span className="text-xs font-bold text-sky-700 bg-white px-2.5 py-0.5 rounded-full border border-sky-200">
                      Active
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                  {item.label}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {item.quickDesc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Diagnosis Panel */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Diagnosis details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                {getRiskBadge(activeSymptom.riskLevel)}
                <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  Estimated In-Home Fix Time: <strong className="text-white">{activeSymptom.estimatedRepairTime}</strong>
                </span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  Diagnosis for: {activeSymptom.title}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-heading">
                  Likely Cause: {activeSymptom.likelyCause}
                </h3>
              </div>

              <div className="space-y-3 bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 sm:p-5">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Potential Consequence If Ignored:
                  </h4>
                  <p className="text-sm text-rose-300 font-medium">
                    ⚠️ {activeSymptom.potentialConsequences}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-700/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Certified Technician Solution:
                  </h4>
                  <p className="text-sm text-slate-200">
                    {activeSymptom.recommendedSolution}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  $49 Diagnostic Fee 100% Waived
                </span>
                <span>with any agreed repair. Upfront flat-rate pricing guaranteed.</span>
              </div>
            </div>

            {/* Right 5 cols: Booking Action Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-800 to-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-7 text-center space-y-4">
              <div className="inline-block bg-sky-500/20 text-sky-300 text-xs font-bold px-3 py-1 rounded-full border border-sky-400/30">
                Same-Day Available Slot
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-400 block font-medium">
                  Typical Repair Price Range:
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white font-heading tabular-nums">
                  {activeSymptom.estimatedPriceRange}
                </div>
                <span className="text-[11px] text-slate-400 block">
                  Includes full safety inspection & digital refrigerant check
                </span>
              </div>

              <div className="pt-2 space-y-2.5">
                <button
                  type="button"
                  onClick={() => onBookSymptom(activeSymptom)}
                  className="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-black text-sm shadow-lg shadow-sky-600/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book $49 Diagnostic Visit to Fix This</span>
                </button>

                <a
                  href="tel:2145550199"
                  className="block w-full py-2.5 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                >
                  Or Call Emergency Line: (214) 555-0199
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
