'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { value: 10000, suffix: '+', label: 'Students Trained', icon: '🎓' },
  { value: 7.5, suffix: '+', label: 'Avg Band Score', icon: '📊', isDecimal: true },
  { value: 95, suffix: '%', label: 'Success Rate', icon: '🏆' },
  { value: 45, suffix: '+', label: 'Countries', icon: '🌍' },
];

const successStories = [
  {
    name: 'Priya Sharma',
    before: '5.5',
    after: '8.0',
    country: '🇨🇦 Canada',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: 'The structured approach and mock tests made all the difference!',
  },
  {
    name: 'Ahmed Hassan',
    before: '6.0',
    after: '7.5',
    country: '🇦🇺 Australia',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote: 'Personal mentorship helped me overcome my speaking anxiety.',
  },
  {
    name: 'Li Wei Chen',
    before: '5.0',
    after: '8.0',
    country: '🇬🇧 UK',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    quote: 'From 5.0 to 8.0 in just 3 months. Incredible program!',
  },
  {
    name: 'Fatima Al-Rashid',
    before: '6.0',
    after: '7.5',
    country: '🇺🇸 USA',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    quote: 'AI mock tests predicted my exact score. Amazing technology!',
  },
];

export default function ResultsSection() {
  return (
    <section id="results" className="section-padding-lg bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />

      <div className="container-premium relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-yellow/15 text-accent-orange text-sm font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
            Proven Results
          </span>
          <h2 className="text-display-sm lg:text-display-md text-navy mb-6">
            Our Students <span className="gradient-text">Consistently Excel</span>
          </h2>
          <p className="text-body-lg text-navy/60 max-w-2xl mx-auto">
            Real transformations, real scores, real success stories from students worldwide
          </p>
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4 }}
              className="text-center p-6 rounded-3xl bg-surface border border-surface-300/50 hover:shadow-card-hover transition-all duration-300"
            >
              <span className="text-3xl mb-3 block">{stat.icon}</span>
              <div className="text-3xl lg:text-4xl font-bold text-navy mb-1">
                {stat.isDecimal ? (
                  <span>{stat.value}{stat.suffix}</span>
                ) : (
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                )}
              </div>
              <div className="text-sm text-navy/50 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Success Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {successStories.map((story, i) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative bg-white rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-all duration-400 border border-surface-300/50"
            >
              {/* Score Transformation */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  {/* Before */}
                  <div className="px-3 py-1.5 rounded-xl bg-red-50 border border-red-100">
                    <span className="text-red-500 font-bold text-sm">{story.before}</span>
                  </div>
                  {/* Arrow */}
                  <svg className="w-5 h-5 text-navy/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  {/* After */}
                  <div className="px-3 py-1.5 rounded-xl bg-green-50 border border-green-100">
                    <span className="text-green-600 font-bold text-sm">{story.after}</span>
                  </div>
                </div>
                <span className="text-sm">{story.country}</span>
              </div>

              {/* Scorecard Visual */}
              <div className="mb-5 p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-accent-yellow/5 border border-primary/10">
                <div className="text-center">
                  <div className="text-xs text-navy/40 font-medium mb-1">IELTS Overall Band</div>
                  <div className="text-4xl font-bold text-navy">{story.after}</div>
                  <div className="flex justify-center gap-1 mt-2">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="h-1.5 w-8 rounded-full bg-primary" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <p className="text-sm text-navy/60 mb-4 italic leading-relaxed">
                &ldquo;{story.quote}&rdquo;
              </p>

              {/* Student Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-surface-300/50">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-10 h-10 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <div className="text-sm font-semibold text-navy">{story.name}</div>
                  <div className="text-xs text-navy/40">IELTS Graduate</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
