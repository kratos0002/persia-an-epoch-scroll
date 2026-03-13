import { useState, useEffect } from 'react';

export interface MongolIndiaSection {
  id: string;
  label: string;
  year: string;
}

export const MONGOL_INDIA_SECTIONS: MongolIndiaSection[] = [
  { id: 'mi-hero', label: 'The Wall That Held', year: '' },
  { id: 'mi-indus', label: 'Genghis at the Indus', year: '1221' },
  { id: 'mi-waves', label: 'The Waves', year: '1241–1303' },
  { id: 'mi-khalji', label: "Khalji's Shield", year: '1296' },
  { id: 'mi-battles', label: 'The Battles', year: '1299–1306' },
  { id: 'mi-why', label: 'Why India Survived', year: '' },
  { id: 'mi-price', label: 'The Price', year: '1303–1316' },
  { id: 'mi-epilogue', label: 'Epilogue', year: '' },
];

export function useMongolIndiaScrollSpy() {
  const [activeSection, setActiveSection] = useState('mi-hero');
  const [globalProgress, setGlobalProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setGlobalProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      const midY = window.innerHeight / 2;
      let closest = MONGOL_INDIA_SECTIONS[0].id;
      let closestDist = Infinity;

      for (const section of MONGOL_INDIA_SECTIONS) {
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
