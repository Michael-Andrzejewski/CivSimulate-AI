/**
 * Storage for multiplayer sessions. Dual-backend like storage.ts: Drizzle on
 * Postgres (Replit) when DATABASE_URL is set, raw better-sqlite3 locally.
 *
 * Players are keyed by a per-seat id (returned on create/join and held in the
 * browser's sessionStorage), so the same auth user can occupy both seats in
 * two tabs for local testing, while two real users each get their own seat.
 */
const isLocalDev = !process.env.DATABASE_URL;

let db: any;
let gameSessions: any, sessionPlayers: any;
let eq: any, asc: any, inArray: any;
let sqlite: any;

// Lazy backend init (avoids top-level await; runs once on first store call).
let initPromise: Promise<void> | null = null;
function ensureInit(): Promise<void> {
  if (!initPromise) {
    initPromise = (async () => {
      if (!isLocalDev) {
        const dbModule = await import("./db");
        const schema = await import("@shared/schema");
        const orm = await import("drizzle-orm");
        db = dbModule.db;
        gameSessions = schema.gameSessions;
        sessionPlayers = schema.sessionPlayers;
        eq = orm.eq;
        asc = orm.asc;
        inArray = orm.inArray;
      } else {
        const m = await import("./sqliteDb");
        sqlite = m.sqlite;
      }
    })();
  }
  return initPromise;
}

