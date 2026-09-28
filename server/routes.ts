import type { Express } from "express";
import { createServer, type Server } from "http";
import { ZodError } from "zod";
import { storage } from "./storage";
import { insertCivilizationSchema, updateCivilizationSchema } from "@shared/schema";
import {
  generateCivilizationResponse,
  generateCatastropheDescription,
  generateEnemyCivilization,
  buildSystemPrompt,
  getDefaultSystemPrompt,
  getDefaultCompetitiveAIPlayerPrompt,
  generateComparableEnemyCivilization,
  generateAIPlayerGoals,
  simulateAIPlayerTurn,
  generateAIPlayerSummary,
  generateRandomNumber,
  completeText,
  streamText,
  getCheapModelType,
  type AIModelType,
} from "./claudeService";
import { registerMapSandboxRoutes } from "./mapSandboxRoutes";
import { registerMultiplayerRoutes } from "./multiplayerRoutes";

/**
 * Error responder safe for SSE endpoints: once streaming headers have been
 * sent, res.status(500) throws ERR_HTTP_HEADERS_SENT inside the catch block,
 * which becomes an unhandled rejection and kills the whole server process.
 * Instead, emit an error event on the open stream and terminate it.
 */
function sendStreamError(res: any, error: any): void {
  const message = error instanceof Error ? error.message : String(error);
  if (res.headersSent) {
    try {
      res.write(`data: ${JSON.stringify({ type: "error", message })}\n\n`);
      res.write("data: [DONE]\n\n");
    } catch (writeError) {
      console.error("Failed to write stream error event:", writeError);
    }
    res.end();
  } else {
    res.status(500).json({ message });
  }
}

// Guards against concurrent competitive AI turns for the same civilization
// (double-clicking "Run AI Turn" previously ran the whole turn twice).
const activeCompetitiveTurns = new Set<string>();

// Conditionally import auth based on environment
const isLocalDev = !process.env.REPLIT_DOMAINS;
let setupAuth: any, isAuthenticated: any;

