import React from 'react';
import { motion } from 'framer-motion';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

const About = () => {
  return (
    <div className="bg-[hsl(38,30%,94%)] min-h-screen text-[hsl(25,20%,20%)]">
      <SiteHeader />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] tracking-[0.35em] uppercase text-[hsl(25,15%,55%)] mb-4 font-body font-semibold">
              About
            </p>

            <h1 className="font-display text-4xl md:text-5xl font-black leading-tight text-[hsl(25,30%,18%)] mb-8">
              History should be an experience, not a lecture.
            </h1>

            <div className="space-y-6 font-body text-lg text-[hsl(25,15%,35%)] leading-relaxed">

              {/* ── Who ──────────────────────────────── */}

              <p>
                <strong className="text-[hsl(25,25%,22%)]">Epoch Lives</strong> is built by VT — a designer and builder who treats knowledge the way a museum curator treats objects: with care, context, and respect for the audience's intelligence.
              </p>

              <p>
                Epoch Lives is one part of a larger knowledge-first ecosystem. The same philosophy — no gamification, no FOMO, content is the reward — runs through everything:
              </p>

              <ul className="space-y-3 pl-1">
                <li className="flex gap-3">
                  <span className="text-[hsl(25,30%,55%)] shrink-0">—</span>
                  <span>
                    <a href="https://etymology.life" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-[hsl(25,30%,30%)] hover:text-[hsl(25,40%,20%)] transition-colors font-medium">etymology.life</a>
                    {' '}— the origin stories of words
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[hsl(25,30%,55%)] shrink-0">—</span>
                  <span>
                    <a href="https://marginalia.life" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-[hsl(25,30%,30%)] hover:text-[hsl(25,40%,20%)] transition-colors font-medium">marginalia.life</a>
                    {' '}— a curated digital library of public domain literature, short stories, and classic writing with no distractions
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[hsl(25,30%,55%)] shrink-0">—</span>
                  <span>
                    <a href="https://sayingly.me" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-[hsl(25,30%,30%)] hover:text-[hsl(25,40%,20%)] transition-colors font-medium">sayingly.me</a>
                    {' '}— capturing words that matter, from quotes to phrases worth preserving
                  </span>
                </li>
              </ul>

              <p>
                The thread connecting all of them: the past has texture. Words carry the fingerprints of the civilizations that shaped them. Books leave traces in the people who read them. History is not a timeline — it is a landscape, and the web is the best medium we have to let people walk through it.
              </p>

              {/* ── Philosophy ────────────────────────── */}

              <div className="border-l-2 border-[hsl(25,30%,60%)]/30 pl-6 my-10">
                <p className="italic text-[hsl(25,20%,30%)]">
                  "The past is a foreign country: they do things differently there."
                </p>
                <p className="text-sm text-[hsl(25,15%,50%)] mt-2">— L.P. Hartley</p>
              </div>

              <h2 className="font-display text-2xl font-bold text-[hsl(25,25%,20%)] pt-4">
                The approach
              </h2>

              <p>
                Each essay begins with a question, not a thesis. We pick a single historical moment — a siege, a revolution, a migration — and ask: how can the web make this <em>felt</em>?
              </p>

              <p>
                The Persia essay uses scrollytelling because the story of Persia is fundamentally geographic — an empire that connected three continents. The Samurai essay reads like a ledger because the warrior class was dismantled not by swords but by accounting. Each form follows the story.
              </p>

              <p>
                No two essays use the same visual mechanic. The design serves the history, never the other way around.
              </p>

              {/* ── Sources ───────────────────────────── */}

              <h2 className="font-display text-2xl font-bold text-[hsl(25,25%,20%)] pt-4">
                Sources & integrity
              </h2>

              <p>
                This is design work, not academic publishing — but every factual claim is grounded. Dates are cross-referenced. Maps use historically informed boundaries. Population figures come from published demographic research.
              </p>

              <p>
                When sources conflict, we note the disagreement. When we speculate, we say so. The goal is honesty with the material, not authority over it.
              </p>

              {/* ── Contact ───────────────────────────── */}

              <h2 className="font-display text-2xl font-bold text-[hsl(25,25%,20%)] pt-4">
                Get in touch
              </h2>

              <p>
                If you're a historian, designer, or educator who wants to collaborate — or if you've found an error — reach out:
              </p>

              <ul className="space-y-2 pl-1">
                <li className="flex gap-3">
                  <span className="text-[hsl(25,30%,55%)] shrink-0">—</span>
                  <a href="https://x.com/watimreading" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-[hsl(25,30%,30%)] hover:text-[hsl(25,40%,20%)] transition-colors">@watimreading on X</a>
                </li>
                <li className="flex gap-3">
                  <span className="text-[hsl(25,30%,55%)] shrink-0">—</span>
                  <a href="https://www.instagram.com/whatiamreadingtoday7/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-[hsl(25,30%,30%)] hover:text-[hsl(25,40%,20%)] transition-colors">@whatiamreadingtoday7 on Instagram</a>
                </li>
                <li className="flex gap-3">
                  <span className="text-[hsl(25,30%,55%)] shrink-0">—</span>
                  <a href="https://www.threads.com/@whatiamreadingtoday7" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-[hsl(25,30%,30%)] hover:text-[hsl(25,40%,20%)] transition-colors">@whatiamreadingtoday7 on Threads</a>
                </li>
                <li className="flex gap-3">
                  <span className="text-[hsl(25,30%,55%)] shrink-0">—</span>
                  <a href="https://whatiamreadingtoday.life/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-[hsl(25,30%,30%)] hover:text-[hsl(25,40%,20%)] transition-colors">whatiamreadingtoday.life</a>
                </li>
              </ul>

            </div>
          </motion.div>
        </div>
      </main>

      <SiteFooter variant="light" />
    </div>
  );
};

export default About;
