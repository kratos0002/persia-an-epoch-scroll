import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SOURCES_REGISTRY, type EssaySources, type Source } from '@/lib/sourcesRegistry';

/* ── Type icon ─────────────────────────── */

const TYPE_LABELS: Record<Source['type'], string> = {
  book: 'Book',
  archive: 'Archive',
  map: 'Map',
  article: 'Article',
  testimony: 'Oral History',
  document: 'Primary Document',
  dataset: 'Dataset',
};

const TypeBadge = ({ type }: { type: Source['type'] }) => (
  <span className="font-body text-[0.55rem] text-[hsl(25,15%,55%)] uppercase tracking-[0.2em] border border-[hsl(25,15%,55%)/0.2] px-2 py-0.5 rounded-sm">
    {TYPE_LABELS[type]}
  </span>
);

/* ── Source Card ────────────────────────── */

const SourceCard = ({ source, index }: { source: Source; index: number }) => (
  <motion.div
    className="group"
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="flex gap-4 items-start py-4 border-b border-[hsl(25,15%,80%)/0.5] last:border-b-0">
      <span className="text-[hsl(25,20%,70%)] font-body text-sm mt-0.5 shrink-0 select-none">→</span>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          {source.url ? (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body font-semibold text-[hsl(25,30%,22%)] hover:text-[hsl(25,40%,18%)] transition-colors underline underline-offset-2 decoration-[hsl(25,20%,70%)]"
            >
              {source.title}
            </a>
          ) : (
            <span className="font-body font-semibold text-[hsl(25,30%,22%)]">
              {source.title}
            </span>
          )}
          <TypeBadge type={source.type} />
        </div>
        <p className="font-body text-[0.8rem] text-[hsl(25,15%,45%)] mb-1.5">
          {source.author} · {source.year}
        </p>
        <p className="font-body text-[0.85rem] text-[hsl(25,12%,38%)] leading-relaxed italic">
          {source.annotation}
        </p>
      </div>
    </div>
  </motion.div>
);

/* ── Category Block ────────────────────── */

const CategoryBlock = ({ label, sources, startIndex }: { label: string; sources: Source[]; startIndex: number }) => (
  <div className="mb-12">
    <p className="text-[10px] tracking-[0.3em] uppercase text-[hsl(25,20%,55%)] font-body font-semibold mb-4 pb-2 border-b border-[hsl(25,15%,75%)/0.3]">
      {label}
    </p>
    <div>
      {sources.map((source, i) => (
        <SourceCard key={source.title} source={source} index={startIndex + i} />
      ))}
    </div>
  </div>
);

/* ── Essay Section ─────────────────────── */

const EssaySection = ({ essay }: { essay: EssaySources }) => {
  let runningIndex = 0;

  return (
    <div id={essay.essayId} className="scroll-mt-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-[hsl(25,15%,80%)]" />
        <div className="text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[hsl(25,20%,55%)] font-body font-semibold">
            {essay.essaySubtitle}
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[hsl(25,30%,18%)] mt-1">
            {essay.essayTitle}
          </h2>
        </div>
        <div className="flex-1 h-px bg-[hsl(25,15%,80%)]" />
      </div>

      {essay.categories.map((cat) => {
        const block = (
          <CategoryBlock
            key={cat.label}
            label={cat.label}
            sources={cat.sources}
            startIndex={runningIndex}
          />
        );
        runningIndex += cat.sources.length;
        return block;
      })}
    </div>
  );
};

/* ── Essay Filter Tabs ─────────────────── */

const EssayTabs = ({
  essays,
  activeId,
  onSelect,
}: {
  essays: EssaySources[];
  activeId: string | null;
  onSelect: (id: string | null) => void;
}) => (
  <div className="flex flex-wrap gap-2 justify-center mb-12">
    <button
      onClick={() => onSelect(null)}
      className={`px-4 py-1.5 text-[0.7rem] font-body font-semibold tracking-[0.15em] uppercase border transition-colors duration-300 ${
        activeId === null
          ? 'bg-[hsl(25,30%,18%)] text-[hsl(38,30%,94%)] border-[hsl(25,30%,18%)]'
          : 'text-[hsl(25,20%,45%)] border-[hsl(25,15%,80%)] hover:border-[hsl(25,20%,60%)]'
      }`}
    >
      All Essays
    </button>
    {essays.map((e) => (
      <button
        key={e.essayId}
        onClick={() => onSelect(e.essayId)}
        className={`px-4 py-1.5 text-[0.7rem] font-body font-semibold tracking-[0.15em] uppercase border transition-colors duration-300 ${
          activeId === e.essayId
            ? 'bg-[hsl(25,30%,18%)] text-[hsl(38,30%,94%)] border-[hsl(25,30%,18%)]'
            : 'text-[hsl(25,20%,45%)] border-[hsl(25,15%,80%)] hover:border-[hsl(25,20%,60%)]'
        }`}
      >
        {e.essayTitle}
      </button>
    ))}
  </div>
);

/* ── Main Page ─────────────────────────── */

const Sources = () => {
  const location = useLocation();
  const hashEssayId = location.hash?.replace('#', '') || null;
  const [activeEssay, setActiveEssay] = useState<string | null>(hashEssayId);

  // Update filter if navigated with hash
  useEffect(() => {
    if (hashEssayId && SOURCES_REGISTRY.some((e) => e.essayId === hashEssayId)) {
      setActiveEssay(hashEssayId);
    }
  }, [hashEssayId]);

  const filtered = activeEssay
    ? SOURCES_REGISTRY.filter((e) => e.essayId === activeEssay)
    : SOURCES_REGISTRY;

  const totalSources = filtered.reduce(
    (sum, e) => sum + e.categories.reduce((s, c) => s + c.sources.length, 0),
    0,
  );

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
              The Archive
            </p>

            <h1 className="font-display text-4xl md:text-5xl font-black leading-tight text-[hsl(25,30%,18%)] mb-4">
              Sources & Further Reading
            </h1>

            <p className="font-body text-lg text-[hsl(25,15%,40%)] leading-relaxed mb-2">
              The books, documents, maps, and testimony behind Epoch Lives essays. Not a bibliography — a guided shelf.
            </p>

            <p className="font-body text-sm text-[hsl(25,15%,55%)] mb-12">
              {totalSources} sources across {filtered.length} {filtered.length === 1 ? 'essay' : 'essays'}
            </p>
          </motion.div>

          {SOURCES_REGISTRY.length > 1 && (
            <EssayTabs
              essays={SOURCES_REGISTRY}
              activeId={activeEssay}
              onSelect={setActiveEssay}
            />
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {filtered.map((essay) => (
              <EssaySection key={essay.essayId} essay={essay} />
            ))}
          </motion.div>
        </div>
      </main>

      <SiteFooter variant="light" />
    </div>
  );
};

export default Sources;
