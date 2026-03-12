import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type BattleId = 'marathon' | 'thermopylae' | 'salamis' | 'plataea';

interface BattleData {
  id: BattleId;
  name: string;
  year: string;
  result: string;
  summary: string;
  forces: string;
  terrain: string;
  turningPoint: string;
  aftermath: string;
  imageSrc: string;
  imageAlt: string;
  imageCaption: string;
  lat: number;
  lng: number;
  tooltipDirection: 'top' | 'right' | 'bottom' | 'left';
  tooltipOffset?: [number, number];
}

const sardis = {
  name: 'Sardis',
  lat: 38.48,
  lng: 28.04,
};

const theaterBounds = L.latLngBounds(
  L.latLng(36.75, 22.2),
  L.latLng(39.35, 29.2),
);

const battles: BattleData[] = [
  {
    id: 'marathon',
    name: 'Marathon',
    year: '490 BCE',
    result: 'Greek victory',
    summary:
      'A Persian landing on the Marathon plain was met by an Athenian charge before the expedition could turn into a siege of the city itself.',
    forces: 'About 20–25k Persians against roughly 10k Athenians and Plataeans.',
    terrain: 'A broad coastal plain that rewarded speed and punished hesitation.',
    turningPoint:
      'The Greek wings held and then folded inward, catching the Persian center in a double envelopment.',
    aftermath:
      'Marathon became a Greek legend, but it did not end the conflict. The empire regrouped and returned under Xerxes with a much larger campaign.',
    imageSrc: '/images/battles/marathon-map.png',
    imageAlt: 'Battle diagram of Marathon',
    imageCaption: 'Battle diagram via Wikimedia Commons.',
    lat: 38.15,
    lng: 23.97,
    tooltipDirection: 'right',
    tooltipOffset: [12, 0],
  },
  {
    id: 'thermopylae',
    name: 'Thermopylae',
    year: '480 BCE',
    result: 'Persian victory',
    summary:
      'At the Hot Gates, a narrow pass let a small Greek coalition delay Xerxes for days and turn a tactical defeat into enduring memory.',
    forces: 'Ancient numbers vary wildly; the pass compressed a very large Persian army against a much smaller Greek defense.',
    terrain: 'A mountain pass where numbers mattered less than frontage and discipline.',
    turningPoint:
      'Persian forces used the Anopaea path to outflank the defenders and make the pass untenable.',
    aftermath:
      'The road south opened, yet Thermopylae entered Western memory as the purest image of heroic resistance rather than as the Persian victory it was.',
    imageSrc: '/images/battles/thermopylae-map.jpg',
    imageAlt: 'Historical map of Thermopylae',
    imageCaption: 'Historical map of the pass at Thermopylae via Wikimedia Commons.',
    lat: 38.80,
    lng: 22.53,
    tooltipDirection: 'top',
    tooltipOffset: [0, -10],
  },
  {
    id: 'salamis',
    name: 'Salamis',
    year: '480 BCE',
    result: 'Greek victory',
    summary:
      'The war turned at sea. In the straits off Salamis, Persian numbers became a liability as the fleet lost room to deploy.',
    forces: 'Roughly 600–800 Persian ships against about 370 Greek triremes.',
    terrain: 'Tight water between island and mainland, perfect for funneling the larger fleet.',
    turningPoint:
      'Once the Persian vanguard jammed the channel, Greek ramming tactics worked ship by ship instead of line by line.',
    aftermath:
      'Salamis broke the momentum of the invasion. Xerxes withdrew much of the fleet, and the campaign ceased to look unstoppable.',
    imageSrc: '/images/battles/salamis-map.png',
    imageAlt: 'Battle diagram of Salamis',
    imageCaption: 'Battle diagram via Wikimedia Commons.',
    lat: 37.95,
    lng: 23.48,
    tooltipDirection: 'left',
    tooltipOffset: [-12, 18],
  },
  {
    id: 'plataea',
    name: 'Plataea',
    year: '479 BCE',
    result: 'Greek victory',
    summary:
      'The decisive land battle came the year after Salamis, when allied Greek hoplites destroyed the main Persian field army in Boeotia.',
    forces: 'A major Persian army under Mardonius faced a large Greek coalition assembled from across the mainland.',
    terrain: 'Broken plain and foothill country where cohesion and timing mattered more than spectacle.',
    turningPoint:
      'As Greek formations re-formed under pressure, Persian command cohesion faltered and Mardonius was killed in the fighting.',
    aftermath:
      'Plataea, paired with Mycale, ended the invasion phase of the wars and shifted the balance back into the Aegean.',
    imageSrc: '/images/battles/plataea-map.png',
    imageAlt: 'Topographic map of Plataea',
    imageCaption: 'Topographic map of Plataea via Wikimedia Commons.',
    lat: 38.21,
    lng: 23.27,
    tooltipDirection: 'left',
    tooltipOffset: [-14, -6],
  },
];

