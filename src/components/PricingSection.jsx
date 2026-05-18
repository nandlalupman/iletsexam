'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const plans = [
  {
    name: 'Foundation',
    monthly: 49,
    full: 199,
    description: 'Perfect for self-paced learners starting their IELTS journey',
    features: ['All 4 Module Access', 'AI Mock Tests (10/month)', 'Daily Practice Questions', 'Community Access', 'Study Materials PDF', 'Progress Tracking'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    monthly: 99,
    full: 399,
    description: 'Most popular — complete preparation with mentorship and live classes',
    features: ['Everything in Foundation', 'Unlimited AI Mock Tests', 'Live Classes (3x/week)', 'Personal Mentor', 'Speaking Evaluation', 'Writing Review (10/month)', 'Doubt Solving Sessions', 'Score Prediction'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Premium',
    monthly: 199,
    full: 699,
    description: 'Intensive 1-on-1 coaching for guaranteed 7+ band score',
    features: ['Everything in Professional', '1-on-1 Daily Sessions', 'Unlimited Writing Reviews', 'Exam Strategy Workshop', 'Visa Guidance', 'SOP Review', 'Priority Support 24/7', '7+ Band Guarantee*'],
    cta: 'Book Consultation',
    popular: false,
  },
];

export default function PricingSection() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="section-padding-lg bg-surface relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      <div className="container-premium relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />Simple Pricing
          </span>
          <h2 className="text-display-sm lg:text-display-md text-navy mb-6">Choose Your <span className="gradient-text">Success Plan</span></h2>
          <p className="text-body-lg text-navy/60 max-w-2xl mx-auto mb-10">Invest in your future with transparent pricing. No hidden fees, no surprises.</p>
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
