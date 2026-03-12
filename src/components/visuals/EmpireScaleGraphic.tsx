import React from 'react';
import { InteractiveMap } from '@/components/visuals/InteractiveMap';

const scaleFacts = [
  { value: 'Nearly 1 in 2', label: 'people on Earth' },
  { value: '5.5M km²', label: 'under one rule' },
  { value: '3 continents', label: 'bound together' },
];

export const EmpireScaleGraphic = () => (
  <div className="relative h-full w-full overflow-hidden">
    <InteractiveMap
      empire="none"
      center={[33.5, 46]}
      zoom={3.85}
      showCities={false}
      animate={false}
      className="opacity-[0.82]"
    />

    <div className="pattern-persian absolute inset-0 opacity-[0.08]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_66%_30%,rgba(212,168,67,0.18),transparent_24%),linear-gradient(90deg,rgba(6,10,18,0.96)_0%,rgba(6,10,18,0.82)_32%,rgba(6,10,18,0.36)_56%,rgba(6,10,18,0.82)_100%)]" />

    <div className="pointer-events-none absolute inset-y-[12%] right-[8%] w-[52%] min-w-[620px]">
      <div className="relative flex h-full flex-col items-center justify-center">
        <div className="absolute inset-[10%_18%_26%_18%] rounded-full border border-[hsl(43,85%,55%,0.1)] bg-[radial-gradient(circle,rgba(212,168,67,0.1),rgba(212,168,67,0.02)_46%,transparent_72%)] blur-[2px]" />
        <div className="absolute inset-[16%_24%_34%_24%] rounded-full border border-[hsl(43,85%,55%,0.14)]" />

        <div className="relative text-center">
          <div className="text-[clamp(8rem,16vw,13rem)] font-display font-bold leading-[0.88] text-[rgba(212,168,67,0.22)] [text-shadow:0_0_42px_rgba(212,168,67,0.08)]">
            44%
          </div>
          <div className="mt-3 text-[12px] uppercase tracking-[0.42em] text-[hsl(43,70%,72%)]">
            of the world under one rule
          </div>
        </div>

        <div className="relative mt-10 w-[min(560px,90%)] rounded-[28px] border border-[hsl(43,85%,55%,0.16)] bg-[rgba(7,12,22,0.72)] px-7 py-6 shadow-[0_16px_48px_rgba(0,0,0,0.34)] backdrop-blur-md">
          <div className="text-center text-[11px] uppercase tracking-[0.28em] text-[hsl(43,60%,74%)]">
            Mediterranean • Mesopotamia • Indus Frontier
          </div>

          <div className="mt-5 h-[10px] rounded-full bg-[rgba(255,255,255,0.06)] p-[1px]">
            <div className="h-full w-[44%] rounded-full bg-[linear-gradient(90deg,rgba(212,168,67,0.45),rgba(245,215,122,0.95))] shadow-[0_0_20px_rgba(212,168,67,0.35)]" />
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-foreground/66">
            <span>largest empire the world had yet seen</span>
            <span className="font-body uppercase tracking-[0.2em] text-[hsl(43,60%,72%)]">c. 530 BCE</span>
          </div>
        </div>

        <div className="mt-7 grid w-[min(620px,94%)] grid-cols-3 gap-3">
          {scaleFacts.map((fact) => (
            <div
              key={fact.value}
              className="rounded-2xl border border-[hsl(43,85%,55%,0.15)] bg-[rgba(7,12,22,0.74)] px-4 py-4 shadow-[0_10px_34px_rgba(0,0,0,0.3)] backdrop-blur-md"
            >
              <div className="font-display text-[2.1rem] font-bold leading-none text-gradient-gold">{fact.value}</div>
              <div className="mt-2 font-body text-sm leading-snug text-foreground/66">{fact.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
