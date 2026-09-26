import Link from "next/link";
import { getContent } from "@/lib/content";
import { asset, pagePath } from "@/lib/paths";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";

/* A blog post: one reading column. The numbered process timeline is the page's one
   visual accent; everything else stays quiet. Words: content/blog/<slug>.yml */

function Figure({ src, alt }) {
  if (!src) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="post-figure" src={asset(src)} alt={alt || ""} loading="lazy" />;
}

function Paras({ items }) {
  return (items || []).map((p, i) => <p key={i}>{p}</p>);
}

export default function BlogPostPage({ slug, lang }) {
  const common = getContent("common", lang);
  const c = getContent(`blog/${slug}`, lang);
  const path = `/blog/${slug}/`;

  return (
    <div id="top">
      <SiteNav common={common} lang={lang} path={path} />
      <main className="blog">
        <article className="post">
          <Link href={pagePath(lang, "/blog/")} className="post-back">{common.case.back_blog}</Link>
          <h1>{c.title}</h1>
          <p className="post-intro">{c.intro}</p>

          {c.facts?.length > 0 && (
            <dl className="post-facts">
              {c.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <Figure src={c.cover} alt={c.cover_alt} />

          {c.overview && (
            <section>
              <h2>{c.overview.title}</h2>
              <Paras items={c.overview.body} />
            </section>
          )}

          {c.role && (
            <section>
              <h2>{c.role.title}</h2>
              <ul className="dot-list">
                {c.role.items.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </section>
          )}

          {c.process && (
            <section>
              <h2>{c.process.title}</h2>
              <p>{c.process.lead}</p>
              <ol className="timeline">
                {c.process.steps.map((s) => (
                  <li key={s.title}>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    {s.models && (
                      <p className="timeline-models">
                        {c.process.models_label}: {s.models}
                      </p>
                    )}
                    <Figure src={s.image} alt={s.image_alt} />
                  </li>
                ))}
              </ol>
            </section>
          )}

          {c.outcome && (
            <section className="post-outcome">
              <h2>{c.outcome.title}</h2>
              <Paras items={c.outcome.body} />
              {(c.outcome.images || []).map((img) => (
                <Figure key={img.src} src={img.src} alt={img.alt} />
              ))}
            </section>
          )}

          {c.learned && (
            <section>
              <h2>{c.learned.title}</h2>
              <Paras items={c.learned.body} />
            </section>
          )}

          <Link href={pagePath(lang, "/blog/")} className="post-back end">{common.case.back_blog}</Link>
        </article>
      </main>
      <Footer common={common} lang={lang} />
    </div>
  );
}
