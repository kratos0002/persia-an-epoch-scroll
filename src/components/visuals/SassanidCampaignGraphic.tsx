import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EMPIRE_STYLES, EMPIRE_TERRITORIES } from '@/components/visuals/mapData';

type StageId = 0 | 1 | 2;
type PointId =
  | 'ctesiphon'
  | 'edessa'
  | 'naqsherostam'
  | 'gundeshapur'
  | 'isfahan'
  | 'constantinople'
  | 'antioch';

type PointKind = 'capital' | 'battle' | 'cultural' | 'distant';

interface CampaignPoint {
  id: PointId;
  label: string;
  lat: number;
  lng: number;
  kind: PointKind;
}

interface OverlayConfig {
  eyebrow: string;
  title: string;
  detail: string;
  imageSrc?: string;
  imageAlt?: string;
  credit?: string;
  bullets?: string[];
  tags?: string[];
}

interface StageConfig {
  center: [number, number];
  zoom: number;
  showEmpire: boolean;
  empireOpacity: number;
  routes: Array<{ from: PointId; to: PointId; color: 'military' | 'conflict' }>;
  visiblePoints: PointId[];
  labeledPoints: PointId[];
  highlightedPoints: PointId[];
  overlay: OverlayConfig;
}

interface PopoutState {
  cardX: number;
  cardY: number;
  cardWidth: number;
  cardHeight: number;
  pointX: number;
  pointY: number;
}

const STYLE_ID = 'sassanid-campaign-map-styles';
const crimson = '#C53030';
const crimsonGlow = 'rgba(197,48,48,0.2)';
const warmGold = '#D4A843';
const warmGoldGlow = 'rgba(212,168,67,0.2)';
const ashGray = 'rgba(160,160,160,0.6)';

const points: Record<PointId, CampaignPoint> = {
  ctesiphon: { id: 'ctesiphon', label: 'Ctesiphon', lat: 33.09, lng: 44.58, kind: 'capital' },
  edessa: { id: 'edessa', label: 'Edessa', lat: 37.15, lng: 38.79, kind: 'battle' },
  naqsherostam: { id: 'naqsherostam', label: 'Naqsh-e Rostam', lat: 29.98, lng: 52.87, kind: 'cultural' },
  gundeshapur: { id: 'gundeshapur', label: 'Gundeshapur', lat: 32.29, lng: 48.52, kind: 'cultural' },
  isfahan: { id: 'isfahan', label: 'Isfahan', lat: 32.65, lng: 51.67, kind: 'cultural' },
  constantinople: { id: 'constantinople', label: 'Constantinople', lat: 41.01, lng: 28.98, kind: 'distant' },
  antioch: { id: 'antioch', label: 'Antioch', lat: 36.20, lng: 36.15, kind: 'distant' },
};

