import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EMPIRE_STYLES, EMPIRE_TERRITORIES } from '@/components/visuals/mapData';

type StageId = 0 | 1 | 2 | 3;
type PointId =
  | 'macedon'
  | 'granicus'
  | 'issus'
  | 'gaugamela'
  | 'babylon'
  | 'susa'
  | 'persepolis'
  | 'memphis'
  | 'samarkand';

type PointKind = 'origin' | 'battle' | 'capital' | 'frontier';

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
  routes: Array<[PointId, PointId]>;
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

const STYLE_ID = 'alexander-campaign-map-styles';
const routeGlow = 'rgba(76, 156, 255, 0.2)';
const routeStroke = '#56A6FF';
const routeSecondary = '#7CC3FF';
const emberColor = '#F18247';

const points: Record<PointId, CampaignPoint> = {
  macedon: { id: 'macedon', label: 'Macedon', lat: 40.76, lng: 22.52, kind: 'origin' },
  granicus: { id: 'granicus', label: 'Granicus', lat: 40.36, lng: 27.33, kind: 'battle' },
  issus: { id: 'issus', label: 'Issus', lat: 36.82, lng: 36.18, kind: 'battle' },
  gaugamela: { id: 'gaugamela', label: 'Gaugamela', lat: 36.36, lng: 43.25, kind: 'battle' },
  babylon: { id: 'babylon', label: 'Babylon', lat: 32.54, lng: 44.42, kind: 'capital' },
  susa: { id: 'susa', label: 'Susa', lat: 32.19, lng: 48.26, kind: 'capital' },
  persepolis: { id: 'persepolis', label: 'Persepolis', lat: 29.93, lng: 52.89, kind: 'capital' },
  memphis: { id: 'memphis', label: 'Memphis', lat: 29.85, lng: 31.25, kind: 'capital' },
  samarkand: { id: 'samarkand', label: 'Samarkand', lat: 39.65, lng: 66.96, kind: 'frontier' },
};

