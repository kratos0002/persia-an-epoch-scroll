import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ShaktiSectionShellProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
}

export const ShaktiSectionShell = ({ id, eyebrow, title, intro, children, className }: ShaktiSectionShellProps) => {
  return (
    <section id={id} className={cn('relative px-4 py-20 md:px-6 md:py-28', className)}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 max-w-3xl"
        >
          <p className="shakti-chip mb-4 inline-flex">{eyebrow}</p>
          <h2 className="shakti-title text-4xl md:text-6xl">{title}</h2>
          {intro && <p className="shakti-subtle-text mt-5 max-w-2xl text-lg leading-relaxed md:text-xl">{intro}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
};