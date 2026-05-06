/**
 * Verdict — full-bleed typography moment that lands an essay's thesis.
 *
 * One large line, optionally split into a setup + verdict pair. Reveals
 * word-by-word on scroll-into-view, holds, then optionally an attribution
 * footer. Designed as the closing or near-closing beat of an essay; the
 * "carousel pattern slide" applied to long-form scroll.
 *
 * Reusable across essays. Battuta uses it; Radcliffe, Berlin, and the
 * Dharma essays will each get one.
 *
 * SKILL trace: matches "Hero with webfont". Uses Pretext useTextHeight on
 * the verdict line to reserve space and kill CLS on Cormorant Garamond
 * webfont swap (the line is the load-bearing pixel of the section).
 */
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTextHeight, useContainerWidth } from '@/hooks/usePretext';

export interface VerdictProps {
  /** Optional smaller line above the verdict — sets up the punch. */
  setup?: string;
  /** The verdict line itself. Single sentence. Don't end with a period
   *  unless the silence after the period is what lands. */
  text: string;
  /** Optional attribution shown small under the verdict. */
  attribution?: string;
  /** Optional eyebrow above setup, in tracking-wide caps. */
  eyebrow?: string;
  /** Token color for accent rule and eyebrow. */
  accentColor?: string;
  /** Token color for ink. */
  inkColor?: string;
  /** Subtle background color. Defaults to transparent. */
  background?: string;
  /** Word-by-word stagger amount in seconds. Default 0.08. */
  staggerWord?: number;
  /** Verdict font-size in px (display weight). Default 80. */
  fontSize?: number;
  /** Vertical padding in px (top + bottom). Default 160. */
  paddingY?: number;
  className?: string;
}

const VERDICT_LH = 1.12;
const VERDICT_FONT_FAMILY = "'Cormorant Garamond', Georgia, serif";

export const Verdict: React.FC<VerdictProps> = ({
  setup,
  text,
  attribution,
  eyebrow,
  accentColor = 'currentColor',
  inkColor = 'currentColor',
  background = 'transparent',
  staggerWord = 0.08,
  fontSize = 80,
  paddingY = 160,
  className,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-15% 0px -15% 0px' });

  // Pretext-measured verdict height to reserve space — verdict is the
  // load-bearing pixel of the section, must not CLS on font swap.
  const { ref: containerRef, width } = useContainerWidth<HTMLDivElement>();
  const verdictMetrics = useTextHeight(
    text,
    `700 ${fontSize}px "Cormorant Garamond"`,
    width || 800,
    fontSize * VERDICT_LH,
  );

  const words = text.split(/(\s+)/); // keep whitespace tokens for natural rendering

  return (
    <section
      ref={sectionRef}
      className={className}
      style={{
        position: 'relative',
        background,
        padding: `${paddingY}px 24px`,
      }}
    >
      <div
        ref={containerRef}
        className="max-w-4xl mx-auto text-center"
      >
        {eyebrow && (
          <motion.p
            className="text-[10px] tracking-[0.4em] uppercase font-body font-semibold mb-10"
            style={{ color: accentColor, opacity: 0.6 }}
            initial={{ opacity: 0, y: -6 }}
            animate={inView ? { opacity: 0.6, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {eyebrow}
          </motion.p>
        )}

        {setup && (
          <motion.p
            className="font-body italic mb-10"
            style={{
              color: inkColor,
              opacity: 0.62,
              fontSize: Math.round(fontSize * 0.32),
              lineHeight: 1.4,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 0.62, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {setup}
          </motion.p>
        )}

        <h2
          className="font-display font-bold"
          style={{
            fontFamily: VERDICT_FONT_FAMILY,
            fontSize,
            lineHeight: VERDICT_LH,
            minHeight: verdictMetrics.height || undefined,
            color: inkColor,
            letterSpacing: '-0.012em',
          }}
        >
          {words.map((token, i) => {
            // Whitespace tokens render as plain space; only animate words
            if (/^\s+$/.test(token)) {
              return <span key={`ws-${i}`}>{token}</span>;
            }
            return (
              <motion.span
                key={`w-${i}`}
                style={{ display: 'inline-block' }}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + (i / 2) * staggerWord,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {token}
              </motion.span>
            );
          })}
        </h2>

        {/* Accent rule */}
        <motion.div
          className="mx-auto"
          style={{
            width: 64,
            height: 1,
            background: accentColor,
            opacity: 0.5,
            marginTop: 48,
            marginBottom: attribution ? 24 : 0,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 0.5 } : {}}
          transition={{
            duration: 0.7,
            delay: 0.4 + (words.length / 2) * staggerWord,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {attribution && (
          <motion.p
            className="font-body text-xs italic"
            style={{ color: accentColor, opacity: 0.7 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.7 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.55 + (words.length / 2) * staggerWord,
            }}
          >
            {attribution}
          </motion.p>
        )}
      </div>
    </section>
  );
};
