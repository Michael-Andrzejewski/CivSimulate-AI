/**
 * Local development authentication bypass
 * This module provides a simple auth system for local development
 * without requiring Replit infrastructure.
 */
import type { Express, RequestHandler } from "express";
import session from "express-session";
import MemoryStore from "memorystore";

const MemoryStoreSession = MemoryStore(session);

// Mock user for local development
const LOCAL_USER = {
  id: "local-dev-user",
  email: "developer@local.dev",
  firstName: "Local",
  lastName: "Developer",
  profileImageUrl: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  // This module auto-authenticates everyone as a shared dev user — it must
  // never run in production. Fail hard rather than silently use the
  // well-known fallback secret on a public deployment.
  if (process.env.NODE_ENV === "production" && !process.env.SESSION_SECRET) {
    throw new Error(
      "localAuth must not be used in production without SESSION_SECRET. " +
        "Set REPLIT_DOMAINS (real auth) or SESSION_SECRET.",
    );
  }
  return session({
    secret: process.env.SESSION_SECRET || "local-dev-secret-key-change-in-production",
    store: new MemoryStoreSession({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Allow non-HTTPS in local dev
      maxAge: sessionTtl,
    },
  });
}

export async function setupAuth(app: Express) {
  app.use(getSession());

  // Auto-login endpoint for local development
  app.get("/api/login", async (req: any, res) => {
    // Ensure user exists in database (import storage dynamically to avoid circular deps)
    try {
      const { storage } = await import("./storage");
      await storage.upsertUser({
        id: LOCAL_USER.id,
        email: LOCAL_USER.email,
        firstName: LOCAL_USER.firstName,
        lastName: LOCAL_USER.lastName,
        profileImageUrl: LOCAL_USER.profileImageUrl,
      });
    } catch (err) {
      console.error("[Local Auth] Error upserting user:", err);
    }

    req.session.user = {
      claims: {
        sub: LOCAL_USER.id,
        email: LOCAL_USER.email,
        first_name: LOCAL_USER.firstName,
        last_name: LOCAL_USER.lastName,
      },
      expires_at: Math.floor(Date.now() / 1000) + 86400 * 7, // 7 days
    };
    req.session.save(() => {
      res.redirect("/");
    });
  });

  app.get("/api/callback", (req, res) => {
    res.redirect("/");
  });

  app.get("/api/logout", (req: any, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  });

  console.log("[Local Auth] Development authentication enabled");
  console.log("[Local Auth] Visit /api/login to auto-authenticate");
}

export const isAuthenticated: RequestHandler = async (req: any, res, next) => {
  if (req.session?.user) {
    // Add user to request for route handlers
    req.user = req.session.user;
    return next();
  }
  return res.status(401).json({ message: "Unauthorized - visit /api/login to authenticate" });
};

export { LOCAL_USER };
