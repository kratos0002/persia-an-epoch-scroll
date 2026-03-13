import React from 'react';
import { motion } from 'framer-motion';
import { ScrollPanMap } from '@/components/scroll/ScrollPanMap';

const BURNT = 'hsl(15, 75%, 50%)';
const MONGOL_ORANGE = 'hsl(25, 70%, 50%)';

interface InvasionWave {
  year: string;
  leader: string;
  detail: string;
  routeX: number; // 0-1 position along the map
}

const WAVES: InvasionWave[] = [
  { year: '1241', leader: 'Tair Bahadur', detail: 'First post-Genghis raid. Mongol cavalry sweeps through the Khyber Pass into Lahore. Plunder and withdrawal — a probe, not a conquest.', routeX: 0.15 },
  { year: '1245', leader: 'Möngke\'s Generals', detail: 'A second probe into Multan and Sindh. The Delhi Sultanate under Balban begins fortifying the frontier.', routeX: 0.28 },
  { year: '1285', leader: 'Tarmashirin\'s Predecessor', detail: 'A large-scale invasion reaches the Punjab. Repelled by Balban\'s garrison system, but at enormous cost — Balban\'s own son is killed.', routeX: 0.42 },
  { year: '1297', leader: 'Kadar', detail: 'The Chagatai Khanate sends 100,000 horsemen through the Khyber. They reach the outskirts of Delhi. Alauddin Khalji, newly on the throne, defeats them at the Battle of Jalandhar.', routeX: 0.58 },
  { year: '1299', leader: 'Kutlugh Khwaja', detail: 'The largest invasion yet — 200,000 Mongol troops. They reach Kili, just outside Delhi. Khalji\'s reformed army meets them in open battle and shatters the invasion.', routeX: 0.75 },
  { year: '1303', leader: 'Targhi', detail: 'The final major attempt. Targhi besieges Delhi itself. Khalji\'s intelligence network provides early warning. The Mongols are routed. They never return in force.', routeX: 0.9 },
];

const InvasionMap = ({ progress }: { progress: number }) => (
  <div className="relative w-full h-full" style={{ background: 'hsl(220, 25%, 8%)' }}>
    <svg viewBox="0 0 3000 900" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="wave-mtn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(25, 15%, 22%)" />
          <stop offset="100%" stopColor="hsl(220, 20%, 10%)" />
        </linearGradient>
      </defs>

      {/* Terrain — Hindu Kush to Delhi plain */}
      <path d="M0 500 L200 300 L400 380 L600 250 L800 330 L1000 400 L1200 500 L1500 550 L1800 580 L2100 600 L2400 590 L2700 600 L3000 610 L3000 900 L0 900 Z"
        fill="url(#wave-mtn)" opacity="0.6" />

      {/* Key locations */}
      {[
        { x: 300, y: 280, label: 'Samarkand' },
        { x: 700, y: 310, label: 'Khyber Pass' },
        { x: 1200, y: 480, label: 'Lahore' },
        { x: 1600, y: 530, label: 'Multan' },
        { x: 2200, y: 560, label: 'Delhi' },
      ].map((city, i) => (
        <g key={i}>
          <circle cx={city.x} cy={city.y} r="6" fill={BURNT} opacity={0.8} />
          <text x={city.x} y={city.y - 16} textAnchor="middle" fill="hsl(40, 25%, 75%)" fontSize="18" fontFamily="'Cormorant Garamond', serif">
            {city.label}
          </text>
        </g>
      ))}

      {/* Invasion arrows — draw progressively */}
      {WAVES.map((wave, i) => {
        const waveProgress = Math.max(0, Math.min(1, (progress - wave.routeX + 0.15) / 0.15));
        const startX = 300;
        const endX = 300 + wave.routeX * 1900;
        const midY = 400 + (i % 2 === 0 ? -40 : 40);

        return (
          <motion.path
            key={i}
            d={`M${startX} 280 Q${(startX + endX) / 2} ${midY} ${endX} ${500 + i * 15}`}
            stroke={MONGOL_ORANGE}
            strokeWidth="2"
            fill="none"
            strokeDasharray="8 4"
            opacity={waveProgress * 0.7}
            pathLength={waveProgress}
            style={{ pathLength: waveProgress }}
          />
        );
      })}
    </svg>
  </div>
);

const StepCard = ({ wave }: { wave: InvasionWave }) => (
  <div className="bg-background/90 backdrop-blur-lg p-6 md:p-8 rounded-lg border border-[hsl(15,75%,50%,0.15)] shadow-[0_8px_32px_rgba(0,0,0,0.4)] w-[min(400px,85vw)]">
    <p className="text-xs tracking-[0.2em] uppercase font-body font-semibold mb-2" style={{ color: MONGOL_ORANGE }}>
      {wave.year} · {wave.leader}
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: 'hsl(40, 25%, 80%)' }}>
      {wave.detail}
    </p>
  </div>
);

export const WavesSection = () => (
  <section id="mi-waves">
    <ScrollPanMap
      mapWidthMultiplier={3}
      scrollRunway={7}
      overlaySteps={WAVES.map((wave, i) => <StepCard key={i} wave={wave} />)}
    >
      {(progress) => <InvasionMap progress={progress} />}
    </ScrollPanMap>
  </section>
);
