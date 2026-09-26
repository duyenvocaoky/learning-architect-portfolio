"use client";

import { useEffect, useState } from "react";

/* "On this page" list for blog posts. Sticky on wide screens, hidden on small ones.
   Highlights the section currently being read. */
export default function PostToc({ label, items }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((it) => document.getElementById(it.id)).filter(Boolean);
    const inView = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? inView.add(e.target.id) : inView.delete(e.target.id)));
        // A step sits inside "The process", so both can be in view: pick the most specific (last in list order).
        const current = [...items].reverse().find((it) => inView.has(it.id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="post-toc" aria-label={label}>
      <p className="post-toc-label">{label}</p>
      <ol>
        {items.map((it) => (
          <li key={it.id} className={it.sub ? "sub" : undefined}>
            <a href={`#${it.id}`} aria-current={active === it.id ? "true" : undefined}>
              {it.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
