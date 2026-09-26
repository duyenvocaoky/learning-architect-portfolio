import Link from "next/link";
import { getContent } from "@/lib/content";
import { asset, pagePath } from "@/lib/paths";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import PostToc from "@/components/PostToc";

/* Case study page — same layout as a blog post: sticky table of contents on the left,
   one reading column, numbered timeline for the steps, results in the coral box.
   Words come from content/<slug>.yml; every section is optional. */

function Paras({ items }) {
  if (!items) return null;
  return (Array.isArray(items) ? items : [items]).map((p, i) => <p key={i}>{p}</p>);
}

function DotList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="dot-list">
      {items.map((x) => <li key={x}>{x}</li>)}
    </ul>
  );
}

function Stats({ items, small }) {
  if (!items?.length) return null;
  return (
    <div className={`grid-stats${small ? " small" : ""}`}>
      {items.map((s) => (
        <div key={s.label} className="card tile">
          <div className="stat-value">
            {s.value}
            {s.unit && <span className="stat-unit">{s.unit}</span>}
          </div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function CaseStudyPage({ slug, lang }) {
  const common = getContent("common", lang);
  const c = getContent(slug, lang);
  const t = common.case;
  const home = pagePath(lang, "/");
  const images = c.visuals?.images || [];
  const heading = (sec) => sec.title || sec.eyebrow;

  // Table of contents: short section names (the eyebrow), in page order.
  const toc = [];
  if (c.context) toc.push({ id: "context", text: c.context.eyebrow });
  if (c.objective) toc.push({ id: "objective", text: c.objective.eyebrow });
  if (c.role) toc.push({ id: "role", text: c.role.eyebrow });
  if (c.execution) toc.push({ id: "execution", text: c.execution.eyebrow });
  if (c.results) toc.push({ id: "results", text: c.results.eyebrow });
  if (c.reflection) toc.push({ id: "reflection", text: c.reflection.eyebrow });
  if (images.length || c.visuals?.resource_url) toc.push({ id: "visuals", text: c.visuals.eyebrow });

  return (
    <div id="top">
      <SiteNav common={common} lang={lang} path={`/work/${slug}/`} current="work" />
      <main className="blog">
        <div className="post-layout">
          <PostToc label={t.toc} items={toc} />
          <article className="post">
            <Link href={`${home}#work`} className="post-back">{t.back}</Link>
            <p className="post-kicker">{c.hero.chip}</p>
            <h1>{c.hero.title}</h1>
            <p className="post-intro">{c.hero.intro}</p>

            {c.context?.facts?.length > 0 && (
              <dl className="post-facts">
                {c.context.facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {c.context && (
              <section id="context">
                <h2>{heading(c.context)}</h2>
                <Paras items={c.context.lead} />
                <Paras items={c.context.body} />
              </section>
            )}

            {c.objective && (
              <section id="objective">
                <h2>{heading(c.objective)}</h2>
                <Paras items={c.objective.lead} />
                <DotList items={c.objective.items} />
              </section>
            )}

            {c.role && (
              <section id="role">
                <h2>{heading(c.role)}</h2>
                <Paras items={c.role.lead} />
                <DotList items={c.role.items} />
              </section>
            )}

            {c.execution && (
              <section id="execution">
                <h2>{heading(c.execution)}</h2>
                <Paras items={c.execution.lead} />
                <ol className="timeline">
                  {c.execution.steps.map((s, i) => {
                    const step = typeof s === "string" ? { text: s } : s;
                    return (
                      <li key={i}>
                        {step.title && <h3>{step.title}</h3>}
                        <p>{step.text}</p>
                        {step.note && <p className="timeline-models">{step.note}</p>}
                      </li>
                    );
                  })}
                </ol>
              </section>
            )}

            {c.results && (
              <section id="results" className="post-outcome">
                <h2>{heading(c.results)}</h2>
                <Paras items={c.results.lead} />
                <Stats items={c.results.headline} />
                <Stats items={c.results.secondary} small />
                <DotList items={c.results.items} />
              </section>
            )}

            {c.reflection && (
              <section id="reflection">
                <h2>{heading(c.reflection)}</h2>
                <Paras items={c.reflection.body} />
              </section>
            )}

            {(images.length > 0 || c.visuals?.resource_url) && (
              <section id="visuals">
                <h2>{c.visuals.eyebrow}</h2>
                {images.map((img) => (
                  <a key={img.src} className="post-figure" href={asset(img.src)} target="_blank" rel="noopener noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(img.src)} alt={img.alt} loading="lazy" />
                  </a>
                ))}
                {c.visuals.resource_url && (
                  <div className="btn-row">
                    <a href={c.visuals.resource_url} target="_blank" rel="noopener noreferrer" className="btn primary">
                      {c.visuals.resource_label}
                    </a>
                  </div>
                )}
              </section>
            )}

            <Link href={`${home}#work`} className="post-back end">{t.back_all}</Link>
          </article>
        </div>
      </main>
      <Footer common={common} lang={lang} />
    </div>
  );
}
