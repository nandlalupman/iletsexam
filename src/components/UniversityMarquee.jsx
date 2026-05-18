'use client';

import { motion } from 'framer-motion';

const universities = [
  { name: 'University of Oxford', logo: 'OXFORD' },
  { name: 'University of Cambridge', logo: 'CAMBRIDGE' },
  { name: 'Harvard University', logo: 'HARVARD' },
  { name: 'Stanford University', logo: 'STANFORD' },
  { name: 'MIT', logo: 'MIT' },
  { name: 'Imperial College London', logo: 'IMPERIAL' },
  { name: 'University of Toronto', logo: 'TORONTO' },
  { name: 'University of Melbourne', logo: 'MELBOURNE' },
];

export default function UniversityMarquee() {
  return (
    <section className="py-10 bg-white border-y border-surface-200 overflow-hidden">
      <div className="container-premium mb-6">
        <p className="text-center text-sm font-semibold text-navy/40 uppercase tracking-widest">
          Trusted by students admitted to top universities worldwide
        </p>
      </div>
      
      <div className="relative w-full flex overflow-hidden">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        
        {/* Scrolling Content */}
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
          className="flex whitespace-nowrap items-center"
        >
          {/* Double the array for seamless infinite scroll */}
          {[...universities, ...universities].map((uni, idx) => (
            <div 
              key={idx} 
              className="mx-8 md:mx-12 lg:mx-16 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              <span className="text-2xl md:text-3xl font-serif font-bold text-navy/80 tracking-tight">
                {uni.logo}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
    </section>
  );
}
