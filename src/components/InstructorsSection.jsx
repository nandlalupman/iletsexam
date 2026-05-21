'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const instructors = [
  {
    name: 'Divya Lavania',
    role: 'Lead IELTS Trainer',
    description: 'Expert trainer with years of experience in helping students achieve their target band scores. Specializes in Writing and Speaking modules.',
    image: '/divya.png', 
  },
  {
    name: 'Daksh Lavania',
    role: 'Senior IELTS Coach',
    description: 'Dedicated coach focusing on Reading and Listening strategies. Known for personalized feedback and fast-track success plans.',
    image: '/daksh.jpg',
  }
];

export default function InstructorsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-premium">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-dark font-bold tracking-wider uppercase text-sm mb-4 block">Our Team</span>
          <h2 className="text-display-sm md:text-display-md text-navy mb-6">
            Meet Your <span className="gradient-text">Expert Trainers</span>
          </h2>
          <p className="text-body-lg text-navy-light">
            Learn directly from the best. Our small batches ensure you get the personalized guidance you need.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {instructors.map((instructor, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-surface rounded-3xl overflow-hidden border border-surface-200 shadow-glass-sm hover:shadow-premium transition-all duration-300"
            >
              <div className="relative h-[400px] w-full">
                <Image 
                  src={instructor.image} 
                  alt={instructor.name} 
                  fill 
                  className="object-cover object-center"
                  unoptimized 
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-navy mb-1">{instructor.name}</h3>
                <p className="text-primary-dark font-semibold mb-4">{instructor.role}</p>
                <p className="text-navy-light">{instructor.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
