/**
 * Rasterizes Natural Earth 110m land polygons (public domain) into an
 * equirectangular 1-byte-per-tile land mask the map sandbox loads at runtime.
 *
 * Usage: node scripts/build-world-map.mjs /tmp/ne_land.json
 * Output: client/public/world-landmask.bin (Uint8, 1 = land) at WIDTH×HEIGHT.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const WIDTH = 1024;
const HEIGHT = 512;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inPath = process.argv[2] || "/tmp/ne_land.json";
const outDir = path.join(__dirname, "..", "client", "public");
const outBin = path.join(outDir, "world-landmask.bin");

const geo = JSON.parse(fs.readFileSync(inPath, "utf8"));
const mask = new Uint8Array(WIDTH * HEIGHT);

const lonToX = (lon) => ((lon + 180) / 360) * WIDTH;
const latToY = (lat) => ((90 - lat) / 180) * HEIGHT;

// Even-odd scanline fill of one polygon (first ring outer, rest holes).
function fillPolygon(rings) {
  const px = rings.map((r) => r.map(([lon, lat]) => [lonToX(lon), latToY(lat)]));
  let minY = HEIGHT;
  let maxY = 0;
  for (const r of px) for (const [, y] of r) {
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  minY = Math.max(0, Math.floor(minY));
  maxY = Math.min(HEIGHT - 1, Math.ceil(maxY));
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
      const xb = Math.min(WIDTH - 1, Math.ceil(xs[k + 1]) - 1);
      for (let x = xa; x <= xb; x++) mask[y * WIDTH + x] = 1;
    }
  }
}

let polys = 0;
for (const f of geo.features) {
  const g = f.geometry;
  if (!g) continue;
  if (g.type === "Polygon") {
    fillPolygon(g.coordinates);
    polys++;
  } else if (g.type === "MultiPolygon") {
    for (const poly of g.coordinates) {
      fillPolygon(poly);
      polys++;
    }
  }
}

fs.writeFileSync(outBin, Buffer.from(mask.buffer));
let land = 0;
for (let i = 0; i < mask.length; i++) land += mask[i];

console.log(`Rasterized ${polys} polygons → ${outBin}`);
console.log(`${WIDTH}x${HEIGHT}, ${land} land tiles (${((land / mask.length) * 100).toFixed(1)}%)`);

// ASCII preview (sanity check that continents are in the right place)
const cols = 96;
const rows = 36;
let preview = "";
for (let ry = 0; ry < rows; ry++) {
  for (let rx = 0; rx < cols; rx++) {
    const x = Math.floor((rx / cols) * WIDTH);
    const y = Math.floor((ry / rows) * HEIGHT);
    preview += mask[y * WIDTH + x] ? "#" : " ";
  }
  preview += "\n";
}
console.log(preview);
