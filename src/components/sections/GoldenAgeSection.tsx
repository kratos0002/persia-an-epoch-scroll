import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { AnimatedCounter, ImagePlaceholder } from '@/components/visuals/AnimatedCounter';
import { SectionDivider, PersianPattern } from '@/components/visuals/PersianPattern';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const scholarData = [
  { year: 700, scholars: 5 },
  { year: 750, scholars: 15 },
  { year: 800, scholars: 40 },
  { year: 850, scholars: 75 },
  { year: 900, scholars: 120 },
  { year: 950, scholars: 160 },
  { year: 1000, scholars: 200 },
  { year: 1050, scholars: 180 },
  { year: 1100, scholars: 150 },
  { year: 1150, scholars: 130 },
  { year: 1200, scholars: 90 },
];

const luminaries = [
  { name: 'Al-Khwarizmi', field: 'Mathematics', years: '780–850', contribution: 'Invented algebra. His name gives us the word "algorithm." Without him, no computers, no modern science.' },
  { name: 'Ibn Sina (Avicenna)', field: 'Medicine', years: '980–1037', contribution: 'His Canon of Medicine was the standard medical textbook in Europe for 600 years — the most influential medical text ever written.' },
  { name: 'Omar Khayyam', field: 'Mathematics & Poetry', years: '1048–1131', contribution: 'Solved cubic equations geometrically. Created a calendar more accurate than the Gregorian — by 900 years. And wrote the Rubáiyát.' },
  { name: 'Ferdowsi', field: 'Literature', years: '940–1020', contribution: 'Spent 33 years writing the Shahnameh — 50,000 couplets preserving Persian mythology and history. The longest poem ever written by a single author.' },
  { name: 'Rumi', field: 'Poetry & Mysticism', years: '1207–1273', contribution: 'The best-selling poet in America — 800 years after his death. His works on love and divine truth transcend every cultural boundary.' },
  { name: 'Al-Biruni', field: 'Polymath', years: '973–1048', contribution: 'Calculated Earth\'s circumference to within 16 km of the actual value. Studied comparative religion centuries before anyone else.' },
];

export const GoldenAgeSection = () => (
  <section id="golden-age" className="relative py-20 md:py-32">
    <PersianPattern variant="hexagonal" opacity={0.04} color="hsl(160,45%,35%)" />

    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
      <RevealOnScroll className="text-center mb-16 md:mb-24">
        <p className="text-xs tracking-[0.3em] uppercase text-persian-emerald/60 mb-4">800–1200 CE · The House of Wisdom</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
          <span className="text-gradient-blue">The Islamic Golden Age</span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-body leading-relaxed">
          While Europe slept through its Dark Ages, Persian scholars
          preserved, translated, and advanced all of human knowledge.
          They didn't just carry the torch — they set the world on fire.
        </p>
      </RevealOnScroll>

      {/* Scholar output chart */}
      <RevealOnScroll className="mb-20">
        <div className="bg-card/50 border border-border/50 rounded-xl p-6 md:p-8">
          <h3 className="font-display text-xl mb-2 text-persian-cream/80">Notable Persian Scholars by Century</h3>
          <p className="text-sm text-muted-foreground mb-6 font-body">Major works produced in the Persian-Islamic world</p>
          <div className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scholarData}>
                <defs>
                  <linearGradient id="scholarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(160 45% 35%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(160 45% 35%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="year"
                  tick={{ fill: 'hsl(40 25% 70%)', fontSize: 11, fontFamily: 'Cormorant Garamond' }}
                  axisLine={{ stroke: 'hsl(220 15% 20%)' }}
                  tickLine={false}
                  tickFormatter={(v) => `${v} CE`}
                />
                <YAxis tick={{ fill: 'hsl(220 10% 50%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(220 18% 12%)',
                    border: '1px solid hsl(160 45% 35% / 0.3)',
                    borderRadius: '8px',
                    fontFamily: 'Cormorant Garamond',
                  }}
                  labelFormatter={(v) => `${v} CE`}
                />
                <Area
                  type="monotone"
                  dataKey="scholars"
                  stroke="hsl(160 45% 35%)"
                  strokeWidth={2}
                  fill="url(#scholarGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </RevealOnScroll>

      {/* Luminaries */}
      <div className="space-y-6">
        {luminaries.map((person, i) => (
          <RevealOnScroll key={i} delay={0.08 * i}>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start bg-card/30 border border-persian-emerald/10 rounded-lg p-6 md:p-8">
              <div className="md:w-48 shrink-0">
                <h3 className="font-display text-xl font-bold text-persian-emerald/80">{person.name}</h3>
                <p className="text-sm text-muted-foreground font-body">{person.field} · {person.years}</p>
              </div>
              <p className="text-foreground/75 font-body text-lg leading-relaxed">{person.contribution}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      {/* Shahnameh callout */}
      <RevealOnScroll className="mt-20">
        <div className="text-center max-w-2xl mx-auto">
          <ImagePlaceholder label="Shahnameh illuminated manuscript — Ferdowsi's Book of Kings" era="medieval" aspectRatio="3/2" className="mb-8" />
          <blockquote className="font-display text-2xl md:text-3xl italic text-persian-cream/70 leading-relaxed">
            "I suffered during these thirty years,<br />
            but I have revived the Persians with my verse."
          </blockquote>
          <p className="text-muted-foreground mt-4 font-body">— Ferdowsi, on completing the Shahnameh, 1010 CE</p>
        </div>
      </RevealOnScroll>
    </div>
    <SectionDivider className="mt-16" />
  </section>
);
