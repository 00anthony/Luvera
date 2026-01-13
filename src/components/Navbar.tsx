'use client'
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-100 transition-all duration-700 ${
      isScrolled ? 'bg-black/80 backdrop-blur-xl py-4 border-b border-white/10' : 'bg-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Left Side: Navigation Items */}
        <div className="hidden md:flex space-x-10">
          <a href="#" className="text-[10px] font-bold tracking-[0.3em] uppercase hover:text-purple-400 transition-colors">Shop</a>
          <a href="#" className="text-[10px] font-bold tracking-[0.3em] uppercase hover:text-purple-400 transition-colors">Science</a>
          <a href="#" className="text-[10px] font-bold tracking-[0.3em] uppercase hover:text-purple-400 transition-colors">Story</a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Logo */}
        <a href="/" className="absolute left-1/2 -translate-x-1/2 text-3xl font-serif tracking-tighter">
          Luvera
        </a>

        {/* Right Side: Icons */}
        <div className="flex items-center space-x-6">
          <Search className="w-4 h-4 cursor-pointer hover:text-purple-400 transition-colors hidden sm:block" />
          <User className="w-4 h-4 cursor-pointer hover:text-purple-400 transition-colors hidden sm:block" />
          <div className="relative cursor-pointer group">
            <ShoppingBag className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black z-110 flex flex-col items-center justify-center space-y-12">
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-8 right-8">
            <X className="w-8 h-8" />
          </button>
          <a href="#" className="text-3xl font-serif italic" onClick={() => setMobileMenuOpen(false)}>Shop</a>
          <a href="#" className="text-3xl font-serif italic" onClick={() => setMobileMenuOpen(false)}>Science</a>
          <a href="#" className="text-3xl font-serif italic" onClick={() => setMobileMenuOpen(false)}>Our Story</a>
          <a href="#" className="px-12 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm">Buy Now</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
