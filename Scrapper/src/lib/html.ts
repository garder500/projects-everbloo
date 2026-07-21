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

export function htmlToText(html: string): string {
  const $ = cheerio.load(html);

  for (const selector of REMOVE_SELECTORS) {
    $(selector).remove();
  }

  const text = $("body").text().replace(/\s+/g, " ").trim();
  return text || $.root().text().replace(/\s+/g, " ").trim();
}

export function extractTitle(html: string): string | undefined {
  const $ = cheerio.load(html);
  const title = $("title").first().text().trim();
  return title || undefined;
}
