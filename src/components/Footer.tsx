import React from 'react';
import { Phone, MapPin, ShieldCheck, Snowflake, Flame, Clock, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const serviceCities = [
    'Dallas',
    'Fort Worth',
    'Plano',
    'Frisco',
    'McKinney',
    'Allen',
    'Richardson',
    'Highland Park',
    'University Park',
    'Lakewood',
    'Irving',
    'Carrollton',
    'Garland',
    'Arlington',
    'Southlake',
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-700 flex items-center justify-center text-white">
                <div className="relative">
                  <Snowflake className="w-5 h-5 text-sky-200" />
                  <Flame className="w-3 h-3 text-amber-400 absolute -bottom-1 -right-1" />
                </div>
              </div>
              <span className="text-2xl font-black text-white tracking-tight font-heading">
                ApexAir<span className="text-sky-500">Pro</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Dallas-Fort Worth’s leading residential HVAC repair and high-efficiency installation company. Built on The Mom Test: background-checked technicians, shoe covers, spotless clean homes, and guaranteed same-day cooling.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400" />
                <a href="tel:2145550199" className="font-bold text-white hover:text-sky-400">
                  (214) 555-0199 (24/7 Live Emergency Line)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Dallas Regional Operations HQ: 2800 N Stemmons Fwy, Dallas, TX 75207</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Open 24 Hours / 7 Days a Week / 365 Days a Year</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Homeowner Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Instant Quote Calculator
                </a>
              </li>
              <li>
                <a href="#troubleshooter" className="hover:text-white transition-colors">
                  AC Symptom Troubleshooter
                </a>
              </li>
              <li>
                <a href="#financing" className="hover:text-white transition-colors">
                  0% APR HVAC Financing
                </a>
              </li>
              <li>
                <a href="#vip-club" className="hover:text-white transition-colors">
                  VIP Comfort Club ($19/Mo)
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Verified Reviews & Ratings
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Guarantees & Credentials */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Licensing & Guarantees
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>TDLR TACLA #88392C</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>BBB A+ Accredited Business</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>EPA Section 608 Universal</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>$2,000,000 General Liability</span>
              </li>
              <li>
                <span className="text-slate-400">100% Upfront Flat Rate Pricing</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Emergency Notice */}
          <div className="space-y-3 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Emergency Status
              </h4>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Night or weekend breakdown? We never charge overtime fees for emergency cooling restores.
            </p>
            <a
              href="tel:2145550199"
              className="block w-full py-2 px-3 bg-red-600 hover:bg-red-500 text-white font-bold text-center text-xs rounded-lg transition-colors"
            >
              Call (214) 555-0199
            </a>
          </div>
        </div>

        {/* Service Areas Tag Strip */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Proudly Serving the Entire Dallas-Fort Worth Metroplex:
          </span>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
            {serviceCities.map((city) => (
              <span
                key={city}
                className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md"
              >
                {city}, TX
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} ApexAir Pro Heating & Air Conditioning LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>TACLA #88392C</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
