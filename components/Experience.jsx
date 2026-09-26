"use client";

import { useState } from "react";

/* Accordion of roles — one open at a time, like the design. */
export default function Experience({ roles }) {
  const [open, setOpen] = useState(-1);
  return roles.map((r, i) => {
    const isOpen = open === i;
    return (
      <div key={r.company} className="card role">
        <button
          type="button"
          className="role-head"
          aria-expanded={isOpen}
          aria-controls={`role-${i}`}
          onClick={() => setOpen(isOpen ? -1 : i)}
        >
          <div>
            <div className="role-years">{r.years}</div>
            <div className="role-dates">{r.dates}</div>
          </div>
          <div>
            <div className="role-company">{r.company}</div>
            <div className="role-title">{r.title}</div>
            {r.summary && <p className="role-summary">{r.summary}</p>}
          </div>
          <span className="role-toggle" aria-hidden="true">{isOpen ? "−" : "+"}</span>
        </button>
        {isOpen && (
          <div className="role-body" id={`role-${i}`}>
            <p className="role-about">{r.about}</p>
            {r.groups?.map((g) => (
              <div key={g.label} className="role-group">
                <div className="role-group-label">{g.label}</div>
                <ul className="arrow-list">
                  {g.items.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            ))}
            {r.highlights && (
              <div className="highlights">
                {r.highlights.map((h) => (
                  <div key={h.tag} className="highlight">
                    <span className="highlight-tag">{h.tag}</span>
                    <span className="highlight-text">{h.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  });
}
