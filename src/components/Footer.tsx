import React from 'react';
import { Flower2, ShieldCheck, PhoneCall, Mail, MapPin, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-rose-700 flex items-center justify-center">
                <Flower2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif text-2xl font-bold text-white">Roses & Cash</span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Ghana's premier artisan studio for bespoke flower bouquets, money arrangements, and luxury Cedi gift boxes. Guaranteed 100% crisp banknotes with zero pinholes or tape damage.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Licensed & Secure Cash Handling Studio in Accra</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm">Services</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-amber-300 transition-colors">
                  Online Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('calculator')} className="hover:text-amber-300 transition-colors">
                  Price Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('custom')} className="hover:text-amber-300 transition-colors">
                  Custom Order Form
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('testimonials')} className="hover:text-amber-300 transition-colors">
                  Client Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm">Customer Care</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('tracker')} className="hover:text-amber-300 transition-colors">
                  Track Order Status
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('care')} className="hover:text-amber-300 transition-colors">
                  Cedi Note Unwrapping Guide
                </button>
              </li>
              <li>
                <a href="#care" onClick={() => onNavigate('care')} className="hover:text-amber-300 transition-colors">
                  Fresh Flower Care
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-xs text-slate-400">
            <h4 className="font-serif font-bold text-white text-sm">Studio Contact</h4>
            
            <div className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <a href="tel:+233505173382" className="hover:text-amber-300 transition-colors">+233 50 517 3382</a>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>orders@rosesandcash.com</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Mon - Sun: 7:00 AM - 9:00 PM</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Accra, Kumasi & Tema Delivery</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 Roses & Cash. All rights reserved.</p>
          <p className="text-slate-400">
            Handcrafted with care for life’s special celebrations in Ghana.
          </p>
        </div>

      </div>
    </footer>
  );
};
