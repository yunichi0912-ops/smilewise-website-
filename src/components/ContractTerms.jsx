import Reveal from './Reveal.jsx';
import { nikoniko, contractTerms, firstYearTotal, laterYears, monthlyEquivalent, yen } from '../data/pricing.js';

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
            初期制作費 {yen(nikoniko.initial)}円／年間管理・運用費 {yen(nikoniko.annual)}円（月額換算 {yen(monthlyEquivalent)}円）
            <small>表示価格はすべて税込です。</small>
          </dd>
        </div>
        <div className="terms__row">
          <dt>年ごとのお支払い額</dt>
          <dd>
            初年度 {yen(firstYearTotal)}円／2年目以降 年間 {yen(laterYears)}円
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
