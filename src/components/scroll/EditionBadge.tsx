import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EDITIONS } from '@/lib/editions';

interface EditionBadgeProps {
  essayId: string;
  variant?: 'dark' | 'light';
}

export const EditionBadge = ({ essayId, variant = 'dark' }: EditionBadgeProps) => {
  const meta = EDITIONS[essayId];
  const [expanded, setExpanded] = useState(false);

  if (!meta) return null;

  const isDark = variant === 'dark';
  const hasChangelog = meta.changelog.length > 1;

  return (
    <div className="flex justify-center px-6 py-6">
      <div className="text-center">
        {/* Pill badge */}
        <motion.div
          className="inline-flex items-center gap-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span
            className="text-[10px] tracking-[0.25em] uppercase font-body font-semibold"
            style={{ color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)' }}
          >
            {meta.edition} · {meta.lastUpdated}
          </span>

          {hasChangelog && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[10px] tracking-[0.15em] uppercase font-body font-semibold transition-colors cursor-pointer"
              style={{ color: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)' }}
            >
              <span className="hover:underline underline-offset-2">
                {expanded ? 'Hide' : 'What changed'}
              </span>
              <motion.span
                className="inline-block ml-1"
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▾
              </motion.span>
            </button>
          )}
        </motion.div>

        {/* Expandable changelog */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              className="mt-3 space-y-1.5"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {meta.changelog.map((entry) => (
                <p
                  key={entry.version}
                  className="text-[11px] font-body"
                  style={{ color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}
                >
                  <span className="font-semibold">v{entry.version}</span>
                  <span className="mx-1.5">—</span>
                  {entry.note}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
