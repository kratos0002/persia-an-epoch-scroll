import { useState, useEffect } from 'react';

export interface RamayanaSection {
  id: string;
  label: string;
  year: string;
  phase: string;
}

export const RAMAYANA_SECTIONS: RamayanaSection[] = [
  { id: 'ramayana-hero', label: 'The Route', year: '', phase: 'The Departure' },
  { id: 'ayodhya', label: 'Ayodhya', year: 'Year 0', phase: 'The Departure' },
  { id: 'shringverpur', label: 'Shringverpur', year: 'Year 0', phase: 'The Departure' },
  { id: 'prayagraj', label: 'Prayagraj', year: 'Year 0', phase: 'The Departure' },
  { id: 'chitrakoot', label: 'Chitrakoot', year: 'Year 1', phase: 'The Departure' },
  { id: 'atri-ashram', label: 'Atri Ashram', year: 'Year 1', phase: 'The Departure' },
  { id: 'dandakaranya', label: 'Dandakaranya', year: 'Years 2–12', phase: 'The Wilderness' },
  { id: 'agastya-ashram', label: 'Agastya Ashram', year: 'Year 12', phase: 'The Wilderness' },
  { id: 'panchavati', label: 'Panchavati', year: 'Year 13', phase: 'The Wilderness' },
  { id: 'lepakshi', label: 'Lepakshi', year: 'Year 13', phase: 'The Search' },
  { id: 'shabari', label: 'Shabari', year: 'Year 13', phase: 'The Search' },
  { id: 'kishkindha', label: 'Kishkindha', year: 'Year 13', phase: 'The Search' },
  { id: 'kodikkarai', label: 'Kodikkarai', year: 'Year 14', phase: 'The War Path' },
  { id: 'rameshwaram', label: 'Rameshwaram', year: 'Year 14', phase: 'The War Path' },
  { id: 'dhanushkodi', label: 'Dhanushkodi', year: 'Year 14', phase: 'The War Path' },
  { id: 'ashok-vatika', label: 'Ashok Vatika', year: 'Year 13–14', phase: 'Lanka' },
  { id: 'ravana-ella', label: 'Ravana Ella', year: 'Year 14', phase: 'Lanka' },
  { id: 'ussangoda', label: 'Ussangoda', year: 'Year 14', phase: 'Lanka' },
  { id: 'lanka-war', label: 'Lanka', year: 'Year 14', phase: 'Lanka' },
  { id: 'divurumpola', label: 'Divurumpola', year: 'Year 14', phase: 'Lanka' },
  { id: 'ramayana-return', label: 'The Return', year: 'Year 14', phase: 'The Return' },
  { id: 'ramayana-epilogue', label: 'Epilogue', year: '', phase: '' },
];

export function useRamayanaScrollSpy() {
  const [activeSection, setActiveSection] = useState(RAMAYANA_SECTIONS[0].id);
  const [globalProgress, setGlobalProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setGlobalProgress(docHeight > 0 ? scrollY / docHeight : 0);

      const mid = window.innerHeight / 2;
      let closest = RAMAYANA_SECTIONS[0].id;
      let closestDist = Infinity;

      for (const section of RAMAYANA_SECTIONS) {
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
