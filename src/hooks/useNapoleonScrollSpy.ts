import { useState, useEffect } from 'react';

export interface NapoleonSection {
  id: string;
  label: string;
  year: string;
}

export const NAPOLEON_SECTIONS: NapoleonSection[] = [
  { id: 'napoleon-hero',   label: 'The Rise and Fall',     year: '' },
  { id: 'revolution',      label: 'The Revolution',        year: '1789' },
  { id: 'toulon',          label: 'The Whiff of Grapeshot', year: '1793' },
  { id: 'italy-egypt',    label: 'Italy & Egypt',         year: '1796' },
  { id: 'emperor',         label: 'The Emperor',           year: '1804' },
  { id: 'austerlitz',      label: 'Sun of Austerlitz',     year: '1805' },
  { id: 'spanish-ulcer',   label: 'The Spanish Ulcer',     year: '1808' },
  { id: 'moscow',          label: 'Moscow',                year: '1812' },
  { id: 'waterloo',        label: 'Leipzig to Waterloo',   year: '1813' },
  { id: 'napoleon-epilogue', label: 'The Code Remains',    year: '' },
];

export function useNapoleonScrollSpy() {
  const [activeSection, setActiveSection] = useState('napoleon-hero');
  const [globalProgress, setGlobalProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setGlobalProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      const midY = window.innerHeight / 2;
      let closest = NAPOLEON_SECTIONS[0].id;
      let closestDist = Infinity;

      for (const section of NAPOLEON_SECTIONS) {
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
