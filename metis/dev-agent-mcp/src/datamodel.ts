import fs from "node:fs";
import { resolveInRoot, toRel, truncate, walkFiles } from "./fs-utils.js";

interface Model {
  name: string;
  file: string;
  table?: string;
  columns: string[];
  assoc: string[];
}

/** Corps `{ ... }` qui commence à l'accolade ouvrante `open` (équilibrage simple, sans gérer les chaînes contenant des accolades). */
function block(src: string, open: number): string {
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}" && --depth === 0) return src.slice(open + 1, i);
  }
  return src.slice(open + 1);
}

/** Clés de premier niveau d'un objet littéral, avec leur `type: DataTypes.X` éventuel. */
function topLevelColumns(body: string): string[] {
  const cols: string[] = [];
  let depth = 0;
  let i = 0;
  while (i < body.length) {
    const ch = body[i];
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
    else if (depth === 0) {
      const m = /^\s*['"]?(\w+)['"]?\s*:\s*\{/.exec(body.slice(i));
      if (m) {
        const inner = block(body, i + m[0].length - 1);
        const type = /type:\s*(?:DataTypes|Sequelize)\.(\w+)/.exec(inner)?.[1];
        const flags = [/primaryKey:\s*true/.test(inner) && "pk", /allowNull:\s*false/.test(inner) && "not null"].filter(Boolean);
        cols.push(`${m[1]}${type ? `:${type}` : ""}${flags.length ? ` (${flags.join(", ")})` : ""}`);
        i += m[0].length; // juste après l'accolade ouvrante
        depth++;
        continue;
      }
    }
    i++;
  }
  return cols;
}

/** Modèles Sequelize (class X extends Model + X.init + associate) : colonnes et relations. */
export function dataModel(scope = ".", filter?: string): string {
  const models: Model[] = [];
  for (const f of walkFiles(resolveInRoot(scope))) {
    const src = fs.readFileSync(f, "utf8");
    const cls = /class\s+(\w+)\s+extends\s+Model\b/.exec(src);
    if (!cls) continue;
    const initAt = src.search(new RegExp(`${cls[1]}\\.init\\(\\s*\\{`));
    const body = initAt >= 0 ? block(src, src.indexOf("{", initAt)) : "";
    const opts = initAt >= 0 ? src.slice(initAt) : "";
    models.push({
      name: cls[1],
      file: toRel(f),
      table: /tableName:\s*['"`](\w+)/.exec(opts)?.[1],
      columns: topLevelColumns(body),
      assoc: [...src.matchAll(/this\.(hasMany|belongsToMany|belongsTo|hasOne)\(\s*models\.(\w+)(?:\s*,\s*\{([^}]*)\})?/g)].map((m) => {
        const fk = /foreignKey:\s*['"`](\w+)/.exec(m[3] ?? "")?.[1];
        return `${m[1]} ${m[2]}${fk ? ` (fk ${fk})` : ""}`;
      }),
    });
  }
  const shown = filter ? models.filter((m) => `${m.name} ${m.table ?? ""}`.toLowerCase().includes(filter.toLowerCase())) : models;
  if (!shown.length) return "Aucun modèle Sequelize trouvé.";
  const detail = filter || shown.length <= 5;
  return truncate(
    `${shown.length} modèle(s)${filter ? ` pour "${filter}"` : ""}\n` +
      shown
        .map((m) =>
          detail
            ? `${m.name}${m.table ? ` [table ${m.table}]` : ""} — ${m.file}\n  colonnes: ${m.columns.join(", ") || "?"}\n  relations: ${m.assoc.join("; ") || "-"}`
            : `${m.name}${m.table ? ` [${m.table}]` : ""}: ${m.columns.length} col., ${m.assoc.length} rel. — ${m.file}`,
        )
        .join("\n"),
    10000,
  );
}
