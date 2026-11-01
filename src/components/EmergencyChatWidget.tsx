import React, { useState } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Phone,
  CheckCircle2,
  Clock,
  ShieldCheck,
  User,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

export const EmergencyChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<string>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState('75201');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const quickIssues = [
    'AC blowing warm 85° air',
    'Water leaking through ceiling',
    'Loud grinding / buzzing unit',
    'System won’t turn on at all',
    'Furnace / heater blowing cold',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your name');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please provide a valid 10-digit mobile number');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const resetChat = () => {
    setIsSubmitted(false);
    setSelectedIssue('');
    setName('');
    setPhone('');
    setNotes('');
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 right-5 z-50">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm rounded-full shadow-2xl shadow-red-900/50 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            aria-label="Open 24/7 emergency dispatch chat"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <MessageSquare className="w-4 h-4 text-white group-hover:rotate-6 transition-transform" />
            <span className="tracking-tight">Emergency Help? Text Dispatch</span>
          </button>
        ) : null}
      </div>

      {/* Chat Modal / Popup */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[92vw] sm:w-[400px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center font-bold text-sm text-white">
                  DM
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white">24/7 DFW Emergency Dispatch</h3>
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-1.5 py-0.2 rounded">
                    LIVE
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Lead Tech Dave M. on duty · Avg. SMS callback: <strong className="text-white">4 Mins</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Content Body */}
          <div className="p-4 overflow-y-auto space-y-4 text-xs bg-slate-50 flex-1">
            {!isSubmitted ? (
              <>
                {/* Tech greeting message */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    DM
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl rounded-tl-xs shadow-xs border border-slate-200 text-slate-700 space-y-1.5 max-w-[85%]">
                    <p className="font-semibold text-slate-900">
                      Hi, I’m Dave with ApexAir on-call dispatch in Dallas!
                    </p>
                    <p>
                      Are you experiencing an urgent heating or cooling breakdown? Select your issue below or text me your details for immediate on-call response.
                    </p>
                  </div>
                </div>

                {/* Quick Canned Issue Chips */}
                <div className="space-y-1.5 pl-9">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    Quick Select Symptom:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickIssues.map((issue) => (
                      <button
                        key={issue}
                        type="button"
                        onClick={() => setSelectedIssue(issue)}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border text-left transition-all ${
                          selectedIssue === issue
                            ? 'bg-sky-600 text-white border-sky-600 font-bold'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {issue}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form inside chat */}
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200 space-y-3">
                  <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-sky-600" />
                    <span>Send Urgent Dispatch Ticket</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rachel Miller"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                        Cell Phone (for SMS)
                      </label>
                      <input
                        type="tel"
                        placeholder="(214) 555-0199"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                        DFW ZIP Code
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="75201"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                      Urgent Problem Details (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder={selectedIssue || 'e.g. Unit stopped at 2 PM, smelling electrical burn...'}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-600 resize-none"
                    ></textarea>
                  </div>

                  {errorMsg && (
                    <p className="text-[11px] text-red-600 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending to Dave’s Truck Tablet...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Text Dispatch Now (Instant 5-Min Callback)</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* Confirmation Screen (simulating instant SMS dispatch) */
              <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm space-y-4 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div className="text-center space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block">
                    Ticket #DFW-9842 Confirmed
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Dispatch Alert Received!
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Thanks <strong className="text-slate-900">{name}</strong>! On-call technician <strong className="text-slate-900">Dave M. (Tech #4)</strong> has received your alert on his in-cab tablet and will call <strong className="text-slate-900">{phone}</strong> within <span className="text-emerald-700 font-bold">5 minutes</span>.
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 text-[11px] text-slate-600">
                  <div className="flex justify-between">
                    <span>Assigned Sector:</span>
                    <strong className="text-slate-900">Dallas Metro ({zip})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Reported Issue:</span>
                    <span className="text-slate-900 truncate max-w-[180px]">
                      {selectedIssue || notes || 'HVAC Urgent Repair'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Queue Status:</span>
                    <strong className="text-emerald-600">Priority 1 (Active)</strong>
                  </div>
                </div>

                <div className="pt-1 space-y-2">
                  <a
                    href="tel:2145550199"
                    className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors block text-center"
                  >
                    <Phone className="w-3.5 h-3.5 text-sky-400" />
                    <span>Need to Speak Right This Second? Call (214) 555-0199</span>
                  </a>

                  <button
                    type="button"
                    onClick={resetChat}
                    className="w-full text-center text-[11px] text-slate-500 hover:text-slate-800 font-medium py-1"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Footer in chat */}
          <div className="bg-white p-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 px-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>TACLA #88392C</span>
            </span>
            <a href="tel:2145550199" className="font-bold text-sky-600 hover:underline">
              (214) 555-0199
            </a>
          </div>
        </div>
      )}
    </>
  );
};
