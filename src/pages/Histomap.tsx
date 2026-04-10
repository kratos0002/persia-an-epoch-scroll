import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronUp, ChevronDown } from 'lucide-react';
import HistomapStream from '@/components/histomap/HistomapStream';
import HistomapDetailPanel from '@/components/histomap/HistomapDetailPanel';
import CivTooltip from '@/components/histomap/CivTooltip';
import { CIVILIZATIONS, ESSAY_WINDOWS, progressToYear, yearToProgress, formatYear, MIN_YEAR, MAX_YEAR, ERA_ANNOTATIONS } from '@/components/histomap/histomapData';

const SELECTION_SPAN_YEARS = 400; // how many years the selection band covers

export default function Histomap() {
  const overviewRef = useRef<HTMLDivElement>(null);
  const [overviewHeight, setOverviewHeight] = useState(600);
  const [overviewWidth, setOverviewWidth] = useState(400);
  const [hoveredCiv, setHoveredCiv] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Selection state: center year of the selection band
  const [selectedYear, setSelectedYear] = useState(-1500);
  // Dragging state
  const [isDragging, setIsDragging] = useState(false);

  // Measure overview panel
  useEffect(() => {
    const measure = () => {
      if (overviewRef.current) {
        setOverviewHeight(overviewRef.current.clientHeight);
        setOverviewWidth(overviewRef.current.clientWidth);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Selection range in years
  const selectionRange: [number, number] = useMemo(() => {
    const half = SELECTION_SPAN_YEARS / 2;
    return [
      Math.max(MIN_YEAR, selectedYear - half),
      Math.min(MAX_YEAR, selectedYear + half),
    ];
  }, [selectedYear]);

  // Selection range as progress (0-1)
  const selectionStartProgress = yearToProgress(selectionRange[0]);
  const selectionEndProgress = yearToProgress(selectionRange[1]);

  // Which essays overlap with the selection
  const activeEssays = useMemo(() => {
    const active = new Set<string>();
    ESSAY_WINDOWS.forEach(ew => {
      if (ew.endYear >= selectionRange[0] && ew.startYear <= selectionRange[1]) {
        active.add(ew.essayId);
      }
    });
    return active;
  }, [selectionRange]);

  const handleClickProgress = useCallback((progress: number) => {
    const year = progressToYear(progress);
    setSelectedYear(Math.round(year));
  }, []);

  const handleHoverCiv = useCallback((civId: string | null) => {
    setHoveredCiv(civId);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });

    if (isDragging && overviewRef.current) {
      const rect = overviewRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const progress = Math.max(0, Math.min(1, y / overviewHeight));
      setSelectedYear(Math.round(progressToYear(progress)));
    }
  }, [isDragging, overviewHeight]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only start drag if clicking within the selection band area
    if (overviewRef.current) {
      const rect = overviewRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const progress = y / overviewHeight;
      const yearAtClick = progressToYear(progress);
      const half = SELECTION_SPAN_YEARS / 2;
      if (yearAtClick >= selectedYear - half && yearAtClick <= selectedYear + half) {
        setIsDragging(true);
        e.preventDefault();
      }
    }
  }, [overviewHeight, selectedYear]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      return () => window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [isDragging, handleMouseUp]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setSelectedYear(y => Math.min(MAX_YEAR, y + 100));
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setSelectedYear(y => Math.max(MIN_YEAR, y - 100));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Step buttons
  const stepUp = useCallback(() => setSelectedYear(y => Math.max(MIN_YEAR, y - SELECTION_SPAN_YEARS)), []);
  const stepDown = useCallback(() => setSelectedYear(y => Math.min(MAX_YEAR, y + SELECTION_SPAN_YEARS)), []);

  return (
    <div
      className="h-screen flex flex-col bg-background text-foreground overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Header */}
      <div className="flex-shrink-0 border-b border-foreground/10 bg-background/90 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-foreground/60 hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg font-serif font-semibold tracking-tight">The Histomap</h1>
              <p className="text-xs text-foreground/50 font-mono">Four Thousand Years of Relative Power</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-mono text-foreground/70">{formatYear(Math.round(selectedYear))}</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex-shrink-0 border-b border-foreground/5 bg-background/60">
        <div className="max-w-[1600px] mx-auto px-4 py-1.5 flex flex-wrap gap-x-3 gap-y-1">
          {CIVILIZATIONS.map(civ => (
            <div key={civ.id} className="flex items-center gap-1 text-[9px] text-foreground/50">
              <div className="w-2 h-2 rounded-full" style={{ background: civ.color }} />
              <span>{civ.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Split screen */}
      <div className="flex-1 flex min-h-0">
        {/* Left: Overview Stream */}
        <div className="w-[40%] flex flex-col border-r border-foreground/10">
          {/* Step up button */}
          <button
            onClick={stepUp}
            className="flex-shrink-0 flex items-center justify-center py-1 text-foreground/40 hover:text-foreground/70 transition-colors"
            disabled={selectedYear <= MIN_YEAR}
          >
            <ChevronUp className="w-4 h-4" />
            <span className="text-[10px] font-mono ml-1">Earlier</span>
          </button>

          <div
            ref={overviewRef}
            className="flex-1 relative overflow-hidden select-none"
            onMouseDown={handleMouseDown}
            style={{ cursor: isDragging ? 'grabbing' : 'default' }}
          >
            <HistomapStream
              width={overviewWidth}
              height={overviewHeight}
              activeEssays={activeEssays}
              onHoverCiv={handleHoverCiv}
              selectionStart={selectionStartProgress}
              selectionEnd={selectionEndProgress}
              onClickProgress={handleClickProgress}
            />
          </div>

          {/* Step down button */}
          <button
            onClick={stepDown}
            className="flex-shrink-0 flex items-center justify-center py-1 text-foreground/40 hover:text-foreground/70 transition-colors"
            disabled={selectedYear >= MAX_YEAR}
          >
            <ChevronDown className="w-4 h-4" />
            <span className="text-[10px] font-mono ml-1">Later</span>
          </button>
        </div>

        {/* Right: Detail Panel */}
        <div className="w-[60%] overflow-hidden">
          <HistomapDetailPanel
            selectedYear={selectedYear}
            selectionRange={selectionRange}
          />
        </div>
      </div>

      {/* Tooltip */}
      <CivTooltip civId={hoveredCiv} x={mousePos.x} y={mousePos.y} />
    </div>
  );
}
