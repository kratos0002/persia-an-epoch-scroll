export const config = { runtime: 'edge' };

const SITE = 'https://pastlives.site';

interface OgMeta {
  title: string;
  description: string;
  image: string;
}

const DEFAULTS: OgMeta = {
  title: 'Epoch Lives — Turning points in history, felt',
  description: 'Visual essays on the turning points of civilizations. Immersive scrollytelling with maps, data, and primary sources.',
  image: `${SITE}/images/alexander-entry-babylon-lebrun.png`,
};

const OG_MAP: Record<string, OgMeta> = {
  '/': DEFAULTS,
  '/persia': {
    title: 'The Immortal Empire — The History of Persia | Epoch Lives',
    description: 'What if one civilization shaped more of the modern world than Rome, Greece, and Egypt combined? A visual essay spanning 2,500 years.',
    image: `${SITE}/og/persia.jpg`,
  },
  '/wisdom': {
    title: 'The Library That Lit the World — The House of Wisdom | Epoch Lives',
    description: 'For 400 years, one building in Baghdad held more knowledge than all of Europe combined.',
    image: `${SITE}/og/wisdom.jpg`,
  },
  '/buddhism': {
    title: 'The Path That Split — The Spread of Buddhism | Epoch Lives',
    description: 'One man sat under a tree and asked why we suffer. His answer split into a thousand traditions that reached every corner of Asia.',
    image: `${SITE}/og/buddhism.jpg`,
  },
  '/samurai': {
    title: 'Stipends, Bonds & the Death of a Class — The End of the Samurai | Epoch Lives',
    description: 'The samurai class was not destroyed by war but by accounting: stipends converted to bonds, domains merged into prefectures.',
    image: `${SITE}/og/samurai.jpg`,
  },
  '/1857': {
    title: 'The Signal and the Fire — The 1857 Rebellion | Epoch Lives',
    description: 'Two signals raced across North India. The telegraph carried British orders at the speed of electricity. The rebellion spread at the speed of a horse.',
    image: `${SITE}/og/1857.jpg`,
  },
  '/napoleon': {
    title: 'The Rise and Fall of Napoleon — Revolution to Legacy | Epoch Lives',
    description: 'One man reorganized Europe. Then Europe closed in. From revolutionary chaos to imperial zenith to final exile — and the ideas that outlasted the emperor.',
    image: `${SITE}/og/napoleon.jpg`,
  },
  '/constantinople': {
    title: 'The City of Layers — Constantinople | Epoch Lives',
    description: '2,700 years of civilization stacked in 25 meters of earth. Greek, Roman, Byzantine, Crusader, Ottoman — each built on the bones of the last.',
    image: `${SITE}/og/constantinople.jpg`,
  },
  '/india-states': {
    title: 'The Mosaic Republic — How 565 Became 28 | Epoch Lives',
    description: 'On the eve of independence, India was 565 princely states and 17 British provinces. What followed was the largest peaceful political integration in history.',
    image: `${SITE}/og/india-states.jpg`,
  },
  '/about': {
    title: 'About — Epoch Lives',
    description: 'Visual essays on the turning points of civilizations. Immersive scrollytelling with maps, data, and primary sources.',
    image: `${SITE}/og/persia.jpg`,
  },
};

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname.replace(/\/$/, '') || '/';

  const meta = OG_MAP[pathname] ?? DEFAULTS;

  // Fetch the built index.html from the same origin
  const htmlRes = await fetch(new URL('/index.html', url.origin));
  let html = await htmlRes.text();

  html = html
    .replace(/__OG_TITLE__/g, meta.title)
    .replace(/__OG_DESCRIPTION__/g, meta.description)
    .replace(/__OG_IMAGE__/g, meta.image)
    .replace(/__OG_URL__/g, `${SITE}${pathname}`);

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
