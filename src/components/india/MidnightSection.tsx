import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const MidnightSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="midnight" ref={ref} className="relative min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="md:ml-auto md:w-3/5">
          <motion.div
            className="rounded-xl p-8 backdrop-blur-md"
            style={{ background: 'hsla(220, 22%, 8%, 0.75)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: 'hsl(40, 30%, 50%)' }}>
              August 15, 1947
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6" style={{ color: 'hsl(40, 30%, 88%)' }}>
              Midnight's Cartography
            </h2>
            <p className="font-body text-base leading-relaxed mb-5" style={{ color: 'hsl(40, 20%, 70%)' }}>
              At the stroke of midnight on August 15, 1947, the British Indian Empire ceased to exist. In its place stood two new nations — India and Pakistan — carved by a line drawn by Sir Cyril Radcliffe, a man who had never visited India before.
            </p>
            <p className="font-body text-base leading-relaxed mb-5" style={{ color: 'hsl(40, 20%, 70%)' }}>
              Radcliffe had five weeks to divide a subcontinent. He split Punjab and Bengal along religious majorities, leaving millions on the wrong side. Between 10 and 20 million people were displaced. One to two million died in the violence that followed.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'hsl(40, 20%, 70%)' }}>
              But the British provinces were only half the story. The other half — 565 princely states covering two-fifths of India's territory — were told they were free to join India, join Pakistan, or remain independent.
            </p>

            {/* Radcliffe line mini viz */}
            <div className="border border-border/20 rounded-lg p-4" style={{ background: 'hsla(220, 18%, 12%, 0.6)' }}>
              <p className="text-[10px] tracking-[0.2em] uppercase font-body font-semibold mb-3" style={{ color: 'hsl(0, 60%, 55%)' }}>
                The Radcliffe Line
              </p>
              <svg viewBox="0 0 300 120" className="w-full">
                <rect x="0" y="0" width="300" height="120" fill="hsl(220, 18%, 12%)" rx="4" />
                <rect x="0" y="0" width="150" height="120" fill="hsl(25, 55%, 50%)" fillOpacity="0.15" rx="4" />
                <text x="75" y="20" textAnchor="middle" fill="hsl(25, 55%, 60%)" fontSize="10" fontFamily="'Cormorant Garamond', serif">INDIA</text>
                <rect x="150" y="0" width="150" height="120" fill="hsl(150, 50%, 35%)" fillOpacity="0.15" rx="4" />
                <text x="225" y="20" textAnchor="middle" fill="hsl(150, 50%, 50%)" fontSize="10" fontFamily="'Cormorant Garamond', serif">PAKISTAN</text>
                <motion.line
                  x1="150" y1="0" x2="150" y2="120"
                  stroke="hsl(0, 65%, 50%)" strokeWidth="2" strokeDasharray="6 3"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
                <text x="150" y="110" textAnchor="middle" fill="hsl(40, 25%, 60%)" fontSize="7" fontFamily="'Cormorant Garamond', serif">10–20 million displaced</text>
              </svg>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="text-center">
                  <div className="font-display text-2xl font-bold" style={{ color: 'hsl(0, 60%, 55%)' }}>5</div>
                  <div className="text-[9px] tracking-wide uppercase font-body" style={{ color: 'hsl(40, 20%, 50%)' }}>Weeks to draw the line</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl font-bold" style={{ color: 'hsl(0, 60%, 55%)' }}>1–2M</div>
                  <div className="text-[9px] tracking-wide uppercase font-body" style={{ color: 'hsl(40, 20%, 50%)' }}>Deaths in partition</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
