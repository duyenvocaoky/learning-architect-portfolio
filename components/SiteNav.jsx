import Link from "next/link";
import { pagePath } from "@/lib/paths";
import LangSwitch from "@/components/LangSwitch";

/* Top bar for pages other than home (blog). Links point back into the home page sections. */
export default function SiteNav({ common, lang, path }) {
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
          <Link href={`${home}#work`}>{n.work}</Link>
          <Link href={pagePath(lang, "/blog/")} aria-current="page">{n.blog}</Link>
          <Link href={`${home}#contact`}>{n.contact}</Link>
        </div>
        <div className="nav-right">
          <Link href={pagePath(lang, "/blog/")} className="nav-blog-m" aria-current="page">{n.blog}</Link>
          <LangSwitch lang={lang} path={path} />
          <Link href={`${home}#contact`} className="btn primary sm">{n.cta}</Link>
        </div>
      </nav>
    </div>
  );
}
