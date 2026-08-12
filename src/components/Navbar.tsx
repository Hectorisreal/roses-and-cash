import React, { useState } from 'react';
import { Flower2, Calculator, Grid, Star, Truck, Heart, HelpCircle, PhoneCall, Sparkles, Menu, X, ShoppingBag, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenAdvisor: () => void;
  onStartCustomOrder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  wishlistCount,
  onOpenWishlist,
  onOpenAdvisor,
  onStartCustomOrder,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'gallery', label: 'Online Gallery', icon: Grid },
    { id: 'calculator', label: 'Price Calculator', icon: Calculator },
    { id: 'custom', label: 'Custom Order', icon: Sparkles },
    { id: 'testimonials', label: 'Reviews', icon: Star },
    { id: 'tracker', label: 'Track Order', icon: Truck },
    { id: 'care', label: 'Care Guide', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-medium text-slate-300">Same-Day Accra & Kumasi Delivery for Orders Before 2 PM</span>
          </div>
          <div className="flex items-center gap-5 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Uncirculated Ghana Cedi Notes Guarantee</span>
            <a href="tel:+233505173382" className="flex items-center gap-1.5 hover:text-amber-300 transition-colors font-semibold text-slate-200">
              <PhoneCall className="w-3.5 h-3.5 text-rose-400" /> +233 50 517 3382
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <button 
            onClick={() => setActiveTab('gallery')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center border border-slate-800 shadow-sm group-hover:bg-rose-950 transition-colors">
              <Flower2 className="w-6 h-6 text-rose-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Roses & Cash</span>
                <span className="bg-rose-50 text-rose-800 text-[10px] font-semibold px-2 py-0.5 rounded border border-rose-200 uppercase tracking-wider">Ghana</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">Artisan Flower & Money Bouquets</p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Gift Advisor Button */}
            <button
              onClick={onOpenAdvisor}
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 px-3.5 py-2 rounded-lg transition-colors"
              title="Gift Recommendation Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Gift Finder</span>
            </button>

            {/* Favorites / Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="View Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Custom Order Primary CTA */}
            <button
              onClick={() => {
                onStartCustomOrder();
                setActiveTab('custom');
              }}
              className="flex items-center gap-1.5 bg-rose-700 hover:bg-rose-800 text-white text-xs sm:text-sm font-semibold px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg transition-colors active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline">Create Custom</span>
              <span className="xs:hidden">Custom</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-rose-50 text-rose-700 font-semibold border border-rose-200'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-rose-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-600">
            <button
              onClick={() => {
                onOpenAdvisor();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-amber-800 font-medium"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              Need help? Open Gift Finder
            </button>
            <a href="tel:+233505173382" className="flex items-center gap-1 text-slate-900 font-semibold">
              <PhoneCall className="w-3.5 h-3.5 text-rose-600" /> +233 50 517 3382
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
