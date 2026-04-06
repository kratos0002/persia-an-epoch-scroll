import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SHAKTI_PEETHS } from '@/components/visuals/shaktiPeethData';
import { geometryToPath, projectPoint, SOUTH_ASIA_COUNTRIES, SOUTH_ASIA_GEOJSON_URL } from './shaktiGeo';

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
    <section
      id="shakti-atlas"
      className="relative"
      style={{ background: 'hsl(var(--shakti-night))' }}
    >
      <div className="lg:flex lg:min-h-screen">
        {/* Left panel — scrollable content */}
        <div className="w-full px-6 py-16 lg:w-[40%] lg:px-10 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="shakti-chip mb-4 inline-flex">Centerpiece</p>
            <h2 className="shakti-title text-3xl md:text-5xl">The goddess-body becomes a map</h2>
            <p className="mt-4 max-w-lg font-body text-lg leading-relaxed text-shakti-ink/70">
              Instead of one prescribed route, the atlas lets the reader move through the peethas by anatomy, region, country, and ritual status.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="mt-8 space-y-3">
            <div className="flex flex-wrap gap-2">
              {FILTERS.body.map((option) => (
                <button key={option} onClick={() => setBodyFilter(option)} className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${bodyFilter === option ? 'bg-shakti-vermilion text-shakti-ink' : 'bg-shakti-night/60 text-shakti-ink/60 hover:text-shakti-ink/80'}`}>
                  {option}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.country.map((option) => (
                <button key={option} onClick={() => setCountryFilter(option)} className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${countryFilter === option ? 'bg-shakti-gold text-shakti-night' : 'bg-shakti-night/60 text-shakti-ink/60 hover:text-shakti-ink/80'}`}>
                  {option}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.status.map((option) => (
                <button key={option} onClick={() => setStatusFilter(option)} className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${statusFilter === option ? 'bg-shakti-lotus text-shakti-night' : 'bg-shakti-night/60 text-shakti-ink/60 hover:text-shakti-ink/80'}`}>
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Selected site detail */}
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 border-l-2 border-shakti-gold/40 pl-5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-shakti-gold/78">Selected</p>
              <h3 className="mt-2 font-display text-3xl text-shakti-ink">{selected.name}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {[selected.country, selected.bodyCategory, selected.status].map((item) => (
                  <span key={item} className="text-[10px] font-semibold uppercase tracking-[0.2em] text-shakti-ink/55">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-shakti-ink/40">Body fragment</p>
                  <p className="mt-1 font-body text-lg text-shakti-ink/86">{selected.bodyPart}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-shakti-ink/40">Shakti · Bhairava</p>
                  <p className="mt-1 font-body text-lg text-shakti-ink/86">{selected.shakti} · {selected.bhairava}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-shakti-ink/40">Presence form</p>
                  <p className="mt-1 font-body text-lg text-shakti-ink/86">{selected.manifestationType}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-shakti-ink/40">Living significance</p>
                  <p className="mt-1 font-body text-base leading-relaxed text-shakti-ink/78">{selected.currentSignificance}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-shakti-ink/40">Source traditions</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selected.sourceTraditions.map((tradition) => (
                      <span key={tradition} className="rounded-full bg-shakti-vermilion/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-shakti-ink/74">
                        {tradition}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Peetha list */}
          <div className="mt-10 space-y-0">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-shakti-ink/40">{filteredSites.length} sites</p>
            {filteredSites.map((site) => (
              <button
                key={site.id}
                onClick={() => setSelectedId(site.id)}
                className={`block w-full border-b border-shakti-line/10 py-3 text-left transition-colors hover:border-shakti-gold/20 ${site.id === selected?.id ? 'border-shakti-gold/30' : ''}`}
              >
                <span className={`font-display text-lg transition-colors ${site.id === selected?.id ? 'text-shakti-gold' : 'text-shakti-ink/80'}`}>
                  {site.name}
                </span>
                <span className="ml-3 text-[10px] uppercase tracking-[0.18em] text-shakti-ink/40">{site.bodyPart}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right panel — sticky map */}
        <div className="relative w-full lg:w-[60%] lg:sticky lg:top-0 lg:h-screen">
          <div className="flex h-full items-center justify-center p-4 lg:p-6">
            <div className="relative w-full" style={{ background: `radial-gradient(circle at 50% 40%, hsl(var(--shakti-gold) / 0.04), transparent 30%)` }}>
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
        </div>
      </div>
    </section>
  );
};
