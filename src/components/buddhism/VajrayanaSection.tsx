import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { BranchingTree } from '@/components/visuals/BranchingTree';
import { EraTransition } from '@/components/visuals/EraTransition';

const VAJRAYANA = '270 45% 45%';

export const VajrayanaSection = () => (
  <section id="vajrayana" style={{ '--era-primary': VAJRAYANA } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse at center, hsl(${VAJRAYANA} / 0.05) 0%, transparent 70%)`
          }} />
          <BranchingTree
            activePhase={activeStep >= 2 ? 3 : 2}
            highlightBranch={activeStep <= 1 ? 'vajrayana' : undefined}
          />
        </div>
      )}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-body" style={{ color: `hsl(${VAJRAYANA} / 0.5)` }}>~700 CE · Tibet</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4" style={{ color: `hsl(${VAJRAYANA})` }}>The Diamond Path</h2>
          <p className="font-body text-base leading-relaxed text-foreground/70">
            Vajrayana — the "Diamond Vehicle" — emerged from Mahayana's esoteric traditions. It promised enlightenment not in countless lifetimes but in <em>this one</em>, through tantric practices, mantras, and direct guru transmission.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-3" style={{ color: `hsl(${VAJRAYANA})` }}>Padmasambhava</h3>
          <p className="font-body text-base leading-relaxed text-foreground/70">
            The Indian tantric master Padmasambhava brought Vajrayana to Tibet in the 8th century, reportedly subduing local demons and converting them into dharma protectors. He founded the Nyingma school — Tibet's oldest Buddhist lineage.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-3" style={{ color: `hsl(${VAJRAYANA})` }}>The Dalai Lama Lineage</h3>
          <p className="font-body text-base leading-relaxed text-foreground/70 mb-3">
            By the 15th century, Tibet developed the tulku system — enlightened beings who chose to reincarnate to continue teaching. The Dalai Lama, now in his 14th incarnation, became the most recognized Buddhist leader in the world.
          </p>
          <p className="font-body text-sm italic text-foreground/40">
            From Tibet, Vajrayana spread to Mongolia, Bhutan, and parts of Nepal — the roof of the world became Buddhism's highest fortress.
          </p>
        </div>,
      ]}
    />
    <EraTransition fromColor={VAJRAYANA} toColor="30 65% 45%" year="~1200 CE" label="The Branches Within" />
  </section>
);
