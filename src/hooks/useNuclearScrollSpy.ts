import { useState, useEffect } from 'react';

export interface NuclearSection {
  id: string;
  label: string;
  year: string;
  nation?: string;
}

export const NUCLEAR_SECTIONS: NuclearSection[] = [
  { id: 'nuclear-hero',    label: 'The Chain Reaction',     year: '' },
  { id: 'manhattan',       label: 'The Manhattan Project',  year: '1945', nation: 'USA' },
  { id: 'espionage',       label: 'Espionage',              year: '1949', nation: 'USSR' },
  { id: 'britain',         label: "Empire's Last Card",     year: '1952', nation: 'UK' },
  { id: 'france',          label: 'Force de Frappe',        year: '1960', nation: 'France' },
  { id: 'china',           label: 'The Dragon',             year: '1964', nation: 'China' },
  { id: 'india',           label: 'Smiling Buddha',         year: '1974', nation: 'India' },
  { id: 'pakistan',         label: 'Chagai',                 year: '1998', nation: 'Pakistan' },
  { id: 'north-korea',     label: "The Hermit's Bomb",      year: '2006', nation: 'DPRK' },
  { id: 'shadow',          label: 'The Shadow',             year: '≈1966', nation: 'Israel' },
  { id: 'nuclear-epilogue', label: 'The Chain Continues',   year: '' },
];

export function useNuclearScrollSpy() {
  const [activeSection, setActiveSection] = useState('nuclear-hero');
  const [globalProgress, setGlobalProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setGlobalProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      const midY = window.innerHeight / 2;
      let closest = NUCLEAR_SECTIONS[0].id;
      let closestDist = Infinity;

      for (const section of NUCLEAR_SECTIONS) {
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
