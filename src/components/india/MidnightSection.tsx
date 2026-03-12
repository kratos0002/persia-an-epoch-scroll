import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const MidnightSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="midnight" ref={ref} className="relative min-h-screen py-24 px-6" style={{ background: 'hsl(220, 22%, 8%)' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: 'hsl(40, 30%, 50%)' }}>
            August 15, 1947
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-8" style={{ color: 'hsl(40, 30%, 88%)' }}>
            Midnight's Cartography
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <p className="font-body text-lg leading-relaxed mb-6" style={{ color: 'hsl(40, 20%, 70%)' }}>
              At the stroke of midnight on August 15, 1947, the British Indian Empire ceased to exist. In its place stood two new nations — India and Pakistan — carved by a line drawn by Sir Cyril Radcliffe, a man who had never visited India before.
            </p>
            <p className="font-body text-lg leading-relaxed mb-6" style={{ color: 'hsl(40, 20%, 70%)' }}>
              Radcliffe had five weeks to divide a subcontinent. He split Punjab and Bengal along religious majorities, leaving millions on the wrong side. Between 10 and 20 million people were displaced. One to two million died in the violence that followed.
            </p>
            <p className="font-body text-lg leading-relaxed" style={{ color: 'hsl(40, 20%, 70%)' }}>
              But the British provinces were only half the story. The other half — 565 princely states covering two-fifths of India's territory — were told they were free to join India, join Pakistan, or remain independent.
            </p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            {/* Radcliffe line visualization */}
            <div className="bg-card/40 border border-border/30 rounded-lg p-6">
              <p className="text-[10px] tracking-[0.2em] uppercase font-body font-semibold mb-4" style={{ color: 'hsl(0, 60%, 55%)' }}>
                The Radcliffe Line
              </p>
              <svg viewBox="0 0 300 200" className="w-full">
                {/* Simplified Punjab/Bengal division */}
                <rect x="0" y="0" width="300" height="200" fill="hsl(220, 18%, 12%)" rx="4" />
                {/* India side */}
                <rect x="0" y="0" width="150" height="200" fill="hsl(25, 55%, 50%)" fillOpacity="0.15" rx="4" />
                <text x="75" y="30" textAnchor="middle" fill="hsl(25, 55%, 60%)" fontSize="10" fontFamily="'Cormorant Garamond', serif">INDIA</text>
                {/* Pakistan side */}
                <rect x="150" y="0" width="150" height="200" fill="hsl(150, 50%, 35%)" fillOpacity="0.15" rx="4" />
                <text x="225" y="30" textAnchor="middle" fill="hsl(150, 50%, 50%)" fontSize="10" fontFamily="'Cormorant Garamond', serif">PAKISTAN</text>
                {/* The line */}
                <motion.line
                  x1="150" y1="0" x2="150" y2="200"
                  stroke="hsl(0, 65%, 50%)"
                  strokeWidth="2"
                  strokeDasharray="6 3"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
                {/* Displacement arrows */}
                {[50, 90, 130, 170].map((y, i) => (
                  <React.Fragment key={i}>
                    <motion.path
                      d={`M${170 + i * 5},${y} L${135 - i * 3},${y}`}
                      stroke="hsl(25, 55%, 50%)"
                      strokeWidth="1"
                      fill="none"
                      markerEnd="url(#arrow-india)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
                      transition={{ delay: 1.2 + i * 0.15 }}
                    />
                    <motion.path
                      d={`M${130 - i * 3},${y + 15} L${165 + i * 5},${y + 15}`}
                      stroke="hsl(150, 50%, 45%)"
                      strokeWidth="1"
                      fill="none"
                      markerEnd="url(#arrow-pak)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
                      transition={{ delay: 1.3 + i * 0.15 }}
                    />
                  </React.Fragment>
                ))}
                <defs>
                  <marker id="arrow-india" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                    <path d="M0,0 L6,2 L0,4" fill="hsl(25, 55%, 50%)" />
                  </marker>
                  <marker id="arrow-pak" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                    <path d="M0,0 L6,2 L0,4" fill="hsl(150, 50%, 45%)" />
                  </marker>
                </defs>
                {/* Stats */}
                <text x="75" y="185" textAnchor="middle" fill="hsl(40, 25%, 60%)" fontSize="8" fontFamily="'Cormorant Garamond', serif">10–20 million displaced</text>
              </svg>

              <div className="grid grid-cols-2 gap-4 mt-4">
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
