import React from 'react';
import { motion } from 'framer-motion';
import { HistoricalImage } from '@/components/visuals/HistoricalImage';

interface StratumVisualProps {
  accent: string;
  earth: string;
}

const rise = {
  initial: { opacity: 0, y: 28, filter: 'blur(8px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.25 as const },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

const shellStyle = (accent: string, earth: string) => ({
  '--const-accent': accent,
  '--const-earth': earth,
} as React.CSSProperties);

const VisualShell = ({
  accent,
  earth,
  eyebrow,
  title,
  children,
}: React.PropsWithChildren<{ accent: string; earth: string; eyebrow: string; title: string }>) => (
  <motion.div
    {...rise}
    className="const-visual-shell overflow-hidden rounded-[2rem]"
    style={shellStyle(accent, earth)}
  >
    <div className="const-visual-topbar">
      <div>
        <p className="const-visual-eyebrow">{eyebrow}</p>
        <h3 className="const-visual-title">{title}</h3>
      </div>
      <div className="const-visual-chip">Primary visual</div>
    </div>
    <div className="const-visual-body">{children}</div>
  </motion.div>
);

export const OttomanSiegeVisual: React.FC<StratumVisualProps> = ({ accent, earth }) => (
  <VisualShell accent={accent} earth={earth} eyebrow="1453 · Breach point" title="Walls, cannon smoke, and a changed skyline">
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(220px,0.75fr)]">
      <div className="const-stage-panel relative min-h-[18rem] overflow-hidden rounded-[1.5rem]">
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[58%]"
          initial={{ opacity: 0.2, scaleY: 0.9 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: 'linear-gradient(180deg, hsl(var(--const-earth) / 0.16) 0%, hsl(var(--const-earth) / 0.58) 100%)' }}
        />
        <svg viewBox="0 0 640 360" className="absolute inset-0 h-full w-full">
          <motion.path d="M36 272 L132 272 L132 178 L172 178 L172 224 L206 224 L206 156 L242 156 L242 238 L284 238 L284 188 L318 188 L318 228 L362 228 L362 146 L398 146 L398 268 L474 268 L474 198 L510 198 L510 236 L550 236 L550 172 L588 172 L588 272 L604 272" fill="none" stroke="hsl(var(--foreground) / 0.9)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0, opacity: 0.35 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 1.4, ease: 'easeOut' }} />
          <motion.path d="M86 296 L86 112 L112 112 L112 296" stroke="hsl(var(--foreground) / 0.9)" strokeWidth="4" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }} />
          <motion.path d="M86 112 Q98 84 112 112" stroke="hsl(var(--foreground) / 0.9)" strokeWidth="4" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.55 }} />
          <motion.path d="M254 204 L286 178 L318 210" stroke="hsl(var(--destructive) / 0.8)" strokeWidth="5" fill="none" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.45 }} />
          <motion.circle cx="274" cy="204" r="30" fill="hsl(var(--const-accent) / 0.18)" initial={{ scale: 0.3, opacity: 0 }} whileInView={{ scale: [0.5, 1.15, 1], opacity: [0, 0.7, 0.3] }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.35 }} />
          <motion.path d="M64 250 Q148 214 230 212 T408 206 T574 164" fill="none" stroke="hsl(var(--const-accent) / 0.85)" strokeWidth="3" strokeDasharray="8 12" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 1.1, delay: 0.15 }} />
          <motion.circle cx="570" cy="162" r="7" fill="hsl(var(--const-accent))" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 240, damping: 16, delay: 1.1 }} />
        </svg>
        <div className="const-visual-caption-row"><span>St. Romanus breach</span><span>Skyline turns Ottoman</span></div>
      </div>
      <div className="space-y-4">
        <div className="const-note-card">
          <p className="const-note-label">What the eye should feel</p>
          <p className="const-note-text">The walls hold, split, then give way — the section reads like a siege diagram rather than a plain paragraph.</p>
        </div>
        <HistoricalImage src="/placeholder.svg" alt="Placeholder for Ottoman conquest imagery or a historical city view of Constantinople" caption="Evidence placeholder: conquest-era panorama, walls, or Hagia Sophia transformation" credit="Replace with source image" className="const-evidence-image" aspectRatio="4/3" />
      </div>
    </div>
  </VisualShell>
);

