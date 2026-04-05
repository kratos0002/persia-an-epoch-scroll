import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { AdminParagraph, Stamp, Redacted, DriftPanel } from './SeamSystem';

export const AftermathSection = ({ drift }: { drift: number }) => (
  <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: 'hsl(38 30% 85%)' }}>
    <div className="radcliffe-survey-grid radcliffe-grain absolute inset-0 opacity-50" />
    <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
      <RevealOnScroll>
        <Stamp>Aftermath</Stamp>
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[0.06em] text-radcliffe-ink uppercase mt-6 mb-12">
          Burning the Papers
        </h2>
      </RevealOnScroll>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        <DriftPanel side="left" drift={drift}>
          <RevealOnScroll>
            <AdminParagraph number="§8.1">
              Sir Cyril Radcliffe departed India on August 15, 1947 — the very day the two nations achieved independence. He never returned.
            </AdminParagraph>
            <AdminParagraph number="§8.2">
              Upon his return to the United Kingdom, Radcliffe destroyed all his notes, drafts, and the maps he had used during the commission's deliberations, ensuring that the precise logic behind many of his specific decisions would remain a mystery.
            </AdminParagraph>
            <AdminParagraph number="§8.3">
              He refused to accept his fee of <Redacted>40,000 rupees</Redacted>, stating that he could not profit from a task that had caused so much suffering.
            </AdminParagraph>
          </RevealOnScroll>
        </DriftPanel>

        <DriftPanel side="right" drift={drift}>
          <RevealOnScroll delay={0.2}>
            {/* Burning document effect */}
            <div className="relative border-2 border-radcliffe-grid/20 bg-radcliffe-cream p-6 overflow-hidden">
              <div className="space-y-3 font-survey text-[0.7rem] text-radcliffe-ink/80 leading-relaxed">
                <p><Redacted>Notes on the Punjab Award — Draft 1</Redacted></p>
                <p><Redacted>Memorandum re: Ferozepore Headworks</Redacted></p>
                <p><Redacted>Bengal boundary alternative tracings</Redacted></p>
                <p><Redacted>Personal diary entries, July-August 1947</Redacted></p>
                <p><Redacted>Correspondence with Mountbatten's office</Redacted></p>
                <p><Redacted>Canal network assessment documents</Redacted></p>
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
        </DriftPanel>
      </div>
    </div>
  </section>
);