const stageConfigs: Record<StageId, StageConfig> = {
  0: {
    center: [33, 46],
    zoom: 4.5,
    showEmpire: true,
    empireOpacity: 0.09,
    routes: [
      { from: 'ctesiphon', to: 'edessa', color: 'military' },
    ],
    visiblePoints: ['ctesiphon', 'edessa', 'naqsherostam'],
    labeledPoints: ['ctesiphon', 'edessa'],
    highlightedPoints: ['edessa', 'naqsherostam'],
    overlay: {
      eyebrow: '260 CE',
      title: 'The only Roman emperor ever taken prisoner',
      detail: 'At Edessa, Shapur I did what no one had done before — he captured Emperor Valerian alive. Then he carved the moment into a cliff face at Naqsh-e Rostam, so the world would never forget.',
      imageSrc: '/images/shapur-triumph.jpg',
      imageAlt: 'Rock relief of Shapur I triumphing over Roman Emperor Valerian at Naqsh-e Rostam',
      credit: 'Shapur\'s triumph over Valerian, Naqsh-e Rostam / Wikimedia Commons.',
      bullets: [
        'Emperor Valerian captured alive',
        'Carved into rock at Naqsh-e Rostam',
        'Rome humiliated for a generation',
      ],
    },
  },
  1: {
    center: [32.5, 49],
    zoom: 4.8,
    showEmpire: true,
    empireOpacity: 0.12,
    routes: [],
    visiblePoints: ['ctesiphon', 'gundeshapur', 'isfahan', 'naqsherostam'],
    labeledPoints: ['ctesiphon', 'gundeshapur', 'isfahan'],
    highlightedPoints: ['ctesiphon', 'gundeshapur', 'isfahan'],
    overlay: {
      eyebrow: '224–531 CE',
      title: 'Four centuries of splendor',
      detail: 'Under 30 kings, the Sassanids built what Rome could not — a civilization that fused Greek learning, Indian medicine, and Persian art into something entirely new.',
      tags: [
        '427 years',
        '30+ kings',
        'Rome to China trade',
      ],
    },
  },
  2: {
    center: [36, 38],
    zoom: 4.2,
    showEmpire: true,
    empireOpacity: 0.04,
    routes: [
      { from: 'constantinople', to: 'antioch', color: 'conflict' },
      { from: 'antioch', to: 'ctesiphon', color: 'conflict' },
    ],
    visiblePoints: ['constantinople', 'antioch', 'ctesiphon'],
    labeledPoints: ['constantinople', 'ctesiphon'],
    highlightedPoints: ['constantinople', 'ctesiphon'],
    overlay: {
      eyebrow: '602–628 CE',
      title: 'The last war',
      detail: 'Khosrow II invaded Byzantium and nearly won — reaching the walls of Constantinople. The counterattack shattered both empires beyond recovery.',
      tags: ['Siege of Constantinople', 'Heraclius counterattack', 'Both empires broken'],
    },
  },
};

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .sassanid-campaign-map.leaflet-container {
      background: hsl(220, 18%, 9%) !important;
    }
    .sassanid-campaign-map .leaflet-control-container {
      display: none;
    }
    .sassanid-point-label {
      background: rgba(7, 12, 20, 0.92) !important;
      border: 1px solid rgba(197, 48, 48, 0.24) !important;
      color: rgba(235, 244, 255, 0.94) !important;
      border-radius: 999px !important;
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22) !important;
      padding: 6px 10px !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      letter-spacing: 0.14em !important;
      text-transform: uppercase !important;
      backdrop-filter: blur(10px) !important;
    }
    .sassanid-point-label.capital {
      border-color: rgba(197, 48, 48, 0.28) !important;
      color: rgba(255, 210, 210, 0.92) !important;
    }
    .sassanid-point-label.cultural {
      border-color: rgba(212, 168, 67, 0.28) !important;
      color: rgba(250, 236, 206, 0.92) !important;
    }
    .sassanid-point-label.distant {
      border-color: rgba(255, 255, 255, 0.16) !important;
      color: rgba(255, 255, 255, 0.7) !important;
    }
    .sassanid-point-label::before {
      display: none !important;
    }
  `;

  document.head.appendChild(style);
}

function buildMarkerIcon(kind: PointKind, highlighted: boolean, stageId: StageId) {
  const isExhaustion = stageId === 2;
  const baseSize = highlighted ? 14 : 10;
  const halo = highlighted ? 34 : 22;

  let fill: string;
  let outer: string;

  if (isExhaustion && kind === 'distant') {
    fill = ashGray;
    outer = 'rgba(160,160,160,0.15)';
  } else if (kind === 'battle') {
    fill = crimson;
    outer = crimsonGlow;
  } else if (kind === 'capital') {
    fill = crimson;
    outer = crimsonGlow;
  } else if (kind === 'cultural') {
    fill = warmGold;
    outer = warmGoldGlow;
  } else {
    fill = '#ffffff';
    outer = 'rgba(255,255,255,0.12)';
  }

  return L.divIcon({
    className: '',
    html: `
      <div style="position:relative;width:${halo}px;height:${halo}px;display:flex;align-items:center;justify-content:center;">
        <div style="
          position:absolute;
          width:${halo}px;
          height:${halo}px;
          border-radius:9999px;
          background:${outer};
          border:1px solid ${outer.replace('0.2', '0.4').replace('0.15', '0.3').replace('0.12', '0.24')};
          box-shadow:${highlighted ? `0 0 36px ${outer}` : 'none'};
        "></div>
        <div style="
          position:relative;
          width:${baseSize}px;
          height:${baseSize}px;
          border-radius:9999px;
          background:${fill};
          border:2px solid rgba(255,255,255,0.95);
          box-shadow:${highlighted ? `0 0 0 5px ${outer}` : '0 6px 16px rgba(0,0,0,0.2)'};
        "></div>
      </div>
    `,
    iconSize: [halo, halo],
    iconAnchor: [halo / 2, halo / 2],
  });
}

function toLatLng(pointId: PointId) {
  const point = points[pointId];
  return L.latLng(point.lat, point.lng);
}

function renderEmpireTerritory(layer: L.LayerGroup, opacity: number) {
  const style = EMPIRE_STYLES.sassanid;
  EMPIRE_TERRITORIES.sassanid.forEach((coords) => {
    const latLngs = coords.map(([lat, lng]) => L.latLng(lat, lng));

    L.polygon(latLngs, {
      color: style.color,
      weight: 1,
      opacity: opacity * 3,
      fillColor: style.fillColor,
      fillOpacity: opacity,
      dashArray: '8 6',
      smoothFactor: 2,
    }).addTo(layer);
  });
}

export const SassanidCampaignGraphic = ({ activeStep }: { activeStep: number }) => {
  const stageId = Math.min(activeStep, 2) as StageId;
  const stage = stageConfigs[stageId];

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const [shapurPopout, setShapurPopout] = useState<PopoutState | null>(null);

  const visiblePoints = useMemo(() => stage.visiblePoints.map((id) => points[id]), [stage]);

  useEffect(() => {
    ensureStyles();
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: stage.center,
      zoom: stage.zoom,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: false,
      keyboard: false,
      boxZoom: false,
      
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 10,
      minZoom: 2,
    }).addTo(map);

    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();
    if (stageId !== 0) setShapurPopout(null);
    map.flyTo(stage.center, stage.zoom, { duration: 1.4, easeLinearity: 0.2 });

    if (stage.showEmpire) {
      renderEmpireTerritory(layer, stage.empireOpacity);
    }

    // Draw routes
    stage.routes.forEach((route) => {
      const latLngs = [toLatLng(route.from), toLatLng(route.to)];
      const isConflict = route.color === 'conflict';

      L.polyline(latLngs, {
        color: isConflict ? 'rgba(160,160,160,0.15)' : crimsonGlow,
        weight: 8,
        opacity: 0.5,
        lineCap: 'round',
        lineJoin: 'round',
        smoothFactor: 1.2,
      }).addTo(layer);

      L.polyline(latLngs, {
        color: isConflict ? ashGray : crimson,
        weight: 2,
        opacity: isConflict ? 0.5 : 0.85,
        dashArray: isConflict ? '4 12' : '6 10',
        lineCap: 'round',
        lineJoin: 'round',
        smoothFactor: 1.2,
      }).addTo(layer);
    });

    // Draw city markers
    visiblePoints.forEach((point) => {
      const highlighted = stage.highlightedPoints.includes(point.id);
      const marker = L.marker([point.lat, point.lng], {
        icon: buildMarkerIcon(point.kind, highlighted, stageId),
      }).addTo(layer);

      if (stage.labeledPoints.includes(point.id)) {
        const dir =
          point.id === 'constantinople' ? 'left'
            : point.id === 'naqsherostam' ? 'right'
              : 'top';
        const offset =
          dir === 'left' ? L.point(-12, 0) : dir === 'right' ? L.point(12, 0) : L.point(0, -14);

        const kindClass =
          point.kind === 'capital'
            ? ' capital'
            : point.kind === 'cultural'
              ? ' cultural'
              : point.kind === 'distant'
                ? ' distant'
                : '';

        marker.bindTooltip(point.label, {
          permanent: true,
          direction: dir,
          offset,
          className: `sassanid-point-label${kindClass}`,
        });
      }
    });

    // Shapur popout positioning
    if (stageId === 0 && containerRef.current) {
      const syncPopout = () => {
        if (!containerRef.current) return;

        const point = map.latLngToContainerPoint(toLatLng('naqsherostam'));
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        const cardWidth = Math.min(344, Math.max(304, Math.round(width * 0.22)));
        const cardHeight = 532;
        const rightGutter = width >= 1600 ? 136 : width >= 1280 ? 124 : 104;
        const cardX = Math.min(
          width - cardWidth - rightGutter,
          Math.max(point.x + 54, width * 0.58),
        );
        const cardY = Math.min(
          Math.max(point.y - cardHeight * 0.46, 28),
          height - cardHeight - 32,
        );

        setShapurPopout({
          cardX,
          cardY,
          cardWidth,
          cardHeight,
          pointX: point.x,
          pointY: point.y,
        });
      };

      map.once('moveend', () => requestAnimationFrame(syncPopout));
      requestAnimationFrame(syncPopout);
    }
  }, [stage, stageId, visiblePoints]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_30%_30%,rgba(197,48,48,0.06),transparent_30%),radial-gradient(circle_at_78%_22%,rgba(212,168,67,0.05),transparent_25%),linear-gradient(180deg,rgba(5,9,16,0.15),rgba(5,9,16,0.58))]">
      <div ref={containerRef} className="sassanid-campaign-map absolute inset-0" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,18,0.8)_0%,rgba(7,11,18,0.34)_24%,rgba(7,11,18,0.08)_38%,rgba(7,11,18,0.08)_100%)]" />

      {stageId === 0 && shapurPopout ? (
        <AnimatePresence mode="wait">
          <motion.div
            key="shapur-popout"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute z-[900] hidden md:block"
            style={{
              left: shapurPopout.cardX,
              top: shapurPopout.cardY,
              width: shapurPopout.cardWidth,
            }}
          >
            <svg
              className="absolute inset-0 overflow-visible"
              style={{ width: '100%', height: `${shapurPopout.cardHeight + 80}px` }}
              aria-hidden="true"
            >
              <line
                x1={8}
                y1={Math.min(
                  shapurPopout.cardHeight - 84,
                  Math.max(98, shapurPopout.pointY - shapurPopout.cardY),
                )}
                x2={shapurPopout.pointX - shapurPopout.cardX}
                y2={shapurPopout.pointY - shapurPopout.cardY}
                stroke="rgba(197,48,48,0.78)"
                strokeWidth="1.6"
                strokeDasharray="6 6"
              />
            </svg>

            <div
              className="relative overflow-hidden rounded-[26px] border border-[rgba(197,48,48,0.28)] bg-[linear-gradient(180deg,rgba(9,13,21,0.97),rgba(12,17,27,0.92))] shadow-[0_28px_70px_rgba(0,0,0,0.42)]"
              style={{ minHeight: shapurPopout.cardHeight }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,48,48,0.16),transparent_28%)]" />
              <div className="relative h-[280px] overflow-hidden border-b border-white/10 bg-[rgba(5,8,14,0.96)]">
                <img
                  src={stage.overlay.imageSrc}
                  alt={stage.overlay.imageAlt || stage.overlay.title}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,12,0.08),rgba(4,7,12,0.46))]" />
                <div className="absolute left-4 top-4 rounded-full border border-[rgba(197,48,48,0.38)] bg-[rgba(8,12,20,0.86)] px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-[rgba(255,160,160,0.88)]">
                  {stage.overlay.eyebrow}
                </div>
              </div>

              <div className="relative space-y-4 p-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[rgba(197,48,48,0.72)]">
                    Naqsh-e Rostam
                  </p>
                  <h4 className="mt-2 font-display text-[28px] leading-none text-[rgba(255,210,210,0.96)]">
                    {stage.overlay.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/68">
                    {stage.overlay.detail}
                  </p>
                </div>

                {stage.overlay.bullets ? (
                  <div className="grid gap-2">
                    {stage.overlay.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2 text-xs leading-relaxed text-foreground/66"
                      >
                        {bullet}
                      </div>
                    ))}
                  </div>
                ) : null}

                {stage.overlay.credit ? (
                  <p className="text-[11px] leading-relaxed text-foreground/38">
                    {stage.overlay.credit}
                  </p>
                ) : null}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={stageId}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`pointer-events-none absolute right-[6vw] top-[14vh] z-[900] hidden max-w-[320px] rounded-[24px] border p-5 text-left shadow-[0_24px_60px_rgba(0,0,0,0.35)] md:block ${
              stageId === 2
                ? 'border-[rgba(160,160,160,0.12)] bg-[linear-gradient(180deg,rgba(7,11,18,0.92),rgba(8,14,24,0.88))]'
                : 'border-[hsl(350,55%,40%,0.16)] bg-[linear-gradient(180deg,rgba(7,11,18,0.92),rgba(8,14,24,0.88))]'
            }`}
          >
            <p className={`text-[10px] uppercase tracking-[0.34em] ${
              stageId === 2 ? 'text-[rgba(160,160,160,0.6)]' : stageId === 1 ? 'text-[rgba(212,168,67,0.7)]' : 'text-[hsl(350,55%,55%,0.7)]'
            }`}>
              {stage.overlay.eyebrow}
            </p>
            <h4 className={`mt-3 font-display text-2xl leading-tight ${
              stageId === 2 ? 'text-[rgba(200,200,200,0.8)]' : stageId === 1 ? 'text-[rgba(232,197,100,0.9)]' : 'text-[hsl(350,55%,65%)]'
            }`}>
              {stage.overlay.title}
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-foreground/62">
              {stage.overlay.detail}
            </p>

            {stage.overlay.tags ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {stage.overlay.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-foreground/66"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
