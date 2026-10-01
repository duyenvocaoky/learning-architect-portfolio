import Link from "next/link";
import { getContent } from "@/lib/content";
import { asset, pagePath } from "@/lib/paths";
import Rich from "@/components/Rich";
import LangSwitch from "@/components/LangSwitch";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

/* The home page layout. All words come from content/home.yml + content/common.yml. */
export default function HomePage({ lang }) {
  const common = getContent("common", lang);
  const c = getContent("home", lang);
  const n = common.nav;

  return (
    <div id="top">
      <div className="nav-bar">
        <nav className="nav">
          <a href="#top" className="brand">
            {common.brand}
            <span className="accent">.</span>
          </a>
          <div className="nav-links">
            <a href="#experience">{n.experience}</a>
            <a href="#services">{n.services}</a>
            <a href="#work">{n.work}</a>
            <a href="#ai">{n.ai}</a>
            <a href="#process">{n.process}</a>
            <a href="#contact">{n.contact}</a>
            <Link href={pagePath(lang, "/blog/")}>{n.blog}</Link>
          </div>
          <div className="nav-right">
            <Link href={pagePath(lang, "/blog/")} className="nav-blog-m">{n.blog}</Link>
            <LangSwitch lang={lang} path="/" />
            <a href="#contact" className="btn primary sm">{n.cta}</a>
          </div>
        </nav>
      </div>

      <main>
        {/* 1. Hero */}
        <section className="section hero">
          <div className="wrap">
            <div>
              <span className="eyebrow">{c.hero.eyebrow}</span>
              <h1><Rich text={c.hero.title} /></h1>
              <p className="hero-intro">{c.hero.intro}</p>
              <div className="btn-row">
                <a href="#work" className="btn primary">{c.hero.cta_primary}</a>
                <a href="#contact" className="btn outline">{c.hero.cta_secondary}</a>
              </div>
            </div>
            <div className="portrait">
              <div className="bubble blob" />
              <div className="bubble b1" />
              <div className="bubble b2" />
              <div className="bubble b3" />
              <div className="bubble b4" />
              <div className="bubble b5" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/img/duyen-cutout.webp")} alt={c.hero.photo_alt} width="920" height="1273" fetchPriority="high" />
            </div>
          </div>
        </section>

        {/* 2. Experience */}
        <section id="experience" className="section deep">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">{c.experience.eyebrow}</span>
              <h2 className="h2"><Rich text={c.experience.title} /></h2>
              <p className="section-intro">{c.experience.intro}</p>
            </div>
            <div className="timeline">
              <Experience roles={c.experience.roles} />
              <div className="education">
                <div className="education-years">{c.experience.education.years}</div>
                <div className="education-text">{c.experience.education.text}</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Services */}
        <section id="services" className="section">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">{c.services.eyebrow}</span>
              <h2 className="h2"><Rich text={c.services.title} /></h2>
              <p className="section-intro">{c.services.intro}</p>
            </div>
            <div className="grid-4">
              {c.services.items.map((s, i) => (
                <a key={s.title} href="#work" className="card lift service">
                  <span className="service-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="card-link">{c.services.link}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Selected work */}
        <section id="work" className="section deep">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">{c.work.eyebrow}</span>
              <h2 className="h2"><Rich text={c.work.title} /></h2>
              <p className="section-intro"><Rich text={c.work.intro} /></p>
            </div>
            <div className="grid-work">
              {c.work.cases.map((w) => {
                const inner = (
                  <>
                    <div className={`work-stat ${w.tone}`}>
                      {w.stat}
                      <span> {w.stat_label}</span>
                    </div>
                    <div className="work-body">
                      <span className="work-tag">{w.tag}</span>
                      <h3>{w.title}</h3>
                      <p>{w.text}</p>
                      <span className="card-link">{w.slug ? c.work.link : common.case.coming_soon}</span>
                    </div>
                  </>
                );
                return w.slug ? (
                  <Link key={w.title} href={pagePath(lang, `/work/${w.slug}/`)} className="card lift work-card">
                    {inner}
                  </Link>
                ) : (
                  <div key={w.title} className="card work-card soon">{inner}</div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. AI projects */}
        <section id="ai" className="section">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">{c.ai.eyebrow}</span>
              <h2 className="h2"><Rich text={c.ai.title} /></h2>
              <p className="section-intro" style={{ maxWidth: "60ch" }}><Rich text={c.ai.intro} /></p>
            </div>
            <div className="grid-ai">
              {c.ai.projects.map((p) => (
                <div key={p.label} className="card lift ai-card">
                  <span className="eyebrow">{p.label}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <div className="chips">
                    {p.tools.map((t) => <span key={t} className="chip">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Process */}
        <section id="process" className="section deep">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">{c.process.eyebrow}</span>
              <h2 className="h2"><Rich text={c.process.title} /></h2>
              <p className="section-intro">{c.process.intro}</p>
            </div>
            <div className="steps-wrap">
              <div className="steps-line" />
              <div className="steps">
                {c.process.steps.map((s, i) => (
                  <div key={s.title}>
                    <div className={`step-num${s.highlight ? " on" : ""}`}>{String(i + 1).padStart(2, "0")}</div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Contact */}
        <section id="contact" className="section">
          <div className="wrap">
            <div className="contact-box">
              <span className="eyebrow">{c.contact.eyebrow}</span>
              <h2 className="h2"><Rich text={c.contact.title} /></h2>
              <p className="section-intro">{c.contact.intro}</p>
              <div className="btn-row">
                <a href={`mailto:${common.email}`} className="btn primary">{c.contact.email_button}</a>
                <a href={common.linkedin} target="_blank" rel="noopener noreferrer" className="btn primary">
                  {c.contact.linkedin_button}
                </a>
              </div>
              <div className="contact-facts">
                <div>
                  <div className="fact-label">{c.contact.email_label}</div>
                  <a href={`mailto:${common.email}`} className="fact-value">{common.email}</a>
                </div>
                <div>
                  <div className="fact-label">{c.contact.location_label}</div>
                  <div className="fact-value">{c.contact.location}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer common={common} lang={lang} />
    </div>
  );
}
