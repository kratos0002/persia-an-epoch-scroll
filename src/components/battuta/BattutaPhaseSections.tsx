import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { IB, PHASES } from '@/components/visuals/battutaMapData';
import { RihlaQuote } from './RihlaQuote';
import { CompassRose } from './CompassRose';

/* ── Phase-specific narrative content ── */
const PHASE_CONTENT: Record<string, {
  title: string;
  subtitle: string;
  body: string[];
  quote?: { text: string; attribution: string };
  accent?: string;
}> = {
  'battuta-genesis': {
    title: 'Tangier',
    subtitle: 'The Genesis of a Voyager',
    body: [
      'Born on February 24, 1304, in Tangier, Morocco, Ibn Battuta was a descendant of the Lawata tribe — a Berber clan with a long tradition of producing Islamic legal scholars and judges. His full lineage establishes him as deeply embedded in the ulama, the learned class of the Marinid dynasty.',
      'Growing up in Tangier, the young scholar underwent a rigorous education in the Sunni Maliki school of jurisprudence. His studies centered on the Quran, hadith, and the complexities of Maliki fiqh. This training was essentially a professional program for the office of qadi — a judge responsible not only for religious matters but also for civil administration, marriage contracts, and the resolution of commercial disputes.',
      'When Ibn Battuta departed Tangier in June 1325 at the age of 21, Morocco was under the stable rule of the Marinid dynasty. Tangier itself was a strategic maritime hub at the Pillars of Hercules, exposing the young man to a constant stream of merchants, sailors, and pilgrims.',
    ],
    accent: 'His Maliki training would become his "jurisprudential passport" — securing him high-ranking positions in courts from the Maldives to Delhi.',
  },
  'phase-1': {
    title: 'North Africa to the Holy Cities',
    subtitle: 'Phase I: 1325–1326',
    body: [
      'This initial phase covered approximately 3,500 kilometres from Tangier to Mecca. Traveling at first alone on a donkey, Ibn Battuta eventually joined a pilgrim caravan for protection against the banditry common in the sparsely populated regions of the Maghrib.',
      'In Tunis, he was appointed the qadi of the caravan — his first professional role on the road. In Alexandria, he witnessed the decaying Pharos Lighthouse, one of the Seven Wonders of the Ancient World, reduced to a ruin. In Cairo, he was overwhelmed by what he called the "Mother of Cities," a metropolis of 600,000 people.',
      'He joined the official Damascus Hajj caravan for the final leg to Mecca, completing his first Hajj in late 1326. During this phase, he encountered the Mamluk Sultanate, which governed Egypt and Syria as a unified kingdom with separate docks for Christian and Muslim merchant ships in Alexandria.',
    ],
    quote: {
      text: 'I arrived at length at Cairo, mother of cities... mistress of broad regions and fruitful lands, boundless in multitude of buildings, peerless in beauty and splendour, the meeting place of comer and goer... She surges as the waves of the sea with her throngs of folk.',
      attribution: 'Ibn Battuta on Cairo, 1326',
    },
  },
  'phase-2': {
    title: 'Iraq, Persia & the Swahili Coast',
    subtitle: 'Phase II: 1326–1332',
    body: [
      'Following his first Hajj, Ibn Battuta detoured into the Ilkhanate, the Mongol-ruled territory of Iraq and Persia. This region was still recovering from the devastation of the 13th-century Mongol invasions, yet Ibn Battuta noted the grandeur of cities like Tabriz, which remained major Silk Road hubs.',
      'His voyage down the East African coast was a masterclass in monsoon-driven maritime travel. He visited Somalia and the trading city-states as far south as Kilwa in modern-day Tanzania. In Mogadishu, he observed a Somali sultan who spoke Arabic but maintained local traditions, highlighting the hybridity of Swahili culture.',
      'In Kilwa, he praised the sultan\'s humility and described it as "one of the most beautiful cities in the world" — a place of coral-stone houses and sophisticated urban planning, rivaling any Mediterranean port.',
    ],
  },
  'phase-3': {
    title: 'Anatolia & the Golden Horde',
    subtitle: 'Phase III: 1332–1334',
    body: [
      'Seeking patronage in the legendary Delhi Sultanate, Ibn Battuta journeyed through Anatolia, then a patchwork of Turkmen beyliks following the decline of the Seljuks. He was particularly impressed by the fityan — youth associations of artisans who provided free lodging and protection to travelers.',
      'From the Black Sea port of Sinope, he crossed to the Crimea, entering the territory of the Golden Horde. He met Uzbeg Khan at his mobile capital — the ordu — a massive city of tents transported on wagons across the steppe.',
      'A notable detour occurred when he accompanied the Khan\'s wife, Princess Bayalun (a Byzantine princess), to Constantinople. His reaction to the Hagia Sophia was one of awe at its scale, though he noted with scholarly caution the Christian icons within.',
    ],
  },
  'phase-4': {
    title: 'The Paradox of Delhi',
    subtitle: 'Phase IV: 1334–1341',
    body: [
      'After crossing the Hindu Kush — a name he translates as "Hindu-slayer" due to the high mortality of slaves in the cold — he arrived at the court of Muhammad bin Tughluq in Delhi. His seven years in India constitute the most dramatic and detailed portion of the Rihla.',
      'Muhammad bin Tughluq was a man of radical extremes: a brilliant scholar of philosophy and logic who could also execute citizens daily for minor infractions. Ibn Battuta served as the Qadi of Delhi, receiving a massive salary but living in constant fear due to the Sultan\'s volatile nature.',
      'The Sultan\'s failed experiments — the introduction of token currency and the forced migration of Delhi\'s entire elite to Daulatabad — are recorded with a mix of fascination and horror. Ibn Battuta eventually left Delhi as an ambassador to the Yuan Dynasty, only for his mission to collapse in a shipwreck off the Malabar coast.',
    ],
    accent: 'Seven years of luxury and terror — the longest Ibn Battuta stayed anywhere.',
  },
  'phase-5': {
    title: 'From the Maldives to China',
    subtitle: 'Phase V: 1341–1346',
    body: [
      'Fearing the Sultan\'s wrath for the lost embassy, Ibn Battuta fled to the Maldives, where he again served as qadi for nearly two years. He married into the royal family but became embroiled in political intrigues, eventually leaving for Sri Lanka to visit Adam\'s Peak.',
      'His journey to China is one of the most debated sections of the Rihla. He landed at Quanzhou (Zaytun) and traveled by land through Hangzhou to Beijing. While he praised China\'s safety and the craftsmanship of its porcelain and silk, he was "greatly troubled" by the dominance of non-Islamic religion.',
      'Whether he actually reached Beijing remains an open question. His descriptions of northern China are far less detailed than his accounts of India or Anatolia, leading some scholars to suggest he relied on reports from fellow merchants in the Muslim quarters of Quanzhou.',
    ],
  },
  'phase-6': {
    title: 'The Great Mortality',
    subtitle: 'Phase VI: 1346–1349',
    body: [
      'As Ibn Battuta traveled home through the Middle East, he witnessed the devastating onset of the Black Death — the most catastrophic pandemic in human history. This section of the Rihla provides critical epidemiological data, as he recorded daily death tolls using information from funeral prayers and property tax records.',
      'In Damascus, he witnessed an extraordinary event: Muslims, Jews, and Christians gathering together in unified prayer against the plague. It was a moment of interfaith solidarity born from shared desperation.',
      'He arrived in Tangier in 1349, only to find his mother had died of the plague just months earlier. The homecoming that should have been triumphant was instead marked by grief.',
    ],
    quote: {
      text: 'Death has become so great, it has emptied the streets... The Jews came with their Book of the Law and the Christians with their Gospel... all of them with their women and children... weeping and supplicating and seeking the favour of God through His Books and His Prophets.',
      attribution: 'Ibn Battuta on the Black Death in Damascus, 1348',
    },
  },
  'phase-7': {
    title: 'Al-Andalus & the Mali Empire',
    subtitle: 'Phase VII: 1349–1354',
    body: [
      'After a brief trip to Granada to aid its defense against a Christian invasion, Ibn Battuta embarked on his final major journey: a trans-Saharan trek to the Mali Empire. The crossing from Sijilmasa covered 1,600 kilometres of desert, passing through the salt mines of Taghaza.',
      'He spent several months in the capital of Mansa Suleyman, offering a rare eyewitness account of West African society at its peak. While he admired Mali\'s security and the piety of its people, he was famously critical of local customs that deviated from North African norms.',
      'He was shocked by the relative freedom of women, who did not veil and maintained friendships with men outside their families, and by the matrilineal inheritance system. He finally returned to Fez in 1354, concluding his travels at the order of the Marinid Sultan Abu Inan Faris. The dictation of the Rihla to the scribe Ibn Juzayy began immediately.',
    ],
    quote: {
      text: 'The Negroes are of all people the most submissive to their king... They wear handsome white clothes every Friday... They are also very zealous in their attempts to learn the Quran by heart.',
      attribution: 'Ibn Battuta on the people of Mali, 1352',
    },
  },
};