const BATTLE_MAP_STYLE_ID = 'persian-wars-theater-map-styles';

function ensureBattleMapStyles() {
  if (document.getElementById(BATTLE_MAP_STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = BATTLE_MAP_STYLE_ID;
  style.textContent = `
    .battle-theater-map.leaflet-container {
      background: #f4f0e4 !important;
      font-family: 'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif !important;
    }
    .battle-theater-map .leaflet-control-container {
      display: none;
    }
    .leaflet-tooltip.battle-marker-tooltip {
      background: rgba(9, 17, 27, 0.9) !important;
      border: 1px solid rgba(12, 18, 30, 0.18) !important;
      color: rgba(241, 244, 249, 0.96) !important;
      border-radius: 999px !important;
      box-shadow: 0 12px 28px rgba(0,0,0,0.15) !important;
      padding: 7px 12px !important;
      font-size: 11px !important;
      letter-spacing: 0.18em !important;
      text-transform: uppercase !important;
      font-weight: 700 !important;
      backdrop-filter: blur(10px) !important;
    }
    .leaflet-tooltip.battle-marker-tooltip.active {
      color: rgba(212,168,67,0.98) !important;
      border-color: rgba(212,168,67,0.46) !important;
      box-shadow: 0 16px 36px rgba(0,0,0,0.2), 0 0 0 1px rgba(212,168,67,0.12) inset !important;
    }
    .leaflet-tooltip.battle-marker-tooltip::before {
      display: none !important;
    }
    .leaflet-tooltip.sardis-tooltip {
      background: rgba(255, 255, 255, 0.94) !important;
      border: 1px solid rgba(12, 18, 30, 0.12) !important;
      color: rgba(11, 19, 32, 0.82) !important;
      border-radius: 999px !important;
      box-shadow: 0 12px 24px rgba(0,0,0,0.08) !important;
      padding: 7px 12px !important;
      font-size: 10px !important;
      letter-spacing: 0.22em !important;
      text-transform: uppercase !important;
      font-weight: 700 !important;
    }
    .leaflet-tooltip.sardis-tooltip::before {
      display: none !important;
    }
    .leaflet-tooltip.theater-sea-label {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      color: rgba(73, 119, 177, 0.72) !important;
      padding: 0 !important;
      font-size: 22px !important;
      line-height: 1 !important;
      font-style: italic !important;
      letter-spacing: 0.18em !important;
      text-transform: uppercase !important;
      font-family: 'Playfair Display', Georgia, serif !important;
    }
    .leaflet-tooltip.theater-sea-label::before {
      display: none !important;
    }
    .leaflet-tooltip.reference-city-label {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      color: rgba(11, 19, 32, 0.5) !important;
      padding: 0 !important;
      font-size: 11px !important;
      letter-spacing: 0.14em !important;
      text-transform: uppercase !important;
      font-weight: 700 !important;
    }
    .leaflet-tooltip.reference-city-label::before {
      display: none !important;
    }
  `;

  document.head.appendChild(style);
}

function buildBattleMarkerIcon(isActive: boolean) {
  const size = isActive ? 18 : 15;
  const halo = isActive ? 38 : 28;

  return L.divIcon({
    className: '',
    html: `
      <div style="position:relative;width:${halo}px;height:${halo}px;display:flex;align-items:center;justify-content:center;">
        <div style="
          position:absolute;
          width:${halo}px;
          height:${halo}px;
          border-radius:9999px;
          background:${isActive ? 'rgba(212,168,67,0.18)' : 'rgba(9,17,27,0.12)'};
          border:1px solid ${isActive ? 'rgba(212,168,67,0.35)' : 'rgba(9,17,27,0.12)'};
        "></div>
        <div style="
          position:relative;
          width:${size}px;
          height:${size}px;
          border-radius:9999px;
          background:${isActive ? '#D4A843' : '#0B1320'};
          border:3px solid rgba(255,255,255,0.96);
          box-shadow:${isActive ? '0 0 0 5px rgba(212,168,67,0.18), 0 8px 20px rgba(0,0,0,0.18)' : '0 8px 16px rgba(0,0,0,0.12)'};
        "></div>
      </div>
    `,
    iconSize: [halo, halo],
    iconAnchor: [halo / 2, halo / 2],
  });
}

function buildSardisIcon() {
  return L.divIcon({
    className: '',
    html: `
      <div style="position:relative;width:22px;height:22px;display:flex;align-items:center;justify-content:center;">
        <div style="
          width:12px;
          height:12px;
          border-radius:9999px;
          background:#ffffff;
          border:3px solid #0B1320;
          box-shadow:0 8px 16px rgba(0,0,0,0.14);
        "></div>
      </div>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

function buildReferenceLabel(text: string, color?: string) {
  return L.divIcon({
    className: '',
    html: `<div style="${color ? `color:${color};` : ''}">${text}</div>`,
    iconSize: [0, 0],
  });
}

const BattleTheaterMap = ({
  activeBattleId,
  onSelectBattle,
  className,
}: {
  activeBattleId: BattleId;
  onSelectBattle: (battleId: BattleId) => void;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);

  const activeBattle = useMemo(
    () => battles.find((battle) => battle.id === activeBattleId) ?? battles[0],
    [activeBattleId],
  );

  useEffect(() => {
    ensureBattleMapStyles();
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: true,
      keyboard: false,
      zoomSnap: 0.25,
      minZoom: 5,
      maxZoom: 8,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 10,
      minZoom: 3,
    }).addTo(map);

    map.fitBounds(theaterBounds, {
      paddingTopLeft: [48, 44],
      paddingBottomRight: [44, 44],
    });

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

    const route = L.polyline(
      [
        [sardis.lat, sardis.lng],
        [activeBattle.lat, activeBattle.lng],
      ],
      {
        color: '#D4A843',
        weight: 3,
        opacity: 0.9,
        dashArray: '10 8',
        lineCap: 'round',
      },
    );
    route.addTo(layer);

    const sardisMarker = L.marker([sardis.lat, sardis.lng], { icon: buildSardisIcon() }).addTo(layer);
    sardisMarker.bindTooltip(sardis.name, {
      permanent: true,
      direction: 'bottom',
      offset: L.point(0, 12),
      className: 'sardis-tooltip',
    });

    const athensMarker = L.circleMarker([37.98, 23.72], {
      radius: 4,
      color: 'rgba(11,19,32,0.16)',
      weight: 1,
      fillColor: '#ffffff',
      fillOpacity: 1,
    }).addTo(layer);
    athensMarker.bindTooltip('Athens', {
      permanent: true,
      direction: 'bottom',
      offset: L.point(0, 10),
      className: 'reference-city-label',
    });

    const aegeanLabel = L.marker([37.65, 24.65], {
      icon: buildReferenceLabel('Aegean Sea', 'rgba(73,119,177,0.72)'),
      interactive: false,
    }).addTo(layer);
    aegeanLabel.bindTooltip('Aegean Sea', {
      permanent: true,
      direction: 'center',
      offset: L.point(0, 0),
      className: 'theater-sea-label',
    });

    battles.forEach((battle) => {
      const isActive = battle.id === activeBattleId;
      const marker = L.marker([battle.lat, battle.lng], {
        icon: buildBattleMarkerIcon(isActive),
        keyboard: false,
      }).addTo(layer);

      marker.on('click', () => onSelectBattle(battle.id));

      marker.bindTooltip(`${battle.year}<br/><span style="font-family:'Playfair Display', Georgia, serif; font-size:17px; letter-spacing:0; text-transform:none; font-weight:700;">${battle.name}</span>`, {
        permanent: isActive,
        direction: battle.tooltipDirection,
        offset: L.point(...(battle.tooltipOffset || [0, 0])),
        className: `battle-marker-tooltip${isActive ? ' active' : ''}`,
      });
    });
  }, [activeBattle, activeBattleId, onSelectBattle]);

  return (
    <div className={`relative overflow-hidden rounded-[30px] border border-white/80 bg-[#f4f0e4] shadow-[0_28px_80px_rgba(0,0,0,0.22)] ${className || ''}`}>
      <div className="pointer-events-none absolute inset-0 z-[400] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0)),radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.45),transparent_24%)]" />
      <div className="pointer-events-none absolute left-4 top-4 z-[450] rounded-full border border-[#0b1320]/18 bg-white/88 px-3 py-1.5 text-[10px] tracking-[0.28em] uppercase text-[#0b1320]/68 backdrop-blur-sm">
        Battle Theater
      </div>
      <div
        ref={containerRef}
        className="battle-theater-map relative z-10 min-h-[390px] w-full sm:min-h-[430px] xl:min-h-[520px]"
      />
    </div>
  );
};

export const PersianWarsBattleExplorer = () => {
  const [activeBattleId, setActiveBattleId] = useState<BattleId>('thermopylae');

  const activeBattle = useMemo(
    () => battles.find((battle) => battle.id === activeBattleId) ?? battles[0],
    [activeBattleId],
  );

  return (
    <div className="mt-14 grid xl:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch">
      <div className="flex h-full flex-col rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(9,14,24,0.78),rgba(7,11,18,0.6))] p-5 md:p-6 shadow-[0_24px_80px_rgba(0,0,0,0.26)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-[hsl(43,85%,55%,0.58)]">
              Battle Theater
            </p>
            <p className="mt-2 text-sm md:text-base text-foreground/58 font-body max-w-xl">
              Click the battle markers to open the encounter. The route begins at Sardis, the Persian forward base in western Anatolia.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-foreground/42">
            <span className="inline-flex items-center gap-2 rounded-full border border-persian-gold/20 bg-background/45 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-persian-gold shadow-[0_0_12px_rgba(212,168,67,0.7)]" />
              Selected battle
            </span>
          </div>
        </div>

        <BattleTheaterMap
          activeBattleId={activeBattleId}
          onSelectBattle={setActiveBattleId}
          className="mt-5"
        />

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/8 pt-5 md:grid-cols-4">
          {battles.map((battle) => {
            const isActive = battle.id === activeBattleId;
            return (
              <button
                key={`${battle.id}-chip`}
                type="button"
                onClick={() => setActiveBattleId(battle.id)}
                className={`rounded-2xl border p-3 text-left transition-all duration-300 ${
                  isActive
                    ? 'border-persian-gold/35 bg-persian-gold/10 shadow-[0_14px_30px_rgba(212,168,67,0.08)]'
                    : 'border-border/30 bg-card/22 hover:border-persian-gold/20 hover:bg-card/36'
                }`}
              >
                <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/45">{battle.year}</p>
                <p className="mt-2 font-display text-lg text-foreground/88">{battle.name}</p>
                <p className="mt-1 text-xs text-foreground/48">{battle.result}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="sticky top-24 h-full">
        <div className="h-full overflow-hidden rounded-[28px] border border-persian-gold/18 bg-[linear-gradient(180deg,rgba(6,11,18,0.97),rgba(8,13,22,0.92))] shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeBattle.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative border-b border-persian-gold/12 bg-[#0e1521]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,168,67,0.16),transparent_48%)]" />
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={activeBattle.imageSrc}
                    alt={activeBattle.imageAlt}
                    className="h-full w-full object-contain bg-[#ece2c1]"
                    loading="lazy"
                  />
                </div>
                <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-persian-gold/28 bg-[#09111b]/85 px-3 py-1.5 text-[10px] tracking-[0.22em] uppercase text-[hsl(43,85%,55%,0.82)]">
                    {activeBattle.year}
                  </span>
                  <span className="rounded-full border border-background/80 bg-background/88 px-3 py-1.5 text-[10px] tracking-[0.22em] uppercase text-foreground/70">
                    {activeBattle.result}
                  </span>
                </div>
              </div>

              <div className="space-y-4 p-5 md:p-6">
                <div>
                  <p className="text-xs tracking-[0.26em] uppercase text-foreground/42">Battle dossier</p>
                  <h3 className="mt-2 font-display text-3xl md:text-4xl text-gradient-gold">{activeBattle.name}</h3>
                  <p className="mt-3 text-base md:text-lg leading-relaxed text-foreground/72 font-body">
                    {activeBattle.summary}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-persian-gold/12 bg-white/[0.02] p-4">
                    <p className="text-[10px] tracking-[0.24em] uppercase text-foreground/42">Forces</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">{activeBattle.forces}</p>
                  </div>
                  <div className="rounded-2xl border border-persian-gold/12 bg-white/[0.02] p-4">
                    <p className="text-[10px] tracking-[0.24em] uppercase text-foreground/42">Terrain</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">{activeBattle.terrain}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-persian-gold/16 bg-[linear-gradient(180deg,rgba(212,168,67,0.08),rgba(212,168,67,0.03))] p-4">
                  <p className="text-[10px] tracking-[0.24em] uppercase text-[hsl(43,85%,55%,0.68)]">Turning point</p>
                  <p className="mt-2 text-sm md:text-[15px] leading-relaxed text-foreground/74">
                    {activeBattle.turningPoint}
                  </p>
                </div>

                <div className="rounded-2xl border border-border/25 bg-card/24 p-4">
                  <p className="text-[10px] tracking-[0.24em] uppercase text-foreground/42">Why it mattered</p>
                  <p className="mt-2 text-sm md:text-[15px] leading-relaxed text-foreground/68">
                    {activeBattle.aftermath}
                  </p>
                </div>

                <p className="text-xs text-foreground/40">{activeBattle.imageCaption}</p>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
