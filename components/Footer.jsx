export default function Footer({ common }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-brand">
          {common.brand}
          <span className="accent">.</span>
        </div>
        <div className="footer-note">{common.footer.tagline}</div>
      </div>
    </footer>
  );
}