export const ByzantineDomeVisual: React.FC<StratumVisualProps> = ({ accent, earth }) => (
  <VisualShell accent={accent} earth={earth} eyebrow="537 · Imperial zenith" title="A dome of light over the richest city in Europe">
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(240px,0.8fr)]">
      <div className="const-stage-panel relative min-h-[18rem] overflow-hidden rounded-[1.5rem]">
        <svg viewBox="0 0 640 360" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="byzGlow" cx="50%" cy="38%" r="52%">
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.7)" />
              <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
            </radialGradient>
          </defs>
          <circle cx="320" cy="138" r="136" fill="url(#byzGlow)" />
          <motion.path d="M130 238 Q320 16 510 238" fill="none" stroke="hsl(var(--foreground) / 0.94)" strokeWidth="5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.2, ease: 'easeOut' }} />
          <motion.path d="M120 250 L520 250" fill="none" stroke="hsl(var(--foreground) / 0.75)" strokeWidth="4" initial={{ scaleX: 0, transformOrigin: 'center' }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} />
          {[168, 228, 288, 348, 408, 468].map((x, index) => <motion.line key={x} x1={x} y1="250" x2={x} y2="328" stroke="hsl(var(--foreground) / 0.52)" strokeWidth="3" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 + index * 0.06 }} />)}
          {Array.from({ length: 18 }).map((_, index) => {
            const x = 138 + (index % 6) * 62;
            const y = 92 + Math.floor(index / 6) * 34;
            return <motion.rect key={`${x}-${y}`} x={x} y={y} width="16" height="16" rx="2" fill={index % 2 === 0 ? 'hsl(var(--primary) / 0.75)' : 'hsl(var(--foreground) / 0.82)'} initial={{ opacity: 0, scale: 0.4, rotate: -10 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.5 + index * 0.03 }} />;
          })}
        </svg>
        <div className="const-visual-stats">
          <div><span className="const-stat-number">31m</span><span className="const-stat-label">dome span</span></div>
          <div><span className="const-stat-number">800y</span><span className="const-stat-label">walls held</span></div>
          <div><span className="const-stat-number">500k</span><span className="const-stat-label">people at peak</span></div>
        </div>
      </div>
      <HistoricalImage src="/placeholder.svg" alt="Placeholder for Hagia Sophia mosaic, dome interior, or Theodosian walls image" caption="Evidence placeholder: dome interior, wall plan, or gold tessera detail" credit="Replace with source image" className="const-evidence-image" aspectRatio="4/5" />
    </div>
  </VisualShell>
);

