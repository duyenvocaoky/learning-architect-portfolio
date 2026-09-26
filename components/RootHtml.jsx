import "@/styles/tokens.css";
import "@/styles/fonts.css";
import "@/styles/site.css";

/* Shared <html> shell. Each language has its own root layout so <html lang> is correct. */
export default function RootHtml({ lang, children }) {
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
