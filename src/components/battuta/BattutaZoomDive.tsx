import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { useScroll } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import Map, { Source, Layer, Marker, type MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import lineSliceAlong from '@turf/line-slice-along';
import turfAlong from '@turf/along';
import {
  STAGES_GL,
  IB,
  ROUTE_GEOJSON,
  GHOST_ROUTE_GEOJSON,
  ROUTE_CUMULATIVE_DISTANCES,
  TOTAL_ROUTE_LENGTH_KM,
} from '@/components/battuta/battutaGeoData';
import { PHASE_ARABIC } from '@/components/visuals/battutaMapData';
import { BATTUTA_MAP_STYLE } from '@/components/battuta/battutaMapStyle';
import { CompassRose } from '@/components/battuta/CompassRose';
import { PortolanCompassRose } from '@/components/battuta/PortolanCompassRose';
import { RihlaQuote } from '@/components/battuta/RihlaQuote';

/* ── Overview-only ghost destinations: faint pre-shadows of where the
   journey will go, drawn alongside the ghost route on the opening stage.
   [lng, lat] for Maplibre. ── */
const OVERVIEW_GHOST_DESTINATIONS: { coords: [number, number]; label: string; year: string }[] = [
  { coords: [39.826, 21.422],  label: 'Mecca',          year: '1326' },
  { coords: [28.978, 41.008],  label: 'Constantinople', year: '1334' },
  { coords: [77.209, 28.613],  label: 'Delhi',          year: '1334' },
  { coords: [118.675, 24.874], label: 'Quanzhou',       year: '1345' },
  { coords: [-3.002, 16.766],  label: 'Timbuktu',       year: '1353' },
];
import { TypographyCascade } from '@/components/visuals/TypographyCascade';
import { CITY_SCRIPTS } from '@/components/battuta/cityScripts';
import { ShaderLayer } from '@/components/visuals/ShaderLayer';
import { FlowFieldParticles, type FlowFieldMood } from '@/components/visuals/FlowFieldParticles';

/* ── Phase → ambient mood mapping. Each phase's geography evokes a
   different atmosphere: desert dust, monsoon wind, steppe snow, etc. ── */
const PHASE_MOOD: Record<number, FlowFieldMood> = {
  0: 'desert',  // North Africa to Mecca
  1: 'monsoon', // Iraq, Persia & East Africa (Indian Ocean leg)
  2: 'steppe',  // Anatolia & the Golden Horde
  3: 'desert',  // The Delhi Sultanate (Hindu Kush + Indo-Gangetic warmth)
  4: 'monsoon', // Maldives to China
  5: 'plague',  // The Black Death Return
  6: 'sahara',  // Al-Andalus & Mali (trans-Saharan)
};

const PHASE_COLORS: Record<number, string> = {
  0: IB.SAFFRON,
  1: IB.LAPIS,
  2: IB.HENNA,
  3: IB.EMERALD,
  4: IB.MONSOON,
  5: 'hsl(0, 0%, 40%)',
  6: IB.SAND,
};

/* ── Active marker label ── */
const ActiveMarkerLabel = ({ label, detail }: { label: string; detail?: string }) => (
  <div className="flex flex-col items-center" style={{ width: 180 }}>
    <div
      style={{
        padding: '8px 12px',
        borderRadius: 4,
        background: 'hsla(38, 35%, 95%, 0.95)',
        border: `2px solid ${IB.SAFFRON}`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.15), inset 0 0 0 1px ${IB.LEATHER}30`,
        textAlign: 'center',
      }}
    >
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, fontWeight: 700, color: IB.LEATHER, lineHeight: 1.2 }}>
        {label}
      </div>
      {detail && (
        <div style={{ marginTop: 2, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 10, color: IB.INK_LIGHT, opacity: 0.7 }}>
          {detail}
        </div>
      )}
    </div>
    <div style={{ width: 2, height: 8, background: `linear-gradient(180deg, ${IB.SAFFRON}, transparent)` }} />
    <div style={{ width: 10, height: 10, borderRadius: '50%', background: IB.SAFFRON, border: `2px solid ${IB.LEATHER}`, boxShadow: '0 0 8px hsla(38,80%,55%,0.4)' }} />
  </div>
);

const InactiveDot = () => (
  <div style={{ width: 6, height: 6, borderRadius: '50%', background: IB.INK_LIGHT, border: `1.5px solid ${IB.PARCHMENT_DK}`, opacity: 0.5 }} />
);

const RouteHead = ({ color }: { color: string }) => (
  <div style={{ width: 12, height: 12, borderRadius: '50%', background: color, border: `2px solid ${IB.SAFFRON}`, boxShadow: `0 0 14px ${color}80`, animation: 'battuta-pulse 2s ease-in-out infinite' }} />
);

/* ── Phase transition overlay ── */
const PhaseCard = ({ phase, visible }: { phase: string; visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
        <motion.div className="absolute inset-0" style={{ background: `${IB.PARCHMENT}ee` }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
        <motion.div className="relative text-center"
          initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.98 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px" style={{ background: IB.SAFFRON }} />
            <CompassRose size={24} color={IB.SAFFRON} opacity={0.8} />
            <div className="w-16 h-px" style={{ background: IB.SAFFRON }} />
          </div>
          <p className="text-2xl mb-2" style={{ fontFamily: "'Amiri', 'Noto Naskh Arabic', serif", color: IB.SAFFRON_DIM, opacity: 0.7 }}>
            {PHASE_ARABIC[phase] ?? ''}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: IB.INK }}>
            {phase}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-16 h-px" style={{ background: IB.SAFFRON }} />
            <CompassRose size={24} color={IB.SAFFRON} opacity={0.8} />
            <div className="w-16 h-px" style={{ background: IB.SAFFRON }} />
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export const BattutaZoomDive = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapRef>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [routeDistanceKm, setRouteDistanceKm] = useState(0);
  const [showPhaseCard, setShowPhaseCard] = useState(false);
  const [activePhase, setActivePhase] = useState('');
  const prevPhaseRef = useRef('');
  const shownPhasesRef = useRef<Set<string>>(new Set());
  const stageRef = useRef(0);

  // City-name typography cascade (multilingual overlay on stage entry)
  const [showCityCascade, setShowCityCascade] = useState(false);
  const [activeCityStageId, setActiveCityStageId] = useState<string>('');
  const shownCitiesRef = useRef<Set<string>>(new Set());
  // Refs for scroll-aware overlay dismissal
  const phaseShownAtRef = useRef<number>(0);
  const cascadeShownAtRef = useRef<number>(0);
  const showPhaseCardRef = useRef(false);
  const showCityCascadeRef = useRef(false);
  showPhaseCardRef.current = showPhaseCard;
  showCityCascadeRef.current = showCityCascade;

  const stage = STAGES_GL[currentStage];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Scroll → stage index + continuous route distance + scroll-aware dismiss
  // for the phase card and city cascade overlays. Both honor a 700ms min
  // display floor before scroll-dismiss kicks in (so fast scrolling doesn't
  // flash-and-vanish them).
  useEffect(() => {
    const MIN_DISPLAY_MS = 700;
    const PHASE_DISMISS_INTRA = 0.45;   // dismiss after 45% scroll within stage
    const CASCADE_DISMISS_INTRA = 0.55; // city cascade lingers slightly longer
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const count = STAGES_GL.length;
      const idx = Math.min(count - 1, Math.floor(v * count));
      if (idx !== stageRef.current) {
        stageRef.current = idx;
        setCurrentStage(idx);
      }

      // Continuous distance
      const s = STAGES_GL[idx];
      const nextS = STAGES_GL[Math.min(idx + 1, count - 1)];
      const intra = (v * count) - idx;
      const curDist = s.routeUpTo >= 0 ? ROUTE_CUMULATIVE_DISTANCES[s.routeUpTo] : 0;
      const nextDist = nextS.routeUpTo >= 0 ? ROUTE_CUMULATIVE_DISTANCES[nextS.routeUpTo] : curDist;
      setRouteDistanceKm(curDist + (nextDist - curDist) * intra);

      // Scroll-aware overlay dismiss (replaces pure-timer dismissal)
      const now = performance.now();
      if (
        showPhaseCardRef.current &&
        intra > PHASE_DISMISS_INTRA &&
        now - phaseShownAtRef.current > MIN_DISPLAY_MS
      ) {
        setShowPhaseCard(false);
      }
      if (
        showCityCascadeRef.current &&
        intra > CASCADE_DISMISS_INTRA &&
        now - cascadeShownAtRef.current > MIN_DISPLAY_MS
      ) {
        setShowCityCascade(false);
      }
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Phase transition detection. Show is timer-triggered with a generous
  // ceiling; scroll-aware early dismissal lives in the scroll listener.
  useEffect(() => {
    const phase = STAGES_GL[currentStage].phase;
    if (phase !== prevPhaseRef.current && prevPhaseRef.current !== '' && currentStage > 0 && !shownPhasesRef.current.has(phase)) {
      shownPhasesRef.current.add(phase);
      setActivePhase(phase);
      setShowPhaseCard(true);
      phaseShownAtRef.current = performance.now();
      // Ceiling timer: max 3500ms even if user never scrolls past the trigger
      const timer = setTimeout(() => setShowPhaseCard(false), 3500);
      return () => clearTimeout(timer);
    }
    prevPhaseRef.current = phase;
  }, [currentStage]);

  // City cascade trigger — fires on first entry to any stage that has
  // a CITY_SCRIPTS entry. Defers to PhaseCard if both would fire on the
  // same stage transition (PhaseCard runs first, cascade follows).
  // Dismissal is scroll-aware (handled in the scroll listener below) with
  // a generous timer ceiling for users who pause mid-stage.
  useEffect(() => {
    const stageId = STAGES_GL[currentStage].id;
    const cascade = CITY_SCRIPTS[stageId];
    if (!cascade || shownCitiesRef.current.has(stageId)) return;
    if (currentStage === 0) return; // skip overview

    shownCitiesRef.current.add(stageId);
    // If the phase card is showing, hold cascade until it clears (~2800ms).
    const phaseCardActive = showPhaseCard;
    const delay = phaseCardActive ? 3000 : 700;

    const showTimer = setTimeout(() => {
      setActiveCityStageId(stageId);
      setShowCityCascade(true);
      // Mark show time so scroll-aware dismiss honors a min display duration
      cascadeShownAtRef.current = performance.now();
    }, delay);
    // Ceiling timer: max display 4000ms even if user never scrolls
    const hideTimer = setTimeout(() => {
      setShowCityCascade(false);
    }, delay + 4000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
    // showPhaseCard intentionally captured at trigger time only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStage]);

  // 3D Camera flyTo on stage change
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const s = STAGES_GL[currentStage];
    const duration = Math.round(1200 * s.speed);

    if (currentStage === 0) {
      map.jumpTo({ center: s.center, zoom: s.zoom, pitch: s.pitch, bearing: s.bearing });
    } else {
      map.stop();
      map.flyTo({
        center: s.center,
        zoom: s.zoom,
        pitch: s.pitch,
        bearing: s.bearing,
        duration,
        essential: true,
      });
    }
  }, [currentStage]);

  // Visible route GeoJSON
  const visibleRoute = useMemo(() => {
    if (routeDistanceKm <= 0.5) return null;
    const clamped = Math.min(routeDistanceKm, TOTAL_ROUTE_LENGTH_KM - 0.1);
    try { return lineSliceAlong(ROUTE_GEOJSON, 0, clamped, { units: 'kilometers' }); }
    catch { return null; }
  }, [routeDistanceKm]);

  // Route head position
  const routeHeadPos = useMemo(() => {
    if (routeDistanceKm <= 0.5) return null;
    const clamped = Math.min(routeDistanceKm, TOTAL_ROUTE_LENGTH_KM - 0.1);
    try { return turfAlong(ROUTE_GEOJSON, clamped, { units: 'kilometers' }).geometry.coordinates as [number, number]; }
    catch { return null; }
  }, [routeDistanceKm]);

  // Accumulated markers
  const { inactiveMarkers, activeMarkers } = useMemo(() => {
    const inactive: { key: string; lng: number; lat: number }[] = [];
    const active: { key: string; lng: number; lat: number; label: string; detail?: string }[] = [];
    for (let i = 0; i <= currentStage; i++) {
      const s = STAGES_GL[i];
      for (const mk of s.markers) {
        const entry = { key: `${s.id}-${mk.label}`, lng: mk.coords[0], lat: mk.coords[1], label: mk.label, detail: mk.detail };
        if (i === currentStage) active.push(entry); else inactive.push(entry);
      }
    }
    return { inactiveMarkers: inactive, activeMarkers: active };
  }, [currentStage]);

  const progressFraction = currentStage / (STAGES_GL.length - 1);
  const distanceSoFar = Math.round(progressFraction * 117000);
  const phaseColor = PHASE_COLORS[stage.phaseIndex] || IB.SAFFRON;

  const onMapWheel = useCallback((e: React.WheelEvent) => { e.stopPropagation(); }, []);

  return (
    <div ref={sectionRef} className="relative battuta-vellum-grain" style={{ height: `${STAGES_GL.length * 100}vh`, background: IB.PARCHMENT }}>
      <div className="sticky top-0 h-screen w-full p-3">
        <div className="w-full h-full flex relative overflow-hidden"
          style={{
            border: `3px solid ${IB.SAFFRON}`,
            boxShadow: `inset 0 0 0 5px ${IB.PARCHMENT}, inset 0 0 0 6.5px ${IB.LEATHER}50, 0 4px 24px rgba(0,0,0,0.08)`,
            borderRadius: 3,
          }}>

          {/* Atmospheric shader layers — paper underneath, grain on top.
              mix-blend-mode composites them with the map and panel below. */}
          <ShaderLayer kind="paper" intensity={0.32} zIndex={1} />
          <ShaderLayer kind="grain" intensity={0.18} zIndex={3} />

          <PhaseCard phase={activePhase} visible={showPhaseCard} />

          {/* Multilingual city cascade — fires on stage entry for tagged cities */}
          <TypographyCascade
            visible={showCityCascade}
            data={CITY_SCRIPTS[activeCityStageId]}
            accentColor={IB.SAFFRON}
            inkColor={IB.INK}
            backdropColor={`${IB.PARCHMENT}ee`}
            zIndex={55}
          />

          {/* Left Panel — 40% — Narrative */}
          <div className="w-[40%] h-full flex flex-col relative overflow-hidden battuta-vellum-grain battuta-foxing" style={{ background: IB.PARCHMENT, borderRadius: '1px 0 0 1px' }}>
            <div className="px-10 pt-10 pb-3 relative z-20">
              <p className="text-[10px] tracking-[0.32em] uppercase font-body font-semibold"
                style={{ color: phaseColor, opacity: 0.85 }}>
                {stage.phase}
              </p>
              <p className="text-[11px] mt-1.5 font-mono tracking-wide" style={{ color: IB.INK_LIGHT, opacity: 0.55 }}>
                {stage.date}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-10 pb-10 scrollbar-hide relative z-20">
              <AnimatePresence mode="popLayout">
                <motion.div key={stage.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                  {/* Overview-only: decorative manuscript flourish above the
                      title — sets the "title page" weight. */}
                  {currentStage === 0 && (
                    <div className="flex items-center gap-3 mb-3 -mx-2 opacity-70">
                      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${IB.SAFFRON}80)` }} />
                      <span style={{ color: IB.SAFFRON, fontSize: 18, lineHeight: 1 }}>✦</span>
                      <CompassRose size={16} color={IB.SAFFRON} opacity={0.65} />
                      <span style={{ color: IB.SAFFRON, fontSize: 18, lineHeight: 1 }}>✦</span>
                      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${IB.SAFFRON}80)` }} />
                    </div>
                  )}

                  {/* Stage title — leather cartouche, bumped to display weight */}
                  <div className="relative mt-3 mb-5 -mx-2">
                    <div className="px-5 py-2.5 inline-block" style={{ background: `linear-gradient(135deg, ${IB.LEATHER}, ${IB.LEATHER_MID})`, boxShadow: `0 2px 14px hsla(25, 45%, 22%, 0.28)` }}>
                      <h3 className="font-display text-2xl md:text-[26px] font-bold leading-[1.1]" style={{ color: IB.PARCHMENT, letterSpacing: '-0.005em' }}>
                        {stage.narrative.title}
                      </h3>
                    </div>
                  </div>

                  {/* Image — artifact scale with a light "bookplate" border:
                      thin saffron outer rule, parchment mat, inner hairline
                      rule. No dark leather. Soft warm drop shadow gives lift
                      without weight. */}
                  {stage.narrative.image && (
                    <figure className="mb-7 -mx-6">
                      <div
                        className="relative"
                        style={{
                          // Parchment mat — sits between image and outer rule
                          padding: 6,
                          background: IB.PARCHMENT,
                          // Outer + inner hairlines via stacked rings
                          boxShadow:
                            `0 0 0 1.5px ${IB.SAFFRON}b0,` +     // outer saffron rule
                            ` 0 0 0 2.5px ${IB.PARCHMENT},` +    // outer mat sliver
                            ` 0 0 0 3.5px ${IB.SAFFRON}50,` +    // inner hair-rule
                            ` 0 8px 22px hsla(25, 30%, 25%, 0.14),` + // soft warm drop
                            ` 0 2px 6px hsla(25, 30%, 25%, 0.08)`,
                        }}
                      >
                        <div
                          className="relative overflow-hidden"
                          style={{
                            aspectRatio: '4 / 3',
                            minHeight: 280,
                            maxHeight: 460,
                          }}
                        >
                          <img
                            src={stage.narrative.image.src}
                            alt={stage.narrative.image.alt}
                            className="w-full h-full object-cover"
                            style={{ filter: 'sepia(0.18) saturate(0.88) contrast(1.06)' }}
                            loading="lazy"
                          />
                          {/* Vellum vignette around the photograph */}
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{ boxShadow: `inset 0 0 50px 10px ${IB.PARCHMENT}60` }}
                          />
                        </div>

                        {/* Four corner marks — bare saffron crosses, no dark
                            backing. Sit on the parchment mat. */}
                        {(['tl', 'tr', 'bl', 'br'] as const).map((corner) => {
                          const positions: Record<string, React.CSSProperties> = {
                            tl: { top: 1, left: 1 },
                            tr: { top: 1, right: 1 },
                            bl: { bottom: 1, left: 1 },
                            br: { bottom: 1, right: 1 },
                          };
                          return (
                            <span
                              key={corner}
                              style={{
                                position: 'absolute',
                                ...positions[corner],
                                width: 8,
                                height: 8,
                                fontSize: 8,
                                lineHeight: 1,
                                color: IB.SAFFRON,
                                opacity: 0.75,
                                pointerEvents: 'none',
                                fontFamily: 'serif',
                              }}
                            >
                              ✦
                            </span>
                          );
                        })}
                      </div>

                      {/* Caption — italic, centered, with tiny saffron rule above */}
                      <div className="mt-3 px-6 flex flex-col items-center">
                        <span
                          style={{
                            display: 'block',
                            width: 32,
                            height: 1,
                            background: `${IB.SAFFRON}80`,
                            marginBottom: 6,
                          }}
                        />
                        <figcaption
                          className="text-[11.5px] italic font-body leading-snug text-center"
                          style={{ color: IB.INK_LIGHT, opacity: 0.78 }}
                        >
                          {stage.narrative.image.caption}
                        </figcaption>
                      </div>
                    </figure>
                  )}

                  {/* Body — bumped from text-sm/14px to text-[17px] with tighter
                      leading. Cormorant Garamond reads better at larger sizes;
                      14px was cramped and underweighted the prose against the
                      now-larger imagery.

                      Overview stage gets an illuminated drop-cap on the first
                      letter — medieval manuscript convention to mark a chapter
                      opening, here marking the opening of the journey. */}
                  {currentStage === 0 ? (
                    <p
                      className="font-body mb-5"
                      style={{
                        color: IB.INK,
                        fontSize: 17,
                        lineHeight: 1.7,
                        letterSpacing: '0.005em',
                      }}
                    >
                      <span
                        className="font-display battuta-gilt"
                        style={{
                          float: 'left',
                          fontSize: 76,
                          lineHeight: 0.85,
                          marginRight: 10,
                          marginTop: 6,
                          marginBottom: -2,
                          color: IB.HENNA,
                          fontWeight: 700,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {stage.narrative.body.charAt(0)}
                      </span>
                      {stage.narrative.body.slice(1)}
                    </p>
                  ) : (
                    <p
                      className="font-body mb-5"
                      style={{
                        color: IB.INK,
                        fontSize: 17,
                        lineHeight: 1.7,
                        letterSpacing: '0.005em',
                      }}
                    >
                      {stage.narrative.body}
                    </p>
                  )}

                  {/* Accent — pull-out italic, bumped to text-sm to sit alongside
                      the new larger body without disappearing. */}
                  {stage.narrative.accent && (
                    <p
                      className="font-body italic mb-7 pl-5"
                      style={{
                        color: IB.SAFFRON_DIM,
                        opacity: 0.95,
                        borderLeft: `2px solid ${IB.SAFFRON}60`,
                        fontSize: 14.5,
                        lineHeight: 1.55,
                      }}
                    >
                      {stage.narrative.accent}
                    </p>
                  )}

                  {stage.narrative.quote && (
                    <RihlaQuote attribution={stage.narrative.quote.attribution}>
                      {stage.narrative.quote.text}
                    </RihlaQuote>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="px-10 py-3 flex items-center gap-3 relative z-20" style={{ borderTop: `1px solid ${IB.SAFFRON}30` }}>
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: IB.PARCHMENT_DK }}>
                <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(to right, ${IB.LEATHER}, ${IB.SAFFRON})` }}
                  animate={{ width: `${progressFraction * 100}%` }} transition={{ duration: 0.6 }} />
              </div>
              <span className="text-[10px] tracking-[0.12em] font-body font-semibold whitespace-nowrap" style={{ color: IB.INK_LIGHT, opacity: 0.6 }}>
                {distanceSoFar.toLocaleString()} / 117,000 km
              </span>
            </div>
          </div>

          <div className="w-px h-[85%] self-center flex-shrink-0" style={{ background: `${IB.SAFFRON}40` }} />

          {/* Right Map — 60% — 3D MapLibre */}
          <div className="flex-1 h-full relative overflow-hidden" style={{ borderRadius: '0 1px 1px 0' }}>
            {/* Overview-only: large background portolan compass rose, embedded
                like an old atlas's central ornament. Above the map but below
                the chrome (stats card, cartouche). */}
            {currentStage === 0 && (
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ zIndex: 6 }}
              >
                <PortolanCompassRose
                  size={520}
                  color={IB.SAFFRON}
                  opacity={0.09}
                  animated
                  points={32}
                />
              </div>
            )}
            <div className="absolute inset-0" onWheel={onMapWheel}>
              <Map
                ref={mapRef}
                mapStyle={BATTUTA_MAP_STYLE}
                initialViewState={{
                  longitude: STAGES_GL[0].center[0],
                  latitude: STAGES_GL[0].center[1],
                  zoom: STAGES_GL[0].zoom,
                  pitch: 0,
                  bearing: 0,
                }}
                scrollZoom={false}
                doubleClickZoom={false}
                dragRotate={true}
                pitchWithRotate={true}
                touchZoomRotate={false}
                keyboard={false}
                attributionControl={false}
                style={{ width: '100%', height: '100%' }}
                maxPitch={65}
              >
                {/* Ghost route at overview — boosted opacity/width so the
                    full journey actually registers as a visible pre-trace. */}
                {currentStage === 0 && (
                  <>
                    {/* Soft glow under the ghost line */}
                    <Source id="ghost-route-glow" type="geojson" data={GHOST_ROUTE_GEOJSON}>
                      <Layer id="ghost-glow" type="line"
                        paint={{ 'line-color': IB.SAFFRON, 'line-width': 6, 'line-opacity': 0.12, 'line-blur': 4 }}
                        layout={{ 'line-cap': 'round', 'line-join': 'round' }} />
                    </Source>
                    {/* Visible dashed pre-trace */}
                    <Source id="ghost-route" type="geojson" data={GHOST_ROUTE_GEOJSON}>
                      <Layer id="ghost-line" type="line"
                        paint={{ 'line-color': IB.LEATHER, 'line-width': 1.8, 'line-opacity': 0.4, 'line-dasharray': [3, 4] }}
                        layout={{ 'line-cap': 'round', 'line-join': 'round' }} />
                    </Source>
                  </>
                )}

                {/* Ghost destination markers — only on overview, hint at the
                    five major waypoints he will reach across 29 years. */}
                {currentStage === 0 && OVERVIEW_GHOST_DESTINATIONS.map((d) => (
                  <Marker key={`ghost-${d.label}`} longitude={d.coords[0]} latitude={d.coords[1]} anchor="bottom">
                    <div className="flex flex-col items-center pointer-events-none" style={{ opacity: 0.55 }}>
                      <div
                        className="px-2 py-0.5 mb-1"
                        style={{
                          background: 'hsla(38, 35%, 95%, 0.9)',
                          border: `1px solid ${IB.SAFFRON}55`,
                          borderRadius: 2,
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: 10,
                          fontStyle: 'italic',
                          color: IB.LEATHER,
                          letterSpacing: '0.04em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {d.label}
                        <span style={{ marginLeft: 4, opacity: 0.55, fontSize: 8, fontStyle: 'normal' }}>{d.year}</span>
                      </div>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: IB.SAFFRON, opacity: 0.6, border: `1px solid ${IB.LEATHER}50` }} />
                    </div>
                  </Marker>
                ))}

                {/* Visible route — progressively revealed */}
                {visibleRoute && (
                  <Source id="route" type="geojson" data={visibleRoute}>
                    <Layer id="route-glow" type="line"
                      paint={{ 'line-color': phaseColor, 'line-width': 8, 'line-opacity': 0.2, 'line-blur': 4 }}
                      layout={{ 'line-cap': 'round', 'line-join': 'round' }} />
                    <Layer id="route-core" type="line"
                      paint={{ 'line-color': phaseColor, 'line-width': 3, 'line-opacity': 0.85 }}
                      layout={{ 'line-cap': 'round', 'line-join': 'round' }} />
                  </Source>
                )}

                {/* Route head */}
                {routeHeadPos && (
                  <Marker longitude={routeHeadPos[0]} latitude={routeHeadPos[1]} anchor="center">
                    <RouteHead color={phaseColor} />
                  </Marker>
                )}

                {/* Inactive markers */}
                {inactiveMarkers.map((mk) => (
                  <Marker key={mk.key} longitude={mk.lng} latitude={mk.lat} anchor="center">
                    <InactiveDot />
                  </Marker>
                ))}

                {/* Active markers */}
                {activeMarkers.map((mk) => (
                  <Marker key={mk.key} longitude={mk.lng} latitude={mk.lat} anchor="bottom">
                    <ActiveMarkerLabel label={mk.label} detail={mk.detail} />
                  </Marker>
                ))}
              </Map>
            </div>

            {/* Sepia / vellum overlay for portolan feel */}
            <div className="absolute inset-0 pointer-events-none mix-blend-multiply" style={{ background: 'hsla(38, 35%, 85%, 0.15)' }} />
            <div className="absolute inset-0 pointer-events-none mix-blend-color" style={{ background: 'hsla(30, 30%, 70%, 0.08)' }} />

            {/* Phase-aware ambient particles — desert dust, monsoon wind,
                steppe snow, plague ash, Saharan sandstorm. Sits above the
                sepia overlays but below the chrome (stats card, cartouche). */}
            {currentStage > 0 && stage.phaseIndex >= 0 && (
              <FlowFieldParticles
                mood={PHASE_MOOD[stage.phaseIndex] ?? 'desert'}
                opacity={0.6}
                zIndex={5}
              />
            )}

            {/* Parchment edge fade — heavier for atlas feel */}
            <div className="absolute inset-0 pointer-events-none z-10" style={{ boxShadow: `inset 0 0 60px 20px ${IB.PARCHMENT}, inset 0 0 20px 8px ${IB.PARCHMENT}` }} />

            {/* Stats card */}
            {currentStage > 0 && (
              <div className="absolute top-5 right-5 z-20">
                <motion.div className="px-4 py-3 font-body" style={{
                  background: 'hsla(38, 35%, 95%, 0.95)', border: `1.5px solid ${IB.SAFFRON}`,
                  borderRadius: 4, boxShadow: '0 2px 12px rgba(0,0,0,0.15)', minWidth: 140,
                }}>
                  <div className="flex items-baseline gap-1.5 mb-1.5">
                    <span className="text-lg font-display font-bold" style={{ color: IB.SAFFRON_DIM }}>{distanceSoFar.toLocaleString()}</span>
                    <span className="text-[9px] uppercase tracking-wider font-semibold" style={{ color: IB.INK_LIGHT }}>km</span>
                  </div>
                  <div className="text-[10px] leading-relaxed font-medium" style={{ color: IB.INK }}>
                    <div>{stage.date}</div>
                    <div style={{ opacity: 0.7 }}>{stage.phase}</div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Stage label cartouche */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
              <motion.div className="px-5 py-2.5" style={{
                background: 'hsla(38, 35%, 95%, 0.95)', border: `2px solid ${IB.SAFFRON}`,
                boxShadow: `0 4px 20px rgba(0,0,0,0.15), inset 0 0 0 1px ${IB.LEATHER}30`, borderRadius: 4,
              }}>
                <p className="text-[11px] tracking-[0.18em] uppercase font-body font-bold text-center" style={{ color: IB.INK }}>
                  {stage.label}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll anchors */}
      <div className="absolute inset-0 pointer-events-none">
        {STAGES_GL.map((s) => (
          <div key={s.id} id={s.id} style={{ height: '100vh' }} />
        ))}
      </div>

      <style>{`
        @keyframes battuta-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
};
