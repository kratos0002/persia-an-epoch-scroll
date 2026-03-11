import { useState, useEffect } from 'react';

export interface SamuraiSection {
  id: string;
  label: string;
  year: string;
}

export const SAMURAI_SECTIONS: SamuraiSection[] = [
  { id: 'samurai-hero', label: 'Stipends, Bonds & Death', year: '' },
  { id: 'frozen-society', label: 'The Frozen Society', year: '1603' },
  { id: 'stipend-economy', label: 'The Stipend Economy', year: '~1700' },
  { id: 'black-ships', label: 'The Black Ships', year: '1853' },
  { id: 'restoration', label: 'The Restoration', year: '1868' },
  { id: 'abolition', label: 'Abolition by Memo', year: '1871' },
  { id: 'bond-conversion', label: 'The Bond Conversion', year: '1876' },
  { id: 'satsuma', label: 'Satsuma', year: '1877' },
  { id: 'samurai-epilogue', label: 'Epilogue', year: '' },
];

export function useSamuraiScrollSpy() {
  const [activeSection, setActiveSection] = useState('samurai-hero');
  const [globalProgress, setGlobalProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setGlobalProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      const midY = window.innerHeight / 2;
      let closest = SAMURAI_SECTIONS[0].id;
      let closestDist = Infinity;

      for (const section of SAMURAI_SECTIONS) {
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
