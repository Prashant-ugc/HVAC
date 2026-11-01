import React, { useState } from 'react';
import { Phone, Calendar, Flame, Snowflake, Menu, X, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Quote Calculator', href: '#calculator' },
    { label: 'Troubleshooter', href: '#troubleshooter' },
    { label: 'Financing', href: '#financing' },
    { label: 'VIP Club', href: '#vip-club' },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Zone: 1 clean line */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-600 via-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-sky-600/20 group-hover:scale-105 transition-transform">
                <div className="relative">
                  <Snowflake className="w-5 h-5 text-sky-200" />
                  <Flame className="w-3.5 h-3.5 text-amber-400 absolute -bottom-1 -right-1" />
                </div>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1.5 font-heading">
                  ApexAir<span className="text-sky-600">Pro</span>
                </span>
                <span className="text-[10px] tracking-wider text-slate-500 uppercase font-semibold block -mt-1">
                  Heating & Air Conditioning
                </span>
              </div>
            </a>

            {/* Same-Day Service Badge */}
            <div className="hidden xl:flex items-center gap-1.5 pl-3 border-l border-slate-200 text-xs font-semibold text-emerald-700 bg-emerald-50/80 py-1 px-2.5 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Same-Day Guaranteed Dispatch</span>
            </div>
          </div>

          {/* Nav Links: clean text links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-sky-600 transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Zone: Phone CTA & Book Button */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-3 shrink-0">
            <a
              href="tel:2145550199"
              className="flex items-center gap-2 px-2.5 xl:px-3 py-2 text-slate-800 hover:text-sky-600 font-bold text-sm transition-colors rounded-lg hover:bg-slate-50"
            >
              <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left leading-tight whitespace-nowrap">
                <span className="text-[10px] text-slate-500 font-medium block">24/7 Dispatch</span>
                <span className="text-xs xl:text-sm font-extrabold tracking-tight text-slate-900">(214) 555-0199</span>
              </div>
            </a>

            <button
              onClick={onBookClick}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 xl:px-4 py-2.5 text-xs xl:text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Book $49 Diagnostic</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="tel:2145550199"
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-sky-600 text-white font-bold"
              aria-label="Call ApexAir"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-semibold text-slate-800 hover:text-sky-600"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href="tel:2145550199"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-slate-100 text-slate-900 font-bold text-sm"
            >
              <Phone className="w-4 h-4 text-sky-600" />
              Call Now: (214) 555-0199
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full py-3 px-4 rounded-lg bg-sky-600 text-white font-bold text-sm shadow-sm hover:bg-sky-700"
            >
              Book $49 Diagnostic Visit
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
