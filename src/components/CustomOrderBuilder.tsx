import React, { useState } from 'react';
import { CustomOrderState, BouquetCategory, Occasion } from '../types';
import { FLOWER_SPECIES_OPTIONS, WRAPPER_COLOR_OPTIONS, RIBBON_OPTIONS } from '../data/mockData';
import { Sparkles, Flower2, Gift, Send, CheckCircle2, Calendar, Clock, MapPin, User, MessageSquare, Copy, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface CustomOrderBuilderProps {
  initialState?: Partial<CustomOrderState>;
  onOrderSubmitted: (orderId: string, orderDetails: CustomOrderState) => void;
}

export const CustomOrderBuilder: React.FC<CustomOrderBuilderProps> = ({
  initialState,
  onOrderSubmitted,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [createdOrderId, setCreatedOrderId] = useState<string>('');

  // Form State
  const [form, setForm] = useState<CustomOrderState>({
    category: initialState?.category || 'hybrid',
    cashAmount: initialState?.cashAmount ?? 1000,
    billDenomination: initialState?.billDenomination ?? 50,
    billCount: initialState?.billCount ?? 20,
    billStyle: initialState?.billStyle || 'Heart Sleeve Protection Roll',
    flowerChoice: initialState?.flowerChoice || ['Blush Pink Peonies', 'White Gypsophila (Babys Breath)'],
    colorPalette: initialState?.colorPalette || 'Pastel Pink & Cream',
    wrapperColor: initialState?.wrapperColor || 'Korean Matte Blush Pink',
    ribbonColor: initialState?.ribbonColor || 'Gold Foil Satin',
    addOns: {
      fairyLights: initialState?.addOns?.fairyLights ?? true,
      crownTopper: initialState?.addOns?.crownTopper ?? false,
      luxuryBox: initialState?.addOns?.luxuryBox ?? false,
      chocolates: initialState?.addOns?.chocolates ?? false,
      plushBear: initialState?.addOns?.plushBear ?? false,
      printedCard: initialState?.addOns?.printedCard ?? true,
    },
    cardMessage: initialState?.cardMessage || 'Happy Birthday Abena! Wishing you grace, blessings, and prosperity.',
    occasion: initialState?.occasion || 'birthday',
    deliveryType: initialState?.deliveryType || 'standard',
    deliveryDate: initialState?.deliveryDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    deliveryTimeSlot: initialState?.deliveryTimeSlot || '2:00 PM - 5:00 PM',
    recipientName: initialState?.recipientName || 'Abena Osei',
    recipientPhone: initialState?.recipientPhone || '+233 24 412 3456',
    deliveryAddress: initialState?.deliveryAddress || 'Plot 12, East Legon, Accra',
    specialInstructions: initialState?.specialInstructions || 'Call recipient before delivery',
    senderName: initialState?.senderName || 'Kwame Mensah',
    senderPhone: initialState?.senderPhone || '+233 50 517 3382',
    senderEmail: initialState?.senderEmail || 'kwame@example.com',
  });

  // Calculate live quote
  const calculatedBillCount = Math.ceil(form.cashAmount / (form.billDenomination || 1));
  const billLaborFee = calculatedBillCount * 2.5;
  const flowerCost = form.flowerChoice.length * 80 + 150;
  const wrapperCost = 50;
  const addOnsTotal =
    (form.addOns.fairyLights ? 35 : 0) +
    (form.addOns.crownTopper ? 50 : 0) +
    (form.addOns.luxuryBox ? 120 : 0) +
    (form.addOns.chocolates ? 60 : 0) +
    (form.addOns.printedCard ? 20 : 0);

  const deliveryCost = form.deliveryType === 'express' ? 80 : form.deliveryType === 'standard' ? 40 : 0;
  const serviceSubtotal = billLaborFee + flowerCost + wrapperCost + addOnsTotal + deliveryCost;
  const grandTotal = form.cashAmount + serviceSubtotal;

  const handleFlowerToggle = (flowerName: string) => {
    setForm((prev) => {
      const exists = prev.flowerChoice.includes(flowerName);
      if (exists) {
        if (prev.flowerChoice.length === 1) return prev; // keep at least 1
        return { ...prev, flowerChoice: prev.flowerChoice.filter((f) => f !== flowerName) };
      } else {
        return { ...prev, flowerChoice: [...prev.flowerChoice, flowerName] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `RC-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedOrderId(newId);
    setIsSubmitted(true);
    onOrderSubmitted(newId, form);
  };

  const handleCopyQuote = () => {
    const summary = `Roses & Cash Order Quote ${createdOrderId}\nRecipient: ${form.recipientName}\nOccasion: ${form.occasion}\nCedi Value: GH₵${form.cashAmount}\nService & Flowers: GH₵${serviceSubtotal.toFixed(2)}\nGrand Total: GH₵${grandTotal.toFixed(2)}`;
    navigator.clipboard.writeText(summary);
    alert('Quote details copied to clipboard!');
  };

  if (isSubmitted) {
    return (
      <section id="custom" className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                Custom Order Request Received
              </span>
              <h2 className="font-serif text-3xl font-bold text-slate-900">
                Order Reference: <span className="text-rose-700">#{createdOrderId}</span>
              </h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Thank you, <span className="font-semibold text-slate-800">{form.senderName}</span>! Our artisan florists in Accra are reviewing your custom specifications.
              </p>
            </div>

            {/* Summary Ticket */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-left space-y-4 text-xs sm:text-sm">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3 font-bold text-slate-900">
                <span>Design: Custom {form.category.toUpperCase()} Bouquet</span>
                <span className="text-rose-700 text-base">GH₵{grandTotal.toLocaleString()}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-600">
                <div>
                  <span className="text-slate-500 block text-[11px]">Recipient:</span>
                  <span className="font-semibold text-slate-800">{form.recipientName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Delivery Date:</span>
                  <span className="font-semibold text-slate-800">{form.deliveryDate} ({form.deliveryTimeSlot})</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Cedi Cash Value:</span>
                  <span className="font-bold text-emerald-700">GH₵{form.cashAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Selected Flowers:</span>
                  <span className="font-medium text-slate-800">{form.flowerChoice.join(', ')}</span>
                </div>
              </div>

              {form.cardMessage && (
                <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 text-slate-800 font-serif italic text-xs">
                  "{form.cardMessage}"
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleCopyQuote}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Order Quote</span>
              </button>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setStep(1);
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Build Another Bouquet</span>
              </button>
            </div>

          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="custom" className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-slate-200/80 text-slate-800 text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-rose-700" />
            <span>Interactive Bespoke Studio</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Custom Bouquet Builder
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Design your exact bouquet step by step: select cash amount, flower palette, wrapping styles, and personalized card notes.
          </p>
        </div>

        {/* Step Progress Tracker */}
        <div className="max-w-3xl mx-auto mb-8 bg-white p-3 rounded-xl shadow-xs border border-slate-200">
          <div className="flex items-center justify-between text-xs font-medium">
            {[
              { num: 1, label: 'Bouquet Type' },
              { num: 2, label: 'Cedi Bills' },
              { num: 3, label: 'Floral Palette' },
              { num: 4, label: 'Wrappers & Card' },
              { num: 5, label: 'Delivery Details' },
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => setStep(s.num)}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors ${
                  step === s.num
                    ? 'bg-slate-900 text-white font-bold'
                    : step > s.num
                    ? 'text-rose-700 font-semibold'
                    : 'text-slate-400'
                }`}
              >
                <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] ${
                  step === s.num ? 'bg-rose-700 text-white font-bold' : step > s.num ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-400'
                }`}>
                  {s.num}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Builder Main Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Step Form Area */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: Bouquet Category */}
              {step === 1 && (
                <div className="space-y-5">
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    Step 1: Choose Your Bouquet Architecture
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'hybrid', title: 'Deluxe Hybrid (Flowers + Money)', desc: 'Combine fresh roses with folded Ghana Cedi banknotes in protective sleeves.' },
                      { id: 'money', title: 'Pure Money Bouquet', desc: 'Focus entirely on folded Cedi note arrangements (fans, rolls, origami).' },
                      { id: 'floral', title: 'Fresh Floral Bouquet', desc: 'Traditional artisan arrangement with zero cash included.' },
                      { id: 'box', title: 'Luxury Acrylic Box', desc: 'Preserved roses on top with a secret pull-out cash drawer underneath.' },
                    ].map((cat) => (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setForm((p) => ({ ...p, category: cat.id as BouquetCategory }))}
                        className={`p-5 rounded-xl border text-left transition-all ${
                          form.category === cat.id
                            ? 'bg-rose-50 border-rose-600 ring-1 ring-rose-600'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="font-bold text-slate-900 text-base">{cat.title}</div>
                        <div className="text-xs text-slate-500 mt-1">{cat.desc}</div>
                      </button>
                    ))}
                  </div>

                  {/* Occasion Selection */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">What is the Special Occasion?</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'birthday', label: 'Birthday' },
                        { id: 'anniversary', label: 'Anniversary' },
                        { id: 'graduation', label: 'Graduation' },
                        { id: 'wedding', label: 'Wedding' },
                        { id: 'valentines', label: 'Romance' },
                        { id: 'corporate', label: 'Corporate' },
                      ].map((occ) => (
                        <button
                          type="button"
                          key={occ.id}
                          onClick={() => setForm((p) => ({ ...p, occasion: occ.id as Occasion }))}
                          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                            form.occasion === occ.id
                              ? 'bg-slate-900 text-white font-bold'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {occ.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Cash Value & Denomination */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    Step 2: Money Configuration & Cedi Denominations
                  </h3>

                  {form.category === 'floral' ? (
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs sm:text-sm">
                      You selected <strong>Fresh Floral Only</strong>. No cash notes will be included in this arrangement.
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Total Cash Amount Included (GH₵)</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[200, 500, 1000, 2000, 5000].map((amt) => (
                            <button
                              type="button"
                              key={amt}
                              onClick={() => setForm((p) => ({ ...p, cashAmount: amt }))}
                              className={`py-3 px-3 rounded-lg text-xs font-bold transition-all border ${
                                form.cashAmount === amt
                                  ? 'bg-emerald-700 text-white border-emerald-700'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              GH₵{amt.toLocaleString()}
                            </button>
                          ))}
                        </div>

                        <div className="pt-2 flex items-center gap-3">
                          <span className="text-xs text-slate-500 font-medium">Custom Cedi Amount:</span>
                          <input
                            type="number"
                            min="0"
                            max="20000"
                            step="100"
                            value={form.cashAmount}
                            onChange={(e) => setForm((p) => ({ ...p, cashAmount: Math.max(0, Number(e.target.value)) }))}
                            className="w-36 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Banknote Denomination</label>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {[10, 20, 50, 100, 200].map((denom) => (
                            <button
                              type="button"
                              key={denom}
                              onClick={() => setForm((p) => ({ ...p, billDenomination: denom }))}
                              className={`py-2 px-3 rounded-lg text-xs font-bold border ${
                                form.billDenomination === denom
                                  ? 'bg-slate-900 text-white border-slate-900'
                                  : 'bg-slate-50 text-slate-700 border-slate-200'
                              }`}
                            >
                              GH₵{denom} Notes
                            </button>
                          ))}
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Total banknote count: <strong>{calculatedBillCount} bills</strong>
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Bill Folding Style</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { title: 'Heart Sleeve Protection Roll', desc: 'Individual sleeves rolled into heart shapes.' },
                            { title: 'Fan Fold with Gold Trim', desc: 'Layered fan layout surrounding flowers.' },
                            { title: 'Rose Bud Banknote Scroll', desc: 'Banknotes sculpted into floral buds.' },
                            { title: 'Origami Butterfly Sculpt', desc: 'Folded like delicate floating butterflies.' },
                          ].map((style, idx) => (
                            <button
                              type="button"
                              key={idx}
                              onClick={() => setForm((p) => ({ ...p, billStyle: style.title }))}
                              className={`p-3 rounded-lg border text-left transition-all ${
                                form.billStyle === style.title
                                  ? 'bg-rose-50 border-rose-600 ring-1 ring-rose-600'
                                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              <div className="font-bold text-slate-900 text-xs">{style.title}</div>
                              <div className="text-[11px] text-slate-500">{style.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: Floral Choices & Palette */}
              {step === 3 && (
                <div className="space-y-5">
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    Step 3: Fresh Floral Selection & Palette
                  </h3>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Select Desired Flowers (Choose 1-3)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {FLOWER_SPECIES_OPTIONS.map((flower) => {
                        const isSelected = form.flowerChoice.includes(flower.name);
                        return (
                          <button
                            type="button"
                            key={flower.name}
                            onClick={() => handleFlowerToggle(flower.name)}
                            className={`p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                              isSelected
                                ? 'bg-rose-50 border-rose-600 font-semibold text-rose-950'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span className="text-xs">{flower.name}</span>
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'bg-rose-700 border-rose-700 text-white' : 'border-slate-300'}`}>
                              {isSelected && <CheckCircle2 className="w-3 h-3" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Color Palette Theme</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Pastel Pink & Cream', 'Royal Blue & Gold', 'Romantic Velvet Red', 'Sunshine Yellow & White'].map((palette) => (
                        <button
                          type="button"
                          key={palette}
                          onClick={() => setForm((p) => ({ ...p, colorPalette: palette }))}
                          className={`p-2.5 rounded-lg border text-xs font-medium transition-all ${
                            form.colorPalette === palette
                              ? 'bg-slate-900 text-white border-slate-900 font-bold'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {palette}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Wrapper, Ribbon & Message */}
              {step === 4 && (
                <div className="space-y-5">
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    Step 4: Wrapping Colors & Greeting Note
                  </h3>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Wrapping Paper Style</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {WRAPPER_COLOR_OPTIONS.map((w) => (
                        <button
                          type="button"
                          key={w.name}
                          onClick={() => setForm((p) => ({ ...p, wrapperColor: w.name }))}
                          className={`p-3 rounded-lg border text-left flex items-center gap-3 text-xs font-medium transition-all ${
                            form.wrapperColor === w.name
                              ? 'bg-rose-50 border-rose-600 font-bold text-slate-900'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className="w-4 h-4 rounded-full shadow-xs shrink-0 border border-slate-300" style={{ backgroundColor: w.hex }}></span>
                          <span>{w.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Ribbon Finish</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {RIBBON_OPTIONS.map((r) => (
                        <button
                          type="button"
                          key={r.name}
                          onClick={() => setForm((p) => ({ ...p, ribbonColor: r.name }))}
                          className={`p-2.5 rounded-lg border text-xs font-medium flex items-center gap-2 ${
                            form.ribbonColor === r.name
                              ? 'bg-slate-900 text-white font-bold'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: r.hex }}></span>
                          <span className="truncate">{r.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Personalized Card Message</label>
                    <textarea
                      rows={3}
                      value={form.cardMessage}
                      onChange={(e) => setForm((p) => ({ ...p, cardMessage: e.target.value }))}
                      placeholder="Write your message here..."
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: Recipient & Delivery Info */}
              {step === 5 && (
                <div className="space-y-5">
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    Step 5: Recipient Details & Delivery Logistics
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Recipient Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.recipientName}
                        onChange={(e) => setForm((p) => ({ ...p, recipientName: e.target.value }))}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Recipient Phone *</label>
                      <input
                        type="text"
                        required
                        value={form.recipientPhone}
                        onChange={(e) => setForm((p) => ({ ...p, recipientPhone: e.target.value }))}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Delivery Address (Accra, Kumasi, Tema) *</label>
                    <input
                      type="text"
                      required
                      value={form.deliveryAddress}
                      onChange={(e) => setForm((p) => ({ ...p, deliveryAddress: e.target.value }))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Preferred Delivery Date</label>
                      <input
                        type="date"
                        value={form.deliveryDate}
                        onChange={(e) => setForm((p) => ({ ...p, deliveryDate: e.target.value }))}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Time Window Slot</label>
                      <select
                        value={form.deliveryTimeSlot}
                        onChange={(e) => setForm((p) => ({ ...p, deliveryTimeSlot: e.target.value }))}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm"
                      >
                        <option value="9:00 AM - 12:00 PM">Morning (9:00 AM - 12:00 PM)</option>
                        <option value="2:00 PM - 5:00 PM">Afternoon (2:00 PM - 5:00 PM)</option>
                        <option value="6:00 PM - 9:00 PM">Evening Surprise (6:00 PM - 9:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Sender Name</label>
                      <input
                        type="text"
                        required
                        value={form.senderName}
                        onChange={(e) => setForm((p) => ({ ...p, senderName: e.target.value }))}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Sender Phone</label>
                      <input
                        type="text"
                        required
                        value={form.senderPhone}
                        onChange={(e) => setForm((p) => ({ ...p, senderPhone: e.target.value }))}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Sender Email</label>
                      <input
                        type="email"
                        required
                        value={form.senderEmail}
                        onChange={(e) => setForm((p) => ({ ...p, senderEmail: e.target.value }))}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Delivery Notes</label>
                    <input
                      type="text"
                      value={form.specialInstructions}
                      onChange={(e) => setForm((p) => ({ ...p, specialInstructions: e.target.value }))}
                      placeholder="e.g. Call before arrival / Hand deliver directly to recipient"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Navigation Bar inside Builder */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : <div></div>}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg text-xs font-bold shadow-xs"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all text-sm active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Order Request</span>
                  </button>
                )}
              </div>

            </form>

          </div>

          {/* Right Summary Panel */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-5 border border-slate-800">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-serif font-bold text-lg text-white">Order Summary</h3>
                <span className="bg-slate-800 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700 uppercase">
                  {form.category}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                
                {form.category !== 'floral' && (
                  <div className="flex justify-between items-center text-emerald-400 font-semibold">
                    <span>Cedi Cash Value:</span>
                    <span>GH₵{form.cashAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-slate-300">
                  <span>Selected Flowers:</span>
                  <span className="font-medium text-right max-w-[150px] truncate">{form.flowerChoice.join(', ')}</span>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span>Wrapper Style:</span>
                  <span className="font-medium">{form.wrapperColor}</span>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span>Floral Craftsmanship Fee:</span>
                  <span className="font-semibold">GH₵{serviceSubtotal.toFixed(2)}</span>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm font-bold">
                  <span>Estimated Total:</span>
                  <span className="text-amber-400 font-serif text-xl">GH₵{grandTotal.toLocaleString()}</span>
                </div>

              </div>

              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-[11px] text-slate-400 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Zero obligation quote. Our florist calls to confirm banknote choices prior to assembly.</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
