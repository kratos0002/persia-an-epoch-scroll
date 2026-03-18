import { useEffect, useRef, useState } from 'react';

// African country ISO A3 codes for filtering
const AFRICAN_CODES = new Set([
  'DZA','AGO','BEN','BWA','BFA','BDI','CPV','CMR','CAF','TCD','COM','COG','COD',
  'CIV','DJI','EGY','GNQ','ERI','SWZ','ETH','GAB','GMB','GHA','GIN','GNB',
  'KEN','LSO','LBR','LBY','MDG','MWI','MLI','MRT','MUS','MAR','MOZ','NAM',
  'NER','NGA','RWA','STP','SEN','SYC','SLE','SOM','ZAF','SSD','SDN','TZA',
  'TGO','TUN','UGA','ZMB','ZWE','ESH',
]);

let cachedFeatures: GeoJSON.Feature[] | null = null;
let fetchPromise: Promise<GeoJSON.Feature[]> | null = null;

async function loadFeatures(): Promise<GeoJSON.Feature[]> {
  if (cachedFeatures) return cachedFeatures;
  if (fetchPromise) return fetchPromise;

  fetchPromise = fetch('/data/ne_110m_countries.geojson')
    .then(r => r.json())
    .then((data: GeoJSON.FeatureCollection) => {
      cachedFeatures = data.features.filter(f => {
        const code = f.properties?.ISO_A3 || f.properties?.ADM0_A3 || '';
        return AFRICAN_CODES.has(code);
      });
      return cachedFeatures;
    });

  return fetchPromise;
}

/** Returns African country GeoJSON features, filtered by optional ISO codes */
export function useAfricaGeoJSON(filterCodes?: string[]) {
  const [features, setFeatures] = useState<GeoJSON.Feature[]>([]);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    loadFeatures().then(all => {
      if (!mounted.current) return;
      if (filterCodes) {
        const set = new Set(filterCodes);
        setFeatures(all.filter(f => {
          const code = f.properties?.ISO_A3 || f.properties?.ADM0_A3 || '';
          return set.has(code);
        }));
      } else {
        setFeatures(all);
      }
    });
    return () => { mounted.current = false; };
  }, [filterCodes?.join(',')]);

  return features;
}

/** Get features matching specific country codes from cached data */
export function getCountryFeatures(allFeatures: GeoJSON.Feature[], codes: string[]): GeoJSON.Feature[] {
  const set = new Set(codes);
  return allFeatures.filter(f => {
    const code = f.properties?.ISO_A3 || f.properties?.ADM0_A3 || '';
    return set.has(code);
  });
}

export { loadFeatures };
