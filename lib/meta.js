import { getContent } from "@/lib/content";
import { asset, pagePath } from "@/lib/paths";

/* Page <title>/<meta description> from the page's content file, plus EN/VI alternates. */
export function pageMeta(name, lang, path) {
  const { meta } = getContent(name, lang);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { languages: { en: asset(pagePath("en", path)), vi: asset(pagePath("vi", path)) } },
  };
}
