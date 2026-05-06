/**
 * JourneyOverview — full-bleed scale moment showing the entire route.
 *
 * One primitive, two framings:
 *
 *  - `mode="prelude"` — placed BEFORE the per-stage dive. Anticipation.
 *    Route draws in over ~5 seconds, markers fade in by phase, counters tick
 *    up to full. "Here is where he will go."
 *
 *  - `mode="reflection"` — placed AFTER the dive. Reflection.
 *    Route appears already drawn, all markers lit and saturated, counters
 *    at full from the start. Holds for the reader to absorb. "Here is
 *    where he went."
 *
 * Renders Battuta's full ROUTE_GEOJSON projected via d3-geo equal-earth,
 * with all 30 STAGES as phase-colored markers, big stat counters, and a
 * seven-chip phase legend.
 *
 * Pure SVG + d3-geo — no Maplibre instance, no second WebGL context.
 * Reusable for any essay that has a route + stages.
 */
import React, { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { geoEqualEarth, geoPath } from 'd3-geo';
import type { Feature, LineString } from 'geojson';
import { STAGES, IB } from '@/components/visuals/battutaMapData';
import { ROUTE_GEOJSON } from '@/components/battuta/battutaGeoData';

const PHASE_LABELS = [
  { idx: 0, label: 'North Africa to Mecca', dates: '1325–1326', km: '~3,500' },
  { idx: 1, label: 'Iraq, Persia & East Africa', dates: '1326–1332', km: '~8,000' },
  { idx: 2, label: 'Anatolia & the Golden Horde', dates: '1332–1334', km: '~6,000' },
  { idx: 3, label: 'The Delhi Sultanate', dates: '1334–1341', km: '~4,500' },
  { idx: 4, label: 'Maldives to China', dates: '1341–1346', km: '~12,000' },
  { idx: 5, label: 'The Black Death Return', dates: '1346–1349', km: '~8,000' },
  { idx: 6, label: 'Al-Andalus & Mali', dates: '1350–1354', km: '~6,000' },
];

const PHASE_COLOR: Record<number, string> = {
  0: IB.SAFFRON,
  1: IB.LAPIS,
  2: IB.HENNA,
  3: IB.EMERALD,
  4: IB.MONSOON,
  5: 'hsl(0, 0%, 40%)',
  6: IB.SAND,
};

export interface JourneyOverviewProps {
  mode: 'prelude' | 'reflection';
  /** Override the default copy. */
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  /** Width of the SVG canvas in viewport units. Default 88. */
  mapWidthVw?: number;
  /** id for scroll spy / linking. */
  id?: string;
}

const DEFAULT_COPY = {
  prelude: {
    eyebrow: 'Before we begin',
    title: 'The Whole Journey',
    subtitle:
      'In June 1325, a 21-year-old left Tangier on a donkey. He returned 29 years later having walked the only world there was.',
  },
  reflection: {
    eyebrow: 'After 29 years',
    title: 'What He Walked',
    subtitle:
      'One man · one lifetime · the medieval world entire — every city you just scrolled, drawn whole.',
  },
};

export const JourneyOverview: React.FC<JourneyOverviewProps> = ({
  mode,
  eyebrow,
  title,
  subtitle,
  mapWidthVw = 88,
  id,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-20% 0px -20% 0px' });

  // Map dims — generous landscape, fits a typical 1440×900 viewport
  const W = 1400;
  const H = 720;
  const PAD = 40;

  // d3-geo projection: equal-earth fit to the route's bounding box, with
  // padding so markers near the edges aren't clipped.
  const { routePath, markers } = useMemo(() => {
    const projection = geoEqualEarth().fitExtent(
      [[PAD, PAD], [W - PAD, H - PAD]],
      ROUTE_GEOJSON as Feature<LineString>,
    );
    const pathGen = geoPath(projection);
    const routePath = pathGen(ROUTE_GEOJSON as Feature<LineString>) ?? '';

    const markers = STAGES
      .filter((s) => s.phaseIndex >= 0)
      .map((s) => {
        const [lng, lat] = [s.center[1], s.center[0]]; // STAGES.center is [lat,lng]
        const projected = projection([lng, lat]);
        return projected
          ? {
              id: s.id,
              label: s.label,
              phaseIndex: s.phaseIndex,
              x: projected[0],
              y: projected[1],
            }
          : null;
      })
      .filter(Boolean) as Array<{ id: string; label: string; phaseIndex: number; x: number; y: number }>;

    return { routePath, markers };
  }, []);

  const copy = {
    eyebrow: eyebrow ?? DEFAULT_COPY[mode].eyebrow,
    title: title ?? DEFAULT_COPY[mode].title,
    subtitle: subtitle ?? DEFAULT_COPY[mode].subtitle,
  };

  // Animation params: prelude is shorter and more eager; reflection is
  // longer and more contemplative.
  const isReflection = mode === 'reflection';
  const routeDuration = isReflection ? 2.4 : 4.6;
  const markerStagger = isReflection ? 0.04 : 0.08;
  const baseRouteOpacity = isReflection ? 1 : 0.92;
  const baseMarkerOpacity = isReflection ? 1 : 0.85;

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full battuta-vellum-grain battuta-foxing"
      style={{
        background: IB.PARCHMENT,
        paddingTop: 96,
        paddingBottom: 96,
      }}
    >
      {/* Eyebrow + title + subtitle */}
      <div className="max-w-3xl mx-auto px-6 text-center mb-10 relative z-10">
        <motion.p
          className="text-[11px] tracking-[0.4em] uppercase font-body font-semibold mb-5"
          style={{ color: IB.SAFFRON, opacity: 0.85 }}
          initial={{ opacity: 0, y: -6 }}
          animate={inView ? { opacity: 0.85, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {copy.eyebrow}
        </motion.p>
        <motion.h2
          className="font-display font-bold mb-5 battuta-gilt"
          style={{
            color: IB.INK,
            fontSize: 'clamp(40px, 5vw, 64px)',
            lineHeight: 1.05,
            letterSpacing: '-0.012em',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {copy.title}
        </motion.h2>
        <motion.p
          className="font-body italic mx-auto"
          style={{
            color: IB.INK_LIGHT,
            fontSize: 18,
            lineHeight: 1.55,
            maxWidth: 640,
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.85 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          {copy.subtitle}
        </motion.p>
      </div>

      {/* Frontispiece portrait — prelude only. The Léon Benett 1878 oil
          "Ibn Battuta in Egypt" framed in matching museum-style cartouche. */}
      {mode === 'prelude' && (
        <motion.figure
          className="mx-auto mb-14 text-center"
          style={{ maxWidth: 300 }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Light cartouche — parchment mat with thin saffron rules, no
              leather. Matches the lighter image frames in the dive. */}
          <div
            className="relative mx-auto"
            style={{
              width: 240,
              height: 304,
              padding: 7,
              background: IB.PARCHMENT,
              borderRadius: '50% 50% 48% 48% / 42% 42% 56% 56%',
              boxShadow:
                `0 0 0 1.5px ${IB.SAFFRON}b0,` +
                ` 0 0 0 2.5px ${IB.PARCHMENT},` +
                ` 0 0 0 3.5px ${IB.SAFFRON}50,` +
                ` 0 10px 28px hsla(25, 30%, 25%, 0.16),` +
                ` 0 3px 8px hsla(25, 30%, 25%, 0.10)`,
            }}
          >
            <div
              className="relative w-full h-full overflow-hidden"
              style={{
                borderRadius: '50% 50% 48% 48% / 42% 42% 56% 56%',
                background: IB.PARCHMENT_DK,
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Handmade_oil_painting_reproduction_of_Ibn_Battuta_in_Egypt%2C_a_painting_by_Hippolyte_Leon_Benett..jpg/960px-Handmade_oil_painting_reproduction_of_Ibn_Battuta_in_Egypt%2C_a_painting_by_Hippolyte_Leon_Benett..jpg"
                alt="Ibn Battuta, depicted in Egypt — oil painting by Léon Benett, 1878"
                className="w-full h-full object-cover"
                style={{ filter: 'sepia(0.25) saturate(0.85) contrast(1.05)', objectPosition: 'center 25%' }}
                loading="lazy"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: `inset 0 0 50px 12px ${IB.PARCHMENT}70` }}
              />
            </div>
          </div>

          {/* Caption with tiny saffron rule */}
          <div className="mt-4 flex flex-col items-center">
            <span
              style={{
                display: 'block',
                width: 36,
                height: 1,
                background: `${IB.SAFFRON}90`,
                marginBottom: 8,
              }}
            />
            <figcaption
              className="font-body italic"
              style={{ color: IB.INK_LIGHT, opacity: 0.78, fontSize: 12.5, lineHeight: 1.55 }}
            >
              Abu Abdullah Muhammad ibn Battuta · c. 1304–1369
              <br />
              <span style={{ opacity: 0.7 }}>painting by Léon Benett, 1878</span>
            </figcaption>
          </div>
        </motion.figure>
      )}

      {/* The route map */}
      <div className="relative mx-auto" style={{ width: `${mapWidthVw}vw`, maxWidth: 1400 }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          style={{ maxHeight: '62vh' }}
          aria-label="Ibn Battuta's complete journey, 1325–1354"
        >
          {/* Subtle parchment grid hint (very faint horizontals) */}
          <g opacity={0.035}>
            {[H * 0.25, H * 0.5, H * 0.75].map((y) => (
              <line key={y} x1={PAD} x2={W - PAD} y1={y} y2={y} stroke={IB.LEATHER} strokeWidth={1} />
            ))}
          </g>

          {/* The route — single continuous line, drawn with stroke-dasharray
              animation. Outer glow for atmosphere, inner core for definition. */}
          <motion.g>
            <motion.path
              d={routePath}
              fill="none"
              stroke={IB.SAFFRON}
              strokeWidth={6}
              strokeOpacity={0.18}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: routeDuration, ease: [0.45, 0, 0.55, 1] }}
            />
            <motion.path
              d={routePath}
              fill="none"
              stroke={IB.LEATHER}
              strokeWidth={1.6}
              strokeOpacity={baseRouteOpacity}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: routeDuration, ease: [0.45, 0, 0.55, 1] }}
            />
          </motion.g>

          {/* Markers — phase-colored dots that fade in staggered along the route */}
          {markers.map((m, i) => (
            <motion.g
              key={m.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: baseMarkerOpacity, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.4 + i * markerStagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <circle
                cx={m.x}
                cy={m.y}
                r={6}
                fill={PHASE_COLOR[m.phaseIndex]}
                stroke={IB.PARCHMENT}
                strokeWidth={1.5}
              />
              <circle
                cx={m.x}
                cy={m.y}
                r={3}
                fill={IB.LEATHER}
              />
            </motion.g>
          ))}

          {/* Tangier callout — anchor point of the whole journey */}
          {markers.length > 0 && (() => {
            const tangier = markers.find((m) => m.id === 'phase1-tangier');
            if (!tangier) return null;
            return (
              <motion.g
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.85 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + markers.length * markerStagger + 0.2 }}
              >
                <text
                  x={tangier.x - 14}
                  y={tangier.y + 4}
                  textAnchor="end"
                  fill={IB.LEATHER}
                  fontFamily="'Cormorant Garamond', Georgia, serif"
                  fontSize={15}
                  fontStyle="italic"
                  fontWeight={600}
                >
                  Tangier
                </text>
                <text
                  x={tangier.x - 14}
                  y={tangier.y + 19}
                  textAnchor="end"
                  fill={IB.SAFFRON_DIM}
                  fontFamily="'Cormorant Garamond', Georgia, serif"
                  fontSize={10}
                  letterSpacing="0.18em"
                >
                  START · END
                </text>
              </motion.g>
            );
          })()}
        </svg>
      </div>

      {/* Stat row — 117,000 km · 29 years · 44 nations */}
      <div className="max-w-4xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: '117,000', unit: 'km', label: 'overland and by sea' },
            { value: '29', unit: 'years', label: 'away from home' },
            { value: '44', unit: 'modern nations', label: 'crossed in one lifetime' },
          ].map((stat, i) => (
            <motion.div
              key={stat.unit}
              className="text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.6 + i * 0.12 + (isReflection ? 0 : 1.5),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex items-baseline justify-center gap-2">
                <span
                  className="font-display font-bold battuta-gilt"
                  style={{
                    color: IB.HENNA,
                    fontSize: 'clamp(44px, 5.5vw, 72px)',
                    lineHeight: 1,
                    letterSpacing: '-0.015em',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-xs uppercase tracking-[0.18em] font-body font-semibold"
                  style={{ color: IB.SAFFRON_DIM }}
                >
                  {stat.unit}
                </span>
              </div>
              <p
                className="font-body italic mt-2"
                style={{ color: IB.INK_LIGHT, opacity: 0.7, fontSize: 13 }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Phase legend — only on prelude (anticipation: "here's what's coming").
          On reflection it's redundant: the reader just scrolled through every
          phase. The reflection closes with a single comparative tagline. */}
      {mode === 'prelude' && (
        <div className="max-w-5xl mx-auto px-6 mt-14">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {PHASE_LABELS.map((p, i) => (
              <motion.div
                key={p.idx}
                className="text-left"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 0.92, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 2.7 + i * 0.06 }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="block w-3 h-3 rounded-full"
                    style={{ background: PHASE_COLOR[p.idx] }}
                  />
                  <span
                    className="text-[9px] tracking-[0.22em] uppercase font-body font-semibold"
                    style={{ color: IB.INK_LIGHT, opacity: 0.55 }}
                  >
                    Phase {p.idx + 1}
                  </span>
                </div>
                <p
                  className="font-display font-semibold leading-tight mb-0.5"
                  style={{ color: IB.INK, fontSize: 14 }}
                >
                  {p.label}
                </p>
                <p
                  className="font-body text-[11px]"
                  style={{ color: IB.INK_LIGHT, opacity: 0.7 }}
                >
                  {p.dates} · {p.km} km
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Reflection-only comparative tagline — absorbs the only unique
          payload from the deleted ExplorerRoutes section. */}
      {isReflection && (
        <motion.p
          className="max-w-3xl mx-auto px-6 mt-14 text-center font-body italic"
          style={{
            color: IB.INK_LIGHT,
            opacity: 0.78,
            fontSize: 17,
            lineHeight: 1.55,
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 0.78, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          Roughly three times the circumference of the Earth — five times what Marco
          Polo walked, more than twice what Zheng He sailed. Not surpassed by any
          land traveller until the age of steam.
        </motion.p>
      )}
    </section>
  );
};
