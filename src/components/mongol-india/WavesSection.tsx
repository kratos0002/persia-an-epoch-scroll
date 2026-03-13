import React from 'react';
import { motion } from 'framer-motion';
import { ScrollPanMap } from '@/components/scroll/ScrollPanMap';

const BURNT = 'hsl(15, 75%, 50%)';
const MONGOL_ORANGE = 'hsl(25, 70%, 50%)';
const GOLD = 'hsl(40, 60%, 55%)';

interface InvasionWave {
  year: string;
  leader: string;
  detail: string;
  routeX: number;
}

const WAVES: InvasionWave[] = [
  { year: '1241', leader: 'Tair Bahadur', detail: 'First post-Genghis raid. Mongol cavalry sweeps through the Khyber Pass into Lahore. Plunder and withdrawal — a probe, not a conquest.', routeX: 0.15 },
  { year: '1245', leader: 'Möngke\'s Generals', detail: 'A second probe into Multan and Sindh. The Delhi Sultanate under Balban begins fortifying the frontier.', routeX: 0.28 },
  { year: '1285', leader: 'Tarmashirin\'s Predecessor', detail: 'A large-scale invasion reaches the Punjab. Repelled by Balban\'s garrison system, but at enormous cost — Balban\'s own son is killed.', routeX: 0.42 },
  { year: '1297', leader: 'Kadar', detail: 'The Chagatai Khanate sends 100,000 horsemen through the Khyber. They reach the outskirts of Delhi. Alauddin Khalji defeats them at the Battle of Jalandhar.', routeX: 0.58 },
  { year: '1299', leader: 'Kutlugh Khwaja', detail: 'The largest invasion yet — 200,000 Mongol troops. They reach Kili, just outside Delhi. Khalji\'s reformed army meets them in open battle and shatters the invasion.', routeX: 0.75 },
  { year: '1303', leader: 'Targhi', detail: 'The final major attempt. Targhi besieges Delhi itself. Khalji\'s intelligence network provides early warning. The Mongols are routed and never return in force.', routeX: 0.9 },
];

const CITIES = [
  { x: 250, y: 260, label: 'Samarkand' },
  { x: 550, y: 310, label: 'Balkh' },
  { x: 900, y: 340, label: 'Kabul' },
  { x: 1100, y: 400, label: 'Khyber Pass' },
  { x: 1500, y: 460, label: 'Lahore' },
  { x: 1800, y: 490, label: 'Multan' },
  { x: 2400, y: 500, label: 'Delhi' },
];

