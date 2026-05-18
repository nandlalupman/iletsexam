'use client';

import { motion } from 'framer-motion';

const modules = [
  {
    title: 'Reading',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: 'from-blue-500 to-primary',
    duration: '6 Weeks',
    features: ['Passage Analysis', 'Speed Reading', 'Skimming & Scanning', 'Question Types Mastery'],
    mentor: 'Sarah Williams',
    level: 'All Levels',
  },
  {
    title: 'Writing',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    color: 'from-accent-orange to-red-500',
    duration: '8 Weeks',
    features: ['Task 1 & Task 2', 'Essay Structures', 'Grammar Perfection', 'Band 9 Samples'],
    mentor: 'Dr. James Chen',
    level: 'Intermediate+',
  },
  {
    title: 'Listening',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    color: 'from-green-500 to-emerald-600',
    duration: '5 Weeks',
    features: ['Note Completion', 'Map Labeling', 'Multiple Choice', 'Accent Training'],
    mentor: 'Emily Roberts',
    level: 'All Levels',
  },
  {
    title: 'Speaking',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    color: 'from-accent-yellow to-accent-orange',
    duration: '6 Weeks',
    features: ['Part 1, 2 & 3 Practice', 'Pronunciation', 'Fluency Training', '1-on-1 Mock Tests'],
    mentor: 'Michael Park',
    level: 'All Levels',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function CourseShowcase() {
  return (
    <section id="courses" className="section-padding-lg bg-surface relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-yellow/5 rounded-full blur-3xl" />

      <div className="container-premium relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Premium Modules
          </span>
          <h2 className="text-display-sm lg:text-display-md text-navy mb-6">
            Master Every IELTS Module
          </h2>
          <p className="text-body-lg text-navy/60 max-w-2xl mx-auto">
            Comprehensive preparation designed by certified IELTS trainers with 15+ years of experience
          </p>
        </motion.div>

        {/* Course Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-card rounded-3xl p-6 lg:p-8 group cursor-pointer gradient-border"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {mod.icon}
              </div>

              {/* Title */}
              <h3 className="text-heading-xl text-navy mb-2">{mod.title}</h3>

              {/* Meta */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-sm text-navy/50 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {mod.duration}
                </span>
                <span className="w-1 h-1 rounded-full bg-navy/20" />
                <span className="text-sm text-navy/50">{mod.level}</span>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-6">
                {mod.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-navy/70">
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Mentor */}
              <div className="flex items-center gap-3 pt-5 border-t border-navy/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{mod.mentor.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-navy">{mod.mentor}</div>
                  <div className="text-xs text-navy/40">IELTS Expert</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
