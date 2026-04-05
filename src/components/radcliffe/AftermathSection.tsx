import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { AdminParagraph, Stamp, Redacted, DriftPanel, Underline, RedInk, MarginNote } from './SeamSystem';

// Strikethrough — text that's been "burned" / crossed out
const BurnedText = ({ children }: { children: ReactNode }) => (
  <span className="relative inline">
    <span className="relative z-10 opacity-40">{children}</span>
    <span
      className="absolute left-0 right-0 top-1/2 h-[2px] z-20"
      style={{
        background: 'hsl(15 70% 25% / 0.5)',
        transform: 'rotate(-0.5deg)',
      }}
    />
  </span>
);

export const AftermathSection = ({ drift }: { drift: number }) => (
  <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: 'hsl(38 30% 85%)' }}>
    <div className="radcliffe-survey-grid radcliffe-grain absolute inset-0 opacity-50" />
    <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-40">
      <RevealOnScroll>
        <Stamp>Aftermath</Stamp>
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[0.06em] text-radcliffe-ink uppercase mt-6 mb-12">
          Burning the Papers
        </h2>
      </RevealOnScroll>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        <DriftPanel side="left" drift={drift}>
          <RevealOnScroll>
            <div className="relative">
              <AdminParagraph number="§8.1">
                Sir Cyril Radcliffe departed India on <RedInk>August 15, 1947</RedInk> — <Underline>the very day the two nations achieved independence</Underline>. He never returned.
              </AdminParagraph>
              <MarginNote>fled the same day</MarginNote>
            </div>
            <div className="relative">
              <AdminParagraph number="§8.2">
                Upon his return to the United Kingdom, Radcliffe <RedInk>destroyed all his notes, drafts, and the maps</RedInk> he had used during the commission's deliberations, ensuring that <Underline>the precise logic behind many of his specific decisions would remain a mystery</Underline>.
              </AdminParagraph>
              <MarginNote>evidence burned</MarginNote>
            </div>
            <div className="relative">
              <AdminParagraph number="§8.3">
                He <Underline>refused to accept his fee</Underline> of <Redacted>40,000 rupees</Redacted>, stating that he could not <RedInk>profit from a task that had caused so much suffering</RedInk>.
              </AdminParagraph>
              <MarginNote side="left">conscience or guilt?</MarginNote>
            </div>
          </RevealOnScroll>
        </DriftPanel>

        <DriftPanel side="right" drift={drift}>
          <RevealOnScroll delay={0.2}>
            {/* Burning document effect */}
            <div className="relative border-2 border-radcliffe-grid/20 bg-radcliffe-cream p-6 overflow-hidden">
              <p className="font-survey text-[0.55rem] text-radcliffe-grid uppercase tracking-[0.3em] mb-4">Documents Destroyed</p>
              <div className="space-y-3 font-survey text-[0.7rem] text-radcliffe-ink/80 leading-relaxed">
                <p><BurnedText>Notes on the Punjab Award — Draft 1</BurnedText></p>
                <p><BurnedText>Memorandum re: Ferozepore Headworks</BurnedText></p>
                <p><BurnedText>Bengal boundary alternative tracings</BurnedText></p>
                <p><BurnedText>Personal diary entries, July-August 1947</BurnedText></p>
                <p><BurnedText>Correspondence with Mountbatten's office</BurnedText></p>
                <p><BurnedText>Canal network assessment documents</BurnedText></p>
              </div>
              {/* Burn gradient */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, transparent 40%, hsl(25 60% 20% / 0.3) 60%, hsl(15 70% 12% / 0.6) 80%, hsl(0 0% 5% / 0.8) 100%)',
                }}
              />
              {/* REFUSED stamp on cheque */}
              <div className="mt-8 border border-radcliffe-grid/30 p-4 relative bg-radcliffe-cream">
                <p className="font-survey text-[0.6rem] text-radcliffe-grid">Government of India</p>
                <p className="font-survey text-sm text-radcliffe-ink mt-1">Pay to Sir Cyril Radcliffe: ₹40,000</p>
                <div className="absolute top-2 right-2 radcliffe-stamp text-radcliffe-red border-radcliffe-red/60 rotate-[-8deg] text-base">
                  Refused
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.4}>
            <div className="mt-8 p-4 border-l-2 border-radcliffe-soot/20">
              <p className="font-body italic text-radcliffe-soot/70 leading-relaxed">
                "I had almost awarded Lahore to India before deciding the city's Muslim majority made that impossible."
              </p>
              <p className="font-survey text-[0.6rem] text-radcliffe-grid mt-3">— Radcliffe, 1971 interview</p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.5}>
            <div className="mt-6 p-4 border-l-2 border-radcliffe-red/30">
              <p className="font-body italic text-radcliffe-soot/70 leading-relaxed">
                "I am not proud of what I did. It was <RedInk>sloppy surgery</RedInk> — but there was no time for anything more careful."
              </p>
              <p className="font-survey text-[0.6rem] text-radcliffe-grid mt-3">— Radcliffe, 1971</p>
            </div>
          </RevealOnScroll>
        </DriftPanel>
      </div>
    </div>
  </section>
);
