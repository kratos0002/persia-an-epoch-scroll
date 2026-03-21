import React from 'react';
import { motion } from 'framer-motion';
import { SHAKTI_PEETHS } from '@/components/visuals/shaktiPeethData';

const orbPoints = SHAKTI_PEETHS.slice(0, 18);

export const ShaktiHero = () => {
  return (
    <section id="shakti-hero" className="shakti-bg shakti-grain relative overflow-hidden px-4 pt-24 pb-20 md:px-6 md:pt-32 md:pb-28">
      <div className="shakti-yantra-grid absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,hsl(var(--shakti-gold)/0.25),transparent_18%),radial-gradient(circle_at_50%_100%,hsl(var(--shakti-vermilion)/0.16),transparent_55%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="shakti-chip mb-5 inline-flex"
          >
            Sacred atlas · anatomy as geography
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="shakti-title text-5xl leading-[0.9] md:text-7xl"
          >
            The Sacred Anatomy of Bharatavarsha
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-5 max-w-xl font-body text-xl leading-relaxed text-shakti-ink/78"
          >
            The body of Sati breaks, the land lights up, and the subcontinent becomes a living map of feminine power rather than a list of temples.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {['52 peethas', '6 modern countries', '4–108 competing canons', 'myth, tantra, pilgrimage'].map((item) => (
              <span key={item} className="rounded-full border border-shakti-line/25 bg-shakti-panel/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-shakti-ink/72 backdrop-blur-md">
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-[40rem]"
        >
          <div className="absolute inset-[10%] rounded-full border border-shakti-vermilion/35 bg-[radial-gradient(circle,hsl(var(--shakti-vermilion)/0.16),transparent_62%)] blur-[1px]" />
          <div className="absolute inset-[18%] rounded-full border border-shakti-gold/28 bg-[radial-gradient(circle,hsl(var(--shakti-gold)/0.12),transparent_58%)]" />

          <svg viewBox="0 0 700 880" className="absolute inset-0 h-full w-full">
            <defs>
              <radialGradient id="shaktiHeroGlow" cx="50%" cy="48%" r="38%">
                <stop offset="0%" stopColor="hsl(var(--shakti-gold) / 0.92)" />
                <stop offset="100%" stopColor="hsl(var(--shakti-gold) / 0)" />
              </radialGradient>
            </defs>

            <circle cx="350" cy="332" r="198" fill="url(#shaktiHeroGlow)" />

            {Array.from({ length: 24 }).map((_, index) => {
              const angle = (Math.PI * 2 * index) / 24;
              const inner = 210;
              const outer = index % 2 === 0 ? 282 : 248;
              return (
                <path
                  key={index}
                  d={`M ${350 + Math.cos(angle) * inner} ${332 + Math.sin(angle) * inner} L ${350 + Math.cos(angle + 0.08) * outer} ${332 + Math.sin(angle + 0.08) * outer} L ${350 + Math.cos(angle + 0.16) * inner} ${332 + Math.sin(angle + 0.16) * inner}`}
                  fill="hsl(var(--shakti-vermilion) / 0.26)"
                  stroke="hsl(var(--shakti-vermilion) / 0.5)"
                  strokeWidth="1"
                />
              );
            })}

            <motion.path
              d="M350 166 C392 166 420 200 422 242 C458 258 478 294 470 338 C496 370 500 410 480 446 C466 472 446 486 424 498 L424 626 C424 688 402 734 350 782 C298 734 276 688 276 626 L276 498 C254 486 234 472 220 446 C200 410 204 370 230 338 C222 294 242 258 278 242 C280 200 308 166 350 166 Z"
              fill="hsl(var(--shakti-gold) / 0.1)"
              stroke="hsl(var(--shakti-gold) / 0.92)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
            />
            <motion.circle cx="350" cy="236" r="30" fill="hsl(var(--shakti-gold) / 0.12)" stroke="hsl(var(--shakti-gold) / 0.88)" strokeWidth="3" initial={{ scale: 0.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.9, delay: 0.45 }} />

            {orbPoints.map((site, index) => {
              const tx = 140 + ((site.coords[0] - 67) / 27) * 420;
              const ty = 500 + (1 - (site.coords[1] - 6) / 29) * 220;
              return (
                <motion.circle
                  key={site.id}
                  cx={tx}
                  cy={ty}
                  r={index % 5 === 0 ? 5 : 3.5}
                  fill="hsl(var(--shakti-gold))"
                  initial={{ opacity: 0, y: -180, scale: 0.2 }}
                  animate={{ opacity: [0, 1, 0.7], y: 0, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.5 + index * 0.04, ease: [0.2, 0.9, 0.25, 1] }}
                />
              );
            })}

            <path
              d="M164 626 C208 566 286 542 350 540 C432 536 500 566 552 622 C504 708 442 772 350 804 C258 772 206 706 164 626 Z"
              fill="hsl(var(--shakti-gold) / 0.08)"
              stroke="hsl(var(--shakti-line) / 0.24)"
              strokeWidth="2"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};