const InvasionMap = ({ progress }: { progress: number }) => (
  <div className="relative w-full h-full" style={{ background: 'hsl(220, 25%, 6%)' }}>
    <svg viewBox="0 0 3000 900" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="wave-mtn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(25, 18%, 28%)" />
          <stop offset="100%" stopColor="hsl(220, 20%, 8%)" />
        </linearGradient>
        <linearGradient id="wave-mtn2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(25, 12%, 20%)" />
          <stop offset="100%" stopColor="hsl(220, 20%, 6%)" />
        </linearGradient>
        <filter id="city-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background grid texture */}
      <pattern id="map-grid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M60 0 L0 0 L0 60" fill="none" stroke="hsl(40, 10%, 12%)" strokeWidth="0.5" />
      </pattern>
      <rect width="3000" height="900" fill="url(#map-grid)" opacity="0.4" />

      {/* Mountain ridges — far range */}
      <path d="M0 500 L150 350 L300 420 L450 300 L600 350 L750 250 L900 300 L1050 380 L1200 450 L1400 500 L1600 540 L1800 560 L2000 580 L2200 590 L2500 580 L2800 590 L3000 600 L3000 900 L0 900 Z"
        fill="url(#wave-mtn)" opacity="0.8" />
      {/* Mountain ridges — near range */}
      <path d="M0 550 L100 420 L250 480 L400 360 L550 400 L700 310 L850 370 L1000 430 L1150 490 L1300 530 L1500 560 L1700 580 L1900 600 L2100 610 L2300 600 L2600 610 L3000 640 L3000 900 L0 900 Z"
        fill="url(#wave-mtn2)" opacity="0.6" />

      {/* Mountain peak markers */}
      {[450, 700, 900].map((x, i) => (
        <text key={i} x={x} y={x === 700 ? 240 : 290} textAnchor="middle" fill="hsl(40, 15%, 25%)" fontSize="14" fontFamily="'Cormorant Garamond', serif" letterSpacing="3" opacity="0.5">
          {x === 700 ? 'HINDU KUSH' : x === 450 ? '▲' : '▲'}
        </text>
      ))}

      {/* Region labels */}
      <text x={400} y={750} textAnchor="middle" fill="hsl(40, 15%, 20%)" fontSize="18" fontFamily="'Cormorant Garamond', serif" letterSpacing="8">
        CENTRAL ASIA
      </text>
      <text x={1400} y={750} textAnchor="middle" fill="hsl(40, 15%, 20%)" fontSize="18" fontFamily="'Cormorant Garamond', serif" letterSpacing="8">
        PUNJAB
      </text>
      <text x={2400} y={750} textAnchor="middle" fill="hsl(40, 15%, 20%)" fontSize="18" fontFamily="'Cormorant Garamond', serif" letterSpacing="8">
        DELHI SULTANATE
      </text>

      {/* City markers with glow */}
      {CITIES.map((city, i) => {
        const cityProgress = Math.max(0, Math.min(1, (progress * 3 - (city.x / 3000) * 2)));
        return (
          <g key={i}>
            {/* Glow circle */}
            <circle cx={city.x} cy={city.y} r={16} fill={i === CITIES.length - 1 ? BURNT : GOLD} opacity={cityProgress * 0.15} filter="url(#city-glow)" />
            {/* Dot */}
            <circle cx={city.x} cy={city.y} r={5} fill={i === CITIES.length - 1 ? BURNT : GOLD} opacity={0.5 + cityProgress * 0.5} />
            {/* Label */}
            <text x={city.x} y={city.y - 22} textAnchor="middle" fill={i === CITIES.length - 1 ? BURNT : 'hsl(40, 25%, 80%)'} fontSize="16" fontFamily="'Cormorant Garamond', serif" fontWeight="600" opacity={0.5 + cityProgress * 0.5}>
              {city.label}
            </text>
          </g>
        );
      })}

      {/* Invasion route arrows */}
      {WAVES.map((wave, i) => {
        const waveProgress = Math.max(0, Math.min(1, (progress - wave.routeX + 0.2) / 0.2));
        const startX = 250;
        const endX = 250 + wave.routeX * 2150;
        const midY = 420 + (i % 2 === 0 ? -30 : 30);

        return (
          <g key={i}>
            <motion.path
              d={`M${startX} 260 Q${(startX + endX) / 2} ${midY} ${endX} ${480 + i * 8}`}
              stroke={MONGOL_ORANGE}
              strokeWidth={waveProgress > 0.5 ? 3 : 2}
              fill="none"
              strokeDasharray="10 5"
              opacity={waveProgress * 0.8}
              style={{ pathLength: waveProgress }}
            />
            {/* Arrow head at end */}
            {waveProgress > 0.8 && (
              <circle cx={endX} cy={480 + i * 8} r={4} fill={MONGOL_ORANGE} opacity={0.8} />
            )}
            {/* Year label along route */}
            {waveProgress > 0.3 && (
              <text
                x={(startX + endX) / 2}
                y={midY - 15}
                textAnchor="middle"
                fill={MONGOL_ORANGE}
                fontSize="13"
                fontFamily="'Cormorant Garamond', serif"
                fontWeight="bold"
                opacity={waveProgress * 0.7}
              >
                {wave.year}
              </text>
            )}
          </g>
        );
      })}

      {/* Compass rose */}
      <g transform="translate(2800, 150)" opacity="0.3">
        <line x1={0} y1={-30} x2={0} y2={30} stroke="hsl(40, 25%, 50%)" strokeWidth={1} />
        <line x1={-30} y1={0} x2={30} y2={0} stroke="hsl(40, 25%, 50%)" strokeWidth={1} />
        <text x={0} y={-35} textAnchor="middle" fill="hsl(40, 25%, 50%)" fontSize="12" fontFamily="'Cormorant Garamond', serif">N</text>
      </g>
    </svg>
  </div>
);

const StepCard = ({ wave }: { wave: InvasionWave }) => (
  <div className="bg-background/90 backdrop-blur-lg p-6 md:p-8 rounded-lg border border-[hsl(15,75%,50%,0.2)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-[min(400px,85vw)]">
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
