'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

const scrollCards = [
  { title: 'Structured Learning Path', description: 'Follow a proven curriculum designed to take you from foundation to mastery in 8 weeks.', gradient: 'from-primary via-blue-600 to-primary-700', emoji: '🎯' },
  { title: 'AI-Powered Analytics', description: 'Track progress with intelligent dashboards that identify patterns and predict your score.', gradient: 'from-accent-orange via-red-500 to-pink-500', emoji: '📊' },
  { title: 'Community Support', description: 'Join 10,000+ students sharing tips, resources, and motivation on your IELTS journey.', gradient: 'from-green-500 via-emerald-500 to-teal-500', emoji: '🤝' },
  { title: 'Exam Day Strategy', description: 'Master time management, stress control, and strategic answering for exam day.', gradient: 'from-accent-yellow via-accent-orange to-red-500', emoji: '⚡' },
  { title: 'Post-IELTS Support', description: 'Get guidance on visa, university shortlisting, and SOP writing after your exam.', gradient: 'from-purple-500 via-violet-500 to-indigo-500', emoji: '🌍' },
];

export default function ScrollExperience() {
  const carouselRef = useRef(null);

  // Manual scroll for cards
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const amount = 350; // card width + gap
      carouselRef.current.scrollBy({ left: direction * amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="experience" className="section-padding-lg relative bg-navy overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent-yellow/5 rounded-full blur-3xl" />
      </div>

      <div className="container-premium relative z-10 mb-12 lg:mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow animate-pulse" />
            The Journey
          </span>
          <h2 className="text-display-sm lg:text-display-md text-white mb-6">
            <span className="text-primary">Learn.</span>{' '}
            <span className="text-accent-orange">Practice.</span>{' '}
            <span className="text-accent-yellow">Achieve.</span>
          </h2>
          <p className="text-white/70 text-body-lg max-w-2xl mx-auto">
            The complete roadmap to your target IELTS band, guiding you step-by-step from day one to test day.
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scrolling Cards + Manual Arrows */}
      <div className="relative z-10 container-premium px-0 sm:px-6">
        {/* Manual scroll arrows (Desktop) */}
        <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-12 z-20">
          <button
            onClick={() => scrollCarousel(-1)}
            className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/30 hover:text-white transition-all backdrop-blur-md shadow-glass"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
        </div>
        <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-12 z-20">
          <button
            onClick={() => scrollCarousel(1)}
            className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/30 hover:text-white transition-all backdrop-blur-md shadow-glass"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Scrollable Container */}
        <div
          ref={carouselRef}
          className="overflow-x-auto flex gap-6 pb-8 pt-4 px-4 sm:px-0 snap-x snap-mandatory scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {scrollCards.map((card, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={card.title}
              className={`flex-shrink-0 w-[85vw] sm:w-[320px] rounded-3xl p-8 bg-gradient-to-br ${card.gradient} relative overflow-hidden group hover:-translate-y-2 transition-transform duration-400 snap-center shadow-glass-lg border border-white/10`}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="text-5xl mb-6 block drop-shadow-md">{card.emoji}</span>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{card.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
