import React from 'react';
import { HERO_BANNER_IMAGE } from '../data/mockData';
import { Sparkles, Calculator, ShieldCheck, Award, HeartHandshake, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onNavigate: (tab: string) => void;
  onOpenAdvisor: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenAdvisor }) => {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-10 pb-16 lg:pt-16 lg:pb-20 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-rose-300">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Bespoke Ghana Cedi & Fresh Floral Arrangement Studio</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Luxury Money Bouquets & Fresh Roses in Ghana
            </h1>

            {/* Subtext */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Combine pristine, uncirculated Ghana Cedi notes with premium fresh roses, lilies, and LED warm lights. Every banknote is securely sleeved with zero pin-hole damage guaranteed.
            </p>

            {/* Value Guarantees list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 max-w-xl mx-auto lg:mx-0 text-xs sm:text-sm">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-200 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium">Uncirculated Cedi Notes</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-200 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium">Zero Bill Damage Sleeving</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-200 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium">Accra & Kumasi Delivery</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => onNavigate('custom')}
                className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 py-3.5 rounded-lg shadow-md transition-all active:scale-95 text-sm sm:text-base"
              >
                <span>Design Custom Bouquet</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('calculator')}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-5 py-3.5 rounded-lg border border-slate-700 transition-all text-sm sm:text-base"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Price Calculator</span>
              </button>

              <button
                onClick={onOpenAdvisor}
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/60 hover:bg-rose-900 border border-rose-800 px-4 py-3.5 rounded-lg transition-colors"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Gift Finder Assistant</span>
              </button>
            </div>

            {/* Social Proof Bar */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-white text-sm">GH₵5,000,000+</div>
                  <div className="text-[11px] text-slate-400">Cash Value Processed</div>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-800 hidden sm:block"></div>
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="font-bold text-white text-sm">4,800+</div>
                  <div className="text-[11px] text-slate-400">Delighted Clients in Ghana</div>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-800 hidden sm:block"></div>
              <div className="flex items-center gap-2.5">
                <HeartHandshake className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <div className="font-bold text-white text-sm">4.95 / 5.0</div>
                  <div className="text-[11px] text-slate-400">Verified Client Reviews</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="relative bg-slate-800 p-3 sm:p-4 rounded-2xl shadow-2xl border border-slate-700">
                <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={HERO_BANNER_IMAGE}
                    alt="Luxury Flower and Cedi Money Bouquet"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Overlay Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-semibold text-rose-400 uppercase tracking-wider">Featured Masterpiece</div>
                        <div className="font-serif font-bold text-white text-sm sm:text-base">Blush Rose & Cedi Crown (GH₵1,000 Cash)</div>
                      </div>
                      <button
                        onClick={() => onNavigate('gallery')}
                        className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors shrink-0"
                      >
                        View Gallery
                      </button>
                    </div>
                  </div>
                </div>

                {/* Micro Label Pills */}
                <div className="absolute -top-3 -left-3 bg-slate-900 text-slate-200 px-3 py-1 rounded border border-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Fresh Ghanaian Flowers
                </div>

                <div className="absolute -bottom-3 -right-3 bg-rose-900 text-amber-300 px-3 py-1 rounded border border-rose-700 shadow-md text-xs font-bold">
                  Warm LED Lights Included
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
