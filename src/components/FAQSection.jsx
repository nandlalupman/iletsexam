'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const faqs = [
  { q: 'What IELTS score can I realistically achieve?', a: 'Most of our students improve by 1.5-2.5 bands within 8 weeks. With our Professional or Premium plan, students consistently score 7+ bands. Your improvement depends on your starting level, dedication, and practice consistency.' },
  { q: 'How are the live classes conducted?', a: 'Live classes are conducted via Zoom with interactive whiteboards, real-time Q&A, and breakout rooms for group practice. Classes are recorded and available for replay within 24 hours. We offer morning and evening batches to suit different time zones.' },
  { q: 'What makes your AI Mock Tests different?', a: 'Our AI Mock Tests use advanced NLP to evaluate your responses just like a real IELTS examiner. For Speaking, it analyzes pronunciation, fluency, grammar, and vocabulary. For Writing, it checks task response, coherence, lexical resource, and grammatical accuracy.' },
  { q: 'Can I get a refund if I\'m not satisfied?', a: 'Yes! We offer a 7-day money-back guarantee for all plans. For Premium plan students, we also offer a 7+ Band Guarantee — if you don\'t achieve your target score after completing the full program, you get a full refund.' },
  { q: 'How does personal mentorship work?', a: 'You are assigned a dedicated IELTS expert who creates a personalized study plan based on your diagnostic test. They track your weekly progress, provide targeted feedback, adjust strategies, and conduct 1-on-1 practice sessions.' },
  { q: 'Do you provide study materials?', a: 'Yes, all plans include comprehensive digital study materials including practice books, vocabulary lists, grammar guides, sample essays with Band 9 samples, and audio files for listening practice. Materials are regularly updated.' },
  { q: 'Is this course suitable for beginners?', a: 'Absolutely! We welcome students at all levels. Our diagnostic test identifies your current level, and your study plan is customized accordingly. Beginners typically need 10-12 weeks, while intermediate students often achieve their goals in 6-8 weeks.' },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="section-padding-lg bg-white relative overflow-hidden">
      <div className="container-premium relative z-10 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-orange/10 text-accent-orange text-sm font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />FAQ
          </span>
          <h2 className="text-display-sm lg:text-display-md text-navy mb-6">Frequently Asked Questions</h2>
          <p className="text-body-lg text-navy/60">Everything you need to know about our IELTS preparation programs</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left p-6 rounded-2xl bg-surface border border-surface-300/50 hover:border-primary/20 transition-all duration-300 group" id={`faq-item-${i}`}>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-body-lg font-semibold text-navy group-hover:text-primary transition-colors">{faq.q}</h3>
                  <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-surface-300 flex items-center justify-center">
                    <svg className="w-4 h-4 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </motion.div>
                </div>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} className="overflow-hidden">
                      <p className="text-navy/60 text-body-md leading-relaxed pt-4 pr-12">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
