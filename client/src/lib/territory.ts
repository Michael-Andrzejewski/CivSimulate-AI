/**
 * Territory spread engine — the OpenFront-style organic frontier algorithm,
 * but driven by LLM-style *intent* (a direction + a number of tiles) rather
 * than real-time troop physics.
 *
 * The expansion priority mirrors OpenFront's: a jittered base, a concavity-fill
 * term (tiles with more already-owned neighbors are captured first, so the
 * blob smooths instead of growing stringy tendrils), and an elevation term
 * (mountains captured last). We add one term OpenFront doesn't have — a
 * directional bias toward the requested heading — so "expand NE by 500 tiles"
 * produces growth that leans NE while still looking organic.
 */

import {
  TerrainGrid,
  forEachNeighbor4,
  isLand,
  idx,
  MAG_MASK,
  nearestLandTile,
} from "./mapgen";

export interface City {
  name: string;
  tile: number;
}

export interface Kingdom {
  id: number;
  name: string;
  color: string;
  cities: City[];
}

export interface MapState {
  grid: TerrainGrid;
  owner: Uint16Array; // 0 = unowned, else kingdom id
  kingdoms: Kingdom[];
}

export type Direction = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

// Canvas y grows downward, so "N" is -y.
const DIRS: Record<Direction, [number, number]> = {
  N: [0, -1],
  NE: [1, -1],
  E: [1, 0],
  SE: [1, 1],
  S: [0, 1],
  SW: [-1, 1],
  W: [-1, 0],
  NW: [-1, -1],
};

/** Binary min-heap over tile refs keyed by a numeric priority. */
class MinHeap {
  private tiles: number[] = [];
  private prio: number[] = [];

  size(): number {
    return this.tiles.length;
  }

  push(tile: number, p: number): void {
    this.tiles.push(tile);
    this.prio.push(p);
    let i = this.tiles.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.prio[parent] <= this.prio[i]) break;
      this.swap(i, parent);
      i = parent;
    }
  }

  pop(): number {
    const top = this.tiles[0];
    const last = this.tiles.length - 1;
    this.tiles[0] = this.tiles[last];
    this.prio[0] = this.prio[last];
    this.tiles.pop();
    this.prio.pop();
    let i = 0;
    const n = this.tiles.length;
    for (;;) {
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      let s = i;
      if (l < n && this.prio[l] < this.prio[s]) s = l;
      if (r < n && this.prio[r] < this.prio[s]) s = r;
      if (s === i) break;
      this.swap(i, s);
      i = s;
    }
    return top;
  }

  private swap(i: number, j: number): void {
    const t = this.tiles[i];
    this.tiles[i] = this.tiles[j];
    this.tiles[j] = t;
    const p = this.prio[i];
    this.prio[i] = this.prio[j];
    this.prio[j] = p;
  }
}

export function createState(grid: TerrainGrid): MapState {
  return {
    grid,
    owner: new Uint16Array(grid.width * grid.height),
    kingdoms: [],
  };
}

export function addKingdom(state: MapState, name: string, color: string): Kingdom {
  // Monotonic id (max existing + 1) so deleting a nation never lets a new one
  // reuse a live id and inherit its tiles.
  const id = state.kingdoms.reduce((m, k) => Math.max(m, k.id), 0) + 1;
  const kingdom: Kingdom = { id, name, color, cities: [] };
  state.kingdoms.push(kingdom);
  return kingdom;
}

/** Removes a nation and clears all tiles it owned. */
export function removeKingdom(state: MapState, kingdomId: number): void {
  const { owner } = state;
  for (let i = 0; i < owner.length; i++) if (owner[i] === kingdomId) owner[i] = 0;
  state.kingdoms = state.kingdoms.filter((k) => k.id !== kingdomId);
}

function centroid(state: MapState, kingdomId: number): { x: number; y: number } {
  const { owner } = state;
  const w = state.grid.width;
  let sx = 0;
  let sy = 0;
  let c = 0;
  for (let i = 0; i < owner.length; i++) {
    if (owner[i] === kingdomId) {
      sx += i % w;
      sy += (i / w) | 0;
      c++;
    }
  }
  if (c === 0) return { x: w / 2, y: state.grid.height / 2 };
  return { x: sx / c, y: sy / c };
}

