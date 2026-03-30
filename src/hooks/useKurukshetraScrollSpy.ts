import { useEffect, useState } from 'react';
import { KURUKSHETRA_SECTIONS, SECTION_PHASE, WarPhase } from '@/components/kurukshetra/kurukshetraData';

export { KURUKSHETRA_SECTIONS };

export function useKurukshetraScrollSpy() {
  const [activeSection, setActiveSection] = useState<string>(KURUKSHETRA_SECTIONS[0].id);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<WarPhase>(1);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setGlobalProgress(docHeight > 0 ? scrollY / docHeight : 0);

      const mid = window.innerHeight / 2;
      let closest = KURUKSHETRA_SECTIONS[0].id as string;
      let closestDist = Infinity;

      for (const section of KURUKSHETRA_SECTIONS) {
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
      setCurrentPhase(SECTION_PHASE[closest] ?? 1);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { activeSection, globalProgress, currentPhase };
}
