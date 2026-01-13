
import React from 'react';
import { Send, Instagram, Twitter, Facebook } from 'lucide-react';
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
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-purple-500 hover:text-purple-400 transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-purple-500 hover:text-purple-400 transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-purple-500 hover:text-purple-400 transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5">
          <span className="text-2xl font-serif mb-6 md:mb-0">Luvera</span>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">
            © 2024 Luvera Skincare Inc. All rights reserved. Developed with AI precision.
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