/** Seed a starting territory: a disk of owned land around a capital point. */
export function seedDisk(
  state: MapState,
  kingdomId: number,
  cx: number,
  cy: number,
  radius: number,
): number {
  const { grid, owner } = state;
  const { width: w, height: h, terrain } = grid;
  const center = nearestLandTile(grid, cx, cy);
  const ccx = center % w;
  const ccy = (center / w) | 0;
  const r = Math.max(1, radius);
  for (let y = Math.max(0, ccy - r); y <= Math.min(h - 1, ccy + r); y++) {
    for (let x = Math.max(0, ccx - r); x <= Math.min(w - 1, ccx + r); x++) {
      if (Math.hypot(x - ccx, y - ccy) <= r) {
        const t = idx(x, y, w);
        if (isLand(terrain[t]) && owner[t] === 0) owner[t] = kingdomId;
      }
    }
  }
  return center;
}

export interface ExpandOpts {
  tiles: number;
  dir?: Direction;
  target?: { x: number; y: number };
  focus?: number; // 0..1, how strongly to bias toward the heading
  rng: () => number;
  // Extra priority penalty for tiles owned by ANOTHER nation, so growth fills
  // empty land first and only bites into a neighbor's border when it must.
  // 0 = no preference (aggressive conquest); high = peaceful (fill empty first).
  conquerPenalty?: number;
}

/**
 * Grows a kingdom by `tiles` along its border, organically, biased toward an
 * optional heading. Mutates `owner`; returns the captured tiles in the order
 * they fell (so the UI can animate the crawl).
 */
export function expand(state: MapState, kingdomId: number, opts: ExpandOpts): number[] {
  const { grid, owner } = state;
  const { width: w, height: h, terrain } = grid;
  const rng = opts.rng;
  const c = centroid(state, kingdomId);

  let dvx = 0;
  let dvy = 0;
  let dirWeight = 0;
  if (opts.target) {
    const vx = opts.target.x - c.x;
    const vy = opts.target.y - c.y;
    const L = Math.hypot(vx, vy) || 1;
    dvx = vx / L;
    dvy = vy / L;
    dirWeight = (opts.focus ?? 0.6) * 14;
  } else if (opts.dir && DIRS[opts.dir]) {
    const [ux, uy] = DIRS[opts.dir];
    const L = Math.hypot(ux, uy) || 1;
    dvx = ux / L;
    dvy = uy / L;
    dirWeight = (opts.focus ?? 0.6) * 14;
  }

  const heap = new MinHeap();
  let pushSeq = 0;

  const consider = (t: number): void => {
    if (owner[t] === kingdomId || !isLand(terrain[t])) return;
    let ownedN = 0;
    forEachNeighbor4(t, w, h, (nb) => {
      if (owner[nb] === kingdomId) ownedN++;
    });
    if (ownedN === 0) return; // only frontier tiles
    const mag = terrain[t] & MAG_MASK;
    // OpenFront-style: jitter * (concavity fill + elevation), low = sooner
    let prio = (Math.floor(rng() * 8) + 10) * (1 - ownedN * 0.5 + (mag / 31) * 1.5);
    prio += pushSeq++ * 0.0005; // gentle FIFO tiebreak
    // Defer capturing another nation's land (so empty land fills first)
    if (opts.conquerPenalty && owner[t] !== 0) prio += opts.conquerPenalty;
    if (dirWeight) {
      const vx = (t % w) - c.x;
      const vy = ((t / w) | 0) - c.y;
      const L = Math.hypot(vx, vy) || 1;
      const dot = (vx / L) * dvx + (vy / L) * dvy; // -1..1
      prio -= dot * dirWeight; // tiles toward the heading captured first
    }
    heap.push(t, prio);
  };

  for (let t = 0; t < owner.length; t++) {
    if (owner[t] !== kingdomId) continue;
    forEachNeighbor4(t, w, h, (nb) => consider(nb));
  }

  const captured: number[] = [];
  while (captured.length < opts.tiles && heap.size() > 0) {
    const t = heap.pop();
    if (owner[t] === kingdomId || !isLand(terrain[t])) continue; // stale dup
    let adjacent = false;
    forEachNeighbor4(t, w, h, (nb) => {
      if (owner[nb] === kingdomId) adjacent = true;
    });
    if (!adjacent) continue;
    owner[t] = kingdomId;
    captured.push(t);
    forEachNeighbor4(t, w, h, (nb) => consider(nb));
  }
  return captured;
}

export interface ContractOpts {
  tiles: number;
  dir?: Direction;
  focus?: number;
  rng: () => number;
}

/**
 * Relinquishes `tiles` border tiles, preferring the most exposed ones and,
 * if a direction is given, those furthest toward it. Mutates `owner`; returns
 * the relinquished tiles in order.
 */
