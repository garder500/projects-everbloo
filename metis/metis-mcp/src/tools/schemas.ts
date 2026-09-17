import { z } from "zod";

export const ListRepositoriesSchema = z.object({
  workspaceRoot: z.string().optional().describe("Chemin racine personnalisé du workspace à scanner (optionnel)"),
});

export const SearchCodeSchema = z.object({
  query: z.string().describe("Terme ou expression régulière à rechercher dans le code"),
  isRegex: z.boolean().optional().default(false).describe("Indique si la requête est une expression régulière"),
  caseSensitive: z.boolean().optional().default(false).describe("Recherche sensible à la casse"),
  repoFilter: z.array(z.string()).optional().describe("Liste des dépôts/dossiers ciblés (ex: ['api-aerial', 'front-dashboard'])"),
  fileExtensions: z.array(z.string()).optional().describe("Filtrer par extensions de fichiers (ex: ['.ts', '.json', '.yaml'])"),
  maxResults: z.number().optional().default(50).describe("Nombre maximum de résultats à retourner"),
  contextLines: z.number().optional().default(0).describe("Nombre de lignes de contexte avant/après chaque résultat"),
});

export const FindSymbolsSchema = z.object({
  symbolName: z.string().describe("Nom du symbole à chercher (ex: 'dossierCreate', 'BookingService', 'getUser', 'Flight') ou '*' pour tous"),
  kind: z.enum(["function", "class", "interface", "type", "enum", "variable", "export", "all"]).optional().default("all").describe("Type de symbole recherché (défaut: all)"),
  repoFilter: z.array(z.string()).optional().describe("Filtrer la recherche sur des dépôts spécifiques"),
  maxResults: z.number().optional().default(50).describe("Nombre maximum de symboles retournés"),
});

export const MapArchitectureSchema = z.object({
  repoFilter: z.array(z.string()).optional().describe("Filtrer l'analyse sur une liste de dépôts"),
});

export const ReadFileSliceSchema = z.object({
  path: z.string().describe("Chemin relatif ou absolu du fichier à lire"),
  repoName: z.string().optional().describe("Nom du sous-dépôt si le chemin est relatif à celui-ci"),
  startLine: z.number().optional().default(1).describe("Numéro de la première ligne à lire (1-indexed)"),
  endLine: z.number().optional().describe("Numéro de la dernière ligne à lire"),
});

export const SemanticSearchSchema = z.object({
  query: z.string().describe("Requête ou concept en langage naturel à rechercher (ex: 'create folder', 'gestion reservation vol', 'auth middleware')"),
  repoFilter: z.array(z.string()).optional().describe("Filtrer sur certains dépôts"),
  limit: z.number().optional().default(15).describe("Nombre maximum de résultats"),
});

export const ReindexWorkspaceSchema = z.object({
  force: z.boolean().optional().default(false).describe("Forcer la réindexation complète de la base SQLite / FTS5"),
  workspaceRoot: z.string().optional().describe("Chemin racine personnalisé du workspace à indexer"),
});
