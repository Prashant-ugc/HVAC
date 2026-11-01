import React from 'react';
import {
  Check,
  X,
  Crown,
  Sparkles,
  Zap,
  ShieldCheck,
  Clock,
  ArrowRight,
  Flame,
  Snowflake,
} from 'lucide-react';

interface VipClubSectionProps {
  onJoinVipClick: () => void;
}

export const VipClubSection: React.FC<VipClubSectionProps> = ({ onJoinVipClick }) => {
  return (
    <section id="vip-club" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Crown className="w-3.5 h-3.5 text-amber-600" />
            VIP Peace of Mind Club
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Never Wait in Line During a 105° Heatwave. <br className="hidden sm:inline" />
            Join the <span className="text-sky-600">VIP Comfort Club</span> for $19/Month
          </h2>
          <p className="mt-3 text-base text-slate-600">
            HVAC systems that receive 2 annual precision tune-ups last an average of 6.2 years longer and consume 24% less electricity. Experience total VIP priority dispatch and $0 overtime fees.
          </p>
        </div>

        {/* Comparison Pricing Table: 2 Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Standard Non-Member */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">
                Standard Care
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Non-Member Homeowner
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Standard on-demand service when breakdowns occur.
              </p>

              <div className="mb-6 pb-6 border-b border-slate-200">
                <div className="text-3xl font-extrabold text-slate-900 font-heading">
                  $0<span className="text-sm font-semibold text-slate-500"> /month</span>
                </div>
                <span className="text-xs text-slate-500">Pay standard market rates per incident</span>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-3.5 text-xs text-slate-600 mb-8">
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>Standard dispatch queue (2 to 8-hour wait during peak summer)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>$89 to $149 per seasonal tune-up ($240+ value/year)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>Regular diagnostic fee applies ($89 weekend/after-hours upcharges)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>Full price on all parts and capacitor replacements</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Standard 1-year parts warranty</span>
                </li>
              </ul>
            </div>

            <a
              href="#calculator"
              className="w-full py-3 px-4 rounded-xl border border-slate-300 text-slate-700 hover:text-slate-900 font-bold text-xs text-center hover:bg-slate-100 transition-colors block"
            >
              Continue as Non-Member
            </a>
          </div>

          {/* Card 2: VIP Comfort Club Member (Highlighted) */}
          <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border-2 border-amber-400 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl shadow-slate-900/40">
            {/* Top pill badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-black px-4 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
              <span>Most Popular · DFW VIP Protection</span>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-1">
                Priority Maintenance Plan
              </div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <span>VIP Comfort Club Member</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Total worry-free protection, peak equipment lifespan & VIP queue jumping.
              </p>

              <div className="mb-6 pb-6 border-b border-slate-800">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-white font-heading tabular-nums">
                    $19
                  </span>
                  <span className="text-sm font-semibold text-slate-400">/month</span>
                  <span className="ml-2 text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold px-2 py-0.5 rounded">
                    Saves $480+ / yr
                  </span>
                </div>
                <span className="text-xs text-slate-400 block mt-1">
                  Cancel anytime · No long-term lock-in contract
                </span>
              </div>

              {/* VIP Perks */}
              <ul className="space-y-3.5 text-xs text-slate-200 mb-8">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">2 Free Precision Tune-Ups/Year:</strong> Spring AC Rejuvenation + Fall Furnace Safety Check ($298 value)
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Priority Front-of-the-Line Dispatch:</strong> Never wait during Dallas heatwaves; VIP dispatch guarantee within 2 hours
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">15% Off All Future Repairs & Diagnostics</strong> on any repair, capacitor, coil, or blower motor
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">$0 Overtime & Weekend Fees:</strong> Same flat rate 24/7/365, even on Christmas or July 4th
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Transferable to Future Buyer:</strong> Boosts real estate home value with certified maintenance records
                  </span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={onJoinVipClick}
              className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Crown className="w-4 h-4 text-slate-950" />
              <span>Join the VIP Club for $19/Mo</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
