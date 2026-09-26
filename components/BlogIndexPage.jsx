import Link from "next/link";
import { getContent } from "@/lib/content";
import { asset, pagePath } from "@/lib/paths";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";

/* Blog list: editorial rows (media left, words right). The first post is shown larger. */
export default function BlogIndexPage({ lang }) {
  const common = getContent("common", lang);
  const c = getContent("blog", lang);
  const posts = c.posts.map((slug) => ({ slug, ...getContent(`blog/${slug}`, lang) }));

  return (
    <div id="top">
      <SiteNav common={common} lang={lang} path="/blog/" />
      <main className="blog">
        <header className="blog-head">
          <h1>{c.title}</h1>
          <p>{c.intro}</p>
        </header>
        <ol className="post-list">
          {posts.map((p, i) => {
            const href = pagePath(lang, `/blog/${p.slug}/`);
            return (
              <li key={p.slug} className={`post-row${i === 0 ? " featured" : ""}`}>
                <Link href={href} className="post-media" tabIndex={-1} aria-hidden="true">
                  {p.card.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={asset(p.card.image)} alt="" loading="lazy" />
                  ) : (
                    <span className="post-stat">
                      <strong>{p.card.stat}</strong>
                      <span>{p.card.stat_label}</span>
                    </span>
                  )}
                </Link>
                <div className="post-text">
                  <span className="post-tag">{p.card.tag}</span>
                  <h2>
                    <Link href={href}>{p.title}</Link>
                  </h2>
                  <p>{p.card.summary}</p>
                  <Link href={href} className="post-read">{c.read}</Link>
                </div>
              </li>
            );
          })}
        </ol>
      </main>
      <Footer common={common} lang={lang} />
    </div>
  );
}