/* ── Decorative divider ── */
const SaffronDivider = () => (
  <svg className="w-full max-w-xs mx-auto" height="16" viewBox="0 0 300 16" preserveAspectRatio="xMidYMid meet" fill="none">
    <line x1="0" y1="8" x2="120" y2="8" stroke={IB.SAFFRON} strokeWidth={0.5} opacity={0.4} />
    <line x1="180" y1="8" x2="300" y2="8" stroke={IB.SAFFRON} strokeWidth={0.5} opacity={0.4} />
    <polygon points="150,2 158,8 150,14 142,8" fill="none" stroke={IB.SAFFRON} strokeWidth={1} opacity={0.5} />
    <circle cx={150} cy={8} r={2} fill={IB.SAFFRON} opacity={0.4} />
  </svg>
);

/* ── Genesis section (before phases) ── */
export const BattutaGenesis = () => {
  const content = PHASE_CONTENT['battuta-genesis'];
  return (
    <section id="battuta-genesis" className="relative py-24 px-6" style={{ background: IB.PARCHMENT }}>
      <div className="max-w-2xl mx-auto">
        <RevealOnScroll>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4 text-center" style={{ color: IB.HENNA }}>
            Tangier, Morocco · 1304
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-2" style={{ color: IB.INK }}>
            {content.title}
          </h2>
          <p className="font-display text-xl text-center mb-8" style={{ color: IB.HENNA }}>
            {content.subtitle}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.15}><SaffronDivider /></RevealOnScroll>
        <div className="mt-10">
          {content.body.map((para, i) => (
            <RevealOnScroll key={i} delay={0.1 * i}>
              <p className="font-body text-base leading-[1.9] mb-6" style={{ color: IB.INK }}>{para}</p>
            </RevealOnScroll>
          ))}
          {content.accent && (
            <RevealOnScroll delay={0.3}>
              <p className="font-body text-sm italic text-center mt-8 py-4 px-6"
                style={{ color: IB.SAFFRON_DIM, borderTop: `1px solid ${IB.SAFFRON}30`, borderBottom: `1px solid ${IB.SAFFRON}30` }}>
                {content.accent}
              </p>
            </RevealOnScroll>
          )}
        </div>
      </div>
    </section>
  );
};

