import React from 'react';
import { BouquetItem } from '../types';
import { X, Heart, Trash2, Sparkles } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedItems: BouquetItem[];
  onRemoveFromWishlist: (item: BouquetItem) => void;
  onCustomize: (item: BouquetItem) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistedItems,
  onRemoveFromWishlist,
  onCustomize,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
              <h3 className="font-serif font-bold text-xl text-slate-900">Saved Favorites</h3>
              <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2 py-0.5 rounded">
                {wishlistedItems.length}
              </span>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Items */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {wishlistedItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Heart className="w-12 h-12 text-slate-200 mx-auto" />
                <p className="font-serif font-bold text-slate-800">No saved bouquets yet</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Click the heart icon on any bouquet in our gallery to bookmark your favorite designs.
                </p>
              </div>
            ) : (
              wishlistedItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200 items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">{item.title}</h4>
                    <div className="text-[11px] text-slate-500 truncate">{item.flowers.join(', ')}</div>
                    <div className="text-xs font-bold text-rose-700 mt-1">
                      GH₵{(item.priceBase + item.cashAmountDefault).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onCustomize(item);
                        onClose();
                      }}
                      className="p-2 bg-rose-700 text-white rounded-lg text-xs hover:bg-rose-800 transition-colors"
                      title="Order this design"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(item)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {wishlistedItems.length > 0 && (
            <div className="p-6 border-t border-slate-100">
              <button
                onClick={onClose}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-md transition-colors"
              >
                Continue Browsing Gallery
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
