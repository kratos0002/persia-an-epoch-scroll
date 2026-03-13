import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const NAVY = 'hsl(210, 50%, 40%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const GEIGER = 'hsl(140, 70%, 45%)';

const TERRITORIES = [
  { name: 'India', path: 'M260,175 l8,-3 6,5 4,10 -2,8 -7,4 -8,-2 -5,-7 z', fadeDelay: 0, year: '1947' },
  { name: 'Palestine', path: 'M220,165 l3,-2 3,3 1,6 -3,3 -4,-1 -2,-4 z', fadeDelay: 0.4, year: '1948' },
  { name: 'Egypt', path: 'M210,172 l6,-1 4,4 2,8 -3,5 -6,1 -5,-4 z', fadeDelay: 0.8, year: '1956' },
  { name: 'Malaya', path: 'M290,195 l4,-2 3,4 1,7 -3,3 -4,-1 z', fadeDelay: 1.2, year: '1957' },
  { name: 'Kenya', path: 'M225,205 l5,-1 3,4 1,6 -4,3 -5,-2 z', fadeDelay: 1.6, year: '1963' },
];

export const EmpireFade = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="w-full max-w-2xl mx-auto my-16">
      <svg viewBox="0 0 400 280" className="w-full h-auto">
        {/* Simplified world outline */}
        <motion.g opacity={0.15} stroke={STEEL} strokeWidth={0.5} fill="none">
          {/* Americas */}
          <path d="M30,80 Q50,60 70,70 L80,90 Q75,110 70,130 L60,150 Q55,170 60,190 L50,210 Q45,220 50,230" />
          {/* Europe */}
          <path d="M170,70 Q180,60 195,65 L200,75 Q195,85 190,90" />
          {/* Africa */}
          <path d="M190,140 Q200,130 210,135 L220,155 Q225,175 220,200 L210,220 Q200,230 195,225 L190,200 Q185,175 190,140" />
          {/* Asia */}
          <path d="M230,60 Q260,50 290,55 L310,65 Q330,75 340,90 L345,110 Q340,130 330,140 L310,145 Q290,140 270,145 L250,150 Q240,145 235,130 L230,110 Q228,90 230,60" />
          {/* Australia */}
          <path d="M310,200 Q325,195 340,200 L345,210 Q340,220 330,225 L315,220 Q308,215 310,200" />
        </motion.g>

        {/* British Empire territories that fade */}
        {TERRITORIES.map((t) => (
          <motion.g key={t.name}>
            <motion.path
              d={t.path}
              fill={NAVY}
              opacity={0.6}
              initial={{ opacity: 0.6 }}
              animate={inView ? { opacity: 0.06 } : {}}
              transition={{ duration: 1.5, delay: t.fadeDelay + 0.5 }}
            />
            <motion.text
              x={parseInt(t.path.split(',')[0].replace(/[^0-9]/g, '')) + 10}
              y={parseInt(t.path.split(',')[1]) - 6}
              fill={NAVY}
              fontSize={5.5}
              fontFamily="var(--font-body)"
              initial={{ opacity: 0.7 }}
              animate={inView ? { opacity: 0.15 } : {}}
              transition={{ duration: 1.5, delay: t.fadeDelay + 0.5 }}
            >
              {t.name} {t.year}
            </motion.text>
          </motion.g>
        ))}

        {/* Britain stays lit */}
        <motion.g>
          <motion.circle
            cx={180}
            cy={75}
            r={4}
            fill={NAVY}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 2.5 }}
          />
          <text x={180} y={68} textAnchor="middle" fill={NAVY} fontSize={5} fontFamily="var(--font-body)" fontWeight={600}>
            UK
          </text>
        </motion.g>

        {/* Nuclear warhead icon - stays bright */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Warhead silhouette */}
          <motion.path
            d="M175,88 Q180,82 185,88 L184,96 Q180,98 176,96 Z"
            fill={GEIGER}
            opacity={0.9}
          />
          {/* Radiation rings */}
          {[0, 1, 2].map(i => (
            <motion.circle
              key={i}
              cx={180}
              cy={90}
              r={8}
              fill="none"
              stroke={GEIGER}
              strokeWidth={0.5}
              animate={{ r: [8, 20 + i * 8], opacity: [0.4, 0] }}
              transition={{ duration: 3, delay: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}
        </motion.g>

        {/* Label */}
        <motion.text
          x={200}
          y={260}
          textAnchor="middle"
          fill={STEEL}
          fontSize={7}
          fontFamily="var(--font-body)"
          letterSpacing="0.15em"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.6 } : {}}
          transition={{ delay: 3.5 }}
        >
          THE EMPIRE CRUMBLES — THE BOMB ENDURES
        </motion.text>
      </svg>
    </div>
  );
};
