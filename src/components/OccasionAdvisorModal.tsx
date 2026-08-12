import React, { useState } from 'react';
import { BouquetItem } from '../types';
import { X, Sparkles } from 'lucide-react';

interface OccasionAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  bouquets: BouquetItem[];
  onSelectBouquet: (item: BouquetItem) => void;
}

export const OccasionAdvisorModal: React.FC<OccasionAdvisorModalProps> = ({
  isOpen,
  onClose,
  bouquets,
  onSelectBouquet,
}) => {
  const [recipient, setRecipient] = useState<'partner' | 'parent' | 'friend' | 'graduate' | 'colleague'>('partner');
  const [occasion, setOccasion] = useState<'birthday' | 'anniversary' | 'graduation' | 'romance'>('birthday');
  const [budget, setBudget] = useState<number>(1000);

  if (!isOpen) return null;

  // Filter recommendations
  const matches = bouquets
    .filter((b) => {
      const totalCost = b.priceBase + b.cashAmountDefault;
      return totalCost <= budget + 500;
    })
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative border border-slate-200 my-8">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider border border-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-rose-700" />
              <span>Curated Gift Selector</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              Find the Perfect Bouquet
            </h3>
            <p className="text-slate-500 text-xs">
              Select your preferences to discover tailored flower & cash recommendations in Ghana.
            </p>
          </div>

          {/* Question 1: Recipient */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-700">1. Who is the recipient?</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'partner', label: 'Partner' },
                { id: 'parent', label: 'Parent' },
                { id: 'friend', label: 'Friend' },
                { id: 'graduate', label: 'Graduate' },
                { id: 'colleague', label: 'Colleague' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRecipient(r.id as any)}
                  className={`p-2.5 rounded-lg border text-xs font-medium transition-all ${
                    recipient === r.id
                      ? 'bg-rose-700 text-white font-bold border-rose-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Occasion */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-700">2. What are you celebrating?</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'birthday', label: 'Birthday' },
                { id: 'anniversary', label: 'Anniversary' },
                { id: 'graduation', label: 'Graduation' },
                { id: 'romance', label: 'Romance' },
              ].map((o) => (
                <button
                  key={o.id}
                  onClick={() => setOccasion(o.id as any)}
                  className={`p-2.5 rounded-lg border text-xs font-medium transition-all ${
                    occasion === o.id
                      ? 'bg-slate-900 text-white font-bold border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Budget */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold uppercase text-slate-700">3. Target Budget (Flowers + Cedi Cash)</label>
              <span className="font-bold text-rose-700 text-sm">GH₵{budget.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="200"
              max="5000"
              step="100"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-rose-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
          </div>

          {/* Recommended Matches */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="font-serif font-bold text-slate-900 text-sm">Top Recommended Curations for You:</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {matches.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectBouquet(item);
                    onClose();
                  }}
                  className="group bg-slate-50 p-3 rounded-xl border border-slate-200 cursor-pointer hover:border-rose-600 hover:shadow-md transition-all text-left"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full aspect-4/3 rounded-lg object-cover mb-2"
                  />
                  <div className="font-bold text-slate-900 text-xs line-clamp-1 group-hover:text-rose-700">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Total Quote: <span className="font-bold text-rose-700">GH₵{(item.priceBase + item.cashAmountDefault).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
