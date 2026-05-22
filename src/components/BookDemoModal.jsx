'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  targetBand: '6.5',
};

export default function BookDemoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleOpen = (event) => {
      const target = event.target.closest('a[href="#book-demo"], button[data-book-demo]');
      if (target) {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('click', handleOpen);
    return () => document.removeEventListener('click', handleOpen);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  function updateField(key, value) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/demo-bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.message || 'Unable to submit the demo request.');
      }

      setMessage(payload.message);
      setForm(initialForm);
      window.setTimeout(() => {
        setIsOpen(false);
        setMessage('');
      }, 1400);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

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
          <div
            className="absolute inset-0 bg-navy/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-lg bg-[#0f1e38] rounded-3xl shadow-glass-xl overflow-hidden border border-[rgba(245,200,66,0.18)]"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 text-white hover:bg-white/10 flex items-center justify-center transition-colors z-10"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="bg-gradient-to-br from-[rgba(245,200,66,0.18)] to-[rgba(255,255,255,0.02)] pt-10 pb-8 px-8 text-center border-b border-white/10">
              <span className="inline-block px-3 py-1 rounded-full bg-[rgba(245,200,66,0.12)] text-[#f5c842] text-xs font-bold mb-4 uppercase tracking-wider">
                Limited Slots
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Book Your <span className="bg-gradient-to-r from-[#f5c842] to-[#ffe38b] bg-clip-text text-transparent">Free Demo</span>
              </h3>
              <p className="text-[#8ea1c1] text-sm">
                This form now posts into the platform lead pipeline and appears in the admin leads view.
              </p>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5" htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={form.fullName}
                    onChange={(event) => updateField('fullName', event.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#f5c842] focus:ring-2 focus:ring-[#f5c842]/20 outline-none transition-all text-white"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#f5c842] focus:ring-2 focus:ring-[#f5c842]/20 outline-none transition-all text-white"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5" htmlFor="phone">Phone Number (WhatsApp)</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={form.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#f5c842] focus:ring-2 focus:ring-[#f5c842]/20 outline-none transition-all text-white"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5" htmlFor="target">Target Band Score</label>
                  <select
                    id="target"
                    value={form.targetBand}
                    onChange={(event) => updateField('targetBand', event.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#f5c842] focus:ring-2 focus:ring-[#f5c842]/20 outline-none transition-all text-white"
                  >
                    <option value="6.5">6.5</option>
                    <option value="7.0">7.0</option>
                    <option value="7.5">7.5</option>
                    <option value="8.0+">8.0+</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary !py-3.5 mt-2 shadow-premium"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
              <p className="text-center text-xs text-[#8ea1c1] mt-5">
                We&apos;ll contact you within 24 hours to schedule your session.
              </p>
              {message ? (
                <div className="mt-4 rounded-2xl border border-[rgba(245,200,66,0.18)] bg-[rgba(245,200,66,0.08)] px-4 py-3 text-sm text-[#f2df9d]">
                  {message}
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