export function contract(state: MapState, kingdomId: number, opts: ContractOpts): number[] {
  const { grid, owner } = state;
  const { width: w, height: h } = grid;
  const rng = opts.rng;
  const c = centroid(state, kingdomId);

  let dvx = 0;
  let dvy = 0;
  let dirWeight = 0;
  if (opts.dir && DIRS[opts.dir]) {
    const [ux, uy] = DIRS[opts.dir];
    const L = Math.hypot(ux, uy) || 1;
    dvx = ux / L;
    dvy = uy / L;
    dirWeight = (opts.focus ?? 0.6) * 14;
  }

  const isBorderOwned = (t: number): boolean => {
    if (owner[t] !== kingdomId) return false;
    const x = t % w;
    const y = (t / w) | 0;
    if (x === 0 || x === w - 1 || y === 0 || y === h - 1) return true; // map edge
    let open = false;
    forEachNeighbor4(t, w, h, (nb) => {
      if (owner[nb] !== kingdomId) open = true;
    });
    return open;
  };

  const heap = new MinHeap(); // store -score so highest score pops first
  let pushSeq = 0;
  const consider = (t: number): void => {
    if (!isBorderOwned(t)) return;
    let openN = 0;
    forEachNeighbor4(t, w, h, (nb) => {
      if (owner[nb] !== kingdomId) openN++;
    });
    let score = (Math.floor(rng() * 8) + 10) * (1 + openN * 0.4) + pushSeq++ * 0.0005;
    if (dirWeight) {
      const vx = (t % w) - c.x;
      const vy = ((t / w) | 0) - c.y;
      const L = Math.hypot(vx, vy) || 1;
      score += ((vx / L) * dvx + (vy / L) * dvy) * dirWeight * 3;
    }
    heap.push(t, -score);
  };

  for (let t = 0; t < owner.length; t++) {
    if (owner[t] === kingdomId && isBorderOwned(t)) consider(t);
  }

  const removed: number[] = [];
  while (removed.length < opts.tiles && heap.size() > 0) {
    const t = heap.pop();
    if (owner[t] !== kingdomId || !isBorderOwned(t)) continue; // stale dup
    owner[t] = 0;
    removed.push(t);
    forEachNeighbor4(t, w, h, (nb) => {
      if (owner[nb] === kingdomId) consider(nb);
    });
  }
  return removed;
}

/** BFS to the nearest tile owned by this kingdom from (x, y). */
function nearestOwnedTile(state: MapState, kingdomId: number, x: number, y: number): number {
  const { grid, owner } = state;
  const { width: w, height: h } = grid;
  const sx = Math.max(0, Math.min(w - 1, Math.round(x)));
  const sy = Math.max(0, Math.min(h - 1, Math.round(y)));
  const start = idx(sx, sy, w);
  if (owner[start] === kingdomId) return start;
  const q = [start];
  const seen = new Set<number>([start]);
  for (let head = 0; head < q.length && head < 50000; head++) {
    const i = q[head];
    if (owner[i] === kingdomId) return i;
    forEachNeighbor4(i, w, h, (nb) => {
      if (!seen.has(nb)) {
        seen.add(nb);
        q.push(nb);
      }
    });
  }
  return -1;
}

export interface PlaceCityResult {
  ok: boolean;
  city?: City;
  reason?: string;
  warning?: string;
}

/**
 * Places a city, snapping to the nearest owned land tile. Mirrors OpenFront's
 * "must be on owned land + minimum spacing" rule, but in the sandbox a too-close
 * placement is allowed with a warning rather than rejected outright.
 */
export function placeCity(
  state: MapState,
  kingdomId: number,
  x: number,
  y: number,
  name: string,
  minDist: number,
): PlaceCityResult {
  const kingdom = state.kingdoms.find((k) => k.id === kingdomId);
  if (!kingdom) return { ok: false, reason: "unknown kingdom" };
  const tile = nearestOwnedTile(state, kingdomId, x, y);
  if (tile < 0) return { ok: false, reason: "no owned land near that point" };
  const w = state.grid.width;
  const cx = tile % w;
  const cy = (tile / w) | 0;
  let warning: string | undefined;
  for (const c of kingdom.cities) {
    const ox = c.tile % w;
    const oy = (c.tile / w) | 0;
    if (Math.hypot(cx - ox, cy - oy) < minDist) {
      warning = `close to ${c.name}`;
      break;
    }
  }
  const city: City = { name, tile };
  kingdom.cities.push(city);
  return { ok: true, city, warning };
}

export function tilesOwned(state: MapState, kingdomId: number): number {
  let c = 0;
  const { owner } = state;
  for (let i = 0; i < owner.length; i++) if (owner[i] === kingdomId) c++;
  return c;
}

export { DIRS };
