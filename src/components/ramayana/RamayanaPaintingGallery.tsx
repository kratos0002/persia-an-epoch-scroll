import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RM } from '@/components/visuals/ramayanaMapData';

const PAINTINGS = [
  {
    src: '/images/ramayana/rama-exile-forest.jpg',
    title: 'The Exile',
    caption: 'Pahari school, c. 18th century',
  },
  {
    src: '/images/ramayana/bharata-meets-rama.jpg',
    title: 'Bharat Milap',
    caption: 'Mughal Ramayana, c. 16th century',
  },
  {
    src: '/images/ramayana/ravana-abducts-sita.jpg',
    title: 'The Abduction',
    caption: 'Indian miniature painting',
  },
  {
    src: '/images/ramayana/jatayu-fights-ravana.jpg',
    title: 'Jatayu\'s Stand',
    caption: 'Indian miniature painting',
  },
  {
    src: '/images/ramayana/ravi-varma-jatayu.jpg',
    title: 'The Fallen Warrior',
    caption: 'Raja Ravi Varma, c. 1895',
  },
  {
    src: '/images/ramayana/hanuman-sita-ashokavana.jpg',
    title: 'The Ashoka Garden',
    caption: 'Indian miniature painting',
  },
  {
    src: '/images/ramayana/battle-at-lanka.jpg',
    title: 'Battle at Lanka',
    caption: 'Mewar Ramayana, Udaipur, 1649',
  },
  {
    src: '/images/ramayana/hanuman-lanka-burn.jpg',
    title: 'Lanka Burns',
    caption: 'Indian miniature painting',
  },
  {
    src: '/images/ramayana/rama-coronation.jpg',
    title: 'The Coronation',
    caption: 'Mughal Ramayana',
  },
];

export const RamayanaPaintingGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  // Parallax scroll — paintings drift left as you scroll down
  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-15%']);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-16"
      style={{ background: RM.PARCHMENT }}
    >
      {/* Section label */}
      <div className="text-center mb-10">
        <p
          className="text-[9px] tracking-[0.4em] uppercase font-body font-semibold mb-3"
          style={{ color: RM.VERMILLION }}
        >
          From the Painted Manuscripts
        </p>
        <p
          className="font-body text-sm max-w-lg mx-auto leading-relaxed"
          style={{ color: `${RM.INK}99` }}
        >
          For centuries, the Ramayana has been told through miniature paintings —
          jewel-toned folios from the Mughal, Mewar, and Pahari schools.
        </p>
      </div>

      {/* Horizontal scroll gallery with parallax */}
      <motion.div
        className="flex gap-5 px-10"
        style={{ x }}
      >
        {PAINTINGS.map((painting, i) => (
          <div
            key={i}
            className="flex-shrink-0 group"
            style={{ width: 260 }}
          >
            {/* Painting frame */}
            <div
              className="relative overflow-hidden"
              style={{
                border: `3px solid ${RM.GOLD_LEAF}`,
                boxShadow: `inset 0 0 0 1px ${RM.VERMILLION}40, 0 6px 24px rgba(0,0,0,0.1)`,
                aspectRatio: '3/4',
              }}
            >
              <img
                src={painting.src}
                alt={painting.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Subtle vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.15)',
                }}
              />
            </div>
            {/* Caption */}
            <p
              className="font-display text-sm font-semibold mt-3"
              style={{ color: RM.INK }}
            >
              {painting.title}
            </p>
            <p
              className="font-body text-[10px] mt-0.5"
              style={{ color: RM.OCHRE }}
            >
              {painting.caption}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Fade edges */}
      <div
        className="absolute top-0 left-0 w-20 h-full pointer-events-none z-10"
        style={{ background: `linear-gradient(to right, ${RM.PARCHMENT}, transparent)` }}
      />
      <div
        className="absolute top-0 right-0 w-20 h-full pointer-events-none z-10"
        style={{ background: `linear-gradient(to left, ${RM.PARCHMENT}, transparent)` }}
      />
    </section>
  );
};
