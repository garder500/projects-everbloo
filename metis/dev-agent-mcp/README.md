# dev-agent-mcp

Serveur **MCP** (stdio) qui aide les agents de dev à travailler sur le monorepo Metis en consommant peu de tokens : sorties compactes et tronquées, lectures ciblées (symbole, plage), vérifications résumées, mémoire des pièges. Toutes les sorties passent par un masquage des secrets (clés, tokens, JWT, mots de passe, numéros de carte).

## Installation

Prérequis : [Bun](https://bun.sh) ≥ 1.4 (`pixi run setup` l'installe globalement).

```bash
cd dev-agent-mcp
bun install
bun test          # ou : pixi run mcp-test
bunx tsc --noEmit # typecheck
```

## Configuration du client MCP

Aucune variable requise : le workspace est déduit des racines MCP du client si elles sont exposées, sinon du dossier de lancement (`pixi.toml` dans le dossier, un parent ou un enfant direct). `METIS_WORKSPACE_ROOT` ne sert qu à forcer une racine.

**Claude Code** (depuis la racine du workspace) :

```bash
claude mcp add dev-agent -- bun run C:\Users\user\Code\everbloo\metis\dev-agent-mcp\src\index.ts
```

**Fichier `.mcp.json` / config d'un autre client** (Cursor, Claude Desktop, VS Code…) :

```json
{
  "mcpServers": {
    "dev-agent": {
      "command": "bun",
      "args": ["run", "C:\\Users\\user\\Code\\everbloo\\metis\\dev-agent-mcp\\src\\index.ts"]
    }
  }
}
```

Lancement manuel : `pixi run mcp`.

### Binaire autonome (sans Bun sur la machine cible)

```bash
bun run build               # dist/dev-agent-mcp
bun run build:windows-x64   # dist/dev-agent-mcp-windows-x64.exe
bun run build:linux-x64
bun run build:darwin-arm64
```

Puis `"command": "<chemin du binaire>"` dans la config du client. La CI publie ces binaires sur un tag `mcp-vX.Y.Z` (voir `.github/workflows/mcp-release.yml`).

## Variables d'environnement (toutes optionnelles)

| Variable | Rôle |
| :--- | :--- |
| `METIS_WORKSPACE_ROOT` | Optionnelle : force la racine (sinon déduite automatiquement). |
| `DEV_AGENT_DB_URL` | URL PostgreSQL pour `db_schema` / `db_query_readonly`. Sinon, `DB_URL` est lu dans le `.env` du `repo` passé au tool. |
| `GITLAB_TOKEN` | Token `read_api` pour `mr_context` et `ci_failures`. |
| `GITLAB_URL` | Instance GitLab (défaut : l'hôte du remote `origin`). |
| `DEV_AGENT_MEMORY_FILE`, `DEV_AGENT_CHECKPOINTS_FILE` | Emplacements alternatifs (tests). |

## Tools (49)

| Domaine | Tools |
| :--- | :--- |
| Cartographie et lecture | `project_overview`, `repo_map`, `read_outline`, `read_symbol`, `read_range_smart`, `find_symbol`, `find_references`, `search_code`, `search_semantic`, `find_similar_code`, `batch_read`, `summarize_file`, `summarize_dir`, `data_model`, `list_entrypoints` |
| Graphes et impact | `call_graph`, `dependency_graph`, `impact_analysis`, `find_tests_for`, `risk_zones`, `plan_check` |
| Mémoire et contexte | `memory_save`, `memory_recall`, `pitfalls`, `conventions`, `decision_log`, `task_context`, `scratchpad`, `budget_report` |
| Qualité | `run_tests`, `verify_change`, `run_command`, `coverage_gaps`, `review_diff`, `secret_scan`, `api_contract_check` |
| Git et GitLab | `git_context`, `file_diff_since`, `blame_why`, `related_history`, `mr_context`, `ci_failures` |
| Docs et base | `docs_lookup`, `changelog_diff`, `spec_lookup`, `db_schema`, `db_query_readonly` |
| Sécurité | `checkpoint`, `rollback` |

## Garde-fous

- **Scripts qui écrivent ou migrent la base.** `run_tests`, `verify_change` et `run_command` (via `npm run …`) inspectent les scripts du `package.json` (en suivant `npm run x` et les variantes `run-script-os`). Un script qui déclenche `--fix`, `lint-staged`, `db:migrate`, `sequelize-cli`, `seed` ou `drop` est **refusé** sauf `allow_unsafe: true` (ou `unsafe: true` pour `run_command`). `verify_change` lance eslint **sans `--fix`**, sur les seuls fichiers modifiés.
- **Lecture seule par défaut.** `run_command` n'accepte que des binaires courants (et `git` en lecture) sauf `unsafe: true`, et refuse `node`/`bun` avec `-e`/`--eval`/`--print`/`--require`. Ce n'est **pas un bac à sable** : `npm`, `node` ou `bun` exécutent du code du projet ; c'est un garde-fou contre les erreurs, pas contre un acteur malveillant. `rollback` n'affiche qu'un aperçu sans `confirm: true`. Les requêtes DB sont limitées à un SELECT en transaction `READ ONLY` (10 s), colonnes sensibles et emails masqués.
- Les chemins sont toujours résolus à l'intérieur du workspace.
- Les pièges mémorisés (`memory_save` avec `kind: "pitfall"`) sont ajoutés automatiquement aux sorties de `read_outline` / `read_symbol` du chemin concerné.

## Fichiers créés

- `.dev-agent/memory.json` : mémoire d'équipe, versionnable. Ne pas y mettre de secrets (ils sont masqués à l'écriture, mais restent à éviter).
- `.dev-agent/risk-zones.json` (optionnel) : zones critiques en plus des zones par défaut, `[{ "name", "pattern", "checks": [] }]`.
- `.dev-agent/checkpoints.json` : références des `checkpoint`.
- Cache d'index dans le dossier temporaire du système (reconstruit seul s'il est supprimé).

## Limites connues

- `search_semantic` est lexical (BM25 sur symboles, noms `camelCase`/`snake_case` découpés), sans embeddings : les requêtes en anglais fonctionnent mieux sur du code en anglais.
- `call_graph` et `impact_analysis` raisonnent par nom et par imports relatifs (plus les modèles Sequelize, reliés par leur nom de classe), sans résolution de types. Quand `impact_analysis` ou `dependency_graph` ne voit aucun dépendant, ils le disent : require calculé, alias, injection ou chargement dynamique restent invisibles. Pour `call_graph` / `find_references`, préférer `Classe.méthode` aux noms courants (`update`…).
- `run_tests` n'accepte `affected_by` que pour jest/vitest ; avec mocha ou `node --test`, il l'indique et lance la suite complète.
- Le masquage ne remplace un nombre par `[CARD]` que s'il est isolé et valide au test de Luhn (les horodatages de migrations restent lisibles).
- Les tools DB gèrent PostgreSQL uniquement.
- Premier index à froid : environ 5 s sur `api-aerial/src` ; restreindre `scope` aide.
