import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { PersiaMap } from '@/components/visuals/PersiaMap';
import { AnimatedCounter, ImagePlaceholder } from '@/components/visuals/AnimatedCounter';
import { SectionDivider, PersianPattern } from '@/components/visuals/PersianPattern';

export const SassanidSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgHue = useTransform(scrollYProgress, [0, 1], [220, 350]);

  return (
    <section id="sassanid" ref={ref} className="relative">
      {/* Immersive full-screen intro */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <PersianPattern variant="star" opacity={0.05} />
        <div className="absolute inset-0 bg-gradient-to-b from-persian-crimson/10 via-background to-background" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <RevealOnScroll>
            <p className="text-xs tracking-[0.3em] uppercase text-persian-crimson/60 mb-4">224–651 CE · The Last Great Persian Empire</p>
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-6">
              <span className="text-persian-crimson/90">The Sassanids</span>
            </h2>
            <p className="text-xl md:text-2xl text-foreground/70 font-body leading-relaxed">
              Ardashir I overthrew the Parthians and declared a revival of
              Achaemenid glory. For four centuries, the Sassanid Empire would
              rival Rome and Byzantium — and surpass both in art, science, and culture.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-20">
        {/* Map */}
        <RevealOnScroll className="mb-20">
          <div className="max-w-3xl mx-auto">
            <PersiaMap empire="sassanid" showCities showLabels highlightCities={['Persepolis', 'Susa', 'Isfahan', 'Ecbatana']} />
          </div>
        </RevealOnScroll>

        {/* Achievements grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-20">
          {[
            { title: 'Zoroastrian Revival', text: 'The Sassanids made Zoroastrianism the state religion, building magnificent fire temples across the empire. The sacred fires burned continuously for centuries.' },
            { title: 'Academy of Gondishapur', text: 'The world\'s first university and teaching hospital. Greek, Indian, and Persian scholars worked side by side, translating and advancing knowledge in medicine, astronomy, and philosophy.' },
            { title: 'Rivals to Rome', text: 'Emperor Shapur I captured Roman Emperor Valerian in 260 CE — the only time in history a Roman emperor was taken prisoner. The humiliation was carved into rock at Naqsh-e Rostam.' },
            { title: 'Art & Architecture', text: 'Sassanid art influenced everything from Byzantine mosaics to Tang Dynasty silk. Their rock reliefs, silver plates, and palace architecture set standards of beauty that endured for a millennium.' },
          ].map((item, i) => (
            <RevealOnScroll key={i} delay={0.1 * i}>
              <div className="border border-persian-crimson/15 bg-card/30 rounded-lg p-6 md:p-8">
                <h3 className="font-display text-xl font-bold text-persian-crimson/80 mb-3">{item.title}</h3>
                <p className="text-foreground/70 font-body leading-relaxed">{item.text}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Stats */}
        <RevealOnScroll>
          <div className="flex flex-wrap justify-center gap-12">
            <AnimatedCounter end={427} label="Years of dynasty" suffix="" />
            <AnimatedCounter end={35} label="Kings" suffix="" />
            <AnimatedCounter end={3500000} label="km² at peak" prefix="" suffix="" />
          </div>
        </RevealOnScroll>
      </div>
      <SectionDivider />
    </section>
  );
};
