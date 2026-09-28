// End-to-end check of the multiplayer questions phase (local dev auto-auth).
const BASE = "http://localhost:5000";
let COOKIE = "";
// Auto-login (local dev) and capture the session cookie.
{
  const r = await fetch(BASE + "/api/login", { redirect: "manual" });
  const sc = r.headers.get("set-cookie");
  if (sc) COOKIE = sc.split(";")[0];
}
const j = async (method, path, body) => {
  const r = await fetch(BASE + path, {
    method,
    headers: { "content-type": "application/json", cookie: COOKIE },
    body: body ? JSON.stringify(body) : undefined,
  });
  const t = await r.text();
  let data;
  try { data = JSON.parse(t); } catch { data = t; }
  if (!r.ok) throw new Error(`${method} ${path} -> ${r.status}: ${t.slice(0, 300)}`);
  return data;
};

const log = (...a) => console.log(...a);

// 1. host creates
const created = await j("POST", "/api/sessions", { turnIncrement: 100, currentYear: -5000 });
const sid = created.session.id;
const A = created.playerId;
log("created session", created.session.joinCode, "phase", created.session.phase);

// 2. player B joins
const joined = await j("POST", "/api/sessions/join", { code: created.session.joinCode });
const B = joined.playerId;
log("B joined, slot count check...");

// 3. set up both seats
await j("PATCH", `/api/sessions/${sid}/player`, { playerId: A, playerName: "Hammurabi", kingdomName: "Sumer", location: "Mesopotamia, lower Euphrates" });
await j("PATCH", `/api/sessions/${sid}/player`, { playerId: B, playerName: "Narmer", kingdomName: "Kemet", location: "Nile Delta, Egypt" });

// 4. host starts -> places both, phase=goals
await j("POST", `/api/sessions/${sid}/start`, { playerId: A });
let full = await j("GET", `/api/sessions/${sid}`);
log("after start: phase =", full.session.phase, "| mapLog ops =", JSON.parse(full.session.mapLog).length);

// 5. both submit goals; the 2nd submit should trigger question generation
await j("POST", `/api/sessions/${sid}/submit-goals`, { playerId: A, goals: "Build irrigation canals across the floodplain and found a temple-city; expand westward." });
full = await j("GET", `/api/sessions/${sid}`);
log("after A goals: phase =", full.session.phase, "(expect goals)");
await j("POST", `/api/sessions/${sid}/submit-goals`, { playerId: B, goals: "Unify Upper and Lower Egypt under one crown; control Nile trade; build a fortified capital." });

// 6. inspect questions
full = await j("GET", `/api/sessions/${sid}`);
log("\nafter both goals: phase =", full.session.phase, "(expect questions)");
for (const p of full.players) {
  const qs = JSON.parse(p.questions || "[]");
  log(`\n  ${p.kingdomName} questions (${qs.length}):`);
  qs.forEach((q, i) => log(`    ${i + 1}. ${q}`));
  log(`    ready = ${p.ready} (expect false)`);
}

// 7. both answer
const qA = JSON.parse(full.players.find((p) => p.id === A).questions);
const qB = JSON.parse(full.players.find((p) => p.id === B).questions);
await j("POST", `/api/sessions/${sid}/submit-answers`, { playerId: A, answers: qA.map(() => "We prioritize irrigation first, cooperate with river tribes, and risk our grain surplus to fund it.") });
full = await j("GET", `/api/sessions/${sid}`);
log("\nafter A answers: phase =", full.session.phase, "(expect questions)");
await j("POST", `/api/sessions/${sid}/submit-answers`, { playerId: B, answers: qB.map(() => "We unify by force where needed but prefer marriage alliances; we tax trade heavily and fortify the capital.") });

full = await j("GET", `/api/sessions/${sid}`);
const bothReady = full.players.every((p) => p.ready);
log("after both answers: bothReady =", bothReady, "(expect true)");

// 8. run the round
log("\nrunning round (this calls the model, ~15-30s)...");
const t0 = Date.now();
await j("POST", `/api/sessions/${sid}/run-round`, {});
log("run-round returned in", ((Date.now() - t0) / 1000).toFixed(1), "s");

full = await j("GET", `/api/sessions/${sid}`);
log("\nafter run-round: phase =", full.session.phase, "(expect results)");
log("year:", full.session.currentYear, "| turn:", full.session.turnNumber, "| mapLog ops:", JSON.parse(full.session.mapLog).length);
log("\nshared simulation (first 600 chars):\n", (full.session.lastSimulation || "").slice(0, 600));
for (const p of full.players) {
  log(`\n  ${p.kingdomName} summary (first 220):`, (p.summary || "").slice(0, 220));
  log(`    questions after run =`, p.questions, "| ready =", p.ready);
}
log("\nSESSION_ID", sid);
