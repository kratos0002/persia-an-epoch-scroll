import type { StyleSpecification } from 'maplibre-gl';

export const RAMAYANA_MAP_STYLE: StyleSpecification = {
  version: 8,
  name: 'ramayana-parchment',
  sources: {
    'carto-light': {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
        'https://b.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
        'https://c.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      attribution: '&copy; OpenStreetMap contributors, &copy; CARTO',
      maxzoom: 16,
      minzoom: 3,
    },
  },
  layers: [
    {
      id: 'carto-tiles',
      type: 'raster',
      source: 'carto-light',
      paint: {
        'raster-saturation': -0.1,
        'raster-brightness-max': 1,
        'raster-brightness-min': 0.05,
        'raster-contrast': -0.05,
      },
    },
  ],
};
