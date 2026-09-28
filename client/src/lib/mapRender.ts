/**
 * Canvas renderer for the world map. Builds a cartographic base layer once
 * (hypsometric tints + hillshade + blue water, à la OpenFront / Natural Earth)
 * and on each frame draws a zoomable view of it with the kingdom's territory
 * blended translucently on top, then cities.
 */
import { MapState } from "./territory";
import { forEachNeighbor4, isLand, isOcean, magOf } from "./mapgen";

export interface View {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface RenderOpts {
  view?: View;
  suppress?: Set<number>;
  /** Prebuilt base terrain canvas from buildBaseTerrain (required for the world map). */
  base?: HTMLCanvasElement;
}

const DISPLAY_W = 1500;
const DISPLAY_H = 750;

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace("#", "");
  const v = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const n = parseInt(v, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const mix = (a: number, b: number, t: number): number => a + (b - a) * t;

// Hypsometric color stops by normalized elevation (0..1).
const HYPSO: { t: number; c: [number, number, number] }[] = [
  { t: 0.0, c: [92, 132, 86] }, // low green
  { t: 0.12, c: [126, 158, 96] },
  { t: 0.28, c: [176, 184, 120] }, // khaki
  { t: 0.45, c: [206, 196, 142] }, // tan
  { t: 0.62, c: [194, 170, 130] },
  { t: 0.78, c: [176, 158, 146] }, // mauve-brown
  { t: 0.9, c: [216, 214, 214] }, // light gray
  { t: 1.0, c: [248, 249, 252] }, // snow
];

function hypso(e: number): [number, number, number] {
  for (let i = 1; i < HYPSO.length; i++) {
    if (e <= HYPSO[i].t) {
      const a = HYPSO[i - 1];
      const b = HYPSO[i];
      const f = (e - a.t) / (b.t - a.t || 1);
      return [mix(a.c[0], b.c[0], f), mix(a.c[1], b.c[1], f), mix(a.c[2], b.c[2], f)];
    }
  }
  return HYPSO[HYPSO.length - 1].c;
}

const ICE: [number, number, number] = [236, 241, 246];

/**
 * Builds the static base terrain layer (one canvas, grid resolution). Heavy,
 * so the page builds it once after load and reuses it every frame.
 */
export function buildBaseTerrain(
  grid: { width: number; height: number; terrain: Uint8Array },
  latOf?: (y: number) => number,
): HTMLCanvasElement {
  const { width: w, height: h, terrain } = grid;
  const img = new ImageData(w, h);
  const d = img.data;

  for (let y = 0; y < h; y++) {
    const lat = latOf ? latOf(y) : undefined;
    const polar = lat !== undefined ? Math.abs(lat) : 0;
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const b = terrain[i];
      let r: number;
      let g: number;
      let bl: number;

      if (isLand(b)) {
        const m = magOf(b);
        const e = m / 30;
        let col = hypso(e);
        // Hillshade: brighten NW-facing slopes, darken SE-facing
        const eL = x > 0 && isLand(terrain[i - 1]) ? magOf(terrain[i - 1]) : m;
        const eR = x < w - 1 && isLand(terrain[i + 1]) ? magOf(terrain[i + 1]) : m;
        const eU = y > 0 && isLand(terrain[i - w]) ? magOf(terrain[i - w]) : m;
        const eDn = y < h - 1 && isLand(terrain[i + w]) ? magOf(terrain[i + w]) : m;
        const slope = (eL - eR) + (eU - eDn); // >0 ⇒ faces NW ⇒ brighter
        const shade = Math.max(0.7, Math.min(1.35, 1 + slope * 0.05));
        r = col[0] * shade;
        g = col[1] * shade;
        bl = col[2] * shade;
        // Polar ice over land
        if (polar > 60) {
          const t = Math.min(1, (polar - 60) / 12);
          r = mix(r, ICE[0], t);
          g = mix(g, ICE[1], t);
          bl = mix(bl, ICE[2], t);
        }
      } else {
        // Water: ocean depth (magnitude = distance to land) vs inland rivers/lakes
        const depth = magOf(b) / 31;
        if (isOcean(b)) {
          r = mix(96, 36, depth);
          g = mix(150, 78, depth);
          bl = mix(196, 138, depth);
        } else {
          r = 116; // rivers & lakes — brighter blue
          g = 156;
          bl = 198;
        }
        if (polar > 70) {
          const t = Math.min(1, (polar - 70) / 10);
          r = mix(r, 210, t);
          g = mix(g, 224, t);
          bl = mix(bl, 234, t);
        }
      }

      const p = i * 4;
      d[p] = r;
      d[p + 1] = g;
      d[p + 2] = bl;
      d[p + 3] = 255;
    }
  }

  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  c.getContext("2d")!.putImageData(img, 0, 0);
  return c;
}

// Reused offscreen canvas for the per-frame territory overlay.
let overlayCanvas: HTMLCanvasElement | null = null;

export function renderMap(canvas: HTMLCanvasElement, state: MapState, opts: RenderOpts): void {
  const { grid, owner, kingdoms } = state;
  const { width: w, height: h } = grid;
  const suppress = opts.suppress;
  const view: View = opts.view ?? { x: 0, y: 0, w, h };

  if (canvas.width !== DISPLAY_W || canvas.height !== DISPLAY_H) {
    canvas.width = DISPLAY_W;
    canvas.height = DISPLAY_H;
  }
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = "#0a1722";
  ctx.fillRect(0, 0, DISPLAY_W, DISPLAY_H);

  // Base terrain (zoomed/panned)
  if (opts.base) {
    ctx.drawImage(opts.base, view.x, view.y, view.w, view.h, 0, 0, DISPLAY_W, DISPLAY_H);
  }

  // Territory overlay (translucent, terrain shows through)
  if (!overlayCanvas || overlayCanvas.width !== w || overlayCanvas.height !== h) {
    overlayCanvas = document.createElement("canvas");
    overlayCanvas.width = w;
    overlayCanvas.height = h;
  }
  const octx = overlayCanvas.getContext("2d")!;
  const oimg = octx.createImageData(w, h);
  const od = oimg.data;
  const colorById = new Map<number, [number, number, number]>();
  for (const k of kingdoms) colorById.set(k.id, hexToRgb(k.color));
  for (let i = 0; i < owner.length; i++) {
    const o = owner[i];
    if (o === 0 || (suppress && suppress.has(i))) continue;
    const kc = colorById.get(o);
    if (!kc) continue;
    let isBorder = false;
    forEachNeighbor4(i, w, h, (nb) => {
      if (owner[nb] !== o) isBorder = true;
    });
    const p = i * 4;
    od[p] = Math.min(255, kc[0] + (isBorder ? 50 : 0));
    od[p + 1] = Math.min(255, kc[1] + (isBorder ? 50 : 0));
    od[p + 2] = Math.min(255, kc[2] + (isBorder ? 50 : 0));
    od[p + 3] = isBorder ? 235 : 130; // translucent fill, solid border
  }
  octx.putImageData(oimg, 0, 0);
  ctx.drawImage(overlayCanvas, view.x, view.y, view.w, view.h, 0, 0, DISPLAY_W, DISPLAY_H);

  // Cities
  const pxPerTileX = DISPLAY_W / view.w;
  const pxPerTileY = DISPLAY_H / view.h;
  const pxPerTile = Math.min(pxPerTileX, pxPerTileY);
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.font = `${Math.max(9, Math.min(18, pxPerTile * 2.5))}px ui-sans-serif, system-ui, sans-serif`;
  for (const k of kingdoms) {
    k.cities.forEach((city, ci) => {
      const tx = city.tile % w;
      const ty = (city.tile / w) | 0;
      if (tx < view.x || tx > view.x + view.w || ty < view.y || ty > view.y + view.h) return;
      const cx = (tx - view.x + 0.5) * pxPerTileX;
      const cy = (ty - view.y + 0.5) * pxPerTileY;
      const isCapital = ci === 0;
      const radius = Math.max(2.5, pxPerTile * (isCapital ? 0.6 : 0.4));
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = isCapital ? "#ffe066" : "#ffffff";
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0,0,0,0.6)";
      ctx.stroke();
      if (pxPerTile > 2.6) {
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "rgba(0,0,0,0.85)";
        ctx.lineWidth = 3;
        ctx.strokeText(city.name, cx, cy - radius - 2);
        ctx.fillText(city.name, cx, cy - radius - 2);
      }
    });
  }
}
