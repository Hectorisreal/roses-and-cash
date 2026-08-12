import React from 'react';
import { BouquetItem } from '../types';
import { X, Star, Flower2, ShieldCheck, Sparkles, Heart, ArrowRight } from 'lucide-react';

interface ProductQuickViewModalProps {
  item: BouquetItem | null;
  onClose: () => void;
  onCustomize: (item: BouquetItem) => void;
  isWishlisted: boolean;
  onToggleWishlist: (item: BouquetItem) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  item,
  onClose,
  onCustomize,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-slate-700 p-2 rounded-full shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2">
          
          {/* Left Column: Image Preview */}
          <div className="relative bg-slate-100 min-h-[280px] md:min-h-full">
            <img
              src={item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover min-h-[320px]"
            />
            
            {/* Tags Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
              {item.tags.map((tag, idx) => (
                <span key={idx} className="bg-slate-900/90 text-amber-300 text-[10px] font-semibold px-2.5 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => onToggleWishlist(item)}
              className="absolute bottom-4 left-4 bg-white p-2.5 rounded-full shadow-md text-slate-700 hover:text-rose-600 transition-colors"
              title={isWishlisted ? 'Remove from Favorites' : 'Add to Favorites'}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
            </button>
          </div>

          {/* Right Column: Specifications & Pricing */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 uppercase tracking-wider mb-1">
                <Flower2 className="w-3.5 h-3.5" />
                <span>{item.category.toUpperCase()} BOUQUET</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
                {item.title}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4 text-xs">
                <div className="flex items-center text-amber-600">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span className="font-bold text-slate-900 ml-1">{item.rating}</span>
                </div>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 font-medium">{item.reviewCount} verified reviews</span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Price Breakdown Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 mb-6">
                <div className="flex justify-between items-center text-xs text-slate-600">
                  <span>Craftsmanship & Floral Base:</span>
                  <span className="font-bold text-slate-900">GH₵{item.priceBase}</span>
                </div>

                {item.cashAmountDefault > 0 && (
                  <div className="flex justify-between items-center text-xs text-slate-600">
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      Included Cedi Cash Value:
                    </span>
                    <span className="font-bold text-emerald-700">GH₵{item.cashAmountDefault}</span>
                  </div>
                )}

                <div className="border-t border-slate-200 pt-2 flex justify-between items-center font-bold text-sm text-slate-900">
                  <span>Estimated Total Quote:</span>
                  <span className="text-lg text-rose-700">GH₵{(item.priceBase + item.cashAmountDefault).toLocaleString()}</span>
                </div>
              </div>

              {/* Specifications List */}
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">Design Specifications:</div>
                
                {item.cashAmountDefault > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500 font-medium shrink-0">Bill Arrangement:</span>
                    <span className="font-semibold text-slate-800">{item.billCountDefault}x GH₵{item.billDenominationDefault} Notes ({item.billStyle})</span>
                  </div>
                )}

                <div className="flex items-start gap-2">
                  <span className="text-slate-500 font-medium shrink-0">Fresh Stems Included:</span>
                  <span className="font-medium text-slate-800">{item.flowers.join(', ')}</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-slate-500 font-medium shrink-0">Wrapper Style:</span>
                  <span className="font-medium text-slate-800">{item.wrapperColor}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <button
                onClick={() => {
                  onCustomize(item);
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold py-3.5 px-6 rounded-xl shadow-md transition-all text-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Customize & Order This Design</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Cash Protection Guarantee. No staple or adhesive damage to notes.</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
