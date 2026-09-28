import { useEffect, useRef, useState } from "react";
import { Loader2, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mulberry32 } from "@/lib/mapgen";
import {
  loadWorldMap,
  lonLatToTileXY,
  km2ToTiles,
  latOfRow,
  WORLD_W,
  WORLD_H,
} from "@/lib/worldmap";
import {
  MapState,
  createState,
  addKingdom,
  seedDisk,
  expand,
  placeCity,
} from "@/lib/territory";
import { renderMap, buildBaseTerrain, View } from "@/lib/mapRender";

export interface Placement {
  kingdom?: { name?: string; color?: string };
  capital: { name?: string; lat: number; lon: number };
  cities?: { name?: string; lat: number; lon: number }[];
  approxAreaKm2?: number;
}

// Module-level cache: the world grid + cartographic base layer are heavy
// (2M tiles + hillshade). Build once and share across mounts/pages.
let worldCache: Promise<{ grid: any; base: HTMLCanvasElement }> | null = null;
function getWorld(): Promise<{ grid: any; base: HTMLCanvasElement }> {
  if (!worldCache) {
    worldCache = loadWorldMap().then((grid) => ({ grid, base: buildBaseTerrain(grid, latOfRow) }));
  }
  return worldCache;
}

const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);
const ASPECT = WORLD_W / WORLD_H;
const MIN_VIEW_W = 80;

