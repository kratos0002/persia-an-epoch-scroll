import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { Stamp, AdminParagraph, HumanVoice, Underline, RedInk, MarginNote } from './SeamSystem';
import {
  ENCLAVE_DETAILS,
  SIR_CREEK_DATA,
  BAGGE_AWARD,
  BERUBARI_UNION,
  GURDASPUR_KASHMIR,
  PERSPECTIVES_EXPANDED,
} from './radcliffeData';

const DossierDivider = () => (
  <div className="my-16 md:my-20 flex items-center gap-4 max-w-xs mx-auto">
    <div className="flex-1 h-px bg-radcliffe-grid/15" />
    <div className="w-1.5 h-1.5 rotate-45 border border-radcliffe-grid/20" />
    <div className="flex-1 h-px bg-radcliffe-grid/15" />
  </div>
);

const ExhibitLabel = ({ label }: { label: string }) => (
  <p className="font-survey text-[0.5rem] text-radcliffe-red/50 uppercase tracking-[0.3em] mb-4">{label}</p>
);

/* ── Enclaves SVG ─────────────────────── */
const EnclaveDotMap = () => (
  <svg viewBox="0 0 200 220" className="w-full max-w-xs">
    {/* Border line */}
    <line x1="100" y1="10" x2="100" y2="210" stroke="hsl(355 70% 45% / 0.25)" strokeWidth="1" strokeDasharray="3 2" />
    <text x="30" y="18" className="font-survey text-[6px] fill-radcliffe-ink/40">INDIA</text>
    <text x="140" y="18" className="font-survey text-[6px] fill-radcliffe-ink/40">BANGLADESH</text>
    {/* Indian enclaves in Bangladesh (right side) */}
    {Array.from({ length: 22 }).map((_, i) => (
      <circle
        key={`ie${i}`}
        cx={115 + (i % 5) * 14 + Math.sin(i * 1.7) * 4}
        cy={28 + Math.floor(i / 5) * 38 + Math.cos(i * 1.3) * 6}
        r="2.5"
        fill="hsl(30 85% 55% / 0.5)"
      />
    ))}
    {/* Bangladeshi enclaves in India (left side) */}
    {Array.from({ length: 10 }).map((_, i) => (
      <circle
        key={`be${i}`}
        cx={25 + (i % 4) * 16 + Math.cos(i * 2) * 4}
        cy={35 + Math.floor(i / 4) * 50 + Math.sin(i * 1.5) * 6}
        r="2.5"
        fill="hsl(150 45% 30% / 0.5)"
      />
    ))}
    {/* Counter-enclave highlight */}
    <circle cx="155" cy="120" r="8" fill="none" stroke="hsl(355 70% 45% / 0.3)" strokeWidth="0.5" strokeDasharray="2 1" />
    <circle cx="155" cy="120" r="2" fill="hsl(30 85% 55% / 0.7)" />
    <text x="166" y="123" className="font-survey text-[4.5px] fill-radcliffe-red/50">counter-enclave</text>
    {/* Legend */}
    <circle cx="25" cy="205" r="3" fill="hsl(30 85% 55% / 0.5)" />
    <text x="32" y="208" className="font-survey text-[5px] fill-radcliffe-ink/50">Indian in Bangladesh ({ENCLAVE_DETAILS.indianInBangladesh})</text>
    <circle cx="25" cy="215" r="3" fill="hsl(150 45% 30% / 0.5)" />
    <text x="32" y="218" className="font-survey text-[5px] fill-radcliffe-ink/50">Bangladeshi in India ({ENCLAVE_DETAILS.bangladeshInIndia})</text>
  </svg>
);

