import Reveal from './Reveal.jsx';

/** よくある質問（details 要素で開閉） */
export default function FaqList({ items }) {
  return (
    <div className="faq">
      {items.map((f, i) => (
        <Reveal key={f.q} delay={Math.min(i, 5) * 50}>
          <details className="faq__item">
            <summary>
              <span className="faq__q">Q</span>
              {f.q}
            </summary>
            <div className="faq__a">
              <span className="faq__a-mark">A</span>
              <p>{f.a}</p>
            </div>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
