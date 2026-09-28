/**
 * Map sandbox endpoints — the LLM half of the territory-map prototype.
 *
 *  POST /api/map-sandbox/place  { summary }            -> place_kingdom tool
 *  POST /api/map-sandbox/chat   { message, history, state } -> update_map tool
 *
 * Both force a single tool call so we always get structured geographic output
 * (real lat/lon, leaning on Claude's own world knowledge) plus a prose reply.
 * Isolated from the main game so it can be lifted into the real turn loop later.
 */
import type { Express, RequestHandler } from "express";
import Anthropic from "@anthropic-ai/sdk";

// Sonnet 4.6 — Haiku gets city coordinates right but allocates territory
// poorly; Sonnet reasons about geographic extent much better.
const MODEL = "claude-sonnet-4-6";

let _client: Anthropic | null = null;
function client(): Anthropic {
  if (!_client) {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY is required for the map sandbox");
    }
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return _client;
}

const placeTool: Anthropic.Tool = {
  name: "place_kingdom",
  description:
    "Place the described civilization onto the real-world map using real geographic coordinates for its capital and notable settlements.",
  input_schema: {
    type: "object",
    properties: {
      kingdom: {
        type: "object",
        properties: {
          name: { type: "string" },
          color: { type: "string", description: "hex color like #cc3a3a" },
        },
        required: ["name", "color"],
      },
      capital: {
        type: "object",
        properties: {
          name: { type: "string" },
          lat: { type: "number" },
          lon: { type: "number" },
        },
        required: ["name", "lat", "lon"],
      },
      cities: {
        type: "array",
        description: "Notable cities/settlements the summary mentions, with real coordinates.",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            lat: { type: "number" },
            lon: { type: "number" },
          },
          required: ["name", "lat", "lon"],
        },
      },
      approxAreaKm2: {
        type: "number",
        description: "Approximate total controlled land area in square kilometers.",
      },
      reply: { type: "string", description: "One-sentence confirmation of the placement." },
    },
    required: ["kingdom", "capital", "cities", "approxAreaKm2", "reply"],
  },
};

const updateTool: Anthropic.Tool = {
  name: "update_map",
  description:
    "Expand or contract the kingdom's territory and found new cities in response to the user's instruction, using real-world coordinates.",
  input_schema: {
    type: "object",
    properties: {
      reply: { type: "string", description: "In-character narration of what happens (1-3 sentences)." },
      operations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            type: { type: "string", enum: ["expand", "contract", "found_city", "move_city"] },
            toward: {
              type: "object",
              description: "Point to grow/shrink toward (expand/contract).",
              properties: { lat: { type: "number" }, lon: { type: "number" } },
            },
            direction: {
              type: "string",
              enum: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"],
              description: "Compass fallback when no toward point is given.",
            },
            areaKm2: { type: "number", description: "Land area to add/remove in square kilometers." },
            name: { type: "string", description: "City name (for found_city, or the existing city to move)." },
            lat: { type: "number" },
            lon: { type: "number" },
          },
          required: ["type"],
        },
      },
    },
    required: ["reply", "operations"],
  },
};

function extractToolInput(message: Anthropic.Message, toolName: string): any {
  const block = message.content.find(
    (b) => b.type === "tool_use" && b.name === toolName,
  );
  if (block && block.type === "tool_use") return block.input;
  return null;
}

export function registerMapSandboxRoutes(app: Express, isAuthenticated: RequestHandler): void {
  app.post("/api/map-sandbox/place", isAuthenticated, async (req: any, res) => {
    try {
      const summary = String(req.body?.summary || "").trim();
      if (!summary) return res.status(400).json({ message: "summary is required" });

      const response = await client().messages.create({
        model: MODEL,
        max_tokens: 1500,
        tools: [placeTool],
        tool_choice: { type: "tool", name: "place_kingdom" },
        messages: [
          {
            role: "user",
            content: `Below is a civilization's summary. Place it on the real-world map at the ACTUAL geographic locations it describes (use real latitude/longitude). Identify the capital and the most notable cities/settlements (cap at ~12), and estimate the total controlled land area in km². Prefer the real places named in the text (e.g. modern city names, rivers, regions).\n\nSUMMARY:\n${summary}`,
          },
        ],
      });

      const input = extractToolInput(response, "place_kingdom");
      if (!input) return res.status(502).json({ message: "Model did not return a placement" });
      res.json(input);
    } catch (error: any) {
      console.error("[map-sandbox/place]", error?.stack || String(error));
      res.status(500).json({ message: error?.message || "Failed to place kingdom" });
    }
  });

  app.post("/api/map-sandbox/chat", isAuthenticated, async (req: any, res) => {
    try {
      const message = String(req.body?.message || "").trim();
      const state = req.body?.state || {};
      const history = Array.isArray(req.body?.history) ? req.body.history : [];
      if (!message) return res.status(400).json({ message: "message is required" });

      const citiesList = Array.isArray(state.cities)
        ? state.cities
            .map((c: any) => `  - ${c.name} (${c.lat?.toFixed?.(1)}, ${c.lon?.toFixed?.(1)})`)
            .join("\n")
        : "";

      const systemPrompt = `You are the strategic AI directing the territory of ${state.kingdom || "a kingdom"} on a real-world map.
Current state:
- Capital: ${state.capital?.name || "?"} at (${state.capital?.lat ?? "?"}, ${state.capital?.lon ?? "?"})
- Approx controlled area: ${state.approxAreaKm2 ? Math.round(state.approxAreaKm2).toLocaleString() + " km²" : "unknown"}
- Cities:\n${citiesList || "  (none yet)"}
${state.rivals ? `- Rival nations on the map: ${state.rivals}. To take a rival's land, expand toward its location; territory is exclusive, so expanding into a rival captures those tiles from them.` : ""}

Operations you can perform (in update_map.operations):
- expand: grow territory toward a {lat,lon} point (or compass direction) by areaKm2
- contract: shed territory in a direction by areaKm2
- found_city: add a NEW city at {name, lat, lon}
- move_city: reposition an EXISTING city to corrected {name, lat, lon} (use this when the user says a city is in the wrong place — give its true real-world coordinates)

CRITICAL: the map ONLY changes through operations. Your reply text changes NOTHING on its own. Never claim to have moved, founded, or changed something unless you include the matching operation. If the user says cities are misplaced, emit move_city operations with their correct real-world coordinates (e.g. Chicago is 41.88, -87.63). If you cannot do what is asked, say so plainly. Always call update_map; use an empty operations array only if truly nothing should change.`;

      const msgs: Anthropic.MessageParam[] = [
        ...history
          .filter((h: any) => h && (h.role === "user" || h.role === "assistant") && h.content)
          .map((h: any) => ({ role: h.role, content: String(h.content) })),
        { role: "user", content: message },
      ];

      const response = await client().messages.create({
        model: MODEL,
        max_tokens: 1500,
        system: systemPrompt,
        tools: [updateTool],
        tool_choice: { type: "tool", name: "update_map" },
        messages: msgs,
      });

      const input = extractToolInput(response, "update_map");
      if (!input) return res.status(502).json({ message: "Model did not return map operations" });
      res.json(input);
    } catch (error: any) {
      console.error("[map-sandbox/chat]", error?.stack || String(error));
      res.status(500).json({ message: error?.message || "Failed to update map" });
    }
  });
}
