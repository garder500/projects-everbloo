# Metis — Guidelines du dépôt

Plateforme de distribution de voyages **Metis** — monorepo coordinateur. Le code applicatif vit dans des sous-modules Git.

## Structure du projet

| Sous-module | Stack | Rôle |
|-------------|-------|------|
| `api-aerial/` | Node/Express, Sequelize | API réservation & ticketing (Sabre, Amadeus, AFKL, NDC…) |
| `api-dashboard/` | Node/Express, Sequelize | API back-office |
| `front-dashboard/` | Nuxt 3, Vuetify 3, Pinia | SPA back-office |
| `front-reservation/` | Nuxt 3, Vuetify 3, Pinia | SPA réservation (B2B/SBT) |
| `debug-cli/` | Bun, TypeScript | CLI de debug local (+ UI web Vite dans `web/`) |

**Toutes les commandes npm/bun s'exécutent depuis `src/`** (sauf `debug-cli` où c'est la racine).

## Architecture

### API (`api-aerial`, `api-dashboard`)
- **MVCS** : `controllers/` → `services/` → `models/` (Sequelize)
- **Contrôleurs organisés par fournisseur** : chaque transporteur/supplier a son dossier (ex: `controllers/TURKISH_AIRLINES/`, `controllers/TRANSAVIA/`, `controllers/AFKL/`, `controllers/SABRE/`)
- **Couche `use cases/`** : logique métier transverse et orchestrations multi-supplier (ex: `use cases/phase AF/`, `use cases/AMADEUS/`)
- **Auth** : Keycloak (middleware OIDC)
- **Jobs background** : pg-boss (`queue/` — `queue.js`, `constants.js`)
- **Middleware** : `roleMiddleware.js`, `keycloakPassportMiddleware.js`, `handleErrors.js` (Sentry + OpenTelemetry), `decodeKeycloakToken.js`, `decryptAgenceInfoMiddleware.js`
- **Validation** : `schemas/` (Joi) ; `helpers/errors` (`GeneralError`)
- **Cross-platform** : scripts npm utilisent `run-script-os` (ex: `npm run test:windows` ≠ `test:default`)

### Frontends (`front-dashboard`, `front-reservation`)
- Nuxt 3, SSR désactivé (`ssr: false`)
- Vuetify 3, Pinia (stores en option API), `@pinia-plugin-persistedstate/nuxt`
- **Proxy** dans `nuxt.config.ts` : `/aerial/` → API Aerial, `/dashboard/` → API Dashboard, `/hotel/`, `/rail/`, `/car/`, `/aggregator/`
- `.environments/` (notez le **s** final) — chargé via `dotenv-flow`
- Stores de flux métier : `*FlowStore.ts` / `*ServicingFlow.ts`
- Plugins client-only suffixés `.client.ts`

### Sabre (`api-aerial/src/utils/SABRE/`)
- Orchestrations GDS/NDC : shopping, booking, ticketing, exchange, refund, seat map
- Sous-dossier `_methods/` : opérations unitaires (split, refresh, requestAccessibility…)
- Tests : `__tests__/*.test.js` avec le test runner natif Node

## Build, test & dev

### Orchestration (depuis la racine)
| Commande | Action |
|----------|--------|
| `pixi run setup` | Installe tooling global (`bun`, `concurrently`) |
| `pixi run up` | Lance les 4 services en parallèle (ports 3000, 5000, 8080, 8080) |
| `pixi run clean` | Nettoie les branches Git fusionnées |
| `pixi run scalar` | Serveur OpenAPI (Scalar) sur le port 8088 |

### Par sous-module (depuis `src/`)
| Action | APIs | Frontends | CLI |
|--------|------|-----------|-----|
| Install | `npm install` | `npm install` | `bun install` |
| Dev | `npm run dev` | `npm run dev` | `bun run index.ts` |
| Lint | `npm run lint` | `npm run lint` | — |
| Build | — | `npm run build` | `bun build ./index.ts --compile --outfile metis-db` |
| DB migrate | `npm run sequelize:aerial:migrate` | — | — |

### Tests
| Sous-module | Framework | Commande |
|-------------|-----------|----------|
| `api-aerial` | Mocha/Chai | `npm run test:windows` |
| `api-aerial` (SABRE) | Node test runner | `node --test utils/SABRE/__tests__/*.test.js` |
| `api-dashboard` | Mocha/Chai | `npm run test:windows` |
| `front-reservation` | Playwright | `npm run test:script` · `npm run test:headed` · `npm run test:debug` |

## Conventions
- **Commits** : Conventional Commits (`feat:`, `fix:`, `chore:`)
- **Code style** : ESLint + Prettier ; point-virgules, guillemets doubles, indentation 2 espaces, égalité stricte
- **Dossiers** : suivre les patterns existants (`controllers/`, `services/`, `models/`, `schemas/`, `middleware/`)
- **Environnements** : APIs → `src/.environment/` ; Frontends → `src/.environments/` (pluriel)
- **PRs** : inclure un résumé, les commandes de test exécutées et des captures d'écran pour les changements UI
- **Sous-modules** : `git submodule update --init --recursive` après un clone

## Fichiers de personnalisation existants
| Fichier | Portée |
|---------|--------|
| `.github/instructions/nuxt-frontend-conventions.instructions.md` | Code frontend (`front-*/src/**`) |
| `.github/instructions/sabre-ticketing-exchange-guards.instructions.md` | Code Sabre ticketing/exchange (`api-aerial/src/utils/SABRE/**`) |
| `.github/instructions/sequelize-model-migration.instructions.md` | Modèles et migrations Sequelize (`api-*/src/{models,migrations}/**`) |
| `.github/skills/sabre-payload-transforms/SKILL.md` | Transformations de payloads Sabre SOAP/XML et REST/JSON |

## Documentation détaillée
- [GEMINI.md](GEMINI.md) — notes d'architecture étendues, intégrations fournisseurs, descriptions de workflows
- [introspection.md](introspection.md)
