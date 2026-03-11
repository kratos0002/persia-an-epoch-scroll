import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { BranchingTree } from '@/components/visuals/BranchingTree';
import { EraTransition } from '@/components/visuals/EraTransition';

const SAFFRON = '30 65% 45%';

export const BranchesSection = () => (
  <section id="branches" style={{ '--era-primary': SAFFRON } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse at center, hsl(${SAFFRON} / 0.04) 0%, transparent 70%)`
          }} />
          <BranchingTree
            activePhase={3}
            highlightBranch={
              activeStep === 0 ? 'zen' :
              activeStep === 1 ? 'pureland' :
              activeStep === 2 ? 'nichiren' :
              activeStep === 3 ? 'tibetan-schools' :
              undefined
            }
          />
        </div>
      )}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-body" style={{ color: 'hsl(150, 25%, 35%, 0.5)' }}>Zen / Chán</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4" style={{ color: 'hsl(150, 25%, 35%)' }}>The Branches Within</h2>
          <p className="font-body text-base leading-relaxed text-foreground/70">
            Zen stripped Buddhism to its essence: direct experience over scripture. Bodhidharma brought Chán to China; it flowered in Japan as Zen. Zazen (sitting meditation), koans (paradoxical riddles), and the aesthetics of wabi-sabi transformed Japanese culture.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-3" style={{ color: 'hsl(43, 70%, 55%)' }}>Pure Land</h3>
          <p className="font-body text-base leading-relaxed text-foreground/70">
            If Zen was for disciplined meditators, Pure Land was for everyone else. By chanting the name of Amitābha Buddha with sincere faith, anyone — farmer, artisan, warrior — could be reborn in the Western Paradise. It became the most popular form of Buddhism in East Asia.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-3" style={{ color: 'hsl(15, 55%, 50%)' }}>Nichiren</h3>
          <p className="font-body text-base leading-relaxed text-foreground/70">
            The Japanese monk Nichiren (1222–1282) declared the Lotus Sutra the supreme teaching and chanting <em>Nam-myoho-renge-kyo</em> the path to Buddhahood. Militant, controversial, and charismatic — his movement survives today as Soka Gakkai, with 12 million members worldwide.
          </p>
        </div>,
        <div key={3}>
          <h3 className="font-display text-xl font-bold mb-3" style={{ color: 'hsl(270, 55%, 55%)' }}>Tibetan Schools</h3>
          <p className="font-body text-base leading-relaxed text-foreground/70 mb-3">
            Tibet developed four major schools: Nyingma, Kagyu, Sakya, and Gelug. Each emphasized different tantric transmissions while sharing a common reverence for the guru-student relationship and the vast Tibetan canon.
          </p>
          <p className="font-body text-sm italic text-foreground/40">
            One tree, many branches — but the roots are always the same: the Four Noble Truths.
          </p>
        </div>,
      ]}
    />
    <EraTransition fromColor={SAFFRON} toColor={SAFFRON} year="Today" label="A Global Teaching" />
  </section>
);
