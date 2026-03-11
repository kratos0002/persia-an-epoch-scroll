import { useState, useEffect, useCallback } from 'react';

export interface Section {
  id: string;
  label: string;
  year: string;
}

export const WISDOM_SECTIONS: Section[] = [
  { id: 'wisdom-hero', label: 'Introduction', year: '' },
  { id: 'round-city', label: 'The Round City', year: '762 CE' },
  { id: 'harun', label: 'The Collector', year: '786 CE' },
  { id: 'translation', label: 'Translation Movement', year: '830 CE' },
  { id: 'scholars', label: 'The Scholars', year: '850 CE' },
  { id: 'inventions', label: 'What They Built', year: '900 CE' },
  { id: 'ripple', label: 'The Ripple', year: '1100 CE' },
  { id: 'destruction', label: 'The Destruction', year: '1258 CE' },
  { id: 'wisdom-epilogue', label: 'What Survived', year: 'Today' },
];

export function useWisdomScrollSpy() {
  const [activeSection, setActiveSection] = useState('wisdom-hero');
  const [globalProgress, setGlobalProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setGlobalProgress(docHeight > 0 ? scrollY / docHeight : 0);

    const sections = WISDOM_SECTIONS.map(s => {
      const el = document.getElementById(s.id);
      if (!el) return { id: s.id, top: 0, bottom: 0 };
      const rect = el.getBoundingClientRect();
      return { id: s.id, top: rect.top, bottom: rect.bottom };
    });

    const viewportCenter = window.innerHeight / 2;
    let closest = sections[0];
    let closestDist = Infinity;
    for (const s of sections) {
      const center = (s.top + s.bottom) / 2;
      const dist = Math.abs(center - viewportCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = s;
      }
    }
    setActiveSection(closest.id);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { activeSection, globalProgress };
}
