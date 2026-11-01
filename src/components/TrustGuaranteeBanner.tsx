import React from 'react';
import {
  ShieldCheck,
  Sparkles,
  DollarSign,
  Award,
  Heart,
  CheckCircle2,
  Footprints,
  UserCheck,
} from 'lucide-react';

export const TrustGuaranteeBanner: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Mom Test Badge & Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30 mb-3">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>The Gold Standard: “The Mom Test”</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Homeowner Safety & 100% Ironclad Trust Guarantees
          </h2>
          <p className="mt-3 text-base text-slate-300">
            We know inviting a service technician into your home requires complete trust. That’s why we hold our team to the highest ethical and craftsmanship standards in North Texas.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1: Background Checked */}
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 relative hover:border-sky-500/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400 mb-4 border border-sky-500/30">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Background-Checked & Drug-Tested
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every technician passes multi-state criminal background checks and recurring drug screenings. “The Mom Test”: We only hire techs we would gladly send into our own mothers’ homes.
            </p>
          </div>

          {/* Pillar 2: Spotless Home Guarantee */}
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 relative hover:border-emerald-500/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/30">
              <Footprints className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Shoe Covers & Spotless Guarantee
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our technicians slip on fresh surgical-grade shoe boot covers before crossing your doorway and lay heavy-duty drop cloths over your floors. If we leave a speck of dust, your service is free.
            </p>
          </div>

          {/* Pillar 3: 100% Upfront Pricing */}
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 relative hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-4 border border-amber-500/30">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              100% Upfront Flat-Rate Pricing
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              You receive a written, firm quotation before any work commences. No open-ended hourly billing, no surprise trip fees, and never a penny more than what was agreed upon.
            </p>
          </div>

          {/* Pillar 4: 10-Year Warranty */}
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 relative hover:border-indigo-500/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 border border-indigo-500/30">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              10-Year Parts & Labor Warranty
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We stand behind every repair and complete replacement. Enjoy industry-leading manufacturer warranties backed by our 100% no-lemon replacement commitment.
            </p>
          </div>
        </div>

        {/* Bottom Trust Quote Strip */}
        <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-sky-950/60 via-slate-800 to-indigo-950/60 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-sky-400 shrink-0" />
            <div>
              <span className="font-bold text-white text-sm block">
                Texas Dept. of Licensing & Regulation Verified
              </span>
              <span className="text-xs text-slate-400">
                TACLA #88392C · Certified EPA Universal Refrigerant Handling · Fully Bonded
              </span>
            </div>
          </div>
          <div className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 py-2 px-4 rounded-xl">
            ✓ 0 Complaints on File with Texas BBB
          </div>
        </div>
      </div>
    </section>
  );
};
