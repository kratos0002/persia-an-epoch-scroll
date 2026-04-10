import React, { useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { CIVILIZATIONS, CIV_IDS, TIME_SERIES, ESSAY_WINDOWS, yearToProgress, MIN_YEAR, MAX_YEAR } from './histomapData';

interface Props {
  width: number;
  height: number;
  activeEssays: Set<string>;
  onHoverCiv: (civId: string | null, year: number | null) => void;
  /** Selection band — progress values 0-1 */
  selectionStart?: number;
  selectionEnd?: number;
  onClickProgress?: (progress: number) => void;
}

export default function HistomapStream({ width, height, activeEssays, onHoverCiv, selectionStart, selectionEnd, onClickProgress }: Props) {
  const { stackedData, yScale, xScale } = useMemo(() => {
    const stack = d3.stack<(typeof TIME_SERIES)[0]>()
      .keys(CIV_IDS)
      .offset(d3.stackOffsetSilhouette)
      .order(d3.stackOrderNone);

    const stacked = stack(TIME_SERIES);

    const xScale = d3.scaleLinear()
      .domain([d3.min(TIME_SERIES, d => d.year)!, d3.max(TIME_SERIES, d => d.year)!])
      .range([0, height]);

    const yExtent = [
      d3.min(stacked, layer => d3.min(layer, d => d[0]))!,
      d3.max(stacked, layer => d3.max(layer, d => d[1]))!,
    ];

    const yScale = d3.scaleLinear()
      .domain(yExtent)
      .range([0, width]);

    return { stackedData: stacked, yScale, xScale };
  }, [width, height]);

  const areaGenerator = useMemo(() => {
    return d3.area<d3.SeriesPoint<(typeof TIME_SERIES)[0]>>()
      .y(d => xScale(d.data.year))
      .x0(d => yScale(d[0]))
      .x1(d => yScale(d[1]))
      .curve(d3.curveBasis);
  }, [xScale, yScale]);

  const civMap = useMemo(() => {
    const m = new Map<string, (typeof CIVILIZATIONS)[0]>();
    CIVILIZATIONS.forEach(c => m.set(c.id, c));
    return m;
  }, []);

  // Year ticks for the overview
  const yearTicks = useMemo(() => {
    const ticks: { year: number; y: number }[] = [];
    for (let yr = -3000; yr <= 2024; yr += 500) {
      ticks.push({ year: yr, y: xScale(yr) });
    }
    return ticks;
  }, [xScale]);

  // Essay dots on left edge
  const essayDots = useMemo(() => {
    return ESSAY_WINDOWS.map(ew => ({
      ...ew,
      y: xScale((ew.startYear + ew.endYear) / 2),
    }));
  }, [xScale]);

  const handleClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!onClickProgress) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const progress = y / height;
    onClickProgress(Math.max(0, Math.min(1, progress)));
  }, [onClickProgress, height]);

  const selY1 = selectionStart !== undefined ? selectionStart * height : undefined;
  const selY2 = selectionEnd !== undefined ? selectionEnd * height : undefined;

  return (
    <svg
      width={width}
      height={height}
      className="block cursor-pointer"
      style={{ background: 'transparent' }}
      onClick={handleClick}
    >
      {/* Stream bands */}
      {stackedData.map((layer, i) => {
        const civId = CIV_IDS[i];
        const civ = civMap.get(civId)!;
        const path = areaGenerator(layer) ?? '';

        const isHighlighted = ESSAY_WINDOWS.some(
          ew => activeEssays.has(ew.essayId) && ew.civIds.includes(civId)
        );

        return (
          <path
            key={civId}
            d={path}
            fill={isHighlighted ? civ.color : civ.colorMuted}
            opacity={isHighlighted ? 0.85 : 0.35}
            stroke={isHighlighted ? civ.color : 'hsl(0, 0%, 20%)'}
            strokeWidth={isHighlighted ? 1 : 0.3}
            style={{ transition: 'fill 0.4s ease, opacity 0.4s ease' }}
            onMouseEnter={() => onHoverCiv(civId, null)}
            onMouseLeave={() => onHoverCiv(null, null)}
          />
        );
      })}

      {/* Year tick labels on left */}
      {yearTicks.map(t => (
        <g key={t.year}>
          <line x1={0} y1={t.y} x2={6} y2={t.y} stroke="hsl(0, 0%, 50%)" strokeWidth={0.5} />
          <text x={8} y={t.y + 3} fontSize={8} fontFamily="monospace" fill="hsl(0, 0%, 50%)">
            {t.year < 0 ? `${Math.abs(t.year)} BCE` : `${t.year} CE`}
          </text>
        </g>
      ))}

      {/* Essay dots */}
      {essayDots.map(dot => (
        <circle
          key={dot.essayId}
          cx={width - 6}
          cy={dot.y}
          r={2.5}
          fill={dot.status === 'live' ? 'hsl(43, 85%, 55%)' : 'hsl(0, 0%, 40%)'}
          opacity={0.8}
        />
      ))}

      {/* Selection band overlay */}
      {selY1 !== undefined && selY2 !== undefined && (
        <>
          {/* Dim areas outside selection */}
          <rect x={0} y={0} width={width} height={selY1} fill="hsl(0, 0%, 0%)" opacity={0.3} />
          <rect x={0} y={selY2} width={width} height={height - selY2} fill="hsl(0, 0%, 0%)" opacity={0.3} />
          {/* Selection border */}
          <rect
            x={0}
            y={selY1}
            width={width}
            height={selY2 - selY1}
            fill="none"
            stroke="hsl(43, 85%, 55%)"
            strokeWidth={1.5}
            rx={2}
          />
        </>
      )}
    </svg>
  );
}
