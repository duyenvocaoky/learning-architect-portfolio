/* Renders content text with two tiny markers used in content/*.yml:
     *word*  → coral accent        \n → line break */
export default function Rich({ text }) {
  if (!text) return null;
  return text.split("\n").map((line, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {line.split(/(\*[^*]+\*)/).map((part, j) =>
        part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
          <span key={j} className="accent">{part.slice(1, -1)}</span>
        ) : (
          part
        )
      )}
    </span>
  ));
}
