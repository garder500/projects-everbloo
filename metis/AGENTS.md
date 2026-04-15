# Repository Guidelines

## Project Structure
Coordinator monorepo for the **Metis** travel distribution platform. Application code lives in Git submodules:

| Submodule | Stack | Role |
|-----------|-------|------|
| `api-aerial/` | Node/Express, Sequelize | Reservation & ticketing API (Sabre, Amadeus, NDC) |
| `api-dashboard/` | Node/Express, Sequelize | Back-office API |
| `front-dashboard/` | Nuxt 3, Vuetify 3, Pinia | Back-office SPA |
| `front-reservation/` | Nuxt 3, Vuetify 3, Pinia | Booking SPA (B2B/SBT) |
| `debug-cli/` | Bun, TypeScript | Local debugging CLI |

Each submodule has a `src/` directory — **all npm/bun commands run from `src/`**.

### Architecture Patterns
- **APIs**: MVCS — `controllers/` → `services/` → `models/` (Sequelize). Auth via Keycloak. Background jobs via pgboss (`queue/`).
- **Frontends**: Nuxt 3 (SSR disabled), Vuetify 3, Pinia stores. Proxy config in `nuxt.config.ts` routes `/api` and `/aerial/` to backend URLs.
- **Sabre utilities**: `api-aerial/src/utils/SABRE/` — GDS/NDC orchestration (shopping, booking, ticketing, exchange, refund). See `.github/instructions/sabre-ticketing-exchange-guards.instructions.md` for guard rules.

## Build, Test & Dev

### Orchestration (from repo root)
- `pixi run setup` — install global tooling (`bun`, `concurrently`)
- `pixi run up` — start all 4 services concurrently
- `pixi run clean` — clean merged Git branches
- `pixi run scalar` — OpenAPI docs server on port 8088

### Per-submodule (from `<submodule>/src/`)
| Action | APIs (`api-aerial`, `api-dashboard`) | Frontends (`front-dashboard`, `front-reservation`) | CLI (`debug-cli`) |
|--------|--------------------------------------|---------------------------------------------------|--------------------|
| Install | `npm install` | `npm install` | `bun install` |
| Dev | `npm run dev` | `npm run dev` | `bun run index.ts` |
| Lint | `npm run lint` | `npm run lint` | — |
| Build | — | `npm run build` | `bun build ./index.ts --compile --outfile metis-db` |
| Start | `npm run start` | `npm run start` | — |

### Testing
| Submodule | Framework | Command (from `src/`) |
|-----------|-----------|----------------------|
| `api-aerial` | Mocha/Chai | `npm run test:default` (Linux/Mac) · `npm run test:windows` |
| `api-aerial` SABRE utils | Node built-in test runner | `node --test utils/SABRE/__tests__/*.test.js` |
| `api-dashboard` | Mocha/Chai | `npm run test:default` · `npm run test:windows` |
| `front-reservation` | Playwright | `npm run test:script` · `npm run test:headed` · `npm run test:debug` |

## Conventions
- **Commits**: Conventional Commits (`feat:`, `fix:`, `chore:`).
- **Code style**: ESLint + Prettier per submodule. Semicolons, double quotes, 2-space indent, strict equality.
- **Folder layout**: follow existing patterns (`controllers/`, `services/`, `models/`, `schemas/`, `middleware/`).
- **Environment files**: APIs use `src/.environment/`, frontends use `src/.environments/` (note the **plural 's'** for frontends).
- **PRs**: include summary, testing notes (commands run), screenshots for UI changes.
- **Submodule init**: `git submodule update --init --recursive` after clone.

## Detailed Context
See [GEMINI.md](GEMINI.md) for extended architecture notes, supplier integration details, and workflow descriptions.
