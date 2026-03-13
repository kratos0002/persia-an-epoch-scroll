import React from 'react';
import { EDITIONS } from '@/lib/editions';

interface EditionColophonProps {
  essayId: string;
  variant?: 'dark' | 'light';
}

export const EditionColophon = ({ essayId, variant = 'dark' }: EditionColophonProps) => {
  const meta = EDITIONS[essayId];
  if (!meta) return null;

  const isDark = variant === 'dark';
  const borderColor = isDark ? 'border-white/[0.06]' : 'border-black/[0.08]';
  const editionColor = isDark ? 'text-white/30' : 'text-black/30';
  const versionColor = isDark ? 'text-white/15' : 'text-black/15';
  const tagColor = isDark ? 'text-white/20' : 'text-black/20';

  return (
    <div className={`mt-16 pt-8 border-t ${borderColor}`}>
      <div className="text-center space-y-4">
        <p className={`text-xs tracking-[0.3em] uppercase font-body font-semibold ${editionColor}`}>
          {meta.edition} · {meta.lastUpdated}
        </p>

        <div className="space-y-1.5">
          {meta.changelog.map((entry) => (
            <p key={entry.version} className={`text-[11px] font-body ${versionColor}`}>
              v{entry.version} — {entry.note}
            </p>
          ))}
        </div>

        <p className={`text-[10px] font-body ${tagColor} pt-2`}>
          An Epoch Lives Visual Essay
        </p>
      </div>
    </div>
  );
};
