import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { SectionDivider } from '@/components/visuals/PersianPattern';
import { HistoricalImage, HistoricalMap } from '@/components/visuals/HistoricalImage';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const battles = [
  { name: 'Naxos\n499', year: 499, persian: 200, greek: 0, result: 'Persian', desc: 'The Ionian Revolt ignites.' },
  { name: 'Marathon\n490', year: 490, persian: 25000, greek: 10000, result: 'Greek', desc: 'Outnumbered Athenians rout the Persian force. Pheidippides runs 42 km to deliver the news.' },
  { name: 'Thermopylae\n480', year: 480, persian: 100000, greek: 7000, result: 'Persian', desc: '300 Spartans hold the pass. Leonidas and his men buy Greece three crucial days.' },
  { name: 'Salamis\n480', year: 480, persian: 600, greek: 370, result: 'Greek', desc: 'Themistocles lures Xerxes\' fleet into narrow straits. The turning point of the wars.' },
  { name: 'Plataea\n479', year: 479, persian: 70000, greek: 40000, result: 'Greek', desc: 'The final land battle. Mardonius falls. Persia retreats from Europe forever.' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const data = payload[0]?.payload;
  return (
    <div className="bg-card/95 backdrop-blur border border-persian-gold/20 p-4 rounded-lg max-w-xs shadow-xl">
      <p className="font-display text-persian-gold font-bold">{data.name?.replace('\n', ' ')}</p>
      <p className="text-sm text-foreground/70 font-body mt-1">{data.desc}</p>
      <p className="text-xs text-muted-foreground mt-2">
        Result: <span className={data.result === 'Greek' ? 'text-persian-blue' : 'text-persian-gold'}>{data.result} victory</span>
      </p>
    </div>
  );
};

export const PersianWarsSection = () => (
  <section id="persian-wars" className="py-20 md:py-32">
    <div className="max-w-5xl mx-auto px-4 md:px-8">
      <RevealOnScroll className="text-center mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-persian-gold/60 mb-4">499–449 BCE · Clash of Civilizations</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gradient-gold">
          The Greco-Persian Wars
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-body">
          For fifty years, the world's greatest empire clashed with a collection
          of fiercely independent Greek city-states. These wars would define the
          boundary between East and West for millennia.
        </p>
      </RevealOnScroll>

      {/* Historical map */}
      <RevealOnScroll className="mb-12">
        <HistoricalMap
          src="/images/maps/persian-wars-map.png"
          alt="Map of the Persian Empire during the Greco-Persian Wars, 490 BCE"
          caption="The Persian Empire at the time of the Greco-Persian Wars, c. 490 BCE"
          className="max-w-3xl mx-auto"
        />
      </RevealOnScroll>

      {/* Thermopylae painting */}
      <RevealOnScroll className="mb-16">
        <HistoricalImage
          src="/images/thermopylae.jpg"
          alt="Leonidas at Thermopylae by Jacques-Louis David"
          caption="Leonidas at Thermopylae"
          credit="Jacques-Louis David, 1814"
          aspectRatio="4/3"
          className="max-w-3xl mx-auto"
        />
      </RevealOnScroll>

      {/* Battle comparison chart */}
      <RevealOnScroll className="mb-16">
        <div className="bg-card/50 border border-border/50 rounded-xl p-6 md:p-8">
          <h3 className="font-display text-xl mb-6 text-persian-cream/80">Forces Deployed (thousands)</h3>
          <div className="h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={battles} barGap={4}>
                <XAxis dataKey="name" tick={{ fill: 'hsl(40 25% 70%)', fontSize: 11, fontFamily: 'Cormorant Garamond' }} axisLine={{ stroke: 'hsl(220 15% 20%)' }} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(220 10% 50%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(220 15% 15%)' }} />
                <Bar dataKey="persian" name="Persian Forces" radius={[4, 4, 0, 0]}>
                  {battles.map((entry, i) => (
                    <Cell key={i} fill={entry.result === 'Persian' ? 'hsl(43 85% 55%)' : 'hsl(43 50% 30%)'} />
                  ))}
                </Bar>
                <Bar dataKey="greek" name="Greek Forces" radius={[4, 4, 0, 0]}>
                  {battles.map((entry, i) => (
                    <Cell key={i} fill={entry.result === 'Greek' ? 'hsl(215 65% 45%)' : 'hsl(215 30% 25%)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 mt-4 text-sm font-body">
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-persian-gold" /> Persian</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-persian-blue" /> Greek</span>
          </div>
        </div>
      </RevealOnScroll>

      {/* Key battles timeline */}
      <div className="space-y-8">
        {battles.map((battle, i) => (
          <RevealOnScroll key={i} delay={0.1 * i}>
            <div className="flex gap-4 md:gap-8 items-start">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${battle.result === 'Greek' ? 'bg-persian-blue' : 'bg-persian-gold'}`} />
                {i < battles.length - 1 && <div className="w-px h-16 bg-border/30" />}
              </div>
              <div className="pb-4">
                <p className="text-sm text-muted-foreground font-body">{battle.year} BCE</p>
                <h4 className="font-display text-lg font-bold text-foreground/90">{battle.name.split('\n')[0]}</h4>
                <p className="text-foreground/70 font-body mt-1">{battle.desc}</p>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
    <SectionDivider className="mt-16" />
  </section>
);
