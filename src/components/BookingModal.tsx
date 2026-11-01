import React, { useState } from 'react';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  AlertCircle,
  Phone,
} from 'lucide-react';
import { QuoteResult } from '../utils/hvacCalculations.ts';
import { LeadData } from './HeroSection.tsx';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuote?: QuoteResult | null;
  initialLead?: LeadData | null;
  initialSymptomTitle?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialQuote,
  initialLead,
  initialSymptomTitle,
}) => {
  const [name, setName] = useState(initialLead?.name || '');
  const [phone, setPhone] = useState(initialLead?.phone || '');
  const [zip, setZip] = useState(initialLead?.zip || '75201');
  const [address, setAddress] = useState('');
  const [serviceDate, setServiceDate] = useState('today');
  const [timeSlot, setTimeSlot] = useState('immediate');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Please provide your name';
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) newErrors.phone = 'Valid 10-digit phone required';
    if (!address.trim()) newErrors.address = 'Street address required for technician dispatch';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsBooked(true);
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      setConfirmationNumber(`DFW-${randomNum}`);
    }, 1000);
  };

  const handleReset = () => {
    setIsBooked(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Schedule Diagnostic & Repair
              </h3>
              <p className="text-xs text-slate-300">
                $49 diagnostic fee is 100% credited toward any repair
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {!isBooked ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Pre-fill Summary Banner if Quote exists */}
              {initialQuote && (
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 text-sky-950 flex justify-between items-center">
                  <div>
                    <span className="font-bold block text-xs">
                      Locked Estimate: {initialQuote.formattedRange}
                    </span>
                    <span className="text-[11px] text-sky-700">
                      {initialQuote.serviceName}
                    </span>
                  </div>
                  <span className="bg-sky-600 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                    Coupon: COOL50
                  </span>
                </div>
              )}

              {initialSymptomTitle && !initialQuote && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-950">
                  <span className="font-bold block text-xs">
                    Target Symptom: {initialSymptomTitle}
                  </span>
                  <span className="text-[11px] text-amber-800">
                    Lead tech will bring targeted OEM parts for this diagnosis.
                  </span>
                </div>
              )}

              {/* Date & Time Slot Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  When do you need the technician?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setServiceDate('today');
                      setTimeSlot('immediate');
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      serviceDate === 'today'
                        ? 'border-red-500 bg-red-50 text-red-950 ring-1 ring-red-400'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-bold block text-xs">
                      Today (Emergency ASAP)
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Average arrival in 42 mins
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setServiceDate('tomorrow');
                      setTimeSlot('morning');
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      serviceDate === 'tomorrow'
                        ? 'border-sky-600 bg-sky-50 text-sky-950 ring-1 ring-sky-400'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-bold block text-xs">
                      Tomorrow (Scheduled)
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Guaranteed 2-hour window
                    </span>
                  </button>
                </div>
              </div>

              {/* Time window selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Arrival Window:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setTimeSlot('immediate')}
                    className={`p-2 rounded-lg border text-center text-xs font-semibold ${
                      timeSlot === 'immediate'
                        ? 'border-sky-600 bg-sky-50 text-sky-700'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Immediate Dispatch
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeSlot('morning')}
                    className={`p-2 rounded-lg border text-center text-xs font-semibold ${
                      timeSlot === 'morning'
                        ? 'border-sky-600 bg-sky-50 text-sky-700'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    8 AM – 12 PM
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeSlot('afternoon')}
                    className={`p-2 rounded-lg border text-center text-xs font-semibold ${
                      timeSlot === 'afternoon'
                        ? 'border-sky-600 bg-sky-50 text-sky-700'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    12 PM – 4 PM
                  </button>
                </div>
              </div>

              {/* Form inputs */}
              <div className="space-y-2.5 pt-1">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elena Vance"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-600"
                  />
                  {errors.name && <p className="text-red-600 text-[10px] mt-0.5">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(214) 555-0199"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-600"
                    />
                    {errors.phone && <p className="text-red-600 text-[10px] mt-0.5">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      maxLength={5}
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="75201"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 4512 Armstrong Pkwy"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-600"
                  />
                  {errors.address && <p className="text-red-600 text-[10px] mt-0.5">{errors.address}</p>}
                </div>
              </div>

              {/* Guarantees */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>The ApexAir 3-Way Homeowner Guarantee:</span>
                </div>
                <p>1. On-time arrival or diagnostic is 100% free.</p>
                <p>2. Technicians wear boot covers and leave your home spotless.</p>
                <p>3. Firm upfront pricing quote before any repair begins.</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Confirming Dispatch Window...' : 'Confirm My Technician Dispatch ($49 Waived with Repair)'}
              </button>
            </form>
          ) : (
            /* Confirmation Screen */
            <div className="text-center space-y-4 py-4 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Appointment Confirmed
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 pt-2 font-heading">
                  Technician Dispatched!
                </h3>
                <p className="text-xs text-slate-600">
                  Booking Reference: <strong className="font-mono text-slate-900">{confirmationNumber}</strong>
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span>Customer Name:</span>
                  <strong className="text-slate-900">{name}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Dispatch Address:</span>
                  <strong className="text-slate-900">{address}, {zip}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Arrival:</span>
                  <strong className="text-emerald-700 font-bold">
                    {serviceDate === 'today' ? 'Today (Next available truck ~42 mins)' : 'Tomorrow (Morning Window)'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Contact Phone:</span>
                  <span className="text-slate-900">{phone}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500">
                You will receive a confirmation text message with the technician’s live GPS tracking link when they are en route.
              </p>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                Close & Return to Website
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
