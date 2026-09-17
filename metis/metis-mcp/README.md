# Metis MCP (`metis-mcp`)

Serveur **MCP** (*Model Context Protocol*) spécialisé dans l'exploration, l'analyse et la cartographie globale de code à travers l'ensemble des dépôts et microservices du projet **Metis** (ou de tout workspace multi-projets).

---

## 🌟 Fonctionnalités

`metis-mcp` met à disposition des assistants d'IA (Cursor, Antigravity, Claude Desktop, VS Code, Gemini CLI) 6 outils puissants :

| Outil | Description |
| :--- | :--- |
| **`list_repositories`** | Détecte et résume tous les sous-projets / microservices (APIs, Fronts, CLI, SDKs, Docs) avec leurs stacks, frameworks, ports et points d'entrée. |
| **`search_code`** | Recherche plein texte ou regex instantanée multi-dépôts avec support de filtres par extensions et lignes de contexte. |
| **`find_symbols`** | Détection cross-repo des définitions de symboles (fonctions, classes, interfaces, types, variables) et de leurs signatures. |
| **`map_architecture`** | Cartographie des routes d'API, spécifications OpenAPI/Swagger, dépendances partagées et appels inter-services. |
| **`read_file_slice`** | Lecture paginée et numérotée de fichiers pour inspecter précisément le code sans saturer la fenêtre de contexte. |
| **`semantic_search`** | Recherche sémantique pondérée par pertinence de mots-clés sur la base de code, docstrings et READMEs. |

---

## 🚀 Installation & Démarrage

### Prérequis
- [Bun](https://bun.sh) (>= 1.0) ou Node.js (>= 20)

### Installation des dépendances
```bash
cd metis-mcp
bun install
```

### Lancement des tests
```bash
bun test
# ou depuis la racine : pixi run mcp-test
```

---

## ⚡ Compilation Standalone Cross-Platform (Binaire Exécutable)

Bun permet de compiler l'intégralité du serveur MCP en un **exécutable autonome unique** (zéro dépendance, Node.js et Bun ne sont même pas nécessaires sur la machine cible).

### Compilation pour l'OS courant :
```bash
bun run build
# ou depuis la racine : pixi run mcp-build
# Génère : dist/metis-mcp.exe (Windows) ou dist/metis-mcp (Linux/macOS)
```

### Compilation Cross-Platform (Toutes plateformes) :
```bash
bun run build:all
# ou depuis la racine : pixi run mcp-build-all
```
Cette commande produit dans `dist/` :
- `metis-mcp-windows-x64.exe` (Windows x64)
- `metis-mcp-linux-x64` (Linux x64)
- `metis-mcp-linux-arm64` (Linux ARM64 / Raspberry / serveurs cloud ARM)
- `metis-mcp-darwin-x64` (macOS Intel)
- `metis-mcp-darwin-arm64` (macOS Apple Silicon M1/M2/M3/M4)

---

## ⚙️ Configuration avec les Clients MCP

### 1. Avec l'exécutable compilé (Le plus simple & rapide)

```json
{
  "mcpServers": {
    "metis-mcp": {
      "command": "C:\\Users\\user\\Code\\everbloo\\metis\\metis-mcp\\dist\\metis-mcp.exe",
      "env": {
        "METIS_WORKSPACE_ROOT": "C:\\Users\\user\\Code\\everbloo\\metis"
      }
    }
  }
}
```

### 2. Ou directement avec Bun (mode dev / interprété)

```json
{
  "mcpServers": {
    "metis-mcp": {
      "command": "bun",
      "args": ["run", "C:\\Users\\user\\Code\\everbloo\\metis\\metis-mcp\\src\\index.ts"],
      "env": {
        "METIS_WORKSPACE_ROOT": "C:\\Users\\user\\Code\\everbloo\\metis"
      }
    }
  }
}
```

### 2. Démarrage via Pixi
Dans le fichier `pixi.toml` racine :
```bash
pixi run mcp
```
