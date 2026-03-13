import React from 'react';
import { motion } from 'framer-motion';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { CoalitionBoard } from '@/components/visuals/CoalitionBoard';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';

const GOLD = 'hsl(43, 70%, 50%)';
const PARCHMENT = 'hsl(45, 30%, 88%)';
const SMOKE = 'hsl(220, 8%, 35%)';
const MIDNIGHT = 'hsl(225, 30%, 7%)';

const steps = [
  <div key="e1">
    <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: GOLD }}>
      December 2, 1804
    </p>
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      The Coronation
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      He took the crown from the Pope's hands and placed it on his own head.
      No one would give Napoleon power — he would take it himself.
      The Republic was dead. The Empire had begun.
    </p>
  </div>,
  <div key="e2">
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      The Empire Expands
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      France's borders pushed outward. Holland, the Rhineland, northern Italy —
      absorbed directly or turned into satellite kingdoms ruled by Napoleon's brothers.
      Watch the board: conquered states lose their borders.
    </p>
  </div>,
  <div key="e3">
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: GOLD }}>
      The Code Napoléon
    </h3>
    <p className="font-body text-sm leading-relaxed mb-4" style={{ color: SMOKE }}>
      Not just a conqueror — a lawmaker. In 1804, he promulgated the Civil Code:
      2,281 articles that abolished feudal privileges, established equality before the law,
      and protected property rights. It would outlast every battlefield victory.
    </p>
    <div className="flex items-center gap-3">
      <span className="font-display text-3xl font-bold" style={{ color: GOLD }}>
        <AnimatedCounter end={2281} duration={2} />
      </span>
      <span className="text-xs font-body" style={{ color: SMOKE }}>articles of law</span>
    </div>
  </div>,
];

const CODE_ARTICLES = [
  { article: 'Art. 1', text: 'All citizens are equal before the law.' },
  { article: 'Art. 7', text: 'The exercise of civil rights is independent of political rights.' },
  { article: 'Art. 544', text: 'Property is the right to enjoy and dispose of things in the most absolute manner.' },
  { article: 'Art. 1134', text: 'Agreements lawfully entered into take the place of law for those who make them.' },
  { article: 'Art. 1382', text: 'Any act which causes damage to another obliges the one at fault to repair it.' },
];

const CODE_NATIONS = [
  'France', 'Belgium', 'Luxembourg', 'Monaco', 'Italy', 'Netherlands',
  'Spain', 'Portugal', 'Romania', 'Egypt', 'Louisiana', 'Quebec',
  'Bolivia', 'Chile', 'Dominican Rep.', 'Haiti', 'Japan', 'Turkey',
];

const CodexVisual = () => (
  <div className="w-full h-full flex items-center justify-center p-6">
    <div className="relative max-w-[520px] w-full">
      {/* Parchment document */}
      <motion.div
        className="rounded-lg p-8 md:p-10"
        style={{
          background: 'linear-gradient(170deg, hsl(40, 25%, 14%) 0%, hsl(35, 20%, 10%) 100%)',
          border: '1px solid hsl(43, 40%, 25%)',
          boxShadow: '0 0 40px hsla(43, 70%, 50%, 0.08), inset 0 0 60px hsla(225, 30%, 7%, 0.5)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <div className="text-center mb-6 pb-4" style={{ borderBottom: '1px solid hsl(43, 30%, 20%)' }}>
          <p className="text-[9px] tracking-[0.4em] uppercase font-body mb-2" style={{ color: 'hsl(43, 40%, 40%)' }}>
            21 March 1804
          </p>
          <h3 className="font-display text-xl md:text-2xl font-bold" style={{ color: GOLD }}>
            Code Civil des Français
          </h3>
          <p className="text-[10px] font-body mt-1" style={{ color: 'hsl(40, 20%, 45%)' }}>
            2,281 Articles · 36 Titles · 3 Books
          </p>
        </div>

        {/* Animated articles */}
        <div className="space-y-3 mb-6">
          {CODE_ARTICLES.map((item, i) => (
            <motion.div
              key={item.article}
              className="flex gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
            >
              <span className="text-[10px] font-body font-semibold shrink-0 mt-0.5" style={{ color: GOLD, opacity: 0.7 }}>
                {item.article}
              </span>
              <p className="text-[11px] font-body italic leading-relaxed" style={{ color: 'hsl(40, 20%, 65%)' }}>
                "{item.text}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="mb-4" style={{ borderTop: '1px solid hsl(43, 30%, 20%)' }} />

        {/* Spread — nations that adopted it */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-2" style={{ color: 'hsl(43, 40%, 40%)' }}>
            Adopted or influenced law in 70+ nations
          </p>
          <div className="flex flex-wrap gap-x-1.5 gap-y-1">
            {CODE_NATIONS.map((nation, i) => (
              <motion.span
                key={nation}
                className="text-[9px] font-body px-1.5 py-0.5 rounded"
                style={{
                  color: 'hsl(40, 25%, 60%)',
                  background: 'hsl(43, 20%, 15%)',
                  border: '1px solid hsl(43, 25%, 20%)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 + i * 0.05 }}
              >
                {nation}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  </div>
);

const EmperorGraphic = ({ step }: { step: number }) => {
  return (
    <div className="relative w-full h-full">
      {/* Step 0: Coronation painting */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center overflow-hidden p-8"
        animate={{ opacity: step === 0 ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="/images/napoleon-coronation-david.jpg"
          alt="The Coronation of Napoleon — Jacques-Louis David, 1807"
          className="max-w-full max-h-full object-contain rounded-lg"
          style={{ filter: 'brightness(0.85) contrast(1.1) saturate(0.9)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, hsla(225, 30%, 7%, 0.6) 100%)',
          }}
        />
        <p
          className="absolute bottom-6 right-8 text-[9px] font-body tracking-wider italic"
          style={{ color: 'hsl(40, 20%, 50%)', opacity: 0.6 }}
        >
          Jacques-Louis David, 1807 — Musée du Louvre
        </p>
      </motion.div>

      {/* Step 1: Coalition board */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: step === 1 ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <CoalitionBoard phase={4} />
      </motion.div>

      {/* Step 2: Code Napoléon codex */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: step === 2 ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <CodexVisual />
      </motion.div>
    </div>
  );
};

export const EmperorSection = () => {
  return (
    <section id="emperor" style={{ background: MIDNIGHT }}>
      <StickyScroll
        graphic={(step) => <EmperorGraphic step={step} />}
        steps={steps}
      />
    </section>
  );
};
