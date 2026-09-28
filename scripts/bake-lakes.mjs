/**
 * OpenFront's world map.bin classifies major lakes (the Great Lakes, etc.) as
 * LAND, so they render as terrain. This bakes real lakes (public-domain Natural
 * Earth 50m lakes) into the terrain as inland water, projected with the same
 * calibration the app uses to place coordinates onto OpenFront's map.
 *
 * Usage: node scripts/bake-lakes.mjs /tmp/ne_lakes.json
 * In/out: client/public/world-terrain.bin (rewritten in place).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const W = 2000;
const H = 1000;
const IS_LAND = 0x80;
const SHORELINE = 0x40;
const OCEAN = 0x20;
const MAG = 0x1f;

// Same calibration as client/src/lib/worldmap.ts
const lonToX = (lon) => 5.4648 * lon + 938.31;
const latToY = (lat) => -6.2081 * lat + 510.98;

const lakesPath = process.argv[2] || "/tmp/ne_lakes.json";
const binPath = path.join(__dirname, "..", "client", "public", "world-terrain.bin");

const terrain = new Uint8Array(fs.readFileSync(binPath));
if (terrain.length < W * H) throw new Error(`terrain too small: ${terrain.length}`);
const lakes = JSON.parse(fs.readFileSync(lakesPath, "utf8"));

function fillPolygon(rings, onTile) {
  const px = rings.map((r) => r.map(([lon, lat]) => [lonToX(lon), latToY(lat)]));
  let minY = H;
  let maxY = 0;
  for (const r of px) for (const [, y] of r) {
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  minY = Math.max(0, Math.floor(minY));
  maxY = Math.min(H - 1, Math.ceil(maxY));
  for (let y = minY; y <= maxY; y++) {
    const yc = y + 0.5;
    const xs = [];
    for (const r of px) {
      for (let i = 0; i < r.length - 1; i++) {
        const [x1, y1] = r[i];
        const [x2, y2] = r[i + 1];
        if ((y1 <= yc && y2 > yc) || (y2 <= yc && y1 > yc)) {
          xs.push(x1 + ((yc - y1) / (y2 - y1)) * (x2 - x1));
        }
      }
    }
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      const xa = Math.max(0, Math.floor(xs[k]));
      const xb = Math.min(W - 1, Math.ceil(xs[k + 1]) - 1);
      for (let x = xa; x <= xb; x++) onTile(y * W + x);
    }
  }
}

let converted = 0;
const markWater = (i) => {
  if (terrain[i] & IS_LAND) {
    terrain[i] = 0x02; // inland water, small depth, OCEAN bit off
    converted++;
  }
};

let polys = 0;
for (const f of lakes.features) {
  const g = f.geometry;
  if (!g) continue;
  if (g.type === "Polygon") {
    fillPolygon(g.coordinates, markWater);
    polys++;
  } else if (g.type === "MultiPolygon") {
    for (const poly of g.coordinates) {
      fillPolygon(poly, markWater);
      polys++;
    }
  }
}

// Recompute the shoreline bit (land/water boundary) wherever it changed.
for (let i = 0; i < W * H; i++) {
  const x = i % W;
  const y = (i / W) | 0;
  const land = (terrain[i] & IS_LAND) !== 0;
  let borders = false;
  if (x > 0 && ((terrain[i - 1] & IS_LAND) !== 0) !== land) borders = true;
  if (x < W - 1 && ((terrain[i + 1] & IS_LAND) !== 0) !== land) borders = true;
  if (y > 0 && ((terrain[i - W] & IS_LAND) !== 0) !== land) borders = true;
  if (y < H - 1 && ((terrain[i + W] & IS_LAND) !== 0) !== land) borders = true;
  if (borders) terrain[i] |= SHORELINE;
  else terrain[i] &= ~SHORELINE;
}

fs.writeFileSync(binPath, Buffer.from(terrain.buffer, 0, W * H));
console.log(`Baked ${polys} lake polygons → ${converted} land tiles converted to inland water`);
console.log(`Wrote ${binPath}`);
