import React, { useState } from 'react';
import { OrderTrackResult } from '../types';
import { SAMPLE_ORDERS } from '../data/mockData';
import { Truck, Search, CheckCircle2, Clock, Camera, ShieldCheck } from 'lucide-react';

interface OrderTrackerProps {
  customOrdersMap: Record<string, OrderTrackResult>;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ customOrdersMap }) => {
  const [searchId, setSearchId] = useState('RC-1001');
  const [activeResult, setActiveResult] = useState<OrderTrackResult | null>(SAMPLE_ORDERS['RC-1001']);
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = searchId.trim().toUpperCase().replace('#', '');
    
    // Check in combined sample orders + user created orders
    const found = customOrdersMap[cleanKey] || SAMPLE_ORDERS[cleanKey];
    if (found) {
      setActiveResult(found);
    } else {
      setActiveResult(null);
    }
    setHasSearched(true);
  };

  return (
    <section id="tracker" className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-slate-200/80 text-slate-800 text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5 text-rose-700" />
            <span>Real-Time Courier & Prep Status</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Track Your Bouquet Order
          </h2>
          <p className="text-slate-600 text-sm">
            Enter your order reference code (e.g., <button onClick={() => { setSearchId('RC-1001'); setActiveResult(SAMPLE_ORDERS['RC-1001']); }} className="font-bold underline text-rose-700">#RC-1001</button> or <button onClick={() => { setSearchId('RC-1002'); setActiveResult(SAMPLE_ORDERS['RC-1002']); }} className="font-bold underline text-rose-700">#RC-1002</button>) to monitor note preparation, floral styling, and courier progress in Ghana.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto mb-10">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">#</span>
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="RC-1001"
              className="w-full pl-8 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600 shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>Track</span>
          </button>
        </form>

        {/* Search Results */}
        {hasSearched && !activeResult && (
          <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-slate-900 text-lg">Order #{searchId} Not Found</h3>
            <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
              Please check your reference number. For demo testing, try <button onClick={() => { setSearchId('RC-1001'); setActiveResult(SAMPLE_ORDERS['RC-1001']); }} className="text-rose-700 font-bold underline">RC-1001</button> or <button onClick={() => { setSearchId('RC-1002'); setActiveResult(SAMPLE_ORDERS['RC-1002']); }} className="text-rose-700 font-bold underline">RC-1002</button>.
            </p>
          </div>
        )}

        {activeResult && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            
            {/* Top Summary Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider">ORDER REFERENCE #{activeResult.orderId}</span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">{activeResult.bouquetTitle}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Recipient: <span className="font-semibold text-slate-800">{activeResult.customerName}</span></p>
              </div>

              <div className="bg-rose-50 px-4 py-2.5 rounded-xl border border-rose-200 text-right">
                <div className="text-[11px] text-slate-500 font-medium">Estimated Delivery:</div>
                <div className="font-bold text-rose-800 text-sm">{activeResult.estimatedDelivery}</div>
              </div>
            </div>

            {/* Visual Step Timeline */}
            <div className="space-y-6 pt-2">
              <h4 className="font-serif font-bold text-slate-900 text-base">Preparation & Delivery Progress</h4>

              <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {activeResult.trackingSteps.map((step, idx) => (
                  <div key={idx} className="relative group">
                    
                    {/* Circle Node */}
                    <div className={`absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      step.completed
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white border-2 border-slate-300 text-slate-400'
                    }`}>
                      {step.completed ? <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : idx + 1}
                    </div>

                    <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200">
                      <div className="flex justify-between items-center">
                        <span className={`font-bold text-xs sm:text-sm ${step.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                          {step.title}
                        </span>
                        {step.time && (
                          <span className="text-[11px] font-medium text-slate-400">{step.time}</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{step.description}</p>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Optional Photo Proof of Delivery */}
            {activeResult.deliveryPhoto && (
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Camera className="w-4 h-4 text-emerald-600" />
                  <span>Delivery Photo Confirmation Proof</span>
                </div>
                <div className="aspect-16/9 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={activeResult.deliveryPhoto}
                    alt="Delivery proof"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="bg-slate-900 text-white p-4 rounded-xl text-xs flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hand-Delivered with Recipient Signature & Temperature-controlled Vehicle</span>
              </span>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
