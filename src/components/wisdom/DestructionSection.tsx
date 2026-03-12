import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { KnowledgeGraph } from '@/components/visuals/KnowledgeGraph';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { EraTransition } from '@/components/visuals/EraTransition';

const MONGOL_RED = 'hsl(15, 75%, 50%)';
const BLOOD_RED = 'hsl(0, 70%, 55%)';

/** Animated arrow overlay showing the Mongol approach */
const MongolApproach = ({ activeStep }: { activeStep: number }) => {
  // Step 0: arrow appears far away (top-right). Step 1: arrow closer, graph trembles.
  // Step 2+: arrow gone, destruction takes over.
  if (activeStep >= 2) return null;

  const progress = activeStep === 0 ? 0.35 : 0.85;
  // Arrow path: sweeps from top-right toward center-left (where Baghdad/graph is)
  const arrowPath = 'M880,20 C700,60 500,150 440,310';
  const pathLen = 600; // approximate

  return (
    <svg
      viewBox="0 0 880 620"
      className="absolute inset-0 z-20 w-full h-full pointer-events-none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker id="mongol-arrow" markerWidth="10" markerHeight="8" refX="10" refY="4" orient="auto">
          <path d="M0,0 L10,4 L0,8 L3,4 Z" fill={MONGOL_RED} opacity={0.9} />
        </marker>
        <filter id="mongol-glow">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <linearGradient id="mongol-trail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={MONGOL_RED} stopOpacity="0" />
          <stop offset="60%" stopColor={MONGOL_RED} stopOpacity="0.4" />
          <stop offset="100%" stopColor={MONGOL_RED} stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Trail glow */}
      <motion.path
        d={arrowPath}
        fill="none"
        stroke={MONGOL_RED}
        strokeWidth={12}
        strokeLinecap="round"
        opacity={0.08}
        filter="url(#mongol-glow)"
        strokeDasharray={pathLen}
        animate={{ strokeDashoffset: pathLen * (1 - progress) }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* Main route line */}
      <motion.path
        d={arrowPath}
        fill="none"
        stroke="url(#mongol-trail)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={pathLen}
        markerEnd="url(#mongol-arrow)"
        animate={{ strokeDashoffset: pathLen * (1 - progress) }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* Origin label — Karakorum */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: activeStep >= 0 ? 0.9 : 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <text
          x={860} y={16}
          textAnchor="end"
          fill={MONGOL_RED}
          fontSize="10"
          fontFamily="'Cormorant Garamond', serif"
          fontWeight="600"
          letterSpacing="0.15em"
        >
          KARAKORUM
        </text>
        <circle cx={878} cy={20} r={4} fill={MONGOL_RED} opacity={0.7} />
        <motion.circle
          cx={878} cy={20} r={10}
          fill={MONGOL_RED}
          opacity={0.15}
          animate={{ r: [10, 16, 10], opacity: [0.15, 0.05, 0.15] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.g>

      {/* Force indicator — horsemen dots along the path */}
      {Array.from({ length: 8 }).map((_, i) => {
        const t = Math.max(0, progress - 0.05 * i) * 0.9;
        // Approximate point along the bezier
        const px = 880 - t * 440;
        const py = 20 + t * 290;
        return (
          <motion.circle
            key={`rider-${i}`}
            cx={px}
            cy={py + ((i * 17) % 30) - 15}
            r={2}
            fill={MONGOL_RED}
            initial={{ opacity: 0 }}
            animate={{ opacity: t > 0.05 ? [0.3, 0.7, 0.3] : 0 }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
          />
        );
      })}

      {/* Army size label at arrow tip */}
      {activeStep >= 1 && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 0.8 }}
        >
          <text
            x={420} y={340}
            textAnchor="middle"
            fill={MONGOL_RED}
            fontSize="9"
            fontFamily="'Cormorant Garamond', serif"
            fontWeight="600"
            letterSpacing="0.1em"
          >
            150,000 SOLDIERS
          </text>
        </motion.g>
      )}
    </svg>
  );
};

