'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const testimonials = [
  { name: 'Ananya Patel', score: '8.0', country: 'Canada', image: 'https://randomuser.me/api/portraits/women/26.jpg', review: 'The live classes were incredibly engaging. My writing score jumped from 6.0 to 8.0 in just 6 weeks. The personal feedback on essays was a game-changer.', role: 'Software Engineer' },
  { name: 'Rajesh Kumar', score: '7.5', country: 'Australia', image: 'https://randomuser.me/api/portraits/men/45.jpg', review: 'I tried multiple platforms before IELTS.my. The AI mock tests are remarkably close to the real exam. Best investment for my IELTS prep.', role: 'Healthcare Professional' },
  { name: 'Sophie Zhang', score: '8.5', country: 'UK', image: 'https://randomuser.me/api/portraits/women/52.jpg', review: 'The speaking evaluation feature helped me identify my pronunciation issues. My mentor was supportive throughout. Scored 8.5 overall!', role: 'Graduate Student' },
  { name: 'Mohammed Ali', score: '7.5', country: 'New Zealand', image: 'https://randomuser.me/api/portraits/men/22.jpg', review: 'Daily practice questions kept me consistent. The community support group was motivating. Achieved my target score on the first attempt!', role: 'Business Analyst' },
  { name: 'Elena Popov', score: '8.0', country: 'Germany', image: 'https://randomuser.me/api/portraits/women/89.jpg', review: 'From struggling with Reading to scoring 9.0 in it. The speed reading techniques taught here are world-class. Highly recommend to everyone.', role: 'Research Scientist' },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const timer = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, [auto]);

  const next = () => { setAuto(false); setCurrent((p) => (p + 1) % testimonials.length); };
  const prev = () => { setAuto(false); setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length); };

  return (
    <section id="testimonials" className="section-padding-lg bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-yellow/5 rounded-full blur-3xl" />
      <div className="container-premium relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-600 text-sm font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />Student Voices
          </span>
          <h2 className="text-display-sm lg:text-display-md text-navy mb-6">What Our Students Say</h2>
          <p className="text-body-lg text-navy/60 max-w-2xl mx-auto">Real reviews from real students who achieved their dream IELTS scores</p>
        </motion.div>

        {/* Main Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <div className="relative overflow-hidden rounded-3xl bg-surface border border-surface-300/50 p-8 sm:p-12 min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
                {/* Quote icon */}
                <svg className="w-12 h-12 text-primary/15 mb-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" /></svg>
                <p className="text-lg sm:text-xl text-navy/80 leading-relaxed mb-8 italic">&ldquo;{testimonials[current].review}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <img src={testimonials[current].image} alt={testimonials[current].name} className="w-14 h-14 rounded-full object-cover border-2 border-primary/20" loading="lazy" />
                  <div>
                    <div className="font-semibold text-navy text-lg">{testimonials[current].name}</div>
                    <div className="text-sm text-navy/50">{testimonials[current].role}</div>
                  </div>
                  <div className="ml-auto text-right hidden sm:block">
                    <div className="px-4 py-1.5 rounded-xl bg-primary/10 text-primary font-bold text-lg">{testimonials[current].score}</div>
                    <div className="text-xs text-navy/40 mt-1">Band Score</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-12 h-12 rounded-full bg-white border border-surface-300 flex items-center justify-center hover:bg-surface transition-colors shadow-sm" aria-label="Previous testimonial">
              <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => { setAuto(false); setCurrent(i); }} className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-primary' : 'w-2 bg-navy/15 hover:bg-navy/30'}`} aria-label={`Go to testimonial ${i + 1}`} />
              ))}
            </div>
            <button onClick={next} className="w-12 h-12 rounded-full bg-white border border-surface-300 flex items-center justify-center hover:bg-surface transition-colors shadow-sm" aria-label="Next testimonial">
              <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Video Testimonial Cards */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {testimonials.slice(0, 4).map((t, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer">
              <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-white font-semibold text-sm">{t.name}</div>
                <div className="text-white/60 text-xs">{t.score} Bands • {t.country}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
