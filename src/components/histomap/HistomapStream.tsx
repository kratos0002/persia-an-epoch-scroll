import React, { useMemo, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { CIVILIZATIONS, CIV_IDS, TIME_SERIES, ESSAY_WINDOWS, yearToProgress, type EssayWindow } from './histomapData';

interface Props {
  width: number;
  height: number;
  activeEssays: Set<string>;
  onEssayClick: (href: string) => void;
  onHoverCiv: (civId: string | null, year: number | null) => void;
}

const STREAM_PADDING = 0; // full-width streams

export default function HistomapStream({ width, height, activeEssays, onEssayClick, onHoverCiv }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  const { stackedData, yScale, xScale } = useMemo(() => {
    const stack = d3.stack<(typeof TIME_SERIES)[0]>()
      .keys(CIV_IDS)
      .offset(d3.stackOffsetSilhouette)
      .order(d3.stackOrderNone);

    const stacked = stack(TIME_SERIES);

    const xScale = d3.scaleLinear()
      .domain([d3.min(TIME_SERIES, d => d.year)!, d3.max(TIME_SERIES, d => d.year)!])
      .range([0, height]); // year maps to vertical (y-axis on screen)

    const yExtent = [
      d3.min(stacked, layer => d3.min(layer, d => d[0]))!,
      d3.max(stacked, layer => d3.max(layer, d => d[1]))!,
    ];

    const yScale = d3.scaleLinear()
      .domain(yExtent)
      .range([STREAM_PADDING, width - STREAM_PADDING]);

    return { stackedData: stacked, yScale, xScale };
  }, [width, height]);

  const areaGenerator = useMemo(() => {
    return d3.area<d3.SeriesPoint<(typeof TIME_SERIES)[0]>>()
      .y(d => xScale(d.data.year))   // vertical = time
      .x0(d => yScale(d[0]))         // horizontal = width
      .x1(d => yScale(d[1]))
      .curve(d3.curveBasis);
  }, [xScale, yScale]);

  // Build essay highlight regions
  const essayRegions = useMemo(() => {
    return ESSAY_WINDOWS.map(ew => {
      const y1 = xScale(ew.startYear);
      const y2 = xScale(ew.endYear);
      // Ensure minimum height for short-duration essays
      const minH = 40;
      const regionH = Math.max(y2 - y1, minH);
      const regionY = y2 - y1 < minH ? y1 - (minH - (y2 - y1)) / 2 : y1;
      return { ...ew, regionY, regionH };
    });
  }, [xScale]);

  const civMap = useMemo(() => {
    const m = new Map<string, (typeof CIVILIZATIONS)[0]>();
    CIVILIZATIONS.forEach(c => m.set(c.id, c));
    return m;
  }, []);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="block"
      style={{ background: 'transparent' }}
    >
      {/* Stream bands */}
      {stackedData.map((layer, i) => {
        const civId = CIV_IDS[i];
        const civ = civMap.get(civId)!;
        const path = areaGenerator(layer) ?? '';

        // Check if any active essay covers this civ
        const isHighlighted = ESSAY_WINDOWS.some(
          ew => activeEssays.has(ew.essayId) && ew.civIds.includes(civId)
        );

        return (
          <path
            key={civId}
            d={path}
            fill={isHighlighted ? civ.color : civ.colorMuted}
            opacity={isHighlighted ? 0.85 : 0.3}
            stroke={isHighlighted ? civ.color : 'hsl(0, 0%, 20%)'}
            strokeWidth={isHighlighted ? 1.5 : 0.5}
            style={{ transition: 'fill 0.6s ease, opacity 0.6s ease, stroke 0.6s ease' }}
            onMouseEnter={() => onHoverCiv(civId, null)}
            onMouseLeave={() => onHoverCiv(null, null)}
          />
        );
      })}

      {/* Essay window overlays */}
      {essayRegions.map(ew => {
        const isActive = activeEssays.has(ew.essayId);
        if (!isActive) return null;

        return (
          <g key={ew.essayId}>
            {/* Glow rectangle behind the active zone */}
            <rect
              x={0}
              y={ew.regionY}
              width={width}
              height={ew.regionH}
              fill="none"
              stroke="hsl(43, 85%, 55%)"
              strokeWidth={2}
              strokeDasharray="6 3"
              opacity={0.7}
              rx={4}
              style={{ cursor: 'pointer' }}
              onClick={() => onEssayClick(ew.href)}
            />
          </g>
        );
      })}
    </svg>
  );
}
