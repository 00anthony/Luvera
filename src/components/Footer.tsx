
import React from 'react';
import { Send, Instagram, Twitter, Facebook, } from 'lucide-react';
import { TIKTOK_SHOP_URL } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-zinc-950 pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-4xl font-serif mb-6 leading-tight">Stay Radiant.<br/>Join the Luvera List.</h2>
            <p className="text-gray-400 mb-8 max-w-sm">
              Subscribe to receive weekly hydration tips, member-only discounts, and scientific insights into modern skincare.
            </p>
            <form className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 bg-white/5 border border-white/10 px-6 py-4 rounded-full focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button className="bg-white text-black w-14 h-14 rounded-full flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all group">
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-purple-400">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href={TIKTOK_SHOP_URL} className="hover:text-white">Hydrating Lotion</a></li>
                <li><a href="#" className="hover:text-white">Bundles</a></li>
                <li><a href="#" className="hover:text-white">Gift Cards</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-purple-400">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Our Story</a></li>
                <li><a href="#" className="hover:text-white">Sustainability</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-widest text-purple-400">Social</h4>
              <div className="flex space-x-4">
                <a 
                  href='https://www.instagram.com/luvera.skincare/'
                  target='_blank'
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-purple-500 hover:text-purple-400 transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.tiktok.com/@luveraskincare"
                  target='_blank'
                  rel='noopener noreferrer' 
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-purple-500 hover:text-purple-400 transition-all"
                >
                  <svg role="img" viewBox="0 0 40 40" fill='white' className='pl-3 pt-2 hover:fill-purple-400' xmlns="http://www.w3.org/2000/svg"><title>TikTok</title><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>
                
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5">
          <span className="text-2xl font-serif mb-6 md:mb-0">Luvera</span>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">
            © 2024 Luvera Skincare Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-6 md:mt-0">
            <a href="#" className="text-[10px] text-gray-500 uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] text-gray-500 uppercase tracking-widest hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
