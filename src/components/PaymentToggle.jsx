import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import { nikoniko, paymentPlans, paymentMethods, annualSaving, yen, TAX } from '../data/pricing.js';

/** ニコニコプラン：月払い・年払いの切り替えと、初年度総額・2年目以降・契約条件 */
export default function PaymentToggle({ cta = true, methodsLink = '' }) {
  const [planId, setPlanId] = useState('annual');
  const plan = paymentPlans.find((p) => p.id === planId);
  const maxFirst = Math.max(...paymentPlans.map((p) => p.firstYear));

  return (
    <div className="ptg">
      <Reveal className="ptg__switch" role="group" aria-label="お支払い方法を選ぶ">
        {paymentPlans.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`ptg__tab${p.id === planId ? ' is-on' : ''}`}
            aria-pressed={p.id === planId}
            aria-controls="ptg-panel"
            onClick={() => setPlanId(p.id)}
          >
            {p.label}
            {p.badge && <span className="ptg__badge">{p.badge}</span>}
          </button>
        ))}
      </Reveal>

      <div className="ptg__body">
        <Reveal className={`ptg__card spot${plan.id === 'annual' ? ' is-best' : ''}`} id="ptg-panel" aria-live="polite">
          <div key={plan.id} className="ptg__swap">
            <p className="ptg__type">
              管理費（{plan.label}）
              <span>{plan.schedule}</span>
            </p>
            <p className="ptg__price">
              <b>{yen(plan.fee)}</b>
              <span>
                円／{plan.unit}
                <small>{TAX}</small>
              </span>
            </p>
            <p className="ptg__sub">{plan.sub}</p>

            <dl className="ptg__rows">
              <div>
                <dt>初期制作費</dt>
                <dd>{yen(nikoniko.initial)}円</dd>
              </div>
              <div className="is-total">
                <dt>
                  初年度総額
                  <small>
                    初期制作費 {yen(nikoniko.initial)}円 ＋ {plan.id === 'annual' ? `年払い ${yen(plan.fee)}円` : `月払い ${yen(plan.fee)}円 × 12か月`}
                  </small>
                </dt>
                <dd>
                  <b>{yen(plan.firstYear)}</b>円
                </dd>
              </div>
              <div>
                <dt>2年目以降</dt>
                <dd>
                  {plan.id === 'annual' ? `${yen(plan.fee)}円／年` : `${yen(plan.fee)}円／月（年間 ${yen(plan.yearTotal)}円）`}
                </dd>
              </div>
              <div>
                <dt>最低契約期間</dt>
                <dd>{nikoniko.minMonths}か月</dd>
              </div>
            </dl>
            <div className="ptg__methods">
              <p className="ptg__methods-title">お支払い方法（{plan.label}）</p>
              <ul>
                {paymentMethods.map((m) => (
                  <li key={m.id}>
                    <b>
                      {m.label}
                      <small>（{m.via}）</small>
                    </b>
                    <span>{m[plan.id]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="ptg__note">
              ※ 表示価格はすべて税込です。最低契約期間は、月払い・年払いどちらも{nikoniko.minMonths}か月です。お支払いのお手続きは、ご契約時に個別にご案内します。
              {methodsLink && (
                <Link to={methodsLink} className="ptg__more">
                  お支払い方法の詳細
                </Link>
              )}
            </p>
          </div>
        </Reveal>

        <Reveal className="ptg__compare spot" delay={120}>
          <p className="ptg__compare-title">初年度総額の比較{TAX}</p>
          {paymentPlans.map((p) => (
            <div key={p.id} className={`bar-row${p.id === 'annual' ? ' bar-row--best' : ''}`}>
              <span className="bar-row__label">{p.label}</span>
              <span className="bar-row__track">
                <i style={{ '--w': `${(p.firstYear / maxFirst) * 100}%` }} />
              </span>
              <span className="bar-row__value">{yen(p.firstYear)}円</span>
            </div>
          ))}
          <p className="ptg__saving">
            <Icon name="check" size={18} strokeWidth={2.2} />
            <span>
              年払いなら、月払いより<b>年間{yen(annualSaving)}円</b>お得です。
            </span>
          </p>
        </Reveal>
      </div>

      {cta && (
        <Reveal className="center" delay={200}>
          <Link to="/contact?type=web" className="btn btn--primary btn--lg">
            {nikoniko.name}について相談する
            <Icon name="arrow" size={18} />
          </Link>
        </Reveal>
      )}
    </div>
  );
}
