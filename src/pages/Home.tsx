import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { usePageAnalytics } from '@/hooks/usePageAnalytics';
import { useStoryOverrides } from '@/hooks/useStoryOverrides';
import storyPersia from '@/assets/story-persia.jpg';
import storyWisdom from '@/assets/story-wisdom.jpg';
import storyMongol from '@/assets/story-mongol.jpg';
import storyBuddhism from '@/assets/story-buddhism.jpg';
import storySamurai from '@/assets/story-samurai.jpg';
import story1857 from '@/assets/story-1857.jpg';
import storyNapoleon from '@/assets/story-napoleon.jpg';
import storyConstantinople from '@/assets/story-constantinople.jpg';
import storyIndia from '@/assets/story-india.jpg';
import storyNuclear from '@/assets/story-nuclear.jpg';

/* ── Types ───────────────────────────────────── */

interface StoryCard {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  hook: string;
  image: string;
  tags: string[];
  status: 'live' | 'coming-soon' | 'draft';
  href: string;
  color: string;
  era: string;
  sortYear: number;
}

const STORIES: StoryCard[] = [
  {
    id: 'persia', number: 1, title: 'The Immortal Empire', subtitle: 'The History of Persia',
    hook: 'What if one civilization shaped more of the modern world than Rome, Greece, and Egypt combined?',
    image: storyPersia, tags: ['Visual Essay', 'Scrollytelling', '2,500 years'],
    status: 'live', href: '/persia', color: 'hsl(43, 85%, 55%)', era: '550 BCE', sortYear: -550,
  },
  {
    id: 'wisdom', number: 2, title: 'The Library That Lit the World', subtitle: 'The House of Wisdom',
    hook: 'For 400 years, one building in Baghdad held more knowledge than all of Europe combined.',
    image: storyWisdom, tags: ['Visual Essay', 'Knowledge Graph', '762–1258 CE'],
    status: 'live', href: '/wisdom', color: 'hsl(170, 40%, 38%)', era: '762 CE', sortYear: 762,
  },
  {
    id: 'buddhism', number: 3, title: 'The Path That Split', subtitle: 'The Spread of Buddhism',
    hook: 'One man sat under a tree and asked why we suffer. His answer split into a thousand traditions that reached every corner of Asia.',
    image: storyBuddhism, tags: ['Visual Essay', 'Branching Tree', '528 BCE–Today'],
    status: 'live', href: '/buddhism', color: 'hsl(30, 65%, 45%)', era: '528 BCE', sortYear: -528,
  },
  {
    id: 'samurai', number: 4, title: 'Stipends, Bonds & the Death of a Class', subtitle: 'The End of the Samurai',
    hook: 'The samurai class was not destroyed by war but by accounting: stipends converted to bonds, domains merged into prefectures, privilege replaced by institutions.',
    image: storySamurai, tags: ['Ledger Visual', 'Ink & Paper', '1603–1877'],
    status: 'live', href: '/samurai', color: 'hsl(5, 75%, 50%)', era: '1603', sortYear: 1603,
  },
  {
    id: '1857', number: 5, title: 'The Signal and the Fire', subtitle: 'The 1857 Rebellion',
    hook: 'Two signals raced across North India. The telegraph carried British orders at the speed of electricity. The rebellion spread at the speed of a horse.',
    image: story1857, tags: ['Dual Wavefront', 'Map Visual', '1857–1858'],
    status: 'live', href: '/1857', color: 'hsl(30, 85%, 50%)', era: '1857', sortYear: 1857,
  },
  {
    id: 'napoleon', number: 6, title: 'The Rise and Fall of Napoleon', subtitle: 'Revolution to Legacy',
    hook: 'One man reorganized Europe. Then Europe closed in. From revolutionary chaos to imperial zenith to final exile — and the ideas that outlasted the emperor.',
    image: storyNapoleon, tags: ['Coalition Board', 'Tricolor', '1789–1821'],
    status: 'live', href: '/napoleon', color: 'hsl(220, 65%, 45%)', era: '1789', sortYear: 1789,
  },
  {
    id: 'constantinople', number: 7, title: 'The City of Layers', subtitle: 'Constantinople',
    hook: '2,700 years of civilization stacked in 25 meters of earth. Greek, Roman, Byzantine, Crusader, Ottoman — each built on the bones of the last. Scroll down to dig.',
    image: storyConstantinople, tags: ['Archaeological Dig', 'Excavation', '657 BCE–2024'],
    status: 'live', href: '/constantinople', color: 'hsl(270, 45%, 30%)', era: '657 BCE', sortYear: -657,
  },
  {
    id: 'india-states', number: 8, title: 'The Mosaic Republic', subtitle: 'How 565 Became 28',
    hook: 'On the eve of independence, India was 565 princely states and 17 British provinces. What followed was the largest peaceful political integration in history — and a map that is still being redrawn.',
    image: storyIndia, tags: ['Living Map', 'SVG Morphing', '1947–2024'],
    status: 'live', href: '/india-states', color: 'hsl(40, 60%, 55%)', era: '1947', sortYear: 1947,
  },
  {
    id: 'mongol-india', number: 9, title: 'The Wall That Held', subtitle: 'Mongol Invasions of India',
    hook: 'They conquered Persia, Baghdad, China, Russia. Nothing stopped them. Then they turned toward India — and something held.',
    image: storyMongol, tags: ['Horizontal Scroll', 'Pan Map', '1221–1327'],
    status: 'live', href: '/mongol-india', color: 'hsl(15, 75%, 50%)', era: '1221', sortYear: 1221,
  },
  {
    id: 'nuclear', number: 10, title: 'The Chain Reaction', subtitle: 'How Nine Countries Built the Bomb',
    hook: 'The secret of the atom was unlocked once. Then it spread — through espionage, ambition, desperation, and pride — until nine nations held the power to end civilization.',
    image: storyNuclear, tags: ['Countdown Clock', 'Warhead Counter', '1945–2017'],
    status: 'live', href: '/nuclear', color: 'hsl(140, 70%, 45%)', era: '1945', sortYear: 1945,
  },
];

