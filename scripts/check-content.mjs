/* Content check — runs automatically before every build (npm run build).
   Fails the build if any text in content/*.yml has English but no Vietnamese
   (or the reverse), so an untranslated line can never reach the live site. */
import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";

const dir = path.join(process.cwd(), "content");
const problems = [];

function walk(node, where) {
  if (Array.isArray(node)) return node.forEach((n, i) => walk(n, `${where}[${i}]`));
  if (!node || typeof node !== "object") return;
  if ("en" in node || "vi" in node) {
    for (const lang of ["en", "vi"]) {
      if (typeof node[lang] !== "string" || !node[lang].trim()) problems.push(`${where}: thiếu "${lang}"`);
    }
    return;
  }
  for (const [k, v] of Object.entries(node)) walk(v, where ? `${where}.${k}` : k);
}

for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".yml"))) {
  let data;
  try {
    data = parse(fs.readFileSync(path.join(dir, f), "utf8"));
  } catch (e) {
    problems.push(`${f}: lỗi định dạng YAML — ${e.message.split("\n")[0]}`);
    continue;
  }
  walk(data, f.replace(".yml", ""));
}

if (problems.length) {
  console.error(`\n✗ Nội dung chưa đủ (${problems.length} chỗ):\n  - ${problems.join("\n  - ")}\n`);
  process.exit(1);
}
console.log("✓ Nội dung đủ cả tiếng Anh và tiếng Việt.");
