import React, { useRef, useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { NM } from './nutmegTheme';

const ZOOM_STAGES = [
  { center: [-4.5, 130] as [number, number], zoom: 5, label: 'The Banda Sea — Southeast Asia' },
  { center: [-4.525, 129.89] as [number, number], zoom: 11, label: 'The Banda Archipelago — ten tiny islands' },
  { center: [-4.5225, 129.8642] as [number, number], zoom: 14, label: 'Run Island — 3 km long, 1 km wide' },
];

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

    // Use a lighter, parchment-feeling tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
      maxZoom: 16,
      minZoom: 3,
    }).addTo(map);

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const stageIndex = v < 0.33 ? 0 : v < 0.66 ? 1 : 2;
      if (stageIndex !== currentStage) setCurrentStage(stageIndex);
    });
    return unsubscribe;
  }, [scrollYProgress, currentStage]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const stage = ZOOM_STAGES[currentStage];
    map.flyTo(stage.center, stage.zoom, { duration: 1.8, easeLinearity: 0.25 });

    if (currentStage === 2 && !markerRef.current) {
      const icon = L.divIcon({
        className: '',
        html: `
          <div style="position:relative;width:200px;display:flex;flex-direction:column;align-items:center;">
            <div style="
              padding:12px 16px;
              border-radius:4px;
              background:${NM.CREAM};
              border:1px solid ${NM.TIMBER}44;
              box-shadow:0 8px 30px rgba(0,0,0,0.15);
              text-align:center;
            ">
              <div style="font-family:'Source Sans 3',sans-serif;font-size:9px;text-transform:uppercase;letter-spacing:0.25em;color:${NM.SMOKE};margin-bottom:4px;">
                The Prize
              </div>
              <div style="font-family:'Playfair Display',serif;font-size:18px;font-weight:700;line-height:1.1;color:${NM.AMBER};">
                Run Island
              </div>
              <div style="margin-top:4px;font-family:'Source Sans 3',sans-serif;font-size:10px;color:${NM.SMOKE};font-style:italic;">
                3 km × 1 km — traded for Manhattan
              </div>
            </div>
            <div style="width:1px;height:14px;background:${NM.AMBER};"></div>
            <div style="width:10px;height:10px;border-radius:50%;background:${NM.AMBER};border:2px solid ${NM.TIMBER};"></div>
          </div>
        `,
        iconSize: [200, 100],
        iconAnchor: [100, 100],
      });
      markerRef.current = L.marker(FORT_POSITION, { icon }).addTo(map);
    } else if (currentStage < 2 && markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
  }, [currentStage]);

  return (
    <section id="banda-islands" ref={sectionRef} className="relative" style={{ background: NM.CREAM, height: '300vh' }}>
      {/* Sticky map */}
      <div className="sticky top-0 h-screen w-full">
        {/* Parchment overlay on map */}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background: `linear-gradient(180deg, ${NM.CREAM}ee 0%, transparent 8%, transparent 92%, ${NM.CREAM}ee 100%)`,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-[4]"
          style={{
            boxShadow: `inset 0 0 80px ${NM.CREAM}88`,
            mixBlendMode: 'multiply',
          }}
        />

        <div ref={mapContainerRef} className="w-full h-full" style={{ filter: 'sepia(0.25) saturate(0.8)' }} />

        {/* Stage label */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[10]">
          <div className="px-5 py-2.5 rounded-sm" style={{
            background: NM.CREAM,
            border: `1px solid ${NM.TIMBER}22`,
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          }}>
            <p className="text-[10px] tracking-[0.2em] uppercase font-body font-semibold text-center" style={{ color: NM.TIMBER }}>
              {ZOOM_STAGES[currentStage].label}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll cards styled as log entries */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-[100vh]" />
        <div className="h-[100vh] flex items-center justify-center">
          <div className="max-w-md mx-auto px-6 pointer-events-auto">
            <div className="rounded-sm p-6" style={{
              background: NM.CREAM,
              border: `1px solid ${NM.TIMBER}22`,
              boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            }}>
              <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-2" style={{ color: NM.SMOKE }}>
                Chart Detail II
              </p>
              <p className="font-body text-base leading-relaxed" style={{ color: NM.INK }}>
                Ten volcanic islands. Total land area: <strong style={{ color: NM.AMBER }}>barely 40 square kilometres</strong>.
                Yet for two centuries, these specks were the most strategically important real estate on the planet.
              </p>
            </div>
          </div>
        </div>
        <div className="h-[100vh] flex items-center justify-center">
          <div className="max-w-md mx-auto px-6 pointer-events-auto">
            <div className="rounded-sm p-6" style={{
              background: NM.CREAM,
              border: `1px solid ${NM.TIMBER}22`,
              boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            }}>
              <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-2" style={{ color: NM.SMOKE }}>
                Chart Detail III
              </p>
              <p className="font-body text-base leading-relaxed" style={{ color: NM.INK }}>
                <strong style={{ color: NM.AMBER }}>Run</strong> — barely three kilometres long.
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
