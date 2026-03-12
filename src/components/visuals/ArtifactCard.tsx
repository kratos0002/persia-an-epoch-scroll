import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Artifact } from './constantinopleData';

interface ArtifactCardProps {
  artifact: Artifact;
  stratumColor: string;
}

const TYPE_ICONS: Record<string, string> = {
  coin: '🪙',
  pottery: '🏺',
  mosaic: '🎨',
  weapon: '⚔️',
  inscription: '📜',
  bone: '🦴',
  jewelry: '💍',
};

export const ArtifactCard: React.FC<ArtifactCardProps> = ({ artifact, stratumColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Artifact icon — clickable */}
      <motion.button
        className="absolute z-30 cursor-pointer group"
        style={{ left: `${artifact.x}%`, top: `${artifact.y}%` }}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg backdrop-blur-sm border transition-all"
          style={{
            background: `hsl(${stratumColor} / 0.6)`,
            borderColor: `hsl(40 25% 80% / 0.4)`,
            boxShadow: `0 0 20px hsl(${stratumColor} / 0.3)`,
          }}
        >
          {TYPE_ICONS[artifact.type] || '🔍'}
        </div>
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: `hsl(40 25% 80% / 0.3)` }}
          animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Expanded card overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

            {/* Card */}
            <motion.div
              className="relative max-w-sm w-full rounded-xl p-6 border"
              style={{
                background: `hsl(${stratumColor})`,
                borderColor: `hsl(40 25% 70% / 0.3)`,
                boxShadow: `0 20px 60px hsl(${stratumColor} / 0.5)`,
              }}
              initial={{ scale: 0.5, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style={{ color: 'hsl(40 25% 80%)', background: 'hsl(0 0% 0% / 0.3)' }}
              >
                ✕
              </button>

              <div className="text-4xl mb-3">{TYPE_ICONS[artifact.type] || '🔍'}</div>
              <h3 className="font-display text-xl font-bold mb-1" style={{ color: 'hsl(40 25% 90%)' }}>
                {artifact.name}
              </h3>
              <p className="text-[10px] tracking-[0.15em] uppercase font-body font-semibold mb-3" style={{ color: 'hsl(40 25% 65%)' }}>
                {artifact.era}
              </p>
              <p className="font-body text-base leading-relaxed" style={{ color: 'hsl(40 25% 80%)' }}>
                {artifact.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
