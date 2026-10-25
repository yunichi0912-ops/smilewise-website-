import Reveal from './Reveal.jsx';
import { nikoniko, pageOptions, pageOptionNote, yen, TAX } from '../data/pricing.js';

/** ページ追加オプションの料金表（基本の最大5ページを超える場合） */
export default function PageOptions() {
  return (
    <Reveal className="popt">
      <p className="popt__lead">
        基本の制作ページ数は<b>最大{nikoniko.maxPages}ページ</b>です。それ以上のページは、次の料金で追加できます。
      </p>
      <ul className="popt__list">
        {pageOptions.map((o) => (
          <li key={o.title} className="popt__item">
            <span className="popt__name">
              <b>{o.title}</b>
              <small>{o.when}</small>
            </span>
            <span className="popt__price">
              {o.price != null ? (
                <>
                  {o.unit} <b>{yen(o.price)}</b>円<small>{TAX}</small>
                </>
              ) : (
                <b className="popt__quote">個別見積もり</b>
              )}
            </span>
          </li>
        ))}
      </ul>
      <p className="popt__note">※ {pageOptionNote}</p>
    </Reveal>
  );
}