export const DestructionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const [dp, setDp] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.35, 0.8, 1], [0, 0.3, 0.3, 0]);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      // Destruction starts at step 2 (~33% scroll), peaks at step 5 (~85%)
      setDp(Math.min(1, Math.max(0, (v - 0.33) / 0.5)));
    });
    return unsub;
  }, [scrollYProgress]);

  // Tremor amount for steps 0-1 (pre-destruction anxiety)
  const tremor = activeStep === 1 ? 2 : 0;

  return (
    <section id="destruction" ref={sectionRef} style={{ '--era-primary': '0 70% 45%' } as React.CSSProperties}>
      {/* Red overlay driven by scroll */}
      <motion.div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          opacity: overlayOpacity,
          background: 'radial-gradient(ellipse at 50% 50%, hsl(0, 70%, 35%) 0%, hsl(0, 70%, 20%) 100%)',
        }}
      />

      <div className="relative z-[2]">
        <StickyScroll
          graphic={(step) => {
            // Track step for tremor
            if (step !== activeStep) setActiveStep(step);
            return (
              <div className="w-full h-full relative">
                <div className="absolute inset-0" style={{
                  background: `radial-gradient(ellipse at 50% 50%, hsl(0, 70%, 30% / ${0.05 + dp * 0.1}) 0%, transparent 70%)`,
                }} />

                {/* Knowledge graph with tremor */}
                <motion.div
                  className="w-full h-full"
                  animate={tremor > 0 ? {
                    x: [0, -tremor, tremor, -tremor * 0.5, 0],
                    y: [0, tremor * 0.5, -tremor * 0.5, tremor * 0.3, 0],
                  } : { x: 0, y: 0 }}
                  transition={tremor > 0 ? { duration: 0.3, repeat: Infinity, repeatDelay: 1.5 } : {}}
                >
                  <KnowledgeGraph
                    activePhase={3}
                    progress={0}
                    destructionProgress={dp}
                  />
                </motion.div>

                {/* Mongol approach overlay */}
                <MongolApproach activeStep={step} />
              </div>
            );
          }}
          steps={[
            <div key={0}>
              <p className="text-xs tracking-[0.3em] uppercase mb-4 font-body text-[hsl(25,80%,55%,0.7)]">
                1206–1258 CE
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-[hsl(25,80%,55%)]">
                From the Steppe
              </h2>
              <p className="text-foreground/80 text-lg leading-relaxed font-body mb-4">
                In 1206, Genghis Khan united the Mongol tribes. Within fifty years, his empire stretched from Korea to Hungary.
              </p>
              <p className="text-foreground/60 leading-relaxed font-body">
                His grandson Hulagu was given one mission: destroy every Islamic power from Persia to Egypt. He marched west with 150,000 soldiers — the largest Mongol army ever assembled.
              </p>
            </div>,
            <div key={1}>
              <h3 className="font-display text-xl font-bold mb-4 text-[hsl(15,75%,50%)]">
                The Caliph's Gamble
              </h3>
              <p className="text-foreground/80 leading-relaxed font-body mb-3">
                Caliph al-Musta'sim refused to surrender. He had 50,000 soldiers. Hulagu had three times that — plus Chinese siege engineers, Persian administrators, and Christian allies.
              </p>
              <p className="text-foreground/60 leading-relaxed font-body">
                The Caliph reportedly sent a message: "Young man, do not deceive yourself. You will not be the one to extinguish the Abbasid flame." He was wrong.
              </p>
            </div>,
            <div key={2}>
              <p className="text-xs tracking-[0.3em] uppercase mb-4 font-body text-[hsl(0,70%,55%,0.6)]">
                FEBRUARY 1258
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-[hsl(0,70%,55%)]">
                The Tigris Ran Black
              </h2>
              <p className="text-foreground/80 text-lg leading-relaxed font-body">
                Hulagu's army breached the walls of Baghdad. The full knowledge graph is still intact — but not for long.
              </p>
            </div>,
            <div key={3}>
              <h3 className="font-display text-xl font-bold mb-4 text-[hsl(0,60%,50%)]">
                The Sacking Begins
              </h3>
              <p className="text-foreground/80 leading-relaxed font-body mb-3">
                What followed was not just a massacre of people. It was a massacre of knowledge.
              </p>
              <p className="text-foreground/60 leading-relaxed font-body">
                Watch the knowledge graph shatter as you scroll.
              </p>
            </div>,
            <div key={4}>
              <h3 className="font-display text-xl font-bold mb-4 text-[hsl(0,70%,50%)]">
                The Numbers
              </h3>
              <p className="text-foreground/80 leading-relaxed font-body mb-4">
                The Mongols threw the books into the Tigris. The water ran black with ink for six months.
              </p>
              <div className="flex gap-6">
                <AnimatedCounter end={3000000} label="Books destroyed" className="text-[hsl(0,70%,55%)]" />
                <AnimatedCounter end={90000} label="People killed" className="text-[hsl(0,70%,55%)]" />
              </div>
            </div>,
            <div key={5}>
              <blockquote className="border-l-2 border-[hsl(0,70%,45%)] pl-5 py-1">
                <p className="text-foreground/80 text-lg font-body italic leading-relaxed mb-3">
                  "They swept through the city like hungry falcons attacking a flight of doves."
                </p>
                <p className="text-foreground/40 text-sm font-body">
                  — Rashid al-Din, Persian historian
                </p>
              </blockquote>
              <p className="text-foreground/60 leading-relaxed font-body mt-4">
                Scholars were drowned alongside their life's work. Irrigation canals — some a thousand years old — were destroyed. Baghdad would not recover for centuries.
              </p>
            </div>,
          ]}
        />
      </div>

      <EraTransition fromColor="0 70% 45%" toColor="170 40% 30%" label="What Survived" />
    </section>
  );
};
