import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { DriftPanel, Stamp, AdminParagraph, Underline, RedInk, MarginNote } from './SeamSystem';
import { COMMISSION_MEMBERS } from './radcliffeData';

const JudgeCard = ({ name, role }: { name: string; role: string }) => (
  <div className="border border-radcliffe-grid/20 bg-radcliffe-cream p-4 font-survey">
    <p className="text-[0.8rem] text-radcliffe-ink font-medium">{name}</p>
    <p className="text-[0.6rem] text-radcliffe-grid mt-1 uppercase tracking-widest">{role}</p>
  </div>
);

const CommissionPanel = ({
  title,
  congress,
  league,
}: {
  title: string;
  congress: { name: string; role: string }[];
  league: { name: string; role: string }[];
}) => (
  <div className="mb-12">
    <h3 className="font-display text-xl font-bold text-radcliffe-ink tracking-wide uppercase mb-6">{title}</h3>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="font-survey text-[0.55rem] text-radcliffe-saffron uppercase tracking-[0.3em] mb-3">Congress Nominees</p>
        <div className="space-y-3">
          {congress.map(j => <JudgeCard key={j.name} {...j} />)}
        </div>
      </div>
      <div>
        <p className="font-survey text-[0.55rem] text-radcliffe-green uppercase tracking-[0.3em] mb-3">Muslim League Nominees</p>
        <div className="space-y-3">
          {league.map(j => <JudgeCard key={j.name} {...j} />)}
        </div>
      </div>
    </div>
  </div>
);

export const CommissionSection = ({ drift }: { drift: number }) => (
  <section className="relative py-24 md:py-32 radcliffe-bg radcliffe-survey-grid radcliffe-grain overflow-hidden">
    <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-40">
      <RevealOnScroll>
        <Stamp>Deadlocked</Stamp>
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[0.06em] text-radcliffe-ink uppercase mt-6 mb-4">
          The Commission
        </h2>
        <p className="font-survey text-[0.75rem] text-radcliffe-grid mb-12 max-w-xl">
          Two commissions. Eight judges. Zero consensus. Radcliffe served as joint chairman of both, making all contested decisions unilaterally.
        </p>
      </RevealOnScroll>

      <div className="grid md:grid-cols-2 gap-8 md:gap-16">
        <DriftPanel side="left" drift={drift}>
          <RevealOnScroll>
            <CommissionPanel title="Punjab" {...COMMISSION_MEMBERS.punjab} />
          </RevealOnScroll>
        </DriftPanel>
        <DriftPanel side="right" drift={drift}>
          <RevealOnScroll delay={0.15}>
            <CommissionPanel title="Bengal" {...COMMISSION_MEMBERS.bengal} />
          </RevealOnScroll>
        </DriftPanel>
      </div>

      <RevealOnScroll delay={0.3}>
        <p className="font-body italic text-center text-radcliffe-soot/70 mt-12 max-w-lg mx-auto">
          "The South Asian judges functioned effectively as advocates for their respective political parties, leaving Radcliffe to make the final decisions unilaterally."
        </p>
      </RevealOnScroll>

      {/* Terms of Reference & "Other Factors" */}
      <RevealOnScroll delay={0.4}>
        <div className="max-w-2xl mx-auto mt-16">
          <Stamp>Terms of Reference</Stamp>
          <div className="mt-6 relative">
            <AdminParagraph number="§2.1">
              The formal instructions were deceptively simple: to demarcate the boundaries <Underline>"on the basis of ascertaining the contiguous majority areas of Muslims and non-Muslims"</Underline>. This appeared straightforward — until the critical caveat.
            </AdminParagraph>
            <MarginNote>the escape clause</MarginNote>
          </div>
          <div className="relative">
            <AdminParagraph number="§2.2">
              The mandate continued: <RedInk>"In doing so, it will also take into account other factors."</RedInk> These factors — <Underline>infrastructure networks, irrigation systems, economic integrity, and strategic defense</Underline> — gave Radcliffe legal grounds to override strict demographic lines. Every controversial decision in both awards traces back to this single phrase.
            </AdminParagraph>
            <MarginNote>4 words that moved millions</MarginNote>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);
