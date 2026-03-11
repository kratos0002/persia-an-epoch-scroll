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
              <p>
                <strong className="text-[hsl(25,25%,22%)]">Epoch Lives</strong> is a collection of visual essays about the turning points of civilizations. Each essay uses a different visual mechanic — scrollytelling, interactive maps, data-driven narratives — to make a historical moment visceral rather than academic.
              </p>

              <p>
                We don't summarize history. We reconstruct how it <em>felt</em> to live through it. What did a soldier at Thermopylae see when he looked across the pass? What did a merchant in Song Dynasty Kaifeng hear walking through the world's largest city? What did a librarian in Baghdad feel as Mongol armies appeared on the horizon?
              </p>

              <p>
                Every essay is built on primary sources — chronicles, diaries, archaeological records, diplomatic letters. The visual design serves the story, not the other way around.
              </p>

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
                The Persia essay uses scrollytelling with interactive maps because the story of Persia is fundamentally geographic — an empire that connected three continents. Constantinople might use a countdown timer because the siege lasted exactly 57 days. Each form follows the story.
              </p>

              <h2 className="font-display text-2xl font-bold text-[hsl(25,25%,20%)] pt-4">
                Sources & integrity
              </h2>

              <p>
                We are not historians — we are designers who take history seriously. Every factual claim is cited. Every date is cross-referenced. When sources conflict, we note the disagreement. When we speculate, we say so.
              </p>

              <p>
                Maps use historically informed boundaries. Population figures come from published demographic research. Direct quotes are sourced.
              </p>

              <h2 className="font-display text-2xl font-bold text-[hsl(25,25%,20%)] pt-4">
                Get in touch
              </h2>

              <p>
                If you're a historian, designer, or educator and want to collaborate — or if you've found an error — reach out on{' '}
                <a
                  href="https://twitter.com/EpochLives"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 text-[hsl(25,30%,30%)] hover:text-[hsl(25,40%,20%)] transition-colors"
                >
                  Twitter/X
                </a>.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <SiteFooter variant="light" />
    </div>
  );
};

export default About;