/* ── Phase section component ── */
interface PhaseSectionProps {
  phaseIndex: number;
}

export const PhaseSection = ({ phaseIndex }: PhaseSectionProps) => {
  const phase = PHASES[phaseIndex];
  const content = PHASE_CONTENT[phase.id];
  if (!content) return null;

  const isDark = phase.id === 'phase-4' || phase.id === 'phase-6';
  const bg = isDark ? IB.LEATHER : IB.PARCHMENT;
  const textColor = isDark ? IB.PARCHMENT : IB.INK;
  const accentColor = isDark ? IB.SAFFRON : IB.HENNA;

  return (
    <section id={phase.id} className="relative py-20 px-6" style={{ background: bg }}>
      {isDark && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }}
        />
      )}
      <div className="max-w-2xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: phase.color }} />
            <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold" style={{ color: phase.color }}>
              {phase.dateRange} · {phase.distance}
            </p>
            <div className="w-8 h-px" style={{ background: phase.color }} />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-2" style={{ color: textColor }}>
            {content.title}
          </h2>
          <p className="font-display text-lg text-center mb-8" style={{ color: accentColor }}>
            {content.subtitle}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}><SaffronDivider /></RevealOnScroll>

        <div className="mt-10">
          {content.body.map((para, i) => (
            <RevealOnScroll key={i} delay={0.1 * i}>
              <p className="font-body text-base leading-[1.9] mb-6" style={{ color: textColor }}>{para}</p>
            </RevealOnScroll>
          ))}

          {content.quote && (
            <RevealOnScroll delay={0.3}>
              <RihlaQuote attribution={content.quote.attribution}>
                {content.quote.text}
              </RihlaQuote>
            </RevealOnScroll>
          )}

          {content.accent && (
            <RevealOnScroll delay={0.35}>
              <p className="font-body text-sm italic text-center mt-8 py-4 px-6"
                style={{ color: isDark ? IB.SAFFRON : IB.SAFFRON_DIM, borderTop: `1px solid ${IB.SAFFRON}30`, borderBottom: `1px solid ${IB.SAFFRON}30` }}>
                {content.accent}
              </p>
            </RevealOnScroll>
          )}
        </div>

        {/* Stop cards */}
        <RevealOnScroll delay={0.2}>
          <div className="mt-12 grid gap-3">
            {phase.stops.map((stop, i) => (
              <motion.div
                key={stop.label + i}
                className="flex items-start gap-4 py-3 px-4"
                style={{
                  background: isDark ? `${IB.LEATHER_MID}80` : `${IB.PARCHMENT_DK}40`,
                  borderLeft: `3px solid ${phase.color}`,
                  borderRadius: 2,
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: phase.color }} />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-sm font-bold" style={{ color: textColor }}>{stop.label}</span>
                    <span className="text-[9px] font-body tracking-wider" style={{ color: phase.color }}>{stop.date}</span>
                  </div>
                  {stop.detail && (
                    <p className="font-body text-xs mt-0.5" style={{ color: textColor, opacity: 0.6 }}>{stop.detail}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
