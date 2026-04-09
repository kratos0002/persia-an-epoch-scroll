import React from 'react';
import { Link } from 'react-router-dom';
import { type EssayWindow as EssayWindowType, yearToProgress, formatYear } from './histomapData';
import { ArrowRight } from 'lucide-react';

interface Props {
  essay: EssayWindowType;
  totalHeight: number;
  isActive: boolean;
  containerWidth: number;
}

export default function EssayWindowCard({ essay, totalHeight, isActive, containerWidth }: Props) {
  const midY = yearToProgress((essay.startYear + essay.endYear) / 2) * totalHeight;

  if (!isActive) return null;

  return (
    <div
      className="absolute z-20 pointer-events-auto"
      style={{
        top: midY,
        right: 16,
        transform: 'translateY(-50%)',
        maxWidth: Math.min(280, containerWidth * 0.35),
      }}
    >
      <Link
        to={essay.href}
        className="block group"
      >
        <div className="bg-background/90 backdrop-blur-sm border border-amber-400/40 rounded-lg p-3 shadow-lg hover:border-amber-400/80 transition-all duration-300">
          <p className="text-[10px] font-mono text-foreground/50 uppercase tracking-wider mb-1">
            {formatYear(essay.startYear)}
            {essay.endYear !== essay.startYear && ` – ${formatYear(essay.endYear)}`}
          </p>
          <h3 className="text-sm font-serif font-semibold text-foreground leading-tight">
            {essay.title}
          </h3>
          <p className="text-xs text-foreground/60 mt-0.5">{essay.subtitle}</p>
          <div className="flex items-center gap-1 mt-2 text-xs text-amber-400 group-hover:text-amber-300 transition-colors">
            <span>Read essay</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    </div>
  );
}
