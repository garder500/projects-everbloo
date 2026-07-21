import TurndownService from "turndown";
import * as cheerio from "cheerio";

const REMOVE_SELECTORS = [
  "script",
  "style",
  "noscript",
  "iframe",
  "svg",
  "nav",
  "footer",
  "header",
  "aside",
  "[aria-hidden='true']",
];

let turndown: TurndownService | null = null;

function getTurndown(): TurndownService {
  if (!turndown) {
    turndown = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
      bulletListMarker: "-",
    });
    turndown.remove(["script", "style", "noscript"]);
  }
  return turndown;
}

export function htmlToMarkdown(html: string): string {
  const $ = cheerio.load(html);
  for (const selector of REMOVE_SELECTORS) {
    $(selector).remove();
  }
  const main =
    $("main").html() ??
    $("article").html() ??
    $('[role="main"]').html() ??
    $(".content").html() ??
    $("body").html() ??
    html;
  return getTurndown().turndown(main).trim();
}

export function buildFrontmatter(meta: Record<string, string>): string {
  const lines = ["---"];
  for (const [key, value] of Object.entries(meta)) {
    lines.push(`${key}: ${JSON.stringify(value)}`);
  }
  lines.push("---", "");
  return lines.join("\n");
}
