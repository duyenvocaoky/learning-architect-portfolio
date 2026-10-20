import Link from "next/link";
import { getContent } from "@/lib/content";
import { asset, pagePath } from "@/lib/paths";
import Footer from "@/components/Footer";

/* Sales landing page for "7 ngày làm rõ yêu cầu và phân vai". Vietnamese only.
   Words: content/landing-7-ngay.yml. The one visual accent is the chat-bubble treatment
   of the real phrases people in L&D hear; everything else reuses the blog reading column. */

function Bubbles({ items, tone }) {
  return (
    <ul className={`lp-bubbles${tone ? ` ${tone}` : ""}`}>
      {items.map((q) => <li key={q}>{q}</li>)}
    </ul>
  );
}

function List({ items, kind = "dot-list" }) {
  return (
    <ul className={kind}>
      {items.map((x) => <li key={x}>{x}</li>)}
    </ul>
  );
}

export default function Landing7NgayPage() {
  const lang = "vi";
  const common = getContent("common", lang);
  const c = getContent("landing-7-ngay", lang);
  const href = c.form_url || "#dang-ky";
  const external = Boolean(c.form_url);
  const ctaProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <div id="top">
      <div className="nav-bar">
        <nav className="nav lp-nav">
          <Link href={pagePath(lang, "/")} className="brand">
            {common.brand}
            <span className="accent">.</span>
          </Link>
          <a className="btn primary sm" href={href} {...ctaProps}>Đăng ký</a>
        </nav>
      </div>

      <main className="blog lp">
        <article className="post">
          {/* 1. Phần đầu */}
          <header className="lp-hero">
            <p className="post-kicker">{c.hero.kicker}</p>
            <h1>{c.hero.title}</h1>
            <p className="lp-subtitle">{c.hero.subtitle}</p>
            <Bubbles items={c.hero.quotes} />
            <p className="lp-lead">{c.hero.pain}</p>
            <p className="lp-promise">{c.hero.promise}</p>
            <List items={c.hero.outputs} kind="lp-checks" />
            <div className="lp-cta-row">
              <a className="btn primary lp-cta" href={href} {...ctaProps}>{c.cta}</a>
            </div>
            <p className="lp-note">{c.hero.closing}</p>
          </header>

          {/* 2. Tình huống quen thuộc */}
          <section>
            <h2>{c.situation.title}</h2>
            <p>{c.situation.intro}</p>
            <Bubbles items={[c.situation.request]} />
            <p>{c.situation.unclear_label}</p>
            <List items={c.situation.unclear} />
            <p>{c.situation.then}</p>
            <Bubbles items={c.situation.feedback} tone="muted" />
          </section>

          {/* 3. Cái giá */}
          <section>
            <h2>{c.cost.title}</h2>
            <p>{c.cost.intro}</p>
            <List items={c.cost.items} kind="arrow-list lp-arrows" />
            <p>{c.cost.closing}</p>
            <h3 className="lp-h3">{c.cost.why_title}</h3>
            <p>{c.cost.why_intro}</p>
            <List items={c.cost.why_items} />
            <p>{c.cost.why_closing}</p>
          </section>

          {/* 4. Sau 7 ngày bạn có gì */}
          <section className="post-outcome">
            <h2>{c.outputs.title}</h2>
            <List items={c.outputs.items} kind="lp-checks" />
          </section>

          {/* 5. Cách làm */}
          <section>
            <h2>{c.how.title}</h2>
            <ol className="timeline">
              {c.how.steps.map((s) => (
                <li key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
            <p>
              {c.how.time} <strong>{c.how.dates}</strong>
            </p>
            <p>{c.how.includes_label}</p>
            <List items={c.how.includes} />
            <div className="lp-cta-row">
              <a className="btn primary lp-cta" href={href} {...ctaProps}>{c.cta}</a>
            </div>
          </section>

          {/* 6. Xem trước mẫu — hidden until there is an image */}
          {c.preview?.image && (
            <section>
              <h2>{c.preview.title}</h2>
              <a className="post-figure" href={asset(c.preview.image)} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(c.preview.image)} alt={c.preview.image_alt} loading="lazy" />
              </a>
            </section>
          )}

          {/* 7. Hai vòng góp ý + Về Duyên */}
          <section>
            <h2>{c.feedback.title}</h2>
            <p>{c.feedback.intro}</p>
            <p>{c.feedback.questions_label}</p>
            <Bubbles items={c.feedback.questions} tone="mine" />
            <List items={c.feedback.rules} />
            <div className="lp-about">
              <h3 className="lp-h3">{c.feedback.about_title}</h3>
              {c.feedback.about.map((p) => <p key={p}>{p}</p>)}
            </div>
          </section>

          {/* 8. Ai phù hợp */}
          <section>
            <h2>{c.fit.title}</h2>
            <p>{c.fit.intro}</p>
            <div className="lp-fit">
              <div>
                <h3 className="lp-h3">{c.fit.yes_label}</h3>
                <List items={c.fit.yes} kind="lp-checks" />
              </div>
              <div>
                <h3 className="lp-h3">{c.fit.no_label}</h3>
                <List items={c.fit.no} kind="lp-cross" />
              </div>
            </div>
            <p className="lp-note">{c.fit.privacy}</p>
          </section>

          {/* 9. Giá và đăng ký */}
          <section id="dang-ky" className="lp-price">
            <h2>{c.pricing.title}</h2>
            <p className="lp-price-tag">
              {c.pricing.price}
              <span>{c.pricing.per}</span>
            </p>
            <p>{c.pricing.includes}</p>
            <p>{c.pricing.limit}</p>
            <dl className="lp-details">
              {c.pricing.details.map((d) => (
                <div key={d.label}>
                  <dt>{d.label}</dt>
                  <dd>{d.text}</dd>
                </div>
              ))}
            </dl>
            <div className="lp-cta-row">
              <a className="btn primary lp-cta" href={href} {...ctaProps}>{c.cta}</a>
            </div>
          </section>
        </article>
      </main>
      <Footer common={common} lang={lang} />
    </div>
  );
}

