import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Simplified stylized territory paths (viewBox 0 0 800 500)
const TERRITORIES: Record<string, { path: string; label: string; cx: number; cy: number }> = {
  persis: {
    path: "M 420,230 C 445,215 490,210 515,225 C 535,235 545,260 535,285 C 525,310 500,325 475,325 C 450,325 430,310 418,290 C 406,270 405,245 420,230 Z",
    label: "Persis", cx: 470, cy: 270,
  },
  media: {
    path: "M 370,160 C 395,142 430,138 455,150 C 475,162 480,185 468,205 C 455,225 435,232 410,230 C 385,228 365,215 358,195 C 350,175 355,162 370,160 Z",
    label: "Media", cx: 415, cy: 185,
  },
  mesopotamia: {
    path: "M 260,175 C 285,158 325,152 348,170 C 370,188 372,218 360,242 C 348,266 325,282 300,282 C 275,282 255,265 245,245 C 235,225 240,195 260,175 Z",
    label: "Mesopotamia", cx: 305, cy: 222,
  },
  anatolia: {
    path: "M 110,95 C 145,72 220,62 268,75 C 310,88 330,112 318,140 C 305,162 275,172 242,172 C 195,172 148,158 120,145 C 92,132 85,112 110,95 Z",
    label: "Anatolia", cx: 210, cy: 120,
  },
  egypt: {
    path: "M 108,248 C 122,228 148,218 168,232 C 188,245 195,275 185,308 C 175,338 155,358 135,358 C 115,358 98,338 90,308 C 82,278 92,258 108,248 Z",
    label: "Egypt", cx: 138, cy: 295,
  },
  bactria: {
    path: "M 530,112 C 560,95 610,88 648,102 C 678,115 688,142 668,165 C 648,185 618,192 588,182 C 558,172 538,148 530,128 Z",
    label: "Bactria", cx: 605, cy: 140,
  },
  gandhara: {
    path: "M 648,172 C 670,158 708,155 730,172 C 750,188 752,215 732,238 C 712,258 682,258 660,245 C 638,232 632,198 648,172 Z",
    label: "Gandhara", cx: 695, cy: 205,
  },
  caucasus: {
    path: "M 310,72 C 338,55 382,48 408,62 C 435,75 442,98 425,118 C 408,135 378,138 350,128 C 322,118 305,100 310,72 Z",
    label: "Caucasus", cx: 375, cy: 92,
  },
  arabia: {
    path: "M 228,302 C 268,288 328,298 368,322 C 405,345 415,385 388,425 C 358,458 308,465 268,445 C 228,425 210,388 210,355 C 210,328 218,308 228,302 Z",
    label: "Arabia", cx: 312, cy: 375,
  },
};

const CITIES = [
  { name: 'Persepolis', x: 462, y: 272 },
  { name: 'Susa', x: 395, y: 248 },
  { name: 'Babylon', x: 310, y: 228 },
  { name: 'Ecbatana', x: 408, y: 188 },
  { name: 'Athens', x: 135, y: 118 },
  { name: 'Memphis', x: 140, y: 290 },
  { name: 'Samarkand', x: 600, y: 105 },
  { name: 'Isfahan', x: 445, y: 248 },
  { name: 'Pasargadae', x: 450, y: 260 },
];

export type EmpireId = 'none' | 'achaemenid' | 'alexander' | 'parthian' | 'sassanid' | 'islamic' | 'mongol' | 'safavid' | 'modern';

const EMPIRE_TERRITORIES: Record<EmpireId, string[]> = {
  none: [],
  achaemenid: ['persis', 'media', 'mesopotamia', 'anatolia', 'egypt', 'bactria', 'gandhara', 'caucasus'],
  alexander: ['persis', 'media', 'mesopotamia', 'anatolia', 'egypt', 'bactria', 'gandhara', 'caucasus'],
  parthian: ['persis', 'media', 'mesopotamia', 'caucasus'],
  sassanid: ['persis', 'media', 'mesopotamia', 'caucasus', 'bactria'],
  islamic: ['persis', 'media', 'mesopotamia', 'anatolia', 'egypt', 'bactria', 'arabia'],
  mongol: ['persis', 'media', 'mesopotamia', 'bactria', 'caucasus'],
  safavid: ['persis', 'media', 'caucasus'],
  modern: ['persis', 'media'],
};

