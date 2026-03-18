import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { useScroll } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { STAGES, ALL_COORDS, IB, PHASE_ARABIC } from '@/components/visuals/battutaMapData';
import { CompassRose } from '@/components/battuta/CompassRose';
import { RihlaQuote } from '@/components/battuta/RihlaQuote';

const TILE_URL = 'https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png';

const PHASE_COLORS: Record<number, string> = {
  0: IB.SAFFRON,
  1: IB.LAPIS,
  2: IB.HENNA,
  3: IB.EMERALD,
  4: IB.MONSOON,
  5: 'hsl(0, 0%, 40%)',
  6: IB.SAND,
};

/* ── Phase transition overlay ── */
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
        <motion.div className="absolute inset-0" style={{ background: `${IB.PARCHMENT}ee` }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
        <motion.div className="relative text-center"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
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
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<L.LayerGroup>(L.layerGroup());
  const [currentStage, setCurrentStage] = useState(0);
  const [showPhaseCard, setShowPhaseCard] = useState(false);
  const [activePhase, setActivePhase] = useState('');
  const prevPhaseRef = useRef('');
  const shownPhasesRef = useRef<Set<string>>(new Set());
  const stageRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const stage = STAGES[currentStage];

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    const map = L.map(mapContainerRef.current, {
      center: [STAGES[0].center[0], STAGES[0].center[1]],
      zoom: STAGES[0].zoom,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: true,
      doubleClickZoom: false,
      worldCopyJump: true,
    });
    L.tileLayer(TILE_URL, { maxZoom: 10, className: 'battuta-map-tiles' }).addTo(map);
    layersRef.current.addTo(map);
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  // Scroll → stage index
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const count = STAGES.length;
      const idx = Math.min(count - 1, Math.floor(v * count));
      if (idx !== stageRef.current) {
        stageRef.current = idx;
        setCurrentStage(idx);
      }
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Phase transition detection
  useEffect(() => {
    const phase = STAGES[currentStage].phase;
    if (
      phase !== prevPhaseRef.current &&
      prevPhaseRef.current !== '' &&
      currentStage > 0 &&
      !shownPhasesRef.current.has(phase)
    ) {
      shownPhasesRef.current.add(phase);
      setActivePhase(phase);
      setShowPhaseCard(true);
      const timer = setTimeout(() => setShowPhaseCard(false), 2200);
      return () => clearTimeout(timer);
    }
    prevPhaseRef.current = phase;
  }, [currentStage]);

  // Camera flyTo + draw layers on stage change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const s = STAGES[currentStage];
    const layers = layersRef.current;
    layers.clearLayers();

    // Camera
    if (currentStage === 0) {
      map.setView([s.center[0], s.center[1]], s.zoom);
    } else {
      map.flyTo([s.center[0], s.center[1]], s.zoom, { duration: 1.2 });
    }

    // Draw route up to current stage
    if (s.routeUpTo >= 0) {
      const coords = ALL_COORDS.slice(0, s.routeUpTo + 1);

      // Group coords by phase for coloring
      let coordIdx = 0;
      const phaseBreaks = [9, 15, 20, 26, 32, 39, 46]; // indices where phases change
      let prevPhaseIdx = 0;

      for (let pi = 0; pi < phaseBreaks.length && coordIdx <= s.routeUpTo; pi++) {
        const end = Math.min(phaseBreaks[pi], s.routeUpTo + 1);
        const start = pi === 0 ? 0 : phaseBreaks[pi - 1];
        if (start >= end) continue;

        const segment = ALL_COORDS.slice(start, end).map(c => L.latLng(c[0], c[1]));
        if (segment.length < 2) continue;

        const isCurrentPhase = pi === s.phaseIndex;
        const color = PHASE_COLORS[pi] || IB.INK_LIGHT;

        const polyline = L.polyline(segment, {
          color: isCurrentPhase ? color : IB.INK_LIGHT,
          weight: isCurrentPhase ? 3.5 : 1.5,
          opacity: isCurrentPhase ? 0.85 : 0.3,
          dashArray: isCurrentPhase ? undefined : '4 6',
          smoothFactor: 1.5,
        });
        layers.addLayer(polyline);
      }

      // Inactive markers (all past stops)
      for (let i = 0; i < currentStage; i++) {
        const ps = STAGES[i];
        for (const mk of ps.markers) {
          const marker = L.circleMarker([mk.coords[1], mk.coords[0]], {
            radius: 3,
            fillColor: IB.INK_LIGHT,
            fillOpacity: 0.3,
            color: 'transparent',
            weight: 0,
          });
          layers.addLayer(marker);
        }
      }

      // Active markers
      for (const mk of s.markers) {
        // Glow
        const glow = L.circleMarker([mk.coords[1], mk.coords[0]], {
          radius: 12,
          fillColor: PHASE_COLORS[s.phaseIndex] || IB.SAFFRON,
          fillOpacity: 0.15,
          color: 'transparent',
          weight: 0,
        });
        layers.addLayer(glow);

        // Dot
        const dot = L.circleMarker([mk.coords[1], mk.coords[0]], {
          radius: 6,
          fillColor: PHASE_COLORS[s.phaseIndex] || IB.SAFFRON,
          fillOpacity: 0.9,
          color: IB.SAFFRON,
          weight: 2,
        });
        dot.bindTooltip(
          `<strong>${mk.label}</strong>${mk.detail ? `<br/><span style="font-size:10px;opacity:0.7">${mk.detail}</span>` : ''}`,
          { permanent: true, direction: 'top', offset: [0, -10], className: 'battuta-tooltip' }
        );
        layers.addLayer(dot);
      }

      // Route head — glowing dot at the tip
      const headCoord = ALL_COORDS[s.routeUpTo];
      const routeHead = L.circleMarker([headCoord[0], headCoord[1]], {
        radius: 5,
        fillColor: PHASE_COLORS[s.phaseIndex] || IB.SAFFRON,
        fillOpacity: 1,
        color: IB.SAFFRON,
        weight: 2,
        className: 'battuta-route-head',
      });
      layers.addLayer(routeHead);
    } else {
      // Overview: show Tangier marker only
      const tangier = L.circleMarker([35.759, -5.833], {
        radius: 6,
        fillColor: IB.SAFFRON,
        fillOpacity: 0.8,
        color: IB.SAFFRON,
        weight: 2,
      });
      tangier.bindTooltip('Tangier, 1325', {
        permanent: true,
        direction: 'right',
        className: 'battuta-tooltip',
        offset: [8, 0],
      });
      layers.addLayer(tangier);
    }
  }, [currentStage]);

  const progressFraction = currentStage / (STAGES.length - 1);
  const distanceSoFar = Math.round(progressFraction * 117000);

  const onMapWheel = useCallback((e: React.WheelEvent) => { e.stopPropagation(); }, []);

  return (
    <div ref={sectionRef} className="relative" style={{ height: `${STAGES.length * 100}vh`, background: IB.PARCHMENT }}>
      {/* Sticky split layout */}
      <div className="sticky top-0 h-screen w-full p-3">
        <div
          className="w-full h-full flex relative overflow-hidden"
          style={{
            border: `3px solid ${IB.SAFFRON}`,
            boxShadow: `inset 0 0 0 5px ${IB.PARCHMENT}, inset 0 0 0 6.5px ${IB.LEATHER}50, 0 4px 24px rgba(0,0,0,0.08)`,
            borderRadius: 3,
          }}
        >
          {/* Phase transition overlay */}
          <PhaseCard phase={activePhase} visible={showPhaseCard} />

          {/* Left Panel — 40% — Narrative */}
          <div
            className="w-[40%] h-full flex flex-col relative overflow-hidden"
            style={{ background: IB.PARCHMENT, borderRadius: '1px 0 0 1px' }}
          >
            {/* Phase label */}
            <div className="px-10 pt-10 pb-2 relative z-20">
              <p className="text-[9px] tracking-[0.3em] uppercase font-body font-semibold"
                style={{ color: PHASE_COLORS[stage.phaseIndex] || IB.SAFFRON, opacity: 0.8 }}>
                {stage.phase}
              </p>
              <p className="text-[10px] mt-1 font-mono" style={{ color: IB.INK_LIGHT, opacity: 0.5 }}>
                {stage.date}
              </p>
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
                  {/* Title */}
                  <div className="relative mt-2 mb-4 -mx-2">
                    <div className="px-4 py-2 inline-block"
                      style={{
                        background: `linear-gradient(135deg, ${IB.LEATHER}, ${IB.LEATHER_MID})`,
                        boxShadow: `0 2px 12px hsla(25, 45%, 22%, 0.25)`,
                      }}>
                      <h3 className="font-display text-xl font-bold" style={{ color: IB.PARCHMENT }}>
                        {stage.narrative.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <p className="font-body text-sm leading-[1.85] mb-4" style={{ color: IB.INK }}>
                    {stage.narrative.body}
                  </p>

                  {/* Accent */}
                  {stage.narrative.accent && (
                    <p className="font-body text-xs italic mb-6 pl-4"
                      style={{
                        color: IB.SAFFRON_DIM,
                        opacity: 0.9,
                        borderLeft: `2px solid ${IB.SAFFRON}50`,
                      }}>
                      {stage.narrative.accent}
                    </p>
                  )}

                  {/* Quote */}
                  {stage.narrative.quote && (
                    <RihlaQuote
                      text={stage.narrative.quote.text}
                      attribution={stage.narrative.quote.attribution}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom progress bar */}
            <div className="px-10 py-3 flex items-center gap-3 relative z-20" style={{ borderTop: `1px solid ${IB.SAFFRON}30` }}>
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: IB.PARCHMENT_DK }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(to right, ${IB.LEATHER}, ${IB.SAFFRON})` }}
                  animate={{ width: `${progressFraction * 100}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <span className="text-[10px] tracking-[0.12em] font-body font-semibold whitespace-nowrap" style={{ color: IB.INK_LIGHT, opacity: 0.6 }}>
                {distanceSoFar.toLocaleString()} / 117,000 km
              </span>
            </div>
          </div>

          {/* Center divider */}
          <div className="w-px h-[85%] self-center flex-shrink-0" style={{ background: `${IB.SAFFRON}40` }} />

          {/* Right Map — 60% */}
          <div className="flex-1 h-full relative overflow-hidden" style={{ borderRadius: '0 1px 1px 0' }}>
            <div className="absolute inset-0" onWheel={onMapWheel}>
              <div ref={mapContainerRef} className="w-full h-full" />
            </div>

            {/* Sepia overlay */}
            <div className="absolute inset-0 pointer-events-none mix-blend-multiply"
              style={{ background: 'hsla(38, 35%, 88%, 0.12)' }} />

            {/* Parchment edge fade */}
            <div className="absolute inset-0 pointer-events-none z-10" style={{
              boxShadow: `inset 0 0 40px 15px ${IB.PARCHMENT}, inset 0 0 15px 5px ${IB.PARCHMENT}`,
            }} />

            {/* Floating stats card */}
            {currentStage > 0 && (
              <div className="absolute top-5 right-5 z-20">
                <motion.div className="px-4 py-3 font-body"
                  style={{
                    background: 'hsla(38, 35%, 95%, 0.95)',
                    border: `1.5px solid ${IB.SAFFRON}`,
                    borderRadius: 4,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                    minWidth: 140,
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

            {/* Stage label — cartouche */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
              <motion.div className="px-5 py-2.5"
                style={{
                  background: 'hsla(38, 35%, 95%, 0.95)',
                  border: `2px solid ${IB.SAFFRON}`,
                  boxShadow: `0 4px 20px rgba(0,0,0,0.15), inset 0 0 0 1px ${IB.LEATHER}30`,
                  borderRadius: 4,
                }}>
                <p className="text-[11px] tracking-[0.18em] uppercase font-body font-bold text-center" style={{ color: IB.INK }}>
                  {stage.label}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Invisible scroll step anchors */}
      <div className="absolute inset-0 pointer-events-none">
        {STAGES.map((s) => (
          <div key={s.id} id={s.id} style={{ height: '100vh' }} />
        ))}
      </div>

      <style>{`
        .battuta-map-tiles {
          filter: sepia(0.25) saturate(0.8) brightness(1.05);
        }
        .battuta-tooltip {
          background: ${IB.PARCHMENT} !important;
          border: 1px solid ${IB.SAFFRON}80 !important;
          color: ${IB.INK} !important;
          font-family: 'Cormorant Garamond', Georgia, serif !important;
          font-size: 12px !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
          padding: 6px 10px !important;
        }
        .battuta-tooltip::before {
          border-top-color: ${IB.SAFFRON}80 !important;
        }
        .battuta-route-head {
          animation: battuta-pulse 2s ease-in-out infinite;
        }
        @keyframes battuta-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};
