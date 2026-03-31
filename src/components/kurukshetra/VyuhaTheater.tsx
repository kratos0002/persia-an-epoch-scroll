import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { DAY_JOURNAL, DayEntry, VYUHA_SHAPES, WarPhase } from './kurukshetraData';
import { cn } from '@/lib/utils';

/* ── Phase config ── */
const PHASE_META: Record<WarPhase, { bg: string; accent: string; label: string }> = {
  1: { bg: 'bg-kuru-dust', accent: 'text-kuru-bronze', label: 'Phase I · Bhishma Commands' },
  2: { bg: 'bg-kuru-dust', accent: 'text-kuru-bronze', label: 'Phase II · Drona Commands' },
  3: { bg: 'bg-kuru-dust', accent: 'text-kuru-red', label: 'Phase III · Karna Commands' },
  4: { bg: 'bg-kuru-ash/20', accent: 'text-kuru-ash', label: 'Phase IV · The Collapse' },
};

/* ── Large Vyuha SVG (sticky visual) ── */
const LargeVyuha = ({ vyuhaName, phase }: { vyuhaName: string; phase: WarPhase }) => {
  const shape = VYUHA_SHAPES[vyuhaName];
  if (!shape) return null;

  const crack = phase === 1 ? 0 : phase === 2 ? 0.3 : phase === 3 ? 0.7 : 1;
  const goldOpacity = phase === 1 ? 1 : phase === 2 ? 0.7 : phase === 3 ? 0.3 : 0.08;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-[min(45vw,55vh)] h-[min(45vw,55vh)] overflow-visible">
        {shape.paths.map((d, i) => (
          <motion.path
            key={`${vyuhaName}-${i}`}
            d={d}
            fill="none"
            stroke="hsl(var(--kuru-gold))"
            strokeWidth={0.6}
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: goldOpacity * (1 - crack * 0.3),
            }}
            transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
            style={{
              strokeDasharray: crack > 0.5 ? '6 3' : 'none',
              transform: crack > 0
                ? `translate(${Math.sin(i * 7) * crack * 2.5}px, ${Math.cos(i * 11) * crack * 2.5}px)`
                : 'none',
            }}
          />
        ))}
        {/* Center bindu */}
        <circle cx={50} cy={50} r={crack > 0.7 ? 0.5 : 2}
          fill="hsl(var(--kuru-gold))" opacity={goldOpacity} />
      </svg>

      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="rounded-full"
          style={{
            width: '50%', height: '50%',
            background: phase <= 2
              ? 'radial-gradient(circle, hsl(var(--kuru-gold) / 0.06), transparent 70%)'
              : phase === 3
                ? 'radial-gradient(circle, hsl(var(--kuru-red) / 0.08), transparent 70%)'
                : 'radial-gradient(circle, hsl(var(--kuru-ash) / 0.05), transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.3, 0.6] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
      </div>

      {/* Formation name */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <span className="font-display text-sm tracking-[0.2em] uppercase"
          style={{ color: `hsl(var(--kuru-gold) / ${goldOpacity})` }}>
          {shape.name}
        </span>
        <span className="block font-devanagari text-xs text-kuru-ash mt-1">{shape.sanskrit}</span>
      </div>
    </div>
  );
};

/* ── Scrolling Day Card ── */
const DayCard = ({ entry }: { entry: DayEntry }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const phaseColor = entry.phase <= 2 ? 'kuru-bronze' : entry.phase === 3 ? 'kuru-red' : 'kuru-ash';

  return (
    <motion.div
      ref={ref}
      className="min-h-[60vh] flex items-center py-8"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className={cn(
        'relative rounded-sm p-6 md:p-8 backdrop-blur-sm border w-full',
        entry.phase === 1 && 'border-kuru-bronze/15 bg-kuru-dust/80',
        entry.phase === 2 && 'border-kuru-bronze/20 bg-kuru-dust/70',
        entry.phase === 3 && 'border-kuru-red/20 bg-kuru-red/[0.03] backdrop-blur-md',
        entry.phase === 4 && 'border-kuru-ash/30 bg-kuru-ash/[0.06] backdrop-blur-md',
      )}>
        {/* Day number — monumental */}
        <div className="flex items-baseline gap-3 mb-4">
          <span className={cn(
            'font-display text-6xl md:text-7xl font-bold leading-none',
            `text-${phaseColor}`,
          )}>
            {entry.day}
          </span>
          <div>
            <span className="block font-display text-xs tracking-[0.25em] uppercase text-kuru-kohl/40">
              {entry.senapati} commands
            </span>
            <span className="block font-body text-[10px] text-kuru-kohl/30 mt-0.5">
              {entry.vyuhaKaurava !== '—' && `Kaurava: ${entry.vyuhaKaurava}`}
              {entry.vyuhaPandava !== '—' && ` · Pandava: ${entry.vyuhaPandava}`}
            </span>
          </div>
        </div>

        {/* Narrative */}
        <p className="font-body text-base md:text-lg text-kuru-kohl/80 leading-relaxed">
          {entry.narrative}
        </p>

        {/* Casualties — names that ignite then fade */}
        {entry.casualties.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {entry.casualties.map((c) => {
              const isPandava = c.includes('(P');
              return (
                <motion.span
                  key={c}
                  className={cn(
                    'font-display text-xs tracking-[0.1em] px-3 py-1 rounded-sm border',
                    isPandava
                      ? 'border-kuru-gold/20 text-kuru-gold/80 bg-kuru-gold/[0.06]'
                      : 'border-kuru-red/20 text-kuru-red/80 bg-kuru-red/[0.06]'
                  )}
                  initial={{ opacity: 1, filter: 'brightness(1.5)' }}
                  animate={inView ? { opacity: 0.4, filter: 'brightness(0.7)' } : {}}
                  transition={{ delay: 2, duration: 2.5 }}
                >
                  {c.replace(' (P)', ' ✦').replace(' (K)', ' ✦').replace(' (K – fallen)', ' †').replace(' (P – fallen)', ' †')}
                </motion.span>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ── Phase Divider ── */
const PhaseDivider = ({ phase }: { phase: WarPhase }) => {
  const meta = PHASE_META[phase];
  return (
    <div className="min-h-[30vh] flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className={cn('font-display text-sm tracking-[0.3em] uppercase', meta.accent)}>
          {meta.label}
        </div>
        <div className="mt-3 h-px w-20 mx-auto bg-gradient-to-r from-transparent via-kuru-bronze/30 to-transparent" />
      </motion.div>
    </div>
  );
};

/* ── Main VyuhaTheater ── */
export const VyuhaTheater = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll to current day index
  const totalDays = DAY_JOURNAL.length;

  // Build the interleaved content: phase dividers + day cards
  const phases: WarPhase[] = [1, 2, 3, 4];
  const phaseIds = ['kuru-phase1', 'kuru-phase2', 'kuru-phase3', 'kuru-phase4'];

  return (
    <div ref={containerRef} className="relative">
      {phases.map((phase, pi) => {
        const days = DAY_JOURNAL.filter(d => d.phase === phase);
        const currentVyuha = days[0]?.vyuhaKaurava || 'Vajra';

        return (
          <section
            key={phase}
            id={phaseIds[pi]}
            className={cn(
              'relative kuru-grain',
              PHASE_META[phase].bg,
            )}
          >
            {/* Crack overlay */}
            {phase > 1 && (
              <div
                className="absolute inset-0 pointer-events-none kuru-cracks"
                style={{ opacity: phase === 2 ? 0.08 : phase === 3 ? 0.2 : 0.4 }}
              />
            )}

            <div className="relative mx-auto max-w-7xl">
              {/* Sticky split layout */}
              <div className="flex flex-col md:flex-row">
                {/* LEFT: sticky formation diagram */}
                <div className="hidden md:block md:w-[45%] lg:w-[50%]">
                  <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
                    <StickyVyuhaPanel days={days} phase={phase} />
                  </div>
                </div>

                {/* RIGHT: scrolling day cards */}
                <div className="w-full md:w-[55%] lg:w-[50%] px-4 md:px-8 relative">
                  <PhaseDivider phase={phase} />
                  {days.map((entry) => (
                    <DayCard key={entry.day} entry={entry} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

/* ── Sticky panel that switches vyuha per visible day card ── */
const StickyVyuhaPanel = ({ days, phase }: { days: DayEntry[]; phase: WarPhase }) => {
  // Show the most dramatic vyuha from this phase
  // We cycle through formations as cards scroll by using IntersectionObserver
  // For simplicity: show the first formation, then update on visibility
  const [activeVyuha, setActiveVyuha] = React.useState(days[0]?.vyuhaKaurava || 'Vajra');

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];

    days.forEach((day) => {
      const el = document.querySelector(`[data-day="${day.day}"]`);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && day.vyuhaKaurava !== '—') {
            setActiveVyuha(day.vyuhaKaurava);
          }
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [days]);

  return <LargeVyuha vyuhaName={activeVyuha} phase={phase} />;
};
