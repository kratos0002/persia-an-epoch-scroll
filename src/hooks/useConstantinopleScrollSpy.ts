import { useState, useEffect, useCallback } from 'react';
import { CONSTANTINOPLE_SECTIONS } from '@/components/visuals/constantinopleData';

export { CONSTANTINOPLE_SECTIONS };

export function useConstantinopleScrollSpy() {
  const [activeSection, setActiveSection] = useState('surface');
  const [globalProgress, setGlobalProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setGlobalProgress(docHeight > 0 ? scrollY / docHeight : 0);

    const sections = CONSTANTINOPLE_SECTIONS.map(s => {
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
