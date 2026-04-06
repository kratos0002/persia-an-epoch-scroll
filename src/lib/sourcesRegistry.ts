// ─── The Archive: Sources & Further Reading ───
//
// Each source has a category (what it contributed) and an annotation
// (why it matters). Grouped by essay, then by category.

export interface Source {
  title: string;
  author: string;
  year: number | string;
  type: 'book' | 'archive' | 'map' | 'article' | 'testimony' | 'document' | 'dataset';
  annotation: string;
  url?: string;
}

export interface SourceCategory {
  label: string;
  sources: Source[];
}

export interface EssaySources {
  essayId: string;
  essayTitle: string;
  essaySubtitle: string;
  categories: SourceCategory[];
}

export const SOURCES_REGISTRY: EssaySources[] = [
  {
    essayId: 'radcliffe-line',
    essayTitle: 'The Radcliffe Line',
    essaySubtitle: '36 Days to Sever a Subcontinent',
    categories: [
      {
        label: 'For the boundary decisions',
        sources: [
          {
            title: 'Borders of the Soul',
            author: 'Lucy Chester',
            year: 2009,
            type: 'book',
            annotation: 'Revealed the Ferozepore reversal — how a sketch map sent to Governor Jenkins was quietly rewritten before the final award.',
          },
          {
            title: 'The Spoils of Partition',
            author: 'Vazira Fazila-Yacoobali Zamindar',
            year: 2007,
            type: 'book',
            annotation: 'Traced how the boundary created a permanent bureaucracy of displacement — permits, claims, custodians of "enemy property."',
          },
          {
            title: 'Birth of a Tragedy: Kashmir 1947',
            author: 'Alastair Lamb',
            year: 1994,
            type: 'book',
            annotation: 'The case that Gurdaspur was awarded to India to secure land access to Kashmir. Pakistan\'s strongest historiographic argument.',
          },
          {
            title: 'The Great Partition: The Making of India and Pakistan',
            author: 'Yasmin Khan',
            year: 2007,
            type: 'book',
            annotation: 'Placed Partition in a wider frame — not a single event but a process that began long before Radcliffe arrived and continues today.',
          },
        ],
      },
      {
        label: 'For the testimony',
        sources: [
          {
            title: 'The Other Side of Silence: Voices from the Partition of India',
            author: 'Urvashi Butalia',
            year: 1998,
            type: 'testimony',
            annotation: 'Oral histories from survivors on both sides of the line. The human cost that census tables cannot capture.',
          },
          {
            title: 'Midnight\'s Furies: The Deadly Legacy of India\'s Partition',
            author: 'Nisid Hajari',
            year: 2015,
            type: 'book',
            annotation: 'Reconstructed the violence of August–September 1947 day by day. The "ghost trains" and the 72-hour vacuum after independence.',
          },
          {
            title: 'Train to Pakistan',
            author: 'Khushwant Singh',
            year: 1956,
            type: 'book',
            annotation: 'A novel, but written by a witness. The Mano Majra chapter is the closest English-language prose has come to the experience of Partition in a border village.',
          },
        ],
      },
      {
        label: 'For the maps and data',
        sources: [
          {
            title: 'Census of India, 1941',
            author: 'Government of India',
            year: 1941,
            type: 'dataset',
            annotation: 'The six-year-old data Radcliffe worked from. Conducted under wartime conditions, obsolete before he opened it. The 1943 famine had displaced millions uncounted.',
          },
          {
            title: 'Report of the Bengal Boundary Commission',
            author: 'Sir Cyril Radcliffe',
            year: 1947,
            type: 'document',
            annotation: 'The Bengal Award itself. Murshidabad to India, Khulna to Pakistan, Chittagong Hill Tracts to Pakistan despite a 97% non-Muslim population.',
          },
          {
            title: 'Report of the Punjab Boundary Commission',
            author: 'Sir Cyril Radcliffe',
            year: 1947,
            type: 'document',
            annotation: 'The Punjab Award. Published two days after independence. The Ferozepore salient, the Gurdaspur question, the canal headworks — every contested decision.',
          },
          {
            title: 'The Bagge Award (Sylhet Boundary)',
            author: 'Justice Algot Bagge',
            year: 1950,
            type: 'document',
            annotation: 'The post-Radcliffe arbitration that cleaned up the Bengal–Assam boundary. A second partition surgery to correct the first.',
          },
        ],
      },
      {
        label: 'For the enclaves and disputes',
        sources: [
          {
            title: 'The Enclaves of India and Bangladesh',
            author: 'Brendan R. Whyte',
            year: 2002,
            type: 'book',
            annotation: 'The definitive cartographic study of the 162 enclaves — including Dahala Khagrabari, the world\'s only third-order enclave.',
          },
          {
            title: 'India-Bangladesh Land Boundary Agreement',
            author: 'Government of India & Government of Bangladesh',
            year: 2015,
            type: 'document',
            annotation: '68 years after Radcliffe, 52,000 people chose their nationality. Most chose the country they were already physically in.',
          },
          {
            title: 'Berubari Union and Exchange of Enclaves (Supreme Court of India)',
            author: 'Supreme Court of India',
            year: 1960,
            type: 'document',
            annotation: 'The ruling that ceding territory requires a constitutional amendment. A cartographer\'s inconsistency became a constitutional crisis.',
          },
        ],
      },
      {
        label: 'For the controversy',
        sources: [
          {
            title: 'Stern Reckoning: A Survey of Events Leading Up to and Following the Partition of India',
            author: 'Penderal Moon',
            year: 1961,
            type: 'book',
            annotation: 'A British civil servant\'s account. Unusually candid about the administrative failures and the acceleration of the timetable.',
          },
          {
            title: 'The Shadow of the Great Game: The Untold Story of India\'s Partition',
            author: 'Narendra Singh Sarila',
            year: 2005,
            type: 'book',
            annotation: 'Argued that Partition was driven by Cold War geopolitics — Britain wanted a Muslim-majority ally on the Soviet border.',
          },
          {
            title: 'Freedom at Midnight',
            author: 'Larry Collins & Dominique Lapierre',
            year: 1975,
            type: 'book',
            annotation: 'The popular account. Mountbatten as tragic hero. Radcliffe as overwhelmed amateur. Readable but contested by later scholarship.',
          },
        ],
      },
    ],
  },
  // Future essays will add their sources here:
  // { essayId: 'persia', ... },
  // { essayId: 'wisdom', ... },
];
