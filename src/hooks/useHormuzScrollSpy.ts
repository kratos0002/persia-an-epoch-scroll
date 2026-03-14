import { useState, useEffect } from 'react';

export interface HormuzSection {
  id: string;
  label: string;
  year: string;
}

export const HORMUZ_SECTIONS: HormuzSection[] = [
  { id: 'hormuz-hero',      label: 'The Throat of the World',   year: '' },
  { id: 'ancient-gulf',     label: 'The Prize',                 year: '~3000 BCE' },
  { id: 'portugal-seizes',  label: 'Portugal Seizes the Throat', year: '1507' },
  { id: 'british-gulf',     label: "Britain's Invisible Empire", year: '1820' },
  { id: 'tanker-war',       label: 'The Tanker War',            year: '1984' },
  { id: 'bottleneck',       label: 'The 21-Mile Bottleneck',    year: 'Today' },
  { id: 'chokepoints',      label: "The World's Chokepoints",   year: 'Present' },
  { id: 'hormuz-epilogue',  label: 'The Throat Remains',        year: '' },
];

export function useHormuzScrollSpy() {
  const [activeSection, setActiveSection] = useState('hormuz-hero');
  const [globalProgress, setGlobalProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setGlobalProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      const midY = window.innerHeight / 2;
      let closest = HORMUZ_SECTIONS[0].id;
      let closestDist = Infinity;

      for (const section of HORMUZ_SECTIONS) {
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
