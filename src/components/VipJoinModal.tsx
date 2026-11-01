import React, { useState } from 'react';
import { X, Crown, CheckCircle2, ShieldCheck, Sparkles, CreditCard } from 'lucide-react';

interface VipJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VipJoinModal: React.FC<VipJoinModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [membershipId, setMembershipId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Please provide your full name';
    if (!phone.trim() || phone.length < 10) newErrors.phone = 'Valid phone number required';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid email required for digital member card';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsJoined(true);
    setMembershipId(`VIP-DFW-${Math.floor(10000 + Math.random() * 90000)}`);
  };

  const handleClose = () => {
    setIsJoined(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center font-bold">
              <Crown className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-950">
                Join the VIP Comfort Club
              </h3>
              <p className="text-xs text-amber-950 font-medium">
                $19/Month · 2 Free Annual Tune-Ups & Front-of-Line Priority
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-900 hover:bg-amber-400 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {!isJoined ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 space-y-1.5 text-amber-950">
                <span className="font-bold block text-xs flex items-center gap-1.5 text-amber-900">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Instant Activation Benefits:
                </span>
                <p>• 2 Seasonal Precision Tune-Ups (Spring AC + Fall Heat) included</p>
                <p>• 15% discount on all parts, refrigerant & repairs</p>
                <p>• VIP priority dispatch (skip non-member wait queues)</p>
                <p>• $0 overtime, holiday, or weekend dispatch fees forever</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Homeowner Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. David Miller"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                {errors.name && <p className="text-red-600 text-[10px] mt-0.5">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="(214) 555-0199"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  {errors.phone && <p className="text-red-600 text-[10px] mt-0.5">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="david@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  {errors.email && <p className="text-red-600 text-[10px] mt-0.5">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Home Address (DFW Metroplex)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 742 Evergreen Terrace, Plano TX"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600">
                <CreditCard className="w-4 h-4 text-sky-600 shrink-0" />
                <span>$19 billed monthly. Cancel anytime with 1-click. No hidden cancellation penalties.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-md transition-all active:scale-98 cursor-pointer"
              >
                Enroll in VIP Comfort Club ($19/Month)
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4 py-4 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                <Crown className="w-8 h-8 fill-amber-500 text-amber-600" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  Welcome to the VIP Club!
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 pt-2 font-heading">
                  Membership Active
                </h3>
                <p className="text-xs text-slate-600">
                  Member ID: <strong className="font-mono text-slate-900">{membershipId}</strong>
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span>Primary Member:</span>
                  <strong className="text-slate-900">{name}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Dispatch Priority Status:</span>
                  <strong className="text-emerald-600 font-bold">Front-of-the-Line (Dallas)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Available Seasonal Tune-Ups:</span>
                  <strong className="text-sky-700">2 Included Credits</strong>
                </div>
              </div>

              <p className="text-[11px] text-slate-500">
                A welcome packet and priority dispatch phone card have been sent to <strong>{email}</strong>.
              </p>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                Close & Return
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
