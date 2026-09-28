/**
 * Procedural terrain generator for the map sandbox.
 *
 * Tiles are packed exactly like OpenFront's maps — one byte per tile — so the
 * representation is the same one we'd use if we later swap in a real-world
 * (Natural Earth) map baked to the same format:
 *
 *   bit 7  IS_LAND       1 = land, 0 = water
 *   bit 6  SHORELINE     tile borders the opposite type
 *   bit 5  OCEAN         water connected to the map edge (vs. an inland lake)
 *   bits 0-4 MAGNITUDE   land = elevation 0-31, water = depth 0-31
 *
 * The terrain itself is generated from fractal value-noise (no external data
 * or deps) so the sandbox runs immediately; the encoding is what matters for
 * later replacing this with authored/real maps.
 */

export const IS_LAND = 0x80;
export const SHORELINE_FLAG = 0x40;
export const OCEAN_FLAG = 0x20;
export const MAG_MASK = 0x1f;

export interface TerrainGrid {
  width: number;
  height: number;
  terrain: Uint8Array;
}

export const idx = (x: number, y: number, w: number): number => y * w + x;
export const xOf = (i: number, w: number): number => i % w;
export const yOf = (i: number, w: number): number => Math.floor(i / w);

export const isLand = (b: number): boolean => (b & IS_LAND) !== 0;
export const isWater = (b: number): boolean => (b & IS_LAND) === 0;
export const isShoreline = (b: number): boolean => (b & SHORELINE_FLAG) !== 0;
export const isOcean = (b: number): boolean => (b & OCEAN_FLAG) !== 0;
export const magOf = (b: number): number => b & MAG_MASK;

/** 4-connected (von Neumann) neighbors, matching OpenFront's adjacency. */
export function forEachNeighbor4(
  i: number,
  w: number,
  h: number,
  cb: (n: number) => void,
): void {
  const x = i % w;
  const y = (i / w) | 0;
  if (x > 0) cb(i - 1);
  if (x < w - 1) cb(i + 1);
  if (y > 0) cb(i - w);
  if (y < h - 1) cb(i + w);
}

/** Small deterministic PRNG so a seed reproduces the same map/spread. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash2(ix: number, iy: number, seed: number): number {
  let h = Math.imul(ix, 374761393) + Math.imul(iy, 668265263) + Math.imul(seed, 0x9e3779b1);
  h = (h ^ (h >>> 13)) >>> 0;
  h = Math.imul(h, 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const smooth = (t: number): number => t * t * (3 - 2 * t);

function valueNoise(x: number, y: number, seed: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = smooth(x - x0);
  const fy = smooth(y - y0);
  const a = hash2(x0, y0, seed);
  const b = hash2(x0 + 1, y0, seed);
  const c = hash2(x0, y0 + 1, seed);
  const d = hash2(x0 + 1, y0 + 1, seed);
  return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
}

function fractal(x: number, y: number, seed: number, octaves: number): number {
  let amp = 1;
  let freq = 1;
  let sum = 0;
  let norm = 0;
  for (let o = 0; o < octaves; o++) {
    sum += amp * valueNoise(x * freq, y * freq, seed + o * 101);
    norm += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return sum / norm;
}

/**
 * Generates a realistic-looking continent with coastline, islands and
 * elevation, packed to the OpenFront byte layout.
 */
export function generateTerrain(width: number, height: number, seed: number): TerrainGrid {
  const n = width * height;
  const terrain = new Uint8Array(n);
  const elev = new Float32Array(n);
  const scale = 1 / 46;
  const minDim = Math.min(width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let e = fractal(x * scale, y * scale, seed, 5);
      // Edge falloff so the landmass is surrounded by ocean (continent look)
      const edge = Math.min(x, width - 1 - x, y, height - 1 - y) / (minDim * 0.32);
      e *= smooth(Math.max(0, Math.min(1, edge)));
      elev[idx(x, y, width)] = e;
    }
  }

  const sea = 0.34;
  for (let i = 0; i < n; i++) {
    const e = elev[i];
    if (e > sea) {
      const m = Math.max(0, Math.min(31, Math.floor(((e - sea) / (1 - sea)) * 31)));
      terrain[i] = IS_LAND | m;
    } else {
      terrain[i] = 0;
    }
  }

  finalizeTerrain(width, height, terrain);
  return { width, height, terrain };
}

