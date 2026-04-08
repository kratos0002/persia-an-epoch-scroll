import { useMemo, useState, useEffect, useCallback } from 'react';
import {
  prepare,
  layout,
  prepareWithSegments,
  layoutWithLines,
  layoutNextLine,
  walkLineRanges,
} from '@chenglou/pretext';
import type {
  LayoutCursor,
  LayoutLine,
  LayoutLineRange,
  PreparedTextWithSegments,
} from '@chenglou/pretext';

// Re-export the Pretext primitives that components should use.
// Components must import from this hook file, not directly from @chenglou/pretext,
// per the project rule in CLAUDE.md. This file is the migration seam.
export { prepareWithSegments, layoutNextLine, walkLineRanges, layoutWithLines };
export type { LayoutCursor, LayoutLine, LayoutLineRange, PreparedTextWithSegments };

/**
 * Pre-calculate text height without DOM reflow.
 * Returns { height, lineCount } that update when width changes.
 *
 * Usage:
 *   const { height, lineCount } = useTextHeight(text, '400 16px Georgia', width, 24)
 */
export function useTextHeight(
  text: string,
  font: string,
  maxWidth: number,
  lineHeight: number,
) {
  const prepared = useMemo(() => prepare(text, font), [text, font]);
  return useMemo(
    () => (maxWidth > 0 ? layout(prepared, maxWidth, lineHeight) : { height: 0, lineCount: 0 }),
    [prepared, maxWidth, lineHeight],
  );
}

/**
 * Get line-level breakdown of text at a given width.
 * Returns { lines, height, lineCount } where each line has { text, width }.
 *
 * Usage:
 *   const { lines } = useTextLines(text, '400 16px Georgia', width, 24)
 *   lines.map(l => <div>{l.text}</div>)
 */
export function useTextLines(
  text: string,
  font: string,
  maxWidth: number,
  lineHeight: number,
) {
  const prepared = useMemo(() => prepareWithSegments(text, font), [text, font]);
  return useMemo(
    () => (maxWidth > 0 ? layoutWithLines(prepared, maxWidth, lineHeight) : { lines: [], height: 0, lineCount: 0 }),
    [prepared, maxWidth, lineHeight],
  );
}

/**
 * Measure a container's width reactively (via ResizeObserver).
 * Pair with useTextHeight/useTextLines to recalculate on resize.
 *
 * Usage:
 *   const { ref, width } = useContainerWidth()
 */
export function useContainerWidth<T extends HTMLElement = HTMLDivElement>() {
  const [width, setWidth] = useState(0);
  const [node, setNode] = useState<T | null>(null);

  const ref = useCallback((el: T | null) => {
    setNode(el);
    if (el) setWidth(el.clientWidth);
  }, []);

  useEffect(() => {
    if (!node) return;
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, [node]);

  return { ref, width };
}

/**
 * Batch-measure heights for multiple text items at a given width.
 * Useful for virtual scroll or grid layouts.
 *
 * Usage:
 *   const heights = useBatchTextHeights(items, '400 14px Georgia', width, 20)
 *   // heights[i] = { height, lineCount }
 */
export function useBatchTextHeights(
  texts: string[],
  font: string,
  maxWidth: number,
  lineHeight: number,
) {
  const prepared = useMemo(
    () => texts.map(t => prepare(t, font)),
    [texts, font],
  );

  return useMemo(
    () => maxWidth > 0
      ? prepared.map(p => layout(p, maxWidth, lineHeight))
      : prepared.map(() => ({ height: 0, lineCount: 0 })),
    [prepared, maxWidth, lineHeight],
  );
}
