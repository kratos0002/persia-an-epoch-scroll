import { useEffect, useState } from 'react';
import { OPIUM_SECTIONS } from '@/components/opium/opiumData';

export { OPIUM_SECTIONS };

export function useOpiumScrollSpy() {
  const [activeSection, setActiveSection] = useState(OPIUM_SECTIONS[0].id as string);
  const [globalProgress, setGlobalProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setGlobalProgress(docHeight > 0 ? scrollY / docHeight : 0);

      const mid = window.innerHeight / 2;
      let closest = OPIUM_SECTIONS[0].id as string;
      let closestDist = Infinity;

      for (const section of OPIUM_SECTIONS) {
        const element = document.getElementById(section.id);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
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
