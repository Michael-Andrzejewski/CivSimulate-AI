/**
 * Loads the world terrain. The data is OpenFront's `world` map (map data ©
 * OpenFront, CC BY-SA 4.0) — real coastlines, rivers, lakes and NASA-derived
 * elevation, already packed in the exact 1-byte-per-tile format the spread
 * engine + renderer use (land/shoreline/ocean + 5-bit elevation), so it drops
 * straight in. Equirectangular, 2000×1000.
 */
import { TerrainGrid } from "./mapgen";

export const WORLD_W = 2000;
export const WORLD_H = 1000;

// OpenFront's world map is a cropped/scaled equirectangular, NOT plain
// equirectangular — its poles are trimmed so latitude is compressed. These
// linear coefficients were fit against OpenFront's own nation-placement
// coordinates (46 countries) and validated against the Caspian Sea and Great
// Lakes (≈1° accuracy). Plain equirectangular put Chicago ~5° too far east.
const PX_PER_LON = 5.4648;
const LON_OFFSET = 938.31;
const PX_PER_LAT = -6.2081;
const LAT_OFFSET = 510.98;

const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);

export async function loadWorldMap(): Promise<TerrainGrid> {
  const res = await fetch("/world-terrain.bin");
  if (!res.ok) throw new Error(`Failed to load world map (${res.status})`);
  const buf = new Uint8Array(await res.arrayBuffer());
  const need = WORLD_W * WORLD_H;
  if (buf.length < need) throw new Error(`World map too small: ${buf.length} bytes`);
  // Already in our byte format (land/shoreline/ocean/magnitude) — use directly.
  const terrain = buf.length === need ? buf : buf.slice(buf.length - need);
  return { width: WORLD_W, height: WORLD_H, terrain };
}

/** Geographic (lon, lat) → tile (x, y), calibrated to OpenFront's projection. */
export function lonLatToTileXY(lon: number, lat: number): { x: number; y: number } {
  const x = Math.round(PX_PER_LON * lon + LON_OFFSET);
  const y = Math.round(PX_PER_LAT * lat + LAT_OFFSET);
  return { x: clamp(x, 0, WORLD_W - 1), y: clamp(y, 0, WORLD_H - 1) };
}

/** Tile (x, y) → geographic (lon, lat). */
export function tileXYToLonLat(x: number, y: number): { lon: number; lat: number } {
  return { lon: (x - LON_OFFSET) / PX_PER_LON, lat: (y - LAT_OFFSET) / PX_PER_LAT };
}

/** Latitude of a tile row (for polar/ice shading). */
export function latOfRow(y: number): number {
  return (y - LAT_OFFSET) / PX_PER_LAT;
}

/** Approximate tile count for a land area (km²) near a latitude. */
export function km2ToTiles(km2: number, lat: number): number {
  return Math.max(1, Math.round(km2 / tileKm2(lat)));
}

/** Approximate land area (km²) of one tile near a latitude. */
export function tileKm2(lat: number): number {
  // Degrees per tile differ on each axis under this projection.
  const lonKmPerTile = (111.32 / PX_PER_LON) * Math.cos((lat * Math.PI) / 180);
  const latKmPerTile = 110.57 / Math.abs(PX_PER_LAT);
  return Math.max(20, lonKmPerTile * latKmPerTile);
}
