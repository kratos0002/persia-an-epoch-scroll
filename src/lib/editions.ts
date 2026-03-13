export interface ChangelogEntry {
  version: string;
  date: string;
  note: string;
}

export interface EditionMeta {
  edition: string;
  version: string;
  lastUpdated: string;
  changelog: ChangelogEntry[];
}

export const EDITIONS: Record<string, EditionMeta> = {
  persia: {
    edition: 'First Edition',
    version: '1.0',
    lastUpdated: 'March 2026',
    changelog: [
      { version: '1.0', date: 'March 2026', note: 'Initial essay — Achaemenid through Modern Iran' },
    ],
  },
  wisdom: {
    edition: 'First Edition',
    version: '1.0',
    lastUpdated: 'March 2026',
    changelog: [
      { version: '1.0', date: 'March 2026', note: 'Initial essay — the House of Wisdom, 762–1258 CE' },
    ],
  },
  buddhism: {
    edition: 'First Edition',
    version: '1.0',
    lastUpdated: 'March 2026',
    changelog: [
      { version: '1.0', date: 'March 2026', note: 'Initial essay — from the Bodhi Tree to global spread' },
    ],
  },
  samurai: {
    edition: 'First Edition',
    version: '1.0',
    lastUpdated: 'March 2026',
    changelog: [
      { version: '1.0', date: 'March 2026', note: 'Initial essay — stipends, bonds, and abolition' },
    ],
  },
  rebellion: {
    edition: 'First Edition',
    version: '1.0',
    lastUpdated: 'March 2026',
    changelog: [
      { version: '1.0', date: 'March 2026', note: 'Initial essay — the signal and the fire, 1857' },
    ],
  },
  napoleon: {
    edition: 'First Edition',
    version: '1.0',
    lastUpdated: 'March 2026',
    changelog: [
      { version: '1.0', date: 'March 2026', note: 'Initial essay' },
    ],
  },
  constantinople: {
    edition: 'First Edition',
    version: '1.0',
    lastUpdated: 'March 2026',
    changelog: [
      { version: '1.0', date: 'March 2026', note: 'Initial essay' },
    ],
  },
  'india-states': {
    edition: 'First Edition',
    version: '1.0',
    lastUpdated: 'March 2026',
    changelog: [
      { version: '1.0', date: 'March 2026', note: 'Initial essay' },
    ],
  },
  'mongol-india': {
    edition: 'First Edition',
    version: '1.0',
    lastUpdated: 'March 2026',
    changelog: [
      { version: '1.0', date: 'March 2026', note: 'Initial essay — the wall that held, 1221–1327' },
    ],
  },
  nuclear: {
    edition: 'First Edition',
    version: '1.0',
    lastUpdated: 'March 2026',
    changelog: [
      { version: '1.0', date: 'March 2026', note: 'Initial essay — the chain reaction, 1945–2017' },
    ],
  },
};
