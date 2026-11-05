import Link from "next/link";
import { getContent } from "@/lib/content";
import { asset, pagePath } from "@/lib/paths";
import Footer from "@/components/Footer";

/* Sales landing page for "7 ngày làm rõ yêu cầu và phân vai". Vietnamese only.
   Words: content/landing-7-ngay.yml (text from the Google Doc).
   Section order and layout follow the reference page Duyên chose:
   strip → centred hero → problem (2 boxes) → 3 risk cards → outcome cards →
   steps + "includes" boxes → feedback + instructor card → fit columns → price box,
   plus a sticky register bar at the bottom of the screen. */

function List({ items, kind = "dot-list" }) {
  return (
    <ul className={kind}>
      {items.map((x) => <li key={x}>{x}</li>)}
    </ul>
  );
}

function Bubbles({ items, tone }) {
  return (
    <ul className={`lp-bubbles${tone ? ` ${tone}` : ""}`}>
      {items.map((q) => <li key={q}>{q}</li>)}
    </ul>
  );
}

/* Register button. When registration is closed it shows a dimmed, non-clickable
   button plus an email link for people who want the next cohort. */
function Cta({ c, href, ext, className = "" }) {
  if (c.closed) {
    return (
      <div className={`lp-cta-block ${className}`}>
        <span className={`btn lp-cta lp-closed ${className}`} aria-disabled="true">{c.closed_label}</span>
        <a className="lp-next" href={mailtoNext(c)}>
          {c.next_label}: {c.contact_email}
        </a>
      </div>
    );
  }
  return (
    <a className={`btn primary lp-cta ${className}`} href={href} {...ext}>{c.cta}</a>
  );
}

const mailtoNext = (c) => `mailto:${c.contact_email}?subject=${encodeURIComponent(c.next_subject)}`;

function Band({ id, deep, children, narrow }) {
  return (
    <section id={id} className={`lp-band${deep ? " deep" : ""}`}>
      <div className={`lp-wrap${narrow ? " narrow" : ""}`}>{children}</div>
    </section>
  );
}

