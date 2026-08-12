import React, { useState } from 'react';
import { HelpCircle, DollarSign, Flower2, ShieldAlert, Sparkles, Droplets, Scissors, Sun } from 'lucide-react';

export const CareGuideSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cash' | 'flowers' | 'lights'>('cash');

  return (
    <section id="care" className="py-12 sm:py-16 bg-white border-t border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Preservation & Unwrapping Protocol</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Care & Cash Harvesting Guide
          </h2>
          <p className="text-slate-600 text-sm">
            Learn how to safely retrieve currency notes from your money bouquet without tearing banknotes or damaging the fresh blooms.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-2 mb-8 border-b border-slate-100 pb-2">
          <button
            onClick={() => setActiveTab('cash')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'cash'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Harvesting Banknotes</span>
          </button>

          <button
            onClick={() => setActiveTab('flowers')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'flowers'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Flower2 className="w-4 h-4" />
            <span>Fresh Bloom Care</span>
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'cash' ? (
          <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-base">
              <ShieldAlert className="w-5 h-5 text-emerald-600" />
              <span>Zero-Damage Money Retrieval Protocol</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                  01
                </div>
                <h4 className="font-bold text-slate-900">Locate the Protective Sleeve</h4>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Every bill is enclosed inside a crystal-clear polypropylene sleeve. Staples, tape, or glue are NEVER applied directly to banknotes.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                  02
                </div>
                <h4 className="font-bold text-slate-900">Snip Top Seal cleanly</h4>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Using small scissors, cut the top non-adhesive edge of the plastic sleeve. Gently slide out the uncirculated note intact.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                  03
                </div>
                <h4 className="font-bold text-slate-900">Keep Keepsake Wrapper</h4>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Even after cash is removed, the floral structure and silk ribbon remain a stunning decorative centerpiece for weeks!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-rose-50/60 p-6 sm:p-8 rounded-3xl border border-rose-200/80 space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-base">
              <Droplets className="w-5 h-5 text-rose-600" />
              <span>Prolonging Fresh Flower Longevity</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="bg-white p-5 rounded-2xl border border-rose-100 space-y-2">
                <Scissors className="w-5 h-5 text-rose-600" />
                <h4 className="font-bold text-slate-900">45-Degree Stem Trimming</h4>
                <p className="text-slate-600 text-xs">
                  Trim 1 inch off the bottom of flower stems diagonally under running water every 2 days to maximize water absorption.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-rose-100 space-y-2">
                <Droplets className="w-5 h-5 text-rose-600" />
                <h4 className="font-bold text-slate-900">Cool Hydration</h4>
                <p className="text-slate-600 text-xs">
                  For hybrid arrangements, use the floral water pouch or transfer stems to a clean vase with flower food solution.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-rose-100 space-y-2">
                <Sun className="w-5 h-5 text-rose-600" />
                <h4 className="font-bold text-slate-900">Avoid Direct Sun & Heat</h4>
                <p className="text-slate-600 text-xs">
                  Keep bouquets in a cool room away from direct sunlight, air conditioning drafts, and ripening fruit bowls.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
