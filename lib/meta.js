import { getContent } from "@/lib/content";
import { asset, pagePath } from "@/lib/paths";

/* Full site address, needed so LinkedIn/Zalo/Facebook can find the share image.
   GitHub Pages by default; set SITE_URL when building for your own domain (Hostinger). */
const SITE_URL = process.env.SITE_URL || "https://duyenvocaoky.github.io";

/* Page <title>/<meta description> from the page's content file, plus EN/VI alternates,
   the link-preview image (public/og.png) and the browser-tab icon (public/icon.png). */
export function pageMeta(name, lang, path) {
  const { meta } = getContent(name, lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    alternates: { languages: { en: asset(pagePath("en", path)), vi: asset(pagePath("vi", path)) } },
    openGraph: {
      type: "website",
      url: asset(pagePath(lang, path)),
      title: meta.title,
      description: meta.description,
      locale: lang === "vi" ? "vi_VN" : "en_US",
      images: [{ url: asset("/og.png"), width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
    icons: { icon: asset("/icon.png"), apple: asset("/apple-icon.png") },
  };
}