/* ── Sir Creek SVG ────────────────────── */
const SirCreekDiagram = () => (
  <svg viewBox="0 0 200 240" className="w-full max-w-xs">
    {/* Estuary shape */}
    <path d="M60,220 Q70,160 80,110 Q90,60 110,30" fill="none" stroke="hsl(185 40% 38% / 0.3)" strokeWidth="12" strokeLinecap="round" />
    {/* India's claim: mid-channel */}
    <path d="M60,220 Q70,160 80,110 Q90,60 110,30" fill="none" stroke="hsl(30 85% 55% / 0.6)" strokeWidth="1.5" strokeDasharray="4 3" />
    {/* Pakistan's claim: eastern bank */}
    <path d="M66,220 Q76,158 86,108 Q96,58 116,28" fill="none" stroke="hsl(150 45% 30% / 0.6)" strokeWidth="1.5" strokeDasharray="4 3" />
    {/* Labels */}
    <text x="20" y="100" className="font-survey text-[6px] fill-radcliffe-ink/40">GUJARAT</text>
    <text x="130" y="100" className="font-survey text-[6px] fill-radcliffe-ink/40">SINDH</text>
    <text x="115" y="28" className="font-survey text-[5px] fill-radcliffe-teal/60">Arabian Sea ↑</text>
    <text x="20" y="70" className="font-survey text-[5px] fill-radcliffe-saffron/60">India: mid-channel</text>
    <text x="110" y="75" className="font-survey text-[5px] fill-radcliffe-green/60">Pak: east bank</text>
    <text x="70" y="235" className="font-survey text-[6px] fill-radcliffe-grid/30">96 km estuary</text>
  </svg>
);

/* ── Failed Negotiations Timeline ─────── */
const NegotiationsTimeline = () => (
  <div className="mt-6 space-y-3">
    <p className="font-survey text-[0.5rem] text-radcliffe-grid uppercase tracking-[0.2em] mb-2">Failed Negotiations</p>
    {SIR_CREEK_DATA.failedNegotiations.map((n) => (
      <div key={n.year} className="flex gap-3 items-start">
        <span className="font-survey text-[0.6rem] text-radcliffe-red/60 font-bold shrink-0 w-8">{n.year}</span>
        <div className="flex-1 border-l border-radcliffe-grid/15 pl-3">
          <p className="font-survey text-[0.6rem] text-radcliffe-ink/60 leading-relaxed">{n.outcome}</p>
        </div>
      </div>
    ))}
  </div>
);

/* ── Gurdaspur Tehsil Table ───────────── */
const TehsilTable = () => (
  <div className="border border-radcliffe-grid/20 bg-radcliffe-cream">
    <div className="grid grid-cols-3 font-survey text-[0.5rem] text-radcliffe-grid uppercase tracking-[0.2em] border-b border-radcliffe-grid/15 px-4 py-2">
      <span>Tehsil</span>
      <span className="text-center">Muslim %</span>
      <span className="text-right">Awarded</span>
    </div>
    {GURDASPUR_KASHMIR.tehsils.map((t) => (
      <div
        key={t.name}
        className={`grid grid-cols-3 font-survey text-[0.65rem] px-4 py-2.5 border-b border-radcliffe-grid/10 last:border-b-0 ${
          t.allocation === 'Pakistan' ? 'bg-radcliffe-green/5' : ''
        }`}
      >
        <span className="text-radcliffe-ink font-medium">{t.name}</span>
        <span className={`text-center ${t.muslimPct > 50 ? 'text-radcliffe-red/70 font-bold' : 'text-radcliffe-ink/60'}`}>
          {t.muslimPct}%
        </span>
        <span className={`text-right font-bold ${t.allocation === 'India' ? 'text-radcliffe-saffron' : 'text-radcliffe-green'}`}>
          {t.allocation}
        </span>
      </div>
    ))}
  </div>
);

