import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";

import { listRepositories } from "../services/repo-scanner.js";
import { searchCode } from "../services/code-search.js";
import { findSymbols } from "../services/symbol-finder.js";
import { mapArchitecture } from "../services/architecture-mapper.js";
import { readFileSlice } from "../services/file-reader.js";
import { semanticSearch } from "../services/semantic-index.js";
import { ensureWorkspaceIndexed } from "../services/indexer.js";
import {
  ListRepositoriesSchema,
  SearchCodeSchema,
  FindSymbolsSchema,
  MapArchitectureSchema,
  ReadFileSliceSchema,
  SemanticSearchSchema,
  ReindexWorkspaceSchema,
} from "./schemas.js";

export function registerTools(server: Server) {
  // 1. List Available Tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: "list_repositories",
          description: "Découvre et liste tous les microservices et dépôts du workspace Metis avec leurs stacks techniques, frameworks, ports et points d'entrée.",
          inputSchema: {
            type: "object",
            properties: {
              workspaceRoot: {
                type: "string",
                description: "Chemin racine personnalisé du workspace à scanner (optionnel)",
              },
            },
          },
        },
        {
          name: "search_code",
          description: "Recherche ultra-rapide SQLite FTS5 ou regex dans tous les dépôts ou une sélection ciblée, avec filtrage d'extensions et lignes de contexte.",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Terme ou expression régulière à rechercher",
              },
              isRegex: {
                type: "boolean",
                description: "Indique si la requête est une regex (défaut: false)",
              },
              caseSensitive: {
                type: "boolean",
                description: "Recherche sensible à la casse (défaut: false)",
              },
              repoFilter: {
                type: "array",
                items: { type: "string" },
                description: "Liste des dépôts ciblés (ex: ['api-aerial', 'front-dashboard'])",
              },
              fileExtensions: {
                type: "array",
                items: { type: "string" },
                description: "Filtrer par extensions (ex: ['.ts', '.json'])",
              },
              maxResults: {
                type: "number",
                description: "Nombre max de résultats (défaut: 50)",
              },
              contextLines: {
                type: "number",
                description: "Nombre de lignes de contexte avant/après (défaut: 0)",
              },
            },
            required: ["query"],
          },
        },
        {
          name: "find_symbols",
          description: "Recherche instantanée des définitions de symboles par AST TypeScript (fonctions, classes, interfaces, types, exports CommonJS/ESM) et signatures.",
          inputSchema: {
            type: "object",
            properties: {
              symbolName: {
                type: "string",
                description: "Nom du symbole à chercher (ex: 'dossierCreate', 'BookingService', 'Flight') ou '*' pour tous",
              },
              kind: {
                type: "string",
                enum: ["function", "class", "interface", "type", "enum", "variable", "export", "all"],
                description: "Type de symbole recherché (défaut: all)",
              },
              repoFilter: {
                type: "array",
                items: { type: "string" },
                description: "Filtrer sur des dépôts spécifiques",
              },
              maxResults: {
                type: "number",
                description: "Nombre max de symboles retournés (défaut: 50)",
              },
            },
            required: ["symbolName"],
          },
        },
        {
          name: "map_architecture",
          description: "Cartographie globale des architectures : extrait les spécifications OpenAPI/Swagger, routes d'API, dépendances partagées et liaisons inter-services.",
          inputSchema: {
            type: "object",
            properties: {
              repoFilter: {
                type: "array",
                items: { type: "string" },
                description: "Filtrer l'analyse sur une liste de dépôts",
              },
            },
          },
        },
        {
          name: "read_file_slice",
          description: "Lit une portion paginée et numérotée d'un fichier dans le workspace pour inspecter le code sans saturer le contexte.",
          inputSchema: {
            type: "object",
            properties: {
              path: {
                type: "string",
                description: "Chemin relatif ou absolu du fichier",
              },
              repoName: {
                type: "string",
                description: "Nom du sous-dépôt si le chemin est relatif à celui-ci",
              },
              startLine: {
                type: "number",
                description: "Numéro de début de ligne (défaut: 1)",
              },
              endLine: {
                type: "number",
                description: "Numéro de fin de ligne (optionnel)",
              },
            },
            required: ["path"],
          },
        },
        {
          name: "semantic_search",
          description: "Recherche sémantique pondérée avec mapping de synonymes bilingues (FR/EN) pour relier les concepts métier aux symboles et codes sources.",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Concept ou expression en langage naturel (ex: 'create folder', 'gestion reservation vol', 'auth middleware')",
              },
              repoFilter: {
                type: "array",
                items: { type: "string" },
                description: "Filtrer sur certains dépôts",
              },
              limit: {
                type: "number",
                description: "Nombre maximum de résultats (défaut: 15)",
              },
            },
            required: ["query"],
          },
        },
        {
          name: "reindex_workspace",
          description: "Réindexe la base SQLite / FTS5 et l'AST des symboles de manière incrémentale ou forcée.",
          inputSchema: {
            type: "object",
            properties: {
              force: {
                type: "boolean",
                description: "Forcer une réindexation complète de zéro (défaut: false)",
              },
              workspaceRoot: {
                type: "string",
                description: "Racine du workspace (optionnel)",
              },
            },
          },
        },
      ],
    };
  });

  // 2. Call Tool Handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args = {} } = request.params;

    try {
      switch (name) {
        case "list_repositories": {
          const parsed = ListRepositoriesSchema.parse(args);
          const repos = listRepositories(parsed.workspaceRoot);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(repos, null, 2),
              },
            ],
          };
        }

        case "search_code": {
          const parsed = SearchCodeSchema.parse(args);
          const result = searchCode(parsed);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        case "find_symbols": {
          const parsed = FindSymbolsSchema.parse(args);
          const result = findSymbols(parsed);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        case "map_architecture": {
          const parsed = MapArchitectureSchema.parse(args);
          const result = mapArchitecture(parsed);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        case "read_file_slice": {
          const parsed = ReadFileSliceSchema.parse(args);
          const result = readFileSlice({
            relativeOrAbsolutePath: parsed.path,
            repoName: parsed.repoName,
            startLine: parsed.startLine,
            endLine: parsed.endLine,
          });
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        case "semantic_search": {
          const parsed = SemanticSearchSchema.parse(args);
          const result = semanticSearch(parsed);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        case "reindex_workspace": {
          const parsed = ReindexWorkspaceSchema.parse(args);
          const stats = ensureWorkspaceIndexed(parsed.workspaceRoot, parsed.force);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({ message: "Indexation terminée avec succès", stats }, null, 2),
              },
            ],
          };
        }

        default:
          throw new McpError(ErrorCode.MethodNotFound, `Outil inconnu : ${name}`);
      }
    } catch (error: any) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Erreur lors de l'exécution de ${name} : ${error.message || error}`,
          },
        ],
      };
    }
  });
}
