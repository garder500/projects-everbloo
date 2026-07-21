# Scrapper MCP

Serveur MCP local pour Everbloo :

- **search** — recherche web (DuckDuckGo) ou index local Amadeus
- **get** — récupère une URL (web ou doc Amadeus authentifiée)
- **amadeus_login** — connexion au portail developers.amadeus.com
- **amadeus_crawl** — scrape des URLs vers `docs/amadeus/*.md`

## Prérequis

- Node.js 18+
- Compte Amadeus developers (pour la doc authentifiée)

## Installation

```bash
cd Scrapper
npm install
cp .env.example .env
# Éditer .env avec AMADEUS_USER_ALIAS et AMADEUS_PASSWORD
npm run build
```

## Authentification Amadeus

```bash
npm run crawl:amadeus -- --login
```

La session est persistée dans `.auth/amadeus.session.json` (gitignoré).

## Crawl documentation

Ajoute les URLs dans `sources/amadeus/urls.json`, puis :

```bash
npm run crawl:amadeus
npm run crawl:amadeus -- --url https://developers.amadeus.com/...
npm run crawl:amadeus -- --force
```

Les fichiers Markdown sont générés dans `docs/amadeus/` avec un index `docs/amadeus/index.json`.

## Configuration Cursor

```json
{
  "mcpServers": {
    "scrapper": {
      "command": "node",
      "args": ["C:/Users/user/Code/everbloo/Scrapper/dist/index.js"],
      "env": {
        "AMADEUS_USER_ALIAS": "your.email@example.com",
        "AMADEUS_PASSWORD": "your-password"
      }
    }
  }
}
```

## Outils MCP

### search

| Paramètre | Type | Description |
|-----------|------|-------------|
| `query` | string | Requête (requis) |
| `source` | `web` \| `amadeus` | Source (défaut: `web`) |
| `max_results` | number | Max résultats (1–20) |

### get

| Paramètre | Type | Description |
|-----------|------|-------------|
| `url` | string | URL (requis) |
| `source` | `web` \| `amadeus` | Source (défaut: `web`) |
| `format` | `text` \| `html` \| `markdown` | Format de sortie |
| `max_chars` | number | Limite caractères |

### amadeus_login

| Paramètre | Type | Description |
|-----------|------|-------------|
| `force` | boolean | Forcer une nouvelle connexion |

### amadeus_crawl

| Paramètre | Type | Description |
|-----------|------|-------------|
| `urls` | string[] | URLs à scraper (défaut: `sources/amadeus/urls.json`) |
| `force` | boolean | Re-scraper même si cache local existe |

## Architecture multi-sources

Chaque documentation future = dossier `src/providers/{name}/`, `sources/{name}/urls.json`, `docs/{name}/`.

Interface commune : `DocumentProvider` dans `src/providers/types.ts`.
