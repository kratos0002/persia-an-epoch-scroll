import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SHAKTI_PEETHS } from '@/components/visuals/shaktiPeethData';
import { geometryToPath, projectPoint, SOUTH_ASIA_COUNTRIES, SOUTH_ASIA_GEOJSON_URL } from './shaktiGeo';
import { ShaktiSectionShell } from './ShaktiSectionShell';

const WIDTH = 760;
const HEIGHT = 760;

const FILTERS = {
  body: ['all', 'head', 'torso', 'limb', 'ornament', 'abstract'] as const,
  country: ['all', 'India', 'Pakistan', 'Bangladesh', 'Nepal', 'China', 'Sri Lanka'] as const,
  status: ['all', 'active', 'disputed', 'ruins'] as const,
};

export const SacredBodyAtlas = () => {
  const [features, setFeatures] = useState<any[]>([]);
  const [bodyFilter, setBodyFilter] = useState<(typeof FILTERS.body)[number]>('all');
  const [countryFilter, setCountryFilter] = useState<(typeof FILTERS.country)[number]>('all');
  const [statusFilter, setStatusFilter] = useState<(typeof FILTERS.status)[number]>('all');
  const [selectedId, setSelectedId] = useState('kamakhya');

  useEffect(() => {
    let cancelled = false;
    fetch(SOUTH_ASIA_GEOJSON_URL)
      .then((response) => response.json())
      .then((data) => {
        if (cancelled) return;
        const filtered = (data.features || []).filter((feature: any) => SOUTH_ASIA_COUNTRIES.includes(feature?.properties?.ADMIN));
        setFeatures(filtered);
      })
      .catch(() => setFeatures([]));

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredSites = useMemo(
    () =>
      SHAKTI_PEETHS.filter((site) => (bodyFilter === 'all' ? true : site.bodyCategory === bodyFilter))
        .filter((site) => (countryFilter === 'all' ? true : site.country === countryFilter))
        .filter((site) => (statusFilter === 'all' ? true : site.status === statusFilter)),
    [bodyFilter, countryFilter, statusFilter],
  );

  useEffect(() => {
    if (!filteredSites.find((site) => site.id === selectedId)) {
      setSelectedId(filteredSites[0]?.id ?? 'kamakhya');
    }
  }, [filteredSites, selectedId]);

  const selected = filteredSites.find((site) => site.id === selectedId) ?? filteredSites[0];

  return (
    <ShaktiSectionShell
      id="shakti-atlas"
      eyebrow="Centerpiece"
      title="The goddess-body becomes a map"
      intro="Instead of one prescribed route, the atlas lets the reader move through the peethas by anatomy, region, country, and ritual status."
    >
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(22rem,0.8fr)] xl:items-start">
        <div className="shakti-panel overflow-hidden p-4 md:p-6">
          <div className="mb-5 flex flex-wrap gap-2">
            {FILTERS.body.map((option) => (
              <button key={option} onClick={() => setBodyFilter(option)} className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${bodyFilter === option ? 'bg-shakti-vermilion text-shakti-ink' : 'border border-shakti-line/20 bg-shakti-night/20 text-shakti-ink/70'}`}>
                {option}
              </button>
            ))}
          </div>
          <div className="mb-5 flex flex-wrap gap-2">
            {FILTERS.country.map((option) => (
              <button key={option} onClick={() => setCountryFilter(option)} className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${countryFilter === option ? 'bg-shakti-gold text-shakti-night' : 'border border-shakti-line/20 bg-shakti-night/20 text-shakti-ink/70'}`}>
                {option}
              </button>
            ))}
            {FILTERS.status.map((option) => (
              <button key={option} onClick={() => setStatusFilter(option)} className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${statusFilter === option ? 'bg-shakti-lotus text-shakti-night' : 'border border-shakti-line/20 bg-shakti-night/20 text-shakti-ink/70'}`}>
                {option}
              </button>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-shakti-line/15 bg-[radial-gradient(circle_at_50%_40%,hsl(var(--shakti-gold)/0.06),transparent_28%),linear-gradient(180deg,hsl(var(--shakti-night)/0.72),hsl(var(--shakti-panel)/0.92))] p-4">
            <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full">
              {features.map((feature, index) => (
                <path
                  key={feature.properties?.ADM0_A3 ?? index}
                  d={geometryToPath(feature.geometry, WIDTH, HEIGHT)}
                  fill="hsl(var(--shakti-ash) / 0.82)"
                  stroke="hsl(var(--shakti-line) / 0.25)"
                  strokeWidth="1.4"
                />
              ))}

              <path
                d="M376 154 C406 160 430 186 436 220 C474 258 482 330 464 392 C446 452 424 496 410 554 C394 624 382 674 376 714 C356 670 336 626 308 568 C282 512 248 458 242 394 C236 322 256 262 294 226 C304 188 336 162 376 154 Z"
                fill="hsl(var(--shakti-gold) / 0.06)"
                stroke="hsl(var(--shakti-gold) / 0.28)"
                strokeWidth="2"
                strokeDasharray="8 10"
              />
              <circle cx="376" cy="206" r="22" fill="hsl(var(--shakti-gold) / 0.08)" stroke="hsl(var(--shakti-gold) / 0.38)" strokeWidth="2" />

              {filteredSites.map((site, index) => {
                const { x, y } = projectPoint(site.coords[0], site.coords[1], WIDTH, HEIGHT);
                const isSelected = site.id === selected?.id;
                return (
                  <g key={site.id} onClick={() => setSelectedId(site.id)} className="cursor-pointer">
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 14 : 9}
                      fill={isSelected ? 'hsl(var(--shakti-gold) / 0.2)' : 'hsl(var(--shakti-vermilion) / 0.14)'}
                      initial={{ opacity: 0, scale: 0.4 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.35, delay: index * 0.01 }}
                    />
                    <circle cx={x} cy={y} r={isSelected ? 6 : 4.5} fill={isSelected ? 'hsl(var(--shakti-gold))' : 'hsl(var(--shakti-lotus))'} stroke="hsl(var(--shakti-night))" strokeWidth="1.5" />
                    {isSelected && (
                      <>
                        <path d={`M ${x} ${y} C ${x + 28} ${y - 20} ${x + 52} ${y - 18} ${x + 76} ${y - 20}`} fill="none" stroke="hsl(var(--shakti-gold) / 0.85)" strokeWidth="2" />
                        <text x={x + 82} y={y - 18} fill="hsl(var(--shakti-gold))" fontSize="16" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                          {site.name}
                        </text>
                      </>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {selected && (
          <motion.aside
            key={selected.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="shakti-panel sticky top-24 p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-shakti-gold/78">Selected site</p>
            <h3 className="mt-3 font-display text-4xl text-shakti-ink">{selected.name}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {[selected.country, selected.bodyCategory, selected.status].map((item) => (
                <span key={item} className="rounded-full border border-shakti-line/20 bg-shakti-night/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-shakti-ink/72">
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-shakti-ink/48">Body fragment</p>
                <p className="mt-2 font-body text-xl text-shakti-ink/86">{selected.bodyPart}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-shakti-ink/48">Shakti / Bhairava</p>
                <p className="mt-2 font-body text-xl text-shakti-ink/86">{selected.shakti} · {selected.bhairava}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-shakti-ink/48">Presence form</p>
                <p className="mt-2 font-body text-xl text-shakti-ink/86">{selected.manifestationType}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-shakti-ink/48">Living significance</p>
                <p className="mt-2 font-body text-lg leading-relaxed text-shakti-ink/78">{selected.currentSignificance}</p>
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-shakti-line/15 bg-shakti-night/20 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-shakti-ink/48">Source traditions</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selected.sourceTraditions.map((tradition) => (
                  <span key={tradition} className="rounded-full bg-shakti-vermilion/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-shakti-ink/74">
                    {tradition}
                  </span>
                ))}
              </div>
            </div>
          </motion.aside>
        )}
      </div>
    </ShaktiSectionShell>
  );
};