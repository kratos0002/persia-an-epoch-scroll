import { useState, useEffect, useCallback } from 'react';

interface Section {
  id: string;
  label: string;
  year: string;
}

export const SECTIONS: Section[] = [
  { id: 'hero', label: 'Introduction', year: '' },
  { id: 'cyrus', label: 'Cyrus the Great', year: '550 BCE' },
  { id: 'pasargadae', label: 'Cyrus Cylinder', year: '539 BCE' },
  { id: 'darius', label: 'Darius & Persepolis', year: '518 BCE' },
  { id: 'persian-wars', label: 'Persian Wars', year: '499 BCE' },
  { id: 'alexander', label: "Alexander's Conquest", year: '334 BCE' },
  { id: 'parthian', label: 'Parthian Empire', year: '247 BCE' },
  { id: 'sassanid', label: 'Sassanid Empire', year: '224 CE' },
  { id: 'islamic-conquest', label: 'Islamic Conquest', year: '633 CE' },
  { id: 'golden-age', label: 'Golden Age', year: '800 CE' },
  { id: 'mongol', label: 'Mongol Invasion', year: '1219 CE' },
  { id: 'safavid', label: 'Safavid Empire', year: '1501 CE' },
  { id: 'modern', label: 'Modern Era', year: '1905 CE' },
  { id: 'epilogue', label: 'Legacy', year: 'Today' },
];

export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState('hero');
  const [globalProgress, setGlobalProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setGlobalProgress(docHeight > 0 ? scrollY / docHeight : 0);

    const sections = SECTIONS.map(s => {
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
