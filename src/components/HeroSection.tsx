import React, { useState } from 'react';
import {
  Phone,
  ShieldCheck,
  Star,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Wrench,
  Flame,
  Snowflake,
  Home,
  AlertCircle,
  Copy,
  Check,
  Calendar,
  Award,
} from 'lucide-react';
import {
  calculateInstantQuote,
  ServiceType,
  HomeSize,
  UrgencyLevel,
  QuoteResult,
} from '../utils/hvacCalculations.ts';

interface HeroSectionProps {
  onBookWithQuote: (quote: QuoteResult, leadData: LeadData) => void;
  onOpenPhone: () => void;
}

export interface LeadData {
  name: string;
  phone: string;
  zip: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookWithQuote,
  onOpenPhone,
}) => {
  // 5-Step Quiz State
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [service, setService] = useState<ServiceType>('ac_repair');
  const [homeSize, setHomeSize] = useState<HomeSize>('1500_2500');
  const [urgency, setUrgency] = useState<UrgencyLevel>('emergency_today');

  const [lead, setLead] = useState<LeadData>({
    name: '',
    phone: '',
    zip: '75201',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [calculatedQuote, setCalculatedQuote] = useState<QuoteResult | null>(null);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  const handleStep1Next = (selectedService: ServiceType) => {
    setService(selectedService);
    setStep(2);
  };

  const handleStep2Next = (selectedSize: HomeSize) => {
    setHomeSize(selectedSize);
    setStep(3);
  };

  const handleStep3Next = (selectedUrgency: UrgencyLevel) => {
    setUrgency(selectedUrgency);
    setStep(4);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!lead.name.trim()) {
      errors.name = 'Please provide your name';
    }
    const cleanPhone = lead.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      errors.phone = 'Valid 10-digit phone number is required';
    }
    if (!lead.zip.trim() || lead.zip.length < 5) {
      errors.zip = 'Valid 5-digit Texas ZIP required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const result = calculateInstantQuote(service, homeSize, urgency);
    setCalculatedQuote(result);
    setStep(5);
  };

  const copyCouponCode = () => {
    if (calculatedQuote) {
      navigator.clipboard?.writeText(calculatedQuote.couponCode);
      setCopiedCoupon(true);
      setTimeout(() => setCopiedCoupon(false), 2500);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-600 rounded-full blur-[140px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: High-Impact Hero Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust Badges Bar */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 px-3 py-1.5 rounded-lg shadow-xs backdrop-blur-xs">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>4.9★ on Google</span>
                <span className="text-slate-400">(450+ Verified Reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 px-3 py-1.5 rounded-lg shadow-xs backdrop-blur-xs">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>BBB A+ Accredited</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 px-3 py-1.5 rounded-lg shadow-xs backdrop-blur-xs">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Licensed & Insured #TACLA88392C</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.9rem] font-extrabold tracking-tight leading-[1.12] text-white font-heading">
              AC Broken? Heater Freezing Up? <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-blue-200">
                Get Guaranteed Same-Day Repair
              </span>{' '}
              or $0 Diagnostic Fee.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Don’t sweat in 100° Texas heat or freeze in an unexpected cold snap. Dallas’s most trusted certified HVAC technicians arrive in 42 minutes average time with fully stocked trucks to fix your system on the spot.
            </p>

            {/* Core Guarantees 3-Column */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-800/50 border border-slate-700/50 p-3 rounded-xl flex items-start gap-2.5">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-bold text-white">Same-Day Arrival</h2>
                  <p className="text-[11px] text-slate-400">Arrive on time or your diagnostic fee is $0.</p>
                </div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 p-3 rounded-xl flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-bold text-white">100% Upfront Pricing</h2>
                  <p className="text-[11px] text-slate-400">Written quote before we touch a wrench. No surprises.</p>
                </div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 p-3 rounded-xl flex items-start gap-2.5">
                <Wrench className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-bold text-white">First-Trip Fix (92%)</h2>
                  <p className="text-[11px] text-slate-400">Trucks stocked with 1,200+ universal OEM components.</p>
                </div>
              </div>
            </div>

            {/* Emergency CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="tel:2145550199"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-extrabold text-base shadow-lg shadow-red-900/40 transition-all hover:scale-[1.02] active:scale-95 group"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
                </div>
                <span>Call (214) 555-0199 — Emergency Dispatch</span>
              </a>

              <a
                href="#troubleshooter"
                className="inline-flex items-center gap-2 px-5 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 hover:text-white font-bold text-sm transition-all"
              >
                <span>Troubleshoot My System</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: 60-Second Instant Quote Calculator (Multi-step JS Widget) */}
          <div className="lg:col-span-5" id="calculator">
            <div className="relative bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              {/* Top Accent Strip */}
              <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 px-6 py-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span className="font-extrabold text-sm sm:text-base tracking-tight font-heading">
                      60-Second Instant Price Calculator
                    </span>
                  </div>
                  <span className="text-xs bg-white/20 font-semibold px-2.5 py-1 rounded-full">
                    {step < 5 ? `Step ${step} of 4` : 'Estimate Ready!'}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-white/20 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-amber-400 h-full transition-all duration-300"
                    style={{ width: `${(step / 5) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* STEP 1: Select Service */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        What service does your home need?
                      </h3>
                      <p className="text-xs text-slate-500">
                        Select one option below to start your accurate estimate.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleStep1Next('ac_repair')}
                        className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                          service === 'ac_repair'
                            ? 'border-sky-600 bg-sky-50/70 ring-2 ring-sky-500/20'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                            <Snowflake className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-bold text-sm text-slate-900 block">
                              AC Repair
                            </span>
                            <span className="text-xs text-slate-500">
                              Warm air, frozen coil, strange noises, leaks
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStep1Next('full_replacement')}
                        className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                          service === 'full_replacement'
                            ? 'border-sky-600 bg-sky-50/70 ring-2 ring-sky-500/20'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                            <Home className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-bold text-sm text-slate-900 block">
                              Full System Replacement
                            </span>
                            <span className="text-xs text-slate-500">
                              New high-efficiency SEER2 heat pump or AC system
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStep1Next('heating_fix')}
                        className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                          service === 'heating_fix'
                            ? 'border-sky-600 bg-sky-50/70 ring-2 ring-sky-500/20'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                            <Flame className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-bold text-sm text-slate-900 block">
                              Heating Fix / Furnace
                            </span>
                            <span className="text-xs text-slate-500">
                              No heat, pilot light issue, gas furnace trouble
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStep1Next('seasonal_maintenance')}
                        className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                          service === 'seasonal_maintenance'
                            ? 'border-sky-600 bg-sky-50/70 ring-2 ring-sky-500/20'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <Wrench className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-bold text-sm text-slate-900 block">
                              Tune-Up & Maintenance
                            </span>
                            <span className="text-xs text-slate-500">
                              26-point seasonal safety check & coil flush
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Home Size */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-sky-600">
                        Step 2: Sizing Accuracy
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                        What is your approximate home size?
                      </h3>
                      <p className="text-xs text-slate-500">
                        HVAC capacity and repair scope depend heavily on cooling tonnage and square footage.
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <button
                        type="button"
                        onClick={() => handleStep2Next('under_1500')}
                        className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                          homeSize === 'under_1500'
                            ? 'border-sky-600 bg-sky-50/70'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <span className="font-bold text-sm text-slate-900 block">
                            Under 1,500 sq. ft.
                          </span>
                          <span className="text-xs text-slate-500">
                            Condos, townhomes, or smaller single-family (approx 2.0 – 2.5 Tons)
                          </span>
                        </div>
                        <CheckCircle
                          className={`w-5 h-5 ${
                            homeSize === 'under_1500' ? 'text-sky-600' : 'text-slate-300'
                          }`}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStep2Next('1500_2500')}
                        className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                          homeSize === '1500_2500'
                            ? 'border-sky-600 bg-sky-50/70'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <span className="font-bold text-sm text-slate-900 block">
                            1,500 – 2,500 sq. ft.
                          </span>
                          <span className="text-xs text-slate-500">
                            Average suburban 3-4 bedroom home (approx 3.0 – 3.5 Tons)
                          </span>
                        </div>
                        <CheckCircle
                          className={`w-5 h-5 ${
                            homeSize === '1500_2500' ? 'text-sky-600' : 'text-slate-300'
                          }`}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStep2Next('over_2500')}
                        className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                          homeSize === 'over_2500'
                            ? 'border-sky-600 bg-sky-50/70'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <span className="font-bold text-sm text-slate-900 block">
                            2,500+ sq. ft.
                          </span>
                          <span className="text-xs text-slate-500">
                            Large estate or multi-story (approx 4.0 – 5.0 Tons / Dual-Zone)
                          </span>
                        </div>
                        <CheckCircle
                          className={`w-5 h-5 ${
                            homeSize === 'over_2500' ? 'text-sky-600' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                      >
                        ← Back to services
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: System Age / Urgency */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-sky-600">
                        Step 3: Timeline & Urgency
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                        How urgently do you need a technician?
                      </h3>
                      <p className="text-xs text-slate-500">
                        We prioritize emergency calls with on-call trucks dispatched right away.
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <button
                        type="button"
                        onClick={() => handleStep3Next('emergency_today')}
                        className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                          urgency === 'emergency_today'
                            ? 'border-red-500 bg-red-50/70 ring-1 ring-red-400'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">
                              Emergency Today (ASAP)
                            </span>
                            <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded">
                              Fast Track
                            </span>
                          </div>
                          <span className="text-xs text-slate-500">
                            Unit is down right now, need dispatch today
                          </span>
                        </div>
                        <CheckCircle
                          className={`w-5 h-5 ${
                            urgency === 'emergency_today' ? 'text-red-600' : 'text-slate-300'
                          }`}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStep3Next('within_week')}
                        className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                          urgency === 'within_week'
                            ? 'border-sky-600 bg-sky-50/70'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <span className="font-bold text-sm text-slate-900 block">
                            Within a Week
                          </span>
                          <span className="text-xs text-slate-500">
                            System is sputtering, cooling poorly, or needs routine inspection
                          </span>
                        </div>
                        <CheckCircle
                          className={`w-5 h-5 ${
                            urgency === 'within_week' ? 'text-sky-600' : 'text-slate-300'
                          }`}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStep3Next('planning')}
                        className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                          urgency === 'planning'
                            ? 'border-sky-600 bg-sky-50/70'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <span className="font-bold text-sm text-slate-900 block">
                            Just Planning & Price Shopping
                          </span>
                          <span className="text-xs text-slate-500">
                            Gathering quotes for seasonal upgrade or future budgeting
                          </span>
                        </div>
                        <CheckCircle
                          className={`w-5 h-5 ${
                            urgency === 'planning' ? 'text-sky-600' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                      >
                        ← Back to home size
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: Lead Capture Form */}
                {step === 4 && (
                  <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                    <div>
                      <span className="text-xs font-semibold text-emerald-600">
                        Final Step: Instant Price Unlock
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                        Where should we send your quote?
                      </h3>
                      <p className="text-xs text-slate-500">
                        Lock in your $50-off diagnostic coupon code immediately.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. John Miller"
                        value={lead.name}
                        onChange={(e) => setLead({ ...lead, name: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                          formErrors.name
                            ? 'border-red-500 focus:ring-red-200'
                            : 'border-slate-300 focus:border-sky-600 focus:ring-sky-100'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Phone Number (for SMS confirmation)
                        </label>
                        <input
                          type="tel"
                          placeholder="(214) 555-0199"
                          value={lead.phone}
                          onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                            formErrors.phone
                              ? 'border-red-500 focus:ring-red-200'
                              : 'border-slate-300 focus:border-sky-600 focus:ring-sky-100'
                          }`}
                        />
                        {formErrors.phone && (
                          <p className="text-[11px] text-red-600 mt-1">
                            {formErrors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          DFW ZIP Code
                        </label>
                        <input
                          type="text"
                          maxLength={5}
                          placeholder="e.g. 75201"
                          value={lead.zip}
                          onChange={(e) => setLead({ ...lead, zip: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                            formErrors.zip
                              ? 'border-red-500 focus:ring-red-200'
                              : 'border-slate-300 focus:border-sky-600 focus:ring-sky-100'
                          }`}
                        />
                        {formErrors.zip && (
                          <p className="text-[11px] text-red-600 mt-1">
                            {formErrors.zip}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero spam promise. We never sell or share your homeowner information.</span>
                    </p>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-md shadow-emerald-700/20 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Unlock My Instant Estimate & $50 Off Coupon</span>
                    </button>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                      >
                        ← Back to timeline
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 5: Instant Result Display */}
                {step === 5 && calculatedQuote && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-emerald-900 block">
                            Estimate Unlocked for {lead.name || 'Homeowner'}!
                          </span>
                          <span className="text-[11px] text-emerald-700">
                            Service Area Verified: {lead.zip} (Dallas Metro)
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-700 bg-white px-2.5 py-1 rounded-md border border-emerald-300">
                        Ready
                      </span>
                    </div>

                    {/* Price Range Card */}
                    <div className="bg-slate-900 text-white rounded-xl p-5 text-center relative overflow-hidden">
                      <div className="absolute top-2 right-2 text-[10px] bg-sky-500/30 text-sky-300 border border-sky-400/30 px-2 py-0.5 rounded">
                        {calculatedQuote.recommendedTonnage}
                      </div>

                      <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                        Estimated Transparent Price Range
                      </span>
                      <div className="text-3xl sm:text-4xl font-extrabold text-sky-400 my-1 font-heading tabular-nums">
                        {calculatedQuote.formattedRange}
                      </div>
                      <p className="text-xs text-slate-300">
                        {calculatedQuote.serviceName} · Approx. {calculatedQuote.estimatedDuration}
                      </p>

                      {calculatedQuote.sameDayGuaranteed && (
                        <div className="mt-3 inline-flex items-center gap-1.5 bg-red-500/20 border border-red-500/30 text-red-300 text-xs px-3 py-1 rounded-full">
                          <Clock className="w-3.5 h-3.5 text-red-400" />
                          <span>Same-Day Emergency Dispatch Window Active</span>
                        </div>
                      )}
                    </div>

                    {/* Coupon Box */}
                    <div className="border border-dashed border-amber-500 bg-amber-50/80 rounded-xl p-3.5 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          <span className="text-xs font-black text-amber-900">
                            $50 OFF COUPON UNLOCKED!
                          </span>
                        </div>
                        <p className="text-[11px] text-amber-800">
                          Use code <strong className="font-mono bg-white px-1.5 py-0.5 rounded border border-amber-300 text-amber-900">COOL50</strong> for $50 off any repair or maintenance.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={copyCouponCode}
                        className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shrink-0"
                      >
                        {copiedCoupon ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCoupon ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 pt-1">
                      <button
                        type="button"
                        onClick={() => onBookWithQuote(calculatedQuote, lead)}
                        className="w-full py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Book Technician at This Estimated Rate</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-semibold py-1.5"
                      >
                        Recalculate with different options
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
