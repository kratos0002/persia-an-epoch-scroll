import type { StyleSpecification } from 'maplibre-gl';

export const BATTUTA_MAP_STYLE: StyleSpecification = {
  version: 8,
  name: 'battuta-portolan',
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
      minzoom: 2,
    },
  },
  layers: [
    {
      id: 'carto-tiles',
      type: 'raster',
      source: 'carto-light',
      paint: {
        'raster-saturation': -0.25,
        'raster-brightness-max': 1.05,
        'raster-brightness-min': 0.08,
        'raster-contrast': -0.08,
        'raster-hue-rotate': 15, // warm sepia shift
      },
    },
  ],
};
