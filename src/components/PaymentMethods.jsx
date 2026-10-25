import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import { paymentMethods, paymentCommon, paymentProcedureNote } from '../data/pricing.js';

const steps = [
  { title: 'ご契約', text: 'お申し込み内容と、お支払いプラン（月払い・年払い）・お支払い方法を確認します。' },
  { title: 'お支払いのご案内', text: 'クレジットカード決済のお手続き、または請求書を個別にお送りします。' },
  { title: '初回のご入金確認', text: 'ご入金を確認できしだい、ご連絡します。' },
  { title: '制作開始', text: '初回のご入金確認後に、ホームページの制作を始めます。' },
];

/** ニコニコプランのお支払い方法（クレジットカード決済・銀行振込）と共通事項 */
export default function PaymentMethods() {
  return (
    <div className="pm">
      <div className="pm__cards">
        {paymentMethods.map((m, i) => (
          <Reveal key={m.id} className="pm__card spot" delay={i * 120}>
            <p className="pm__name">
              <span className="pm__icon" aria-hidden="true">
                <Icon name={m.id === 'card' ? 'yen' : 'invoice'} size={22} />
              </span>
              <span>
                {m.label}
                <small>{m.via}</small>
              </span>
            </p>
            <dl className="pm__rows">
              <div>
                <dt>月払い</dt>
                <dd>{m.monthly}</dd>
              </div>
              <div>
                <dt>年払い</dt>
                <dd>{m.annual}</dd>
              </div>
            </dl>
          </Reveal>
        ))}
      </div>

      <Reveal className="pm__common">
        <h3 className="pm__sub">共通事項</h3>
        <ul>
          {paymentCommon.map((c) => (
            <li key={c}>
              <Icon name="check" size={16} strokeWidth={2.2} />
              {c}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="pm__flow-wrap">
        <h3 className="pm__sub">ご契約から制作開始までの流れ</h3>
        <ol className="pm__flow">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="pm__no">{i + 1}</span>
              <span>
                <b>{s.title}</b>
                <small>{s.text}</small>
              </span>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal as="p" className="pm__note">
        <Icon name="shield" size={18} />
        <span>{paymentProcedureNote}</span>
      </Reveal>
    </div>
  );
}
