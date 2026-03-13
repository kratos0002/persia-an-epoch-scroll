import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EMPIRE_STYLES, EMPIRE_TERRITORIES } from '@/components/visuals/mapData';

type StageId = 0 | 1 | 2;
type PointId =
  | 'nisa'
  | 'ecbatana'
  | 'merv'
  | 'ctesiphon'
  | 'babylon'
  | 'carrhae'
  | 'antioch'
  | 'samarkand'
  | 'susa'
  | 'changan'
  | 'pataliputra';

type PointKind = 'origin' | 'capital' | 'battle' | 'tradeHub' | 'distant';

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
  routes: Array<{ from: PointId; to: PointId; color: 'military' | 'trade' | 'tradeAlt'; label?: string }>;
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

const STYLE_ID = 'parthian-campaign-map-styles';
const crimson = '#DC2626';
const crimsonGlow = 'rgba(220,38,38,0.2)';
const gold = '#D4A843';
const goldGlow = 'rgba(212,168,67,0.2)';
const goldStroke = '#E8C564';
const goldSecondary = '#C8943A';

const points: Record<PointId, CampaignPoint> = {
  nisa: { id: 'nisa', label: 'Nisa', lat: 37.95, lng: 58.24, kind: 'origin' },
  ecbatana: { id: 'ecbatana', label: 'Ecbatana', lat: 34.80, lng: 48.52, kind: 'capital' },
  merv: { id: 'merv', label: 'Merv', lat: 37.66, lng: 62.19, kind: 'tradeHub' },
  ctesiphon: { id: 'ctesiphon', label: 'Ctesiphon', lat: 33.09, lng: 44.58, kind: 'capital' },
  babylon: { id: 'babylon', label: 'Babylon', lat: 32.54, lng: 44.42, kind: 'capital' },
  carrhae: { id: 'carrhae', label: 'Carrhae', lat: 36.87, lng: 39.03, kind: 'battle' },
  antioch: { id: 'antioch', label: 'Antioch', lat: 36.20, lng: 36.15, kind: 'distant' },
  samarkand: { id: 'samarkand', label: 'Samarkand', lat: 39.65, lng: 66.96, kind: 'tradeHub' },
  susa: { id: 'susa', label: 'Susa', lat: 32.19, lng: 48.26, kind: 'capital' },
  changan: { id: 'changan', label: "Chang'an", lat: 34.26, lng: 108.94, kind: 'distant' },
  pataliputra: { id: 'pataliputra', label: 'Pataliputra', lat: 25.61, lng: 85.14, kind: 'distant' },
};

