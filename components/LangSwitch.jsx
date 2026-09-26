import Link from "next/link";
import { pagePath } from "@/lib/paths";

/* EN | VI pills. Each language is its own pre-built page, so switching is a link. */
export default function LangSwitch({ lang, path = "/" }) {
  return (
    <nav className="lang" aria-label="Language">
      {lang === "en" ? <span className="on">EN</span> : <Link href={pagePath("en", path)} hrefLang="en">EN</Link>}
      {lang === "vi" ? <span className="on">VI</span> : <Link href={pagePath("vi", path)} hrefLang="vi">VI</Link>}
    </nav>
  );
}
