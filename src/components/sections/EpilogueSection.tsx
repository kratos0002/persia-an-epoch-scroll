import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { PersianPattern } from '@/components/visuals/PersianPattern';

const timelineEras = [
  { year: '550 BCE', label: 'Achaemenid Empire', color: 'hsl(43 85% 55%)', width: '18%' },
  { year: '330 BCE', label: 'Hellenistic Period', color: 'hsl(270 40% 45%)', width: '5%' },
  { year: '247 BCE', label: 'Parthian Empire', color: 'hsl(350 55% 42%)', width: '19%' },
  { year: '224 CE', label: 'Sassanid Empire', color: 'hsl(350 60% 38%)', width: '17%' },
  { year: '651 CE', label: 'Islamic Golden Age', color: 'hsl(160 45% 35%)', width: '22%' },
  { year: '1219 CE', label: 'Mongol/Timurid', color: 'hsl(15 55% 40%)', width: '5%' },
  { year: '1501 CE', label: 'Safavid Empire', color: 'hsl(215 65% 35%)', width: '8%' },
  { year: '1905 CE', label: 'Modern Era', color: 'hsl(220 30% 45%)', width: '6%' },
];

export const EpilogueSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section id="epilogue" ref={ref} className="relative py-20 md:py-32 min-h-screen">
      <PersianPattern variant="star" opacity={0.03} />

      <motion.div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10" style={{ scale, opacity }}>
        <RevealOnScroll className="text-center mb-16 md:mb-24">
          <p className="text-xs tracking-[0.3em] uppercase text-persian-gold/60 mb-4">2,500 Years at a Glance</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-gradient-gold">
            Legacy
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-body leading-relaxed">
            From Cyrus to the present day, Persian civilization has shaped the world
            in ways both visible and hidden. This is a civilization that refused
            to disappear.
          </p>
        </RevealOnScroll>

        {/* Compressed timeline bar */}
        <RevealOnScroll className="mb-20">
          <div className="bg-card/30 border border-border/30 rounded-xl p-6 md:p-10">
            <h3 className="font-display text-lg mb-6 text-persian-cream/70 text-center">2,500 Years of Persian Civilization</h3>
            <div className="flex rounded-lg overflow-hidden h-12 md:h-16 mb-4">
              {timelineEras.map((era, i) => (
                <motion.div
                  key={i}
                  className="relative group cursor-pointer"
                  style={{ width: era.width, background: era.color }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  whileHover={{ filter: 'brightness(1.3)' }}
                >
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-persian-cream/70 font-body">{era.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground/50 font-body mt-8">
              <span>550 BCE</span>
              <span>0 CE</span>
              <span>500 CE</span>
              <span>1000 CE</span>
              <span>1500 CE</span>
              <span>2025 CE</span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Legacy points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {[
            { title: 'Language', text: 'Persian (Farsi) is one of the oldest living languages, spoken by 110 million people. Its poetry — Rumi, Hafez, Khayyam — is read worldwide.' },
            { title: 'Governance', text: 'The Achaemenid model of provincial administration, religious tolerance, and standardized law influenced every empire that followed — including Rome.' },
            { title: 'Science', text: 'Algebra, the algorithm, the modern hospital, advances in astronomy and optics — the Islamic Golden Age, driven by Persian scholars, built the foundations of modern science.' },
            { title: 'Art', text: 'Persian calligraphy, miniature painting, carpet weaving, and architecture — from the Blue Mosque to the Taj Mahal — Persian aesthetics shaped the visual culture of half the world.' },
          ].map((item, i) => (
            <RevealOnScroll key={i} delay={0.1 * i}>
              <div className="border border-persian-gold/10 bg-card/20 rounded-lg p-6 md:p-8">
                <h4 className="font-display text-xl font-bold text-persian-gold/70 mb-3">{item.title}</h4>
                <p className="text-foreground/65 font-body leading-relaxed">{item.text}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Final quote */}
        <RevealOnScroll className="text-center max-w-2xl mx-auto">
          <div className="py-12">
            <PersianPattern variant="border" />
            <blockquote className="font-display text-2xl md:text-4xl italic text-persian-cream/80 leading-relaxed my-8">
              "The wound is the place where the Light enters you."
            </blockquote>
            <p className="text-persian-gold/60 font-body text-lg">— Jalāl ad-Dīn Rūmī</p>
            <PersianPattern variant="border" className="mt-8" />
          </div>

          <motion.p
            className="text-sm text-muted-foreground/40 font-body mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 1 }}
          >
            An Epoch Lives Visual Essay · The History of Persia
          </motion.p>
        </RevealOnScroll>
      </motion.div>
    </section>
  );
};
