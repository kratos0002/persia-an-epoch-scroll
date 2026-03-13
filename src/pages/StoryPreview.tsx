import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import storyPersia from '@/assets/story-persia.jpg';
import storyWisdom from '@/assets/story-wisdom.jpg';
import storyBuddhism from '@/assets/story-buddhism.jpg';
import storySamurai from '@/assets/story-samurai.jpg';
import story1857 from '@/assets/story-1857.jpg';
import storyNapoleon from '@/assets/story-napoleon.jpg';
import storyConstantinople from '@/assets/story-constantinople.jpg';
import storyIndia from '@/assets/story-india.jpg';
import storyMongol from '@/assets/story-mongol.jpg';

/* ── Story Data ──────────────────────────────── */

interface StoryPreviewData {
  id: string;
  title: string;
  subtitle: string;
  hook: string;
  image: string;
  color: string;
  bgColor: string;
  era: string;
  href: string;
  motif: string; // short atmospheric phrase for the animation
}

const PREVIEWS: Record<string, StoryPreviewData> = {
  persia: {
    id: 'persia', title: 'The Immortal Empire', subtitle: 'The History of Persia',
    hook: '2,500 years. One civilization.',
    image: storyPersia, color: 'hsl(43, 85%, 55%)', bgColor: 'hsl(30, 20%, 8%)',
    era: '550 BCE', href: '/persia',
    motif: 'From Cyrus to the present — the empire that never truly fell',
  },
  wisdom: {
    id: 'wisdom', title: 'The Library That Lit the World', subtitle: 'The House of Wisdom',
    hook: 'One building. All of human knowledge.',
    image: storyWisdom, color: 'hsl(170, 40%, 38%)', bgColor: 'hsl(180, 15%, 7%)',
    era: '762 CE', href: '/wisdom',
    motif: 'Baghdad preserved what the world forgot',
  },
  buddhism: {
    id: 'buddhism', title: 'The Path That Split', subtitle: 'The Spread of Buddhism',
    hook: 'One teaching. A thousand forms.',
    image: storyBuddhism, color: 'hsl(30, 65%, 45%)', bgColor: 'hsl(25, 15%, 7%)',
    era: '528 BCE', href: '/buddhism',
    motif: 'From a tree in India to every corner of Asia',
  },
  samurai: {
    id: 'samurai', title: 'Stipends, Bonds & the Death of a Class', subtitle: 'The End of the Samurai',
    hook: 'Destroyed not by war — by accounting.',
    image: storySamurai, color: 'hsl(5, 75%, 50%)', bgColor: 'hsl(0, 10%, 7%)',
    era: '1603', href: '/samurai',
    motif: 'The ledger was mightier than the sword',
  },
  '1857': {
    id: '1857', title: 'The Signal and the Fire', subtitle: 'The 1857 Rebellion',
    hook: 'Two signals. One nation.',
    image: story1857, color: 'hsl(30, 85%, 50%)', bgColor: 'hsl(20, 15%, 7%)',
    era: '1857', href: '/1857',
    motif: 'Electricity versus fury — the race across North India',
  },
  napoleon: {
    id: 'napoleon', title: 'The Rise and Fall of Napoleon', subtitle: 'Revolution to Legacy',
    hook: 'He reorganized Europe. Then it closed in.',
    image: storyNapoleon, color: 'hsl(220, 65%, 45%)', bgColor: 'hsl(225, 30%, 7%)',
    era: '1789', href: '/napoleon',
    motif: 'The emperor fell. The ideas didn\'t.',
  },
  constantinople: {
    id: 'constantinople', title: 'The City of Layers', subtitle: 'Constantinople',
    hook: '2,700 years. 25 meters of earth.',
    image: storyConstantinople, color: 'hsl(270, 45%, 40%)', bgColor: 'hsl(270, 15%, 7%)',
    era: '657 BCE', href: '/constantinople',
    motif: 'Each empire built on the bones of the last',
  },
  'india-states': {
    id: 'india-states', title: 'The Mosaic Republic', subtitle: 'How 565 Became 28',
    hook: '565 states. One republic.',
    image: storyIndia, color: 'hsl(40, 60%, 55%)', bgColor: 'hsl(220, 20%, 7%)',
    era: '1947', href: '/india-states',
    motif: 'The largest peaceful integration in history',
  },
  'mongol-india': {
    id: 'mongol-india', title: 'The World Conqueror', subtitle: 'The Mongol Storm',
    hook: 'He asked for trade. They sent back heads.',
    image: storyMongol, color: 'hsl(25, 70%, 50%)', bgColor: 'hsl(20, 15%, 7%)',
    era: '1206', href: '/mongol-india',
    motif: 'What followed reshaped every civilization',
  },
};

