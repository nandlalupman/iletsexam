'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Deep Navy-Blue Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-navy via-[#0a1628] to-[#0d2847]" />
      
      {/* Animated Glow Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-primary/15 blur-[120px] animate-blob" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent-yellow/10 blur-[100px] animate-blob" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-primary-700/10 blur-[80px] animate-blob" style={{ animationDelay: '6s' }} />
      </div>

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="container-premium relative z-10 pt-36 pb-16 lg:pt-40 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Live Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
            >
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-sm font-medium text-white/80">
                Limited Seats — <span className="text-accent-yellow font-semibold">Max 4 Students Per Batch</span>
              </span>
            </motion.div>

            {/* Full Form Label */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xs sm:text-sm uppercase tracking-[0.25em] text-primary-300 font-semibold mb-4"
            >
              International English Language Training Specialists
            </motion.p>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              <span className="inline-block bg-gradient-to-r from-accent-yellow via-yellow-300 to-accent-orange bg-clip-text text-transparent">6 Band Guaranteed</span>
              <br />
              <span className="text-white">in IELTS —</span>
              <br />
              <span className="text-white/90">Or Money Back!</span>
            </h1>

            {/* Price Badge — highly visible */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="inline-flex items-center gap-4 mb-8"
            >
              <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 shadow-lg shadow-amber-500/30">
                <span className="text-4xl sm:text-5xl font-black text-navy">€490</span>
                <span className="text-navy/70 text-base font-bold ml-2">ONLY</span>
              </div>
              <div className="text-left">
                <p className="text-white/60 text-sm line-through">€990</p>
                <p className="text-green-400 text-base font-bold">50% OFF</p>
              </div>
            </motion.div>

            <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              30-Day Intensive IELTS Program with <strong className="text-white/90">Expert Trainers</strong>, 
              latest practice material, mock tests & personal guidance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <a href="#book-demo" id="hero-cta-demo" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-accent-yellow to-accent-orange text-navy font-bold text-lg shadow-lg hover:shadow-accent-yellow/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5">
                <span>Enroll Now</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="#book-demo" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Book Free Demo
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div className="text-center lg:text-left">
                <p className="text-3xl sm:text-4xl font-black text-white">30</p>
                <p className="text-xs sm:text-sm text-white/40 mt-1 font-medium">Days Program</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl sm:text-4xl font-black text-white">4</p>
                <p className="text-xs sm:text-sm text-white/40 mt-1 font-medium">Max Students</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl sm:text-4xl font-black text-white">100%</p>
                <p className="text-xs sm:text-sm text-white/40 mt-1 font-medium">Money Back</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Achievement Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="relative hidden md:block"
          >
            {/* Main Achievement Card */}
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent-yellow/10 to-primary/20 rounded-[3rem] blur-2xl" />
              
              {/* Glass Card */}
              <div className="relative rounded-[2.5rem] bg-white/[0.06] border border-white/10 backdrop-blur-xl p-8 sm:p-10 overflow-hidden">
                {/* Decorative gradient stripe */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent-yellow to-accent-orange" />
                
                {/* IELTS Modules Grid */}
                <div className="mb-8">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-5">IELTS Preparation Program</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: '🎧', label: 'Listening', color: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-500/30' },
                      { icon: '📖', label: 'Reading', color: 'from-emerald-500/20 to-emerald-600/20', border: 'border-emerald-500/30' },
                      { icon: '✍️', label: 'Writing', color: 'from-purple-500/20 to-purple-600/20', border: 'border-purple-500/30' },
                      { icon: '🗣️', label: 'Speaking', color: 'from-accent-orange/20 to-red-500/20', border: 'border-accent-orange/30' },
                    ].map((mod) => (
                      <motion.div 
                        key={mod.label}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br ${mod.color} border ${mod.border} backdrop-blur-sm cursor-default`}
                      >
                        <span className="text-2xl">{mod.icon}</span>
                        <span className="text-white font-semibold text-sm">{mod.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3 mb-8">
                  {[
                    'Expert Trainers',
                    'Latest IELTS Practice Material',
                    'Speaking, Writing, Reading & Listening Modules',
                    'Mock Tests & Personal Guidance',
                    'Fast Track Success Plan',
                  ].map((feature, i) => (
                    <motion.div 
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-white/70 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Achievement Bar */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-accent-yellow/10 border border-primary/20">
                  <div>
                    <p className="text-primary-300 text-xs font-medium uppercase tracking-wider">Target Score</p>
                    <p className="text-white text-2xl font-black">6.0+ Bands</p>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-accent-yellow/50 bg-accent-yellow/10 flex items-center justify-center">
                    <span className="text-accent-yellow font-black text-xl">6+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [-8, 8, -8] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 top-8 bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/15 shadow-2xl z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Guaranteed</p>
                  <p className="text-xs text-white/50">Or Money Back</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [8, -8, 8] }} 
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 bottom-24 bg-gradient-to-br from-accent-yellow/20 to-accent-orange/20 backdrop-blur-xl p-4 rounded-2xl border border-accent-yellow/20 shadow-2xl z-20"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">✈️</span>
                <div>
                  <p className="text-xs text-white/50">Your Journey to</p>
                  <p className="text-sm font-bold text-white">Study Abroad</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [-6, 10, -6] }} 
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-8 -top-4 bg-navy/80 backdrop-blur-xl p-3 rounded-xl border border-white/10 shadow-2xl z-20"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🏆</span>
                <p className="text-xs font-bold text-accent-yellow">Small Batch<br/><span className="text-white/60">4 Students Only</span></p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full">
          <path d="M0 40C240 80 480 100 720 80C960 60 1200 20 1440 40V100H0V40Z" fill="var(--surface, #f8fafc)" />
        </svg>
      </div>
    </section>
  );
}
