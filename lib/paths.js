/* URL helpers. BASE is "" on Hostinger and "/learning-architect-portfolio" on GitHub Pages.
   next/link adds it automatically; plain <img src> and <a href> need asset()/pageHref(). */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const asset = (p) => `${BASE}${p}`;

/** Page path for a language: pagePath("vi", "/work/rt3/") → "/vi/work/rt3/" */
export const pagePath = (lang, p = "/") => (lang === "vi" ? `/vi${p}` : p);