if (isLocalDev) {
  const localAuth = await import("./localAuth");
  setupAuth = localAuth.setupAuth;
  isAuthenticated = localAuth.isAuthenticated;
  console.log("[Routes] Using local authentication");
} else {
  const replitAuth = await import("./replitAuth");
  setupAuth = replitAuth.setupAuth;
  isAuthenticated = replitAuth.isAuthenticated;
  console.log("[Routes] Using Replit authentication");
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Map sandbox (standalone territory-map prototype)
  registerMapSandboxRoutes(app, isAuthenticated);

  // Multiplayer sessions (shared join-code lobbies)
  registerMultiplayerRoutes(app, isAuthenticated);

  // Auth routes
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Civilization routes
  app.get("/api/civilizations", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const civilizations = await storage.getCivilizations(userId);
      res.json(civilizations);
    } catch (error) {
      console.error("Error fetching civilizations:", error);
      res.status(500).json({ message: "Failed to fetch civilizations" });
    }
  });

  app.get("/api/civilizations/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const civilization = await storage.getCivilization(req.params.id, userId);

      if (!civilization) {
        return res.status(404).json({ message: "Civilization not found" });
      }

      res.json(civilization);
    } catch (error) {
      console.error("Error fetching civilization:", error);
      res.status(500).json({ message: "Failed to fetch civilization" });
    }
  });

  // Get default system prompts for UI pre-population
  app.get("/api/civilizations/:id/default-prompts", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const civilization = await storage.getCivilization(req.params.id, userId);

      if (!civilization) {
        return res.status(404).json({ message: "Civilization not found" });
      }

      // Get the default system prompt for Player A (main civilization)
      const playerADefaultPrompt = getDefaultSystemPrompt(civilization);

      // Get the default competitive prompt for Player B (if competitive mode)
      const playerBDefaultPrompt = civilization.competitiveMode
        ? getDefaultCompetitiveAIPlayerPrompt(
            civilization,
            "", // No opponent summary for default prompt display
            civilization.competitiveTurnCount || 1,
            civilization.competitiveTotalTurns || 10
          )
        : null;

      res.json({
        playerADefaultPrompt,
        playerBDefaultPrompt,
      });
    } catch (error) {
      console.error("Error fetching default prompts:", error);
      res.status(500).json({ message: "Failed to fetch default prompts" });
    }
  });

  app.post("/api/civilizations", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;

      // Check if user already has 12 civilizations
      const existingCivs = await storage.getCivilizations(userId);
      if (existingCivs.length >= 12) {
        return res
          .status(400)
          .json({ message: "Maximum of 12 civilizations reached" });
      }

      const validatedData = insertCivilizationSchema.parse(req.body);
      const civilization = await storage.createCivilization(
        userId,
        validatedData,
      );

      res.status(201).json(civilization);
    } catch (error: any) {
      // NOTE: never console.error the raw error object here — on Node 24,
      // util.inspect crashes the whole process on the proxy-laden error that
      // drizzle-zod schemas throw ("Cannot read properties of undefined
      // (reading 'value')" in formatProperty). Log safe strings only.
      console.error(
        "Error creating civilization:",
        error?.stack || error?.message || String(error),
      );
      if (error instanceof ZodError || error?.name === "ZodError") {
        let fieldErrors: unknown = undefined;
        try {
          fieldErrors = error.flatten?.().fieldErrors;
        } catch {
          // best-effort detail extraction only
        }
        return res.status(400).json({
          message: "Invalid civilization data",
          errors: fieldErrors,
        });
      }
      res.status(500).json({ message: "Failed to create civilization" });
    }
  });

  app.patch(
    "/api/civilizations/:id",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;

        // Validate against the whitelist schema: unknown/server-managed keys
        // are stripped (consistently on both Postgres and SQLite), bad values
        // are rejected with a 400 instead of corrupting state.
        const parsed = updateCivilizationSchema.safeParse(req.body);
        if (!parsed.success) {
          return res.status(400).json({
            message: "Invalid update data",
            errors: parsed.error.flatten().fieldErrors,
          });
        }

        const updatedCivilization = await storage.updateCivilization(
          req.params.id,
          userId,
          parsed.data,
        );

        if (!updatedCivilization) {
          return res.status(404).json({ message: "Civilization not found" });
        }

        res.json(updatedCivilization);
      } catch (error) {
        console.error("Error updating civilization:", error);
        res.status(500).json({ message: "Failed to update civilization" });
      }
    },
  );

  app.delete(
    "/api/civilizations/:id",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        await storage.deleteCivilization(req.params.id, userId);
        res.status(204).send();
      } catch (error) {
        console.error("Error deleting civilization:", error);
        res.status(500).json({ message: "Failed to delete civilization" });
      }
    },
  );

  // Message routes
  app.get(
    "/api/civilizations/:id/messages",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;

        // Verify ownership of civilization
        const civilization = await storage.getCivilization(
          req.params.id,
          userId,
        );
        if (!civilization) {
          return res.status(404).json({ message: "Civilization not found" });
        }

        const messages = await storage.getMessages(req.params.id);
        res.json(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Failed to fetch messages" });
      }
    },
  );

  // Clear chat messages (keep summaries)
  app.delete(
    "/api/civilizations/:id/messages/clear",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const civilizationId = req.params.id;
        const userId = req.user.claims.sub;

        // Verify civilization ownership
        const civilization = await storage.getCivilization(
          civilizationId,
          userId,
        );
        if (!civilization) {
          return res.status(404).json({ message: "Civilization not found" });
        }

        // Delete all messages except summaries
        await storage.clearChatMessages(civilizationId);

        res.status(204).send();
      } catch (error) {
        console.error("Error clearing chat messages:", error);
        res.status(500).json({ message: "Failed to clear chat messages" });
      }
    },
  );

  // Send message to civilization
  app.post(
    "/api/civilizations/:id/messages",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const civilizationId = req.params.id;
        const userId = req.user.claims.sub;
        const { content, debugMode } = req.body;

        // Verify civilization ownership
        const civilization = await storage.getCivilization(
          civilizationId,
          userId,
        );
        if (!civilization) {
          return res.status(404).send("Civilization not found");
        }

        // Get conversation history (excluding summaries AND Player B's
        // competitive-mode messages — leaking those into the human player's
        // context exposed the opponent's full state and produced consecutive
        // assistant messages, which Anthropic rejects with a 400)
        const allMessages = await storage.getMessages(civilizationId);
        const isPlayerBMessage = (msg: { playerRole?: string | null; messageType?: string | null }) =>
          msg.playerRole === "player_b" ||
          (msg.messageType || "").startsWith("player_b");
        const conversationHistory = allMessages
          .filter(
            (msg) =>
              msg.messageType !== "civilization_summary" &&
              !isPlayerBMessage(msg),
          )
          .map((msg) => ({
            role: msg.role as "user" | "assistant",
            content: msg.content,
          }));

        // Get latest summary (Player A's only)
        const summaries = allMessages.filter(
          (msg) =>
            msg.messageType === "civilization_summary" && !isPlayerBMessage(msg),
        );
        const latestSummary =
          summaries.length > 0
            ? summaries[summaries.length - 1].content
            : undefined;

        const simulatorModelType = (civilization.simulatorModel || "sonnet") as AIModelType;

        // Check if we are in discussion mode (no simulation, no questions)
        // Discussion mode is active if there's ANY summary in the current turn (before next century)
        // and user hasn't clicked "Proceed to next century" yet
        const discussionMode = req.body.discussionMode === true;

        // Determine message type based on discussion mode and conversation state
        const lastMessage = allMessages[allMessages.length - 1];
        const isAnsweringQuestion =
          lastMessage?.messageType === "assistant_question";

        // Set message type based on discussion mode
        let messageType: string;
        if (discussionMode) {
          messageType = "user_discussion";
        } else if (isAnsweringQuestion) {
          messageType = "user_answer";
        } else {
          messageType = "user_goals";
        }

        // Only ask questions if this is a new goal (not an answer) and NOT in discussion mode
        const shouldAskQuestions =
          civilization.goalQuestions !== "none" && messageType === "user_goals";

        // Determine the random number based on the selected mode (kept as a
        // string so leading zeros survive — see generateRandomNumber)
        let randomNumber: string | null = null;
        if (!shouldAskQuestions && !discussionMode) {
          randomNumber = generateRandomNumber(civilization);
        }

        // Check if catastrophe should trigger (only on final message before simulation, except discussion mode)
        let catastropheTriggered = false;
        let catastropheText = "";

        // Check for forced catastrophe first
        const forcedCatastrophe =
          await storage.checkForceCatastrophe(civilizationId);

        // Catastrophe can only trigger when we're actually going to simulate (not asking questions, not discussion)
        const canTriggerCatastrophe =
          !discussionMode &&
          !shouldAskQuestions &&
          (messageType === "user_answer" || messageType === "user_goals");

        if (
          canTriggerCatastrophe &&
          (forcedCatastrophe || civilization.catastropheTimer !== "none")
        ) {
          const summaryCount = allMessages.filter(
            (msg) => msg.messageType === "civilization_summary",
          ).length;

          console.log("[CATASTROPHE DEBUG]", {
            catastropheTimer: civilization.catastropheTimer,
            summaryCount,
            nextTurnNumber: summaryCount + 1,
            messageType,
            forcedCatastrophe,
          });

          if (forcedCatastrophe) {
            catastropheTriggered = true;
            await storage.clearForceCatastrophe(civilizationId);
            console.log("[CATASTROPHE DEBUG] Forced catastrophe triggered");
          } else if (civilization.catastropheTimer === "4 centuries") {
            catastropheTriggered = (summaryCount + 1) % 4 === 0;
            console.log("[CATASTROPHE DEBUG] 4 centuries check:", {
              calculation: `(${summaryCount + 1}) % 4 === 0`,
              result: catastropheTriggered,
            });
          } else if (civilization.catastropheTimer === "5 centuries") {
            catastropheTriggered = (summaryCount + 1) % 5 === 0;
            console.log("[CATASTROPHE DEBUG] 5 centuries check:", {
              calculation: `(${summaryCount + 1}) % 5 === 0`,
              result: catastropheTriggered,
            });
          } else if (civilization.catastropheTimer === "random 1/4th") {
            const catastropheRoll = Math.random();
            catastropheTriggered = catastropheRoll < 0.25;
            console.log("[CATASTROPHE DEBUG] Random 1/4th check:", {
              roll: catastropheRoll,
              threshold: 0.25,
              triggered: catastropheTriggered,
            });
          } else if (civilization.catastropheTimer === "random 1/5th") {
            const catastropheRoll = Math.random();
            catastropheTriggered = catastropheRoll < 0.2;
            console.log("[CATASTROPHE DEBUG] Random 1/5th check:", {
              roll: catastropheRoll,
              threshold: 0.2,
              triggered: catastropheTriggered,
            });
          }

          console.log("[CATASTROPHE DEBUG] Final result:", {
            catastropheTriggered,
            willAppendToMessage: catastropheTriggered,
          });

          if (catastropheTriggered && debugMode) {
            // Debug mode skips the paid description-generation calls (they
            // previously ran BEFORE the debug short-circuit, burning real
            // credits on the exact turns being debugged)
            catastropheText = `\n\n[System: Now it is time for a catastrophe. (Debug mode — description generation skipped.)]`;
          } else if (catastropheTriggered) {
            // Check if enemy civilization mode is enabled
            if (civilization.enemyCivilization === "yes") {
              // For first catastrophe (no stored enemy yet), use location-based
              // For subsequent catastrophes, use the stored comparable enemy from previous turn
              const isFirstCatastrophe = !civilization.enemyTechAdvancements;

              console.log("[CATASTROPHE DEBUG] Enemy civilization mode", {
                isFirstCatastrophe,
                hasStoredEnemy: !!civilization.enemyTechAdvancements,
                storedEnemyLength:
                  civilization.enemyTechAdvancements?.length || 0,
                storedEnemyPreview:
                  civilization.enemyTechAdvancements?.substring(0, 200),
                location: civilization.location,
                currentCentury: civilization.currentCentury,
                civilizationId,
              });

              // For first catastrophe, generate location-based enemy
              // For subsequent catastrophes, use the stored comparable enemy from previous turn
              let enemyDescription: string;

              if (isFirstCatastrophe) {
                const enemyCivData = await generateEnemyCivilization(
                  civilization,
                  undefined,
                  true,
                  simulatorModelType,
                );
                enemyDescription = enemyCivData.description;
                console.log("[ENEMY CIVILIZATION GENERATED - FIRST]", {
                  description: enemyDescription.substring(0, 200) + "...",
                });
              } else {
                // Use stored comparable enemy
                enemyDescription =
                  civilization.enemyTechAdvancements ||
                  "A rival civilization has emerged in the region.";
                console.log("[ENEMY CIVILIZATION - USING STORED]", {
                  description: enemyDescription.substring(0, 200) + "...",
                });
              }

              // Randomly choose between trade war and Limited War
              const battleType =
                Math.random() < 0.5
                  ? "Trade War/Economic Competition/Diplomatic Push"
                  : "Limited War";

              // Generate conflict description based on battle type
              let conflictDescription = "";
              if (
                battleType === "Trade War/Economic Competition/Diplomatic Push"
              ) {
                conflictDescription = `Trade War: The two civilizations will begin an economic competition. This can result in varying economic outputs from previous centuries, internal turmoil, and in extreme cases, oppression, slavery, and morale collapse. Both civilizations will survive the century relatively independently but may gain or lose status, population, technology, and morale. At the end of the century the two powers will diverge and go their separate ways, but the effects will remain.

Balanced example: US and China competing on computer chips, dispute over Taiwan, work capacity, tariffs, protests, status changes.
Imbalanced example: British colonization of India, etc. resulting in exploitation, long-term crippling effects and humiliation for India, and extreme economic surplus, technology, and confidence for Britain.

Avoid these pitfalls:
-Protagonist bias: Player had to win because it's "our" civilization
-Undervaluing experience: Centuries of military tradition can't be learned in a decade
-Teleological thinking: The outcome was predetermined, so events were bent to fit
-Ignoring rational actor theory: Enemies don't use strategic logic`;
              } else {
                conflictDescription = `Limited War: A temporary war will break out. This will reflect wars in history and can result in varying economic outputs, surrender concessions, technological changes, population changes, morale, and status. Both civilizations will survive the century relatively independently but may significantly gain or lose status, population, technology, or morale. At the end of the century the two powers will diverge and go their separate ways, but the effects will remain.

Balanced example: The Hundred Years War between France and England. England lost nearly all French territories, suffered economic strain and political chaos leading to instability later, but developed combined arms tactics, stronger national identity and parliamentary power. France lost significant population but essentially won, gaining status, better national army, more territory, tax system, and artillery.

Imbalanced example: Gulf War. US coalition obliterated Iraqi force. Iraq's government survived but lost oil, population, infrastructure, morale, and status, while US gained oil, status, and long-term dominance in the region.`;
              }

              catastropheText = `\n\n[System: A rival civilization has been encountered! You are now simulating a conflict between two rival powers. They may originate from different times, different locations, and have differing levels of technology, but imagine that they are merged into a hybrid world. (If this other nation was originally far away, imagine that it and all it's territory has teleported over, replacing the area that previously existed.) Both sides become aware of each other, either magically or otherwise, and will engage in conflict for the century. Your job is to be a realistic simulator of this conflict. Describe the advantages and disadvantages of each civilization, and then stage an accurate and unbiased simulation of what happens between them. You can include small narrative details but the overarching conflict must be extremely accurate and realistic by historical standards. If it is realistic, the conflict can be extremely one-sided.

Conflict Type: ${battleType}

Conflict Description:
${conflictDescription}

Enemy Civilization:
${enemyDescription}

Do not be afraid to deal significant and lasting damage to the user's civilization if it is realistic. Technology regression, massive population loss (up to 90%), governance collapse, and long-term despair are all fair game.
You are simulating history, and history can be ruthless or balanced depending on the scenario.
Writing out the early factors should help you to decide how ruthless or balanced to be.
Use historical precedent in your simulation after you evaluate the user's goals.]`;

              console.log(
                "[ENEMY CIVILIZATION DEBUG] Using enemy civilization:",
                {
                  battleType,
                  isFirstCatastrophe,
                  description: enemyDescription.substring(0, 200) + "...",
                },
              );
            } else {
              // Original catastrophe logic
              // 1/4 chance to use default catastrophe, 3/4 chance to use AI-generated catastrophe
              const catastropheTypeRoll = Math.random();

              if (catastropheTypeRoll < 0.25) {
                // Default catastrophe (25% chance)
                catastropheText = `\n\n[System: Now it is time for a catastrophe. I don't get any feedback this round, except that I will continue doing what I was doing previously.
If I die, I die. If my civilization is obliterated... then at least I've learned a lot and I am happy to start over with more advanced knowledge. Ideally, make the catastrophe time and area relevant, and draw on similar historical catastrophes of this time period.]`;

                console.log(
                  "[CATASTROPHE DEBUG] Using default catastrophe prompt",
                );
              } else {
                // AI-generated catastrophe (75% chance)
                const generatedCatastrophe =
                  await generateCatastropheDescription(
                    civilization,
                    latestSummary,
                    simulatorModelType,
                  );

                catastropheText = `\n\n[System: Now it is time for a catastrophe. I don't get any feedback this round, except that I will continue doing what I was doing previously.
If I die, I die. If my civilization is obliterated... then at least I've learned a lot and I am happy to start over with more advanced knowledge. Catastrophe description: ${generatedCatastrophe}]`;

                console.log(
                  "[CATASTROPHE DEBUG] Using AI-generated catastrophe:",
                  generatedCatastrophe,
                );
              }
            }
          }
        }

        // Prepare content with summary if this is first message of turn
        let finalUserContent = content;

        // Add summary prefix if this is the first message of a new turn
        if (
          latestSummary &&
          conversationHistory.length === 0 &&
          !discussionMode
        ) {
          finalUserContent = `[Civilization summary from previous periods]\n${latestSummary}\n\n----\nGoals:\n${content}`;
        } else if (
          conversationHistory.length === 0 &&
          !discussionMode &&
          !latestSummary
        ) {
          // First turn ever - add placeholder summary
          const startingTime = formatCentury(civilization.startingCentury);
          const placeholderSummary = `[Summary: The user has just arrived in ${civilization.location} in the spring in ${startingTime}, with nothing of value, not even clothes.]`;
          finalUserContent = `Civilization summary from previous periods\n${placeholderSummary}\n\n----\nGoals:\n${content}`;
        }

        // Append catastrophe text and random number to content only if we're going to simulate (not asking questions)
        if (!shouldAskQuestions && randomNumber !== null) {
          // Add random number first
          finalUserContent = `${finalUserContent}\n\n[Random number: ${randomNumber}]`;
          // Then add catastrophe if triggered
          if (catastropheTriggered) {
            finalUserContent = `${finalUserContent}${catastropheText}`;
          }
        }

        // Send to Claude with potentially modified content (or return '--' in debug mode)
        if (debugMode) {
          // Save user message FIRST
          await storage.createMessage({
            civilizationId,
            role: "user",
            content: finalUserContent,
            messageType: discussionMode ? "user_discussion" : messageType,
            randomNumber: randomNumber,
          });

          // Handle debug mode with immediate response
          const debugMessageType = discussionMode
            ? "assistant_discussion"
            : shouldAskQuestions
              ? "assistant_question"
              : "assistant_simulation";

          await storage.createMessage({
            civilizationId,
            role: "assistant",
            content: "--",
            messageType: debugMessageType,
          });

          // Set headers for streaming response
          res.setHeader("Content-Type", "text/event-stream");
          res.setHeader("Cache-Control", "no-cache");
          res.setHeader("Connection", "keep-alive");

          // Send random number if available
          if (randomNumber !== null) {
            res.write(
              `data: ${JSON.stringify({ randomNumber: randomNumber.toString() })}\n\n`,
            );
          }

          // Send debug text
          res.write(`data: ${JSON.stringify({ text: "--" })}\n\n`);

          // For simulation in debug mode, also create a summary
          if (!shouldAskQuestions && !discussionMode) {
            await storage.createMessage({
              civilizationId,
              role: "assistant",
              content: "--",
              messageType: "civilization_summary",
            });
            res.write(`data: ${JSON.stringify({ summary: "--" })}\n\n`);
          }

          // Send catastrophe status
          res.write(
            `data: ${JSON.stringify({ catastrophe: catastropheTriggered })}\n\n`,
          );

          // Complete the stream
          res.write("data: [DONE]\n\n");
          res.end();
          return;
        }

        const claudeResponse = await generateCivilizationResponse(
          civilization,
          finalUserContent, // Use the potentially modified content
          conversationHistory,
          latestSummary,
          shouldAskQuestions,
          discussionMode,
          simulatorModelType,
        );

        // Handle streaming responses (questions, simulation, or discussion)
        if (claudeResponse.stream) {
          res.setHeader("Content-Type", "text/event-stream");
          res.setHeader("Cache-Control", "no-cache");
          res.setHeader("Connection", "keep-alive");

          // Send random number immediately if available
          if (randomNumber !== null) {
            res.write(
              `data: ${JSON.stringify({ randomNumber: randomNumber.toString() })}\n\n`,
            );
          }

          // Save user message as it's needed for retries and subsequent turns
          await storage.createMessage({
            civilizationId,
            role: "user",
            content: finalUserContent,
            messageType: discussionMode ? "user_discussion" : messageType,
            randomNumber: randomNumber,
          });

          const streamType = claudeResponse.streamType || "discussion";

          // Stream factory: the first attempt consumes the stream we already
          // opened; retries issue a FRESH API request. (The old code passed
          // `async () => stream`, so every "retry" re-iterated the same
          // already-consumed stream — Anthropic re-threw, OpenAI silently
          // yielded nothing and saved an empty simulation.)
          let initialStream: AsyncIterable<any> | null = claudeResponse.stream;
          const createStream = async (): Promise<AsyncIterable<any>> => {
            if (initialStream) {
              const s = initialStream;
              initialStream = null;
              return s;
            }
            const retryResponse = await generateCivilizationResponse(
              civilization,
              finalUserContent,
              conversationHistory,
              latestSummary,
              shouldAskQuestions,
              discussionMode,
              simulatorModelType,
            );
            if (!retryResponse.stream) {
              throw new Error("Failed to create a new stream for retry");
            }
            return retryResponse.stream;
          };

          // Retry helper function
          const processStreamWithRetry = async (
            streamFn: () => Promise<any>,
            currentStreamType: string,
            maxRetries: number = 2 // Increased retries to 2 for a total of 3 attempts
          ): Promise<string> => {
            let retryCount = 0;

            while (retryCount <= maxRetries) {
              try {
                const streamResult = await streamFn();
                let fullText = "";

                // Process the stream
                for await (const chunk of streamResult) {
                  if (
                    chunk.type === "content_block_delta" &&
                    chunk.delta.type === "text_delta"
                  ) {
                    fullText += chunk.delta.text;
                    res.write(
                      `data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`,
                    );
                  }
                }

                // Determine the correct message type for saving
                let assistantMessageType: string;
                if (currentStreamType === "questions") {
                  assistantMessageType = "assistant_question";
                } else if (currentStreamType === "simulation") {
                  assistantMessageType = "assistant_simulation";
                } else {
                  assistantMessageType = "assistant_discussion";
                }

                // Save the complete assistant message
                await storage.createMessage({
                  civilizationId,
                  role: "assistant",
                  content: fullText,
                  messageType: assistantMessageType,
                });

                console.log("[STREAM] Messages saved successfully", {
                  civilizationId,
                  userMessageType: discussionMode ? "user_discussion" : messageType,
                  assistantMessageType,
                  textLength: fullText.length,
                });

                return fullText; // Return the full text for potential summary generation
              } catch (error: any) {
                retryCount++;
                const errorMessage =
                  error instanceof Error ? error.message : String(error);
                console.error(
                  `[STREAM] Stream processing failed (Attempt ${retryCount}/${maxRetries + 1}), messages not saved`,
                  {
                    civilizationId,
                    error: errorMessage,
                  },
                );

                // Send error notification to client
                let userFriendlyMessage = "";

                if (errorMessage.includes("credit balance is too low")) {
                  userFriendlyMessage =
                    "⚠️ **Error: Anthropic API Credits Depleted**\n\nThe AI service has run out of credits. Please contact the administrator to add more credits to continue using the simulation.\n\nYour message has been saved and you can try again once credits are added.";
                } else if (errorMessage.includes("rate_limit")) {
                  userFriendlyMessage =
                    "⚠️ **Error: Rate Limit Exceeded**\n\nToo many requests have been made to the AI service. Please wait a moment and try again.\n\nYour message has been saved.";
                } else if (errorMessage.includes("overloaded")) {
                  userFriendlyMessage =
                    "⚠️ **Error: Service Overloaded**\n\nThe AI service is currently overloaded. Please try again in a moment.\n\nYour message has been saved.";
                } else if (errorMessage.includes("invalid_request_error")) {
                  userFriendlyMessage =
                    "⚠️ **Error: Invalid Request**\n\nThere was a problem with the request to the AI service. This might be due to the message being too long or containing unsupported content.\n\nYour message has been saved. Try simplifying your request or breaking it into smaller parts.";
                } else if (
                  errorMessage.includes("authentication") ||
                  errorMessage.includes("api_key")
                ) {
                  userFriendlyMessage =
                    "⚠️ **Error: Authentication Failed**\n\nThere was a problem authenticating with the AI service. Please contact the administrator.\n\nYour message has been saved.";
                } else if (errorMessage.match(/4\d{2}/)) {
                  userFriendlyMessage =
                    "⚠️ **Error: Request Failed**\n\nThe AI service rejected the request. This might be due to invalid parameters or content.\n\nYour message has been saved. Try rephrasing your request.";
                } else if (errorMessage.match(/5\d{2}/)) {
                  userFriendlyMessage =
                    "⚠️ **Error: Service Unavailable**\n\nThe AI service is temporarily unavailable. Please try again in a moment.\n\nYour message has been saved.";
                } else {
                  userFriendlyMessage = `⚠️ **Error: Unexpected Issue**\n\nAn unexpected error occurred while processing your request.\n\nError details: ${errorMessage.substring(0, 200)}\n\nYour message has been saved. Please try again.`;
                }

                if (retryCount <= maxRetries) {
                  // Send notification to client about retry (the full
                  // user-facing error text is only written once retries are
                  // exhausted, so partial attempts don't interleave error
                  // banners into the streamed simulation)
                  res.write(
                    `data: ${JSON.stringify({
                      type: "error_retry",
                      message: `⚠️ Error encountered. Retrying in 5 seconds... (Attempt ${retryCount}/${maxRetries + 1})`,
                      attempt: retryCount,
                      maxRetries: maxRetries + 1,
                    })}\n\n`,
                  );

                  // Wait 5 seconds before retrying
                  await new Promise((resolve) => setTimeout(resolve, 5000));
                } else {
                  // All retries exhausted: surface the error and rethrow
                  res.write(
                    `data: ${JSON.stringify({
                      text: "\n\n" + userFriendlyMessage,
                    })}\n\n`,
                  );
                  throw error;
                }
              }
            }
          };

          // Variable to capture the full text from the stream
          let fullText = "";

          // Call the appropriate stream processing function
          if (streamType === "questions") {
            await processStreamWithRetry(createStream, "questions");
          } else if (streamType === "simulation") {
            fullText = await processStreamWithRetry(createStream, "simulation");
          } else if (streamType === "discussion") {
            await processStreamWithRetry(createStream, "discussion");
          }

          // For simulation, we need to generate the summary
          if (streamType === "simulation") {
            // Generate civilization summary
            const currentTime = formatCentury(civilization.currentCentury);
            const summaryMessages: Array<{ role: "user" | "assistant"; content: string }> = [
              ...conversationHistory,
              { role: "user", content: finalUserContent },
              { role: "assistant", content: fullText }, // Assuming fullText is populated from the simulation stream
              {
                role: "user",
                content: `Please provide a concise summary of the current state of this civilization. Use this format:\n\n${currentTime} ${civilization.name} Summary:\n-Personal character details\n-Technologies unlocked\n-Nation statistics:\n--Production statistics (food, economy, materials)\n--Population statistics (population, descendants, health/mortality, intelligence, researchers, military, laborers, crime, morale, unity)\n--Global settings: Cities and details, allies, enemies, outside global tech level, area mapped\n${civilization.altruismStats ? "--Lives Saved/Lost: Lives affected because of your immortal intervention\n" : ""}-History of the civilization (one sentence per century, most recent century gets a paragraph, second most recent century gets two sentences).\n\n${civilization.altruismStats ? 'IMPORTANT: Make sure to include the "Lives Saved/Lost: Lives affected because of your immortal intervention" section with actual numbers based on the simulation results.' : ""}\nThe final summary should be about 5 pages in length, potentially much shorter than the previous summary.`,
              },
            ];

            console.log(
              "DEBUG: civilization.altruismStats =",
              civilization.altruismStats,
            );
            const systemPrompt = buildSystemPrompt(civilization);
            // Use the cheap model from the SAME provider as the simulator —
            // the old hardcoded Haiku call required an Anthropic key even for
            // OpenAI-configured games
            const summaryModelType = getCheapModelType(simulatorModelType);

            {
              // Generate summary with retry logic for token limit hits
              console.log("\n=== SUMMARY GENERATION REQUEST (routes.ts) ===");
              console.log("System prompt:", systemPrompt);
              console.log(
                "\nMessages:",
                JSON.stringify(summaryMessages, null, 2),
              );
              console.log("\nModel:", summaryModelType);
              console.log("Max tokens:", 10000);

              let summaryResult = await completeText(summaryModelType, {
                system: systemPrompt,
                messages: summaryMessages,
                maxTokens: 10000,
              });

              console.log("\n=== SUMMARY GENERATION RESPONSE (routes.ts) ===");
              console.log("Hit token limit:", summaryResult.hitTokenLimit);

              // Check if we hit the token limit
              if (summaryResult.hitTokenLimit) {
                console.log(
                  "[SUMMARY TOKEN LIMIT HIT - RETRYING WITH CONCISENESS INSTRUCTION]",
                );

                const partialText = summaryResult.text;

                // Get the previous turn's summary for context
                const previousSummaries = allMessages.filter(
                  (msg) => msg.messageType === "civilization_summary",
                );
                const previousSummary =
                  previousSummaries.length > 0
                    ? previousSummaries[previousSummaries.length - 1].content
                    : "";

                // Retry with conciseness instruction
                const concisePrompt = `The previous summary generation hit the token limit and was incomplete. Here is the context:

Previous Turn Summary:
${previousSummary}

Partial Incomplete Summary (from current attempt):
${partialText}

Original Simulation Content:
${fullText}

----
Please generate a summary following the EXACT structure and format of the partial summary provided, including:
- All section headers (Personal Character Details, Technologies Unlocked, Nation Statistics with all subsections, Global Settings, Lives Saved/Lost, History of the Civilization)
- All data categories within each section
- Comprehensive technology lists organized by category
- Full population and production statistics
- Full historical narrative for each century
- Summary of newest century from the original simulation content

BUT significantly reduce length by:
- Combining related technologies into single entries with brief descriptions (e.g., a single "Bessemer steel production (3,360,000 lbs/year, 57x increase from prior methods)" rather than all of the prerequisite steel technologies)
- Turning histories older than 5 turns into single-sentence brief descriptions (e.g. "Character established proto-civilization and medical practices after struggling in the wilderness.") while keeping the timestamp header.
- Keeping most recent historical narrative detailed but removing anecdotal details about specific people/dates where possible
- Consolidating similar infrastructure entries
- Using bullet points more aggressively within narrative sections
- Keeping numerical data but removing redundant explanations

Maintain the professional tone, complete data accuracy, and organizational structure of the original while achieving approximately 50% of original length. The summary must be less than two pages in length. Stop immediately after detailing the last historical period.`;

                console.log(
                  "\n=== CONCISE SUMMARY GENERATION REQUEST (routes.ts) ===",
                );
                console.log("System prompt:", systemPrompt);
                console.log("\nConcise prompt:", concisePrompt);
                console.log("\nModel:", summaryModelType);
                console.log("Max tokens:", 10000);

                summaryResult = await completeText(summaryModelType, {
                  system: systemPrompt,
                  messages: [
                    ...summaryMessages.slice(0, -1), // Keep all but the last message
                    { role: "user" as const, content: concisePrompt },
                  ],
                  maxTokens: 10000,
                });

                console.log(
                  "\n=== CONCISE SUMMARY GENERATION RESPONSE (routes.ts) ===",
                );
                console.log("Original partial length:", partialText.length);
              }

              const summary = summaryResult.text || "No summary available.";

              console.log("\n=== FINAL SUMMARY OUTPUT (routes.ts) ===");
              console.log("Summary length:", summary.length);
              console.log("Summary content:", summary);
              console.log("=== END SUMMARY ===\n");

              await storage.createMessage({
                civilizationId,
                role: "assistant",
                content: summary,
                messageType: "civilization_summary",
              });

              res.write(`data: ${JSON.stringify({ summary })}\n\n`);

              // Generate enemy civilization ONLY if a catastrophe occurred
              if (
                catastropheTriggered &&
                civilization.enemyCivilization === "yes"
              ) {
                console.log(
                  "[COMPARABLE ENEMY GENERATION - POST CATASTROPHE]",
                  {
                    civilizationId,
                    civilizationName: civilization.name,
                    currentCentury: civilization.currentCentury,
                    catastropheOccurred: true,
                  },
                );

                const enemyResult = await generateComparableEnemyCivilization(
                  civilization,
                  fullText, // Use simulation text instead of summary
                  getCheapModelType(simulatorModelType),
                );

                if (enemyResult) {
                  await storage.updateCivilization(civilizationId, userId, {
                    enemyTechAdvancements: enemyResult.description,
                    civilizationStrengthPercentile: enemyResult.percentile,
                  });

                  console.log("[COMPARABLE ENEMY GENERATION COMPLETE]", {
                    civilizationId,
                    civilizationName: civilization.name,
                    enemyDescriptionLength: enemyResult.description.length,
                    strengthPercentile: enemyResult.percentile,
                    willBeUsedForNextCatastrophe: true,
                  });

                  // Send strength percentile to client
                  res.write(
                    `data: ${JSON.stringify({ strengthPercentile: enemyResult.percentile })}\n\n`,
                  );
                }
              }
            }
          }

          res.write(
            `data: ${JSON.stringify({ catastrophe: catastropheTriggered })}\n\n`,
          );
          res.write("data: [DONE]\n\n");
          res.end();
          return;
        }

        // Fallback for non-streaming responses (shouldn't happen anymore)
        res.json({
          userMessage: {
            content,
            role: "user",
            messageType: discussionMode ? "user_discussion" : messageType,
            randomNumber: randomNumber,
            catastrophe: catastropheTriggered,
          },
          assistantMessages: [],
          catastrophe: catastropheTriggered,
        });
      } catch (error: any) {
        log(`Error sending message: ${error.message}`);
        sendStreamError(res, error);
      }
    },
  );

  // (A second, duplicate DELETE /messages/clear route used to live here —
  // Express only ever dispatched to the first registration above.)

  // Proceed to next century
  app.post(
    "/api/civilizations/:id/next-century",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const civilizationId = req.params.id;
        const userId = req.user.claims.sub;

        // Verify civilization ownership
        const civilization = await storage.getCivilization(
          civilizationId,
          userId,
        );
        if (!civilization) {
          return res.status(404).send("Civilization not found");
        }

        // Update to next century first
        const newCentury = calculateNextCentury(civilization);
        await storage.updateCivilization(civilizationId, userId, {
          currentCentury: newCentury,
        });

        // Clear chat messages but keep summaries for context
        await storage.clearChatMessages(civilizationId);

        res.json({ success: true, newCentury });
      } catch (error: any) {
        log(`Error proceeding to next century: ${error.message}`);
        res.status(500).send(error.message);
      }
    },
  );

  // Reset entire turn
  app.post(
    "/api/civilizations/:id/reset-turn",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const civilizationId = req.params.id;
        const userId = req.user.claims.sub;

        // Verify civilization ownership
        const civilization = await storage.getCivilization(
          civilizationId,
          userId,
        );
        if (!civilization) {
          return res.status(404).send("Civilization not found");
        }

        // Get all messages (Player A's timeline only — competitive Player B
        // state is managed by its own endpoints)
        const allMessages = await storage.getMessages(civilizationId);
        const isPlayerB = (msg: { playerRole?: string | null; messageType?: string | null }) =>
          msg.playerRole === "player_b" ||
          (msg.messageType || "").startsWith("player_b");
        const isChat = (msg: any) =>
          !isPlayerB(msg) && msg.messageType !== "civilization_summary";

        const summaryEntries = allMessages
          .map((msg, index) => ({ msg, index }))
          .filter(
            ({ msg }) =>
              msg.messageType === "civilization_summary" && !isPlayerB(msg),
          );
        const lastSummaryIndex =
          summaryEntries.length > 0
            ? summaryEntries[summaryEntries.length - 1].index
            : -1;

        // Three states to distinguish (the old code always deleted from the
        // last summary and always decremented the century, which desynced the
        // timeline because the century only advances on "next century"):
        //  1. Mid-turn, no summary yet (goals/questions after last summary)
        //     -> delete the in-progress messages, keep summary, keep century
        //  2. Turn just completed (summary generated, century NOT advanced)
        //     -> delete the turn's messages + its summary, keep century
        //  3. After "next century" (chat cleared, only summaries remain)
        //     -> delete the last summary AND revert the century
        const chatAfterLastSummary = allMessages
          .slice(lastSummaryIndex + 1)
          .filter(isChat);

        let messagesToDelete: typeof allMessages = [];
        let revertCentury = false;

        if (chatAfterLastSummary.length > 0) {
          // State 1: in-progress turn without a summary yet
          messagesToDelete = chatAfterLastSummary;
        } else if (lastSummaryIndex !== -1) {
          const prevSummaryIndex =
            summaryEntries.length >= 2
              ? summaryEntries[summaryEntries.length - 2].index
              : -1;
          const turnMessages = allMessages
            .slice(prevSummaryIndex + 1, lastSummaryIndex)
            .filter(isChat);

          if (turnMessages.length > 0) {
            // State 2: completed turn, century not yet advanced
            messagesToDelete = [...turnMessages, allMessages[lastSummaryIndex]];
          } else {
            // State 3: century already advanced (chat was cleared)
            messagesToDelete = [allMessages[lastSummaryIndex]];
            revertCentury = true;
          }
        } else {
          return res.status(400).send("Nothing to reset");
        }

        for (const msg of messagesToDelete) {
          await storage.deleteMessage(msg.id);
        }

        let updatedCivilization: typeof civilization | undefined = civilization;
        if (revertCentury) {
          updatedCivilization = await storage.updateCivilization(
            civilizationId,
            userId,
            {
              currentCentury: calculatePreviousCentury(civilization),
            },
          );
        }

        res.json(updatedCivilization);
      } catch (error: any) {
        log(`Error resetting turn: ${error.message}`);
        res.status(500).send(error.message);
      }
    },
  );

  // Force catastrophe (debug)
  app.post(
    "/api/civilizations/:id/force-catastrophe",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const civilizationId = req.params.id;
        const userId = req.user.claims.sub;

        // Verify civilization ownership
        const civilization = await storage.getCivilization(
          civilizationId,
          userId,
        );
        if (!civilization) {
          return res.status(404).send("Civilization not found");
        }

        // Set a flag to force catastrophe on next turn
        await storage.setForceCatastrophe(civilizationId);

        res.json({ success: true });
      } catch (error: any) {
        log(`Error forcing catastrophe: ${error.message}`);
        res.status(500).send(error.message);
      }
    },
  );

  // Update summary message
  app.patch(
    "/api/civilizations/:civilizationId/messages/:messageId",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const { civilizationId, messageId } = req.params;
        const userId = req.user.claims.sub;
        const { content } = req.body;

        // Verify civilization ownership
        const civilization = await storage.getCivilization(
          civilizationId,
          userId,
        );
        if (!civilization) {
          return res.status(404).send("Civilization not found");
        }

        // Update the message — scoped to this civilization so a message id
        // from someone else's game can't be edited through your own civ id
        const updatedMessage = await storage.updateMessage(
          messageId,
          civilizationId,
          content,
        );

        res.json(updatedMessage);
      } catch (error: any) {
        log(`Error updating message: ${error.message}`);
        res.status(500).send(error.message);
      }
    },
  );

  // Battle simulation
  app.post(
    "/api/civilizations/:id/battle",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const civilizationId = req.params.id;
        const userId = req.user.claims.sub;
        // enemyBattleCode is set when the enemy was loaded via a friend's
        // world code — the battle result is then shared to that civilization
        const { battleType, userSummary, enemySummary, enemyBattleCode } = req.body;

        console.log('[BATTLE MODE API] Battle request received', {
          civilizationId,
          battleType,
          userSummaryLength: userSummary?.length,
          enemySummaryLength: enemySummary?.length,
          enemyBattleCode: enemyBattleCode || null,
        });

        // Verify civilization ownership
        const civilization = await storage.getCivilization(
          civilizationId,
          userId,
        );
        if (!civilization) {
          console.log('[BATTLE MODE API] Civilization not found');
          return res.status(404).send("Civilization not found");
        }

        // Generate conflict description based on battle type
        let conflictDescription = "";
        if (battleType === "Trade War/Economic Competition/Diplomatic Push") {
          conflictDescription = `Trade War: The two civilizations will begin an economic competition. This can result in varying economic outputs from previous centuries, internal turmoil, and in extreme cases, oppression, slavery, and morale collapse. Both civilizations will survive the century in name but may gain or lose status, population, technology, and morale. At the end of the century the two powers will diverge and go their separate ways, but the effects will remain.

Balanced example: US and China competing on computer chips, dispute over Taiwan, work capacity, tariffs, protests, status changes.
Imbalanced example: British colonization of India, etc. resulting in exploitation, long-term crippling effects and humiliation for India, and extreme economic surplus, technology, and confidence for Britain.`;
        } else if (battleType === "Limited War") {
          conflictDescription = `Limited War: A temporary war will break out. This will reflect wars in history and can result in varying economic outputs, surrender concessions, technological changes, population changes, morale, and status. Both civilizations will survive the century in name but may significantly gain or lose status, population, technology, or morale. At the end of the century the two powers will diverge and go their separate ways, but the effects will remain.

Balanced example: The Hundred Years War between France and England. England lost nearly all French territories, suffered economic strain and political chaos leading to instability later, but developed combined arms tactics, stronger national identity and parliamentary power. France lost significant population but essentially won, gaining status, better national army, more territory, tax system, and artillery.

Imbalanced example: Gulf War. US coalition obliterated Iraqi force. Iraq lost oil, population, infrastructure, morale, and status, while US gained oil, status, and long-term dominance in the region.`;
        } else if (battleType === "Extermination War") {
          conflictDescription = `Extermination War: An extermination war will break out, where neither side will submit no matter the casualties or damage. This will result in the destruction of one civilization and the survival or even ascendancy of another.

Balanced example: Axis powers vs Allied powers in WW2. By the end of the war, the Axis governments were completely dismantled and their leaders were executed. Allied powers flourished in the aftermath and new governments took the place of the old, now part of the Allied order.

Imbalanced Example: Anglo-Zulu War. Despite early defeats, the English completely annexed Zululand using modern rifles and artillery vs spears and shields. The Zulu kingdom was destroyed and never returned.`;
        }

        // Generate battle simulation prompt
        const battlePrompt = `You are simulating a conflict between two rival powers. They may originate from different times, different locations, and have differing levels of technology, but imagine that they are merged into a hybrid world. (If this other nation was originally far away, imagine that it and all it's territory has teleported over.) Both sides become aware of each other, either magically or otherwise, and will engage in conflict for the century. More details of the specific conflict will be present in the message. Your job is to be a realistic simulator of this conflict. Describe the advantages and disadvantages of each civilization, and then stage an accurate and unbiased simulation of what happens between them. You can include small narrative details but the overarching conflict must be extremely accurate and realistic by historical standards. If it is realistic, the conflict can be extremely one-sided.

Conflict Type: ${battleType}

Conflict Description:
${conflictDescription}

Civilization 1:
${userSummary}

Civilization 2:
${enemySummary}

Draw upon historical precedent in your answer.`;

        // Save battle prompt as user message first
        const userBattleMsg = await storage.createMessage({
          civilizationId,
          role: "user",
          content: `[Battle Mode: ${battleType}]\n\n${battlePrompt}`,
          messageType: "user_battle",
        });
        console.log('[BATTLE MODE API] Saved user battle message', {
          messageId: userBattleMsg.id,
          contentLength: userBattleMsg.content.length
        });

        // Set up streaming response
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        // Generate battle response with streaming, honoring the civilization's
        // configured simulator model (was hardcoded to Anthropic Sonnet)
        console.log('[BATTLE MODE API] Starting battle stream');
        const battleStream = await streamText(
          (civilization.simulatorModel || "sonnet") as AIModelType,
          {
            messages: [{ role: "user", content: battlePrompt }],
            maxTokens: 10000,
          },
        );

        let fullText = "";

        // Stream the response to client
        for await (const chunk of battleStream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            fullText += chunk.delta.text;
            res.write(
              `data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`,
            );
          }
        }

        // Save battle simulation as assistant message
        const assistantBattleMsg = await storage.createMessage({
          civilizationId,
          role: "assistant",
          content: fullText,
          messageType: "assistant_battle",
        });
        console.log('[BATTLE MODE API] Saved assistant battle message', {
          messageId: assistantBattleMsg.id,
          contentLength: assistantBattleMsg.content.length,
          simulationPreview: fullText.substring(0, 200)
        });

        // PvP: when the enemy was loaded via a world code, deliver the same
        // battle result to the defender's chat — one simulation serves both
        // players (no second API call), and the defender learns they were
        // attacked. Sharing failures never fail the battle itself.
        if (enemyBattleCode) {
          try {
            const defender = await storage.getCivilizationByBattleCode(
              String(enemyBattleCode).trim(),
            );
            if (defender && defender.id !== civilizationId) {
              await storage.createMessage({
                civilizationId: defender.id,
                role: "user",
                content: `[Battle Mode: ${battleType}]\n\n[${civilization.name}, led by ${civilization.userName}, used your world code to battle your civilization. The conflict below was simulated from both civilizations' summaries.]`,
                messageType: "user_battle",
              });
              await storage.createMessage({
                civilizationId: defender.id,
                role: "assistant",
                content: fullText,
                messageType: "assistant_battle",
              });
              console.log('[BATTLE MODE API] Result shared with defender', {
                defenderCiv: defender.name,
              });
              res.write(
                `data: ${JSON.stringify({ sharedWith: defender.name })}\n\n`,
              );
            }
          } catch (shareError: any) {
            console.error(
              "[BATTLE MODE API] Failed to share battle with defender:",
              shareError?.stack || String(shareError),
            );
          }
        }

        console.log('[BATTLE MODE API] Battle simulation complete');
        res.write("data: [DONE]\n\n");
        res.end();
      } catch (error: any) {
        log(`Error simulating battle: ${error.message}`);
        sendStreamError(res, error);
      }
    },
  );

  // ============================================
  // BATTLE CODE ENDPOINTS (PvP battles)
  // ============================================

  // Get (or lazily generate) this civilization's shareable 5-digit battle code
  app.post(
    "/api/civilizations/:id/battle-code",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const civilizationId = req.params.id;
        const userId = req.user.claims.sub;

        const civilization = await storage.getCivilization(civilizationId, userId);
        if (!civilization) {
          return res.status(404).json({ message: "Civilization not found" });
        }

        if (civilization.battleCode) {
          return res.json({ battleCode: civilization.battleCode });
        }

        // Allocate a unique 5-digit code (90k possibilities; retry on the
        // off-chance of a collision)
        let code: string | null = null;
        for (let attempt = 0; attempt < 20; attempt++) {
          const candidate = String(Math.floor(Math.random() * 90000) + 10000);
          const existing = await storage.getCivilizationByBattleCode(candidate);
          if (!existing) {
            code = candidate;
            break;
          }
        }
        if (!code) {
          return res.status(500).json({ message: "Could not allocate a battle code — please try again" });
        }

        await storage.updateCivilization(civilizationId, userId, {
          battleCode: code,
        } as any);

        res.json({ battleCode: code });
      } catch (error: any) {
        console.error("Error generating battle code:", error?.stack || String(error));
        res.status(500).json({ message: "Failed to generate battle code" });
      }
    },
  );

  // Look up another player's civilization by battle code. Returns only the
  // public battle-relevant info (name, leader, location, era, latest summary)
  // — never settings, prompts, or ids.
  app.get(
    "/api/battle-code/:code",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const code = String(req.params.code || "").trim();
        if (!/^\d{5}$/.test(code)) {
          return res.status(400).json({ message: "Battle codes are 5 digits" });
        }

        const civilization = await storage.getCivilizationByBattleCode(code);
        if (!civilization) {
          return res.status(404).json({ message: "No civilization found for that code" });
        }

        const allMessages = await storage.getMessages(civilization.id);
        const summaries = allMessages.filter(
          (msg) =>
            msg.messageType === "civilization_summary" &&
            msg.playerRole !== "player_b",
        );
        const latestSummary =
          summaries.length > 0 ? summaries[summaries.length - 1].content : null;

        res.json({
          civilizationName: civilization.name,
          leaderName: civilization.userName,
          location: civilization.location,
          currentCentury: civilization.currentCentury,
          summary:
            latestSummary ||
            `${civilization.name}, a young civilization in ${civilization.location} at ${formatCentury(civilization.currentCentury)}. No recorded history yet — they have only just arrived.`,
        });
      } catch (error: any) {
        console.error("Error looking up battle code:", error?.stack || String(error));
        res.status(500).json({ message: "Failed to look up battle code" });
      }
    },
  );

  // ============================================
  // COMPETITIVE MODE ENDPOINTS
  // ============================================

  // Start competitive mode
  app.post(
    "/api/civilizations/:id/competitive/start",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const civilizationId = req.params.id;
        const userId = req.user.claims.sub;
        const { mode, totalTurns, autoPlay, playerBName, playerBCivilizationName, playerBLocation } = req.body;

        // Verify civilization ownership
        const civilization = await storage.getCivilization(civilizationId, userId);
        if (!civilization) {
          return res.status(404).json({ message: "Civilization not found" });
        }

        // Validate mode
        if (!mode || !["human_vs_ai", "ai_vs_ai"].includes(mode)) {
          return res.status(400).json({ message: "Invalid mode. Must be 'human_vs_ai' or 'ai_vs_ai'" });
        }

        console.log("[COMPETITIVE] Starting competitive mode", {
          civilizationId,
          mode,
          totalTurns,
          autoPlay
        });

        // Get the latest summary to determine the current state
        const allMessages = await storage.getMessages(civilizationId);
        const summaries = allMessages.filter(msg => msg.messageType === "civilization_summary");
        const latestSummary = summaries.length > 0 ? summaries[summaries.length - 1].content : undefined;

        // Generate Player B's starting civilization if not provided
        let playerBDesc = playerBName;
        let playerBCivName = playerBCivilizationName;
        let playerBLoc = playerBLocation;
        let playerBInitialSummary: string | null = null;
        let playerBPercentile: number | null = null;

        if (!playerBCivName || !playerBLoc) {
          // Use generateComparableEnemyCivilization to create a balanced
          // opponent. The result is actually used now: the generated
          // description becomes Player B's starting state and the percentile
          // is stored (previously this paid API call was discarded entirely).
          const playerBModelType = (civilization.playerBModel || "haiku") as AIModelType;
          const enemyResult = await generateComparableEnemyCivilization(
            civilization,
            latestSummary || `A civilization starting in ${civilization.location} at ${formatCentury(civilization.currentCentury)}`,
            getCheapModelType(playerBModelType),
          );

          playerBDesc = playerBName || "AI Opponent";
          playerBCivName = playerBCivilizationName || `Rival ${civilization.name}`;
          playerBLoc = playerBLocation || civilization.location;
          playerBInitialSummary = enemyResult.description;
          playerBPercentile = enemyResult.percentile;

          console.log("[COMPETITIVE] Generated opponent civilization", {
            percentile: enemyResult.percentile,
            descriptionLength: enemyResult.description.length
          });
        }

        // Remove Player B messages from any previous competitive run so the
        // new opponent doesn't inherit a dead game's history
        await storage.clearPlayerBMessages(civilizationId);

        // Initialize competitive mode fields
        const updatedCivilization = await storage.updateCivilization(civilizationId, userId, {
          competitiveMode: mode,
          playerBName: playerBDesc,
          playerBCivilizationName: playerBCivName,
          playerBLocation: playerBLoc,
          playerBCurrentCentury: civilization.currentCentury,
          playerBSummary: playerBInitialSummary,
          playerBStrengthPercentile: playerBPercentile,
          competitiveTurnCount: 0,
          competitiveTotalTurns: totalTurns || 10,
          competitiveAutoPlay: autoPlay || false,
        } as any);

        console.log("[COMPETITIVE] Competitive mode initialized", {
          mode,
          playerB: playerBCivName,
          totalTurns: totalTurns || 10
        });

        res.json(updatedCivilization);
      } catch (error: any) {
        console.error("[COMPETITIVE] Error starting competitive mode:", error);
        res.status(500).json({ message: "Failed to start competitive mode" });
      }
    }
  );

  // Get competitive status
  app.get(
    "/api/civilizations/:id/competitive/status",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const civilizationId = req.params.id;
        const userId = req.user.claims.sub;

        const civilization = await storage.getCivilization(civilizationId, userId);
        if (!civilization) {
          return res.status(404).json({ message: "Civilization not found" });
        }

        if (!civilization.competitiveMode) {
          return res.status(400).json({ message: "Civilization is not in competitive mode" });
        }

        // Get summaries for both players
        const allMessages = await storage.getMessages(civilizationId);
        const playerASummaries = allMessages.filter(
          msg => msg.messageType === "civilization_summary" && msg.playerRole !== "player_b"
        );
        const playerBSummaries = allMessages.filter(
          msg => msg.messageType === "player_b_summary" || (msg.messageType === "civilization_summary" && msg.playerRole === "player_b")
        );

        res.json({
          mode: civilization.competitiveMode,
          turnCount: civilization.competitiveTurnCount,
          totalTurns: civilization.competitiveTotalTurns,
          autoPlay: civilization.competitiveAutoPlay,
          playerA: {
            name: civilization.userName,
            civilizationName: civilization.name,
            location: civilization.location,
            currentCentury: civilization.currentCentury,
            strengthPercentile: civilization.civilizationStrengthPercentile,
            latestSummary: playerASummaries.length > 0 ? playerASummaries[playerASummaries.length - 1].content : null,
          },
          playerB: {
            name: civilization.playerBName,
            civilizationName: civilization.playerBCivilizationName,
            location: civilization.playerBLocation,
            currentCentury: civilization.playerBCurrentCentury,
            strengthPercentile: civilization.playerBStrengthPercentile,
            latestSummary: civilization.playerBSummary || (playerBSummaries.length > 0 ? playerBSummaries[playerBSummaries.length - 1].content : null),
          },
        });
      } catch (error: any) {
        console.error("[COMPETITIVE] Error getting status:", error);
        res.status(500).json({ message: "Failed to get competitive status" });
      }
    }
  );

  // Process AI turn (handles both players in AI vs AI mode - PARALLEL execution)
  app.post(
    "/api/civilizations/:id/competitive/ai-turn",
    isAuthenticated,
    async (req: any, res) => {
      const civilizationId = req.params.id;
      let acquiredLock = false;
      try {
        const userId = req.user.claims.sub;

        let civilization = await storage.getCivilization(civilizationId, userId);
        if (!civilization) {
          return res.status(404).json({ message: "Civilization not found" });
        }

        if (!civilization.competitiveMode) {
          return res.status(400).json({ message: "Civilization is not in competitive mode" });
        }

        const turnCount = (civilization.competitiveTurnCount || 0) + 1;
        const totalTurns = civilization.competitiveTotalTurns || 10;
        if (turnCount > totalTurns) {
          return res.status(400).json({
            message: `All ${totalTurns} turns have been played`,
            code: "TURNS_EXHAUSTED",
          });
        }

        if (activeCompetitiveTurns.has(civilizationId)) {
          return res.status(409).json({ message: "A turn is already being processed for this civilization" });
        }
        activeCompetitiveTurns.add(civilizationId);
        acquiredLock = true;

        const isAIvsAI = civilization.competitiveMode === "ai_vs_ai";

        // Get model preferences
        const playerAModel = (civilization.playerAModel || "haiku") as AIModelType;
        const playerBModel = (civilization.playerBModel || "haiku") as AIModelType;

        console.log("[COMPETITIVE AI] Starting AI turn", {
          civilizationId,
          turnCount: civilization.competitiveTurnCount,
          mode: civilization.competitiveMode,
          playerAModel,
          playerBModel
        });

        // Get player summaries
        const allMessages = await storage.getMessages(civilizationId);
        const playerASummaries = allMessages.filter(
          msg => msg.messageType === "civilization_summary" && msg.playerRole !== "player_b"
        );
        const playerASummary = playerASummaries.length > 0
          ? playerASummaries[playerASummaries.length - 1].content
          : "Starting civilization with basic resources.";

        const playerBSummary = civilization.playerBSummary || "Starting civilization with basic resources.";

        // Enforce turn order in human-vs-AI: the AI plays once per round,
        // after the human. Without this, repeatedly clicking "Run AI Turn"
        // costs real API money and advances Player B while the human stands
        // still. next-century clears non-summary chat, so "this round" is
        // the current chat window. (ai_vs_ai runs both players server-side
        // and is already guarded by the turn cap + concurrency lock.)
        if (!isAIvsAI) {
          const isPlayerBMsg = (msg: { playerRole?: string | null; messageType?: string | null }) =>
            msg.playerRole === "player_b" ||
            (msg.messageType || "").startsWith("player_b");
          const humanPlayedThisRound = allMessages.some(
            (msg) => !isPlayerBMsg(msg) && msg.messageType !== "civilization_summary",
          );
          if (!humanPlayedThisRound) {
            return res.status(400).json({
              message: "Play your turn first — the AI responds after you.",
              code: "HUMAN_TURN_REQUIRED",
            });
          }
          const aiPlayedThisRound = allMessages.some(
            (msg) => msg.messageType === "player_b_goals",
          );
          if (aiPlayedThisRound) {
            return res.status(400).json({
              message: "The AI has already played this round. Proceed to the next century first.",
              code: "AI_ALREADY_PLAYED",
            });
          }
        }

        // Set up streaming response
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        // Helper to write SSE data; no-ops once the response has ended so a
        // still-draining stream pump can't trigger a write-after-end crash
        // (an unhandled 'error' event that takes down the whole process)
        const sendEvent = (data: any) => {
          if (res.writableEnded) return;
          res.write(`data: ${JSON.stringify(data)}\n\n`);
        };

        // Get turns per round for each player
        const playerATurnsPerRound = civilization.playerATurnsPerRound || 1;
        const playerBTurnsPerRound = civilization.playerBTurnsPerRound || 1;

        if (isAIvsAI) {
          // ===== AI VS AI MODE: RUN BOTH PLAYERS WITH TURN MULTIPLIER =====
          console.log("[COMPETITIVE AI] AI vs AI mode - Running both players", {
            playerATurnsPerRound,
            playerBTurnsPerRound
          });

          // Track current state for each player during sub-turns
          let currentPlayerASummary = playerASummary;
          let currentPlayerBSummary = playerBSummary;
          let currentPlayerACentury = civilization.currentCentury;
          let currentPlayerBCentury = civilization.playerBCurrentCentury ?? civilization.currentCentury;

          // Run all sub-turns for each player
          const maxSubTurns = Math.max(playerATurnsPerRound, playerBTurnsPerRound);

          for (let subTurn = 1; subTurn <= maxSubTurns; subTurn++) {
            const runPlayerA = subTurn <= playerATurnsPerRound;
            const runPlayerB = subTurn <= playerBTurnsPerRound;

            console.log(`[COMPETITIVE AI] Running sub-turn ${subTurn}/${maxSubTurns}`, { runPlayerA, runPlayerB });
            sendEvent({ type: "subTurnStart", subTurn, maxSubTurns, runPlayerA, runPlayerB });

            // Generate goals for players that are still running this sub-turn
            const goalPromises: Promise<string>[] = [];
            if (runPlayerA) {
              goalPromises.push(
                generateAIPlayerGoals(
                  {
                    // playerB* fields describe the player being simulated:
                    // remap them to Player A's identity and custom prompt so
                    // Player A doesn't play under Player B's persona
                    ...civilization,
                    currentCentury: currentPlayerACentury,
                    playerBName: civilization.userName,
                    playerBCivilizationName: civilization.name,
                    playerBLocation: civilization.location,
                    playerBCustomPrompt: civilization.playerACustomPrompt,
                  } as any,
                  currentPlayerBSummary,
                  currentPlayerASummary,
                  turnCount,
                  totalTurns,
                  playerAModel
                )
              );
            }
            if (runPlayerB) {
              goalPromises.push(
                generateAIPlayerGoals(
                  { ...civilization, currentCentury: currentPlayerBCentury } as any,
                  currentPlayerASummary,
                  currentPlayerBSummary,
                  turnCount,
                  totalTurns,
                  playerBModel
                )
              );
            }

            const goals = await Promise.all(goalPromises);
            let goalIndex = 0;
            const playerAGoals = runPlayerA ? goals[goalIndex++] : "";
            const playerBGoals = runPlayerB ? goals[goalIndex++] : "";

            // Save and send goals
            if (runPlayerA) {
              await storage.createMessage({
                civilizationId,
                role: "user",
                content: playerAGoals,
                messageType: "user_goals",
                playerRole: "player_a",
              });
              sendEvent({ player: "player_a", type: "goals", content: playerAGoals, subTurn });
            }
            if (runPlayerB) {
              await storage.createMessage({
                civilizationId,
                role: "user",
                content: playerBGoals,
                messageType: "player_b_goals",
                playerRole: "player_b",
              });
              sendEvent({ player: "player_b", type: "goals", content: playerBGoals, subTurn });
            }

            // Generate random numbers
            const playerARandomNumber = runPlayerA ? generateRandomNumber(civilization) : null;
            const playerBRandomNumber = runPlayerB ? generateRandomNumber(civilization) : null;

            // Run simulations
            const simPromises: Promise<any>[] = [];
            if (runPlayerA) {
              simPromises.push(
                simulateAIPlayerTurn(
                  {
                    ...civilization,
                    currentCentury: currentPlayerACentury,
                    playerBName: civilization.userName,
                    playerBCivilizationName: civilization.name,
                    playerBLocation: civilization.location,
                    playerBSummary: currentPlayerBSummary,
                    playerBCustomPrompt: civilization.playerACustomPrompt,
                  } as any,
                  playerAGoals,
                  currentPlayerASummary,
                  currentPlayerBSummary,
                  turnCount,
                  totalTurns,
                  playerAModel,
                  playerARandomNumber
                )
              );
            }
            if (runPlayerB) {
              simPromises.push(
                simulateAIPlayerTurn(
                  { ...civilization, currentCentury: currentPlayerBCentury } as any,
                  playerBGoals,
                  currentPlayerBSummary,
                  currentPlayerASummary,
                  turnCount,
                  totalTurns,
                  playerBModel,
                  playerBRandomNumber
                )
              );
            }

            const simResults = await Promise.all(simPromises);
            let simIndex = 0;
            const playerASimResult = runPlayerA ? simResults[simIndex++] : null;
            const playerBSimResult = runPlayerB ? simResults[simIndex++] : null;

            // Drain both streams concurrently with independent pumps. The old
            // Promise.race loop abandoned the losing iterator's in-flight
            // next() promise on every iteration, silently dropping that
            // player's chunks — Player B's entire simulation could vanish
            // while the round still reported turnComplete.
            let playerAFullText = "";
            let playerBFullText = "";

            const pumpStream = async (
              player: "player_a" | "player_b",
              stream: AsyncIterable<any> | undefined,
              append: (text: string) => void,
            ): Promise<void> => {
              if (!stream) return;
              for await (const chunk of stream) {
                if (
                  chunk.type === "content_block_delta" &&
                  chunk.delta.type === "text_delta"
                ) {
                  append(chunk.delta.text);
                  sendEvent({ player, type: "simulation", text: chunk.delta.text, subTurn });
                }
              }
            };

            // allSettled: one player's stream failing must not abort the
            // round (and abandon the other pump mid-write). A failed player's
            // partial text is discarded — persisting a truncated simulation
            // as real state would silently corrupt that civilization.
            const [pumpA, pumpB] = await Promise.allSettled([
              pumpStream("player_a", playerASimResult?.stream, (t) => {
                playerAFullText += t;
              }),
              pumpStream("player_b", playerBSimResult?.stream, (t) => {
                playerBFullText += t;
              }),
            ]);
            if (pumpA.status === "rejected") {
              console.error("[COMPETITIVE AI] Player A stream failed:", pumpA.reason);
              playerAFullText = "";
              sendEvent({
                player: "player_a",
                type: "error",
                message: "Player A's simulation stream failed — their turn was skipped this round.",
              });
            }
            if (pumpB.status === "rejected") {
              console.error("[COMPETITIVE AI] Player B stream failed:", pumpB.reason);
              playerBFullText = "";
              sendEvent({
                player: "player_b",
                type: "error",
                message: "Player B's simulation stream failed — their turn was skipped this round.",
              });
            }

            // Generate summaries
            const summaryPromises: Promise<string>[] = [];
            if (runPlayerA && playerAFullText) {
              summaryPromises.push(
                generateAIPlayerSummary(
                  { ...civilization, currentCentury: currentPlayerACentury } as any,
                  playerAFullText,
                  currentPlayerASummary,
                  playerAModel
                )
              );
            }
            if (runPlayerB && playerBFullText) {
              summaryPromises.push(
                generateAIPlayerSummary(
                  { ...civilization, currentCentury: currentPlayerBCentury } as any,
                  playerBFullText,
                  currentPlayerBSummary,
                  playerBModel
                )
              );
            }

            const summaries = await Promise.all(summaryPromises);
            let summaryIndex = 0;

            // Calculate new centuries and update state
            if (runPlayerA && playerAFullText) {
              const newPlayerASummary = summaries[summaryIndex++];
              currentPlayerACentury = calculateNextCentury({ ...civilization, currentCentury: currentPlayerACentury });
              currentPlayerASummary = newPlayerASummary;

              await storage.createMessage({
                civilizationId,
                role: "assistant",
                content: playerAFullText,
                messageType: "simulation_result",
                playerRole: "player_a",
              });
              await storage.createMessage({
                civilizationId,
                role: "assistant",
                content: newPlayerASummary,
                messageType: "civilization_summary",
                playerRole: "player_a",
              });

              sendEvent({ player: "player_a", type: "summary", content: newPlayerASummary, subTurn });
              sendEvent({ player: "player_a", type: "subTurnComplete", subTurn, newCentury: currentPlayerACentury });
            }

            if (runPlayerB && playerBFullText) {
              const newPlayerBSummary = summaries[summaryIndex++];
              currentPlayerBCentury = calculateNextCentury({ ...civilization, currentCentury: currentPlayerBCentury });
              currentPlayerBSummary = newPlayerBSummary;

              await storage.createMessage({
                civilizationId,
                role: "assistant",
                content: playerBFullText,
                messageType: "player_b_simulation",
                playerRole: "player_b",
              });
              await storage.createMessage({
                civilizationId,
                role: "assistant",
                content: newPlayerBSummary,
                messageType: "player_b_summary",
                playerRole: "player_b",
              });

              sendEvent({ player: "player_b", type: "summary", content: newPlayerBSummary, subTurn });
              sendEvent({ player: "player_b", type: "subTurnComplete", subTurn, newCentury: currentPlayerBCentury });
            }

            // Persist progress after each sub-turn so a mid-round failure
            // doesn't leave saved messages pointing at stale player state
            await storage.updateCivilization(civilizationId, userId, {
              currentCentury: currentPlayerACentury,
              playerBCurrentCentury: currentPlayerBCentury,
              playerBSummary: currentPlayerBSummary,
            } as any);
          }

          // Final update to civilization state (turn counter increments only
          // once the whole round completed)
          await storage.updateCivilization(civilizationId, userId, {
            currentCentury: currentPlayerACentury,
            playerBCurrentCentury: currentPlayerBCentury,
            playerBSummary: currentPlayerBSummary,
            competitiveTurnCount: turnCount,
          } as any);

          // Send final completion events
          sendEvent({ player: "player_a", type: "turnComplete", newCentury: currentPlayerACentury });
          sendEvent({ player: "player_b", type: "turnComplete", turnCount, newCentury: currentPlayerBCentury });

        } else {
          // ===== HUMAN VS AI MODE: Only run Player B with turn multiplier =====
          console.log("[COMPETITIVE AI] Human vs AI mode - Running Player B turn only", {
            playerBTurnsPerRound
          });

          // Track current state for Player B during sub-turns
          let currentPlayerBSummary = playerBSummary;
          let currentPlayerBCentury = civilization.playerBCurrentCentury ?? civilization.currentCentury;

          for (let subTurn = 1; subTurn <= playerBTurnsPerRound; subTurn++) {
            console.log(`[COMPETITIVE AI] Running Player B sub-turn ${subTurn}/${playerBTurnsPerRound}`);
            if (playerBTurnsPerRound > 1) {
              sendEvent({ type: "subTurnStart", subTurn, maxSubTurns: playerBTurnsPerRound, runPlayerA: false, runPlayerB: true });
            }

            const aiGoals = await generateAIPlayerGoals(
              { ...civilization, currentCentury: currentPlayerBCentury } as any,
              playerASummary,
              currentPlayerBSummary,
              turnCount,
              totalTurns,
              playerBModel
            );

            await storage.createMessage({
              civilizationId,
              role: "user",
              content: aiGoals,
              messageType: "player_b_goals",
              playerRole: "player_b",
            });

            sendEvent({ player: "player_b", type: "goals", content: aiGoals, subTurn: playerBTurnsPerRound > 1 ? subTurn : undefined });

            // Generate random number for Player B based on civilization settings
            const playerBRandomNumber = generateRandomNumber(civilization);
            console.log(`[COMPETITIVE AI] Human vs AI mode - Using random number setting: ${civilization.randomNumberEval}`, {
              playerBRandomNumber,
              customRandomNumber: civilization.customRandomNumber
            });

            const simResult = await simulateAIPlayerTurn(
              { ...civilization, currentCentury: currentPlayerBCentury } as any,
              aiGoals,
              currentPlayerBSummary,
              playerASummary,
              turnCount,
              totalTurns,
              playerBModel,
              playerBRandomNumber
            );

            if (simResult.stream) {
              let fullText = "";

              for await (const chunk of simResult.stream) {
                if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
                  fullText += chunk.delta.text;
                  sendEvent({ player: "player_b", type: "simulation", text: chunk.delta.text, subTurn: playerBTurnsPerRound > 1 ? subTurn : undefined });
                }
              }

              await storage.createMessage({
                civilizationId,
                role: "assistant",
                content: fullText,
                messageType: "player_b_simulation",
                playerRole: "player_b",
              });

              const newSummary = await generateAIPlayerSummary(
                { ...civilization, currentCentury: currentPlayerBCentury } as any,
                fullText,
                currentPlayerBSummary,
                playerBModel
              );

              // Calculate new century for Player B
              currentPlayerBCentury = calculateNextCentury({
                ...civilization,
                currentCentury: currentPlayerBCentury
              });
              currentPlayerBSummary = newSummary;

              await storage.createMessage({
                civilizationId,
                role: "assistant",
                content: newSummary,
                messageType: "player_b_summary",
                playerRole: "player_b",
              });

              sendEvent({ player: "player_b", type: "summary", content: newSummary, subTurn: playerBTurnsPerRound > 1 ? subTurn : undefined });

              if (playerBTurnsPerRound > 1) {
                sendEvent({ player: "player_b", type: "subTurnComplete", subTurn, newCentury: currentPlayerBCentury });
              }

              // Persist progress after each sub-turn (see AI vs AI branch)
              await storage.updateCivilization(civilizationId, userId, {
                playerBSummary: currentPlayerBSummary,
                playerBCurrentCentury: currentPlayerBCentury,
              } as any);
            }
          }

          // Final update after all sub-turns complete
          await storage.updateCivilization(civilizationId, userId, {
            playerBSummary: currentPlayerBSummary,
            playerBCurrentCentury: currentPlayerBCentury,
            competitiveTurnCount: turnCount,
          } as any);

          sendEvent({ player: "player_b", type: "turnComplete", turnCount, newCentury: currentPlayerBCentury });
        }

        res.write("data: [DONE]\n\n");
        res.end();
      } catch (error: any) {
        console.error("[COMPETITIVE AI] Error processing AI turn:", error);
        sendStreamError(res, error);
      } finally {
        if (acquiredLock) {
          activeCompetitiveTurns.delete(civilizationId);
        }
      }
    }
  );

  // Trigger "what-if" battle (separate from main simulation)
  app.post(
    "/api/civilizations/:id/competitive/battle",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const civilizationId = req.params.id;
        const userId = req.user.claims.sub;
        const { battleType } = req.body;

        const civilization = await storage.getCivilization(civilizationId, userId);
        if (!civilization) {
          return res.status(404).json({ message: "Civilization not found" });
        }

        if (!civilization.competitiveMode) {
          return res.status(400).json({ message: "Civilization is not in competitive mode" });
        }

        // Validate battle type
        if (!battleType || !["trade_war", "limited_war", "extermination_war"].includes(battleType)) {
          return res.status(400).json({ message: "Invalid battle type" });
        }

        console.log("[COMPETITIVE BATTLE] Starting what-if battle", {
          civilizationId,
          battleType,
          turnCount: civilization.competitiveTurnCount
        });

        // Get both players' summaries
        const allMessages = await storage.getMessages(civilizationId);
        const playerASummaries = allMessages.filter(
          msg => msg.messageType === "civilization_summary" && msg.playerRole !== "player_b"
        );
        const playerASummary = playerASummaries.length > 0
          ? playerASummaries[playerASummaries.length - 1].content
          : "A developing civilization.";

        const playerBSummary = civilization.playerBSummary || "A rival civilization.";

        // Generate battle conflict description
        let conflictDescription = "";
        if (battleType === "trade_war") {
          conflictDescription = `Trade War: Economic competition between the two civilizations. Effects include varying economic outputs, internal turmoil, and status changes. Both survive but may gain or lose significantly.`;
        } else if (battleType === "limited_war") {
          conflictDescription = `Limited War: A temporary war with surrender concessions, technological changes, population changes, and morale effects. Both civilizations survive but may be significantly impacted.`;
        } else if (battleType === "extermination_war") {
          conflictDescription = `Extermination War: Total war where neither side will submit. One civilization will be destroyed while the other survives or ascends.`;
        }

        const battlePrompt = `You are simulating a "what-if" battle scenario between two rival civilizations. This is a hypothetical conflict that does NOT affect the main game state.

Battle Type: ${battleType.replace(/_/g, " ").toUpperCase()}

${conflictDescription}

CIVILIZATION A (${civilization.name}):
${playerASummary}

CIVILIZATION B (${civilization.playerBCivilizationName || "Rival Civilization"}):
${playerBSummary}

Simulate this conflict realistically based on historical precedent. Consider:
- Military strength and technology
- Economic resources
- Population and morale
- Geographical advantages
- Leadership and strategy

Provide:
1. Analysis of each side's advantages and disadvantages
2. How the conflict would likely unfold
3. The probable outcome and winner
4. Long-term consequences for both civilizations

Be realistic and unbiased. The outcome should reflect the actual balance of power between these civilizations.

At the very end of your response, output a final line in exactly this format (no markdown): "WINNER: Civilization A" or "WINNER: Civilization B" or "WINNER: Draw".`;

        // Set up streaming response
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        const battleStream = await streamText(
          (civilization.simulatorModel || "sonnet") as AIModelType,
          {
            messages: [{ role: "user", content: battlePrompt }],
            maxTokens: 8000,
          },
        );

        let fullText = "";

        for await (const chunk of battleStream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            fullText += chunk.delta.text;
            res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
          }
        }

        // Determine winner: prefer the structured WINNER line the prompt now
        // requests; fall back to the old substring heuristics. (The old code
        // matched `" wins"` whenever playerBCivilizationName was empty,
        // crediting Player B for any sentence containing "wins".)
        let winner: string | null = null;
        const winnerMatch = fullText.match(/WINNER:\s*(Civilization A|Civilization B|Draw)/i);
        if (winnerMatch) {
          const w = winnerMatch[1].toLowerCase();
          winner = w === "civilization a" ? "player_a" : w === "civilization b" ? "player_b" : "draw";
        } else {
          const lowerText = fullText.toLowerCase();
          const aName = (civilization.name || "").toLowerCase();
          const bName = (civilization.playerBCivilizationName || "").toLowerCase();
          if (lowerText.includes("civilization a wins") || (aName && lowerText.includes(`${aName} wins`))) {
            winner = "player_a";
          } else if (lowerText.includes("civilization b wins") || (bName && lowerText.includes(`${bName} wins`))) {
            winner = "player_b";
          } else if (lowerText.includes("draw") || lowerText.includes("stalemate")) {
            winner = "draw";
          }
        }

        // Save battle to database (separate from main simulation)
        const battle = await storage.saveBattle({
          civilizationId,
          turnNumber: civilization.competitiveTurnCount || 0,
          playerASummary,
          playerBSummary,
          battleType,
          battleResult: fullText,
          winner,
        });

        res.write(`data: ${JSON.stringify({ battleId: battle.id, winner })}\n\n`);
        res.write("data: [DONE]\n\n");
        res.end();

        console.log("[COMPETITIVE BATTLE] Battle completed", {
          battleId: battle.id,
          winner
        });
      } catch (error: any) {
        console.error("[COMPETITIVE BATTLE] Error simulating battle:", error);
        sendStreamError(res, error);
      }
    }
  );

  // Get battle history
  app.get(
    "/api/civilizations/:id/competitive/battles",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const civilizationId = req.params.id;
        const userId = req.user.claims.sub;

        const civilization = await storage.getCivilization(civilizationId, userId);
        if (!civilization) {
          return res.status(404).json({ message: "Civilization not found" });
        }

        const battles = await storage.getBattles(civilizationId);
        res.json(battles);
      } catch (error: any) {
        console.error("[COMPETITIVE] Error getting battles:", error);
        res.status(500).json({ message: "Failed to get battles" });
      }
    }
  );

  // Delete a battle (undo)
  app.delete(
    "/api/civilizations/:id/competitive/battles/:battleId",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const { id: civilizationId, battleId } = req.params;
        const userId = req.user.claims.sub;

        const civilization = await storage.getCivilization(civilizationId, userId);
        if (!civilization) {
          return res.status(404).json({ message: "Civilization not found" });
        }

        // Verify battle belongs to this civilization
        const battle = await storage.getBattle(battleId);
        if (!battle || battle.civilizationId !== civilizationId) {
          return res.status(404).json({ message: "Battle not found" });
        }

        await storage.deleteBattle(battleId);
        res.status(204).send();
      } catch (error: any) {
        console.error("[COMPETITIVE] Error deleting battle:", error);
        res.status(500).json({ message: "Failed to delete battle" });
      }
    }
  );

  // End competitive mode
  app.post(
    "/api/civilizations/:id/competitive/end",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const civilizationId = req.params.id;
        const userId = req.user.claims.sub;

        const civilization = await storage.getCivilization(civilizationId, userId);
        if (!civilization) {
          return res.status(404).json({ message: "Civilization not found" });
        }

        // Clear competitive mode fields
        const updatedCivilization = await storage.updateCivilization(civilizationId, userId, {
          competitiveMode: null,
          playerBCurrentCentury: null,
          playerBSummary: null,
          playerBStrengthPercentile: null,
          competitiveTurnCount: 0,
          competitiveTotalTurns: 10,
          competitiveAutoPlay: false,
        } as any);

        console.log("[COMPETITIVE] Competitive mode ended for", civilizationId);

        res.json(updatedCivilization);
      } catch (error: any) {
        console.error("[COMPETITIVE] Error ending competitive mode:", error);
        res.status(500).json({ message: "Failed to end competitive mode" });
      }
    }
  );

  const httpServer = createServer(app);
  return httpServer;
}

