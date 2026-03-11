import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { HistoricalImage } from '@/components/visuals/HistoricalImage';
import { PersiaMap } from '@/components/visuals/PersiaMap';
import { SectionDivider } from '@/components/visuals/PersianPattern';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area } from 'recharts';

const modernizationData = [
  { year: 1900, literacy: 5, urban: 20 },
  { year: 1920, literacy: 8, urban: 22 },
  { year: 1940, literacy: 15, urban: 28 },
  { year: 1960, literacy: 30, urban: 35 },
  { year: 1976, literacy: 50, urban: 47 },
  { year: 1990, literacy: 65, urban: 56 },
  { year: 2000, literacy: 80, urban: 64 },
  { year: 2020, literacy: 97, urban: 76 },
];

const oilData = [
  { year: 1910, revenue: 0.1 },
  { year: 1920, revenue: 0.5 },
  { year: 1930, revenue: 2 },
  { year: 1940, revenue: 5 },
  { year: 1950, revenue: 10 },
  { year: 1960, revenue: 20 },
  { year: 1970, revenue: 50 },
  { year: 1974, revenue: 120 },
  { year: 1980, revenue: 80 },
  { year: 1990, revenue: 40 },
  { year: 2000, revenue: 50 },
  { year: 2010, revenue: 100 },
  { year: 2020, revenue: 30 },
];

const revolutionEvents = [
  { date: 'Jan 1978', event: 'Qom protests against newspaper article insulting Khomeini' },
  { date: 'Sep 1978', event: 'Black Friday — martial law declared, dozens killed in Jaleh Square' },
  { date: 'Dec 1978', event: 'Millions march during Tasu\'a and Ashura — largest protest in history' },
  { date: 'Jan 1979', event: 'Shah leaves Iran "on vacation" — never returns' },
  { date: 'Feb 1, 1979', event: 'Khomeini returns from 14 years of exile to millions of supporters' },
  { date: 'Feb 11, 1979', event: 'Military declares neutrality. The monarchy falls. Islamic Republic declared.' },
];

export const ModernSection = () => {
  return (
    <section id="modern" className="relative">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-20 md:py-32">
        <RevealOnScroll className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground/60 mb-4">1905–1979 · The Modern Era</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-foreground/90">
            Revolution & Rebirth
          </h2>
        </RevealOnScroll>

        {/* Constitutional Revolution */}
        <RevealOnScroll className="mb-20">
          <div className="border border-border/50 bg-card/30 rounded-lg p-8 md:p-12 max-w-3xl mx-auto">
            <div className="text-center border-b border-border/30 pb-6 mb-6">
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground/50 mb-2">Tehran, 1906</p>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground/80">
                CONSTITUTION PROCLAIMED
              </h3>
              <p className="text-sm text-muted-foreground font-body mt-2">
                Shah Forced to Accept Parliament · First Democracy in the Middle East
              </p>
            </div>
            <p className="text-foreground/70 font-body text-lg leading-relaxed">
              In 1905, Persian merchants, clerics, and intellectuals united against
              the Qajar shah's incompetence and foreign concessions. They demanded
              — and won — a constitution and parliament. Iran became the first
              constitutional monarchy in the Middle East.
            </p>
          </div>
        </RevealOnScroll>

        {/* Pahlavi charts */}
        <RevealOnScroll className="mb-16">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground/80">The Pahlavi Dynasty</h3>
            <p className="text-muted-foreground font-body mt-2">1925–1979: Rapid modernization at the cost of political freedom</p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <RevealOnScroll>
            <div className="bg-card/50 border border-border/50 rounded-xl p-6">
              <h4 className="font-display text-lg mb-4 text-persian-cream/80">Literacy & Urbanization (%)</h4>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={modernizationData}>
                    <XAxis dataKey="year" tick={{ fill: 'hsl(40 25% 70%)', fontSize: 10 }} axisLine={{ stroke: 'hsl(220 15% 20%)' }} tickLine={false} />
                    <YAxis tick={{ fill: 'hsl(220 10% 50%)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip contentStyle={{ background: 'hsl(220 18% 12%)', border: '1px solid hsl(220 15% 25%)', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="literacy" stroke="hsl(43 85% 55%)" strokeWidth={2} dot={false} name="Literacy %" />
                    <Line type="monotone" dataKey="urban" stroke="hsl(215 65% 45%)" strokeWidth={2} dot={false} name="Urban %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="bg-card/50 border border-border/50 rounded-xl p-6">
              <h4 className="font-display text-lg mb-4 text-persian-cream/80">Oil Revenue ($B adjusted)</h4>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={oilData}>
                    <defs>
                      <linearGradient id="oilGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(43 85% 55%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(43 85% 55%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" tick={{ fill: 'hsl(40 25% 70%)', fontSize: 10 }} axisLine={{ stroke: 'hsl(220 15% 20%)' }} tickLine={false} />
                    <YAxis tick={{ fill: 'hsl(220 10% 50%)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: 'hsl(220 18% 12%)', border: '1px solid hsl(220 15% 25%)', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(43 85% 55%)" fill="url(#oilGrad)" strokeWidth={2} name="Revenue ($B)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* 1979 Revolution */}
        <div className="relative py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <RevealOnScroll>
              <p className="text-xs tracking-[0.3em] uppercase text-persian-crimson/70 mb-4">1979 · The World Turns</p>
              <h3 className="font-display text-4xl md:text-5xl font-bold mb-8 text-persian-crimson/90">
                The Islamic Revolution
              </h3>

              <HistoricalImage
                src="/images/shah-leaving-1979.jpg"
                alt="Shah Mohammad Reza Pahlavi and Shahbanu Farah leaving Iran, January 16, 1979"
                caption="The Shah and Shahbanu leave Iran for the last time"
                credit="January 16, 1979 · Wikimedia Commons"
                aspectRatio="4/5"
                className="max-w-sm mx-auto mb-8"
              />

              <p className="text-lg text-foreground/70 font-body leading-relaxed mb-12">
                In a revolution that stunned the world, millions of Iranians
                overthrew the Pahlavi dynasty. The 2,500-year-old monarchy — traced
                from Cyrus the Great — ended.
              </p>
            </RevealOnScroll>

            <div className="text-left max-w-lg mx-auto space-y-6">
              {revolutionEvents.map((item, i) => (
                <RevealOnScroll key={i} delay={0.08 * i}>
                  <div className="flex gap-4 items-start">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-persian-crimson/70" />
                      {i < revolutionEvents.length - 1 && <div className="w-px h-12 bg-persian-crimson/20" />}
                    </div>
                    <div>
                      <p className="text-sm text-persian-crimson/60 font-body">{item.date}</p>
                      <p className="text-foreground/80 font-body">{item.event}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>

        {/* Modern Iran stats */}
        <RevealOnScroll className="mt-16">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground/70">Iran Today</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <AnimatedCounter end={88} suffix="M" label="Population (2024)" />
            <AnimatedCounter end={97} suffix="%" label="Literacy rate" />
            <AnimatedCounter end={70} suffix="%" label="Under 40 years old" />
            <AnimatedCounter end={4} suffix="th" label="Largest oil reserves" />
          </div>
        </RevealOnScroll>
      </div>
      <SectionDivider />
    </section>
  );
};
