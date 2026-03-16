import { useState, useEffect } from 'react';

export interface RamayanaSection {
  id: string;
  label: string;
  year: string;
}

export const RAMAYANA_SECTIONS: RamayanaSection[] = [
  { id: 'ramayana-hero',    label: 'The Exile Begins',      year: '' },
  { id: 'ayodhya',          label: 'Ayodhya',               year: '~500 BCE' },
  { id: 'shringverpur',     label: 'The Crossing',          year: '' },
  { id: 'chitrakoot',       label: 'The Forest Court',      year: 'Year 1' },
  { id: 'dandakaranya',     label: 'The Wilderness',        year: 'Years 2–12' },
  { id: 'panchavati',       label: 'The Abduction',         year: 'Year 13' },
  { id: 'kishkindha',       label: 'The Alliance',          year: 'Year 13' },
  { id: 'rameshwaram',      label: 'The Bridge',            year: 'Year 14' },
  { id: 'lanka',            label: 'The War',               year: 'Year 14' },
  { id: 'ramayana-return',  label: 'The Return',            year: 'Year 14' },
  { id: 'ramayana-epilogue',label: 'The Story That Traveled', year: '' },
];

export function useRamayanaScrollSpy() {
  const [activeSection, setActiveSection] = useState('ramayana-hero');
  const [globalProgress, setGlobalProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setGlobalProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      const midY = window.innerHeight / 2;
      let closest = RAMAYANA_SECTIONS[0].id;
      let closestDist = Infinity;

      for (const section of RAMAYANA_SECTIONS) {
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
