'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const trustBadges = [
  { icon: '👨‍🎓', label: '10,000+', sub: 'Students Enrolled' },
  { icon: '⭐', label: '4.9/5', sub: 'Student Rating' },
  { icon: '🏆', label: 'Certified', sub: 'Expert Trainers' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden animated-gradient"
    >
      {/* Noise overlay */}
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      {/* Animated Blobs */}
      <div className="blob-1 -top-40 -left-40 opacity-60" />
      <div className="blob-2 top-1/3 right-0 opacity-50" />
      <div className="blob-3 bottom-0 left-1/4 opacity-40" />

      {/* Floating geometric shapes */}
      <motion.div
        animate={{ y: [-15, 15, -15], rotate: [0, 90, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[15%] right-[10%] w-16 h-16 border-2 border-white/10 rounded-2xl hidden lg:block"
      />
      <motion.div
        animate={{ y: [10, -20, 10], rotate: [0, -60, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[25%] left-[8%] w-12 h-12 border-2 border-accent-yellow/20 rounded-full hidden lg:block"
      />
      <motion.div
        animate={{ y: [-10, 20, -10], x: [-10, 10, -10] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[40%] left-[15%] w-8 h-8 bg-accent-orange/10 rounded-lg hidden lg:block"
      />

      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80&auto=format&fit=crop"
          alt="Students collaborating on IELTS preparation"
          fill
          priority
          className="object-cover opacity-15"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full section-padding">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/80 text-sm font-medium">New Batch Starting Soon — Limited Seats</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                custom={1}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-display-lg xl:text-display-xl text-white font-bold leading-tight mb-6"
              >
                Crack IELTS &{' '}
                <span className="relative inline-block">
                  <span className="gradient-text-hero">Score 7+ Bands</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-accent-yellow rounded-full origin-left"
                  />
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                custom={2}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-lg sm:text-xl text-white/70 mb-10 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed"
              >
                Live Classes • Expert Mentors • AI Mock Tests • Personal Feedback
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
              >
                <a
                  href="#book-demo"
                  id="hero-cta-demo"
                  className="btn-primary !text-lg group"
                >
                  <span>Book Free Demo</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="#courses"
                  id="hero-cta-learn"
                  className="btn-secondary !text-lg"
                >
                  Start Learning
                </a>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                custom={4}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8"
              >
                {trustBadges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <div className="text-white font-bold text-lg">{badge.label}</div>
                      <div className="text-white/50 text-xs">{badge.sub}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Hero Image */}
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Glow behind image */}
                <div className="absolute -inset-8 bg-primary/20 rounded-3xl blur-3xl" />

                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-glass-xl border border-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80&auto=format&fit=crop"
                    alt="Student preparing for IELTS exam on laptop"
                    width={600}
                    height={500}
                    className="object-cover w-full h-[500px]"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                </div>

                {/* Floating Score Card */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-glass-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-yellow to-accent-orange flex items-center justify-center">
                      <span className="text-white font-bold text-lg">8.0</span>
                    </div>
                    <div>
                      <div className="text-navy font-semibold text-sm">Band Score</div>
                      <div className="text-navy/50 text-xs">Overall IELTS</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Live Class Badge */}
                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 glass rounded-2xl p-3 shadow-glass-lg"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-navy font-semibold text-sm">Live Class</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#courses" className="flex flex-col items-center gap-2 group">
          <span className="text-white/40 text-xs font-medium tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2"
          >
            <div className="w-1.5 h-3 rounded-full bg-white/50" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
