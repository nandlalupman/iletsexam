'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-surface">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="blob-1 top-[-10%] left-[-10%]" />
        <div className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[80px] animate-blob" />
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-surface-300/50 blur-[100px] animate-blob" style={{ animationDelay: '2s' }} />
        
        {/* Abstract Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] bg-repeat" />
      </div>

      <div className="container-premium relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left pt-10"
          >
            {/* Trust Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-glass-sm border border-surface-200 mb-8"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-surface-200 overflow-hidden relative">
                    <Image src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg`} alt="Student" fill className="object-cover" unoptimized />
                  </div>
                ))}
              </div>
              <span className="text-sm font-semibold text-navy/80 pl-2">
                Join <span className="text-primary-dark">5M+</span> test takers worldwide
              </span>
            </motion.div>

            <h1 className="text-display-md lg:text-display-lg font-extrabold text-navy leading-[1.1] mb-6 tracking-tight">
              The #1 Global <br className="hidden lg:block" />
              <span className="gradient-text">IELTS Online</span> <br className="hidden lg:block" />
              Study Platform.
            </h1>
            
            <p className="text-body-lg text-navy-light mb-10 max-w-2xl mx-auto lg:mx-0">
              Prepare for the real exam with our <strong className="text-navy">Free IELTS Practice Tests</strong>. Get instant AI examiner evaluations for Writing and Speaking, and achieve your target band score faster.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <a href="#book-demo" id="hero-cta-demo" className="btn-primary !text-lg group">
                <span>Start Free Mock Test</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="#courses" className="btn-outline !text-lg bg-white">
                Explore Live Lessons
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 border-t border-surface-200 pt-8">
              <div>
                <p className="text-3xl font-bold text-navy">120+</p>
                <p className="text-sm text-navy-light mt-1 font-medium">Free Mock Tests</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-navy">AI</p>
                <p className="text-sm text-navy-light mt-1 font-medium">Instant Scoring</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-navy">120+</p>
                <p className="text-sm text-navy-light mt-1 font-medium">Countries</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Composition */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative lg:h-[600px] items-center justify-center hidden md:flex"
          >
            {/* Abstract Premium Shapes */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-[3rem] transform rotate-3" />
            <div className="absolute inset-4 bg-white rounded-[3rem] shadow-glass-xl border border-surface-200 overflow-hidden transform -rotate-2 flex flex-col">
              
              {/* Simulated UI inside the frame */}
              <div className="h-16 bg-surface-200/50 border-b border-surface-200 flex items-center px-6 justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="h-6 w-32 bg-white rounded-full border border-surface-200" />
              </div>
              
              <div className="flex-1 p-8 relative">
                <div className="w-full h-48 bg-surface-200 rounded-2xl mb-6 overflow-hidden relative">
                   <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Students studying" fill className="object-cover opacity-90" unoptimized />
                </div>
                <div className="flex justify-between items-end mb-6">
                   <div>
                     <h3 className="text-2xl font-bold text-navy mb-2">IELTS Academic</h3>
                     <p className="text-navy-light">Listening • Reading • Writing • Speaking</p>
                   </div>
                   <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center font-bold text-navy">
                     8.0
                   </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 w-full bg-surface-200 rounded-full" />
                  <div className="h-3 w-5/6 bg-surface-200 rounded-full" />
                  <div className="h-3 w-4/6 bg-surface-200 rounded-full" />
                </div>
              </div>

            </div>

            {/* Floating Elements for 3D effect */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-1/4 bg-white p-4 rounded-2xl shadow-premium border border-surface-200 z-20 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary-dark">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-navy">AI Evaluated</p>
                <p className="text-xs text-navy-light">Instant Feedback</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [10, -10, 10] }} 
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 bottom-1/4 bg-navy p-4 rounded-2xl shadow-premium z-20"
            >
              <p className="text-white text-sm font-semibold mb-1">Target Band</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
