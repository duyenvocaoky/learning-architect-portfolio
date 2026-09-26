import Link from "next/link";
import { getContent } from "@/lib/content";
import { asset, pagePath } from "@/lib/paths";
import LangSwitch from "@/components/LangSwitch";

/* Case study layout (Coral palette). Words come from content/<slug>.yml.
   Every section is optional: leave it out of the YAML and it disappears.
   Sections alternate paper / deep backgrounds automatically; results use the coral band. */

const num = (i) => String(i + 1).padStart(2, "0");

function Head({ eyebrow, title }) {
  return (
    <>
      <div className="case-label">{eyebrow}</div>
      {title && <h2 className="case-h2">{title}</h2>}
    </>
  );
}

function Paras({ items, lead }) {
  if (!items) return null;
  const list = Array.isArray(items) ? items : [items];
  return list.map((p, i) => (
    <p key={i} className={`case-p${lead && i === 0 ? " lead" : ""}`}>{p}</p>
  ));
}

function DotList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="dot-list">
      {items.map((x) => <li key={x}>{x}</li>)}
    </ul>
  );
}

function Steps({ steps }) {
  return (
    <div className="grid-steps">
      {steps.map((s, i) => {
        const step = typeof s === "string" ? { text: s } : s;
        return (
          <div key={i} className="card tile">
            <div className="tile-num">{num(i)}</div>
            {step.title && <h3 className="tile-title">{step.title}</h3>}
            <p>{step.text}</p>
            {step.note && <p className="tile-note">{step.note}</p>}
          </div>
        );
      })}
    </div>
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

  // Build the list of sections that exist in this case's YAML, in page order.
  const sections = [];
  if (c.context)
    sections.push(
      <>
        <Head eyebrow={c.context.eyebrow} title={c.context.title} />
        {c.context.facts?.length > 0 && (
          <div className="case-facts">
            {c.context.facts.map((f) => (
              <div key={f.label}>
                <div className="case-fact-label">{f.label}</div>
                <div className="case-fact-value">{f.value}</div>
              </div>
            ))}
          </div>
        )}
        <Paras items={c.context.lead} lead />
        <Paras items={c.context.body} />
      </>
    );
  if (c.objective)
    sections.push(
      <>
        <Head eyebrow={c.objective.eyebrow} title={c.objective.title} />
        <Paras items={c.objective.lead} />
        <DotList items={c.objective.items} />
      </>
    );
  if (c.role)
    sections.push(
      <>
        <Head eyebrow={c.role.eyebrow} title={c.role.title} />
        <Paras items={c.role.lead} />
        <DotList items={c.role.items} />
      </>
    );
  if (c.execution)
    sections.push(
      <>
        <Head eyebrow={c.execution.eyebrow} title={c.execution.title} />
        <Paras items={c.execution.lead} />
        <Steps steps={c.execution.steps} />
      </>
    );

  return (
    <div id="top">
      <div className="nav-bar">
        <nav className="nav case">
          <Link href={`${home}#work`} className="back-link">{t.back}</Link>
          <div className="nav-right">
            <LangSwitch lang={lang} path={`/work/${slug}/`} />
            <Link href={home} className="brand">
              {common.brand}
              <span className="accent">.</span>
            </Link>
          </div>
        </nav>
      </div>

      <main>
        <section className="case-hero">
          <div className="wrap">
            <span className="case-chip">{c.hero.chip}</span>
            <h1>{c.hero.title}</h1>
            <p className="case-lead">{c.hero.intro}</p>
          </div>
        </section>

        {sections.map((body, i) => (
          <section key={i} className={`section case-section${i % 2 ? " deep" : ""}`}>
            <div className="wrap">{body}</div>
          </section>
        ))}

        {c.results && (
          <section className="case-section band">
            <div className="wrap">
              <Head eyebrow={c.results.eyebrow} title={c.results.title} />
              <Paras items={c.results.lead} />
              <Stats items={c.results.headline} />
              <Stats items={c.results.secondary} small />
              <DotList items={c.results.items} />
            </div>
          </section>
        )}

        {c.reflection && (
          <section className="section case-section">
            <div className="wrap">
              <Head eyebrow={c.reflection.eyebrow} title={c.reflection.title} />
              <Paras items={c.reflection.body} />
            </div>
          </section>
        )}

        {(images.length > 0 || c.visuals?.resource_url) && (
          <section className="section deep case-section">
            <div className="wrap">
              <div className="case-label">{c.visuals.eyebrow}</div>
              {images.length > 0 && (
                <div className={`gallery${images.length === 1 ? " single" : ""}`}>
                  {images.map((img) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={img.src} src={asset(img.src)} alt={img.alt} loading="lazy" />
                  ))}
                </div>
              )}
              {c.visuals.resource_url && (
                <div className="btn-row" style={{ marginTop: 32 }}>
                  <a href={c.visuals.resource_url} target="_blank" rel="noopener noreferrer" className="btn primary">
                    {c.visuals.resource_label}
                  </a>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <footer className="case-footer">
        <div className="wrap">
          <Link href={`${home}#work`} className="back-link">{t.back_all}</Link>
          <span className="footer-note">{common.footer.tagline}</span>
        </div>
      </footer>
    </div>
  );
}
