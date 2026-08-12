import React, { useState } from 'react';
import { Testimonial, BouquetCategory } from '../types';
import { Star, ThumbsUp, CheckCircle2, MessageSquarePlus, X } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onAddTestimonial: (testimonial: Testimonial) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onAddTestimonial,
}) => {
  const [filterCategory, setFilterCategory] = useState<BouquetCategory | 'all'>('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // New review form
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [bouquetTitle, setBouquetTitle] = useState('Romantic Blush Hybrid Bouquet');
  const [bouquetType, setBouquetType] = useState<BouquetCategory>('hybrid');
  const [occasion, setOccasion] = useState('Birthday');
  const [comment, setComment] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const filtered = testimonials.filter(
    (t) => filterCategory === 'all' || t.bouquetType === filterCategory
  );

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newRev: Testimonial = {
      id: `t-${Date.now()}`,
      customerName: name,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`,
      rating,
      date: 'Just now',
      bouquetTitle,
      bouquetType,
      comment,
      photoUrl: photoUrl || undefined,
      verified: true,
      occasion,
      helpfulCount: 1,
    };

    onAddTestimonial(newRev);
    setIsWriteModalOpen(false);
    setName('');
    setComment('');
    setPhotoUrl('');
  };

  return (
    <section id="testimonials" className="py-12 sm:py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wider border border-slate-200">
              <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>4.95 / 5.0 Rating Across Ghana</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Customer Testimonials & Verified Deliveries
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Read verified feedback from clients across Accra, Kumasi, and Tema who celebrated milestones with our cash & flower arrangements.
            </p>
          </div>

          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="self-start md:self-auto flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-5 rounded-xl text-xs sm:text-sm shadow-sm transition-all shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4 text-amber-300" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'hybrid', label: 'Flower & Cash Hybrids' },
            { id: 'money', label: 'Money Bouquets' },
            { id: 'floral', label: 'Fresh Floral' },
            { id: 'box', label: 'Acrylic Boxes' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterCategory === cat.id
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* User Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.customerName}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-1">
                        <span>{t.customerName}</span>
                        {t.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" title="Verified Order" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500">{t.date} • {t.occasion}</div>
                    </div>
                  </div>

                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < t.rating ? 'fill-amber-500' : 'text-slate-300'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Bouquet Title Badge */}
                <div className="inline-block bg-white px-2.5 py-1 rounded border border-slate-200 text-[11px] font-semibold text-rose-800">
                  Purchased: {t.bouquetTitle}
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  "{t.comment}"
                </p>

                {/* Optional Customer Photo */}
                {t.photoUrl && (
                  <div className="mt-2 aspect-16/10 rounded-lg overflow-hidden bg-slate-200 border border-slate-200">
                    <img
                      src={t.photoUrl}
                      alt="Customer received bouquet"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Helpful footer */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3 text-slate-400" />
                  <span>{t.helpfulCount} people found this helpful</span>
                </span>
                <span className="text-emerald-700 font-semibold">Verified Buyer</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-1">
              Share Your Experience
            </h3>
            <p className="text-slate-500 text-xs mb-6">
              Your feedback helps other clients choose the perfect money & flower bouquet in Ghana.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ama Serwaa"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Star Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Occasion</label>
                  <input
                    type="text"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    placeholder="e.g. Birthday"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Bouquet Style</label>
                <input
                  type="text"
                  value={bouquetTitle}
                  onChange={(e) => setBouquetTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Review Comments *</label>
                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="How was the bouquet quality, delivery speed, and recipient reaction?"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Photo URL (Optional)</label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-rose-700 hover:bg-rose-800 text-white font-bold py-3 rounded-lg shadow-md transition-all mt-2"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
