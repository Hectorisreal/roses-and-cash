import React, { useState } from 'react';
import { CustomOrderState } from '../types';
import { Calculator, Flower2, ShieldCheck, Sparkles, ArrowRight, Check } from 'lucide-react';

interface PriceCalculatorSectionProps {
  onApplyEstimateToOrder: (estimateState: Partial<CustomOrderState>) => void;
  onNavigateToCustomOrder: () => void;
}

export const PriceCalculatorSection: React.FC<PriceCalculatorSectionProps> = ({
  onApplyEstimateToOrder,
  onNavigateToCustomOrder,
}) => {
  // Calculator States
  const [cashAmount, setCashAmount] = useState<number>(1000);
  const [denomination, setDenomination] = useState<number>(50);
  const [flowerSize, setFlowerSize] = useState<'compact' | 'medium' | 'grand' | 'royal'>('medium');
  const [wrapperType, setWrapperType] = useState<'korean' | 'luxury_foil'>('korean');
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'standard' | 'express'>('standard');
  
  // Add-ons
  const [fairyLights, setFairyLights] = useState(true);
  const [crownTopper, setCrownTopper] = useState(false);
  const [printedCard, setPrintedCard] = useState(true);
  const [chocolates, setChocolates] = useState(false);
  const [luxuryBox, setLuxuryBox] = useState(false);

  // Derived Calculations
  const billCount = Math.ceil(cashAmount / (denomination || 1));
  const billLaborFee = billCount * 2.5; // GH₵2.50 per bill note for protective sleeving & folding

  const flowerBasePrices = {
    compact: 180, // 10 stems
    medium: 280,  // 20 stems
    grand: 450,   // 35 stems
    royal: 650,   // 50 stems
  };
  const floralCost = flowerBasePrices[flowerSize];

  const wrapperCost = wrapperType === 'luxury_foil' ? 90 : 50;
  
  const deliveryCosts = {
    pickup: 0,
    standard: 40,
    express: 80,
  };
  const deliveryCost = deliveryCosts[deliveryType];

  const addOnsTotal =
    (fairyLights ? 35 : 0) +
    (crownTopper ? 50 : 0) +
    (printedCard ? 20 : 0) +
    (chocolates ? 60 : 0) +
    (luxuryBox ? 120 : 0);

  const totalServiceFee = billLaborFee + floralCost + wrapperCost + addOnsTotal + deliveryCost;
  const grandTotal = cashAmount + totalServiceFee;

  // Handlers
  const handleApplyToOrder = () => {
    onApplyEstimateToOrder({
      category: cashAmount > 0 ? 'hybrid' : 'floral',
      cashAmount,
      billDenomination: denomination,
      billCount,
      deliveryType,
      addOns: {
        fairyLights,
        crownTopper,
        luxuryBox,
        chocolates,
        plushBear: false,
        printedCard,
      },
    });
    onNavigateToCustomOrder();
  };

  return (
    <section id="calculator" className="py-12 sm:py-16 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wider border border-slate-200">
            <Calculator className="w-3.5 h-3.5 text-rose-700" />
            <span>Transparent Pricing Engine</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Interactive Price Calculator
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Configure cash value, flower volume, and finishing touches. We strictly separate banknote face value from floral craftsmanship fees.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-8">
            
            {/* 1. Cash Configuration */}
            <div className="space-y-4 pb-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <label className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>Ghana Cedi Cash Value</span>
                </label>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded">
                  100% Face Value Passed
                </span>
              </div>

              {/* Cash Slider & Custom Input */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-8 space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(Number(e.target.value))}
                    className="w-full accent-rose-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                    <span>GH₵0</span>
                    <span>GH₵1,500</span>
                    <span>GH₵3,000</span>
                    <span>GH₵5,000+</span>
                  </div>
                </div>

                <div className="sm:col-span-4 relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">GH₵</span>
                  <input
                    type="number"
                    min="0"
                    max="10000"
                    step="50"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-12 pr-3 py-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-sm"
                  />
                </div>
              </div>

              {/* Denomination Choice */}
              {cashAmount > 0 && (
                <div className="pt-2 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-medium">Select Cedi Note Denomination:</span>
                    <span className="text-rose-800 font-bold">
                      Requires {billCount} crisp banknote{billCount > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {[10, 20, 50, 100, 200].map((denom) => (
                      <button
                        key={denom}
                        onClick={() => setDenomination(denom)}
                        className={`py-2 px-3 rounded-lg text-xs font-bold transition-all border ${
                          denomination === denom
                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        GH₵{denom} Notes
                      </button>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Protected in clear sleeves (GH₵2.50/note labor fee). Zero pins or adhesive damage.
                  </p>
                </div>
              )}
            </div>

            {/* 2. Floral Arrangement Size */}
            <div className="space-y-4 pb-6 border-b border-slate-200">
              <label className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                <Flower2 className="w-5 h-5 text-rose-700" />
                <span>Floral Stem Volume</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'compact', title: 'Compact', stems: '10 Stems', price: 180 },
                  { id: 'medium', title: 'Classic', stems: '20 Stems', price: 280 },
                  { id: 'grand', title: 'Grand', stems: '35 Stems', price: 450 },
                  { id: 'royal', title: 'Royal', stems: '50 Stems', price: 650 },
                ].map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setFlowerSize(size.id as any)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      flowerSize === size.id
                        ? 'bg-rose-50 border-rose-600 ring-1 ring-rose-600 shadow-xs'
                        : 'bg-white border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold text-slate-900 text-sm">{size.title}</div>
                    <div className="text-xs text-slate-500">{size.stems}</div>
                    <div className="text-xs font-bold text-rose-700 mt-2">+GH₵{size.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Wrapper Material */}
            <div className="space-y-4 pb-6 border-b border-slate-200">
              <label className="font-serif text-lg font-bold text-slate-900">
                Wrapping Paper & Finishing Material
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setWrapperType('korean')}
                  className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                    wrapperType === 'korean'
                      ? 'bg-rose-50 border-rose-600 ring-1 ring-rose-600'
                      : 'bg-white border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Korean Matte Waterproof Paper</div>
                    <div className="text-xs text-slate-500">Soft pastel tones & double satin ribbon</div>
                  </div>
                  <span className="font-bold text-slate-900 text-sm">+GH₵50</span>
                </button>

                <button
                  onClick={() => setWrapperType('luxury_foil')}
                  className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                    wrapperType === 'luxury_foil'
                      ? 'bg-rose-50 border-rose-600 ring-1 ring-rose-600'
                      : 'bg-white border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Luxury Onyx Black & Gold Foil</div>
                    <div className="text-xs text-slate-500">High contrast luxury texture</div>
                  </div>
                  <span className="font-bold text-slate-900 text-sm">+GH₵90</span>
                </button>
              </div>
            </div>

            {/* 4. Luxury Add-ons Checklist */}
            <div className="space-y-4 pb-6 border-b border-slate-200">
              <label className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span>Special Finishing Touches & Extras</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                {[
                  { label: 'LED Warm Fairy Wire Lights', state: fairyLights, setter: setFairyLights, price: 35 },
                  { label: 'Miniature Golden Crown Topper', state: crownTopper, setter: setCrownTopper, price: 50 },
                  { label: 'Custom Printed Card & Envelope', state: printedCard, setter: setPrintedCard, price: 20 },
                  { label: 'Ferrero Rocher Chocolates Box', state: chocolates, setter: setChocolates, price: 60 },
                  { label: 'Clear Acrylic Preservation Box', state: luxuryBox, setter: setLuxuryBox, price: 120 },
                ].map((addon, idx) => (
                  <button
                    key={idx}
                    onClick={() => addon.setter(!addon.state)}
                    className={`p-3 rounded-lg border flex items-center justify-between transition-all ${
                      addon.state
                        ? 'bg-amber-50 border-amber-300 text-slate-900 font-medium'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${addon.state ? 'bg-amber-600 border-amber-600 text-white' : 'border-slate-300 bg-white'}`}>
                        {addon.state && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{addon.label}</span>
                    </div>
                    <span className="font-bold shrink-0">+GH₵{addon.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Delivery Choice */}
            <div className="space-y-4">
              <label className="font-serif text-lg font-bold text-slate-900">
                Delivery Location
              </label>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'pickup', label: 'Studio Pickup', desc: 'Free (Accra)', price: 0 },
                  { id: 'standard', label: 'Standard Delivery', desc: 'Greater Accra', price: 40 },
                  { id: 'express', label: 'Express Courier', desc: 'Kumasi & Same-Day', price: 80 },
                ].map((del) => (
                  <button
                    key={del.id}
                    onClick={() => setDeliveryType(del.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      deliveryType === del.id
                        ? 'bg-rose-50 border-rose-600 ring-1 ring-rose-600'
                        : 'bg-white border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">{del.label}</div>
                    <div className="text-[11px] text-slate-500">{del.desc}</div>
                    <div className="text-xs font-bold text-rose-700 mt-1">GH₵{del.price}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Calculated Receipt */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6 border border-slate-800">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-serif font-bold text-xl text-white">Itemized Estimate</h3>
                  <p className="text-xs text-slate-400">Ghana Cedi breakdown</p>
                </div>
                <div className="px-3 py-1 bg-slate-800 text-amber-400 font-bold rounded text-xs border border-slate-700">
                  GHS
                </div>
              </div>

              {/* Receipt Line Items */}
              <div className="space-y-3 text-xs sm:text-sm">
                
                {/* Cash Line */}
                <div className="flex justify-between items-center py-1 border-b border-slate-800">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <span>Banknote Face Value</span>
                  </div>
                  <span className="font-bold text-emerald-400 text-base">GH₵{cashAmount.toLocaleString()}</span>
                </div>

                {cashAmount > 0 && (
                  <div className="flex justify-between items-center py-1 text-slate-300">
                    <span className="text-slate-400">
                      Sleeving Labor ({billCount} notes @ GH₵2.50)
                    </span>
                    <span className="font-semibold">GH₵{billLaborFee.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center py-1 text-slate-300">
                  <span className="text-slate-400">Fresh Stems ({flowerSize.toUpperCase()})</span>
                  <span className="font-semibold">GH₵{floralCost}</span>
                </div>

                <div className="flex justify-between items-center py-1 text-slate-300">
                  <span className="text-slate-400">Wrapping Material</span>
                  <span className="font-semibold">GH₵{wrapperCost}</span>
                </div>

                {addOnsTotal > 0 && (
                  <div className="flex justify-between items-center py-1 text-slate-300">
                    <span className="text-slate-400">Finishing Extras</span>
                    <span className="font-semibold">GH₵{addOnsTotal}</span>
                  </div>
                )}

                <div className="flex justify-between items-center py-1 text-slate-300">
                  <span className="text-slate-400">Delivery Fee</span>
                  <span className="font-semibold">GH₵{deliveryCost}</span>
                </div>

              </div>

              {/* Summary Highlight Box */}
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Craftsmanship & Service Subtotal:</span>
                  <span className="font-semibold text-slate-200">GH₵{totalServiceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-400">
                  <span>Cedi Cash Passed Through:</span>
                  <span className="font-bold">GH₵{cashAmount.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-700 flex justify-between items-center">
                  <span className="font-bold text-sm text-white">Estimated Grand Total:</span>
                  <span className="font-serif font-bold text-2xl text-amber-400">GH₵{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleApplyToOrder}
                className="w-full flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-bold py-4 px-6 rounded-xl shadow-md transition-all text-sm sm:text-base active:scale-95 group"
              >
                <span>Transfer Estimate to Custom Order Builder</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Safety note */}
              <p className="text-[11px] text-slate-400 text-center leading-tight">
                Estimate valid for 48 hours. Payment processed upon order confirmation.
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
