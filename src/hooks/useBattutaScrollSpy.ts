import { useState, useEffect } from 'react';
import { BATTUTA_SECTIONS } from '@/components/visuals/battutaMapData';

export { BATTUTA_SECTIONS };

export function useBattutaScrollSpy() {
  const [activeSection, setActiveSection] = useState(BATTUTA_SECTIONS[0].id);
  const [globalProgress, setGlobalProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setGlobalProgress(docHeight > 0 ? scrollY / docHeight : 0);

      const mid = window.innerHeight / 2;
      let closest = BATTUTA_SECTIONS[0].id;
      let closestDist = Infinity;

      for (const section of BATTUTA_SECTIONS) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - mid);
        if (dist < closestDist) {
          closestDist = dist;
          closest = section.id;
        }
      }
      setActiveSection(closest);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { activeSection, globalProgress };
}
