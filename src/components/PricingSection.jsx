'use client';

import { motion } from 'framer-motion';

export default function PricingSection() {
  return (
    <section id="pricing" className="section-padding bg-surface-200">
      <div className="container-premium">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-dark font-bold tracking-wider uppercase text-sm mb-4 block">Simple Pricing</span>
          <h2 className="text-display-sm md:text-display-md text-navy mb-6">
            Invest in Your <span className="gradient-text">Future</span>
          </h2>
          <p className="text-body-lg text-navy-light">
            No hidden fees. One complete package to get your target band score.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-premium border-2 border-primary relative"
          >
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4">
              <span className="bg-accent-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Most Popular
              </span>
            </div>

            <h3 className="text-2xl font-bold text-navy mb-2">IELTS Fast Track</h3>
            <p className="text-navy-light mb-6">Complete 30-Day Intensive Preparation</p>
            
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-extrabold text-navy">€490</span>
              <span className="text-navy-light">/ program</span>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                '6 Band Guaranteed or Money Back!',
                'Small Batch: Max 4 Students Only',
                'Expert Trainers (Divya Lavania & Daksh Lavania)',
                'Latest IELTS Practice Material',
                'Speaking, Writing, Reading & Listening',
                'Mock Tests & Personal Guidance',
              ].map((feature, i) => (
                <li key={i} className="flex gap-3 items-center">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary-dark flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-navy-light font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <a href="#book-demo" className="btn-primary w-full shadow-lg">
              Enroll Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
