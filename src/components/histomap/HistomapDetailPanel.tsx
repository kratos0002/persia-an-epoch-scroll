import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { formatYear, getEraForYear, ESSAY_WINDOWS } from './histomapData';
import StreamCrossSection from './StreamCrossSection';

interface Props {
  selectedYear: number;
  selectionRange: [number, number]; // startYear, endYear
}

export default function HistomapDetailPanel({ selectedYear, selectionRange }: Props) {
  const era = useMemo(() => getEraForYear(selectedYear), [selectedYear]);

  const matchingEssays = useMemo(() => {
    const [rangeStart, rangeEnd] = selectionRange;
    return ESSAY_WINDOWS.filter(ew => {
      return ew.endYear >= rangeStart && ew.startYear <= rangeEnd;
    });
  }, [selectionRange]);

  return (
    <div className="h-full flex flex-col overflow-y-auto px-6 py-6 space-y-6">
      {/* Era Header */}
      <div>
        <p className="text-sm font-mono text-foreground/40 tracking-wider">
          {formatYear(Math.round(selectionRange[0]))} – {formatYear(Math.round(selectionRange[1]))}
        </p>
        {era ? (
          <>
            <h2 className="text-2xl font-serif font-semibold text-foreground mt-1">{era.name}</h2>
            <p className="text-sm text-foreground/60 mt-2 leading-relaxed">{era.description}</p>
          </>
        ) : (
          <h2 className="text-2xl font-serif font-semibold text-foreground mt-1">
            {formatYear(Math.round(selectedYear))}
          </h2>
        )}
      </div>

      {/* Key Events */}
      {era && (
        <div>
          <h3 className="text-xs font-mono text-foreground/50 uppercase tracking-wider mb-2">Key Events</h3>
          <ul className="space-y-1.5">
            {era.keyEvents.map((event, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                <span className="w-1 h-1 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                {event}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cross Section */}
      <StreamCrossSection year={selectedYear} />

      {/* Essay Cards */}
      {matchingEssays.length > 0 && (
        <div>
          <h3 className="text-xs font-mono text-foreground/50 uppercase tracking-wider mb-3">
            Essays in this era
          </h3>
          <div className="space-y-2">
            {matchingEssays.map(ew => (
              <Link
                key={ew.essayId}
                to={ew.href}
                className="block group"
              >
                <div className={`border rounded-lg p-3 transition-all duration-300 ${
                  ew.status === 'live'
                    ? 'border-amber-400/40 bg-amber-400/5 hover:border-amber-400/80'
                    : 'border-foreground/10 bg-foreground/5 opacity-50'
                }`}>
                  <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-wider">
                    {formatYear(ew.startYear)}
                    {ew.endYear !== ew.startYear && ` – ${formatYear(ew.endYear)}`}
                  </p>
                  <h4 className="text-sm font-serif font-semibold text-foreground mt-0.5 leading-tight">
                    {ew.title}
                  </h4>
                  {ew.subtitle && (
                    <p className="text-xs text-foreground/50 mt-0.5">{ew.subtitle}</p>
                  )}
                  {ew.status === 'live' && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-amber-400 group-hover:text-amber-300 transition-colors">
                      <span>Read essay</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  )}
                  {ew.status !== 'live' && (
                    <p className="text-[10px] text-foreground/30 mt-1 italic">Coming soon</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