function calculateNextCentury(civilization: any): number {
  const timescale =
    civilization.timescale === "custom" && civilization.customTimescale
      ? civilization.customTimescale
      : civilization.timescale;

  // Parse the timescale to extract number and unit
  const match = timescale.match(/(\d+)\s*(day|week|month|year)s?/i);

  if (match) {
    const amount = parseInt(match[1]);
    const unit = match[2].toLowerCase();

    switch (unit) {
      case "day":
        return civilization.currentCentury + amount / 365; // days to years conversion
      case "week":
        return civilization.currentCentury + amount / 52.14; // weeks to years
      case "month":
        return civilization.currentCentury + amount / 12; // months to years
      case "year":
        return civilization.currentCentury + amount; // years
    }
  }

  // Fallback to exact string matching for edge cases
  switch (timescale) {
    case "1 day":
      return civilization.currentCentury + 1 / 365;
    case "1 week":
      return civilization.currentCentury + 7 / 365;
    case "1 month":
      return civilization.currentCentury + 30 / 365;
    case "1 year":
      return civilization.currentCentury + 1;
    case "10 years":
      return civilization.currentCentury + 10;
    case "100 years":
      return civilization.currentCentury + 100;
    case "1000 years":
      return civilization.currentCentury + 1000;
    default:
      return civilization.currentCentury + 100;
  }
}

