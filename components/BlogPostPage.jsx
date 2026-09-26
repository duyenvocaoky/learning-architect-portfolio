import Link from "next/link";
import { getContent } from "@/lib/content";
import { asset, pagePath } from "@/lib/paths";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import PostToc from "@/components/PostToc";

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

  // Table of contents: one entry per section present, plus the process steps.
  const toc = [];
  if (c.overview) toc.push({ id: "overview", text: c.overview.title });
  if (c.role) toc.push({ id: "role", text: c.role.title });
  if (c.process) {
    toc.push({ id: "process", text: c.process.title });
    c.process.steps.forEach((s, i) => toc.push({ id: `step-${i + 1}`, text: `${i + 1}. ${s.title}`, sub: true }));
  }
  if (c.outcome) toc.push({ id: "outcome", text: c.outcome.title });
  if (c.learned) toc.push({ id: "learned", text: c.learned.title });

  return (
    <div id="top">
      <SiteNav common={common} lang={lang} path={path} />
      <main className="blog">
        <div className="post-layout">
        <PostToc label={common.case.toc} items={toc} />
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
            <section id="overview">
              <h2>{c.overview.title}</h2>
              <Paras items={c.overview.body} />
            </section>
          )}

          {c.role && (
            <section id="role">
              <h2>{c.role.title}</h2>
              <ul className="dot-list">
                {c.role.items.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </section>
          )}

          {c.process && (
            <section id="process">
              <h2>{c.process.title}</h2>
              <p>{c.process.lead}</p>
              <ol className="timeline">
                {c.process.steps.map((s, i) => (
                  <li key={s.title} id={`step-${i + 1}`}>
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
            <section id="outcome" className="post-outcome">
              <h2>{c.outcome.title}</h2>
              <Paras items={c.outcome.body} />
              {(c.outcome.images || []).map((img) => (
                <Figure key={img.src} src={img.src} alt={img.alt} />
              ))}
            </section>
          )}

          {c.learned && (
            <section id="learned">
              <h2>{c.learned.title}</h2>
              <Paras items={c.learned.body} />
            </section>
          )}

          <Link href={pagePath(lang, "/blog/")} className="post-back end">{common.case.back_blog}</Link>
        </article>
        </div>
      </main>
      <Footer common={common} lang={lang} />
    </div>
  );
}