const EMPIRE_COLORS: Record<EmpireId, string> = {
  none: 'transparent',
  achaemenid: 'hsl(43 85% 55%)',
  alexander: 'hsl(270 40% 45%)',
  parthian: 'hsl(350 55% 42%)',
  sassanid: 'hsl(350 60% 38%)',
  islamic: 'hsl(160 45% 35%)',
  mongol: 'hsl(15 65% 40%)',
  safavid: 'hsl(215 65% 35%)',
  modern: 'hsl(220 30% 45%)',
};

interface PersiaMapProps {
  empire: EmpireId;
  className?: string;
  showCities?: boolean;
  highlightCities?: string[];
  routePath?: string;
  showLabels?: boolean;
}

export const PersiaMap = ({
  empire,
  className,
  showCities = true,
  highlightCities,
  routePath,
  showLabels = false,
}: PersiaMapProps) => {
  const activeTerritories = EMPIRE_TERRITORIES[empire];
  const empireColor = EMPIRE_COLORS[empire];

  return (
    <svg viewBox="0 0 800 500" className={cn("w-full h-full max-w-4xl", className)} role="img" aria-label="Map of Persian territories">
      {/* Water background */}
      <rect width="800" height="500" fill="hsl(215 30% 12%)" rx="8" />

      {/* Grid lines for depth */}
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 25} x2="800" y2={i * 25} stroke="hsl(215 20% 18%)" strokeWidth="0.3" />
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="500" stroke="hsl(215 20% 18%)" strokeWidth="0.3" />
      ))}

      {/* Territories */}
      {Object.entries(TERRITORIES).map(([id, territory]) => {
        const isActive = activeTerritories.includes(id);
        return (
          <motion.path
            key={id}
            d={territory.path}
            fill={isActive ? empireColor : 'hsl(220 15% 16%)'}
            fillOpacity={isActive ? 0.4 : 0.3}
            stroke={isActive ? empireColor : 'hsl(220 15% 25%)'}
            strokeWidth={isActive ? 1.5 : 0.5}
            animate={{
              fillOpacity: isActive ? 0.4 : 0.15,
              strokeWidth: isActive ? 1.5 : 0.5,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        );
      })}

      {/* Territory labels */}
      {showLabels && Object.entries(TERRITORIES).map(([id, territory]) => {
        const isActive = activeTerritories.includes(id);
        return (
          <motion.text
            key={`label-${id}`}
            x={territory.cx}
            y={territory.cy}
            textAnchor="middle"
            fill={isActive ? 'hsl(40 25% 90%)' : 'hsl(220 10% 40%)'}
            fontSize="10"
            fontFamily="'Cormorant Garamond', serif"
            animate={{ opacity: isActive ? 0.9 : 0.3 }}
            transition={{ duration: 0.6 }}
          >
            {territory.label}
          </motion.text>
        );
      })}

      {/* Route path */}
      {routePath && (
        <motion.path
          d={routePath}
          fill="none"
          stroke="hsl(43 85% 65%)"
          strokeWidth="2"
          strokeDasharray="8 4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      )}

      {/* Cities */}
      {showCities && CITIES.map(city => {
        const isHighlighted = !highlightCities || highlightCities.includes(city.name);
        return (
          <g key={city.name}>
            <motion.circle
              cx={city.x}
              cy={city.y}
              r={isHighlighted ? 3 : 2}
              fill={isHighlighted ? 'hsl(40 25% 90%)' : 'hsl(220 10% 40%)'}
              animate={{ opacity: isHighlighted ? 1 : 0.4 }}
              transition={{ duration: 0.5 }}
            />
            {isHighlighted && (
              <motion.text
                x={city.x}
                y={city.y - 8}
                textAnchor="middle"
                fill="hsl(40 25% 85%)"
                fontSize="9"
                fontFamily="'Cormorant Garamond', serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {city.name}
              </motion.text>
            )}
          </g>
        );
      })}
    </svg>
  );
};
