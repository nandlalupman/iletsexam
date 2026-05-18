'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookDemoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = (e) => {
      const target = e.target.closest('a[href="#book-demo"], button[data-book-demo]');
      if (target) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    
    document.addEventListener('click', handleOpen);
    return () => document.removeEventListener('click', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-navy/80 backdrop-blur-sm cursor-pointer" 
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-glass-xl overflow-hidden border border-surface-300"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-200 text-navy hover:bg-surface-300 flex items-center justify-center transition-colors z-10"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="bg-gradient-to-br from-primary-50 to-surface pt-10 pb-8 px-8 text-center border-b border-surface-200">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 uppercase tracking-wider">
                Limited Slots
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-navy mb-2">
                Book Your <span className="gradient-text">Free Demo</span>
              </h3>
              <p className="text-navy/60 text-sm">
                Take the first step towards your dream IELTS band score today.
              </p>
            </div>

            {/* Form */}
            <div className="p-8">
              <form onSubmit={(e) => { e.preventDefault(); alert('Demo request submitted successfully!'); setIsOpen(false); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy/80 mb-1.5" htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-surface-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-navy"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-navy/80 mb-1.5" htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-surface-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-navy"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-navy/80 mb-1.5" htmlFor="phone">Phone Number (WhatsApp)</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    required 
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-surface-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-navy"
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-navy/80 mb-1.5" htmlFor="target">Target Band Score</label>
                  <select 
                    id="target" 
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-surface-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-navy"
                  >
                    <option value="6.5">6.5</option>
                    <option value="7.0">7.0</option>
                    <option value="7.5">7.5</option>
                    <option value="8.0+">8.0+</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  className="w-full btn-primary !py-3.5 mt-2 shadow-premium"
                >
                  Submit Request
                </button>
              </form>
              <p className="text-center text-xs text-navy/40 mt-5">
                We&apos;ll contact you within 24 hours to schedule your session.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
