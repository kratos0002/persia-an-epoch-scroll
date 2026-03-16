import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BL, GENERAL_ACT_ARTICLES, KEY_QUOTES, type TreatyArticleData } from '@/components/visuals/berlinMapData';

/* ── Red Wax Seal SVG ──────────────────────────── */
const WaxSeal = () => (
  <svg width="48" height="48" viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="20" fill={BL.RED_WAX} opacity="0.9" />
    <circle cx="24" cy="24" r="15" fill="none" stroke={BL.VELLUM} strokeWidth="0.5" opacity="0.3" />
    <text x="24" y="28" textAnchor="middle" fill={BL.VELLUM} fontSize="12" fontWeight="bold" className="font-display">
      §
    </text>
  </svg>
);

interface TreatyArticleProps {
  article: TreatyArticleData;
  index: number;
}

export const TreatyArticle = ({ article, index }: TreatyArticleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-16 py-6"
      style={{ borderLeft: `2px solid ${BL.BRASS}33` }}
    >
      {/* Article number in margin */}
      <div className="absolute left-0 top-6 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: BL.VELLUM, border: `2px solid ${BL.BRASS}` }}>
        <span className="font-mono text-xs font-bold" style={{ color: BL.INK }}>{article.number}</span>
      </div>

      <h4 className="font-display text-lg font-bold mb-2" style={{ color: BL.INK }}>
        Article {article.number} — {article.title}
      </h4>

      {/* Treaty text in formal style */}
      <blockquote
        className="font-body text-sm leading-relaxed italic pl-4 mb-3"
        style={{ color: BL.INK, borderLeft: `3px solid ${BL.RED_WAX}44` }}
      >
        "{article.text}"
      </blockquote>

      {/* Annotation */}
      <p className="font-body text-sm leading-relaxed" style={{ color: BL.MUTED }}>
        {article.annotation}
      </p>
    </motion.div>
  );
};

/* ── General Act Section (wraps multiple TreatyArticles) ──────────── */
export const GeneralActSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Import data inline to avoid circular deps
  const { GENERAL_ACT_ARTICLES, KEY_QUOTES } = require('@/components/visuals/berlinMapData');

  return (
    <section id="general-act" ref={ref} className="relative py-24 px-6" style={{ background: BL.PAPER_DARK }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(to right, ${BL.GRID_BLUE}05 1px, transparent 1px), linear-gradient(to bottom, ${BL.GRID_BLUE}05 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4"><WaxSeal /></div>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-3" style={{ color: BL.RED_WAX }}>
            February 26, 1885
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: BL.INK }}>
            The General Act
          </h2>
          <p className="font-body text-base leading-relaxed" style={{ color: BL.MUTED }}>
            The deliberations culminated in the signing of the General Act. While its chapters dealt with trade,
            neutrality, and the slave trade, the most profound impact resided in the principle of
            <strong style={{ color: BL.RED_WAX }}> Effective Occupation</strong> — the legal mechanism that
            forced European nations to build administrative posts, station troops, and impose infrastructure
            across the African interior.
          </p>
        </motion.div>

        <div className="space-y-2">
          {GENERAL_ACT_ARTICLES.map((article: TreatyArticleData, i: number) => (
            <TreatyArticle key={article.number} article={article} index={i} />
          ))}
        </div>

        {/* Bismarck quote callout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 p-8 rounded-xl text-center"
          style={{ background: BL.PRUSSIAN }}
        >
          <blockquote className="font-body text-base md:text-lg italic leading-relaxed mb-4" style={{ color: BL.VELLUM }}>
            "{KEY_QUOTES[0].text}"
          </blockquote>
          <p className="font-body text-xs tracking-[0.2em] uppercase" style={{ color: BL.BRASS }}>
            — {KEY_QUOTES[0].speaker}, {KEY_QUOTES[0].year}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
