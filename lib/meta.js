import { getContent } from "@/lib/content";
import { pagePath } from "@/lib/paths";

/* Page <title>/<meta description> from the page's content file, plus EN/VI alternates. */
export function pageMeta(name, lang, path) {
  const { meta } = getContent(name, lang);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { languages: { en: pagePath("en", path), vi: pagePath("vi", path) } },
  };
}
