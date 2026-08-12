import React, { useState, useMemo } from 'react';
import { BouquetItem, BouquetCategory } from '../types';
import { ProductQuickViewModal } from './ProductQuickViewModal';
import { Search, SlidersHorizontal, Star, Sparkles, Heart, Eye, Flower2, Layers, Gift, Banknote } from 'lucide-react';

interface GallerySectionProps {
  bouquets: BouquetItem[];
  onSelectForCustomOrder: (item: BouquetItem) => void;
  wishlistIds: string[];
  onToggleWishlist: (item: BouquetItem) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  bouquets,
  onSelectForCustomOrder,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<BouquetCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxBudget, setMaxBudget] = useState<number>(6000);
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'price-asc' | 'price-desc'>('featured');
  const [quickViewItem, setQuickViewItem] = useState<BouquetItem | null>(null);

  const categories: { id: BouquetCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'all', label: 'All Creations', icon: Layers },
    { id: 'money', label: 'Money Bouquets', icon: Banknote },
    { id: 'hybrid', label: 'Floral & Cash Hybrids', icon: Flower2 },
    { id: 'floral', label: 'Fresh Floral Only', icon: Flower2 },
    { id: 'box', label: 'Luxury Gift Boxes', icon: Gift },
  ];

  // Filtered & Sorted List
  const filteredBouquets = useMemo(() => {
    return bouquets
      .filter((b) => {
        const matchesCategory = selectedCategory === 'all' || b.category === selectedCategory;
        const totalCost = b.priceBase + b.cashAmountDefault;
        const matchesBudget = totalCost <= maxBudget;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          b.title.toLowerCase().includes(query) ||
          b.description.toLowerCase().includes(query) ||
          b.flowers.some((f) => f.toLowerCase().includes(query)) ||
          b.tags.some((t) => t.toLowerCase().includes(query));

        return matchesCategory && matchesBudget && matchesSearch;
      })
      .sort((a, b) => {
        const totalA = a.priceBase + a.cashAmountDefault;
        const totalB = b.priceBase + b.cashAmountDefault;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price-asc') return totalA - totalB;
        if (sortBy === 'price-desc') return totalB - totalA;
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      });
  }, [bouquets, selectedCategory, searchQuery, maxBudget, sortBy]);

  return (
    <section id="gallery" className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-slate-200/80 text-slate-800 text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wider">
            <Flower2 className="w-3.5 h-3.5 text-rose-600" />
            <span>Handcrafted Portfolio</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Curated Flower & Money Gallery
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Explore our signature arrangements or use any design as a baseline for your bespoke creation.
          </p>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-slate-200 mb-8 space-y-4">
          
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roses, money, graduation..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
              />
            </div>

            {/* Price Budget Slider */}
            <div className="w-full md:w-auto flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm">
              <SlidersHorizontal className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="text-slate-600 font-medium shrink-0">Max Budget:</span>
              <input
                type="range"
                min="300"
                max="10000"
                step="250"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-28 sm:w-36 accent-rose-600 cursor-pointer"
              />
              <span className="font-bold text-slate-900 shrink-0">GH₵{maxBudget.toLocaleString()}</span>
            </div>

            {/* Sort Selector */}
            <div className="w-full md:w-auto flex items-center gap-2">
              <span className="text-xs text-slate-500 shrink-0">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full md:w-auto bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              >
                <option value="featured">Featured & Best Sellers</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-400' : 'text-slate-500'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Gallery Grid */}
        {filteredBouquets.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">No arrangements found</h3>
            <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
              Try adjusting your max budget slider or search query to explore more flower and cash creations.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setMaxBudget(10000);
              }}
              className="mt-2 text-xs font-semibold text-rose-600 hover:text-rose-700 underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBouquets.map((b) => {
              const isWishlisted = wishlistIds.includes(b.id);
              const totalQuote = b.priceBase + b.cashAmountDefault;

              return (
                <div
                  key={b.id}
                  className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Container */}
                  <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                    <img
                      src={b.image}
                      alt={b.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {b.isBestSeller && (
                        <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                          Best Seller
                        </span>
                      )}
                      {b.isNew && (
                        <span className="bg-rose-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                          New Design
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(b);
                      }}
                      className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-xs text-slate-700 hover:text-rose-600 transition-colors"
                      title={isWishlisted ? 'Saved' : 'Save to Favorites'}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                    </button>

                    {/* Quick View Floating Button */}
                    <button
                      onClick={() => setQuickViewItem(b)}
                      className="absolute bottom-3 right-3 bg-slate-900 hover:bg-slate-800 text-white p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    
                    <div>
                      {/* Rating & Category */}
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-500 font-medium uppercase text-[10px] tracking-wider">
                          {b.category} BOUQUET
                        </span>
                        <div className="flex items-center text-amber-600 font-bold text-[11px]">
                          <Star className="w-3.5 h-3.5 fill-amber-500 mr-1" />
                          <span>{b.rating}</span>
                          <span className="text-slate-400 font-normal ml-1">({b.reviewCount})</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 
                        onClick={() => setQuickViewItem(b)}
                        className="font-serif font-bold text-slate-900 text-base group-hover:text-rose-700 transition-colors cursor-pointer line-clamp-1"
                      >
                        {b.title}
                      </h3>

                      {/* Description / Flowers */}
                      <p className="text-slate-500 text-xs line-clamp-2 mt-1">
                        {b.flowers.join(' • ')}
                      </p>
                    </div>

                    {/* Price Breakdown Badge */}
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">Floral Craftsmanship:</span>
                        <span className="font-semibold text-slate-800">GH₵{b.priceBase}</span>
                      </div>

                      {b.cashAmountDefault > 0 && (
                        <div className="flex justify-between items-center text-xs text-emerald-700 font-medium">
                          <span>Cedi Cash Value:</span>
                          <span className="font-bold">GH₵{b.cashAmountDefault}</span>
                        </div>
                      )}

                      <div className="pt-1 border-t border-slate-200 flex justify-between items-center text-xs sm:text-sm font-bold text-slate-900">
                        <span>Total Quote:</span>
                        <span className="text-rose-700 text-base">GH₵{totalQuote.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => setQuickViewItem(b)}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-2 rounded-lg text-xs transition-colors"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => onSelectForCustomOrder(b)}
                        className="w-full bg-rose-700 hover:bg-rose-800 text-white font-medium py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>Customize</span>
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Quick View Modal */}
      {quickViewItem && (
        <ProductQuickViewModal
          item={quickViewItem}
          onClose={() => setQuickViewItem(null)}
          onCustomize={onSelectForCustomOrder}
          isWishlisted={wishlistIds.includes(quickViewItem.id)}
          onToggleWishlist={onToggleWishlist}
        />
      )}
    </section>
  );
};