export const IconoclasmMosaicVisual: React.FC<StratumVisualProps> = ({ accent, earth }) => (
  <VisualShell accent={accent} earth={earth} eyebrow="726–843 · Image breaking" title="A face appears, then gets scraped away">
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(220px,0.8fr)]">
      <div className="const-stage-panel relative min-h-[18rem] overflow-hidden rounded-[1.5rem]">
        <svg viewBox="0 0 640 360" className="absolute inset-0 h-full w-full">
          {Array.from({ length: 13 }).map((_, row) => Array.from({ length: 16 }).map((__, col) => <motion.rect key={`${row}-${col}`} x={96 + col * 28} y={52 + row * 18} width="18" height="12" rx="1.5" fill={row % 2 === 0 ? 'hsl(var(--foreground) / 0.75)' : 'hsl(var(--primary) / 0.55)'} initial={{ opacity: 0.18 }} whileInView={{ opacity: 0.84 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: (row + col) * 0.01 }} />))}
          <motion.path d="M226 146 Q250 108 320 108 Q390 108 414 146 Q396 176 390 214 Q354 250 320 250 Q286 250 250 214 Q244 176 226 146 Z" fill="hsl(var(--card) / 0.72)" stroke="hsl(var(--foreground) / 0.72)" strokeWidth="3" initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.35 }} />
          <motion.path d="M268 162 Q288 146 304 162" stroke="hsl(var(--foreground) / 0.88)" strokeWidth="3" fill="none" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }} />
          <motion.path d="M336 162 Q352 146 372 162" stroke="hsl(var(--foreground) / 0.88)" strokeWidth="3" fill="none" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.78 }} />
          <motion.path d="M298 210 Q320 226 342 210" stroke="hsl(var(--foreground) / 0.88)" strokeWidth="3" fill="none" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.9 }} />
          {['M236 130 L408 232', 'M250 118 L422 220', 'M220 180 L394 276'].map((path, index) => <motion.path key={path} d={path} stroke="hsl(var(--destructive) / 0.82)" strokeWidth="7" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55, delay: 1 + index * 0.12 }} />)}
        </svg>
        <div className="const-visual-caption-row"><span>mosaic face</span><span>iconoclast strike marks</span></div>
      </div>
      <div className="space-y-4">
        <HistoricalImage src="/placeholder.svg" alt="Placeholder for defaced Byzantine icon or mosaic fragment" caption="Evidence placeholder: defaced icon, marble face, or shattered tesserae" credit="Replace with source image" className="const-evidence-image" aspectRatio="1/1" />
        <div className="const-note-card"><p className="const-note-label">Why this works</p><p className="const-note-text">The destruction is legible at a glance: beauty is present first, then visibly violated by doctrine.</p></div>
      </div>
    </div>
  </VisualShell>
);

export const ConstantineCityPlanVisual: React.FC<StratumVisualProps> = ({ accent, earth }) => (
  <VisualShell accent={accent} earth={earth} eyebrow="330 · Founding diagram" title="A provincial town becomes an imperial plan">
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(220px,0.8fr)]">
      <div className="const-stage-panel relative min-h-[18rem] overflow-hidden rounded-[1.5rem]">
        <svg viewBox="0 0 640 360" className="absolute inset-0 h-full w-full">
          <motion.path d="M110 264 Q170 194 258 162 T488 116" fill="none" stroke="hsl(var(--const-accent) / 0.9)" strokeWidth="4" strokeDasharray="6 10" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.15, ease: 'easeOut' }} />
          {[0,1,2,3].map((index) => <motion.circle key={index} cx={160 + index * 102} cy={220 - index * 28} r="16" fill="hsl(var(--card) / 0.92)" stroke="hsl(var(--primary) / 0.72)" strokeWidth="3" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.2 + index * 0.12 }} />)}
          <motion.rect x="410" y="120" width="110" height="64" rx="18" fill="hsl(var(--card) / 0.92)" stroke="hsl(var(--foreground) / 0.55)" strokeWidth="3" initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.7 }} />
          <motion.rect x="448" y="204" width="122" height="78" rx="39" fill="hsl(var(--card) / 0.92)" stroke="hsl(var(--foreground) / 0.55)" strokeWidth="3" initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.9 }} />
          {[
            { x: 144, y: 228, label: 'Forum' },
            { x: 246, y: 198, label: 'Column' },
            { x: 348, y: 170, label: 'Augustaion' },
            { x: 438, y: 154, label: 'Hippodrome' },
          ].map((item, index) => <motion.text key={item.label} x={item.x} y={item.y - 28} fill="hsl(var(--foreground) / 0.8)" fontSize="16" style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.08em', textTransform: 'uppercase' }} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: 0.45 + index * 0.08 }}>{item.label}</motion.text>)}
        </svg>
        <div className="const-visual-caption-row"><span>ceremonial spine</span><span>forum → hippodrome → imperial city</span></div>
      </div>
      <HistoricalImage src="/placeholder.svg" alt="Placeholder for Constantine-era city plan, coin, or hippodrome remains" caption="Evidence placeholder: city plan, solidus, or hippodrome archaeology" credit="Replace with source image" className="const-evidence-image" aspectRatio="4/5" />
    </div>
  </VisualShell>
);