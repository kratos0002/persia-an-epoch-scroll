import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

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

interface HorizontalTimelineProps {
  stories: StoryCard[];
}

const getEraLabel = (year: number): string => {
  if (year < 0) return 'Ancient';
  if (year < 1500) return 'Medieval';
  if (year < 1850) return 'Early Modern';
  return 'Modern';
};

const NODE_MIN_WIDTH = 110;

export const HorizontalTimeline = ({ stories }: HorizontalTimelineProps) => {
  const sorted = [...stories].sort((a, b) => a.sortYear - b.sortYear);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-60px' });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const glowX = useTransform(scrollYProgress, [0.15, 0.55], ['0%', '100%']);

  const trackWidth = Math.max(860, sorted.length * NODE_MIN_WIDTH);

  const selectedStory = sorted.find(s => s.id === selectedId) || null;

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-node]') || (e.target as HTMLElement).closest('[data-preview]')) return;
    setSelectedId(null);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleNodeClick = useCallback((story: StoryCard) => {
    if (selectedId === story.id) {
      setSelectedId(null);
    } else {
      setSelectedId(story.id);
    }
  }, [selectedId]);

  // Era grouping
  const eraBreaks: { start: number; end: number; label: string }[] = [];
  sorted.forEach((story, i) => {
    const era = getEraLabel(story.sortYear);
    const last = eraBreaks[eraBreaks.length - 1];
    if (last && last.label === era) {
      last.end = i;
    } else {
      eraBreaks.push({ start: i, end: i, label: era });
    }
  });

  return (
    <section
      ref={containerRef}
      className="relative py-8 md:py-12"
      onClick={handleBackdropClick}
    >
      {/* Scrollable timeline track */}
      <div className="overflow-x-auto scrollbar-hide">
        <div
          className="relative mx-auto px-8"
          style={{ width: trackWidth, minHeight: 160 }}
        >
          {/* Era labels */}
          <div className="relative h-6 mb-6">
            {eraBreaks.map((era) => {
              const leftPct = ((era.start + 0.5) / sorted.length) * 100;
              const rightPct = ((era.end + 0.5) / sorted.length) * 100;
              const centerPct = (leftPct + rightPct) / 2;
              return (
                <motion.span
                  key={era.label}
                  className="absolute text-[9px] tracking-[0.3em] uppercase font-body font-semibold text-[hsl(25,15%,62%)] whitespace-nowrap -translate-x-1/2"
                  style={{ left: `${centerPct}%` }}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {era.label}
                </motion.span>
              );
            })}
          </div>

          {/* Horizontal line */}
          <div className="relative h-px mb-0">
            <motion.div
              className="absolute inset-0 h-px"
              style={{ background: 'hsl(35, 22%, 82%)' }}
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="absolute top-[-1px] h-[3px] w-20 rounded-full pointer-events-none"
              style={{
                left: glowX,
                background: 'linear-gradient(90deg, transparent, hsl(43,85%,55%), transparent)',
                filter: 'blur(1px)',
              }}
            />
          </div>

          {/* Nodes */}
          <div className="relative flex justify-between">
            {sorted.map((story, i) => {
              const isSelected = selectedId === story.id;
              const isLive = story.status === 'live';
              const totalNodes = sorted.length;

              return (
                <div
                  key={story.id}
                  data-node
                  className="relative flex flex-col items-center"
                  style={{ width: `${100 / totalNodes}%` }}
                >
                  {/* Vertical tick */}
                  <motion.div
                    className="w-px h-8 md:h-10"
                    style={{ background: `linear-gradient(180deg, ${story.color}, transparent)` }}
                    initial={{ scaleY: 0, transformOrigin: 'top' }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.06 }}
                  />

                  {/* Node circle */}
                  <motion.button
                    className={`relative w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center z-10 -mt-px transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43,85%,55%)]/50 ${
                      isSelected
                        ? 'border-[hsl(43,85%,55%)] bg-[hsl(43,85%,55%)]/15'
                        : 'border-[hsl(35,20%,78%)] bg-[hsl(38,30%,94%)] hover:border-[hsl(35,30%,65%)]'
                    }`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: isSelected ? 1.3 : 1 } : {}}
                    transition={{
                      duration: 0.35,
                      delay: 0.9 + i * 0.06,
                      type: 'spring',
                      stiffness: 350,
                    }}
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNodeClick(story);
                    }}
                    aria-label={`${story.title} — ${story.era}`}
                  >
                    <div
                      className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300"
                      style={{
                        background: story.color,
                        boxShadow: isSelected ? `0 0 12px ${story.color}` : 'none',
                      }}
                    />
                    {isLive && !isSelected && (
                      <motion.div
                        className="absolute inset-0 rounded-full border"
                        style={{ borderColor: story.color }}
                        animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}
                  </motion.button>

                  {/* Year + title */}
                  <motion.div
                    className="mt-2 text-center cursor-pointer"
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 1 + i * 0.05 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNodeClick(story);
                    }}
                  >
                    <p className="text-[8px] md:text-[9px] tracking-[0.15em] uppercase font-body font-semibold text-[hsl(25,15%,55%)] mb-0.5">
                      {story.era}
                    </p>
                    <p className={`text-[10px] md:text-[11px] font-display font-semibold leading-tight max-w-[96px] mx-auto transition-colors duration-200 ${
                      isSelected ? 'text-[hsl(25,30%,18%)]' : 'text-[hsl(25,20%,38%)] hover:text-[hsl(25,25%,25%)]'
                    }`}>
                      {story.title}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Preview card — rendered OUTSIDE scroll container ── */}
      <AnimatePresence mode="wait">
        {selectedStory && (
          <motion.div
            key={selectedStory.id}
            data-preview
            className="max-w-xl mx-auto mt-8 px-4 md:px-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <PreviewCard story={selectedStory} onClose={() => setSelectedId(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* ── Preview Card (below timeline) ───────────── */

const PreviewCard = ({ story, onClose }: { story: StoryCard; onClose: () => void }) => {
  const isLive = story.status === 'live';

  return (
    <div
      className="relative rounded-xl overflow-hidden"
      style={{
        background: 'hsl(38, 28%, 92%)',
        border: '1px solid hsl(35, 20%, 85%)',
        boxShadow: '0 8px 32px hsla(25, 20%, 15%, 0.1), 0 2px 8px hsla(25, 20%, 15%, 0.06)',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/30 transition-all"
        aria-label="Close preview"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 2l8 8M10 2l-8 8" />
        </svg>
      </button>

      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative sm:w-56 md:w-64 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
          <img
            src={story.image}
            alt={story.title}
            className={`w-full h-full object-cover ${isLive ? '' : 'grayscale-[30%]'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/30 via-transparent to-transparent" />
          {/* Watermark */}
          <div className="absolute bottom-3 right-3 font-display text-5xl font-black leading-none text-white/[0.07] select-none">
            {String(story.number).padStart(2, '0')}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {story.tags.map(tag => (
              <span key={tag} className="text-[8px] tracking-[0.1em] uppercase font-body font-semibold text-[hsl(25,15%,50%)] bg-[hsl(35,20%,88%)] px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <h3 className="font-display text-xl md:text-2xl font-bold text-[hsl(25,25%,18%)] leading-tight mb-1">
            {story.title}
          </h3>
          <p className="font-body text-xs text-[hsl(25,15%,50%)] mb-3">
            {story.subtitle} · {story.era}
          </p>
          <p className="font-body text-sm text-[hsl(25,15%,35%)] leading-relaxed mb-4">
            {story.hook}
          </p>

          {isLive ? (
            <Link
              to={story.href}
              className="inline-flex items-center gap-2 self-start px-5 py-2 rounded-lg text-[11px] tracking-[0.12em] uppercase font-body font-semibold transition-all duration-300 hover:gap-3"
              style={{
                background: story.color,
                color: 'white',
                boxShadow: `0 2px 12px ${story.color}44`,
              }}
            >
              Read this essay
              <span>→</span>
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 self-start text-[10px] tracking-[0.12em] uppercase font-body font-semibold text-[hsl(25,15%,55%)]">
              Coming soon · {story.tags[2] || ''}
            </span>
          )}
        </div>
      </div>

      {/* Accent bottom */}
      <div className="h-0.5" style={{ background: story.color }} />
    </div>
  );
};
