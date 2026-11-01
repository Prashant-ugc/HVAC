import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, DollarSign, Calendar, Sparkles } from 'lucide-react';

interface FinancingEligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  systemCost: number;
  termMonths: number;
  monthlyPayment: number;
  onBookConsultation: () => void;
}

export const FinancingEligibilityModal: React.FC<FinancingEligibilityModalProps> = ({
  isOpen,
  onClose,
  systemCost,
  termMonths,
  monthlyPayment,
  onBookConsultation,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [incomeRange, setIncomeRange] = useState('$75,000 – $120,000');
  const [isHomeowner, setIsHomeowner] = useState('yes');
  const [isApproved, setIsApproved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Please provide your full name';
    if (!phone.trim() || phone.length < 10) newErrors.phone = 'Valid phone number required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsApproved(true);
    }, 1000);
  };

  const handleReset = () => {
    setIsApproved(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Instant 60-Second Financing Eligibility
              </h3>
              <p className="text-xs text-slate-300">
                Soft credit inquiry only · 100% Zero Credit Score Impact
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {!isApproved ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Target calculation card */}
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-3.5 flex justify-between items-center text-sky-950">
                <div>
                  <span className="text-[11px] uppercase font-bold text-sky-800 block">
                    Target System Investment:
                  </span>
                  <span className="text-lg font-black font-heading text-slate-900">
                    ${systemCost.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] uppercase font-bold text-sky-800 block">
                    Estimated Monthly:
                  </span>
                  <span className="text-lg font-black text-emerald-700 font-heading">
                    ${monthlyPayment}/mo
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Homeowner Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-600"
                />
                {errors.name && <p className="text-red-600 text-[10px] mt-0.5">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Phone (for Instant Approval SMS)
                </label>
                <input
                  type="tel"
                  placeholder="(214) 555-0199"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-600"
                />
                {errors.phone && <p className="text-red-600 text-[10px] mt-0.5">{errors.phone}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Annual Household Income
                  </label>
                  <select
                    value={incomeRange}
                    onChange={(e) => setIncomeRange(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-600 bg-white"
                  >
                    <option value="$50,000 – $75,000">$50,000 – $75,000</option>
                    <option value="$75,000 – $120,000">$75,000 – $120,000</option>
                    <option value="$120,000+">$120,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Property Status
                  </label>
                  <select
                    value={isHomeowner}
                    onChange={(e) => setIsHomeowner(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-600 bg-white"
                  >
                    <option value="yes">Homeowner (Title Holder)</option>
                    <option value="closing">Buying / Under Contract</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Soft check only through Synchrony & Wells Fargo Financial. Your FICO score will not drop.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Evaluating Soft Approval...' : 'Check My Pre-Approval Status (Instant)'}
              </button>
            </form>
          ) : (
            /* Approval Confirmation */
            <div className="text-center space-y-4 py-4 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  Pre-Qualification Approved!
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 pt-2 font-heading">
                  Congratulations, {name}!
                </h3>
                <p className="text-xs text-slate-600">
                  You are pre-qualified for up to <strong className="text-emerald-700 font-bold">$15,000</strong> in HVAC financing.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span>Selected Monthly Rate:</span>
                  <strong className="text-emerald-700 font-bold">${monthlyPayment} / month</strong>
                </div>
                <div className="flex justify-between">
                  <span>Eligible Promotion:</span>
                  <strong className="text-slate-900">0% APR for 18–36 Months</strong>
                </div>
                <div className="flex justify-between">
                  <span>Pre-Approval Code:</span>
                  <span className="font-mono font-bold text-slate-900">SYNCH-DFW-{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    handleReset();
                    onBookConsultation();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Free In-Home Sizing & System Selection</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-medium py-1"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
