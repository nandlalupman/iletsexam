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

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 rounded-full bg-white border border-surface-300 shadow-sm">
            <button onClick={() => setYearly(false)} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${!yearly ? 'bg-primary text-white shadow-glow-blue/20' : 'text-navy/60 hover:text-navy'}`}>Monthly</button>
            <button onClick={() => setYearly(true)} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${yearly ? 'bg-primary text-white shadow-glow-blue/20' : 'text-navy/60 hover:text-navy'}`}>
              Full Course
              <span className={`text-xs px-2 py-0.5 rounded-full ${yearly ? 'bg-accent-yellow text-navy' : 'bg-accent-yellow/20 text-accent-orange'}`}>Save 60%</span>
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl p-8 transition-all duration-400 ${plan.popular ? 'bg-navy text-white shadow-premium scale-105 border-2 border-primary/30' : 'bg-white border border-surface-300/50 shadow-card hover:shadow-card-hover'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full bg-gradient-to-r from-accent-yellow to-accent-orange text-navy text-xs font-bold shadow-glow-yellow/30">Most Popular</div>
              )}
              <h3 className={`text-heading-xl mb-2 ${plan.popular ? 'text-white' : 'text-navy'}`}>{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.popular ? 'text-white/60' : 'text-navy/50'}`}>{plan.description}</p>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-navy'}`}>${yearly ? plan.full : plan.monthly}</span>
                  <span className={`text-sm ${plan.popular ? 'text-white/50' : 'text-navy/40'}`}>{yearly ? '/course' : '/month'}</span>
                </div>
                {yearly && <div className={`text-xs mt-1 ${plan.popular ? 'text-accent-yellow' : 'text-green-600'}`}>Save ${plan.monthly * 12 - plan.full} vs monthly</div>}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-accent-yellow' : 'text-primary'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className={plan.popular ? 'text-white/80' : 'text-navy/70'}>{f}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-2xl font-semibold text-center transition-all duration-300 ${plan.popular ? 'bg-white text-navy hover:bg-white/90 shadow-lg hover:shadow-xl' : 'btn-primary'}`}>{plan.cta}</button>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-navy/40 mt-8">* 7+ Band Guarantee subject to terms. Full refund if score not achieved after completing the program.</p>
      </div>
    </section>
  );
}