const stageConfigs: Record<StageId, StageConfig> = {
  0: {
    center: [35.7, 39.5],
    zoom: 4,
    showEmpire: true,
    routes: [['macedon', 'granicus']],
    visiblePoints: ['macedon', 'granicus', 'persepolis'],
    labeledPoints: ['macedon', 'granicus', 'persepolis'],
    highlightedPoints: ['granicus'],
    overlay: {
      eyebrow: '334 BCE',
      title: 'A spear thrown at an empire',
      detail: 'He crosses from Macedon into Asia and strikes the Achaemenid west before anyone believes the empire can actually fall.',
      imageSrc: '/images/alexander-lebrun-detail.webp',
      imageAlt: 'Alexander the Great, detail from The Battle of Porus by Charles Le Brun',
      credit: 'Detail from The Battles of Alexander, Charles Le Brun, c. 1673 / Louvre, Paris.',
      bullets: ['40,000 men', 'Crossing at the Hellespont', 'The first shock comes at Granicus'],
    },
  },
  1: {
    center: [35.2, 40.8],
    zoom: 4,
    showEmpire: true,
    routes: [
      ['macedon', 'granicus'],
      ['granicus', 'issus'],
      ['issus', 'gaugamela'],
      ['gaugamela', 'babylon'],
      ['babylon', 'susa'],
    ],
    visiblePoints: ['macedon', 'granicus', 'issus', 'gaugamela', 'babylon', 'susa'],
    labeledPoints: ['granicus', 'issus', 'gaugamela', 'babylon', 'susa'],
    highlightedPoints: ['granicus', 'issus', 'gaugamela'],
    overlay: {
      eyebrow: '334-331 BCE',
      title: 'Granicus. Issus. Gaugamela.',
      detail: 'Three victories do what centuries of revolt never managed: they snap the imperial spine and open the royal capitals.',
      bullets: ['Babylon surrenders', 'Susa yields the treasury', 'The war stops looking reversible'],
    },
  },
  2: {
    center: [30.9, 51.8],
    zoom: 5.15,
    showEmpire: false,
    routes: [
      ['babylon', 'susa'],
      ['susa', 'persepolis'],
    ],
    visiblePoints: ['babylon', 'susa', 'persepolis'],
    labeledPoints: ['susa', 'persepolis'],
    highlightedPoints: ['persepolis'],
    overlay: {
      eyebrow: '330 BCE',
      title: 'Persepolis Burns',
      detail: 'Not the administrative capital, but the ceremonial heart of the dynasty. That is why burning Persepolis mattered: it told the empire that Achaemenid kingship itself had been broken.',
      imageSrc: '/images/persepolis-burns-simoni.jpg',
      imageAlt: 'The burning of Persepolis in a historical painting by G. Simoni',
      credit: 'The burning of Persepolis, painting by G. Simoni / Wikimedia Commons.',
      bullets: [
        'Built by Darius and Xerxes',
        'Treasury looted before the fire',
        'A symbolic execution of the dynasty',
      ],
      tags: ['Ceremonial capital', '330 BCE', 'Revenge for Athens?'],
    },
  },
  3: {
    center: [34.2, 49.4],
    zoom: 3.85,
    showEmpire: false,
    routes: [
      ['memphis', 'babylon'],
      ['babylon', 'susa'],
      ['susa', 'persepolis'],
      ['persepolis', 'samarkand'],
    ],
    visiblePoints: ['memphis', 'babylon', 'susa', 'persepolis', 'samarkand'],
    labeledPoints: ['memphis', 'babylon', 'samarkand'],
    highlightedPoints: ['babylon', 'samarkand'],
    overlay: {
      eyebrow: '323 BCE',
      title: 'He became what he conquered',
      detail: 'From Babylon he rules as more than a Macedonian king, adopting Persian court ritual, Persian marriage politics, and Persian imperial scale.',
      imageSrc: '/images/death-of-alexander-piloty.webp',
      imageAlt: 'The Death of Alexander the Great, painting by Karl von Piloty',
      credit: 'The Death of Alexander the Great, Karl von Piloty, 1886 / Neue Pinakothek, Munich.',
      bullets: [
        'Died in the palace of Nebuchadnezzar',
        'No named successor',
        'Empire split among his generals',
      ],
      tags: ['Persian dress', 'Roxana', 'Babylon at 32', 'Empire fractures on death'],
    },
  },
};

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .alexander-campaign-map.leaflet-container {
      background: hsl(220, 18%, 9%) !important;
    }
    .alexander-campaign-map .leaflet-control-container {
      display: none;
    }
    .alexander-point-label {
      background: rgba(7, 12, 20, 0.92) !important;
      border: 1px solid rgba(86, 166, 255, 0.24) !important;
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
    .alexander-point-label.capital {
      border-color: rgba(212, 168, 67, 0.28) !important;
      color: rgba(250, 236, 206, 0.92) !important;
    }
    .alexander-point-label::before {
      display: none !important;
    }
    .alexander-route-shadow {
      filter: drop-shadow(0 0 12px rgba(86, 166, 255, 0.2));
    }
  `;

  document.head.appendChild(style);
}

const deathColor = '#7858B4';

function buildSpotlightIcon(overlay: OverlayConfig) {
  const width = 196;
  const height = 228;
  const dotSize = 16;
  const haloSize = 44;
  const accentColor = routeStroke;

  return L.divIcon({
    className: '',
    html: `
      <div style="position:relative;width:${width}px;height:${height}px;display:flex;align-items:flex-end;justify-content:center;">
        <div style="position:absolute;left:50%;bottom:${dotSize + 12}px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;">
          <div style="
            padding:10px 14px 11px;
            border-radius:16px;
            background:linear-gradient(180deg, rgba(8,12,22,0.96), rgba(10,16,28,0.9));
            border:1px solid rgba(86,166,255,0.45);
            box-shadow:0 14px 40px rgba(0,0,0,0.45), 0 0 28px rgba(86,166,255,0.16);
            backdrop-filter:blur(12px);
            min-width:168px;
            white-space:normal;
          ">
            ${overlay.imageSrc ? `
              <div style="
                position:relative;
                width:100%;
                height:132px;
                overflow:hidden;
                border-radius:12px;
                margin-bottom:10px;
                border:1px solid rgba(86,166,255,0.18);
                box-shadow:0 10px 24px rgba(0,0,0,0.3);
              ">
                <img
                  src="${overlay.imageSrc}"
                  alt="${overlay.imageAlt || overlay.title}"
                  style="
                    display:block;
                    width:100%;
                    height:100%;
                    object-fit:cover;
                    object-position:center 20%;
                    filter:saturate(0.88) contrast(1.04);
                  "
                />
                <div style="
                  position:absolute;
                  inset:0;
                  background:linear-gradient(180deg, rgba(6,10,18,0.08), rgba(6,10,18,0.5));
                "></div>
              </div>
            ` : ''}
            <div style="
              font-family:'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif;
              font-size:10px;
              text-transform:uppercase;
              letter-spacing:0.22em;
              color:rgba(86,166,255,0.72);
              margin-bottom:5px;
            ">${overlay.eyebrow}</div>
            <div style="
              font-family:'Playfair Display', Georgia, serif;
              font-size:21px;
              font-weight:700;
              line-height:1.05;
              color:${accentColor};
              text-shadow:0 0 18px rgba(86,166,255,0.12);
            ">${overlay.title}</div>
          </div>
          <div style="
            width:1px;
            height:18px;
            background:linear-gradient(180deg, rgba(86,166,255,0.8), rgba(86,166,255,0));
            box-shadow:0 0 10px rgba(86,166,255,0.35);
          "></div>
        </div>
        <div style="
          position:absolute;
          left:50%;
          bottom:${(dotSize - haloSize) / 2}px;
          width:${haloSize}px;
          height:${haloSize}px;
          transform:translateX(-50%);
          border-radius:50%;
          background:rgba(86,166,255,0.3);
          opacity:0.3;
          animation: mapBeaconPulse 2.8s ease-out infinite;
        "></div>
        <div style="
          position:absolute;
          left:50%;
          bottom:0;
          width:${dotSize}px;
          height:${dotSize}px;
          transform:translateX(-50%);
          border-radius:50%;
          background:${accentColor};
          border:3px solid rgba(255,255,255,0.95);
          box-shadow:0 0 0 5px rgba(86,166,255,0.18), 0 8px 20px rgba(0,0,0,0.18);
        "></div>
      </div>
    `,
    iconSize: [width, height],
    iconAnchor: [width / 2, height],
  });
}

function buildMarkerIcon(kind: PointKind, highlighted: boolean, stageId: StageId, pointId: PointId) {
  const isPersepolisFire = stageId === 2 && pointId === 'persepolis';
  const isBabylonDeath = stageId === 3 && pointId === 'babylon';
  const baseSize = highlighted ? 14 : 10;
  const halo = highlighted ? 34 : 22;
  const fill =
    kind === 'battle'
      ? routeStroke
      : kind === 'capital'
        ? '#D4A843'
        : kind === 'frontier'
          ? routeSecondary
          : '#ffffff';
  const outer =
    kind === 'battle'
      ? 'rgba(86,166,255,0.22)'
      : kind === 'capital'
        ? 'rgba(212,168,67,0.22)'
        : 'rgba(255,255,255,0.12)';

  const specialBg = isPersepolisFire
    ? 'rgba(241,130,71,0.2)'
    : isBabylonDeath
      ? 'rgba(120,88,180,0.2)'
      : outer;
  const specialBorder = isPersepolisFire
    ? 'rgba(241,130,71,0.4)'
    : isBabylonDeath
      ? 'rgba(120,88,180,0.4)'
      : outer;
  const specialGlow = isPersepolisFire
    ? 'rgba(241,130,71,0.35)'
    : isBabylonDeath
      ? 'rgba(120,88,180,0.35)'
      : outer;
  const specialFill = isPersepolisFire
    ? emberColor
    : isBabylonDeath
      ? deathColor
      : fill;
  const specialRing = isPersepolisFire
    ? 'rgba(241,130,71,0.12)'
    : isBabylonDeath
      ? 'rgba(120,88,180,0.12)'
      : outer;

  return L.divIcon({
    className: '',
    html: `
      <div style="position:relative;width:${halo}px;height:${halo}px;display:flex;align-items:center;justify-content:center;">
        <div style="
          position:absolute;
          width:${halo}px;
          height:${halo}px;
          border-radius:9999px;
          background:${specialBg};
          border:1px solid ${specialBorder};
          box-shadow:${highlighted ? `0 0 36px ${specialGlow}` : 'none'};
        "></div>
        <div style="
          position:relative;
          width:${baseSize}px;
          height:${baseSize}px;
          border-radius:9999px;
          background:${specialFill};
          border:2px solid rgba(255,255,255,0.95);
          box-shadow:${highlighted ? `0 0 0 5px ${specialRing}` : '0 6px 16px rgba(0,0,0,0.2)'};
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
  const style = EMPIRE_STYLES.achaemenid;
  EMPIRE_TERRITORIES.achaemenid.forEach((coords) => {
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

export const AlexanderCampaignGraphic = ({ activeStep }: { activeStep: number }) => {
  const stageId = Math.min(activeStep, 3) as StageId;
  const stage = stageConfigs[stageId];

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const [persepolisPopout, setPersepolisPopout] = useState<PopoutState | null>(null);
  const [babylonPopout, setBabylonPopout] = useState<PopoutState | null>(null);

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
      minZoom: 3,
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
    if (stageId !== 2) setPersepolisPopout(null);
    if (stageId !== 3) setBabylonPopout(null);
    map.flyTo(stage.center, stage.zoom, { duration: 1.4, easeLinearity: 0.2 });

    if (stage.showEmpire && stageId > 1) {
      renderEmpireTerritory(layer);
    }

    stage.routes.forEach(([fromId, toId], index) => {
      const latLngs = [toLatLng(fromId), toLatLng(toId)];

      L.polyline(latLngs, {
        color: routeGlow,
        weight: 10,
        opacity: 0.75,
        lineCap: 'round',
        lineJoin: 'round',
        smoothFactor: 1.2,
      }).addTo(layer);

      L.polyline(latLngs, {
        color:
          stageId === 2 && toId === 'persepolis'
            ? emberColor
            : index >= stage.routes.length - 2
              ? routeStroke
              : routeSecondary,
        weight: 2.8,
        opacity: 0.98,
        dashArray: '12 8',
        lineCap: 'round',
        lineJoin: 'round',
        smoothFactor: 1.2,
        className: 'alexander-route-shadow',
      }).addTo(layer);
    });

    visiblePoints.forEach((point) => {
      const highlighted = stage.highlightedPoints.includes(point.id);
      const useSpotlight = stageId === 0 && point.id === 'macedon';

      const marker = L.marker([point.lat, point.lng], {
        icon: useSpotlight
          ? buildSpotlightIcon(stage.overlay)
          : buildMarkerIcon(point.kind, highlighted, stageId, point.id),
      }).addTo(layer);

      if (!useSpotlight && stage.labeledPoints.includes(point.id)) {
        marker.bindTooltip(point.label, {
          permanent: true,
          direction: point.kind === 'origin' ? 'left' : point.kind === 'frontier' ? 'right' : 'top',
          offset:
            point.kind === 'origin'
              ? L.point(-12, 0)
              : point.kind === 'frontier'
                ? L.point(12, 0)
                : L.point(0, -14),
          className: `alexander-point-label${point.kind === 'capital' ? ' capital' : ''}`,
        });
      }
    });

    if (stageId === 2 && containerRef.current) {
      const syncPopout = () => {
        if (!containerRef.current) return;

        const point = map.latLngToContainerPoint(toLatLng('persepolis'));
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

        setPersepolisPopout({
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

    if (stageId === 3 && containerRef.current) {
      const syncBabylonPopout = () => {
        if (!containerRef.current) return;

        const point = map.latLngToContainerPoint(toLatLng('babylon'));
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        const cardWidth = Math.min(320, Math.max(280, Math.round(width * 0.2)));
        const cardHeight = 580;
        const rightGutter = width >= 1600 ? 56 : width >= 1280 ? 44 : 32;
        const cardX = width - cardWidth - rightGutter;
        const cardY = Math.min(
          Math.max(point.y - cardHeight * 0.46, 28),
          height - cardHeight - 32,
        );

        setBabylonPopout({
          cardX,
          cardY,
          cardWidth,
          cardHeight,
          pointX: point.x,
          pointY: point.y,
        });
      };

      map.once('moveend', () => requestAnimationFrame(syncBabylonPopout));
      requestAnimationFrame(syncBabylonPopout);
    }
  }, [stage, stageId, visiblePoints]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_30%_30%,rgba(86,166,255,0.09),transparent_30%),linear-gradient(180deg,rgba(5,9,16,0.15),rgba(5,9,16,0.58))]">
      <div ref={containerRef} className="alexander-campaign-map absolute inset-0" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,18,0.8)_0%,rgba(7,11,18,0.34)_24%,rgba(7,11,18,0.08)_38%,rgba(7,11,18,0.08)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(86,166,255,0.08),transparent_22%)]" />

      {stageId === 2 && persepolisPopout ? (
        <AnimatePresence mode="wait">
          <motion.div
            key="persepolis-popout"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute z-[900] hidden md:block"
          style={{
              left: persepolisPopout.cardX,
              top: persepolisPopout.cardY,
              width: persepolisPopout.cardWidth,
            }}
          >
            <svg
              className="absolute inset-0 overflow-visible"
              style={{ width: '100%', height: `${persepolisPopout.cardHeight + 80}px` }}
              aria-hidden="true"
            >
              <line
                x1={8}
                y1={Math.min(
                  persepolisPopout.cardHeight - 84,
                  Math.max(98, persepolisPopout.pointY - persepolisPopout.cardY),
                )}
                x2={persepolisPopout.pointX - persepolisPopout.cardX}
                y2={persepolisPopout.pointY - persepolisPopout.cardY}
                stroke="rgba(241,130,71,0.78)"
                strokeWidth="1.6"
                strokeDasharray="6 6"
              />
            </svg>

            <div
              className="relative overflow-hidden rounded-[26px] border border-[rgba(241,130,71,0.28)] bg-[linear-gradient(180deg,rgba(9,13,21,0.97),rgba(12,17,27,0.92))] shadow-[0_28px_70px_rgba(0,0,0,0.42)]"
              style={{ minHeight: persepolisPopout.cardHeight }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(241,130,71,0.16),transparent_28%)]" />
              <div className="relative h-[280px] overflow-hidden border-b border-white/10 bg-[rgba(5,8,14,0.96)]">
                <img
                  src={stage.overlay.imageSrc}
                  alt={stage.overlay.imageAlt || stage.overlay.title}
                  className="h-full w-full object-contain object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,12,0.08),rgba(4,7,12,0.46))]" />
                <div className="absolute left-4 top-4 rounded-full border border-[rgba(241,130,71,0.38)] bg-[rgba(8,12,20,0.86)] px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-[rgba(248,170,128,0.88)]">
                  {stage.overlay.eyebrow}
                </div>
              </div>

              <div className="relative space-y-4 p-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[rgba(241,130,71,0.72)]">
                    Ceremonial capital
                  </p>
                  <h4 className="mt-2 font-display text-[30px] leading-none text-[rgba(255,208,186,0.96)]">
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
      ) : stageId === 3 && babylonPopout ? (
        <AnimatePresence mode="wait">
          <motion.div
            key="babylon-popout"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute z-[900] hidden md:block"
            style={{
              left: babylonPopout.cardX,
              top: babylonPopout.cardY,
              width: babylonPopout.cardWidth,
            }}
          >
            <svg
              className="absolute inset-0 overflow-visible"
              style={{ width: '100%', height: `${babylonPopout.cardHeight + 80}px` }}
              aria-hidden="true"
            >
              <line
                x1={8}
                y1={Math.min(
                  babylonPopout.cardHeight - 84,
                  Math.max(98, babylonPopout.pointY - babylonPopout.cardY),
                )}
                x2={babylonPopout.pointX - babylonPopout.cardX}
                y2={babylonPopout.pointY - babylonPopout.cardY}
                stroke="rgba(120,90,180,0.78)"
                strokeWidth="1.6"
                strokeDasharray="6 6"
              />
            </svg>

            <div
              className="relative overflow-hidden rounded-[26px] border border-[rgba(120,90,180,0.28)] bg-[linear-gradient(180deg,rgba(9,13,21,0.97),rgba(12,17,27,0.92))] shadow-[0_28px_70px_rgba(0,0,0,0.42)]"
              style={{ minHeight: babylonPopout.cardHeight }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,90,180,0.16),transparent_28%)]" />
              <div className="relative h-[280px] overflow-hidden border-b border-white/10 bg-[rgba(5,8,14,0.96)]">
                <img
                  src={stage.overlay.imageSrc}
                  alt={stage.overlay.imageAlt || stage.overlay.title}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,12,0.08),rgba(4,7,12,0.46))]" />
                <div className="absolute left-4 top-4 rounded-full border border-[rgba(120,90,180,0.38)] bg-[rgba(8,12,20,0.86)] px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-[rgba(190,170,220,0.88)]">
                  {stage.overlay.eyebrow}
                </div>
              </div>

              <div className="relative space-y-4 p-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[rgba(120,90,180,0.72)]">
                    Where the conqueror fell
                  </p>
                  <h4 className="mt-2 font-display text-[30px] leading-none text-[rgba(210,195,240,0.96)]">
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
      ) : stageId === 1 ? null : stageId !== 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={stageId}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute right-[6vw] top-[14vh] z-[900] hidden max-w-[320px] rounded-[24px] border border-[hsl(210,85%,60%,0.16)] bg-[linear-gradient(180deg,rgba(7,11,18,0.92),rgba(8,14,24,0.88))] p-5 text-left shadow-[0_24px_60px_rgba(0,0,0,0.35)] md:block"
          >
            <p className="text-[10px] uppercase tracking-[0.34em] text-[hsl(210,90%,70%,0.7)]">
              {stage.overlay.eyebrow}
            </p>
            <h4 className="mt-3 font-display text-2xl leading-tight text-[hsl(210,100%,73%)]">
              {stage.overlay.title}
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-foreground/62">
              {stage.overlay.detail}
            </p>

            {stage.overlay.imageSrc ? (
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#121923]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={stage.overlay.imageSrc}
                    alt={stage.overlay.imageAlt || stage.overlay.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ) : null}

            {stage.overlay.bullets ? (
              <div className="mt-4 space-y-2">
                {stage.overlay.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 text-xs tracking-[0.08em] text-foreground/66"
                  >
                    {bullet}
                  </div>
                ))}
              </div>
            ) : null}

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
      ) : null}
    </div>
  );
};
