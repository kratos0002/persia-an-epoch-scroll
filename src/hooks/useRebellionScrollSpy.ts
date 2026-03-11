import { useState, useEffect } from 'react';

export interface RebellionSection {
  id: string;
  label: string;
  year: string;
}

export const REBELLION_SECTIONS: RebellionSection[] = [
  { id: 'rebellion-hero', label: 'The Signal and the Fire', year: '' },
  { id: 'cartridges', label: 'The Greased Cartridge', year: '1857' },
  { id: 'two-networks', label: 'Two Networks', year: '1857' },
  { id: 'meerut', label: 'Meerut', year: 'May 10' },
  { id: 'race-to-delhi', label: 'Race to Delhi', year: 'May 11' },
  { id: 'kanpur-lucknow', label: 'Kanpur & Lucknow', year: 'Jun–Sep' },
  { id: 'reconquest', label: 'The Reconquest', year: '1858' },
  { id: 'aftermath', label: 'Transfer of Power', year: '1858' },
  { id: 'rebellion-epilogue', label: 'Epilogue', year: '' },
];

export function useRebellionScrollSpy() {
  const [activeSection, setActiveSection] = useState('rebellion-hero');
  const [globalProgress, setGlobalProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setGlobalProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      const midY = window.innerHeight / 2;
      let closest = REBELLION_SECTIONS[0].id;
      let closestDist = Infinity;

      for (const section of REBELLION_SECTIONS) {
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
