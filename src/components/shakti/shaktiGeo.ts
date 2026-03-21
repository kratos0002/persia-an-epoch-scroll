export const SOUTH_ASIA_GEOJSON_URL = '/data/ne_110m_countries.geojson';
export const SOUTH_ASIA_COUNTRIES = ['India', 'Pakistan', 'Bangladesh', 'Nepal', 'Bhutan', 'Sri Lanka', 'China'] as const;

const LON_MIN = 60;
const LON_MAX = 101.5;
const LAT_MIN = 3.5;
const LAT_MAX = 38.5;

export const projectPoint = (lon: number, lat: number, width: number, height: number) => {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * width;
  const y = height - ((lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * height;
  return { x, y };
};

const ringToPath = (ring: number[][], width: number, height: number) =>
  ring
    .map(([lon, lat], index) => {
      const { x, y } = projectPoint(lon, lat, width, height);
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ') + ' Z';

export const geometryToPath = (geometry: any, width: number, height: number) => {
  if (!geometry) return '';

  if (geometry.type === 'Polygon') {
    return geometry.coordinates.map((ring: number[][]) => ringToPath(ring, width, height)).join(' ');
  }

  if (geometry.type === 'MultiPolygon') {
    return geometry.coordinates
      .map((polygon: number[][][]) => polygon.map((ring) => ringToPath(ring, width, height)).join(' '))
      .join(' ');
  }

  return '';
};