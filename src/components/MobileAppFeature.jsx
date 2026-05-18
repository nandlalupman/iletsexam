'use client';

import { motion } from 'framer-motion';

export default function MobileAppFeature() {
  return (
    <section className="section-padding-lg bg-surface-200 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-[80px] -translate-x-1/4 translate-y-1/4" />

      <div className="container-premium relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark text-sm font-bold mb-6 uppercase tracking-wider">
              Study Anywhere, Anytime
            </span>
            <h2 className="text-display-sm lg:text-display-md text-navy mb-6">
              Your Complete IELTS <span className="gradient-text">Prep Studio</span> on Mobile.
            </h2>
            <p className="text-body-lg text-navy-light mb-8">
              Take full-length mock tests, get instant AI examiner evaluations for speaking and writing, and track your progress—all beautifully optimized for your phone.
            </p>

            <ul className="space-y-5 mb-10">
              {[
                { title: 'Authentic Exam Interface', desc: 'Experience the real computer-delivered IELTS environment.' },
                { title: 'AI Examiner Scored', desc: 'Get instant Band scores for Speaking & Writing with detailed feedback.' },
                { title: 'Detailed Explanations', desc: 'Understand every mistake with comprehensive answer keys.' }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-glass-sm flex items-center justify-center flex-shrink-0 text-primary-dark">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-navy mb-1">{item.title}</h4>
                    <p className="text-navy-light text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <a href="#book-demo" className="btn-primary !px-8 !py-4 shadow-premium hover:-translate-y-1">
              Try Free Mock Test
            </a>
          </motion.div>

          {/* Mobile Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Phone Frame */}
            <div className="relative w-[300px] h-[600px] sm:w-[320px] sm:h-[640px] bg-navy rounded-[3rem] p-3 shadow-2xl border-4 border-surface-300 transform rotate-[-5deg] hover:rotate-0 transition-transform duration-700">
              {/* Notch */}
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center">
                <div className="w-32 h-6 bg-navy rounded-b-3xl" />
              </div>

              {/* Screen Content */}
              <div className="w-full h-full bg-surface rounded-[2.25rem] overflow-hidden flex flex-col relative">
                {/* Status Bar */}
                <div className="h-12 w-full bg-white flex items-center justify-between px-6 pt-2 text-[10px] font-medium text-navy/60">
                  <span>9:41</span>
                  <div className="flex gap-1.5">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M2 22h20V2L2 22zm18-2H6.83L20 6.83V20z"/></svg>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
                  </div>
                </div>

                {/* App Header */}
                <div className="bg-white px-5 py-4 border-b border-surface-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-navy text-lg">IELTS Premium</span>
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary-dark font-bold text-xs">JD</div>
                  </div>
                  <h3 className="text-xl font-bold text-navy">Mock Test #42</h3>
                  <p className="text-xs text-navy-light mt-1">Academic • Reading Section</p>
                </div>

                {/* App Body */}
                <div className="flex-1 p-5 overflow-y-auto bg-surface space-y-4">
                  {/* Timer */}
                  <div className="bg-white p-4 rounded-2xl shadow-glass-sm flex items-center justify-between border border-surface-200">
                    <div>
                      <p className="text-[10px] text-navy-light uppercase font-bold tracking-wider">Time Remaining</p>
                      <p className="text-lg font-bold text-accent-orange">42:15</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-accent-orange flex items-center justify-center text-accent-orange">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                  </div>

                  {/* Passage */}
                  <div className="bg-white p-4 rounded-2xl shadow-glass-sm border border-surface-200">
                    <h4 className="text-sm font-bold text-navy mb-2">Passage 1: The History of Glass</h4>
                    <div className="space-y-2">
                      <div className="h-2 bg-surface-200 rounded-full w-full"></div>
                      <div className="h-2 bg-surface-200 rounded-full w-11/12"></div>
                      <div className="h-2 bg-surface-200 rounded-full w-full"></div>
                      <div className="h-2 bg-surface-200 rounded-full w-4/5"></div>
                      <div className="h-2 bg-surface-200 rounded-full w-full"></div>
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="bg-primary/5 p-4 rounded-2xl border border-primary/20">
                    <p className="text-xs font-bold text-navy mb-3">Questions 1-5</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-surface-200">
                        <span className="w-5 h-5 rounded-full bg-navy text-white flex items-center justify-center text-[10px] font-bold">1</span>
                        <div className="h-1.5 bg-surface-200 rounded-full flex-1"></div>
                      </div>
                      <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-primary">
                        <span className="w-5 h-5 rounded-full bg-primary text-navy flex items-center justify-center text-[10px] font-bold">2</span>
                        <div className="h-1.5 bg-primary/20 rounded-full flex-1"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* App Bottom Nav */}
                <div className="h-16 bg-white border-t border-surface-200 flex items-center justify-around px-4">
                  <div className="flex flex-col items-center gap-1 text-primary-dark">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    <span className="text-[9px] font-bold">Home</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-navy-light hover:text-primary-dark transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                    <span className="text-[9px] font-medium">Tests</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-navy-light hover:text-primary-dark transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <span className="text-[9px] font-medium">Profile</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 -right-8 lg:-right-12 bg-white p-4 rounded-2xl shadow-glass-xl border border-surface-200 z-20 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <p className="text-xs text-navy-light font-medium">Writing Score</p>
                <p className="text-lg font-bold text-navy">Band 7.5</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
