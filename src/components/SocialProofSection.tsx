import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  MapPin,
  TrendingDown,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { calculateEnergySavings } from '../utils/hvacCalculations.ts';

export const SocialProofSection: React.FC = () => {
  // Energy Savings Calculator State
  const [currentSeer, setCurrentSeer] = useState<number>(10);
  const [newSeer, setNewSeer] = useState<number>(18);
  const [electricBill, setElectricBill] = useState<number>(340);

  const savings = calculateEnergySavings(currentSeer, newSeer, electricBill);

  const reviews = [
    {
      name: 'Marcus & Elena Vance',
      neighborhood: 'Highland Park, Dallas',
      verified: true,
      service: 'Emergency AC Capacitor Replacement',
      date: '2 weeks ago',
      rating: 5,
      content:
        '“Our outdoor AC unit completely froze up on a brutal 104° Saturday during my daughter’s birthday party. ApexAir had technician Carlos at our door in exactly 38 minutes! He put on clean boot covers before stepping inside, diagnosed a blown dual-run capacitor in 10 minutes, had the exact OEM part in his truck, and had ice-cold 68° air flowing before dinner. Best HVAC company in Dallas hands down.”',
    },
    {
      name: 'Sarah & David Jenkins',
      neighborhood: 'West Plano, TX',
      verified: true,
      service: 'Complete 18-SEER2 Heat Pump Replacement',
      date: 'Last month',
      rating: 5,
      content:
        '“We replaced our 16-year-old contractor-grade system that sounded like a freight train. ApexAir offered us the 0% financing for 36 months which made the decision painless. Our first July electric bill arrived yesterday: down by $172 compared to last year! The installation crew was so tidy they vacuumed our attic access floor before leaving.”',
    },
    {
      name: 'Dr. Robert Nguyen',
      neighborhood: 'Lakewood / East Dallas',
      verified: true,
      service: 'Furnace & Heating Safety Overhaul',
      date: '3 weeks ago',
      rating: 5,
      content:
        '“What I appreciate most is their Mom Test policy and upfront flat-rate pricing. Another company quoted me $1,800 claiming I needed a brand new control board. ApexAir tested the circuit and found only a loose pressure switch relay. Fixed it for $189. Honest, ethical craftsmanship that is rare in home services today.”',
    },
  ];

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            Proven DFW Homeowner Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Trusted by 4,800+ North Texas Families <br className="hidden sm:inline" />
            with a 4.9★ Average Rating
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Read real, unfiltered reviews from homeowners across Dallas, Plano, Frisco, Lakewood, and Highland Park who count on our same-day response.
          </p>
        </div>

        {/* 3 Detailed Homeowner Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div>
                {/* Rating stars & Google Icon */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(r.rating)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Google Review</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 italic">
                  {r.content}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{r.name}</span>
                      {r.verified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" aria-label="Verified Customer" />
                      )}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{r.neighborhood}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {r.date}
                  </span>
                </div>
                <div className="mt-2 text-[10px] font-semibold text-sky-700 bg-sky-50 py-1 px-2 rounded">
                  Service: {r.service}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clean Comparison Metrics: SEER2 Energy Bill Savings Simulator */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 6 cols: Sliders */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>SEER2 Energy Efficiency Calculator</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  See How Much a Modern SEER2 Unit Saves on Texas Electric Bills
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2">
                  Older 10-SEER systems waste nearly 45% of consumed power as excess heat. Adjust the sliders below to calculate your family’s real monthly and 10-year cash savings.
                </p>
              </div>

              <div className="space-y-4">
                {/* Current system SEER */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Your Current System Rating:</span>
                    <span className="text-amber-400 tabular-nums">{currentSeer} SEER (Older Unit)</span>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={14}
                    step={1}
                    value={currentSeer}
                    onChange={(e) => setCurrentSeer(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>8 SEER (15+ yrs old)</span>
                    <span>10 SEER (Standard 2005)</span>
                    <span>14 SEER (Older code)</span>
                  </div>
                </div>

                {/* New Modern SEER2 */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>New Upgraded System Rating:</span>
                    <span className="text-sky-400 tabular-nums">{newSeer} SEER2 (Inverter-Driven)</span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={22}
                    step={1}
                    value={newSeer}
                    onChange={(e) => setNewSeer(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>15 SEER2 (Standard New)</span>
                    <span>18 SEER2 (Ultra High-Efficiency)</span>
                    <span>22 SEER2 (Variable Speed)</span>
                  </div>
                </div>

                {/* Monthly Electric Bill */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Average Peak Summer Electric Bill:</span>
                    <span className="text-emerald-400 tabular-nums">${electricBill}/month</span>
                  </div>
                  <input
                    type="range"
                    min={180}
                    max={650}
                    step={10}
                    value={electricBill}
                    onChange={(e) => setElectricBill(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                </div>
              </div>
            </div>

            {/* Right 6 cols: Projected Financial Metric Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 text-center">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                  Cooling Efficiency Gain
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-sky-400 my-1 font-heading tabular-nums">
                  +{savings.efficiencyGainPercent}%
                </div>
                <span className="text-[11px] text-slate-400">
                  Less kilowatt-hour grid draw
                </span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 text-center">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                  Estimated Monthly Savings
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 my-1 font-heading tabular-nums">
                  ${savings.monthlySavings}
                  <span className="text-sm text-slate-400 font-normal">/mo</span>
                </div>
                <span className="text-[11px] text-slate-400">
                  During Texas cooling months
                </span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 text-center">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                  Annual Electric Savings
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 my-1 font-heading tabular-nums">
                  ${savings.annualSavings.toLocaleString()}
                </div>
                <span className="text-[11px] text-slate-400">
                  Put back in your pocket each year
                </span>
              </div>

              <div className="bg-gradient-to-br from-emerald-950/70 to-slate-800 border border-emerald-800/50 rounded-2xl p-5 text-center">
                <span className="text-xs uppercase tracking-wider text-emerald-300 font-bold block">
                  10-Year Cumulative Savings
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 my-1 font-heading tabular-nums">
                  ${savings.tenYearSavings.toLocaleString()}
                </div>
                <span className="text-[11px] text-emerald-300">
                  Often pays for the entire new system!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
