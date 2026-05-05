---
description: "Use when editing the debug-cli submodule: CLI commands, interactive flows, remote API calls, Sabre shopping analysis, Vite web UI, or Bun build configuration."
applyTo: "debug-cli/**"
---

# Debug CLI — Guide d'utilisation et conventions

Le `debug-cli` est un outil de debug local pour l'API Metis Aerial. Il combine une **CLI interactive** (Bun/TypeScript) et une **UI web** (React/Vite) pour analyser les réponses Shopping Sabre.

> Les commandes Bun s'exécutent depuis la **racine** de `debug-cli/`, contrairement aux autres sous-modules où c'est `src/`.

---

## Structure du projet

```
debug-cli/
├── index.ts              # Point d'entrée CLI principal
├── install.sh            # Build + installation globale (metis-db)
├── tsconfig.json         # Config TS : target ESNext, module Preserve, bundler mode
├── package.json          # Bun runtime, dépendances CLI
├── examples/             # Payloads JSON d'exemple
├── src/
│   ├── adapters/         # Adapteurs fournisseur (miroir de front-reservation/src/utils/adapters/)
│   │   ├── BaseAdapter.ts           # Contrat commun, mapping fournisseur, resolveProvider()
│   │   ├── index.ts                 # Registre : getAdapter(ora), isOraSupported()
│   │   ├── SabreAdapter.ts          # SABRE/SABRENDC (GDS + NDC)
│   │   ├── AirFranceAdapter.ts      # AF/KL
│   │   ├── IberiaAdapter.ts         # IB
│   │   ├── TransaviaAdapter.ts      # TO/HV
│   │   ├── GokyteAdapter.ts         # U2, FR, 6E, LS, V7, W6
│   │   ├── GokyteLegacyAdapter.ts   # QR, AA, AC, AY
│   │   ├── TurkishAirlinesAdapter.ts # TK
│   │   ├── BritishAirwaysAdapter.ts  # BA
│   │   ├── EmiratesAdapter.ts       # EK
│   │   ├── AmadeusAdapter.ts        # AMADEUS
│   │   └── AegeanAdapter.ts         # A3/OA
│   ├── commands/         # Toutes les commandes (sabreShopping, remoteAuto, etc.)
│   ├── utils/            # Utilitaires (fileReader, sabreUtils, baseUrl, folderUtils)
│   ├── types/            # Types TypeScript (SABRE/)
│   └── tests/            # Tests (vide actuellement)
├── web/                  # UI web Vite + React + Tailwind
│   ├── server.ts         # Backend Hono (Bun) : API de parsing Sabre
│   ├── vite.config.ts    # Config Vite avec proxy /api → localhost:3001
│   └── src/              # Composants React (FileUpload, OffersTable, Filters…)
└── out/                  # Sortie des appels remote (créé à l'exécution)
```

## Commandes disponibles

### CLI directe (argument-based)

```bash
# Shopping Sabre offline (fichier JSON local)
bun run index.ts sabre shopping --file <path> [--flight <code>] [--brand <name>] [--offer <id>] [--sort departureTime]

# Shopping via API distante
bun run index.ts remote shopping --payload <path> [--url <url>] [--max <count>]

# Mode interactif Remote (autocomplete aéroports, dates, offerPrice, orderCreate)
bun run index.ts remote interactive

# Mode batch automatisé (recherche → offerPrice → orderCreate → dossierOpti)
bun run index.ts remote auto

# Réservation automatique avec adapteurs fournisseur (ALLER-RETOUR)
bun run index.ts remote reservation

# Mode interactif Sabre (navigation paginée des offres)
bun run index.ts interactive
```

### Mode Réservation (`remote reservation`)

Workflow interactif complet avec sélection aller-retour et utilisation des adapteurs fournisseur :

1. Recherche de profil passager (profilSearch via API Dashboard)
2. AirShoppingRQ avec route, dates aléatoires et ORA configuré
3. Sélection automatique de l'offre aller + offre retour
4. OfferPriceRQ via l'adapteur fournisseur
5. OrderCreateRQ via l'adapteur fournisseur (URL spécifique au provider)
6. DossierOpti

Paramètres interactifs : payload, base URL, ORA, départ, arrivée, searchName, agenceId, count, token.

### Adapteurs fournisseur (`src/adapters/`)

Chaque adapteur implémente l'interface `DebugAdapter` et miroite `front-reservation/src/utils/adapters/` :

| Méthode | Rôle |
|---------|------|
| `buildOfferPricePayload(ctx)` | Construit le payload spécifique au provider |
| `buildOrderCreatePayload(ctx)` | Construit le payload OrderCreate avec paiement par défaut |
| `getOfferPriceUrl(baseUrl)` | URL de l'endpoint (ex: `/global/offerPriceRQ`) |
| `getOrderCreateUrl(baseUrl)` | URL spécifique (ex: `/SABRE/order/orderCreateRQ`) |
| `defaultPaymentMethods` | Méthodes de paiement supportées |

Le registre `src/adapters/index.ts` expose `getAdapter(ora)` qui résout automatiquement le bon adapteur via le mapping `PROVIDER_ROUTES`. Le nommage des fichiers miroite `front-reservation` pour faciliter la recherche cross-codebase.

### Modes interactifs

Deux modes interactifs sont disponibles, tous deux construits avec la librairie `prompts` :

| Mode | Déclencheur | Description |
|------|-------------|-------------|
| **Sabre interactif** | `bun run index.ts` (sans args) | Navigation paginée (25 offres/page), filtres, détail d'offre |
| **Remote interactif** | `bun run index.ts remote interactive` | workflow complet : sélection aéroports (via Amadeus API) → dates → shopping → offerPrice → orderCreate → dossierOpti |

