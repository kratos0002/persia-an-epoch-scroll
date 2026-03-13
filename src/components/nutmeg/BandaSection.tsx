import React, { useRef, useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';

const OCEAN = 'hsl(210, 40%, 8%)';
const SPICE = 'hsl(25, 75%, 45%)';
const SAFFRON = 'hsl(35, 90%, 55%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';

/* Zoom stages */
const ZOOM_STAGES = [
  { center: [-4.5, 130] as [number, number], zoom: 5, label: 'The Banda Sea — Southeast Asia' },
  { center: [-4.525, 129.89] as [number, number], zoom: 11, label: 'The Banda Archipelago — ten tiny islands' },
  { center: [-4.5225, 129.8642] as [number, number], zoom: 14, label: 'Run Island — 3 km long, 1 km wide' },
];

/* Fort marker on Run */
const FORT_POSITION: [number, number] = [-4.5225, 129.8642];

export const BandaSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [currentStage, setCurrentStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: ZOOM_STAGES[0].center,
      zoom: ZOOM_STAGES[0].zoom,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: true,
      keyboard: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 16,
      minZoom: 3,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Scroll-driven zoom
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const stageIndex = v < 0.33 ? 0 : v < 0.66 ? 1 : 2;
      if (stageIndex !== currentStage) {
        setCurrentStage(stageIndex);
      }
    });
    return unsubscribe;
  }, [scrollYProgress, currentStage]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const stage = ZOOM_STAGES[currentStage];
    map.flyTo(stage.center, stage.zoom, { duration: 1.8, easeLinearity: 0.25 });

    // Add fort marker at final zoom
    if (currentStage === 2 && !markerRef.current) {
      const icon = L.divIcon({
        className: '',
        html: `
          <div style="position:relative;width:180px;display:flex;flex-direction:column;align-items:center;">
            <div style="
              padding:10px 14px;
              border-radius:14px;
              background:linear-gradient(180deg, rgba(8,12,22,0.96), rgba(10,16,28,0.9));
              border:1px solid rgba(180,100,30,0.45);
              box-shadow:0 14px 40px rgba(0,0,0,0.45);
              backdrop-filter:blur(12px);
              text-align:center;
            ">
              <div style="
                font-family:'Source Sans 3', system-ui, sans-serif;
                font-size:9px;
                text-transform:uppercase;
                letter-spacing:0.22em;
                color:rgba(180,100,30,0.72);
                margin-bottom:4px;
              ">The Prize</div>
              <div style="
                font-family:'Playfair Display', Georgia, serif;
                font-size:18px;
                font-weight:700;
                line-height:1.1;
                color:${SAFFRON};
              ">Run Island</div>
              <div style="
                margin-top:4px;
                font-family:'Source Sans 3', system-ui, sans-serif;
                font-size:10px;
                color:rgba(255,255,255,0.55);
              ">3 km × 1 km — traded for Manhattan</div>
            </div>
            <div style="width:1px;height:16px;background:linear-gradient(180deg, rgba(180,100,30,0.8), transparent);"></div>
            <div style="width:12px;height:12px;border-radius:50%;background:${SAFFRON};border:3px solid rgba(255,255,255,0.9);box-shadow:0 0 12px rgba(180,100,30,0.5);"></div>
          </div>
        `,
        iconSize: [180, 100],
        iconAnchor: [90, 100],
      });
      markerRef.current = L.marker(FORT_POSITION, { icon }).addTo(map);
    } else if (currentStage < 2 && markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
  }, [currentStage]);

  return (
    <section id="banda-islands" ref={sectionRef} className="relative" style={{ background: OCEAN, height: '300vh' }}>
      {/* Sticky map */}
      <div className="sticky top-0 h-screen w-full">
        <div ref={mapContainerRef} className="w-full h-full" style={{ background: OCEAN }} />

        {/* Stage label */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[10]">
          <div className="px-5 py-2.5 rounded-full backdrop-blur-md" style={{
            background: 'rgba(10,15,25,0.85)',
            border: '1px solid rgba(180,100,30,0.3)',
          }}>
            <p className="text-[10px] tracking-[0.2em] uppercase font-body font-semibold text-center" style={{ color: SAFFRON }}>
              {ZOOM_STAGES[currentStage].label}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll steps overlay — pointer events none so map is interactive */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-[100vh]" /> {/* Step 0 — wide view */}
        <div className="h-[100vh] flex items-center justify-center">
          <div className="max-w-md mx-auto px-6 pointer-events-auto">
            <div className="rounded-xl p-6 backdrop-blur-md" style={{
              background: 'rgba(10,15,25,0.88)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <p className="font-body text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Ten volcanic islands. Total land area: <strong style={{ color: SAFFRON }}>barely 40 square kilometres</strong>.
                Yet for two centuries, these specks were the most strategically important real estate on the planet.
              </p>
            </div>
          </div>
        </div>
        <div className="h-[100vh] flex items-center justify-center">
          <div className="max-w-md mx-auto px-6 pointer-events-auto">
            <div className="rounded-xl p-6 backdrop-blur-md" style={{
              background: 'rgba(10,15,25,0.88)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <p className="font-body text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                <strong style={{ color: SAFFRON }}>Run</strong> — barely three kilometres long.
                The only Banda island the English managed to hold.
                In 1667, the Dutch traded Manhattan for this island.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
