import Reveal from './Reveal.jsx';
import { Link } from 'react-router-dom';
import { nikoniko, nikonikoIncludes, freeFixes, contractTerms, firstYearTotal, firstYearMonthlyTotal, monthlyYearTotal, monthlyEquivalent, pageOptions, pageOptionNote, yen } from '../data/pricing.js';

/** ニコニコプランのご契約条件（確定している条件のみ掲載） */
export default function ContractTerms() {
  return (
    <Reveal>
      <dl className="terms">
        {contractTerms.decided.map((t) => (
          <div key={t.label} className="terms__row terms__row--key">
            <dt>{t.label}</dt>
            <dd>{t.value}</dd>
          </div>
        ))}
        <div className="terms__row">
          <dt>料金</dt>
          <dd>
            初期制作費 {yen(nikoniko.initial)}円／管理費 月払い {yen(nikoniko.monthly)}円・年払い {yen(nikoniko.annual)}円（月換算 {yen(monthlyEquivalent)}円）
            <small>表示価格はすべて税込です。</small>
          </dd>
        </div>
        <div className="terms__row">
          <dt>初年度総額</dt>
          <dd>
            年払い {yen(firstYearTotal)}円／月払い {yen(firstYearMonthlyTotal)}円（初期制作費＋12か月分の管理費）
            <small>
              2年目以降：年払い 年間 {yen(nikoniko.annual)}円／月払い 月 {yen(nikoniko.monthly)}円（年間 {yen(monthlyYearTotal)}円）
            </small>
          </dd>
        </div>
        <div className="terms__row">
          <dt>ページ追加</dt>
          <dd>
            {pageOptions.map((o) => `${o.title}（${o.when}）${o.price != null ? ` 1ページ ${yen(o.price)}円` : ' 個別見積もり'}`).join('／')}
            <small>{pageOptionNote}</small>
          </dd>
        </div>
        <div className="terms__row">
          <dt>プラン内容</dt>
          <dd>{nikonikoIncludes.map((i) => i.title).join('／')}</dd>
        </div>
        <div className="terms__row">
          <dt>無料修正の範囲</dt>
          <dd>
            {freeFixes.join('、')}
            <small>
              範囲外の作業は別途お見積りです。詳しくは<Link to="/nikoniko#scope">無料修正の範囲</Link>をご覧ください。
            </small>
          </dd>
        </div>
        <div className="terms__row">
          <dt>その他の条件</dt>
          <dd>{contractTerms.pendingNote}</dd>
        </div>
      </dl>
    </Reveal>
  );
}
