import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import CountUp from './CountUp.jsx';
import { nikoniko, monthlyEquivalent, firstYearTotal, laterYears, yen, TAX } from '../data/pricing.js';

/** ニコニコプラン：年間管理費（年払いのみ）と、初年度・2年目以降のお支払い額 */
export default function AnnualPayment() {
  const ratio = (laterYears / firstYearTotal) * 100;

  return (
    <div className="compare">
      <div className="compare__cards">
        <Reveal className="pay pay--best spot">
          <span className="pay__badge">
            <Icon name="calendar" size={14} strokeWidth={2.2} />
            お支払いは年1回
          </span>
          <p className="pay__type">年間管理費</p>
          <p className="pay__price">
            <CountUp value={nikoniko.annual} />
            <span>円／年{TAX}</span>
          </p>
          <p className="pay__equiv">
            月額換算 <b>{yen(monthlyEquivalent)}円</b>
          </p>
          <dl className="pay__rows">
            <div>
              <dt>お支払い方法</dt>
              <dd>{nikoniko.payment}</dd>
            </div>
            <div>
              <dt>最低契約期間</dt>
              <dd>{nikoniko.minMonths}か月</dd>
            </div>
          </dl>
          <p className="pay__note">※ 月額換算は目安です。月払いはできません。実際のお支払いは年1回（年払い）です。</p>
        </Reveal>

        <Reveal className="pay spot" delay={140}>
          <p className="pay__type">年ごとのお支払い額{TAX}</p>
          <dl className="pay__rows pay__rows--years">
            <div>
              <dt>
                初年度
                <small>
                  初期制作費 {yen(nikoniko.initial)}円 ＋ 年間管理費 {yen(nikoniko.annual)}円
                </small>
              </dt>
              <dd>
                <CountUp value={firstYearTotal} />円
              </dd>
            </div>
            <div>
              <dt>
                2年目以降
                <small>年間管理費のみ</small>
              </dt>
              <dd>
                <CountUp value={laterYears} />
                円／年
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>

      <Reveal className="compare__bars" delay={200}>
        <p className="compare__bars-title">年ごとのお支払い額{TAX}</p>
        <div className="bar-row bar-row--best">
          <span className="bar-row__label">初年度</span>
          <span className="bar-row__track">
            <i style={{ '--w': '100%' }} />
          </span>
          <span className="bar-row__value">{yen(firstYearTotal)}円</span>
        </div>
        <div className="bar-row">
          <span className="bar-row__label">2年目以降</span>
          <span className="bar-row__track">
            <i style={{ '--w': `${ratio}%` }} />
          </span>
          <span className="bar-row__value">{yen(laterYears)}円</span>
        </div>
      </Reveal>

      <Reveal as="p" className="compare__foot" delay={240}>
        ※ お支払いは年払いのみ（年1回）です。最低契約期間は{nikoniko.minMonths}か月です。
      </Reveal>
      <Reveal className="center" delay={280}>
        <Link to="/contact?type=web" className="btn btn--primary btn--lg">
          {nikoniko.name}について相談する
          <Icon name="arrow" size={18} />
        </Link>
      </Reveal>
    </div>
  );
}