### Mode Auto (batch)

Exécution automatisée multi-itération. Pour chaque itération :
1. Recherche de profil passager (profilSearch)
2. AirShoppingRQ avec route, dates aléatoires et ORA configuré
3. Sélection automatique de la première offre (filtrée par ORA)
4. OfferPriceRQ
5. OrderCreateRQ
6. DossierOpti

---

## UI Web (`web/`)

L'UI web est une application **React 19 + Vite + Tailwind CSS v4** qui permet d'analyser visuellement les réponses Shopping Sabre.

### Démarrage

```bash
cd debug-cli/web
bun install
bun run dev:all     # Lance Vite (UI) + server.ts (API Hono) en parallèle
```

### Architecture

| Couche | Technologie | Rôle |
|--------|-------------|------|
| Frontend | React 19, Tailwind CSS v4, Base UI | Affichage des offres, filtres, détail, upload |
| Backend | Hono (Bun) sur port 3001 | API de parsing : `/api/parse-sabre`, `/api/parse-metis`, `/api/offer-detail` |
| Proxy | Vite (`/api` → `localhost:3001`) | Routage des appels API en dev |

### Composants

| Composant | Rôle |
|-----------|------|
| `FileUpload.tsx` | Upload d'un fichier JSON de réponse Shopping |
| `MetisSearchForm.tsx` | Saisie des critères de recherche (dates, route) |
| `OffersTable.tsx` | Tableau paginé des offres avec prix, compagnie, cabine |
| `Filters.tsx` | Filtres par vol, cabine, brand, tri |
| `OfferDetail.tsx` | Détail complet d'une offre (itinéraire, passagers, bagages, pénalités) |

### Modes de payload supportés

| Mode | Type de fichier | Description |
|------|----------------|-------------|
| `SABRE` | GDS Shopping Response JSON | Structure `groupedItineraryResponse` avec `scheduleDescs`, `legDescs`, `fareComponentDescs` |
| `METIS` | NDC Shopping Response JSON | Structure interne Metis avec `DataLists`, `OriginListFlights` |

---

## Build & déploiement

```bash
# Build exécutable autonome
bun build ./index.ts --compile --outfile metis-db

# Installation globale (via install.sh)
bash install.sh    # Copie metis-db vers /usr/local/bin
```

---

## Conventions de code

### CLI (`src/commands/`)

- Chaque commande exporte :
  - Une **interface d'options** (`*Options`)
  - Une **interface de résultat** (`*Result`)
  - Une **constante d'URL par défaut** (`DEFAULT_*_URL`)
  - Une **fonction principale** `run*()` asynchrone
- Format de sortie : les réponses sont écrites dans `out/<commande>/<timestamp>/` avec les fichiers `*Request.json` et `*Response.json`
- Les en-têtes `authorization` sont automatiquement masqués dans les logs (`<redacted>`)
- Les fonctions `isRecord()`, `readString()`, `readNumber()` sont des helpers internes à chaque fichier pour sécuriser l'accès aux objets JSON typés ou non

### Utilitaires (`src/utils/`)

| Fichier | Rôle |
|---------|------|
| `baseUrl.ts` | URLs par défaut (`http://localhost:3000/aerial`) et helper `getDashboardBaseUrl()` |
| `fileReader.ts` | Lecture de fichiers JSON via `Bun.file()` |
| `sabreUtils.ts` | Parsing Sabre : `createLookupMaps()`, `buildDirections()`, types `SabreMaps`, `Direction`, `StructuredDirection` |
| `folderUtils.ts` | Chiffrement d'ID de dossier (XOR + hex) |

### Types (`src/types/SABRE/`)

- Types TypeScript pour la structure de réponse Sabre GDS (`Root`, `GroupedItineraryResponse`, `ScheduleDesc`, `LegDesc`, etc.)
- Le typage suit la structure `groupedItineraryResponse` de l'API Sabre REST

### Constantes importantes

| Constante | Valeur | Description |
|-----------|--------|-------------|
| `DEFAULT_AERIAL_BASE_URL` | `http://localhost:3000/aerial` | URL de base API Aerial |
| `DEFAULT_DASHBOARD_BASE_URL` | `http://localhost:3000/dashboard` | URL de base API Dashboard |
| `DEFAULT_SAMPLE_FILE` | `SABRE_IMPACT-Parrot_PAX1_NA_AIRSHOPPING_RS_*.json` | Fichier sample par défaut |
| `SHOPPING_PROVIDER_TIMEOUT_MS` (dans api-aerial) | `15000` | Timeout shopping (important pour le remote) |

---

## Tests

Aucun test n'est configuré actuellement. Les dépendances de dev incluent `@types/bun` et `@types/node`.

---

## Pièges courants

1. **Bun est requis** — `npm install` n'existe pas, utiliser `bun install`
2. **CWD** — les commandes s'exécutent depuis la racine `debug-cli/`, pas depuis `src/`
3. **Payload path** — les chemins de fichiers peuvent être absolus ou relatifs à `debug-cli/`
4. **Ports** — l'UI web tourne sur le port Vite par défaut (5173) avec un backend Hono sur 3001
5. **Pré-requis remote** — le mode remote nécessite que l'API Aerial tourne (locale ou distante)
6. **Token Amadeus** — le mode interactif remote nécessite un token Bearer valide pour l'authentification
7. **Le dossier `out/`** est créé automatiquement et peut grossir — penser à le nettoyer
