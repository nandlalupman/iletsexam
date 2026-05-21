'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navLinks = [
  { name: 'Courses', href: '#courses' },
  { name: 'Results', href: '#results' },
  { name: 'Features', href: '#features' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-2 bg-white/95 backdrop-blur-2xl shadow-lg border-b border-gray-100'
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo — Text-based for crisp rendering */}
            <a href="#" className="flex items-center gap-2.5 group">
              {/* Globe Icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                scrolled 
                  ? 'bg-gradient-to-br from-amber-600 to-yellow-600 shadow-md' 
                  : 'bg-gradient-to-br from-amber-500/90 to-yellow-500/90 shadow-lg shadow-amber-500/20'
              }`}>
                <span className="text-white text-lg">🌍</span>
              </div>
              <div className="flex flex-col">
                <span className={`text-xl font-extrabold tracking-tight leading-none transition-colors duration-300 ${
                  scrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  IELTS<span className={`transition-colors duration-300 ${scrolled ? 'text-amber-600' : 'text-amber-400'}`}>.my</span>
                </span>
                <span className={`text-[9px] font-medium tracking-[0.08em] uppercase leading-none mt-0.5 transition-colors duration-300 ${
                  scrolled ? 'text-gray-400' : 'text-white/50'
                }`}>
                  Training Specialists
                </span>
              </div>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    scrolled
                      ? 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                      : 'text-white/75 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#pricing"
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  scrolled
                    ? 'text-amber-600 hover:bg-amber-50'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                Log In
              </a>
              <a
                href="#book-demo"
                className="px-6 py-2.5 text-sm font-bold rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-navy shadow-md hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                Book Free Demo
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${
                    mobileOpen
                      ? `rotate-45 translate-y-2 ${scrolled ? 'bg-gray-800' : 'bg-white'}`
                      : scrolled ? 'bg-gray-800' : 'bg-white'
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${
                    mobileOpen ? 'opacity-0 scale-0' : 'opacity-100'
                  } ${scrolled ? 'bg-gray-800' : 'bg-white'}`}
                />
                <span
                  className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${
                    mobileOpen
                      ? `-rotate-45 -translate-y-2 ${scrolled ? 'bg-gray-800' : 'bg-white'}`
                      : scrolled ? 'bg-gray-800' : 'bg-white'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl"
            >
              <div className="pt-24 px-6 pb-8 flex flex-col h-full">
                <div className="flex-1 flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3.5 rounded-xl text-gray-700 font-medium text-lg hover:bg-gray-100 transition-colors"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
                <div className="flex flex-col gap-3 mt-8">
                  <a href="#book-demo" className="px-6 py-3 rounded-xl text-center font-bold bg-gradient-to-r from-amber-500 to-yellow-500 text-navy shadow-md" onClick={() => setMobileOpen(false)}>
                    Book Free Demo
                  </a>
                  <a href="#pricing" className="px-6 py-3 rounded-xl text-center font-semibold border-2 border-gray-200 text-gray-700 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                    Start Learning
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
