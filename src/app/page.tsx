import React from 'react';
import ProductJourney from '../components/ProductJourney';
import LazyCreators from '@/components/LazyCreators'
import LoadingScreen from '@/components/Loadingscreen';
import FAQ from '@/components/Faq';
import ProductCTA from './products/luvera-mens-daily-moisturizer/sections/Productcta';

//import DiscountPopup from '../components/DiscountPopup';
//import AIConcierge from '../components/AIConcierge';
//import { TIKTOK_SHOP_URL } from '../constants';

const App: React.FC = () => {

  return (
    <div className="relative min-h-screen selection:bg-purple-500/30">
      <LoadingScreen />
      <main>
        {/* The Core Experience */}
        <ProductJourney />
        
        <LazyCreators />

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
