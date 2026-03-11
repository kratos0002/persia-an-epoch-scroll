import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { PersiaMap } from '@/components/visuals/PersiaMap';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { SectionDivider } from '@/components/visuals/PersianPattern';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const populationData = [
  { city: 'Merv', before: 200000, after: 0 },
  { city: 'Nishapur', before: 400000, after: 0 },
  { city: 'Herat', before: 300000, after: 10000 },
  { city: 'Baghdad', before: 1000000, after: 50000 },
  { city: 'Samarkand', before: 500000, after: 25000 },
];

export const MongolSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const redOverlay = useTransform(scrollYProgress, [0.2, 0.5], [0, 0.15]);

  return (
    <section id="mongol" ref={ref} className="relative py-20 md:py-32">
      {/* Red tint overlay for dramatic effect */}
      <motion.div
        className="absolute inset-0 bg-persian-terracotta pointer-events-none"
        style={{ opacity: redOverlay }}
      />

      <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
        <RevealOnScroll className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-persian-terracotta/70 mb-4">1219–1258 CE · Catastrophe</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            <span className="text-persian-terracotta">The Mongol Invasion</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-body leading-relaxed">
            Genghis Khan demanded tribute from the Khwarezmian Empire.
            When Shah Muhammad executed the Mongol envoys, he unleashed
            the most devastating military campaign in human history.
          </p>
        </RevealOnScroll>

        {/* Map */}
        <RevealOnScroll className="mb-16">
          <div className="max-w-3xl mx-auto">
            <PersiaMap
              empire="mongol"
              showCities
              highlightCities={['Samarkand', 'Ecbatana', 'Isfahan', 'Babylon']}
              showLabels
              routePath="M 700,100 C 650,120 600,140 550,160 C 500,180 450,200 400,190 C 350,180 310,200 280,220"
            />
          </div>
        </RevealOnScroll>

        {/* Population devastation chart */}
        <RevealOnScroll className="mb-16">
          <div className="bg-card/50 border border-persian-terracotta/20 rounded-xl p-6 md:p-8">
            <h3 className="font-display text-xl mb-2 text-persian-cream/80">City Populations: Before & After</h3>
            <p className="text-sm text-muted-foreground mb-6 font-body">The Mongol conquest erased cities that had thrived for millennia</p>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={populationData} barGap={2}>
                  <XAxis
                    dataKey="city"
                    tick={{ fill: 'hsl(40 25% 70%)', fontSize: 12, fontFamily: 'Cormorant Garamond' }}
                    axisLine={{ stroke: 'hsl(220 15% 20%)' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: 'hsl(220 10% 50%)', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v / 1000}k`}
                  />
                  <Bar dataKey="before" name="Before" fill="hsl(43 70% 45%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="after" name="After" fill="hsl(15 65% 35%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-8 mt-4 text-sm font-body">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{ background: 'hsl(43 70% 45%)' }} /> Before invasion</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{ background: 'hsl(15 65% 35%)' }} /> After invasion</span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Devastating stats */}
        <RevealOnScroll>
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-12 mb-12">
              <AnimatedCounter end={40} suffix="M" label="People killed" />
              <AnimatedCounter end={90} suffix="%" label="of Iranian plateau depopulated" />
              <AnimatedCounter end={800} suffix="" label="Years to recover pre-Mongol population" />
            </div>
            <blockquote className="font-display text-xl md:text-2xl italic text-persian-cream/60 max-w-2xl mx-auto">
              "They came, they mined, they burnt, they slew, they plundered, and they departed."
            </blockquote>
            <p className="text-muted-foreground mt-3 font-body">— Ata-Malik Juvayni, Persian historian, 1260</p>
          </div>
        </RevealOnScroll>
      </div>
      <SectionDivider className="mt-16" />
    </section>
  );
};
