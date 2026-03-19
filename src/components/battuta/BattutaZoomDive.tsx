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
import { RihlaQuote } from '@/components/battuta/RihlaQuote';

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

  const stage = STAGES_GL[currentStage];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Scroll → stage index + continuous route distance
  useEffect(() => {
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
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Phase transition detection
  useEffect(() => {
    const phase = STAGES_GL[currentStage].phase;
    if (phase !== prevPhaseRef.current && prevPhaseRef.current !== '' && currentStage > 0 && !shownPhasesRef.current.has(phase)) {
      shownPhasesRef.current.add(phase);
      setActivePhase(phase);
      setShowPhaseCard(true);
      const timer = setTimeout(() => setShowPhaseCard(false), 2200);
      return () => clearTimeout(timer);
    }
    prevPhaseRef.current = phase;
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
    <div ref={sectionRef} className="relative" style={{ height: `${STAGES_GL.length * 100}vh`, background: IB.PARCHMENT }}>
      <div className="sticky top-0 h-screen w-full p-3">
        <div className="w-full h-full flex relative overflow-hidden"
          style={{
            border: `3px solid ${IB.SAFFRON}`,
            boxShadow: `inset 0 0 0 5px ${IB.PARCHMENT}, inset 0 0 0 6.5px ${IB.LEATHER}50, 0 4px 24px rgba(0,0,0,0.08)`,
            borderRadius: 3,
          }}>

          <PhaseCard phase={activePhase} visible={showPhaseCard} />

          {/* Left Panel — 40% — Narrative */}
          <div className="w-[40%] h-full flex flex-col relative overflow-hidden" style={{ background: IB.PARCHMENT, borderRadius: '1px 0 0 1px' }}>
            <div className="px-10 pt-10 pb-2 relative z-20">
              <p className="text-[9px] tracking-[0.3em] uppercase font-body font-semibold"
                style={{ color: phaseColor, opacity: 0.8 }}>
                {stage.phase}
              </p>
              <p className="text-[10px] mt-1 font-mono" style={{ color: IB.INK_LIGHT, opacity: 0.5 }}>
                {stage.date}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-10 pb-10 scrollbar-hide relative z-20">
              <AnimatePresence mode="popLayout">
                <motion.div key={stage.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                  <div className="relative mt-2 mb-4 -mx-2">
                    <div className="px-4 py-2 inline-block" style={{ background: `linear-gradient(135deg, ${IB.LEATHER}, ${IB.LEATHER_MID})`, boxShadow: `0 2px 12px hsla(25, 45%, 22%, 0.25)` }}>
                      <h3 className="font-display text-xl font-bold" style={{ color: IB.PARCHMENT }}>{stage.narrative.title}</h3>
                    </div>
                  </div>
                  <p className="font-body text-sm leading-[1.85] mb-4" style={{ color: IB.INK }}>{stage.narrative.body}</p>
                  {stage.narrative.accent && (
                    <p className="font-body text-xs italic mb-6 pl-4" style={{ color: IB.SAFFRON_DIM, opacity: 0.9, borderLeft: `2px solid ${IB.SAFFRON}50` }}>
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
                {/* Ghost route at overview */}
                {currentStage === 0 && (
                  <Source id="ghost-route" type="geojson" data={GHOST_ROUTE_GEOJSON}>
                    <Layer id="ghost-line" type="line" paint={{ 'line-color': IB.SAFFRON, 'line-width': 1.5, 'line-opacity': 0.15, 'line-dasharray': [2, 3] }}
                      layout={{ 'line-cap': 'round', 'line-join': 'round' }} />
                  </Source>
                )}

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

            {/* Sepia overlay */}
            <div className="absolute inset-0 pointer-events-none mix-blend-multiply" style={{ background: 'hsla(38, 35%, 88%, 0.08)' }} />

            {/* Parchment edge fade */}
            <div className="absolute inset-0 pointer-events-none z-10" style={{ boxShadow: `inset 0 0 40px 15px ${IB.PARCHMENT}, inset 0 0 15px 5px ${IB.PARCHMENT}` }} />

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
