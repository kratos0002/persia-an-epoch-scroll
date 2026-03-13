import { useState, useEffect } from 'react';

export interface NutmegSection {
  id: string;
  label: string;
  year: string;
}

export const NUTMEG_SECTIONS: NutmegSection[] = [
  { id: 'nutmeg-hero',     label: 'The Nutmeg Wars',      year: '' },
  { id: 'the-seed',        label: 'The Seed',              year: '~600' },
  { id: 'the-voyage',      label: 'The Voyage',            year: '1512' },
  { id: 'banda-islands',   label: 'The Banda Islands',     year: '1512' },
  { id: 'dutch-monopoly',  label: 'The Dutch Monopoly',    year: '1621' },
  { id: 'run-island',      label: 'Run: The Last Holdout', year: '1616' },
  { id: 'manhattan-trade', label: 'The Manhattan Trade',   year: '1667' },
  { id: 'nutmeg-epilogue', label: 'The Absurdity',         year: '' },
];

export function useNutmegScrollSpy() {
  const [activeSection, setActiveSection] = useState('nutmeg-hero');
  const [globalProgress, setGlobalProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setGlobalProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      const midY = window.innerHeight / 2;
      let closest = NUTMEG_SECTIONS[0].id;
      let closestDist = Infinity;

      for (const section of NUTMEG_SECTIONS) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - midY);
        if (dist < closestDist) {
          closestDist = dist;
          closest = section.id;
        }
      }
      setActiveSection(closest);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { activeSection, globalProgress };
}
