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
            url: 'https://en.wikisource.org/wiki/Radcliffe_Award/Report_of_the_Bengal_Boundary_Commission',
          },
          {
            title: 'Report of the Punjab Boundary Commission',
            author: 'Sir Cyril Radcliffe',
            year: 1947,
            type: 'document',
            annotation: 'The Punjab Award. Published two days after independence. The Ferozepore salient, the Gurdaspur question, the canal headworks — every contested decision.',
            url: 'https://eos.learnpunjabi.org/PUNJAB_BOUNDARY_COMMISSION',
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
            url: 'https://orfonline.org/research/the-2015-india-bangladesh-land-boundary-agreement-identifying-constraints-and-exploring-possibilities-in-cooch-behar',
          },
          {
            title: 'Berubari Union and Exchange of Enclaves (Supreme Court of India)',
            author: 'Supreme Court of India',
            year: 1960,
            type: 'document',
            annotation: 'The ruling that ceding territory requires a constitutional amendment. A cartographer\'s inconsistency became a constitutional crisis.',
          },
          {
            title: 'Contextualizing Migration: The India-Bangladesh Land Swap Deal of 2015',
            author: 'James Madison University (Scholarly Commons)',
            year: 2015,
            type: 'article',
            annotation: 'An academic analysis of the historical and political context behind the enclave exchange — why it took 68 years to redraw a line everyone knew was wrong.',
            url: 'https://commons.lib.jmu.edu/honors201019/148/',
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
      {
        label: 'For the Sir Creek dispute',
        sources: [
          {
            title: 'The Sir Creek Boundary Dispute: A Victim of India-Pakistan Linkage Politics',
            author: 'Durham University',
            year: 2013,
            type: 'article',
            annotation: 'Why a 96-kilometer tidal estuary remains unresolved — the dispute is hostage to the larger India-Pakistan relationship.',
            url: 'https://durham.ac.uk/research/institutes-and-centres/ibru-centre-for-borders-research/',
          },
          {
            title: 'Sir Creek and its Legal and Political Significance and Resolution',
            author: 'Semantic Scholar',
            year: 2018,
            type: 'article',
            annotation: 'International law analysis of the competing claims — mid-channel vs. eastern bank — and why neither side will submit to arbitration.',
            url: 'https://pdfs.semanticscholar.org/sir-creek-legal-political-significance',
          },
        ],
      },
      {
        label: 'For the broader context',
        sources: [
          {
            title: 'Radcliffe Line (Encyclopedia Britannica)',
            author: 'Encyclopaedia Britannica',
            year: 2024,
            type: 'article',
            annotation: 'The standard reference entry. Clear, concise, and regularly updated. Start here if you\'re new to the subject.',
            url: 'https://www.britannica.com/event/Radcliffe-Line',
          },
          {
            title: 'How Britain\'s 1947 Radcliffe Line Created Today\'s India-Bangladesh Border Problems',
            author: 'London School of Economics (LSE Blog)',
            year: 2017,
            type: 'article',
            annotation: 'Academic analysis connecting the 1947 line to present-day border management challenges — fencing, enclaves, and cross-border communities.',
            url: 'https://blogs.lse.ac.uk/southasia/2017/08/15/how-britains-1947-radcliffe-line-created-todays-india-bangladesh-border-problems/',
          },
          {
            title: 'Five Weeks\' Notice: The Rush to Partition a Subcontinent',
            author: 'Live History India',
            year: 2020,
            type: 'article',
            annotation: 'A well-illustrated popular history of the 36-day timeline. Good for visual thinkers approaching the topic for the first time.',
            url: 'https://www.livehistoryindia.com/story/eras/five-weeks-notice',
          },
          {
            title: 'The Radcliffe Award of August 1947: A Reappraisal',
            author: 'Academia.edu',
            year: 2019,
            type: 'article',
            annotation: 'A scholarly reappraisal focusing on Mountbatten\'s role in the deliberation and implementation of the Award. The viceregal fingerprints on the line.',
            url: 'https://www.academia.edu/radcliffe-award-reappraisal',
          },
          {
            title: 'Partition Violence, Mountbatten and the Sikhs: A Reassessment',
            author: 'Taylor & Francis (South Asia)',
            year: 2017,
            type: 'article',
            annotation: 'Reassesses the Sikh dimension of Partition violence — 6 million people too widely scattered for any boundary to protect.',
            url: 'https://www.tandfonline.com/doi/full/10.1080/00856401.2017.1367713',
          },
          {
            title: 'Boundary Disputes between India and Pakistan (Bengal Boundary)',
            author: 'United Nations International Law',
            year: 1950,
            type: 'document',
            annotation: 'The UN\'s own record of the Bengal boundary disputes — the international legal dimension of a line drawn in five weeks.',
            url: 'https://legal.un.org/ilc/documentation/english/a_cn4_l27.pdf',
          },
          {
            title: 'Mountbatten Radio Broadcast (Sound Recording)',
            author: 'The National Archives (UK)',
            year: 1947,
            type: 'archive',
            annotation: 'The last Viceroy\'s own voice, broadcasting the transfer of power. The accent of empire signing its own death warrant.',
            url: 'https://www.nationalarchives.gov.uk/education/resources/the-road-to-partition/',
          },
          {
            title: 'The Partition and the Chakmas',
            author: 'Archive.org (Primary Document)',
            year: 1947,
            type: 'testimony',
            annotation: 'How the Chittagong Hill Tracts — 97% non-Muslim — were given to Pakistan. The Chakma leaders hoisted the Indian flag, then were told they belonged to another country.',
            url: 'https://ia600405.us.archive.org/view_archive.php?archive=/35/items/THE_PARTITION_THE_CHAXMAS',
          },
          {
            title: 'Muslim League Attack on Sikhs and Hindus in the Punjab 1947',
            author: 'Archive.org (Primary Document)',
            year: 1947,
            type: 'archive',
            annotation: 'A contemporaneous account of the communal violence in Punjab. The raw material of the catastrophe the boundary was supposed to prevent.',
            url: 'https://archive.org/details/MuslimLeagueAttackOnSikhsAndHindusInThePunjab1947',
          },
          {
            title: 'Borders and Conflict in South Asia: The Radcliffe Boundary Commission',
            author: 'Manchester University Press',
            year: 2007,
            type: 'book',
            annotation: 'An academic study of how the boundary commissions operated — and how the conflicts they created persist as structural features of South Asian geopolitics.',
            url: 'https://manchesterhive.com/display/9780719069840/9780719069840.xml',
          },
        ],
      },
    ],
  },
  // Future essays will add their sources here:
  // { essayId: 'persia', ... },
  // { essayId: 'wisdom', ... },
];