const stageConfigs: Record<StageId, StageConfig> = {
  0: {
    center: [35, 52],
    zoom: 4.2,
    showEmpire: true,
    routes: [
      { from: 'nisa', to: 'ecbatana', color: 'military' },
      { from: 'ecbatana', to: 'ctesiphon', color: 'military' },
    ],
    visiblePoints: ['nisa', 'ecbatana', 'ctesiphon'],
    labeledPoints: ['nisa', 'ecbatana', 'ctesiphon'],
    highlightedPoints: ['nisa'],
    overlay: {
      eyebrow: '247 BCE',
      title: 'Horse warriors from the northeast',
      detail: 'The Parni tribe — nomadic horse archers from the steppes near Nisa — revolted against the Seleucid Greeks and swept southwest, seizing Ecbatana and then Ctesiphon.',
      imageSrc: '/images/parthian-horse-archer.png',
      imageAlt: 'Parthian horse archer performing the famous "Parthian shot" — firing backwards while retreating',
      credit: 'Parthian horse archer illustration.',
      bullets: [
        'Parni tribe from Khorasan',
        'Revolt against Seleucid Greeks',
        'Founded the Arsacid dynasty',
      ],
    },
  },
  1: {
    center: [35.5, 40.5],
    zoom: 4.8,
    showEmpire: true,
    routes: [
      { from: 'antioch', to: 'carrhae', color: 'military' },
    ],
    visiblePoints: ['antioch', 'carrhae', 'ctesiphon', 'ecbatana'],
    labeledPoints: ['antioch', 'carrhae', 'ctesiphon'],
    highlightedPoints: ['carrhae'],
    overlay: {
      eyebrow: '53 BCE',
      title: "Rome's Nemesis",
      detail: 'Seven Roman legions annihilated. 20,000 dead. 10,000 captured. The golden eagles of Rome carried east in triumph.',
      imageSrc: '/images/battle-of-carrhae.jpg',
      imageAlt: 'Parthian cataphracts overwhelming Roman legions at the Battle of Carrhae, 53 BCE',
      credit: 'Battle of Carrhae, illustration by C. Barratt.',
      bullets: [
        'Crassus killed',
        'Roman eagles captured',
        'Euphrates becomes the frontier',
      ],
    },
  },
  2: {
    center: [36, 58],
    zoom: 3.6,
    showEmpire: false,
    routes: [
      { from: 'changan', to: 'samarkand', color: 'trade' },
      { from: 'samarkand', to: 'merv', color: 'trade' },
      { from: 'merv', to: 'ctesiphon', color: 'trade' },
      { from: 'ctesiphon', to: 'antioch', color: 'trade' },
    ],
    visiblePoints: ['changan', 'samarkand', 'merv', 'ctesiphon', 'antioch'],
    labeledPoints: ['changan', 'merv', 'ctesiphon', 'antioch'],
    highlightedPoints: ['ctesiphon', 'merv'],
    overlay: {
      eyebrow: 'The Silk Road',
      title: 'Wealth through commerce',
      detail: 'Chinese silk. Indian spices. Roman gold. All passed through Parthian merchants. The empire grew fabulously wealthy — not through conquest, but commerce.',
      tags: ['Middleman empire', 'East meets West', 'Trade over tribute'],
    },
  },
};

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .parthian-campaign-map.leaflet-container {
      background: hsl(220, 18%, 9%) !important;
    }
    .parthian-campaign-map .leaflet-control-container {
      display: none;
    }
    .parthian-point-label {
      background: rgba(7, 12, 20, 0.92) !important;
      border: 1px solid rgba(220, 38, 38, 0.24) !important;
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
    .parthian-point-label.capital {
      border-color: rgba(220, 38, 38, 0.28) !important;
      color: rgba(255, 210, 210, 0.92) !important;
    }
    .parthian-point-label.trade-hub {
      border-color: rgba(212, 168, 67, 0.28) !important;
      color: rgba(250, 236, 206, 0.92) !important;
    }
    .parthian-point-label.distant {
      border-color: rgba(255, 255, 255, 0.16) !important;
      color: rgba(255, 255, 255, 0.7) !important;
    }
    .parthian-point-label::before {
      display: none !important;
    }
    .parthian-route-label {
      background: transparent !important;
      border: none !important;
      color: rgba(232, 197, 100, 0.6) !important;
      font-size: 10px !important;
      font-weight: 600 !important;
      letter-spacing: 0.18em !important;
      text-transform: uppercase !important;
      white-space: nowrap !important;
      text-shadow: 0 2px 8px rgba(0,0,0,0.6) !important;
    }
    .parthian-route-label::before {
      display: none !important;
    }
    .parthian-route-label.military {
      color: rgba(220, 38, 38, 0.6) !important;
    }
  `;

  document.head.appendChild(style);
}

function buildMarkerIcon(kind: PointKind, highlighted: boolean, stageId: StageId, pointId: PointId) {
  const isCarrhae = stageId === 1 && pointId === 'carrhae';
  const isTradeStage = stageId === 2;
  const baseSize = highlighted ? 14 : 10;
  const halo = highlighted ? 34 : 22;

  let fill: string;
  let outer: string;

  if (isCarrhae) {
    fill = crimson;
    outer = crimsonGlow;
  } else if (kind === 'origin') {
    fill = '#ffffff';
    outer = 'rgba(220,38,38,0.28)';
  } else if (isTradeStage && (kind === 'tradeHub' || kind === 'distant')) {
    fill = gold;
    outer = goldGlow;
  } else if (kind === 'battle') {
    fill = crimson;
    outer = crimsonGlow;
  } else if (kind === 'capital') {
    fill = '#DC2626';
    outer = 'rgba(220,38,38,0.22)';
  } else if (kind === 'tradeHub') {
    fill = gold;
    outer = goldGlow;
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
          border:1px solid ${outer.replace('0.2', '0.4')};
          box-shadow:${highlighted ? `0 0 36px ${outer.replace('0.2', '0.35')}` : 'none'};
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

function renderEmpireTerritory(layer: L.LayerGroup) {
  const style = EMPIRE_STYLES.parthian;
  EMPIRE_TERRITORIES.parthian.forEach((coords) => {
    const latLngs = coords.map(([lat, lng]) => L.latLng(lat, lng));

    L.polygon(latLngs, {
      color: style.color,
      weight: 1,
      opacity: 0.28,
      fillColor: style.fillColor,
      fillOpacity: 0.09,
      dashArray: '8 6',
      smoothFactor: 2,
    }).addTo(layer);
  });
}

export const ParthianCampaignGraphic = ({ activeStep }: { activeStep: number }) => {
  const stageId = Math.min(activeStep, 2) as StageId;
  const stage = stageConfigs[stageId];

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const [nisaPopout, setNisaPopout] = useState<PopoutState | null>(null);
  const [carrhaePopout, setCarrhaePopout] = useState<PopoutState | null>(null);

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
    if (stageId !== 0) setNisaPopout(null);
    if (stageId !== 1) setCarrhaePopout(null);
    map.flyTo(stage.center, stage.zoom, { duration: 1.4, easeLinearity: 0.2 });

    if (stage.showEmpire) {
      renderEmpireTerritory(layer);
    }

    // Draw routes
    stage.routes.forEach((route) => {
      const latLngs = [toLatLng(route.from), toLatLng(route.to)];
      const isMilitary = route.color === 'military';
      const isAlt = route.color === 'tradeAlt';

      // Glow layer
      L.polyline(latLngs, {
        color: isMilitary ? crimsonGlow : goldGlow,
        weight: 8,
        opacity: 0.5,
        lineCap: 'round',
        lineJoin: 'round',
        smoothFactor: 1.2,
      }).addTo(layer);

      // Stroke layer
      L.polyline(latLngs, {
        color: isMilitary ? crimson : goldStroke,
        weight: 2,
        opacity: 0.85,
        dashArray: isMilitary ? '6 10' : '14 10',
        lineCap: 'round',
        lineJoin: 'round',
        smoothFactor: 1.2,
      }).addTo(layer);

    });

    // Draw city markers
    visiblePoints.forEach((point) => {
      const highlighted = stage.highlightedPoints.includes(point.id);
      const marker = L.marker([point.lat, point.lng], {
        icon: buildMarkerIcon(point.kind, highlighted, stageId, point.id),
      }).addTo(layer);

      if (stage.labeledPoints.includes(point.id)) {
        const dir =
          point.id === 'nisa' ? 'right'
            : point.id === 'antioch' || point.id === 'pataliputra' || point.id === 'changan'
              ? point.lng < 40 ? 'left' : 'right'
              : 'top';
        const offset =
          dir === 'left' ? L.point(-12, 0) : dir === 'right' ? L.point(12, 0) : L.point(0, -14);

        const kindClass =
          point.kind === 'capital'
            ? ' capital'
            : point.kind === 'tradeHub'
              ? ' trade-hub'
              : point.kind === 'distant'
                ? ' distant'
                : '';

        marker.bindTooltip(point.label, {
          permanent: true,
          direction: dir,
          offset,
          className: `parthian-point-label${kindClass}`,
        });
      }
    });

    // Nisa popout positioning
    if (stageId === 0 && containerRef.current) {
      const syncNisaPopout = () => {
        if (!containerRef.current) return;

        const point = map.latLngToContainerPoint(toLatLng('nisa'));
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

        setNisaPopout({
          cardX,
          cardY,
          cardWidth,
          cardHeight,
          pointX: point.x,
          pointY: point.y,
        });
      };

      map.once('moveend', () => requestAnimationFrame(syncNisaPopout));
      requestAnimationFrame(syncNisaPopout);
    }

    // Carrhae popout positioning
    if (stageId === 1 && containerRef.current) {
      const syncPopout = () => {
        if (!containerRef.current) return;

        const point = map.latLngToContainerPoint(toLatLng('carrhae'));
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

        setCarrhaePopout({
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
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_30%_30%,rgba(220,38,38,0.06),transparent_30%),radial-gradient(circle_at_78%_22%,rgba(212,168,67,0.05),transparent_25%),linear-gradient(180deg,rgba(5,9,16,0.15),rgba(5,9,16,0.58))]">
      <div ref={containerRef} className="parthian-campaign-map absolute inset-0" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,18,0.8)_0%,rgba(7,11,18,0.34)_24%,rgba(7,11,18,0.08)_38%,rgba(7,11,18,0.08)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(220,38,38,0.06),transparent_22%),radial-gradient(circle_at_73%_78%,rgba(212,168,67,0.06),transparent_24%)]" />

      {stageId === 0 && nisaPopout ? (
        <AnimatePresence mode="wait">
          <motion.div
            key="nisa-popout"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute z-[900] hidden md:block"
            style={{
              left: nisaPopout.cardX,
              top: nisaPopout.cardY,
              width: nisaPopout.cardWidth,
            }}
          >
            <svg
              className="absolute inset-0 overflow-visible"
              style={{ width: '100%', height: `${nisaPopout.cardHeight + 80}px` }}
              aria-hidden="true"
            >
              <line
                x1={8}
                y1={Math.min(
                  nisaPopout.cardHeight - 84,
                  Math.max(98, nisaPopout.pointY - nisaPopout.cardY),
                )}
                x2={nisaPopout.pointX - nisaPopout.cardX}
                y2={nisaPopout.pointY - nisaPopout.cardY}
                stroke="rgba(220,38,38,0.78)"
                strokeWidth="1.6"
                strokeDasharray="6 6"
              />
            </svg>

            <div
              className="relative overflow-hidden rounded-[26px] border border-[rgba(220,38,38,0.28)] bg-[linear-gradient(180deg,rgba(9,13,21,0.97),rgba(12,17,27,0.92))] shadow-[0_28px_70px_rgba(0,0,0,0.42)]"
              style={{ minHeight: nisaPopout.cardHeight }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.16),transparent_28%)]" />
              <div className="relative h-[280px] overflow-hidden border-b border-white/10 bg-[rgba(5,8,14,0.96)]">
                <img
                  src={stage.overlay.imageSrc}
                  alt={stage.overlay.imageAlt || stage.overlay.title}
                  className="h-full w-full object-contain object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,12,0.08),rgba(4,7,12,0.46))]" />
                <div className="absolute left-4 top-4 rounded-full border border-[rgba(220,38,38,0.38)] bg-[rgba(8,12,20,0.86)] px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-[rgba(255,160,160,0.88)]">
                  {stage.overlay.eyebrow}
                </div>
              </div>

              <div className="relative space-y-4 p-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[rgba(220,38,38,0.72)]">
                    Origin of the Arsacids
                  </p>
                  <h4 className="mt-2 font-display text-[30px] leading-none text-[rgba(255,210,210,0.96)]">
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
      ) : stageId === 1 && carrhaePopout ? (
        <AnimatePresence mode="wait">
          <motion.div
            key="carrhae-popout"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute z-[900] hidden md:block"
            style={{
              left: carrhaePopout.cardX,
              top: carrhaePopout.cardY,
              width: carrhaePopout.cardWidth,
            }}
          >
            <svg
              className="absolute inset-0 overflow-visible"
              style={{ width: '100%', height: `${carrhaePopout.cardHeight + 80}px` }}
              aria-hidden="true"
            >
              <line
                x1={8}
                y1={Math.min(
                  carrhaePopout.cardHeight - 84,
                  Math.max(98, carrhaePopout.pointY - carrhaePopout.cardY),
                )}
                x2={carrhaePopout.pointX - carrhaePopout.cardX}
                y2={carrhaePopout.pointY - carrhaePopout.cardY}
                stroke="rgba(220,38,38,0.78)"
                strokeWidth="1.6"
                strokeDasharray="6 6"
              />
            </svg>

            <div
              className="relative overflow-hidden rounded-[26px] border border-[rgba(220,38,38,0.28)] bg-[linear-gradient(180deg,rgba(9,13,21,0.97),rgba(12,17,27,0.92))] shadow-[0_28px_70px_rgba(0,0,0,0.42)]"
              style={{ minHeight: carrhaePopout.cardHeight }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.16),transparent_28%)]" />
              <div className="relative h-[280px] overflow-hidden border-b border-white/10 bg-[rgba(5,8,14,0.96)]">
                <img
                  src={stage.overlay.imageSrc}
                  alt={stage.overlay.imageAlt || stage.overlay.title}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,12,0.08),rgba(4,7,12,0.46))]" />
                <div className="absolute left-4 top-4 rounded-full border border-[rgba(220,38,38,0.38)] bg-[rgba(8,12,20,0.86)] px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-[rgba(255,160,160,0.88)]">
                  {stage.overlay.eyebrow}
                </div>
              </div>

              <div className="relative space-y-4 p-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[rgba(220,38,38,0.72)]">
                    Battle of Carrhae
                  </p>
                  <h4 className="mt-2 font-display text-[30px] leading-none text-[rgba(255,210,210,0.96)]">
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
            className="pointer-events-none absolute right-[6vw] top-[14vh] z-[900] hidden max-w-[320px] rounded-[24px] border border-[hsl(350,60%,45%,0.16)] bg-[linear-gradient(180deg,rgba(7,11,18,0.92),rgba(8,14,24,0.88))] p-5 text-left shadow-[0_24px_60px_rgba(0,0,0,0.35)] md:block"
          >
            <p className="text-[10px] uppercase tracking-[0.34em] text-[hsl(350,60%,55%,0.7)]">
              {stage.overlay.eyebrow}
            </p>
            <h4 className="mt-3 font-display text-2xl leading-tight text-[hsl(350,60%,65%)]">
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
