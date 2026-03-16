import { useState, useEffect } from 'react';

export interface BerlinSection {
  id: string;
  label: string;
  year: string;
}

export const BERLIN_SECTIONS: BerlinSection[] = [
  { id: 'berlin-hero', label: 'Wilhelmstrasse 77', year: '' },
  { id: 'conference-room', label: 'The Conference Room', year: '1884' },
  { id: 'general-act', label: 'The General Act', year: '1885' },
  { id: 'pre-colonial', label: 'Pre-Colonial Africa', year: '' },
  { id: 'partition-timelapse', label: 'The Partition', year: '1881–1914' },
  { id: 'ethnic-fracture', label: 'The Ethnic Fracture', year: '' },
  { id: 'extraction', label: 'The Extraction', year: '1885–1908' },
  { id: 'direct-line', label: 'The Direct Line', year: 'Today' },
  { id: 'berlin-epilogue', label: 'Epilogue', year: '' },
];

export function useBerlinScrollSpy() {
  const [activeSection, setActiveSection] = useState('berlin-hero');
  const [globalProgress, setGlobalProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setGlobalProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      const midY = window.innerHeight / 2;
      let closest = BERLIN_SECTIONS[0].id;
      let closestDist = Infinity;

      for (const section of BERLIN_SECTIONS) {
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