export function WorldMapPanel({
  placement,
  placing,
  emptyHint,
  stateBuilder,
  rebuildKey,
}: {
  placement?: Placement | null;
  placing?: boolean;
  emptyHint?: string;
  // Multiplayer: build a full multi-kingdom state from a shared log. When
  // provided, takes precedence over `placement` and the view fits all nations.
  stateBuilder?: (grid: any) => MapState;
  rebuildKey?: string | number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<MapState | null>(null);
  const baseRef = useRef<HTMLCanvasElement | null>(null);
  const viewRef = useRef<View>({ x: 0, y: 0, w: WORLD_W, h: WORLD_H });
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const [ready, setReady] = useState(false);

  const draw = () => {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    if (!canvas || !state) return;
    renderMap(canvas, state, { view: viewRef.current, base: baseRef.current ?? undefined });
  };

  const setView = (vx: number, vy: number, vw: number, vh: number) => {
    if (vw / vh < ASPECT) vw = vh * ASPECT;
    else vh = vw / ASPECT;
    vw = clamp(vw, MIN_VIEW_W, WORLD_W);
    vh = vw / ASPECT;
    viewRef.current = { x: clamp(vx, 0, WORLD_W - vw), y: clamp(vy, 0, WORLD_H - vh), w: vw, h: vh };
    draw();
  };
  const fitWorld = () => setView(0, 0, WORLD_W, WORLD_H);

  // Fit to a kingdom (single placement) or all owned land (multiplayer).
  const fitOwned = (kingdomId?: number) => {
    const state = stateRef.current;
    if (!state) return;
    let minX = WORLD_W, maxX = 0, minY = WORLD_H, maxY = 0, any = false;
    const { owner } = state;
    for (let i = 0; i < owner.length; i++) {
      if (owner[i] === 0 || (kingdomId != null && owner[i] !== kingdomId)) continue;
      any = true;
      const x = i % WORLD_W, y = (i / WORLD_W) | 0;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    if (!any) {
      fitWorld();
      return;
    }
    const padX = (maxX - minX) * 0.4 + 12;
    const padY = (maxY - minY) * 0.4 + 12;
    setView(minX - padX, minY - padY, maxX - minX + 2 * padX, maxY - minY + 2 * padY);
  };
  const fitKingdom = () => (stateBuilder ? fitOwned() : fitOwned(stateRef.current?.kingdoms[0]?.id));

  const placeAndDraw = (p: Placement) => {
    const state = stateRef.current;
    if (!state) return;
    const fresh = createState(state.grid);
    stateRef.current = fresh;
    const k = addKingdom(fresh, p.kingdom?.name ?? "Kingdom", p.kingdom?.color ?? "#d24b4b");
    const cap = lonLatToTileXY(p.capital.lon, p.capital.lat);
    seedDisk(fresh, k.id, cap.x, cap.y, 3);
    placeCity(fresh, k.id, cap.x, cap.y, p.capital.name ?? "Capital", 0);
    for (const c of p.cities ?? []) {
      const t = lonLatToTileXY(c.lon, c.lat);
      seedDisk(fresh, k.id, t.x, t.y, 2);
      placeCity(fresh, k.id, t.x, t.y, c.name ?? "City", 4);
    }
    const target = km2ToTiles(p.approxAreaKm2 ?? 0, p.capital.lat);
    let owned = 0;
    for (let i = 0; i < fresh.owner.length; i++) if (fresh.owner[i] === k.id) owned++;
    const growBy = Math.max(0, target - owned);
    if (growBy > 0) expand(fresh, k.id, { tiles: growBy, rng: mulberry32((Date.now() & 0xffffff) >>> 0) });
    fitKingdom();
  };

  // Load the world once this panel mounts (lazy — only when actually shown)
  useEffect(() => {
    let alive = true;
    getWorld()
      .then(({ grid, base }) => {
        if (!alive) return;
        baseRef.current = base;
        if (stateBuilder) {
          stateRef.current = stateBuilder(grid);
          setReady(true);
          fitOwned();
        } else {
          stateRef.current = createState(grid);
          setReady(true);
          if (placement) placeAndDraw(placement);
          else draw();
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-place whenever the placement changes (single-kingdom mode)
  useEffect(() => {
    if (ready && !stateBuilder && placement) placeAndDraw(placement);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, placement]);

  // Rebuild from the shared log when it changes (multiplayer mode)
  useEffect(() => {
    if (!ready || !stateBuilder) return;
    const grid = stateRef.current?.grid;
    if (grid) {
      stateRef.current = stateBuilder(grid);
      fitOwned();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, rebuildKey]);

  // Wheel zoom
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ready) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const v = viewRef.current;
      const rect = canvas.getBoundingClientRect();
      const fx = (e.clientX - rect.left) / rect.width;
      const fy = (e.clientY - rect.top) / rect.height;
      const tileX = v.x + fx * v.w;
      const tileY = v.y + fy * v.h;
      const factor = e.deltaY < 0 ? 0.85 : 1 / 0.85;
      let nw = clamp(v.w * factor, MIN_VIEW_W, WORLD_W);
      let nh = nw / ASPECT;
      if (nh > WORLD_H) {
        nh = WORLD_H;
        nw = nh * ASPECT;
      }
      viewRef.current = { x: clamp(tileX - fx * nw, 0, WORLD_W - nw), y: clamp(tileY - fy * nh, 0, WORLD_H - nh), w: nw, h: nh };
      draw();
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const onMouseDown = (e: React.MouseEvent) => {
    dragRef.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    const drag = dragRef.current;
    const canvas = canvasRef.current;
    if (!drag || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const v = viewRef.current;
    viewRef.current = {
      ...v,
      x: clamp(v.x - (e.clientX - drag.x) * (v.w / rect.width), 0, WORLD_W - v.w),
      y: clamp(v.y - (e.clientY - drag.y) * (v.h / rect.height), 0, WORLD_H - v.h),
    };
    dragRef.current = { x: e.clientX, y: e.clientY };
    draw();
  };
  const endDrag = () => (dragRef.current = null);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <span className="text-sm font-medium">Territory map</span>
        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={fitKingdom} title="Zoom to territory" disabled={!ready || (!placement && !stateBuilder)}>
          <ZoomIn className="w-4 h-4" />
        </Button>
      </div>
      <div className="relative flex-1 bg-[#0b1a2b] min-h-[260px]">
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading map…
          </div>
        )}
        {ready && !placement && !stateBuilder && (
          <div className="absolute inset-0 flex items-center justify-center text-center text-muted-foreground text-sm p-4">
            {placing ? (
              <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Placing your civilization…</span>
            ) : (
              emptyHint ?? "Complete a turn to see your territory on the map."
            )}
          </div>
        )}
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          className="w-full h-full block cursor-grab active:cursor-grabbing"
          style={{ imageRendering: "pixelated", display: ready ? "block" : "none" }}
        />
        {placing && placement && (
          <div className="absolute top-2 right-2 text-xs bg-black/60 text-white rounded px-2 py-1 flex items-center gap-1">
            <Loader2 className="w-3 h-3 animate-spin" /> updating…
          </div>
        )}
      </div>
      <p className="text-[11px] text-muted-foreground px-3 py-1.5 border-t border-border">scroll to zoom · drag to pan · © OpenFront CC BY-SA 4.0</p>
    </div>
  );
}
