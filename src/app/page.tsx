import React from 'react';
import Hero from '@/components/hero';
import ProductJourney from '../components/ProductJourney';
import LazyCreators from '@/components/LazyCreators'
import LoadingScreen from '@/components/Loadingscreen';
import FAQ from '@/components/Faq';
import ProductCTA from './products/luvera-mens-daily-moisturizer/sections/Productcta';
import Ingredients from './products/luvera-mens-daily-moisturizer/sections/Ingredients';
import ProductHero from './products/luvera-mens-daily-moisturizer/sections/ProductHero';
import Benefits from './products/luvera-mens-daily-moisturizer/sections/Benefits';

//import DiscountPopup from '../components/DiscountPopup';
//import AIConcierge from '../components/AIConcierge';
//import { TIKTOK_SHOP_URL } from '../constants';

const App: React.FC = () => {

  return (
    <div className="relative min-h-screen selection:bg-purple-500/30">
      <LoadingScreen />
      <main>
        {/* <ProductJourney /> Old Hero */}
        
        <Hero />
        <ProductHero />
        <LazyCreators />
        <Ingredients />
        <Benefits />

        <FAQ />

        <ProductCTA />

      </main>


      {/* Overlays */}
      {/* <DiscountPopup /> */}
      {/* <AIConcierge /> */}
    </div>
  );
};

export default App;
