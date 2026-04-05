import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { AdminParagraph, Stamp, DriftPanel } from './SeamSystem';

export const ArchitectSection = ({ drift }: { drift: number }) => (
  <section className="relative py-24 md:py-32 radcliffe-bg radcliffe-survey-grid radcliffe-grain overflow-hidden">
    <div className="max-w-5xl mx-auto px-6 md:px-12">
      <RevealOnScroll>
        <div className="flex items-start gap-3 mb-2">
          <Stamp>Personnel File</Stamp>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[0.06em] text-radcliffe-ink uppercase mt-6 mb-12">
          The Architect
        </h2>
      </RevealOnScroll>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        {/* Left: Administrative dossier */}
        <DriftPanel side="left" drift={drift}>
          <RevealOnScroll>
            <div className="border border-radcliffe-grid/20 bg-radcliffe-cream p-6 md:p-8 relative">
              {/* Passport-style frame */}
              <div className="w-24 h-32 border-2 border-radcliffe-grid/30 bg-radcliffe-aged/50 mx-auto mb-6 flex items-center justify-center">
                <span className="font-survey text-[0.55rem] text-radcliffe-grid/40 uppercase tracking-widest text-center">Photo<br/>Unavailable</span>
              </div>
              <div className="text-center mb-6">
                <h3 className="font-display text-xl font-bold text-radcliffe-ink">Sir Cyril Radcliffe</h3>
                <p className="font-survey text-[0.7rem] text-radcliffe-grid mt-1">Viscount Radcliffe, GCMG, KC</p>
              </div>
              <div className="space-y-2 font-survey text-[0.7rem] text-radcliffe-ink/80">
                <div className="flex justify-between border-b border-radcliffe-grid/10 pb-1">
                  <span className="text-radcliffe-grid">Profession</span>
                  <span>Barrister, Chancery Bar</span>
                </div>
                <div className="flex justify-between border-b border-radcliffe-grid/10 pb-1">
                  <span className="text-radcliffe-grid">Prior India Visit</span>
                  <span className="text-radcliffe-red font-bold">None</span>
                </div>
                <div className="flex justify-between border-b border-radcliffe-grid/10 pb-1">
                  <span className="text-radcliffe-grid">Cartographic Training</span>
                  <span className="text-radcliffe-red font-bold">None</span>
                </div>
                <div className="flex justify-between border-b border-radcliffe-grid/10 pb-1">
                  <span className="text-radcliffe-grid">Appointed</span>
                  <span>June 30, 1947</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-radcliffe-grid">Selection Criterion</span>
                  <span className="italic">"Blank slate"</span>
                </div>
              </div>
              {/* Violet stamp overlay */}
              <div className="absolute top-4 right-4 radcliffe-stamp opacity-60">
                Approved
              </div>
            </div>
          </RevealOnScroll>
        </DriftPanel>

        {/* Right: Administrative voice */}
        <DriftPanel side="right" drift={drift}>
          <RevealOnScroll delay={0.2}>
            <AdminParagraph number="§1.1">
              The appointment of Sir Cyril Radcliffe as the joint chairman of the Punjab and Bengal Boundary Commissions was a decision rooted in the British colonial administration's desperate need for perceived neutrality. The primary qualification for the boundary-maker was not regional expertise but a lack of prior engagement with Indian politics.
            </AdminParagraph>
            <AdminParagraph number="§1.2">
              Lord Mountbatten, the last Viceroy of India, and the leaders of both the Indian National Congress and the Muslim League wanted an outsider who was a "blank slate," untainted by any perceived leanings toward either Hindu or Muslim interests.
            </AdminParagraph>
            <AdminParagraph number="§1.3">
              Radcliffe himself accepted the task with a sense of professional duty, though he was reportedly unaware of the extreme temporal constraints until he arrived in Delhi. Upon being told that he had less than six weeks to complete the task, Radcliffe was struck by the "gargantuan" nature of the undertaking.
            </AdminParagraph>
          </RevealOnScroll>
        </DriftPanel>
      </div>
    </div>
  </section>
);
