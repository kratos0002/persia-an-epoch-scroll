import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import storyPersia from '@/assets/story-persia.jpg';
import storyWisdom from '@/assets/story-wisdom.jpg';
import storyMongol from '@/assets/story-mongol.jpg';
import storyBuddhism from '@/assets/story-buddhism.jpg';
import storySamurai from '@/assets/story-samurai.jpg';

interface StoryCard {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  hook: string;
  image: string;
  tags: string[];
  status: 'live' | 'coming-soon';
  href: string;
  color: string;
}

const STORIES: StoryCard[] = [
  {
    id: 'persia',
    number: 1,
    title: 'The Immortal Empire',
    subtitle: 'The History of Persia',
    hook: 'What if one civilization shaped more of the modern world than Rome, Greece, and Egypt combined?',
    image: storyPersia,
    tags: ['Visual Essay', 'Scrollytelling', '2,500 years'],
    status: 'live',
    href: '/persia',
    color: 'hsl(43, 85%, 55%)',
  },
  {
    id: 'wisdom',
    number: 2,
    title: 'The Library That Lit the World',
    subtitle: 'The House of Wisdom',
    hook: 'For 400 years, one building in Baghdad held more knowledge than all of Europe combined.',
    image: storyWisdom,
    tags: ['Visual Essay', 'Knowledge Graph', '762–1258 CE'],
    status: 'live',
    href: '/wisdom',
    color: 'hsl(170, 40%, 38%)',
  },
  {
    id: 'buddhism',
    number: 3,
    title: 'The Path That Split',
    subtitle: 'The Spread of Buddhism',
    hook: 'One man sat under a tree and asked why we suffer. His answer split into a thousand traditions that reached every corner of Asia.',
    image: storyBuddhism,
    tags: ['Visual Essay', 'Branching Tree', '528 BCE–Today'],
    status: 'live',
    href: '/buddhism',
    color: 'hsl(30, 65%, 45%)',
  },
  {
    id: 'mongol',
    number: 4,
    title: 'The World Conqueror',
    subtitle: 'The Mongol Storm',
    hook: 'He asked for trade. They sent back heads. What followed reshaped every civilization from China to Hungary.',
    image: storyMongol,
    tags: ['Empire System', 'Multi-front', '1206–1294'],
    status: 'coming-soon',
    href: '#',
    color: 'hsl(25, 70%, 50%)',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const Home = () => {
  return (
    <div className="bg-[hsl(38,30%,94%)] min-h-screen text-[hsl(25,20%,20%)]">
      <SiteHeader />

      {/* ── Hero ─────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Subtle map background */}
        <div className="absolute inset-0 opacity-[0.06]">
          <svg viewBox="0 0 1440 900" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            {/* Simplified world continents as subtle background shapes */}
            <path d="M200,300 Q250,250 300,280 Q350,310 400,290 Q450,270 500,300 Q520,340 480,380 Q440,400 400,390 Q350,370 300,380 Q250,360 220,340 Z" fill="hsl(30,25%,50%)" />
            <path d="M550,250 Q600,220 650,240 Q700,260 750,250 Q800,240 850,260 Q900,290 880,330 Q860,370 820,390 Q780,400 740,380 Q700,360 660,370 Q620,380 580,350 Q560,310 550,280 Z" fill="hsl(30,25%,50%)" />
            <path d="M900,230 Q950,200 1000,220 Q1050,240 1100,230 Q1150,220 1200,250 Q1230,280 1220,320 Q1200,360 1160,380 Q1120,390 1080,370 Q1040,350 1000,360 Q960,370 930,340 Q910,300 900,260 Z" fill="hsl(30,25%,50%)" />
            <path d="M350,420 Q380,400 420,410 Q460,420 490,450 Q510,490 490,530 Q460,560 420,550 Q380,530 360,500 Q340,470 350,440 Z" fill="hsl(30,25%,50%)" />
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[10px] tracking-[0.4em] uppercase text-[hsl(25,20%,50%)] mb-6 font-body font-semibold"
          >
            Visual essays on the turning points of civilizations
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8 text-[hsl(25,30%,18%)]"
          >
            Turning points in history, <em className="italic text-[hsl(25,40%,35%)]">felt</em> — not summarized.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-body text-lg md:text-xl text-[hsl(25,15%,45%)] max-w-lg mx-auto leading-relaxed"
          >
            Immersive scrollytelling with maps, data, and primary sources. Each essay is a different visual experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-10"
          >
            <a
              href="#stories"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-body font-semibold text-[hsl(25,20%,40%)] hover:text-[hsl(25,30%,25%)] transition-colors"
            >
              Explore stories
              <span className="text-lg">↓</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Stories Grid ─────────────────────────── */}
      <section id="stories" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[hsl(25,15%,55%)] mb-3 font-body font-semibold">
              All Stories
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[hsl(25,25%,20%)]">
              Each essay has one visual mechanic.
            </h2>
            <p className="font-body text-lg text-[hsl(25,15%,45%)] mt-3 max-w-xl">
              Not a textbook. Not a summary. A designed experience that makes a historical moment visceral.
            </p>
          </div>

          <div className="grid gap-8">
            {STORIES.map((story, i) => (
              <motion.div
                key={story.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
              >
                <StoryCardComponent story={story} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────── */}
      <section className="py-24 px-6 bg-[hsl(35,25%,90%)]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-[hsl(25,25%,20%)] mb-4">
            Get new stories when they ship.
          </h2>
          <p className="font-body text-[hsl(25,15%,45%)] mb-8">
            We publish slowly and intentionally. One email per new essay — no weekly spam.
          </p>
          <form
            onSubmit={e => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg border border-[hsl(25,15%,75%)] bg-white/60 font-body text-sm text-[hsl(25,20%,20%)] placeholder:text-[hsl(25,10%,60%)] focus:outline-none focus:ring-2 focus:ring-[hsl(25,30%,45%)]/30 focus:border-[hsl(25,30%,45%)]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[hsl(25,30%,22%)] text-[hsl(38,30%,92%)] rounded-lg font-body text-sm font-semibold tracking-[0.1em] uppercase hover:bg-[hsl(25,30%,15%)] transition-colors"
            >
              Notify me
            </button>
          </form>
        </div>
      </section>

      <SiteFooter variant="light" />
    </div>
  );
};

/* ── Story Card ──────────────────────────────── */

const StoryCardComponent = ({ story }: { story: StoryCard }) => {
  const isLive = story.status === 'live';

  const inner = (
    <div className={`group relative flex flex-col md:flex-row gap-0 overflow-hidden rounded-xl transition-all duration-500 ${
      isLive
        ? 'bg-white/60 hover:bg-white/80 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] cursor-pointer'
        : 'bg-white/30 opacity-75'
    }`}>
      {/* Image */}
      <div className="relative w-full md:w-80 h-56 md:h-auto flex-shrink-0 overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isLive ? 'group-hover:scale-105' : 'grayscale-[30%]'
          }`}
          loading="lazy"
        />
        {/* Number badge */}
        <div
          className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold text-white/90"
          style={{ background: story.color }}
        >
          {story.number}
        </div>
        {/* Status badge */}
        {!isLive && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[hsl(25,15%,30%)]/80 text-[hsl(38,30%,92%)] text-[10px] tracking-[0.15em] uppercase font-semibold backdrop-blur-sm">
            Coming Soon
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-3">
          {story.tags.map(tag => (
            <span
              key={tag}
              className="text-[10px] tracking-[0.12em] uppercase font-body font-semibold text-[hsl(25,15%,55%)] bg-[hsl(35,20%,88%)] px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-2xl md:text-3xl font-bold text-[hsl(25,25%,18%)] mb-1">
          {story.title}
        </h3>
        <p className="font-body text-sm text-[hsl(25,15%,50%)] mb-3">
          {story.subtitle}
        </p>
        <p className="font-body text-base text-[hsl(25,15%,35%)] leading-relaxed mb-4 max-w-lg">
          {story.hook}
        </p>

        {isLive && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs tracking-[0.12em] uppercase font-body font-semibold text-emerald-700">
              Live
            </span>
            <span className="ml-auto text-xs tracking-[0.1em] uppercase font-body font-semibold text-[hsl(25,15%,45%)] group-hover:text-[hsl(25,30%,25%)] transition-colors">
              Begin reading →
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (isLive) {
    return <Link to={story.href}>{inner}</Link>;
  }
  return inner;
};

export default Home;
