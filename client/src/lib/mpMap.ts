/**
 * Deterministically replays a multiplayer session's map log into a MapState.
 * Both clients run this with the same log + seed, so they render the identical
 * shared map. The per-op RNG is seeded by (sessionSeed, opIndex) so the
 * organic spread is reproducible.
 */
import { TerrainGrid } from "./mapgen";
import { mulberry32 } from "./mapgen";
import { lonLatToTileXY, tileXYToLonLat, km2ToTiles } from "./worldmap";
import {
  MapState,
  Kingdom,
  Direction,
  createState,
  addKingdom,
  seedDisk,
  placeCity,
  expand,
  contract,
} from "./territory";

export function replayMapLog(grid: TerrainGrid, logJson: string | any[], seed: number): MapState {
  const log: any[] = typeof logJson === "string" ? JSON.parse(logJson || "[]") : logJson || [];
  const state = createState(grid);
  const w = grid.width;
  const bySlot = new Map<number, Kingdom>();
  const ensure = (slot: number, color?: string, name?: string): Kingdom => {
    let k = bySlot.get(slot);
    if (!k) {
      k = addKingdom(state, name || `Player ${slot}`, color || "#888888");
      bySlot.set(slot, k);
    }
    return k;
  };
  const latOfKingdom = (k: Kingdom): number =>
    k.cities[0] ? tileXYToLonLat(k.cities[0].tile % w, (k.cities[0].tile / w) | 0).lat : 40;

  let idx = 0;
  for (const op of log) {
    const rng = mulberry32(((seed >>> 0) ^ Math.imul(idx + 1, 2654435761)) >>> 0);
    idx++;
    const slot: number = op.player;

    if (op.op === "place") {
      const k = ensure(slot, op.color, op.name);
      const cap = lonLatToTileXY(op.capital.lon, op.capital.lat);
      seedDisk(state, k.id, cap.x, cap.y, 3);
      placeCity(state, k.id, cap.x, cap.y, op.capital.name || "Capital", 0);
      for (const c of op.cities || []) {
        const t = lonLatToTileXY(c.lon, c.lat);
        seedDisk(state, k.id, t.x, t.y, 2);
        placeCity(state, k.id, t.x, t.y, c.name || "City", 4);
      }
      const target = km2ToTiles(op.areaKm2 || 0, op.capital.lat);
      let owned = 0;
      for (let i = 0; i < state.owner.length; i++) if (state.owner[i] === k.id) owned++;
      const grow = Math.max(0, target - owned);
      if (grow > 0) expand(state, k.id, { tiles: grow, rng, conquerPenalty: 28 });
      continue;
    }

    const k = bySlot.get(slot);
    if (!k) continue;
    const lat = latOfKingdom(k);
    if (op.type === "expand") {
      const target = op.toward ? lonLatToTileXY(op.toward.lon, op.toward.lat) : undefined;
      const tiles = op.areaKm2 ? km2ToTiles(op.areaKm2, lat) : op.tiles ?? 200;
      expand(state, k.id, { tiles, target, dir: target ? undefined : (op.direction as Direction | undefined), focus: 0.7, rng });
    } else if (op.type === "contract") {
      const tiles = op.areaKm2 ? km2ToTiles(op.areaKm2, lat) : op.tiles ?? 150;
      contract(state, k.id, { tiles, dir: op.direction as Direction | undefined, focus: 0.6, rng });
    } else if (op.type === "found_city") {
      const t = lonLatToTileXY(op.lon, op.lat);
      seedDisk(state, k.id, t.x, t.y, 2);
      placeCity(state, k.id, t.x, t.y, op.name || "City", 4);
    }
  }
  return state;
}
