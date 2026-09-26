/* Reads the content/*.yml files at build time and returns them in one language.

   In the YAML, any text that differs by language is written as { en, vi }.
   localize() walks the tree and replaces each of those pairs with the chosen
   language, so page code just reads plain strings: c.hero.title, c.nav.work … */
import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";

export const LANGS = ["en", "vi"];

const isPair = (v) => v && typeof v === "object" && !Array.isArray(v) && "en" in v;

function localize(node, lang) {
  if (Array.isArray(node)) return node.map((n) => localize(n, lang));
  if (isPair(node)) return node[lang];
  if (node && typeof node === "object") {
    return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, localize(v, lang)]));
  }
  return node;
}

export function loadContentFile(name) {
  const file = path.join(process.cwd(), "content", `${name}.yml`);
  return parse(fs.readFileSync(file, "utf8"));
}

export function getContent(name, lang) {
  return localize(loadContentFile(name), lang);
}
