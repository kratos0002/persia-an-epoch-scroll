import React, { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

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

interface StoryGridProps {
  stories: StoryCard[];
}

/* ── Filter Definitions ──────────────────────── */

interface Filter {
  key: string;
  label: string;
  test: (story: StoryCard) => boolean;
}

const FILTERS: Filter[] = [
  { key: 'all', label: 'All', test: () => true },
  { key: 'ancient', label: 'Ancient World', test: s => s.sortYear < 0 },
  { key: 'medieval', label: 'Medieval', test: s => s.sortYear >= 0 && s.sortYear < 1500 },
  { key: 'early-modern', label: 'Early Modern', test: s => s.sortYear >= 1500 && s.sortYear < 1850 },
  { key: 'modern', label: 'Modern', test: s => s.sortYear >= 1850 },
];

/* ── Main Component ──────────────────────────── */

export const StoryGrid = ({ stories }: StoryGridProps) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });
  const sorted = [...stories].sort((a, b) => a.sortYear - b.sortYear);

  const filtered = useMemo(() => {
    const filter = FILTERS.find(f => f.key === activeFilter);
    return filter ? sorted.filter(filter.test) : sorted;
  }, [activeFilter, sorted]);

  return (
    <section ref={sectionRef} id="stories" className="relative py-16 md:py-24 px-4 md:px-6">
      {/* Section heading */}
      <motion.div
        className="max-w-2xl mx-auto text-center mb-8 md:mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="text-[10px] tracking-[0.35em] uppercase text-[hsl(25,15%,55%)] mb-3 font-body font-semibold">
          All stories
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[hsl(25,25%,20%)]">
          Pick a turning point.
        </h2>
      </motion.div>

      {/* Filter chips */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {FILTERS.map(filter => {
          const isActive = activeFilter === filter.key;
          const count = sorted.filter(filter.test).length;

          return (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`relative px-4 py-1.5 rounded-full text-[10px] md:text-[11px] tracking-[0.12em] uppercase font-body font-semibold transition-all duration-300 ${
                isActive
                  ? 'text-[hsl(25,30%,18%)]'
                  : 'text-[hsl(25,15%,55%)] hover:text-[hsl(25,20%,35%)]'
              }`}
              style={{
                background: isActive ? 'hsl(35, 25%, 88%)' : 'transparent',
                border: `1px solid ${isActive ? 'hsl(35, 25%, 78%)' : 'hsl(35, 20%, 85%)'}`,
              }}
            >
              {filter.label}
              <span className="ml-1.5 text-[9px] opacity-50">{count}</span>
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border border-[hsl(43,85%,55%)]/30"
                  layoutId="activeFilter"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </motion.div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((story, i) => (
              <GridCard key={story.id} story={story} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.p
            className="text-center font-body text-[hsl(25,15%,55%)] py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No stories in this era yet.
          </motion.p>
        )}
      </div>
    </section>
  );
};

/* ── Grid Card ───────────────────────────────── */

const GridCard = ({ story, index }: { story: StoryCard; index: number }) => {
  const isLive = story.status === 'live';
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);

  const inner = (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-xl ${isLive ? 'cursor-pointer' : 'opacity-70'}`}
      style={{
        background: 'hsl(38, 28%, 92%)',
        border: '1px solid hsl(35, 20%, 85%)',
        boxShadow: '0 2px 16px hsla(25, 20%, 20%, 0.06)',
      }}
      whileHover={isLive ? { y: -4, boxShadow: '0 12px 40px hsla(25, 20%, 20%, 0.1)' } : {}}
    >
      {/* Image */}
      <div className="relative w-full h-56 md:h-64 overflow-hidden">
        <motion.img
          src={story.image}
          alt={story.title}
          className={`w-full h-full object-cover ${isLive ? 'group-hover:scale-[1.03] transition-transform duration-700' : 'grayscale-[30%]'}`}
          style={{ y: imgY }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Watermark number */}
        <div className="absolute top-3 right-4 font-display text-5xl font-black leading-none text-white/[0.06] select-none">
          {String(story.number).padStart(2, '0')}
        </div>

        {/* Era badge */}
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full backdrop-blur-sm text-[8px] tracking-[0.12em] uppercase font-body font-semibold"
          style={{
            background: `${story.color}22`,
            color: 'white',
            border: `1px solid ${story.color}44`,
          }}
        >
          {story.era}
        </div>

        {/* Coming soon badge */}
        {!isLive && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[hsl(25,15%,30%)]/80 text-[hsl(38,30%,92%)] text-[8px] tracking-[0.12em] uppercase font-semibold backdrop-blur-sm">
            Coming Soon
          </div>
        )}

        {/* Tags */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {story.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[8px] tracking-[0.1em] uppercase font-body font-semibold text-white/80 bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg md:text-xl font-bold text-[hsl(25,25%,18%)] mb-1 leading-tight">
          {story.title}
        </h3>
        <p className="font-body text-xs text-[hsl(25,15%,50%)] mb-2.5">{story.subtitle}</p>
        <p className="font-body text-sm text-[hsl(25,15%,35%)] leading-relaxed line-clamp-2 mb-3">
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
