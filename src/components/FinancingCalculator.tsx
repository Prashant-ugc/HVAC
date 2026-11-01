import React, { useState } from 'react';
import {
  CreditCard,
  Percent,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  DollarSign,
  Calendar,
} from 'lucide-react';
import { calculateMonthlyFinancing } from '../utils/hvacCalculations.ts';

interface FinancingCalculatorProps {
  onCheckEligibility: (amount: number, term: number, monthly: number) => void;
}

export const FinancingCalculator: React.FC<FinancingCalculatorProps> = ({
  onCheckEligibility,
}) => {
  const [cost, setCost] = useState<number>(7500);
  const [term, setTerm] = useState<number>(36);
  const [zeroAprPromo, setZeroAprPromo] = useState<boolean>(true);

  const financing = calculateMonthlyFinancing(cost, term, zeroAprPromo);

  const terms = [
    { months: 36, label: '36 Months', highlight: '0% APR Promo Available' },
    { months: 60, label: '60 Months', highlight: 'Lowest Fixed Rate' },
    { months: 120, label: '120 Months', highlight: 'Ultra-Low Monthly' },
  ];

  return (
    <section id="financing" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
            Home Comfort Financing Made Simple
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Upgrade to a Brand New Energy-Efficient AC <br className="hidden sm:inline" />
            <span className="text-sky-600">Starting at $89/Month</span> (0% APR for 18 Months)
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Never let a sudden AC breakdown strain your savings. Replace your noisy, inefficient 10-SEER unit with an ultra-efficient 18+ SEER2 heat pump system today with $0 down payment.
          </p>
        </div>

        {/* Interactive Financing Tool Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left 7 cols: Controls & Sliders */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              {/* Cost Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="cost-slider" className="text-sm font-bold text-slate-900">
                    Estimated System Replacement Cost
                  </label>
                  <span className="text-xl font-extrabold text-sky-600 font-heading tabular-nums">
                    ${cost.toLocaleString()}
                  </span>
                </div>
                <input
                  id="cost-slider"
                  type="range"
                  min={4000}
                  max={15000}
                  step={250}
                  value={cost}
                  onChange={(e) => setCost(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                  <span>$4,000 (Single Zone)</span>
                  <span>$8,500 (Standard 3-Ton)</span>
                  <span>$15,000 (Dual High-SEER)</span>
                </div>
              </div>

              {/* Term Selection */}
              <div>
                <label className="text-sm font-bold text-slate-900 block mb-2.5">
                  Choose Repayment Term
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {terms.map((t) => {
                    const isSelected = term === t.months;
                    return (
                      <button
                        key={t.months}
                        type="button"
                        onClick={() => setTerm(t.months)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-500/30'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-sm font-bold text-slate-900 block">
                          {t.label}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                          {t.highlight}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 0% APR Promo Toggle */}
              {term <= 36 && (
                <div className="flex items-center justify-between p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <div>
                      <span className="text-xs font-bold text-amber-900 block">
                        Special Promotion: 0% APR for 18–36 Mos.
                      </span>
                      <span className="text-[11px] text-amber-700">
                        Pay zero interest when paid in full during promo period
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={zeroAprPromo}
                    onChange={(e) => setZeroAprPromo(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded cursor-pointer accent-amber-600"
                  />
                </div>
              )}

              {/* Trust Points */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No prepayment penalties — pay off your unit early anytime</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Soft credit check only — does not impact your credit score</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Includes manufacturer 10-year parts & compressor warranty</span>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Results & Eligibility CTA */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-400/30">
                  <Zap className="w-3.5 h-3.5" />
                  Real-Time Financing Estimate
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                    Estimated Monthly Payment
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-sky-400 my-1 font-heading tabular-nums">
                    ${financing.monthlyPayment}
                    <span className="text-lg font-bold text-slate-400">/mo</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Just <strong className="text-emerald-400">${financing.perDayCost}/day</strong> — less than your daily iced coffee.
                  </p>
                </div>

                <div className="space-y-2 bg-slate-800/60 rounded-xl p-3.5 text-xs text-slate-300 border border-slate-700/60">
                  <div className="flex justify-between">
                    <span>Applied APR:</span>
                    <strong className="text-white">
                      {financing.aprPercent === 0 ? '0.0% Promo APR' : `${financing.aprPercent}% APR`}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>System Investment:</span>
                    <span className="text-white tabular-nums">${financing.systemCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Total Interest:</span>
                    <span className="text-white tabular-nums">${financing.totalInterest.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-700 pt-1.5 font-bold text-white">
                    <span>Electric Bill Offsets:</span>
                    <span className="text-emerald-400">Save up to $140/mo*</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-2.5">
                <button
                  type="button"
                  onClick={() => onCheckEligibility(cost, term, financing.monthlyPayment)}
                  className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Check Eligibility in 60 Seconds (No Credit Impact)</span>
                </button>
                <p className="text-[10px] text-slate-400 text-center">
                  *Based on Dallas-Fort Worth energy rates when replacing an older 10-SEER system with 18-SEER2.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
