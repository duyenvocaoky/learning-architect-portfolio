import Link from "next/link";
import { pagePath } from "@/lib/paths";

export default function Footer({ common, lang }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-brand">
          {common.brand}
          <span className="accent">.</span>
        </div>
        <div className="footer-right">
          {lang && <Link href={pagePath(lang, "/blog/")} className="footer-link">{common.nav.blog}</Link>}
          <div className="footer-note">{common.footer.tagline}</div>
        </div>
      </div>
    </footer>
  );
}
