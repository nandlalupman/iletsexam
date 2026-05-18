'use client';

import { motion } from 'framer-motion';

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Authentic Exam Interface',
    description: 'Practice on a platform that exactly mirrors the real computer-delivered IELTS exam to build muscle memory and confidence.'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Instant Results',
    description: 'No more waiting. Get your Reading and Listening scores immediately after submitting your mock tests.'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'AI Examiner Evaluated',
    description: 'Our proprietary AI provides highly accurate Band scores and detailed feedback for both Writing and Speaking modules instantly.'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Track Your Progress',
    description: 'Identify your weak spots with comprehensive analytics. Watch your scores improve week by week as you practice.'
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="section-padding bg-white relative">
      <div className="container-premium">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-dark font-bold tracking-wider uppercase text-sm mb-4 block">Why Choose Us</span>
          <h2 className="text-display-sm md:text-display-md text-navy mb-6">
            Take an IELTS Free Online Test, <br />
            Ensure you <span className="gradient-text">Score your Best!</span>
          </h2>
          <p className="text-body-lg text-navy-light">
            We provide everything you need to prepare effectively, from authentic testing environments to advanced AI evaluations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface p-8 rounded-3xl border border-surface-200 hover:shadow-premium transition-all duration-300 group hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary-dark flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-navy transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-navy mb-4">{feature.title}</h3>
              <p className="text-navy-light leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
