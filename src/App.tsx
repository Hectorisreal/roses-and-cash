import React, { useState } from 'react';
import { BouquetItem, CustomOrderState, Testimonial, OrderTrackResult } from './types';
import { INITIAL_BOUQUETS, INITIAL_TESTIMONIALS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GallerySection } from './components/GallerySection';
import { PriceCalculatorSection } from './components/PriceCalculatorSection';
import { CustomOrderBuilder } from './components/CustomOrderBuilder';
import { TestimonialsSection } from './components/TestimonialsSection';
import { OrderTracker } from './components/OrderTracker';
import { CareGuideSection } from './components/CareGuideSection';
import { WishlistDrawer } from './components/WishlistDrawer';
import { OccasionAdvisorModal } from './components/OccasionAdvisorModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('gallery');
  const [bouquets] = useState<BouquetItem[]>(INITIAL_BOUQUETS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  
  // Wishlist / Bookmarks
  const [wishlistIds, setWishlistIds] = useState<string[]>(['mb-01', 'hy-02']);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  // Gift Advisor Modal
  const [isAdvisorOpen, setIsAdvisorOpen] = useState<boolean>(false);

  // Custom Order pre-filled state
  const [customOrderInitialState, setCustomOrderInitialState] = useState<Partial<CustomOrderState>>({});

  // Created Order tracking database in memory
  const [customOrdersMap, setCustomOrdersMap] = useState<Record<string, OrderTrackResult>>({});

  // Handlers
  const handleToggleWishlist = (item: BouquetItem) => {
    setWishlistIds((prev) =>
      prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
    );
  };

  const handleSelectForCustomOrder = (item: BouquetItem) => {
    setCustomOrderInitialState({
      category: item.category,
      cashAmount: item.cashAmountDefault,
      billDenomination: item.billDenominationDefault,
      billCount: item.billCountDefault,
      billStyle: item.billStyle,
      flowerChoice: item.flowers,
      wrapperColor: item.wrapperColor,
    });
    setActiveTab('custom');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyCalculatorEstimate = (estimate: Partial<CustomOrderState>) => {
    setCustomOrderInitialState((prev) => ({
      ...prev,
      ...estimate,
    }));
  };

  const handleOrderSubmitted = (orderId: string, details: CustomOrderState) => {
    const newTracking: OrderTrackResult = {
      orderId,
      customerName: details.recipientName,
      bouquetTitle: `Custom ${details.category.toUpperCase()} Bouquet (GH₵${details.cashAmount} Cash)`,
      status: 'confirmed',
      estimatedDelivery: `${details.deliveryDate} (${details.deliveryTimeSlot})`,
      trackingSteps: [
        { title: 'Order Confirmed', description: 'Order authorized. Banknotes selected from mint vault.', completed: true, time: 'Just now' },
        { title: 'Bill Sleeving & Folding', description: `Sleeving ${details.billCount}x GH₵${details.billDenomination} notes in protective sleeves.`, completed: false },
        { title: 'Floral Styling & Arrangement', description: `Arranging ${details.flowerChoice.join(', ')}.`, completed: false },
        { title: 'Out for Courier Delivery', description: 'En route to recipient address in Ghana.', completed: false },
        { title: 'Hand-Delivered with Photo', description: 'Awaiting hand delivery confirmation.', completed: false },
      ],
    };

    setCustomOrdersMap((prev) => ({
      ...prev,
      [orderId]: newTracking,
    }));
  };

  const wishlistedItems = bouquets.filter((b) => wishlistIds.includes(b.id));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-rose-700 selection:text-white">
      
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onStartCustomOrder={() => {
          setCustomOrderInitialState({});
          setActiveTab('custom');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Always display Hero on Gallery or Home tab */}
        {(activeTab === 'gallery' || activeTab === 'all') && (
          <Hero
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAdvisor={() => setIsAdvisorOpen(true)}
          />
        )}

        {/* Tab-driven View Switching */}
        {activeTab === 'gallery' && (
          <GallerySection
            bouquets={bouquets}
            onSelectForCustomOrder={handleSelectForCustomOrder}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {activeTab === 'calculator' && (
          <PriceCalculatorSection
            onApplyEstimateToOrder={handleApplyCalculatorEstimate}
            onNavigateToCustomOrder={() => {
              setActiveTab('custom');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'custom' && (
          <CustomOrderBuilder
            initialState={customOrderInitialState}
            onOrderSubmitted={handleOrderSubmitted}
          />
        )}

        {activeTab === 'testimonials' && (
          <TestimonialsSection
            testimonials={testimonials}
            onAddTestimonial={(newReview) => setTestimonials([newReview, ...testimonials])}
          />
        )}

        {activeTab === 'tracker' && (
          <OrderTracker customOrdersMap={customOrdersMap} />
        )}

        {activeTab === 'care' && (
          <CareGuideSection />
        )}

        {/* Cross-promotional showcase on Gallery view */}
        {activeTab === 'gallery' && (
          <>
            <PriceCalculatorSection
              onApplyEstimateToOrder={handleApplyCalculatorEstimate}
              onNavigateToCustomOrder={() => {
                setActiveTab('custom');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <TestimonialsSection
              testimonials={testimonials}
              onAddTestimonial={(newReview) => setTestimonials([newReview, ...testimonials])}
            />
          </>
        )}

      </main>

      {/* Footer */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Modals & Drawers */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedItems={wishlistedItems}
        onRemoveFromWishlist={handleToggleWishlist}
        onCustomize={handleSelectForCustomOrder}
      />

      <OccasionAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        bouquets={bouquets}
        onSelectBouquet={handleSelectForCustomOrder}
      />

    </div>
  );
}
