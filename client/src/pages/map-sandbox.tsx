import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { ArrowLeft, Loader2, Send, ZoomIn, Globe, Plus, X, Hand, Brush, Eraser } from "lucide-react";
import { mulberry32, isLand } from "@/lib/mapgen";
import {
  loadWorldMap,
  lonLatToTileXY,
  tileXYToLonLat,
  km2ToTiles,
  tileKm2,
  latOfRow,
  WORLD_W,
  WORLD_H,
} from "@/lib/worldmap";
import {
  MapState,
  Kingdom,
  Direction,
  createState,
  addKingdom,
  removeKingdom,
  seedDisk,
  expand,
  contract,
  placeCity,
  tilesOwned,
} from "@/lib/territory";
import { renderMap, buildBaseTerrain, View } from "@/lib/mapRender";

const CITY_MIN_DIST = 4;
const MIN_VIEW_W = 80;
const WORLD_ASPECT = WORLD_W / WORLD_H;
const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);

// Distinct nation colors (player gets the first).
const PALETTE = ["#d94b4b", "#3b82c4", "#3fa64b", "#9c5fc4", "#e0902e", "#27ad9e", "#c4517f", "#8a7a3a"];

function handleAuthError(e: any, toast: any): boolean {
  if (isUnauthorizedError(e)) {
    toast({ title: "Session expired", description: "Logging you back in…", variant: "destructive" });
    setTimeout(() => {
      window.location.href = "/api/login";
    }, 600);
    return true;
  }
  return false;
}

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}
interface NationRow {
  id: number;
  name: string;
  color: string;
  tiles: number;
}
type PaintMode = "off" | "claim" | "erase";