export default function Landing7NgayPage() {
  const lang = "vi";
  const common = getContent("common", lang);
  const c = getContent("landing-7-ngay", lang);
  const formHref = c.form_url || "#dang-ky";
  const ext = c.form_url ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <div id="top" className="lp">
      {/* 0. Strip + header */}
      <p className="lp-strip">{c.pricing.limit}</p>
      <div className="nav-bar">
        <nav className="nav lp-nav">
          <Link href={pagePath(lang, "/")} className="brand">
            {common.brand}
            <span className="accent">.</span>
          </Link>
          {c.closed ? (
            <a className="btn primary sm" href={mailtoNext(c)}>{c.next_short}</a>
          ) : (
            <a className="btn primary sm" href="#dang-ky">Đăng ký</a>
          )}
        </nav>
      </div>

      <main>
        {/* 1. Hero (centred) */}
        <Band narrow>
          <header className="lp-hero">
            <p className="lp-kicker">{c.hero.subtitle}</p>
            <h1>{c.hero.title}</h1>
            <Bubbles items={c.hero.quotes} tone="center" />
            <p className="lp-lead">{c.hero.pain}</p>
            <p className="lp-promise">{c.hero.promise}</p>
            <ul className="lp-chips">
              {c.hero.outputs.map((x) => <li key={x}>{x}</li>)}
            </ul>
            <Cta c={c} href={formHref} ext={ext} />
            <p className="lp-note">{c.hero.closing}</p>
          </header>
        </Band>

        {/* 2. Tình huống quen thuộc — two boxes */}
        <Band deep>
          <h2 className="lp-h2">{c.situation.title}</h2>
          <p className="lp-intro">{c.situation.intro}</p>
          <Bubbles items={[c.situation.request]} tone="center" />
          <div className="lp-two">
            <div className="lp-box">
              <span className="lp-badge" aria-hidden="true">?</span>
              <h3>{c.situation.unclear_label}</h3>
              <List items={c.situation.unclear} />
            </div>
            <div className="lp-box">
              <span className="lp-badge warn" aria-hidden="true">!</span>
              <h3>{c.situation.then}</h3>
              <Bubbles items={c.situation.feedback} tone="muted" />
            </div>
          </div>
        </Band>

        {/* 3. Cái giá — 3 risk cards + 2 callouts */}
        <Band>
          <h2 className="lp-h2">{c.cost.title}</h2>
          <p className="lp-intro">{c.cost.intro}</p>
          <div className="lp-cards three">
            {c.cost.risks.map((r, i) => (
              <div key={r.title} className="lp-card">
                <span className="lp-num">#{i + 1}</span>
                <h3>{r.title}</h3>
                <p className="lp-result">{r.result}</p>
              </div>
            ))}
          </div>
          <div className="lp-callout">
            <p>{c.cost.closing}</p>
          </div>
          <div className="lp-box lp-why">
            <h3>{c.cost.why_title}</h3>
            <p>{c.cost.why_intro}</p>
            <ul className="lp-grid-chips">
              {c.cost.why_items.map((x) => <li key={x}>{x}</li>)}
            </ul>
            <p>{c.cost.why_closing}</p>
          </div>
        </Band>

        {/* 4. Sau 7 ngày bạn có gì — numbered cards */}
        <Band deep>
          <h2 className="lp-h2">{c.outputs.title}</h2>
          <div className="lp-cards outcomes">
            {c.outputs.items.map((x, i) => (
              <div key={x} className="lp-card">
                <span className="lp-big">{String(i + 1).padStart(2, "0")}</span>
                <p>{x}</p>
              </div>
            ))}
          </div>
        </Band>

        {/* 5. Cách làm — steps + includes boxes */}
        <Band>
          <h2 className="lp-h2">{c.how.title}</h2>
          <p className="lp-intro">{c.how.time} <strong>{c.how.dates}</strong></p>
          <ol className="timeline lp-steps">
            {c.how.steps.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                {s.result && <p className="lp-result">{s.result}</p>}
              </li>
            ))}
          </ol>
          <h3 className="lp-h3">{c.how.includes_label}</h3>
          <div className="lp-two">
            <div className="lp-box">
              <p className="lp-box-strong">{c.how.sessions}</p>
            </div>
            <div className="lp-box">
              <p className="lp-box-strong">{c.how.templates_label}</p>
              <List items={c.how.templates} />
            </div>
          </div>
          <div className="lp-center"><Cta c={c} href={formHref} ext={ext} /></div>
        </Band>

        {/* 6. Xem trước mẫu — hidden until there is an image */}
        {c.preview?.image && (
          <Band deep narrow>
            <h2 className="lp-h2">{c.preview.title}</h2>
            <a className="post-figure lp-preview" href={asset(c.preview.image)} target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(c.preview.image)} alt={c.preview.image_alt} loading="lazy" />
            </a>
          </Band>
        )}

        {/* 7. Hai vòng góp ý + instructor card */}
        <Band deep={!c.preview?.image}>
          <h2 className="lp-h2">{c.feedback.title}</h2>
          <p className="lp-intro">{c.feedback.intro}</p>
          <div className="lp-two">
            <div>
              <h3 className="lp-h3 first">{c.feedback.questions_label}</h3>
              <Bubbles items={c.feedback.questions} tone="mine" />
            </div>
            <div className="lp-box">
              <List items={c.feedback.rules} />
            </div>
          </div>
          <div className="lp-instructor">
            <span className="lp-avatar" aria-hidden="true">D</span>
            <div>
              <h3>{c.feedback.about_title}</h3>
              {c.feedback.about.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </Band>

        {/* 8. Ai phù hợp — two columns */}
        <Band deep={!!c.preview?.image}>
          <h2 className="lp-h2">{c.fit.title}</h2>
          <p className="lp-intro">{c.fit.intro}</p>
          <div className="lp-two">
            <div className="lp-box yes">
              <h3>{c.fit.yes_label}</h3>
              <List items={c.fit.yes} kind="lp-checks" />
            </div>
            <div className="lp-box no">
              <h3>{c.fit.no_label}</h3>
              <List items={c.fit.no} kind="lp-cross" />
            </div>
          </div>
          <p className="lp-warn">{c.fit.privacy}</p>
        </Band>

        {/* 9. Giá và đăng ký */}
        <Band id="dang-ky" deep narrow>
          <div className="lp-price">
            <span className="lp-pill">{c.pricing.limit}</span>
            <h2>{c.pricing.title}</h2>
            <p className="lp-price-tag">
              {c.pricing.price}
              <span>{c.pricing.per}</span>
            </p>
            <p>{c.pricing.includes}</p>
            <dl className="lp-details">
              {c.pricing.details.map((d) => (
                <div key={d.label}>
                  <dt>{d.label}</dt>
                  <dd>{d.text}</dd>
                </div>
              ))}
            </dl>
            <Cta c={c} href={formHref} ext={ext} className="wide" />
          </div>
        </Band>
      </main>

      <Footer common={common} lang={lang} />

      {/* Sticky register bar */}
      <div className="lp-sticky" role="complementary">
        <span className="lp-sticky-price">{c.pricing.price}</span>
        {c.closed ? (
          <a className="btn primary sm" href={mailtoNext(c)}>{c.next_short}</a>
        ) : (
          <a className="btn primary sm" href={formHref} {...ext}>Đăng ký</a>
        )}
      </div>
    </div>
  );
}
