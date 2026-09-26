import Link from "next/link";
import { getContent } from "@/lib/content";
import { asset, pagePath } from "@/lib/paths";
import LangSwitch from "@/components/LangSwitch";

/* Case study layout (Coral palette). Words come from content/<slug>.yml */
export default function CaseStudyPage({ slug, lang }) {
  const common = getContent("common", lang);
  const c = getContent(slug, lang);
  const t = common.case;
  const home = pagePath(lang, "/");
  const f = c.context.facts;
  const images = c.visuals.images || [];

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

        <section className="section case-section">
          <div className="wrap">
            <div className="case-label">{c.context.eyebrow}</div>
            <div className="case-facts">
              {[
                [t.period, f.period],
                [t.company, f.company],
                [t.domain, f.domain],
                [t.methods, f.methods],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="case-fact-label">{label}</div>
                  <div className="case-fact-value">{value}</div>
                </div>
              ))}
            </div>
            <p className="case-p lead">{c.context.lead}</p>
            <p className="case-p">{c.context.body}</p>
          </div>
        </section>

        <section className="section deep case-section">
          <div className="wrap">
            <div className="case-label">{c.objective.eyebrow}</div>
            <h2 className="case-h2">{c.objective.title}</h2>
            <ul className="dot-list">
              {c.objective.items.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
        </section>

        <section className="section case-section">
          <div className="wrap">
            <div className="case-label">{c.role.eyebrow}</div>
            <h2 className="case-h2">{c.role.title}</h2>
            <p className="case-p">{c.role.lead}</p>
            <ul className="dot-list">
              {c.role.items.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
        </section>

        <section className="section deep case-section">
          <div className="wrap">
            <div className="case-label">{c.execution.eyebrow}</div>
            <h2 className="case-h2">{c.execution.title}</h2>
            <div className="grid-steps">
              {c.execution.steps.map((s, i) => (
                <div key={s} className="card tile">
                  <div className="tile-num">{String(i + 1).padStart(2, "0")}</div>
                  <p>{s}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="case-section band">
          <div className="wrap">
            <div className="case-label">{c.results.eyebrow}</div>
            <h2 className="case-h2">{c.results.title}</h2>
            <div className="grid-stats">
              {c.results.headline.map((s) => (
                <div key={s.label} className="card tile">
                  <div className="stat-value">
                    {s.value}
                    {s.unit && <span className="stat-unit">{s.unit}</span>}
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="grid-stats small">
              {c.results.secondary.map((s) => (
                <div key={s.label} className="card tile">
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {images.length > 0 && (
          <section className="section case-section">
            <div className="wrap">
              <div className="case-label">{c.visuals.eyebrow}</div>
              <div className={`gallery${images.length === 1 ? " single" : ""}`}>
                {images.map((img) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={img.src} src={asset(img.src)} alt={img.alt} loading="lazy" />
                ))}
              </div>
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
