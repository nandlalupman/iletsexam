'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlaneTakeoff } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1529180979161-06b8b6d6f2be?w=1920&q=80&auto=format&fit=crop"
          alt="Airport terminal - your journey starts here"
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/80 to-navy/70" />
      </div>

      <div className="absolute inset-0 z-5 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full section-padding">
        <div className="container-premium text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-8 text-white/80 text-sm">
              <PlaneTakeoff className="h-4 w-4 text-accent-yellow" strokeWidth={2.2} />
              Your Journey Awaits
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-display-lg text-white font-bold mb-6 leading-tight">
              Your Dream Country<br />
              <span className="gradient-text-hero">Starts Here</span>
            </h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-10 leading-relaxed">
              Join thousands of students who turned their IELTS dreams into reality. Your success story is just one step away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/tests/reading-foundations" className="btn-primary !text-lg !px-10 group">
                Take Mock Test
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="#book-demo" className="btn-secondary !text-lg">Book Free Demo</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