/* ── Era Groupings ─────────────────────────────── */

interface EraGroup {
  label: string;
  range: string;
  stories: StoryCard[];
}

const groupStoriesByEra = (stories: StoryCard[]): EraGroup[] => {
  const sorted = [...stories].sort((a, b) => a.sortYear - b.sortYear);
  const eras: { label: string; range: string; test: (y: number) => boolean }[] = [
    { label: 'The Ancient World', range: '657 BCE – 528 BCE', test: y => y < 0 },
    { label: 'The Medieval World', range: '762 – 1294 CE', test: y => y >= 0 && y < 1500 },
    { label: 'Early Modern', range: '1603 – 1821', test: y => y >= 1500 && y < 1850 },
    { label: 'The Modern Age', range: '1857 – Present', test: y => y >= 1850 },
  ];
  return eras
    .map(era => ({ label: era.label, range: era.range, stories: sorted.filter(s => era.test(s.sortYear)) }))
    .filter(g => g.stories.length > 0);
};

/* ── Floating Historical Symbols ─────────────── */

const SYMBOLS = [
  // Compass rose
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8"><path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z"/></svg>,
  // Quill
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8"><path d="M20 2c-2 2-6 6-8 10l-2 6 6-2c4-2 8-6 10-8"/><path d="M4 22l4-4"/></svg>,
  // Crescent
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
  // Diamond
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8"><path d="M12 2l10 10-10 10L2 12z"/></svg>,
  // Circle with dot (astrolabe)
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/></svg>,
  // Torii gate
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8"><path d="M4 6h16M6 6v14M18 6v14M3 4c0 0 4-2 9-2s9 2 9 2"/><path d="M6 10h12"/></svg>,
  // Scroll
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8"><path d="M8 2c-2 0-4 2-4 4v12c0 2 2 4 4 4"/><path d="M16 2c2 0 4 2 4 4v12c0 2-2 4-4 4"/><path d="M8 2h8M8 22h8"/></svg>,
  // Cross/plus
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8"><path d="M12 5v14M5 12h14"/></svg>,
];

const SYMBOL_CONFIGS = [
  { x: '8%', y: '15%', size: 28, duration: 25, delay: 0 },
  { x: '85%', y: '20%', size: 22, duration: 30, delay: 2 },
  { x: '20%', y: '70%', size: 20, duration: 28, delay: 4 },
  { x: '75%', y: '65%', size: 26, duration: 22, delay: 1 },
  { x: '45%', y: '85%', size: 24, duration: 35, delay: 3 },
  { x: '92%', y: '50%', size: 18, duration: 27, delay: 5 },
  { x: '12%', y: '45%', size: 20, duration: 32, delay: 2.5 },
  { x: '60%', y: '12%', size: 22, duration: 26, delay: 1.5 },
];

