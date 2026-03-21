import { useEffect, useState } from 'react';
import { SHAKTI_SECTIONS } from '@/components/visuals/shaktiPeethData';

export { SHAKTI_SECTIONS };

export function useShaktiScrollSpy() {
  const [activeSection, setActiveSection] = useState<string>(SHAKTI_SECTIONS[0].id);
  const [globalProgress, setGlobalProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setGlobalProgress(docHeight > 0 ? scrollY / docHeight : 0);

      const mid = window.innerHeight / 2;
      let closest = SHAKTI_SECTIONS[0].id;
      let closestDist = Infinity;

      for (const section of SHAKTI_SECTIONS) {
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