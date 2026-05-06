/**
 * TypographyCascade — full-bleed multilingual city-name overlay.
 *
 * Triggered when a scroll-driven map flies into a major city. Renders the
 * city's name in its native script(s), an optional transliteration, and
 * the canonical English exonym, stacked and staggered. Lands like a
 * carousel "pattern slide" inside a long-form essay.
 *
 * Designed to be reusable across essays (Battuta, Wisdom, Persia, Mongol-India,
 * Constantinople, etc.). City-specific data lives in each essay's data file.
 *
 * SKILL trace: matches "Hero with webfont" + "Map with labels / callouts".
 * Uses Pretext useTextHeight on the English anchor (Cormorant CLS-prone);
 * native-script lines use fixed line-height slots (short single-line strings).
 */
import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTextHeight } from '@/hooks/usePretext';

export type CityScript = {
  /** The text in its native or historical script. */
  text: string;
  /** ISO-ish language hint — drives font-family selection. */
  lang: 'ar' | 'zh' | 'hi' | 'ur' | 'el' | 'sa' | 'la' | 'sin' | 'div' | 'ber' | 'mal';
  /** Short context label shown below the script in small caps. */
  label?: string;
  /** Optional transliteration shown below the script in italic. */
  translit?: string;
};

export type CityCascadeData = {
  /** One or more native-script lines, rendered in order top → bottom. */
  scripts: CityScript[];
  /** Canonical English exonym — anchors the bottom of the cascade. */
  english: string;
  /** Optional small caps eyebrow above the cascade (e.g. "Maghrebi medina"). */
  eyebrow?: string;
};

export type TypographyCascadeProps = {
  visible: boolean;
  data: CityCascadeData | null | undefined;
  /** Token color for accent rules and eyebrow. Defaults to currentColor. */
  accentColor?: string;
  /** Token color for the main display ink. */
  inkColor?: string;
  /** Background tint (semi-transparent). Defaults to a parchment veil. */
  backdropColor?: string;
  /** z-index. Defaults to 60 (above PhaseCard at 50). */
  zIndex?: number;
};

/** Map a language hint to a font-family stack. Native scripts fall back to
 *  system fonts; we deliberately do not pull every Noto family for v1. */
function fontForLang(lang: CityScript['lang']): string {
  switch (lang) {
    case 'ar':
    case 'ur':
      return "'Amiri', 'Noto Naskh Arabic', 'Scheherazade New', serif";
    case 'zh':
      return "'Noto Serif SC', 'Songti SC', 'STSong', serif";
    case 'hi':
    case 'sa':
      return "'Noto Serif Devanagari', 'Sanskrit Text', serif";
    case 'el':
      return "'Cormorant Garamond', 'EB Garamond', Georgia, serif";
    case 'sin':
      return "'Noto Serif Sinhala', serif";
    case 'div':
      return "'MV Boli', 'Faruma', 'Noto Sans Thaana', sans-serif";
    case 'ber':
      return "'Noto Sans Tifinagh', sans-serif";
    case 'mal':
      return "'Noto Serif Malayalam', serif";
    case 'la':
    default:
      return "'Cormorant Garamond', Georgia, serif";
  }
}

/** Native-script display sizes. RTL/CJK glyphs read smaller per-pixel than
 *  Latin, so we boost Arabic and Chinese slightly. */
function sizeForLang(lang: CityScript['lang'], scriptCount: number): number {
  const base = scriptCount > 1 ? 56 : 72;
  if (lang === 'ar' || lang === 'ur') return base + 8;
  if (lang === 'zh') return base + 12;
  if (lang === 'div' || lang === 'sin' || lang === 'mal') return base + 4;
  return base;
}

const ENGLISH_FONT = '700 96px "Cormorant Garamond"';
const ENGLISH_LH = 1.05;

export const TypographyCascade: React.FC<TypographyCascadeProps> = ({
  visible,
  data,
  accentColor = 'currentColor',
  inkColor = 'currentColor',
  backdropColor = 'hsla(38, 35%, 88%, 0.92)',
  zIndex = 60,
}) => {
  // Pretext-measured English height to reserve space and kill CLS on
  // Cormorant Garamond webfont swap. Width is irrelevant for a single
  // word so we pass a generous 800 — Pretext returns single-line height.
  const englishMetrics = useTextHeight(
    data?.english ?? '',
    ENGLISH_FONT,
    800,
    96 * ENGLISH_LH,
  );

  const scripts = data?.scripts ?? [];

  // Pre-compute per-script font sizes once per mount of this data.
  const scriptSizes = useMemo(
    () => scripts.map((s) => sizeForLang(s.lang, scripts.length)),
    [scripts],
  );

  // Defensive: if no data, render nothing even when visible flips true.
  if (!data) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Backdrop veil */}
          <motion.div
            className="absolute inset-0"
            style={{ background: backdropColor }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Cascade column */}
          <div className="relative flex flex-col items-center text-center px-8">
            {/* Eyebrow */}
            {data.eyebrow && (
              <motion.p
                className="text-[10px] tracking-[0.32em] uppercase font-body font-semibold mb-6"
                style={{ color: accentColor, opacity: 0.7 }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 0.7, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                {data.eyebrow}
              </motion.p>
            )}

            {/* Native script lines — staggered */}
            {scripts.map((script, i) => {
              const size = scriptSizes[i];
              const lh = Math.round(size * 1.15);
              return (
                <motion.div
                  key={`${script.text}-${i}`}
                  className="relative flex flex-col items-center mb-3"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.18 + i * 0.16,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span
                    style={{
                      fontFamily: fontForLang(script.lang),
                      fontSize: size,
                      lineHeight: `${lh}px`,
                      minHeight: lh, // reserve slot to avoid CLS
                      color: inkColor,
                      direction:
                        script.lang === 'ar' || script.lang === 'ur'
                          ? 'rtl'
                          : 'ltr',
                      letterSpacing: script.lang === 'zh' ? '0.05em' : 'normal',
                    }}
                  >
                    {script.text}
                  </span>

                  {script.translit && (
                    <span
                      className="font-body italic text-base mt-1"
                      style={{ color: inkColor, opacity: 0.55 }}
                    >
                      {script.translit}
                    </span>
                  )}

                  {script.label && (
                    <span
                      className="text-[9px] tracking-[0.28em] uppercase font-body font-semibold mt-1"
                      style={{ color: accentColor, opacity: 0.55 }}
                    >
                      {script.label}
                    </span>
                  )}
                </motion.div>
              );
            })}

            {/* Accent rule */}
            <motion.div
              className="my-6"
              style={{ width: 80, height: 1, background: accentColor, opacity: 0.5 }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.5 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.18 + scripts.length * 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            {/* English anchor — Pretext-measured height reserved */}
            <motion.h2
              className="font-display font-bold"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 96,
                lineHeight: ENGLISH_LH,
                minHeight: englishMetrics.height || 96 * ENGLISH_LH,
                color: inkColor,
                letterSpacing: '-0.01em',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{
                duration: 0.6,
                delay: 0.32 + scripts.length * 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {data.english}
            </motion.h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