function genId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 11)}`;
}

/** Maximum civilizations (players) per lobby. */
export const MAX_PLAYERS = 8;

export interface Session {
  id: string;
  joinCode: string;
  hostPlayerId: string | null;
  turnIncrement: number;
  currentYear: number;
  turnNumber: number;
  phase: string;
  status: string;
  mapLog: string;
  mapSeed: number;
  lastSimulation: string | null;
  systemPrompt: string | null;
  randomDigit: number;
  history: string;
  soloPlayerId: string | null;
  addToCanon: boolean;
}
export interface Player {
  id: string;
  sessionId: string;
  userId: string;
  slot: number;
  playerName: string | null;
  kingdomName: string | null;
  location: string | null;
  goals: string | null;
  questions: string; // JSON array of AI-generated questions for this turn
  answers: string; // the player's free-form answer this turn
  summary: string | null;
  ready: boolean;
  optimisticMode: boolean;
  altruismStats: boolean;
  goalQuestions: string; // none | one | all
  customPrompt: string | null;
}

function mapSessionRow(r: any): Session {
  return {
    id: r.id,
    joinCode: r.join_code,
    hostPlayerId: r.host_player_id ?? null,
    turnIncrement: r.turn_increment,
    currentYear: r.current_year,
    turnNumber: r.turn_number,
    phase: r.phase,
    status: r.status,
    mapLog: r.map_log ?? "[]",
    mapSeed: r.map_seed ?? 0,
    lastSimulation: r.last_simulation ?? null,
    systemPrompt: r.system_prompt ?? null,
    randomDigit: r.random_digit ?? 0,
    history: r.history ?? "[]",
    soloPlayerId: r.solo_player_id ?? null,
    addToCanon: r.add_to_canon === undefined || r.add_to_canon === null ? true : !!r.add_to_canon,
  };
}
function mapPlayerRow(r: any): Player {
  return {
    id: r.id,
    sessionId: r.session_id,
    userId: r.user_id,
    slot: r.slot,
    playerName: r.player_name ?? null,
    kingdomName: r.kingdom_name ?? null,
    location: r.location ?? null,
    goals: r.goals ?? null,
    questions: r.questions ?? "[]",
    answers: r.answers ?? "[]",
    summary: r.summary ?? null,
    ready: !!r.ready,
    optimisticMode: !!r.optimistic_mode,
    altruismStats: !!r.altruism_stats,
    goalQuestions: r.goal_questions ?? "one",
    customPrompt: r.custom_prompt ?? null,
  };
}

export async function getSessionByCode(code: string): Promise<Session | null> {
  await ensureInit();
  if (isLocalDev) {
    const r = sqlite.prepare(`SELECT * FROM game_sessions WHERE join_code = ?`).get(code);
    return r ? mapSessionRow(r) : null;
  }
  const [s] = await db.select().from(gameSessions).where(eq(gameSessions.joinCode, code)).limit(1);
  return s || null;
}

async function uniqueCode(): Promise<string> {
  for (let i = 0; i < 25; i++) {
    const code = String(Math.floor(Math.random() * 90000) + 10000);
    if (!(await getSessionByCode(code))) return code;
  }
  throw new Error("Could not allocate a join code");
}

export async function getFullSession(
  sessionId: string,
): Promise<{ session: Session; players: Player[] } | null> {
  await ensureInit();
  if (isLocalDev) {
    const s = sqlite.prepare(`SELECT * FROM game_sessions WHERE id = ?`).get(sessionId);
    if (!s) return null;
    const ps = sqlite.prepare(`SELECT * FROM session_players WHERE session_id = ? ORDER BY slot ASC`).all(sessionId);
    return { session: mapSessionRow(s), players: ps.map(mapPlayerRow) };
  }
  const [s] = await db.select().from(gameSessions).where(eq(gameSessions.id, sessionId)).limit(1);
  if (!s) return null;
  const ps = await db.select().from(sessionPlayers).where(eq(sessionPlayers.sessionId, sessionId)).orderBy(asc(sessionPlayers.slot));
  return { session: s, players: ps };
}

export async function createSession(
  userId: string,
  settings: { turnIncrement: number; currentYear: number },
): Promise<{ session: Session; playerId: string }> {
  await ensureInit();
  const code = await uniqueCode();
  if (isLocalDev) {
    const sid = genId();
    const pid = genId();
    sqlite
      .prepare(`INSERT INTO game_sessions (id, join_code, host_player_id, turn_increment, current_year) VALUES (?, ?, ?, ?, ?)`)
      .run(sid, code, pid, settings.turnIncrement, settings.currentYear);
    sqlite
      .prepare(`INSERT INTO session_players (id, session_id, user_id, slot, player_name) VALUES (?, ?, ?, 1, ?)`)
      .run(pid, sid, userId, "Player 1");
    const full = await getFullSession(sid);
    return { session: full!.session, playerId: pid };
  }
  const [s] = await db
    .insert(gameSessions)
    .values({ joinCode: code, turnIncrement: settings.turnIncrement, currentYear: settings.currentYear })
    .returning();
  const [p] = await db
    .insert(sessionPlayers)
    .values({ sessionId: s.id, userId, slot: 1, playerName: "Player 1" })
    .returning();
  const [s2] = await db
    .update(gameSessions)
    .set({ hostPlayerId: p.id, updatedAt: new Date() })
    .where(eq(gameSessions.id, s.id))
    .returning();
  return { session: s2, playerId: p.id };
}

export async function joinSession(
  code: string,
  userId: string,
): Promise<{ session: Session; playerId: string }> {
  await ensureInit();
  const session = await getSessionByCode(code);
  if (!session) throw Object.assign(new Error("No session for that code"), { status: 404 });
  const full = await getFullSession(session.id);
  if (!full) throw Object.assign(new Error("No session for that code"), { status: 404 });
  if (full.players.length >= MAX_PLAYERS) {
    // Reclaim a lost seat (refresh / auth re-login) ONLY when it is unambiguous:
    // exactly ONE seat belongs to this user. If two seats share a userId — e.g.
    // players are on the same account, or the deployment auths everyone as
    // one user — we cannot tell which seat is "theirs", so we must NOT hand one
    // over, or a joiner would end up controlling another player's civilization.
    const mine = full.players.filter((p) => p.userId === userId);
    if (mine.length === 1) return { session, playerId: mine[0].id };
    throw Object.assign(new Error(`Session is full (max ${MAX_PLAYERS} players)`), { status: 409 });
  }
  // Lowest free slot number (1..MAX_PLAYERS).
  const used = new Set(full.players.map((p) => p.slot));
  let slot = 1;
  while (used.has(slot)) slot++;
  if (isLocalDev) {
    const pid = genId();
    sqlite
      .prepare(`INSERT INTO session_players (id, session_id, user_id, slot, player_name) VALUES (?, ?, ?, ?, ?)`)
      .run(pid, session.id, userId, slot, `Player ${slot}`);
    return { session, playerId: pid };
  }
  const [p] = await db
    .insert(sessionPlayers)
    .values({ sessionId: session.id, userId, slot, playerName: `Player ${slot}` })
    .returning();
  return { session, playerId: p.id };
}

const SETTINGS_FIELDS = ["turnIncrement", "currentYear", "turnNumber", "phase", "status", "systemPrompt", "randomDigit", "addToCanon"] as const;
const SETTINGS_COLS: Record<string, string> = {
  turnIncrement: "turn_increment",
  currentYear: "current_year",
  turnNumber: "turn_number",
  phase: "phase",
  status: "status",
  systemPrompt: "system_prompt",
  randomDigit: "random_digit",
  addToCanon: "add_to_canon",
};
const SETTINGS_BOOL_FIELDS = new Set(["addToCanon"]);

/** Host-only update of locked session settings. */
export async function updateSettings(sessionId: string, playerId: string, fields: Record<string, any>): Promise<Session> {
  await ensureInit();
  const full = await getFullSession(sessionId);
  if (!full) throw Object.assign(new Error("Session not found"), { status: 404 });
  if (full.session.hostPlayerId !== playerId) throw Object.assign(new Error("Only the host can change session settings"), { status: 403 });
  const updates: Record<string, any> = {};
  for (const f of SETTINGS_FIELDS) if (fields[f] !== undefined) updates[f] = SETTINGS_BOOL_FIELDS.has(f) ? !!fields[f] : fields[f];
  if (Object.keys(updates).length === 0) return full.session;
  if (isLocalDev) {
    const sets = Object.keys(updates).map((k) => `${SETTINGS_COLS[k]} = ?`);
    const vals = Object.keys(updates).map((k) => (SETTINGS_BOOL_FIELDS.has(k) ? (updates[k] ? 1 : 0) : updates[k]));
    sqlite.prepare(`UPDATE game_sessions SET ${sets.join(", ")}, updated_at = unixepoch() WHERE id = ?`).run(...vals, sessionId);
    return (await getFullSession(sessionId))!.session;
  }
  const [s] = await db.update(gameSessions).set({ ...updates, updatedAt: new Date() }).where(eq(gameSessions.id, sessionId)).returning();
  return s;
}

const PLAYER_FIELDS = ["playerName", "kingdomName", "location", "goals", "questions", "answers", "summary", "ready", "optimisticMode", "altruismStats", "goalQuestions", "customPrompt"] as const;
const PLAYER_COLS: Record<string, string> = {
  playerName: "player_name",
  kingdomName: "kingdom_name",
  location: "location",
  goals: "goals",
  questions: "questions",
  answers: "answers",
  summary: "summary",
  ready: "ready",
  optimisticMode: "optimistic_mode",
  altruismStats: "altruism_stats",
  goalQuestions: "goal_questions",
  customPrompt: "custom_prompt",
};
const PLAYER_BOOL_FIELDS = new Set(["ready", "optimisticMode", "altruismStats"]);

/** A player updates their own seat. */
export async function updatePlayer(playerId: string, fields: Record<string, any>): Promise<Player> {
  await ensureInit();
  const updates: Record<string, any> = {};
  for (const f of PLAYER_FIELDS) if (fields[f] !== undefined) updates[f] = PLAYER_BOOL_FIELDS.has(f) ? !!fields[f] : fields[f];
  if (isLocalDev) {
    if (Object.keys(updates).length) {
      const sets = Object.keys(updates).map((k) => `${PLAYER_COLS[k]} = ?`);
      const vals = Object.keys(updates).map((k) => (PLAYER_BOOL_FIELDS.has(k) ? (updates[k] ? 1 : 0) : updates[k]));
      sqlite.prepare(`UPDATE session_players SET ${sets.join(", ")} WHERE id = ?`).run(...vals, playerId);
    }
    const r = sqlite.prepare(`SELECT * FROM session_players WHERE id = ?`).get(playerId);
    if (!r) throw Object.assign(new Error("Player not found"), { status: 404 });
    return mapPlayerRow(r);
  }
  if (Object.keys(updates).length) {
    await db.update(sessionPlayers).set(updates).where(eq(sessionPlayers.id, playerId));
  }
  const [p] = await db.select().from(sessionPlayers).where(eq(sessionPlayers.id, playerId)).limit(1);
  if (!p) throw Object.assign(new Error("Player not found"), { status: 404 });
  return p;
}

const SESSION_COLS: Record<string, string> = {
  phase: "phase",
  status: "status",
  currentYear: "current_year",
  turnNumber: "turn_number",
  mapLog: "map_log",
  mapSeed: "map_seed",
  lastSimulation: "last_simulation",
  systemPrompt: "system_prompt",
  history: "history",
  soloPlayerId: "solo_player_id",
};

/** Generic (non-host-gated) session update used by the simulation engine. */
export async function patchSession(sessionId: string, fields: Record<string, any>): Promise<Session> {
  await ensureInit();
  const updates: Record<string, any> = {};
  for (const k of Object.keys(SESSION_COLS)) if (fields[k] !== undefined) updates[k] = fields[k];
  if (Object.keys(updates).length === 0) return (await getFullSession(sessionId))!.session;
  if (isLocalDev) {
    const sets = Object.keys(updates).map((k) => `${SESSION_COLS[k]} = ?`);
    const vals = Object.keys(updates).map((k) => updates[k]);
    sqlite.prepare(`UPDATE game_sessions SET ${sets.join(", ")}, updated_at = unixepoch() WHERE id = ?`).run(...vals, sessionId);
    return (await getFullSession(sessionId))!.session;
  }
  const [s] = await db.update(gameSessions).set({ ...updates, updatedAt: new Date() }).where(eq(gameSessions.id, sessionId)).returning();
  return s;
}

export interface MySession {
  sessionId: string;
  joinCode: string;
  phase: string;
  turnNumber: number;
  currentYear: number;
  playerId: string;
  kingdomName: string | null;
  playerCount: number;
  isHost: boolean;
}

/** All sessions this user has a seat in (for the "rejoin" list), newest first. */
export async function listSessionsForUser(userId: string): Promise<MySession[]> {
  await ensureInit();
  if (isLocalDev) {
    const rows = sqlite
      .prepare(
        `SELECT sp.id AS pid, sp.kingdom_name AS my_kingdom, s.*,
                (SELECT COUNT(*) FROM session_players WHERE session_id = s.id) AS player_count
         FROM session_players sp JOIN game_sessions s ON s.id = sp.session_id
         WHERE sp.user_id = ? ORDER BY s.updated_at DESC`,
      )
      .all(userId);
    return rows.map((r: any) => ({
      sessionId: r.id,
      joinCode: r.join_code,
      phase: r.phase,
      turnNumber: r.turn_number,
      currentYear: r.current_year,
      playerId: r.pid,
      kingdomName: r.my_kingdom ?? null,
      playerCount: r.player_count,
      isHost: r.host_player_id === r.pid,
    }));
  }
  const mine = await db.select().from(sessionPlayers).where(eq(sessionPlayers.userId, userId));
  if (mine.length === 0) return [];
  const ids = Array.from(new Set(mine.map((p: any) => p.sessionId)));
  const sessions = await db.select().from(gameSessions).where(inArray(gameSessions.id, ids));
  const allPlayers = await db.select().from(sessionPlayers).where(inArray(sessionPlayers.sessionId, ids));
  const byId = new Map(sessions.map((s: any) => [s.id, s]));
  const countById = new Map<string, number>();
  for (const p of allPlayers) countById.set(p.sessionId, (countById.get(p.sessionId) || 0) + 1);
  const result: MySession[] = [];
  for (const p of mine) {
    const s: any = byId.get(p.sessionId);
    if (!s) continue;
    result.push({
      sessionId: s.id,
      joinCode: s.joinCode,
      phase: s.phase,
      turnNumber: s.turnNumber,
      currentYear: s.currentYear,
      playerId: p.id,
      kingdomName: p.kingdomName ?? null,
      playerCount: countById.get(s.id) || 1,
      isHost: s.hostPlayerId === p.id,
    });
  }
  result.sort((a, b) => ((byId.get(b.sessionId) as any)?.updatedAt ?? 0) - ((byId.get(a.sessionId) as any)?.updatedAt ?? 0));
  return result;
}

export async function leaveSession(playerId: string): Promise<void> {
  await ensureInit();
  if (isLocalDev) {
    sqlite.prepare(`DELETE FROM session_players WHERE id = ?`).run(playerId);
    return;
  }
  await db.delete(sessionPlayers).where(eq(sessionPlayers.id, playerId));
}
