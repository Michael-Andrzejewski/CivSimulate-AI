# Civilization Simulator

## Overview

An LLM-powered strategic civilization simulation game where players guide their civilization through time, from ancient beginnings to the modern era. The application uses Claude AI (Anthropic) to generate dynamic, context-aware events and responses based on user decisions. Players can create up to 5 civilization save files, each with customizable starting conditions including location, time period, and simulation timescale.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type safety
- Vite as the build tool and dev server
- Wouter for lightweight client-side routing
- Single-page application (SPA) pattern

**State Management:**
- TanStack Query (React Query) for server state management and caching
- Custom hooks for authentication state (`useAuth`)
- Form state managed by React Hook Form with Zod validation

**UI Component System:**
- Shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Design system follows "New York" style variant
- Dark mode as default theme with optional light mode toggle
- Strategic command center aesthetic with clean, focused interfaces

**Key Design Decisions:**
- Component-based architecture with reusable UI primitives
- Path aliases (`@/`, `@shared/`) for clean imports
- Separation of concerns: pages, components, hooks, and utilities

### Backend Architecture

**Runtime & Framework:**
- Node.js with Express.js server
- ES modules (type: "module") for modern JavaScript
- TypeScript throughout for type safety

**Authentication:**
- Replit Auth integration using OpenID Connect (OIDC)
- Passport.js for authentication strategy
- Session-based authentication with PostgreSQL session storage
- Mandatory user and session tables for Replit Auth compatibility

**Database Layer:**
- Drizzle ORM for type-safe database operations
- PostgreSQL via Neon serverless database
- Schema-first approach with shared types between frontend and backend
- Three main entity tables: users, civilizations (save files), messages (conversation history)

**AI Integration:**
- Anthropic Claude API for generating civilization events and responses
- Model: claude-sonnet-4-20250514 (latest Sonnet model)
- Conversation history tracking for context-aware responses
- System prompts built from civilization state and user goals

**API Design:**
- RESTful endpoints under `/api` prefix
- Authentication middleware protecting all civilization routes
- CRUD operations for civilizations and messages
- Separation of concerns with dedicated service layer (claudeService.ts)

**Storage Pattern:**
- Interface-based storage abstraction (IStorage)
- Database implementation (DatabaseStorage) for flexibility
- Centralized data access layer preventing direct database queries in routes

### External Dependencies

**Third-Party Services:**
- **Anthropic Claude API**: AI-powered event generation and simulation responses
  - Requires `ANTHROPIC_API_KEY` environment variable
  - Uses latest Claude Sonnet 4 model for optimal performance
  
- **Neon Database**: Serverless PostgreSQL hosting
  - Requires `DATABASE_URL` environment variable
  - WebSocket connection via `@neondatabase/serverless`

- **Replit Auth**: OAuth 2.0 / OIDC authentication
  - Requires `REPL_ID`, `ISSUER_URL`, `SESSION_SECRET`, `REPLIT_DOMAINS` environment variables
  - Mandatory sessions and users table structure

**Key Libraries:**
- **@anthropic-ai/sdk**: Official Anthropic API client
- **drizzle-orm**: Type-safe SQL query builder
- **@tanstack/react-query**: Server state management
- **react-hook-form + zod**: Form validation
- **@radix-ui/***: Headless UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **express-session + connect-pg-simple**: PostgreSQL-backed session storage

**Font Resources:**
- Google Fonts CDN: Inter (UI text) and JetBrains Mono (data/timestamps)