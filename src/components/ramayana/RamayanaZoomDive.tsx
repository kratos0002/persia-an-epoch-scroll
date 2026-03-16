import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { useScroll } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import Map, { Source, Layer, Marker, type MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import lineSliceAlong from '@turf/line-slice-along';
import turfAlong from '@turf/along';
import {
  STAGES_GL,
  RM,
  TOTAL_DISTANCE_KM,
  ROUTE_GEOJSON,
  GHOST_ROUTE_GEOJSON,
  ROUTE_CUMULATIVE_DISTANCES,
  TOTAL_ROUTE_LENGTH_KM,
} from '@/components/ramayana/ramayanaGeoData';
import { PHASES } from '@/components/visuals/ramayanaMapData';
import { RAMAYANA_MAP_STYLE } from '@/components/ramayana/ramayanaMapStyle';
import { MiniatureBorder, toDevanagari } from '@/components/ramayana/MiniatureBorder';

/* ── Active marker label — React component instead of L.divIcon ── */
const ActiveMarkerLabel = ({ label, detail }: { label: string; detail?: string }) => (
  <div className="flex flex-col items-center" style={{ width: 200 }}>
    <div
      style={{
        padding: '10px 14px',
        borderRadius: 4,
        background: 'hsl(38, 45%, 92%)',
        border: `2px solid ${RM.GOLD_LEAF}`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.15), inset 0 0 0 1px ${RM.VERMILLION}40`,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 14,
          fontWeight: 700,
          color: RM.VERMILLION,
          lineHeight: 1.2,
        }}
      >
        {label}
      </div>
      {detail && (
        <div
          style={{
            marginTop: 3,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 10,
            color: RM.INK,
            opacity: 0.6,
          }}
        >
          {detail}
        </div>
      )}
    </div>
    <div
      style={{
        width: 2,
        height: 10,
        background: `linear-gradient(180deg, ${RM.GOLD_LEAF}, transparent)`,
      }}
    />
    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: RM.VERMILLION,
        border: `3px solid ${RM.GOLD_LEAF}`,
        boxShadow: '0 0 8px hsla(8,78%,48%,0.4)',
      }}
    />
  </div>
);

/* ── Inactive marker dot ── */
const InactiveDot = () => (
  <div
    style={{
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: RM.OCHRE,
      border: `2px solid ${RM.PARCHMENT_DK}`,
    }}
  />
);

/* ── Route head marker (glowing dot at the tip of the drawn route) ── */
const RouteHead = () => (
  <div
    style={{
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: RM.VERMILLION,
      border: `2px solid ${RM.GOLD_LEAF}`,
      boxShadow: `0 0 12px hsla(8, 78%, 48%, 0.5)`,
    }}
  />
);

/* ── Phase names in Devanagari ── */
const PHASE_DEVANAGARI: Record<string, string> = {
  'The Departure': 'प्रस्थान',
  'The Wilderness': 'वनवास',
  'The Search': 'खोज',
  'The War Path': 'युद्धपथ',
  'Lanka': 'लंका',
  'The Return': 'वापसी',
};

const PHASE_NUMBER: Record<string, number> = {
  'The Departure': 1,
  'The Wilderness': 2,
  'The Search': 3,
  'The War Path': 4,
  'Lanka': 5,
  'The Return': 6,
};

/* ── Phase transition card — full overlay ── */
const PhaseCard = ({ phase, visible }: { phase: string; visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Semi-transparent parchment backdrop */}
        <motion.div
          className="absolute inset-0"
          style={{ background: `${RM.PARCHMENT}ee` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Card content */}
        <motion.div
          className="relative text-center"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Decorative top line */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px" style={{ background: RM.GOLD_LEAF }} />
            <div
              className="w-3 h-3 rotate-45"
              style={{ border: `1.5px solid ${RM.GOLD_LEAF}`, background: RM.VERMILLION }}
            />
            <div className="w-16 h-px" style={{ background: RM.GOLD_LEAF }} />
          </div>

          {/* Phase number */}
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-3" style={{ color: RM.OCHRE }}>
            Part {PHASE_NUMBER[phase] ?? ''} of {PHASES.length}
          </p>

          {/* Devanagari */}
          <p
            className="text-3xl mb-2"
            style={{ fontFamily: "'Tiro Devanagari', serif", color: RM.VERMILLION, opacity: 0.7 }}
          >
            {PHASE_DEVANAGARI[phase] ?? ''}
          </p>

          {/* English phase name */}
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: RM.INK }}>
            {phase}
          </h2>

          {/* Decorative bottom line */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-16 h-px" style={{ background: RM.GOLD_LEAF }} />
            <div
              className="w-3 h-3 rotate-45"
              style={{ border: `1.5px solid ${RM.GOLD_LEAF}`, background: RM.VERMILLION }}
            />
            <div className="w-16 h-px" style={{ background: RM.GOLD_LEAF }} />
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export const RamayanaZoomDive = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapRef>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [routeDistanceKm, setRouteDistanceKm] = useState(0);
  const [showPhaseCard, setShowPhaseCard] = useState(false);
  const [activePhase, setActivePhase] = useState('');
  const prevPhaseRef = useRef('');
  const shownPhasesRef = useRef<Set<string>>(new Set());

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const stage = STAGES_GL[currentStage];

  // Scroll → stage index (discrete) + route distance (continuous)
  const stageRef = useRef(0);
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const stageCount = STAGES_GL.length;
      const idx = Math.min(stageCount - 1, Math.floor(v * stageCount));

      // Discrete stage change
      if (idx !== stageRef.current) {
        stageRef.current = idx;
        setCurrentStage(idx);
      }

      // Continuous route distance
      const s = STAGES_GL[idx];
      const nextS = STAGES_GL[Math.min(idx + 1, stageCount - 1)];
      const intraProgress = (v * stageCount) - idx; // 0..1 within current stage

      const currentDist =
        s.routeUpTo >= 0 ? ROUTE_CUMULATIVE_DISTANCES[s.routeUpTo] : 0;
      const nextDist =
        nextS.routeUpTo >= 0 ? ROUTE_CUMULATIVE_DISTANCES[nextS.routeUpTo] : currentDist;

      const dist = currentDist + (nextDist - currentDist) * intraProgress;
      setRouteDistanceKm(dist);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Phase transition detection — show once per phase, never again
  useEffect(() => {
    const phase = STAGES_GL[currentStage].phase;
    if (
      phase !== prevPhaseRef.current &&
      prevPhaseRef.current !== '' &&
      currentStage > 0 &&
      !shownPhasesRef.current.has(phase)
    ) {
      shownPhasesRef.current.add(phase);
      setActivePhase(phase);
      setShowPhaseCard(true);
      const timer = setTimeout(() => setShowPhaseCard(false), 2000);
      return () => clearTimeout(timer);
    }
    prevPhaseRef.current = phase;
  }, [currentStage]);

  // Camera flyTo on stage change
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const s = STAGES_GL[currentStage];

    if (currentStage === 0) {
      map.jumpTo({ center: s.center, zoom: s.zoom });
    } else {
      map.stop();
      map.flyTo({
        center: s.center,
        zoom: s.zoom,
        duration: 1200,
        essential: true,
      });
    }
  }, [currentStage]);

  // Visible route GeoJSON (sliced from full route based on scroll)
  const visibleRoute = useMemo(() => {
    if (routeDistanceKm <= 0.5) return null;
    const clampedDist = Math.min(routeDistanceKm, TOTAL_ROUTE_LENGTH_KM - 0.1);
    try {
      return lineSliceAlong(ROUTE_GEOJSON, 0, clampedDist, { units: 'kilometers' });
    } catch {
      return null;
    }
  }, [routeDistanceKm]);

  // Route head position (glowing dot at the tip)
  const routeHeadPos = useMemo(() => {
    if (routeDistanceKm <= 0.5) return null;
    const clampedDist = Math.min(routeDistanceKm, TOTAL_ROUTE_LENGTH_KM - 0.1);
    try {
      const pt = turfAlong(ROUTE_GEOJSON, clampedDist, { units: 'kilometers' });
      return pt.geometry.coordinates as [number, number];
    } catch {
      return null;
    }
  }, [routeDistanceKm]);

  // Accumulated markers
  const { inactiveMarkers, activeMarkers } = useMemo(() => {
    const inactive: { key: string; lng: number; lat: number }[] = [];
    const active: { key: string; lng: number; lat: number; label: string; detail?: string }[] = [];

    for (let i = 0; i <= currentStage; i++) {
      const s = STAGES_GL[i];
      for (const mk of s.markers) {
        const entry = {
          key: `${s.id}-${mk.label}`,
          lng: mk.coords[0],
          lat: mk.coords[1],
          label: mk.label,
          detail: mk.detail,
        };
        if (i === currentStage) {
          active.push(entry);
        } else {
          inactive.push(entry);
        }
      }
    }
    return { inactiveMarkers: inactive, activeMarkers: active };
  }, [currentStage]);

  const progressFraction = currentStage / (STAGES_GL.length - 1);
  const distanceSoFar = Math.round(progressFraction * TOTAL_DISTANCE_KM);

  // Prevent map from capturing scroll
  const onMapWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <div ref={sectionRef} className="relative" style={{ height: `${STAGES_GL.length * 100}vh`, background: RM.PARCHMENT }}>
      {/* Sticky split layout — single manuscript folio frame */}
      <div className="sticky top-0 h-screen w-full p-3">
        <div
          className="w-full h-full flex relative overflow-hidden"
          style={{
            border: `3px solid ${RM.GOLD_LEAF}`,
            boxShadow: `inset 0 0 0 5px ${RM.PARCHMENT}, inset 0 0 0 6.5px ${RM.VERMILLION}50, 0 4px 24px rgba(0,0,0,0.08)`,
            borderRadius: 3,
          }}
        >
        {/* Phase transition card overlay */}
        <PhaseCard phase={activePhase} visible={showPhaseCard} />
        {/* Left Panel — 40% — Manuscript Folio */}
        <div
          className="w-[40%] h-full flex flex-col relative overflow-hidden"
          style={{
            background: RM.PARCHMENT,
            borderRadius: '1px 0 0 1px',
          }}
        >
          {/* Paper grain texture overlay */}
          <div className="absolute inset-0 pointer-events-none z-30 ramayana-paper-grain" />

          <MiniatureBorder className="absolute inset-0 pointer-events-none"><span /></MiniatureBorder>

          {/* Phase + Stop counter */}
          <div className="px-10 pt-10 pb-2 relative z-20">
            <p
              className="text-[9px] tracking-[0.3em] uppercase font-body font-semibold"
              style={{ color: RM.VERMILLION, opacity: 0.7 }}
            >
              {stage.phase}
            </p>
            {currentStage > 0 && (
              <p className="text-[10px] mt-1" style={{ fontFamily: "'Tiro Devanagari', serif", color: RM.OCHRE, opacity: 0.6 }}>
                फलक {toDevanagari(currentStage)} / {toDevanagari(STAGES_GL.length - 1)}
              </p>
            )}
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-10 pb-10 scrollbar-hide relative z-20">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={stage.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {/* Title band — vermillion rubric */}
                <div className="relative mt-2 mb-4 -mx-2">
                  <div
                    className="px-4 py-2 inline-block"
                    style={{
                      background: `linear-gradient(135deg, ${RM.VERMILLION}, hsl(8, 70%, 42%))`,
                      boxShadow: `0 2px 12px hsla(8,78%,48%,0.25)`,
                    }}
                  >
                    <h3 className="font-display text-xl font-bold" style={{ color: RM.PARCHMENT }}>
                      {stage.narrative.title}
                    </h3>
                  </div>
                </div>
                {stage.year && (
                  <p className="text-[11px] font-body font-semibold tracking-wide mb-5" style={{ color: RM.GOLD_DIM }}>
                    {stage.year}
                  </p>
                )}

                {/* Image with painted border frame */}
                {stage.image && (
                  <div
                    className="w-full aspect-[16/10] mb-5 relative overflow-hidden"
                    style={{
                      border: `3px solid ${RM.GOLD_LEAF}`,
                      boxShadow: `inset 0 0 0 1px ${RM.VERMILLION}50, 0 4px 16px rgba(0,0,0,0.12)`,
                    }}
                  >
                    <img
                      src={stage.image.src}
                      alt={stage.image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <p
                      className="absolute bottom-0 left-0 right-0 px-3 py-2 text-[9px] font-body italic"
                      style={{
                        color: RM.INK,
                        background: 'linear-gradient(to top, hsla(38, 45%, 88%, 0.9), transparent)',
                      }}
                    >
                      {stage.image.caption}
                    </p>
                  </div>
                )}

                {/* Narrative body — dark ink on parchment */}
                <p className="font-body text-sm leading-[1.85] mb-4" style={{ color: RM.INK }}>
                  {stage.narrative.body}
                </p>

                {stage.narrative.accent && (
                  <p
                    className="font-body text-xs italic mb-6 pl-4"
                    style={{
                      color: RM.VERMILLION,
                      opacity: 0.8,
                      borderLeft: `2px solid ${RM.VERMILLION}50`,
                    }}
                  >
                    {stage.narrative.accent}
                  </p>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom progress — gold leaf bar */}
          <div className="px-10 py-3 flex items-center gap-3 relative z-20" style={{ borderTop: `1px solid ${RM.GOLD_LEAF}30` }}>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: `${RM.PARCHMENT_DK}` }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(to right, ${RM.VERMILLION}, ${RM.GOLD_LEAF})` }}
                animate={{ width: `${progressFraction * 100}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <span className="text-[10px] tracking-[0.12em] font-body font-semibold whitespace-nowrap" style={{ color: RM.BURNT_UMBER, opacity: 0.6 }}>
              {distanceSoFar} / {TOTAL_DISTANCE_KM} km
            </span>
          </div>
        </div>

        {/* Center divider — thin gold line */}
        <div className="w-px h-[85%] self-center flex-shrink-0" style={{ background: `${RM.GOLD_LEAF}40` }} />

        {/* Right Map — 60% */}
        <div className="flex-1 h-full relative overflow-hidden" style={{ borderRadius: '0 1px 1px 0' }}>
          {/* MapLibre GL map */}
          <div className="absolute inset-0 ramayana-map-warm" onWheel={onMapWheel}>
            <Map
              ref={mapRef}
              mapStyle={RAMAYANA_MAP_STYLE}
              initialViewState={{
                longitude: STAGES_GL[0].center[0],
                latitude: STAGES_GL[0].center[1],
                zoom: STAGES_GL[0].zoom,
              }}
              scrollZoom={false}
              doubleClickZoom={false}
              dragRotate={false}
              pitchWithRotate={false}
              touchZoomRotate={false}
              keyboard={false}
              attributionControl={false}
              style={{ width: '100%', height: '100%' }}
            >
              {/* Ghost route (stage 0) */}
              {currentStage === 0 && (
                <Source id="ghost-route" type="geojson" data={GHOST_ROUTE_GEOJSON}>
                  <Layer
                    id="ghost-line"
                    type="line"
                    paint={{
                      'line-color': RM.VERMILLION,
                      'line-width': 1.5,
                      'line-opacity': 0.15,
                      'line-dasharray': [2, 3],
                    }}
                    layout={{ 'line-cap': 'round', 'line-join': 'round' }}
                  />
                </Source>
              )}

              {/* Visible route — progressively revealed */}
              {visibleRoute && (
                <Source id="route" type="geojson" data={visibleRoute}>
                  <Layer
                    id="route-glow"
                    type="line"
                    paint={{
                      'line-color': RM.GOLD_LEAF,
                      'line-width': 7,
                      'line-opacity': 0.2,
                      'line-blur': 3,
                    }}
                    layout={{ 'line-cap': 'round', 'line-join': 'round' }}
                  />
                  <Layer
                    id="route-core"
                    type="line"
                    paint={{
                      'line-color': RM.VERMILLION,
                      'line-width': 3,
                      'line-opacity': 0.85,
                    }}
                    layout={{ 'line-cap': 'round', 'line-join': 'round' }}
                  />
                </Source>
              )}

              {/* Route head dot */}
              {routeHeadPos && (
                <Marker longitude={routeHeadPos[0]} latitude={routeHeadPos[1]} anchor="center">
                  <RouteHead />
                </Marker>
              )}

              {/* Inactive markers (past stages) */}
              {inactiveMarkers.map((mk) => (
                <Marker key={mk.key} longitude={mk.lng} latitude={mk.lat} anchor="center">
                  <InactiveDot />
                </Marker>
              ))}

              {/* Active markers (current stage) */}
              {activeMarkers.map((mk) => (
                <Marker key={mk.key} longitude={mk.lng} latitude={mk.lat} anchor="bottom">
                  <ActiveMarkerLabel label={mk.label} detail={mk.detail} />
                </Marker>
              ))}
            </Map>
          </div>

          {/* Soft parchment fade on all edges */}
          <div className="absolute inset-0 pointer-events-none z-10" style={{
            boxShadow: `inset 0 0 40px 15px ${RM.PARCHMENT}, inset 0 0 15px 5px ${RM.PARCHMENT}`,
          }} />

          {/* Paper grain overlay on map */}
          <div className="absolute inset-0 pointer-events-none z-10 ramayana-paper-grain" style={{ opacity: 0.4 }} />

          {/* Floating stats card — top-right */}
          {currentStage > 0 && (
            <div className="absolute top-5 right-5 z-20">
              <motion.div
                className="px-4 py-3 font-body"
                style={{
                  background: 'hsl(38, 40%, 95%)',
                  border: `1.5px solid ${RM.GOLD_LEAF}`,
                  borderRadius: 4,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                  minWidth: 140,
                }}
              >
                  <div className="flex items-baseline gap-1.5 mb-1.5">
                    <span className="text-lg font-display font-bold" style={{ color: RM.VERMILLION }}>{distanceSoFar.toLocaleString()}</span>
                    <span className="text-[9px] uppercase tracking-wider font-semibold" style={{ color: RM.BURNT_UMBER }}>km</span>
                  </div>
                  <div className="text-[10px] leading-relaxed font-medium" style={{ color: RM.INK }}>
                    {stage.year && <div>{stage.year} of exile</div>}
                    <div style={{ opacity: 0.7 }}>{stage.phase}</div>
                  </div>
              </motion.div>
            </div>
          )}

          {/* TODAY block — map overlay, below stats */}
          {stage.today && (
            <div className="absolute top-5 right-5 z-20" style={{ marginTop: currentStage > 0 ? 100 : 0 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`today-${stage.id}`}
                  className="font-body"
                  style={{
                    background: 'hsl(38, 40%, 95%)',
                    border: `1.5px solid ${RM.GOLD_LEAF}`,
                    borderRadius: 4,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
                    maxWidth: 220,
                    padding: '10px 12px',
                  }}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-[8px] tracking-[0.25em] uppercase font-semibold mb-1.5" style={{ color: RM.MALACHITE }}>
                    ☞ Today
                  </p>
                  <p className="font-display text-[12px] font-semibold mb-1" style={{ color: RM.INK }}>
                    {stage.today.name}
                  </p>
                  <p className="text-[10px] leading-relaxed mb-1.5" style={{ color: RM.BURNT_UMBER }}>
                    {stage.today.detail}
                  </p>
                  <p className="font-mono text-[9px]" style={{ color: RM.OCHRE }}>
                    {stage.today.coordinates}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Stage label — cartouche style */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
              <motion.div
                className="px-5 py-2.5"
                style={{
                  background: 'hsl(38, 40%, 95%)',
                  border: `2px solid ${RM.GOLD_LEAF}`,
                  boxShadow: `0 4px 20px rgba(0,0,0,0.15), inset 0 0 0 1px ${RM.VERMILLION}30`,
                  borderRadius: 4,
                }}
              >
                <p className="text-[11px] tracking-[0.18em] uppercase font-body font-bold text-center" style={{ color: RM.INK }}>
                  {stage.label}
                </p>
              </motion.div>
          </div>
        </div>
        </div>
      </div>

      {/* Invisible scroll step anchors */}
      <div className="absolute inset-0 pointer-events-none">
        {STAGES_GL.map((s) => (
          <div key={s.id} id={s.id} style={{ height: '100vh' }} />
        ))}
      </div>
    </div>
  );
};