const FloatingSymbols = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {SYMBOL_CONFIGS.map((cfg, i) => (
      <motion.div
        key={i}
        className="absolute text-[hsl(35,30%,55%)]"
        style={{ left: cfg.x, top: cfg.y, width: cfg.size, height: cfg.size }}
        initial={{ opacity: 0, y: 0, rotate: 0 }}
        animate={{
          opacity: [0, 0.12, 0.06, 0.14, 0],
          y: [0, -30, -15, -40, -60],
          rotate: [0, 5, -3, 8, 0],
        }}
        transition={{
          duration: cfg.duration,
          delay: cfg.delay,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {SYMBOLS[i % SYMBOLS.length]}
      </motion.div>
    ))}
  </div>
);

/* ── Ornamental Divider ──────────────────────── */

const OrnamentalDivider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="flex items-center justify-center py-12 px-6">
      <motion.svg
        viewBox="0 0 600 24"
        className="w-full max-w-xl h-6"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        {/* Center diamond */}
        <motion.path
          d="M300 4l8 8-8 8-8-8z"
          fill="none"
          stroke="hsl(35,30%,55%)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
        />
        {/* Left line */}
        <motion.line
          x1="40" y1="12" x2="288" y2="12"
          stroke="hsl(35,30%,55%)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        />
        {/* Right line */}
        <motion.line
          x1="312" y1="12" x2="560" y2="12"
          stroke="hsl(35,30%,55%)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        />
        {/* Small diamonds */}
        {[120, 200, 400, 480].map((cx, i) => (
          <motion.path
            key={i}
            d={`M${cx} 9l3 3-3 3-3-3z`}
            fill="hsl(35,30%,55%)"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 0.5, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
          />
        ))}
      </motion.svg>
    </div>
  );
};

/* ── Word-by-word headline reveal ────────────── */

const WordReveal = ({ text, className, italic }: { text: string; className?: string; italic?: string }) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {italic && word.toLowerCase().replace(/[^a-z]/g, '') === italic.toLowerCase().replace(/[^a-z]/g, '') ? (
            <em className="italic text-[hsl(25,40%,35%)]">{word}</em>
          ) : word}
        </motion.span>
      ))}
    </span>
  );
};

/* ── Era Header ──────────────────────────────── */

const EraHeader = ({ label, range }: { label: string; range: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="col-span-1 md:col-span-3 flex items-center gap-4 py-8 md:py-12"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Left ornament line */}
      <motion.div
        className="hidden md:block flex-1 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(35,25%,75%))' }}
        initial={{ scaleX: 0, transformOrigin: 'right' }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <div className="text-center flex-shrink-0">
        <p className="text-[9px] tracking-[0.4em] uppercase font-body font-semibold text-[hsl(25,20%,55%)] mb-1">
          {range}
        </p>
        <h3 className="font-display text-xl md:text-2xl font-bold text-[hsl(25,30%,22%)]">
          {label}
        </h3>
      </div>
      {/* Right ornament line */}
      <motion.div
        className="hidden md:block flex-1 h-px"
        style={{ background: 'linear-gradient(90deg, hsl(35,25%,75%), transparent)' }}
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
      />
    </motion.div>
  );
};

/* ── River Node (dot on the river line) ──────── */

const RiverNode = ({ color, era }: { color: string; era: string }) => (
  <div className="hidden md:flex flex-col items-center justify-start pt-8 relative">
    {/* Era year label */}
    <span className="absolute -top-1 text-[9px] tracking-[0.15em] uppercase font-body font-semibold text-[hsl(25,15%,55%)] whitespace-nowrap">
      {era}
    </span>
    {/* Node circle */}
    <div className="w-5 h-5 rounded-full border-2 border-[hsl(35,20%,78%)] bg-[hsl(38,30%,94%)] flex items-center justify-center z-10 mt-1">
      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
    </div>
    {/* Connection line extending down */}
    <div className="w-px flex-1 bg-[hsl(35,20%,82%)]" />
  </div>
);

/* ── Timeline Card ───────────────────────────── */

