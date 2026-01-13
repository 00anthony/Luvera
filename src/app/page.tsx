
import React from 'react';
import Navbar from '../components/Navbar';
import ProductJourney from '../components/ProductJourney';
import Creators from '../components/Creators';
import Footer from '../components/Footer';
import DiscountPopup from '../components/DiscountPopup';
import AIConcierge from '../components/AIConcierge';
// Import missing TIKTOK_SHOP_URL
import { TIKTOK_SHOP_URL } from '../constants';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen selection:bg-purple-500/30">
      <Navbar />
      
      <main>
        {/* The Core Experience */}
        <ProductJourney />
        
        {/* Trust & Community */}
        <section className="bg-black py-24 border-t border-white/5 relative z-50">
           <div className="max-w-7xl mx-auto px-6 text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-serif italic mb-6">Experience the Transformation.</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
                Luvera isn't just a moisturizer; it's a commitment to your skin's long-term health. 
                Science-backed, nature-derived, and luxury-finished.
              </p>
           </div>
           <Creators />
        </section>

        {/* CTA Section */}
        <section className="h-screen bg-black flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
           <div className="absolute inset-0 z-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[100vw] bg-purple-900/10 rounded-full blur-[150px]" />
           </div>
           <div className="relative z-10">
              <span className="text-purple-400 uppercase tracking-[0.5em] text-xs font-bold mb-4 block">Limited Collection</span>
              <h2 className="text-6xl md:text-9xl font-serif mb-12">Claim Your<br/><span className="italic">Glow.</span></h2>
              {/* Used imported TIKTOK_SHOP_URL constant */}
              <a 
                href={TIKTOK_SHOP_URL}
                className="inline-block px-16 py-6 bg-white text-black font-bold uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all duration-500 transform hover:scale-110 shadow-[0_20px_60px_rgba(139,92,246,0.3)]"
              >
                Shop Now
              </a>
           </div>
        </section>
      </main>

      <Footer />

      {/* Overlays */}
      <DiscountPopup />
      <AIConcierge />
    </div>
  );
};

export default App;