export default function MapSandbox() {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<MapState | null>(null);
  const rafRef = useRef<number | null>(null);
  const fallbackRef = useRef<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<View>({ x: 0, y: 0, w: WORLD_W, h: WORLD_H });
  const dragRef = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const baseRef = useRef<HTMLCanvasElement | null>(null);
  const activeIdRef = useRef(1);
  const paintingRef = useRef(false);
  const paintModeRef = useRef<PaintMode>("off");

  const [ready, setReady] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState<ChatMsg[]>([]);
  const [placing, setPlacing] = useState(false);
  const [chatting, setChatting] = useState(false);
  const [stats, setStats] = useState("");
  const [clicked, setClicked] = useState("—");
  const [nations, setNations] = useState<NationRow[]>([]);
  const [activeId, setActiveId] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [addDesc, setAddDesc] = useState("");
  const [adding, setAdding] = useState(false);
  const [paintMode, setPaintMode] = useState<PaintMode>("off");

  const setActive = (id: number) => {
    activeIdRef.current = id;
    setActiveId(id);
  };
  const setPaint = (m: PaintMode) => {
    paintModeRef.current = m;
    setPaintMode(m);
  };
  const activeNation = (): Kingdom | null => {
    const s = stateRef.current;
    if (!s) return null;
    return s.kingdoms.find((k) => k.id === activeIdRef.current) || s.kingdoms[0] || null;
  };
  const nationLat = (k: Kingdom): number => {
    const s = stateRef.current;
    if (!s || k.cities.length === 0) return 40;
    return tileXYToLonLat(k.cities[0].tile % WORLD_W, (k.cities[0].tile / WORLD_W) | 0).lat;
  };

  const draw = (suppress?: Set<number>) => {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    if (!canvas || !state) return;
    renderMap(canvas, state, { view: viewRef.current, suppress, base: baseRef.current ?? undefined });
  };

  // Rebuild the nations list + active-nation stats from current state.
  const syncNations = () => {
    const state = stateRef.current;
    if (!state) {
      setNations([]);
      setStats("");
      return;
    }
    const list = state.kingdoms.map((k) => ({ id: k.id, name: k.name, color: k.color, tiles: tilesOwned(state, k.id) }));
    setNations(list);
    const act = activeNation();
    if (act) {
      const tiles = tilesOwned(state, act.id);
      const km2 = Math.round(tiles * tileKm2(nationLat(act)));
      setStats(`${act.name} · ${tiles.toLocaleString()} tiles · ~${km2.toLocaleString()} km² · ${act.cities.length} cities`);
    } else {
      setStats("");
    }
  };

  const setView = (vx: number, vy: number, vw: number, vh: number) => {
    if (vw / vh < WORLD_ASPECT) vw = vh * WORLD_ASPECT;
    else vh = vw / WORLD_ASPECT;
    vw = clamp(vw, MIN_VIEW_W, WORLD_W);
    vh = vw / WORLD_ASPECT;
    vx = clamp(vx, 0, WORLD_W - vw);
    vy = clamp(vy, 0, WORLD_H - vh);
    viewRef.current = { x: vx, y: vy, w: vw, h: vh };
    draw();
  };
  const fitWorld = () => setView(0, 0, WORLD_W, WORLD_H);
  const fitNation = (id?: number) => {
    const state = stateRef.current;
    if (!state) return;
    const target = id ?? activeIdRef.current;
    let minX = WORLD_W, maxX = 0, minY = WORLD_H, maxY = 0, any = false;
    const { owner } = state;
    for (let i = 0; i < owner.length; i++) {
      if (owner[i] !== target) continue;
      any = true;
      const x = i % WORLD_W, y = (i / WORLD_W) | 0;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    if (!any) return;
    const padX = (maxX - minX) * 0.3 + 8;
    const padY = (maxY - minY) * 0.3 + 8;
    setView(minX - padX, minY - padY, maxX - minX + 2 * padX, maxY - minY + 2 * padY);
  };

  const animateReveal = (captured: number[]) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (fallbackRef.current) clearTimeout(fallbackRef.current);
    if (captured.length === 0) {
      draw();
      syncNations();
      return;
    }
    const suppress = new Set<number>(captured);
    const frames = 30;
    const chunk = Math.ceil(captured.length / frames);
    let i = 0;
    const finish = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      fallbackRef.current = null;
      draw();
      syncNations();
    };
    fallbackRef.current = window.setTimeout(finish, 1800);
    const step = () => {
      for (let n = 0; n < chunk && i < captured.length; n++, i++) suppress.delete(captured[i]);
      draw(suppress);
      if (i < captured.length) rafRef.current = requestAnimationFrame(step);
      else finish();
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const buildStateContext = () => {
    const state = stateRef.current;
    const k = activeNation();
    if (!state || !k) return {};
    const cities = k.cities.map((c) => {
      const { lon, lat } = tileXYToLonLat(c.tile % WORLD_W, (c.tile / WORLD_W) | 0);
      return { name: c.name, lat, lon };
    });
    const others = state.kingdoms
      .filter((o) => o.id !== k.id)
      .map((o) => o.name)
      .join(", ");
    return {
      kingdom: k.name,
      capital: cities[0],
      cities,
      approxAreaKm2: tilesOwned(state, k.id) * tileKm2(nationLat(k)),
      rivals: others || undefined,
    };
  };

  // Seed a nation's capital + cities and grow it to the stated area.
  const seedAndGrow = (state: MapState, k: Kingdom, data: any, conquerPenalty: number): number[] => {
    const cap = lonLatToTileXY(data.capital.lon, data.capital.lat);
    seedDisk(state, k.id, cap.x, cap.y, 3);
    placeCity(state, k.id, cap.x, cap.y, data.capital.name ?? "Capital", 0);
    if (Array.isArray(data.cities)) {
      for (const c of data.cities) {
        const t = lonLatToTileXY(c.lon, c.lat);
        seedDisk(state, k.id, t.x, t.y, 2);
        placeCity(state, k.id, t.x, t.y, c.name ?? "City", CITY_MIN_DIST);
      }
    }
    const target = km2ToTiles(data.approxAreaKm2 ?? 0, data.capital.lat);
    const growBy = Math.max(0, target - tilesOwned(state, k.id));
    const rng = mulberry32((Date.now() & 0xffffff) >>> 0);
    return growBy > 0 ? expand(state, k.id, { tiles: growBy, rng, conquerPenalty }) : [];
  };

  // Places the player's civilization from the summary (resets the map).
  const placeKingdom = async () => {
    const state = stateRef.current;
    if (!state) return;
    if (!summaryText.trim()) {
      toast({ title: "Paste a summary first", variant: "destructive" });
      return;
    }
    setPlacing(true);
    try {
      const res = await apiRequest("POST", "/api/map-sandbox/place", { summary: summaryText });
      const data = await res.json();
      const fresh = createState(state.grid);
      stateRef.current = fresh;
      const k = addKingdom(fresh, data.kingdom?.name ?? "Kingdom", PALETTE[0]);
      setActive(k.id);
      const captured = seedAndGrow(fresh, k, data, 0);
      setChatLog([{ role: "assistant", content: data.reply ?? `${k.name} placed.` }]);
      fitNation(k.id);
      animateReveal(captured);
      toast({ title: "Civilization placed", description: data.reply });
    } catch (e: any) {
      if (!handleAuthError(e, toast)) toast({ title: "Placement failed", description: e.message, variant: "destructive" });
    } finally {
      setPlacing(false);
    }
  };

  // Adds a competing nation from a short description (does NOT reset the map).
  const addNation = async () => {
    const state = stateRef.current;
    if (!state || !addDesc.trim()) {
      toast({ title: "Describe the nation first", variant: "destructive" });
      return;
    }
    setAdding(true);
    try {
      const res = await apiRequest("POST", "/api/map-sandbox/place", { summary: addDesc });
      const data = await res.json();
      const color = PALETTE[state.kingdoms.length % PALETTE.length];
      const k = addKingdom(state, data.kingdom?.name ?? "Rival", color);
      setActive(k.id);
      // conquerPenalty so it fills empty land first, only biting a contested border
      const captured = seedAndGrow(state, k, data, 28);
      setAddOpen(false);
      setAddDesc("");
      fitNation(k.id);
      animateReveal(captured);
      toast({ title: `${k.name} added`, description: data.reply });
    } catch (e: any) {
      if (!handleAuthError(e, toast)) toast({ title: "Add nation failed", description: e.message, variant: "destructive" });
    } finally {
      setAdding(false);
    }
  };

  const deleteNation = (id: number) => {
    const state = stateRef.current;
    if (!state) return;
    removeKingdom(state, id);
    if (activeIdRef.current === id) setActive(state.kingdoms[0]?.id ?? 1);
    draw();
    syncNations();
  };

  const applyOperations = (ops: any[]): number[] => {
    const state = stateRef.current!;
    const k = activeNation();
    if (!k) return [];
    const lat = nationLat(k);
    const rng = mulberry32((Date.now() & 0xffffff) >>> 0);
    const captured: number[] = [];
    for (const op of ops || []) {
      if (op.type === "expand") {
        const target = op.toward ? lonLatToTileXY(op.toward.lon, op.toward.lat) : undefined;
        const tiles = op.areaKm2 ? km2ToTiles(op.areaKm2, lat) : op.tiles ?? 250;
        captured.push(
          ...expand(state, k.id, { tiles, target, dir: target ? undefined : (op.direction as Direction | undefined), focus: 0.7, rng }),
        );
      } else if (op.type === "contract") {
        const tiles = op.areaKm2 ? km2ToTiles(op.areaKm2, lat) : op.tiles ?? 150;
        contract(state, k.id, { tiles, dir: op.direction as Direction | undefined, focus: 0.6, rng });
      } else if (op.type === "found_city") {
        const t = lonLatToTileXY(op.lon, op.lat);
        seedDisk(state, k.id, t.x, t.y, 2);
        placeCity(state, k.id, t.x, t.y, op.name ?? "City", CITY_MIN_DIST);
      } else if (op.type === "move_city") {
        const t = lonLatToTileXY(op.lon, op.lat);
        const want = (op.name ?? "").toLowerCase().trim();
        const city =
          k.cities.find((c) => c.name.toLowerCase() === want) ||
          k.cities.find((c) => want.length > 0 && (c.name.toLowerCase().includes(want) || want.includes(c.name.toLowerCase())));
        if (city) {
          seedDisk(state, k.id, t.x, t.y, 1);
          city.tile = t.y * WORLD_W + t.x;
        } else {
          seedDisk(state, k.id, t.x, t.y, 2);
          placeCity(state, k.id, t.x, t.y, op.name ?? "City", CITY_MIN_DIST);
        }
      }
    }
    return captured;
  };

  const sendChat = async () => {
    const state = stateRef.current;
    const k = activeNation();
    const msg = chatInput.trim();
    if (!msg) return;
    if (!state || !k) {
      toast({ title: "Place a nation first", variant: "destructive" });
      return;
    }
    const history = chatLog.slice();
    setChatLog([...chatLog, { role: "user", content: msg }]);
    setChatInput("");
    setChatting(true);
    try {
      const res = await apiRequest("POST", "/api/map-sandbox/chat", { message: msg, history, state: buildStateContext() });
      const data = await res.json();
      setChatLog((prev) => [...prev, { role: "assistant", content: data.reply ?? "(no reply)" }]);
      animateReveal(applyOperations(data.operations || []));
    } catch (e: any) {
      if (!handleAuthError(e, toast)) setChatLog((prev) => [...prev, { role: "assistant", content: `⚠️ ${e.message}` }]);
    } finally {
      setChatting(false);
    }
  };

  // --- territory painting ---
  const paintAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    const k = activeNation();
    const mode = paintModeRef.current;
    if (!canvas || !state || !k || mode === "off") return;
    const rect = canvas.getBoundingClientRect();
    const v = viewRef.current;
    const cx = Math.round(v.x + ((clientX - rect.left) / rect.width) * v.w);
    const cy = Math.round(v.y + ((clientY - rect.top) / rect.height) * v.h);
    const br = Math.max(1, Math.round(v.w / 150)); // coarse zoomed out, fine zoomed in
    const { owner, grid } = state;
    for (let dy = -br; dy <= br; dy++) {
      for (let dx = -br; dx <= br; dx++) {
        if (dx * dx + dy * dy > br * br) continue;
        const x = cx + dx, y = cy + dy;
        if (x < 0 || y < 0 || x >= WORLD_W || y >= WORLD_H) continue;
        const t = y * WORLD_W + x;
        if (mode === "claim") {
          if (isLand(grid.terrain[t])) owner[t] = k.id;
        } else if (owner[t] === k.id) {
          owner[t] = 0;
        }
      }
    }
    draw();
  };

  useEffect(() => {
    let alive = true;
    loadWorldMap()
      .then((grid) => {
        if (!alive) return;
        stateRef.current = createState(grid);
        baseRef.current = buildBaseTerrain(grid, latOfRow);
        setReady(true);
        draw();
      })
      .catch((e) => toast({ title: "World map failed to load", description: e.message, variant: "destructive" }));
    return () => {
      alive = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

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
      let nh = nw / WORLD_ASPECT;
      if (nh > WORLD_H) {
        nh = WORLD_H;
        nw = nh * WORLD_ASPECT;
      }
      const nx = clamp(tileX - fx * nw, 0, WORLD_W - nw);
      const ny = clamp(tileY - fy * nh, 0, WORLD_H - nh);
      viewRef.current = { x: nx, y: ny, w: nw, h: nh };
      draw();
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (paintModeRef.current !== "off") {
      paintingRef.current = true;
      paintAt(e.clientX, e.clientY);
      return;
    }
    dragRef.current = { x: e.clientX, y: e.clientY, moved: false };
  };
  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (paintingRef.current) {
      paintAt(e.clientX, e.clientY);
      return;
    }
    const drag = dragRef.current;
    const canvas = canvasRef.current;
    if (!drag || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const v = viewRef.current;
    const dxTiles = (e.clientX - drag.x) * (v.w / rect.width);
    const dyTiles = (e.clientY - drag.y) * (v.h / rect.height);
    if (Math.abs(e.clientX - drag.x) > 2 || Math.abs(e.clientY - drag.y) > 2) drag.moved = true;
    viewRef.current = { ...v, x: clamp(v.x - dxTiles, 0, WORLD_W - v.w), y: clamp(v.y - dyTiles, 0, WORLD_H - v.h) };
    drag.x = e.clientX;
    drag.y = e.clientY;
    draw();
  };
  const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (paintingRef.current) {
      paintingRef.current = false;
      syncNations();
      return;
    }
    const drag = dragRef.current;
    dragRef.current = null;
    const canvas = canvasRef.current;
    if (!drag || drag.moved || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const v = viewRef.current;
    const tx = v.x + ((e.clientX - rect.left) / rect.width) * v.w;
    const ty = v.y + ((e.clientY - rect.top) / rect.height) * v.h;
    const { lon, lat } = tileXYToLonLat(tx, ty);
    setClicked(`${lat.toFixed(1)}, ${lon.toFixed(1)}`);
  };

  const cursor = paintMode === "off" ? "cursor-grab active:cursor-grabbing" : "cursor-crosshair";
  const activeName = nations.find((n) => n.id === activeId)?.name ?? "—";

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-[1500px] mx-auto space-y-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" title="Back to dashboard">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold">Map Sandbox — World</h1>
            <p className="text-sm text-muted-foreground">
              Place civilizations from descriptions, add rival nations, expand via chat, and paint territory by hand.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_440px] gap-4">
          {/* Map */}
          <div className="space-y-2">
            <div className="rounded-lg border border-border overflow-hidden bg-[#0b1a2b]">
              {!ready && (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Loading world map…
                </div>
              )}
              <canvas
                ref={canvasRef}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={() => {
                  dragRef.current = null;
                  if (paintingRef.current) {
                    paintingRef.current = false;
                    syncNations();
                  }
                }}
                className={`w-full h-auto block ${cursor}`}
                style={{ imageRendering: "pixelated", display: ready ? "block" : "none" }}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Button size="sm" variant="outline" onClick={() => fitNation()} data-testid="button-fit-kingdom">
                <ZoomIn className="w-4 h-4 mr-1" /> Nation
              </Button>
              <Button size="sm" variant="outline" onClick={fitWorld} data-testid="button-fit-world">
                <Globe className="w-4 h-4 mr-1" /> World
              </Button>
              <span className="mx-1 h-5 w-px bg-border" />
              {/* edit-mode toggle */}
              <Button size="sm" variant={paintMode === "off" ? "default" : "outline"} onClick={() => setPaint("off")} title="Pan/zoom">
                <Hand className="w-4 h-4" />
              </Button>
              <Button size="sm" variant={paintMode === "claim" ? "default" : "outline"} onClick={() => setPaint("claim")} title="Paint territory for the active nation" data-testid="button-paint">
                <Brush className="w-4 h-4" />
              </Button>
              <Button size="sm" variant={paintMode === "erase" ? "default" : "outline"} onClick={() => setPaint("erase")} title="Erase the active nation's territory">
                <Eraser className="w-4 h-4" />
              </Button>
              <span className="text-muted-foreground text-xs ml-1">
                click: <span className="font-mono text-foreground">{clicked}</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-muted-foreground">Map data © OpenFront contributors — CC BY-SA 4.0.</p>
              <span className="text-sm font-medium">{stats}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {/* Nations */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium">Nations</label>
                <Button size="sm" variant="outline" onClick={() => setAddOpen((o) => !o)} data-testid="button-add-nation">
                  <Plus className="w-4 h-4 mr-1" /> Add Nation
                </Button>
              </div>
              {nations.length === 0 && <p className="text-xs text-muted-foreground">No nations yet — place one from a summary below.</p>}
              <div className="space-y-1">
                {nations.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setActive(n.id);
                      syncNations();
                    }}
                    className={`flex items-center gap-2 rounded-md px-2 py-1.5 cursor-pointer border ${
                      n.id === activeId ? "border-primary bg-primary/10" : "border-transparent hover:bg-muted/50"
                    }`}
                    data-testid={`nation-row-${n.id}`}
                  >
                    <span className="w-3.5 h-3.5 rounded-sm border border-black/30" style={{ background: n.color }} />
                    <span className="text-sm flex-1 truncate">{n.name}</span>
                    <span className="text-xs text-muted-foreground">{n.tiles.toLocaleString()}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNation(n.id);
                      }}
                      className="text-muted-foreground hover:text-destructive"
                      title="Remove nation"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              {addOpen && (
                <div className="mt-2 space-y-2 rounded-md border border-border p-2">
                  <Textarea
                    value={addDesc}
                    onChange={(e) => setAddDesc(e.target.value)}
                    placeholder="Describe a rival nation, e.g. 'The Maya, centered on the Yucatán, ~250,000 km²'"
                    className="text-xs min-h-[70px]"
                    data-testid="textarea-add-nation"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={addNation} disabled={adding} data-testid="button-place-nation">
                      {adding ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : null} Place
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setAddOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Player summary -> place */}
            <div className="border-t border-border pt-3">
              <label className="text-sm font-medium mb-1 block">Your civilization (from summary)</label>
              <Textarea
                value={summaryText}
                onChange={(e) => setSummaryText(e.target.value)}
                placeholder="Paste a full civilization summary here…"
                className="font-mono text-xs min-h-[120px]"
                data-testid="textarea-summary"
              />
              <Button className="mt-2 w-full" onClick={placeKingdom} disabled={placing || !ready} data-testid="button-place-kingdom">
                {placing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Place Civilization (resets map)
              </Button>
            </div>

            {/* Chat */}
            <div className="border-t border-border pt-3">
              <label className="text-sm font-medium mb-1 block">
                Strategy chat <span className="text-muted-foreground font-normal">· directing {activeName}</span>
              </label>
              <div className="h-[230px] overflow-y-auto rounded-md border border-border p-2 space-y-2 bg-muted/30">
                {chatLog.length === 0 && (
                  <p className="text-xs text-muted-foreground p-2">
                    Select a nation, then say things like “Conquer west over the Rockies” or “Take the Maya's coastline.”
                  </p>
                )}
                {chatLog.map((m, i) => (
                  <div
                    key={i}
                    className={`text-sm rounded-lg px-3 py-2 max-w-[90%] ${
                      m.role === "user" ? "ml-auto bg-primary/15 border border-primary/30" : "mr-auto bg-card border border-border"
                    }`}
                  >
                    {m.content}
                  </div>
                ))}
                {chatting && (
                  <div className="mr-auto text-sm text-muted-foreground flex items-center gap-2 px-3 py-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> thinking…
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <div className="flex gap-2 mt-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendChat();
                    }
                  }}
                  placeholder={`Direct ${activeName}…`}
                  disabled={chatting}
                  data-testid="input-chat"
                />
                <Button onClick={sendChat} disabled={chatting} size="icon" data-testid="button-send-chat">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