function calculatePreviousCentury(civilization: any): number {
  const timescale =
    civilization.timescale === "custom" && civilization.customTimescale
      ? civilization.customTimescale
      : civilization.timescale;

  // Parse the timescale to extract number and unit
  const match = timescale.match(/(\d+)\s*(day|week|month|year)s?/i);

  if (match) {
    const amount = parseInt(match[1]);
    const unit = match[2].toLowerCase();

    switch (unit) {
      case "day":
        return civilization.currentCentury - amount / 365; // days to years conversion
      case "week":
        return civilization.currentCentury - amount / 52.14; // weeks to years
      case "month":
        return civilization.currentCentury - amount / 12; // months to years
      case "year":
        return civilization.currentCentury - amount; // years
    }
  }

  // Fallback to exact string matching for edge cases
  switch (timescale) {
    case "1 day":
      return civilization.currentCentury - 1 / 365;
    case "1 week":
      return civilization.currentCentury - 7 / 365;
    case "1 month":
      return civilization.currentCentury - 30 / 365;
    case "1 year":
      return civilization.currentCentury - 1;
    case "10 years":
      return civilization.currentCentury - 10;
    case "100 years":
      return civilization.currentCentury - 100;
    case "1000 years":
      return civilization.currentCentury - 1000;
    default:
      return civilization.currentCentury - 100;
  }
}

// Dummy function for log, assuming it exists elsewhere or is defined here.
// In a real scenario, this would be imported or defined.
function log(message: string): void {
  console.log(message);
}

function formatCentury(century: number): string {
  if (century < 0) {
    return `${Math.abs(century)} BCE`;
  }
  return `${century} CE`;
}