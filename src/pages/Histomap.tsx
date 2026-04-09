import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import HistomapStream from '@/components/histomap/HistomapStream';
import EraRuler from '@/components/histomap/EraRuler';
import EssayWindowCard from '@/components/histomap/EssayWindow';
import HistomapMinimap from '@/components/histomap/HistomapMinimap';
import CivTooltip from '@/components/histomap/CivTooltip';
import { ESSAY_WINDOWS, CIVILIZATIONS, progressToYear, yearToProgress, formatYear, MIN_YEAR, MAX_YEAR, YEAR_SPAN } from '@/components/histomap/histomapData';

const TOTAL_HEIGHT = 10000; // px
const STREAM_WIDTH_RATIO = 0.7; // stream takes 70% of container width
const RULER_WIDTH = 60;

export default function Histomap() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [containerWidth, setContainerWidth] = useState(900);
  const [viewportH, setViewportH] = useState(800);
  const [hoveredCiv, setHoveredCiv] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Measure container
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
      setViewportH(window.innerHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Track scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Current year based on scroll
  const currentYear = useMemo(() => {
    const progress = Math.min(1, Math.max(0, scrollY / (TOTAL_HEIGHT - viewportH)));
    return progressToYear(progress);
  }, [scrollY, viewportH]);

  // Which essays are active (their year range is in the viewport)
  const activeEssays = useMemo(() => {
    const vpTop = scrollY;
    const vpBottom = scrollY + viewportH;
    const active = new Set<string>();

    ESSAY_WINDOWS.forEach(ew => {
      const ewTop = yearToProgress(ew.startYear) * TOTAL_HEIGHT;
      const ewBottom = yearToProgress(ew.endYear) * TOTAL_HEIGHT;
      // Check overlap
      if (ewBottom >= vpTop - 100 && ewTop <= vpBottom + 100) {
        active.add(ew.essayId);
      }
    });
    return active;
  }, [scrollY, viewportH]);

  const handleEssayClick = useCallback((href: string) => {
    navigate(href);
  }, [navigate]);

  const handleHoverCiv = useCallback((civId: string | null) => {
    setHoveredCiv(civId);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMinimapJump = useCallback((progress: number) => {
    window.scrollTo({ top: progress * (TOTAL_HEIGHT - viewportH), behavior: 'smooth' });
  }, [viewportH]);

  const streamWidth = containerWidth - RULER_WIDTH - 40; // padding

  const viewportProgress = scrollY / (TOTAL_HEIGHT - viewportH || 1);
  const viewportFraction = viewportH / TOTAL_HEIGHT;

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      onMouseMove={handleMouseMove}
    >
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b border-foreground/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
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
            <p className="text-sm font-mono text-foreground/70">{formatYear(Math.round(currentYear))}</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="fixed top-[60px] left-0 right-0 z-30 bg-background/60 backdrop-blur-sm border-b border-foreground/5">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap gap-x-3 gap-y-1">
          {CIVILIZATIONS.map(civ => (
            <div
              key={civ.id}
              className="flex items-center gap-1 text-[9px] text-foreground/50"
            >
              <div className="w-2 h-2 rounded-full" style={{ background: civ.color }} />
              <span>{civ.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto relative"
        style={{ paddingTop: 100 }}
      >
        <div className="flex" style={{ height: TOTAL_HEIGHT }}>
          {/* Era ruler */}
          <div className="sticky top-[100px] self-start" style={{ height: viewportH - 100 }}>
            <EraRuler totalHeight={TOTAL_HEIGHT} currentYear={currentYear} />
          </div>

          {/* Stream area */}
          <div className="flex-1 relative">
            <HistomapStream
              width={Math.max(300, streamWidth)}
              height={TOTAL_HEIGHT}
              activeEssays={activeEssays}
              onEssayClick={handleEssayClick}
              onHoverCiv={handleHoverCiv}
            />

            {/* Essay cards */}
            {ESSAY_WINDOWS.map(ew => (
              <EssayWindowCard
                key={ew.essayId}
                essay={ew}
                totalHeight={TOTAL_HEIGHT}
                isActive={activeEssays.has(ew.essayId)}
                containerWidth={containerWidth}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Minimap */}
      <HistomapMinimap
        viewportTop={viewportProgress}
        viewportHeight={viewportFraction}
        onJump={handleMinimapJump}
      />

      {/* Tooltip */}
      <CivTooltip civId={hoveredCiv} x={mousePos.x} y={mousePos.y} />
    </div>
  );
}
