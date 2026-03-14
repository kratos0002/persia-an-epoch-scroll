import React from 'react';
import { motion } from 'framer-motion';
import { HormuzHero } from '@/components/hormuz/HormuzHero';
import { PortugalSection } from '@/components/hormuz/PortugalSection';
import { BritishGulfSection } from '@/components/hormuz/BritishGulfSection';
import { TankerWarSection } from '@/components/hormuz/TankerWarSection';
import { BottleneckSection } from '@/components/hormuz/BottleneckSection';
import { ChokepointsSection } from '@/components/hormuz/ChokepointsSection';
import { HormuzEpilogue } from '@/components/hormuz/HormuzEpilogue';
import { HormuzProgressTimeline } from '@/components/hormuz/HormuzProgressTimeline';
import { HormuzSectionNav } from '@/components/hormuz/HormuzSectionNav';
import { useHormuzScrollSpy } from '@/hooks/useHormuzScrollSpy';
import { CommentsSection } from '@/components/site/CommentsSection';
import { SiteFooter } from '@/components/site/SiteFooter';
import { EditionBadge } from '@/components/scroll/EditionBadge';
import { MobileNotice } from '@/components/site/MobileNotice';

const NAVY = 'hsl(215, 45%, 8%)';
const TEAL = 'hsl(195, 55%, 35%)';
const SMOKE = 'hsl(210, 15%, 40%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';

const TransitionBeat = ({ quote, className }: { quote: string; className?: string }) => (
  <div className={`relative h-[70vh] flex items-center justify-center px-8 ${className ?? ''}`} style={{ background: NAVY }}>
    <motion.p
      className="font-display text-xl md:text-2xl lg:text-3xl italic leading-relaxed text-center max-w-xl"
      style={{ color: TEAL }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20%' }}
      transition={{ duration: 1.2 }}
    >
      {quote}
    </motion.p>
  </div>
);

const Hormuz = () => {
  const { activeSection, globalProgress } = useHormuzScrollSpy();

  return (
    <div className="relative" style={{ background: NAVY }}>
      <MobileNotice />
      <HormuzSectionNav activeSection={activeSection} />
      <HormuzProgressTimeline activeSection={activeSection} globalProgress={globalProgress} />
      <HormuzHero />
      <EditionBadge essayId="hormuz" />

      <PortugalSection />

      <TransitionBeat quote="For three centuries, Portugal held the throat. Then came oil." />

      <BritishGulfSection />

      <TransitionBeat quote="The Gulf had always been about trade. Now it was about survival." />

      <TankerWarSection />
      <BottleneckSection />
      <ChokepointsSection />
      <HormuzEpilogue />
      <CommentsSection pageSlug="hormuz" />
      <SiteFooter />
    </div>
  );
};

export default Hormuz;
