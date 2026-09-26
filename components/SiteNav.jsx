import Link from "next/link";
import { pagePath } from "@/lib/paths";
import LangSwitch from "@/components/LangSwitch";

/* Top bar for pages other than home (blog, case studies). `current` = "blog" | "work". */
export default function SiteNav({ common, lang, path, current = "blog" }) {
  const home = pagePath(lang, "/");
  const n = common.nav;
  return (
    <div className="nav-bar">
      <nav className="nav">
        <Link href={home} className="brand">
          {common.brand}
          <span className="accent">.</span>
        </Link>
        <div className="nav-links">
          <Link href={`${home}#experience`}>{n.experience}</Link>
          <Link href={`${home}#work`} aria-current={current === "work" ? "page" : undefined}>{n.work}</Link>
          <Link href={pagePath(lang, "/blog/")} aria-current={current === "blog" ? "page" : undefined}>{n.blog}</Link>
          <Link href={`${home}#contact`}>{n.contact}</Link>
        </div>
        <div className="nav-right">
          <Link href={pagePath(lang, "/blog/")} className="nav-blog-m" aria-current={current === "blog" ? "page" : undefined}>{n.blog}</Link>
          <LangSwitch lang={lang} path={path} />
          <Link href={`${home}#contact`} className="btn primary sm">{n.cta}</Link>
        </div>
      </nav>
    </div>
  );
}
