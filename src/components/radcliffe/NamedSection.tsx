import React, { useMemo } from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { Stamp } from './SeamSystem';
import { MEMORIAL_PLACES, type MemorialPlace } from './radcliffeData';
import {
  useContainerWidth,
  useBatchTextHeights,
} from '@/hooks/usePretext';

// ─── The Few Who Are Named ───
// A memorial section that sits between VoidSection and AftermathSection in the
// essay flow. Where VoidSection renders victim names as texture (legible only
// as atmosphere), this section renders named *places* — villages, cities,
// stations, corridors — that the Radcliffe Line touched, with a one-line note
// under each. The framing is explicit: this is a curatorial selection, not an
// enumeration. For every place named here, there are many more whose names
// are not recorded at all.
//
// Layout: 3-column desktop grid, 1-column mobile. Row heights are locked to
// the maximum measured place-note height (via Pretext useBatchTextHeights) so
// the grid reads as a museum wall — even rows, predictable rhythm, no
// content-driven jumps.
//
// No interaction (quiet by design). Row-by-row scroll reveal via RevealOnScroll.

// Measurement fonts align 1:1 with the rendered CSS on the PlaceCell below.
// Name: text-xl = 20px, leading-tight ≈ 24.
// Note: text-[0.82rem] ≈ 13.12px, leading-relaxed ≈ 21.3.
// Kept as explicit px so Pretext measurement matches paint metrics exactly
// (per the 'no system-ui, no implicit sizing' rule in CLAUDE.md).
const NAME_FONT = '400 20px "Cormorant Garamond", Georgia, serif';
const NAME_LINE_HEIGHT = 24;
const NOTE_FONT = 'italic 400 13px "Cormorant Garamond", Georgia, serif';
const NOTE_LINE_HEIGHT = 22;

const PlaceCell = ({
  place,
  minHeight,
  index,
}: {
  place: MemorialPlace;
  minHeight: number;
  index: number;
}) => (
  // Small row-by-row stagger inside the viewport entry. Capped at 0.6s total
  // so the grid doesn't feel like it's auditioning.
  <RevealOnScroll delay={Math.min(0.02 * (index % 15), 0.3)}>
    <div
      className="border-b border-radcliffe-grid/15 py-5 flex flex-col"
      style={{ minHeight }}
    >
      <div className="flex items-baseline gap-3 mb-2">
        <h3 className="font-body text-radcliffe-ink/95 text-xl leading-tight">
          {place.name}
        </h3>
        <span className="font-survey text-[0.55rem] text-radcliffe-red/50 uppercase tracking-[0.2em] shrink-0">
          {place.region}
        </span>
      </div>
      <p className="font-body text-[0.82rem] text-radcliffe-ink/65 italic leading-relaxed">
        {place.note}
      </p>
    </div>
  </RevealOnScroll>
);

export const NamedSection = () => {
  const { ref, width } = useContainerWidth<HTMLDivElement>();

  // Column count follows the essay's other multi-column grids.
  const columnCount = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const GUTTER = 40;
  const columnWidth = width > 0
    ? Math.floor((width - GUTTER * (columnCount - 1)) / columnCount)
    : 0;

  // Pretext batch-measure all place notes at the current column width.
  // We lock the cell minHeight to the tallest note so the grid has even rows
  // and no content-driven layout jitter.
  const noteTexts = useMemo(() => MEMORIAL_PLACES.map(p => p.note), []);
  const noteHeights = useBatchTextHeights(
    noteTexts,
    NOTE_FONT,
    columnWidth > 40 ? columnWidth - 4 : columnWidth,
    NOTE_LINE_HEIGHT,
  );

  // Minimum cell height = name row + mb-2 gap + max note height + py-5 padding.
  // Floor at NOTE_LINE_HEIGHT × 3 so the grid reads cleanly during the brief
  // pre-measurement window before document.fonts.ready resolves.
  const rowMinHeight = useMemo(() => {
    const maxNote = noteHeights.reduce(
      (max, h) => (h.height > max ? h.height : max),
      NOTE_LINE_HEIGHT * 3,
    );
    // name row (text-xl leading-tight) ≈ 28
    // mb-2 gap = 8
    // py-5 = 20 + 20 = 40
    // 8px breathing room for tall descenders / ascenders
    return 28 + 8 + maxNote + 40 + 8;
  }, [noteHeights]);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 radcliffe-bg radcliffe-grain"
      aria-labelledby="named-section-heading"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* ── Editorial intro ── */}
        <RevealOnScroll>
          <Stamp>In Memoriam</Stamp>
          <h2
            id="named-section-heading"
            className="font-display text-3xl md:text-4xl font-bold tracking-[0.06em] text-radcliffe-ink uppercase mt-6 mb-6"
          >
            The Few Who Are Named
          </h2>
          <div className="max-w-2xl font-body text-base md:text-lg text-radcliffe-ink/80 leading-relaxed space-y-5 mb-16">
            <p>
              The Radcliffe Line was drawn through land, not onto it. The cartographer in London never walked the villages his ink crossed, never stood at the railway platforms his pencil made into borders, never saw the rivers he assigned to one country or another. Below is a small atlas of places the line touched — named here because someone remembered to name them.
            </p>
            <p>
              Each is a site the essay already passes through, or one the historical record could not bring itself to forget: a massacre, an exodus, a district split in a paragraph, a town whose Muslim or Hindu half left in a single week, a corridor opened to a mountain war, a village that did not burn because one man refused to let it. For every site listed here, there are hundreds more whose names are not recorded anywhere.
            </p>
          </div>
        </RevealOnScroll>

        {/* ── Places grid ── */}
        <ul
          role="list"
          className="grid gap-x-10"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
          }}
        >
          {MEMORIAL_PLACES.map((place, i) => (
            <li key={place.name} className="contents">
              <PlaceCell place={place} minHeight={rowMinHeight} index={i} />
            </li>
          ))}
        </ul>

        {/* ── Coda ── */}
        <RevealOnScroll>
          <div className="mt-20 max-w-2xl font-body text-base italic text-radcliffe-ink/55 leading-relaxed">
            <p>
              These are the places whose names survived the crossing. The ones that do not appear here — and there are many — did not. The line drawn on Radcliffe's map passed through villages whose names the historical record does not carry, and through lives whose names were never written down at all. The list is not an enumeration. It is an attempt to look at a few of the places that otherwise exist only as an interval in a table.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