const TimelineCard = ({ story, side }: { story: StoryCard; side: 'left' | 'right' }) => {
  const isLive = story.status === 'live';
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);

  const inner = (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden rounded-xl ${isLive ? 'cursor-pointer' : 'opacity-70'}`}
      style={{
        background: 'hsl(38, 28%, 92%)',
        border: '1px solid hsl(35, 20%, 85%)',
        boxShadow: '0 2px 16px hsla(25, 20%, 20%, 0.06)',
      }}
      initial={{ opacity: 0, x: side === 'left' ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={isLive ? { y: -3, boxShadow: '0 8px 30px hsla(25, 20%, 20%, 0.1)' } : {}}
    >
      {/* Image */}
      <div className="relative w-full h-48 md:h-56 overflow-hidden">
        <motion.img
          src={story.image}
          alt={story.title}
          className={`w-full h-full object-cover ${isLive ? 'group-hover:scale-[1.03] transition-transform duration-700' : 'grayscale-[30%]'}`}
          style={{ y: imgY }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {/* Watermark number */}
        <div className="absolute top-3 right-4 font-display text-6xl font-black leading-none text-white/[0.06] select-none">
          {String(story.number).padStart(2, '0')}
        </div>
        {/* Coming soon badge */}
        {!isLive && (
          <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[hsl(25,15%,30%)]/80 text-[hsl(38,30%,92%)] text-[9px] tracking-[0.15em] uppercase font-semibold backdrop-blur-sm">
            Coming Soon
          </div>
        )}
        {/* Tags over image */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {story.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[9px] tracking-[0.1em] uppercase font-body font-semibold text-white/80 bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <h3 className="font-display text-xl md:text-2xl font-bold text-[hsl(25,25%,18%)] mb-1 leading-tight">
          {story.title}
        </h3>
        <p className="font-body text-xs text-[hsl(25,15%,50%)] mb-3">{story.subtitle}</p>
        <p className="font-body text-sm text-[hsl(25,15%,35%)] leading-relaxed mb-4 line-clamp-3">
          {story.hook}
        </p>
        {isLive ? (
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] tracking-[0.12em] uppercase font-body font-semibold text-emerald-700">Live</span>
            <span className="ml-auto text-[10px] tracking-[0.1em] uppercase font-body font-semibold text-[hsl(25,15%,45%)] group-hover:text-[hsl(25,30%,25%)] transition-colors">
              Read <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-[0.12em] uppercase font-body font-semibold text-[hsl(25,15%,55%)]">
              {story.tags[2] || ''}
            </span>
          </div>
        )}
      </div>

      {/* Accent bottom line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
        style={{ background: story.color }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );

  if (isLive) return <Link to={story.href}>{inner}</Link>;
  return inner;
};

/* ── Timeline River ──────────────────────────── */

const TimelineRiver = ({ stories }: { stories: StoryCard[] }) => {
  const riverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: riverRef, offset: ['start end', 'end start'] });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const eraGroups = groupStoriesByEra(stories);

  return (
    <div ref={riverRef} className="relative max-w-5xl mx-auto">
      {/* ── The River Line (desktop) ── */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[hsl(35,22%,82%)] z-0" />
      <motion.div
        className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-px z-0"
        style={{
          height: fillHeight,
          background: 'linear-gradient(180deg, hsl(43,85%,55%), hsl(35,50%,45%))',
        }}
      />

      {/* ── Mobile river line (left edge) ── */}
      <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-[hsl(35,22%,82%)]" />
      <motion.div
        className="md:hidden absolute left-4 top-0 w-px"
        style={{
          height: fillHeight,
          background: 'linear-gradient(180deg, hsl(43,85%,55%), hsl(35,50%,45%))',
        }}
      />

      {/* ── Era groups ── */}
      {eraGroups.map((group) => (
        <div key={group.label}>
          {/* Era header */}
          <div className="px-4 md:px-0">
            <EraHeader label={group.label} range={group.range} />
          </div>

          {/* Stories in this era */}
          {group.stories.map((story, i) => {
            const side: 'left' | 'right' = i % 2 === 0 ? 'left' : 'right';

            return (
              <div key={story.id} className="relative">
                {/* ── Desktop: 3-column grid ── */}
                <div className="hidden md:grid grid-cols-[1fr_48px_1fr] gap-4 mb-10 items-start">
                  {side === 'left' ? (
                    <>
                      <div className="pr-4">
                        <TimelineCard story={story} side="left" />
                      </div>
                      <RiverNode color={story.color} era={story.era} />
                      <div /> {/* empty right column */}
                    </>
                  ) : (
                    <>
                      <div /> {/* empty left column */}
                      <RiverNode color={story.color} era={story.era} />
                      <div className="pl-4">
                        <TimelineCard story={story} side="right" />
                      </div>
                    </>
                  )}
                </div>

                {/* ── Mobile: single column with left river ── */}
                <div className="md:hidden flex gap-4 mb-8 pl-4">
                  {/* Mobile node */}
                  <div className="flex flex-col items-center pt-6 flex-shrink-0">
                    <div className="w-4 h-4 rounded-full border-2 border-[hsl(35,20%,78%)] bg-[hsl(38,30%,94%)] flex items-center justify-center z-10">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: story.color }} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="text-[9px] tracking-[0.15em] uppercase font-body font-semibold text-[hsl(25,15%,55%)] mb-2">
                      {story.era}
                    </p>
                    <TimelineCard story={story} side="left" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* ── River terminus ornament ── */}
      <div className="hidden md:flex justify-center py-8">
        <motion.div
          className="w-3 h-3 rotate-45 border border-[hsl(35,25%,70%)]"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.6, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

/* ── Grain texture overlay ───────────────────── */

const GrainOverlay = () => (
  <div
    className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '128px 128px',
    }}
  />
);

/* ── Main Page ───────────────────────────────── */

const Home = () => {
  usePageAnalytics('home');
  const { overrides, loading: overridesLoading } = useStoryOverrides();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroTextY = useTransform(heroScroll, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  // Merge DB overrides with config defaults, filter out drafts
  const mergedStories = STORIES.map(s => ({
    ...s,
    status: (overrides[s.id] || s.status) as StoryCard['status'],
    href: (overrides[s.id] === 'coming-soon' || (!overrides[s.id] && s.status === 'coming-soon')) ? '#' : s.href,
  })).filter(s => s.status !== 'draft');

  const liveCount = mergedStories.filter(s => s.status === 'live').length;

  return (
    <div className="bg-[hsl(38,30%,94%)] min-h-screen text-[hsl(25,20%,20%)] relative">
      <GrainOverlay />
      <SiteHeader />

      {/* ── Hero ─────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <FloatingSymbols />

        {/* Subtle ruled lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 59px, hsl(25,15%,50%) 59px, hsl(25,15%,50%) 60px)',
          }}
        />

        <motion.div
          className="relative z-10 text-center max-w-3xl mx-auto px-6"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[10px] tracking-[0.4em] uppercase text-[hsl(25,20%,50%)] mb-6 font-body font-semibold"
          >
            Visual essays on the turning points of civilizations
          </motion.p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8 text-[hsl(25,30%,18%)]">
            <WordReveal text="Turning points in history," />
            <br />
            <WordReveal text="felt — not summarized." italic="felt" />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="font-body text-lg md:text-xl text-[hsl(25,15%,45%)] max-w-lg mx-auto leading-relaxed"
          >
            Immersive scrollytelling with maps, data, and primary sources. Each essay is a different visual experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-10"
          >
            <a
              href="#stories"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-body font-semibold text-[hsl(25,20%,40%)] hover:text-[hsl(25,30%,25%)] transition-colors"
            >
              Explore stories
              <motion.span
                className="text-lg"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >↓</motion.span>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Ornamental Divider ───────────────────── */}
      <OrnamentalDivider />

      {/* ── Stories — Timeline River ─────────────── */}
      <section id="stories" className="relative py-16 md:py-24 px-4 md:px-6">
        {/* Section heading */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-[hsl(25,15%,55%)] mb-3 font-body font-semibold">
            {liveCount} Stories · Chronological
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[hsl(25,25%,20%)]">
            Each essay has one visual mechanic.
          </h2>
          <p className="font-body text-lg text-[hsl(25,15%,45%)] mt-3">
            Not a textbook. Not a summary. A designed experience that makes a historical moment visceral.
          </p>
        </motion.div>

        <TimelineRiver stories={mergedStories} />
      </section>

      <SiteFooter variant="light" />
    </div>
  );
};

export default Home;