/* ── Animated Particles ──────────────────────── */

const Particles = ({ color }: { color: string }) => {
  // Deterministic particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: (i * 37 + 13) % 100,
    y: (i * 53 + 7) % 100,
    size: 1 + (i % 3),
    delay: (i * 0.25) % 5,
    duration: 3 + (i % 3),
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: color,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [0, -40],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
};

/* ── Main Preview Component ──────────────────── */

const StoryPreview = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const story = storyId ? PREVIEWS[storyId] : undefined;
  const [cycle, setCycle] = useState(0);

  // Restart animation loop every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => setCycle(c => c + 1), 5500);
    return () => clearInterval(interval);
  }, []);

  if (!story) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white/50 font-body">Story not found</p>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
      style={{ background: story.bgColor }}
    >
      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Floating particles */}
      <Particles color={story.color} />

      <AnimatePresence mode="wait">
        <motion.div
          key={cycle}
          className="relative z-10 w-full max-w-3xl mx-auto px-6"
        >
          {/* ── Phase 1: Image rises (0–1.5s) ── */}
          <motion.div
            className="relative mx-auto mb-8 overflow-hidden rounded-xl"
            style={{ maxWidth: 520 }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src={story.image}
              alt={story.title}
              className="w-full aspect-[16/9] object-cover"
              style={{ filter: 'brightness(0.8) contrast(1.1) saturate(0.9)' }}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 5, ease: 'easeOut' }}
            />
            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, transparent 30%, ${story.bgColor} 100%)`,
              }}
            />
            {/* Era badge */}
            <motion.div
              className="absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-sm"
              style={{
                background: `${story.color}20`,
                border: `1px solid ${story.color}40`,
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <span className="text-[10px] tracking-[0.2em] uppercase font-body font-semibold" style={{ color: story.color }}>
                {story.era}
              </span>
            </motion.div>
          </motion.div>

          {/* ── Phase 2: Title reveals (1–2.5s) ── */}
          <div className="text-center">
            <motion.p
              className="text-[10px] tracking-[0.4em] uppercase font-body font-semibold mb-3"
              style={{ color: `${story.color}99` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {story.subtitle}
            </motion.p>

            <h1 className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-4">
              {story.title.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em]"
                  style={{ color: i === 0 || i === story.title.split(' ').length - 1 ? story.color : 'hsl(40, 20%, 88%)' }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* ── Phase 3: Hook line (2–3.5s) ── */}
            <motion.p
              className="font-body text-lg md:text-xl leading-relaxed mb-3"
              style={{ color: 'hsl(40, 15%, 55%)' }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {story.hook}
            </motion.p>

            {/* ── Phase 4: Motif + CTA (3–4.5s) ── */}
            <motion.p
              className="font-body text-sm italic mb-8"
              style={{ color: 'hsl(40, 10%, 40%)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.8 }}
            >
              {story.motif}
            </motion.p>

            {/* Accent line */}
            <motion.div
              className="mx-auto h-px mb-6"
              style={{ background: `linear-gradient(90deg, transparent, ${story.color}, transparent)`, maxWidth: 200 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 3.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* ── Phase 5: Brand + Read CTA (3.5–5s) ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 0.8 }}
            >
              <Link
                to={story.href}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-lg font-body text-sm font-semibold tracking-[0.1em] uppercase transition-all hover:scale-105"
                style={{
                  color: story.bgColor,
                  background: story.color,
                }}
              >
                Read the essay
                <span>→</span>
              </Link>
            </motion.div>

            <motion.p
              className="mt-6 text-[10px] tracking-[0.3em] uppercase font-body font-semibold"
              style={{ color: 'hsl(40, 10%, 30%)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.0, duration: 0.6 }}
            >
              pastlives.site
            </motion.p>
          </div>

          {/* ── Fade out before loop (5s) ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            style={{ background: story.bgColor }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1] }}
            transition={{ duration: 5.5, times: [0, 0.88, 1], ease: 'easeIn' }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StoryPreview;
