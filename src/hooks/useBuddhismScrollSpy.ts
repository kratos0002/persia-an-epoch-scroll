import { useState, useEffect } from 'react';

export interface BuddhismSection {
  id: string;
  label: string;
  year: string;
}

export const BUDDHISM_SECTIONS: BuddhismSection[] = [
  { id: 'buddhism-hero', label: 'The Path That Split', year: '' },
  { id: 'awakening', label: 'The Awakening', year: '528 BCE' },
  { id: 'ashoka', label: 'Ashoka the Great', year: '268 BCE' },
  { id: 'first-split', label: 'The First Split', year: '~100 CE' },
  { id: 'theravada', label: 'The Southern Path', year: '~300 CE' },
  { id: 'mahayana', label: 'The Northern Path', year: '~200 CE' },
  { id: 'vajrayana', label: 'The Diamond Path', year: '~700 CE' },
  { id: 'branches', label: 'The Branches Within', year: '~1200 CE' },
  { id: 'modern-buddhism', label: 'Modern Buddhism', year: 'Today' },
  { id: 'buddhism-epilogue', label: 'Epilogue', year: '' },
];

export function useBuddhismScrollSpy() {
  const [activeSection, setActiveSection] = useState('buddhism-hero');
  const [globalProgress, setGlobalProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setGlobalProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      const midY = window.innerHeight / 2;
      let closest = BUDDHISM_SECTIONS[0].id;
      let closestDist = Infinity;

      for (const section of BUDDHISM_SECTIONS) {
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