export const LivingBorderSection = () => (
  <section className="relative z-40 py-24 md:py-32 radcliffe-bg radcliffe-survey-grid radcliffe-grain overflow-hidden">
    <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-40">

      {/* ── Section Header ──────────────────── */}
      <RevealOnScroll>
        <Stamp>Living Border</Stamp>
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[0.06em] text-radcliffe-ink uppercase mt-6 mb-4">
          Disputes & Enclaves
        </h2>
        <p className="font-survey text-[0.75rem] text-radcliffe-grid mb-4 max-w-2xl">
          The Radcliffe Award's ambiguities continue to shape South Asian geopolitics. Many territorial disputes trace directly to 1947 — some resolved only decades later, some unresolved still.
        </p>
      </RevealOnScroll>

      {/* ── EXHIBIT A: The Enclaves ─────────── */}
      <RevealOnScroll>
        <div className="mt-12">
          <ExhibitLabel label="Exhibit A" />
          <h3 className="font-display text-2xl font-bold text-radcliffe-ink mb-6">The Enclaves</h3>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Left: text */}
            <div>
              <div className="relative">
                <AdminParagraph number="§9.1">
                  The Radcliffe Line created <RedInk>{ENCLAVE_DETAILS.total} enclaves</RedInk> — pockets of one country entirely surrounded by the other — along the India–East Pakistan border in northern Bengal. <Underline>{ENCLAVE_DETAILS.indianInBangladesh} Indian enclaves</Underline> lay inside East Pakistan; {ENCLAVE_DETAILS.bangladeshInIndia} Bangladeshi enclaves inside India. Among these were <RedInk>{ENCLAVE_DETAILS.counterEnclaves} counter-enclaves</RedInk> (enclaves within enclaves) and one counter-counter-enclave: <Underline>Dahala Khagrabari</Underline>, a fragment of India inside a fragment of Bangladesh inside India — the world's only third-order enclave.
                </AdminParagraph>
                <MarginNote>cartographic absurdity</MarginNote>
              </div>
              <div className="relative">
                <AdminParagraph number="§9.2">
                  The largest enclave, <Underline>Dahagram-Angarpota</Underline> ({ENCLAVE_DETAILS.dahagramAngarpota.areaKm2} sq km, population ~{ENCLAVE_DETAILS.dahagramAngarpota.population.toLocaleString()}), was functionally marooned inside India for decades. In {ENCLAVE_DETAILS.dahagramAngarpota.leaseYear}, India leased Bangladesh a corridor of its own land — the <RedInk>Tin Bigha Corridor</RedInk>, measuring {ENCLAVE_DETAILS.dahagramAngarpota.corridorDimensions} — to give the enclave's residents physical access to their own country. Full 24-hour access was not granted until <RedInk>{ENCLAVE_DETAILS.dahagramAngarpota.fullAccessYear}</RedInk>.
                </AdminParagraph>
                <MarginNote>India lending Bangladesh a strip of India so Bangladesh could reach Bangladesh</MarginNote>
              </div>
              <div className="relative">
                <AdminParagraph number="§9.3">
                  The <Underline>{ENCLAVE_DETAILS.landBoundaryAgreement.year} Land Boundary Agreement</Underline> dissolved all {ENCLAVE_DETAILS.landBoundaryAgreement.exchangedEnclaves} enclaves simultaneously. {ENCLAVE_DETAILS.landBoundaryAgreement.peopleAffected.toLocaleString()} people chose their nationality. The overwhelming majority chose the country they were already physically in — <RedInk>the map had never matched the ground</RedInk>. 68 years after Radcliffe drew his line, the line was finally redrawn to match reality.
                </AdminParagraph>
              </div>
            </div>
            {/* Right: visual */}
            <div>
              <div className="border border-radcliffe-grid/20 bg-radcliffe-cream p-5">
                <EnclaveDotMap />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="border border-radcliffe-grid/15 bg-radcliffe-cream py-3 px-2">
                  <p className="font-display text-xl font-bold text-radcliffe-ink">{ENCLAVE_DETAILS.total}</p>
                  <p className="font-survey text-[0.5rem] text-radcliffe-grid uppercase tracking-wider mt-1">Enclaves</p>
                </div>
                <div className="border border-radcliffe-grid/15 bg-radcliffe-cream py-3 px-2">
                  <p className="font-display text-xl font-bold text-radcliffe-red">{ENCLAVE_DETAILS.counterEnclaves}</p>
                  <p className="font-survey text-[0.5rem] text-radcliffe-grid uppercase tracking-wider mt-1">Counter</p>
                </div>
                <div className="border border-radcliffe-grid/15 bg-radcliffe-cream py-3 px-2">
                  <p className="font-display text-xl font-bold text-radcliffe-ink">{ENCLAVE_DETAILS.landBoundaryAgreement.year}</p>
                  <p className="font-survey text-[0.5rem] text-radcliffe-grid uppercase tracking-wider mt-1">Resolved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <DossierDivider />

      {/* ── EXHIBIT B: Sir Creek ────────────── */}
      <RevealOnScroll>
        <div>
          <ExhibitLabel label="Exhibit B" />
          <h3 className="font-display text-2xl font-bold text-radcliffe-ink mb-6">Sir Creek</h3>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Left: visual (reversed for rhythm) */}
            <div>
              <div className="border border-radcliffe-grid/20 bg-radcliffe-cream p-5">
                <SirCreekDiagram />
              </div>
              <NegotiationsTimeline />
            </div>
            {/* Right: text */}
            <div>
              <div className="relative">
                <AdminParagraph number="§9.4">
                  Sir Creek is a <RedInk>{SIR_CREEK_DATA.lengthKm}-kilometer tidal estuary</RedInk> in the {SIR_CREEK_DATA.location}. Radcliffe's Award stopped at the northern edge of the Rann and provided <RedInk>no definitive demarcation</RedInk> of this marshy, shifting border. India claims the boundary runs along the <Underline>mid-channel</Underline> (the thalweg principle, standard in international law). Pakistan claims it follows the <Underline>eastern bank</Underline>, citing a 1914 resolution of the Sindh government that pre-dates Partition.
                </AdminParagraph>
                <MarginNote>where does water end?</MarginNote>
              </div>
              <div className="relative">
                <AdminParagraph number="§9.5">
                  The dispute is not merely cartographic. Beyond the creek mouth lie <Underline>rich fishing grounds</Underline> in the Arabian Sea and potential <Underline>offshore oil and gas reserves</Underline>. The boundary's placement determines approximately <RedInk>{SIR_CREEK_DATA.disputedEezKm2.toLocaleString()} square kilometers</RedInk> of Exclusive Economic Zone — an enormous area of seabed and resources. The creek's tidal nature — it shifts — makes the dispute self-perpetuating.
                </AdminParagraph>
              </div>
              <div className="mt-6 border-l-2 border-radcliffe-teal/30 pl-4">
                <HumanVoice>
                  "Rivers change their course. They are unsuitable for use as fixed boundaries."
                </HumanVoice>
                <p className="font-survey text-[0.5rem] text-radcliffe-grid mt-2">
                  — Field Marshal Auchinleck, Commander-in-Chief, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <DossierDivider />

      {/* ── EXHIBIT C: Bagge Award ─────────── */}
      <RevealOnScroll>
        <div className="max-w-2xl mx-auto">
          <ExhibitLabel label="Exhibit C" />
          <h3 className="font-display text-2xl font-bold text-radcliffe-ink mb-6">The Bagge Award</h3>
          <div className="relative">
            <AdminParagraph number="§9.6">
              Radcliffe left the <RedInk>Bengal–Assam boundary incomplete</RedInk>. In the Sylhet district, where a referendum had produced a narrow vote for Pakistan, the precise sub-divisional boundaries remained contested. In {BAGGE_AWARD.year}, the Swedish jurist <Underline>{BAGGE_AWARD.adjudicator}</Underline> was appointed to resolve the residual boundary — the only post-Radcliffe international arbitration to modify the India-Pakistan line before 2015.
            </AdminParagraph>
            <MarginNote>cleaning up Radcliffe's mess</MarginNote>
          </div>
          <div className="relative">
            <AdminParagraph number="§9.7">
              The Bagge Award confirmed the detachment of <Underline>Karimganj sub-division</Underline> to India on the basis of the referendum results, but created further enclave anomalies in the process. It was, in effect, <RedInk>a second partition surgery</RedInk> to correct the first — and it too left scars.
            </AdminParagraph>
          </div>
        </div>
      </RevealOnScroll>

      <DossierDivider />

      {/* ── EXHIBIT D: Berubari Union ──────── */}
      <RevealOnScroll>
        <div className="max-w-2xl mx-auto">
          <ExhibitLabel label="Exhibit D" />
          <h3 className="font-display text-2xl font-bold text-radcliffe-ink mb-6">Berubari Union</h3>
          <div className="relative">
            <AdminParagraph number="§9.8">
              Berubari Union No. 12 was a wedge-shaped territory at the India–East Pakistan border near Jalpaiguri. Radcliffe's <RedInk>map placed it in India</RedInk>; his <RedInk>written description placed it in Pakistan</RedInk>. Map and text contradicted each other. In {BERUBARI_UNION.agreementYear}, Nehru and Pakistan's PM Noon agreed to split it — half to each country.
            </AdminParagraph>
            <MarginNote>the cartographer contradicted himself</MarginNote>
          </div>
          <div className="relative">
            <AdminParagraph number="§9.9">
              India's Supreme Court ruled in {BERUBARI_UNION.amendmentYear} that <Underline>ceding sovereign territory required a constitutional amendment</Underline>. The result was the <RedInk>{BERUBARI_UNION.amendmentNumber} Amendment to the Indian Constitution</RedInk> — passed solely to transfer {BERUBARI_UNION.areaKm2} square kilometers of land. Berubari established the precedent that India cannot give away territory by executive action alone. A cartographer's inconsistency became a constitutional crisis.
            </AdminParagraph>
            <MarginNote>8.76 sq km changed the constitution</MarginNote>
          </div>
        </div>
      </RevealOnScroll>

      <DossierDivider />

      {/* ── EXHIBIT E: Gurdaspur & Kashmir ─── */}
      <RevealOnScroll>
        <div>
          <ExhibitLabel label="Exhibit E" />
          <h3 className="font-display text-2xl font-bold text-radcliffe-ink mb-6">Gurdaspur & Kashmir Access</h3>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Left: text */}
            <div>
              <div className="relative">
                <AdminParagraph number="§9.10">
                  Gurdaspur district contained four tehsils. <RedInk>Three had slim Muslim majorities</RedInk>: Gurdaspur tehsil (51.14%), Batala (55.06%), and Shakargarh (77%). Only Pathankot was clearly non-Muslim. Strict demographic logic would have placed the district in Pakistan. Radcliffe awarded three tehsils to India and only Shakargarh to Pakistan — citing the need to preserve the <Underline>upper Bari Doab canal system</Underline> and road infrastructure.
                </AdminParagraph>
                <MarginNote>the "other factors" clause again</MarginNote>
              </div>
              <div className="relative">
                <AdminParagraph number="§9.11">
                  The consequence was <RedInk>strategic, not hydraulic</RedInk>. Pathankot and Gurdaspur tehsils provided India's only contiguous land route to Jammu and Kashmir. Without them, India would have had <RedInk>no way to move troops</RedInk> into Kashmir when the tribal invasion came in October 1947. Pakistan has argued ever since that this was deliberate — that the "other factors" clause was deployed specifically to give India access to Kashmir.
                </AdminParagraph>
              </div>
              <div className="mt-6 border-l-2 border-radcliffe-teal/30 pl-4">
                <HumanVoice>
                  "If Gurdaspur had gone to Pakistan, there would have been no Kashmir dispute — because India would have had no way to get there."
                </HumanVoice>
                <p className="font-survey text-[0.5rem] text-radcliffe-grid mt-2">
                  — Alastair Lamb, historian
                </p>
              </div>
            </div>
            {/* Right: table */}
            <div>
              <p className="font-survey text-[0.5rem] text-radcliffe-grid uppercase tracking-[0.2em] mb-3">Gurdaspur District — Tehsil Allocation</p>
              <TehsilTable />
              <p className="font-survey text-[0.6rem] text-radcliffe-ink/50 mt-4 leading-relaxed">
                Three of four tehsils had Muslim majorities. All three were awarded to India. The fourth — Shakargarh — went to Pakistan. The road to Kashmir ran through the three.
              </p>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* ── Thick divider before Perspectives ── */}
      <div className="my-20 md:my-24 flex items-center gap-4 max-w-sm mx-auto">
        <div className="flex-1 h-px bg-radcliffe-grid/20" />
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rotate-45 border border-radcliffe-grid/25" />
          <div className="w-1.5 h-1.5 rotate-45 bg-radcliffe-grid/15" />
          <div className="w-1.5 h-1.5 rotate-45 border border-radcliffe-grid/25" />
        </div>
        <div className="flex-1 h-px bg-radcliffe-grid/20" />
      </div>

      {/* ── Three Perspectives ──────────────── */}
      <RevealOnScroll>
        <Stamp>Historiography</Stamp>
        <h3 className="font-display text-2xl font-bold text-radcliffe-ink uppercase tracking-wide mt-6 mb-8">
          Three Perspectives
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {PERSPECTIVES_EXPANDED.map((p) => (
            <div key={p.id} className={`border-l-2 border-${p.color} pl-4`}>
              <p className={`font-survey text-[0.6rem] text-${p.color} uppercase tracking-[0.25em] font-bold mb-2`}>
                {p.label}
              </p>
              <p className="font-survey text-[0.75rem] text-radcliffe-ink font-bold mb-3">
                {p.summary}
              </p>
              <p className="font-survey text-[0.65rem] text-radcliffe-ink/70 leading-relaxed">
                {p.expanded}
              </p>
            </div>
          ))}
        </div>
      </RevealOnScroll>

    </div>
  </section>
);