/**
 * Given a grid where only the IS_LAND bit + land magnitude are set, computes
 * the derived flags: shoreline (boundary tiles), ocean (water reachable from
 * the map edge, vs. inland lakes), and water-depth magnitude. Shared by the
 * procedural generator and the real-world map loader.
 */
export function finalizeTerrain(width: number, height: number, terrain: Uint8Array): void {
  const n = width * height;

  // Clear derived bits in case of re-finalize
  for (let i = 0; i < n; i++) terrain[i] &= IS_LAND | MAG_MASK;

  // Shoreline: any tile bordering the opposite type
  for (let i = 0; i < n; i++) {
    const land = isLand(terrain[i]);
    let bordersOpp = false;
    forEachNeighbor4(i, width, height, (nb) => {
      if (isLand(terrain[nb]) !== land) bordersOpp = true;
    });
    if (bordersOpp) terrain[i] |= SHORELINE_FLAG;
  }

  // Ocean flag: flood-fill water from the map edge (everything else is a lake)
  const seen = new Uint8Array(n);
  const queue: number[] = [];
  const seedEdge = (i: number) => {
    if (isWater(terrain[i]) && !seen[i]) {
      seen[i] = 1;
      terrain[i] |= OCEAN_FLAG;
      queue.push(i);
    }
  };
  for (let x = 0; x < width; x++) {
    seedEdge(idx(x, 0, width));
    seedEdge(idx(x, height - 1, width));
  }
  for (let y = 0; y < height; y++) {
    seedEdge(idx(0, y, width));
    seedEdge(idx(width - 1, y, width));
  }
  for (let head = 0; head < queue.length; head++) {
    forEachNeighbor4(queue[head], width, height, (nb) => {
      if (isWater(terrain[nb]) && !seen[nb]) {
        seen[nb] = 1;
        terrain[nb] |= OCEAN_FLAG;
        queue.push(nb);
      }
    });
  }

  // Water depth magnitude: BFS distance from the shoreline
  const dist = new Int16Array(n).fill(-1);
  const wq: number[] = [];
  for (let i = 0; i < n; i++) {
    if (isWater(terrain[i]) && isShoreline(terrain[i])) {
      dist[i] = 0;
      wq.push(i);
    }
  }
  for (let head = 0; head < wq.length; head++) {
    const i = wq[head];
    forEachNeighbor4(i, width, height, (nb) => {
      if (isWater(terrain[nb]) && dist[nb] < 0) {
        dist[nb] = dist[i] + 1;
        wq.push(nb);
      }
    });
  }
  for (let i = 0; i < n; i++) {
    if (isWater(terrain[i])) {
      const d = dist[i] < 0 ? 15 : Math.min(31, Math.floor(dist[i] / 2));
      terrain[i] = (terrain[i] & ~MAG_MASK) | d;
    }
  }
}

/** BFS to the nearest land tile from (x, y), ignoring ownership. */
export function nearestLandTile(grid: TerrainGrid, x: number, y: number): number {
  const { width: w, height: h, terrain } = grid;
  const sx = Math.max(0, Math.min(w - 1, Math.round(x)));
  const sy = Math.max(0, Math.min(h - 1, Math.round(y)));
  const start = idx(sx, sy, w);
  if (isLand(terrain[start])) return start;
  const q = [start];
  const seen = new Set<number>([start]);
  for (let head = 0; head < q.length; head++) {
    const i = q[head];
    if (isLand(terrain[i])) return i;
    forEachNeighbor4(i, w, h, (nb) => {
      if (!seen.has(nb)) {
        seen.add(nb);
        q.push(nb);
      }
    });
  }
  return start;
}
