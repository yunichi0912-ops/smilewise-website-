import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import CountUp from './CountUp.jsx';
import { nikoniko, yearlySaving, yearlyPerMonth, yen } from '../data/pricing.js';

/** ニコニコプランの月額管理費：月払い・年払いの比較 */
export default function PlanCompare() {
  const monthlyTotal = nikoniko.monthly * 12;
  const ratio = (nikoniko.yearly / monthlyTotal) * 100;

  return (
    <div className="compare">
      <div className="compare__cards">
        <Reveal className="pay spot" delay={0}>
          <p className="pay__type">月払い</p>
          <p className="pay__price">
            <CountUp value={nikoniko.monthly} />
            <span>円／月</span>
          </p>
          <dl className="pay__rows">
            <div>
              <dt>12か月の合計</dt>
              <dd>{yen(monthlyTotal)}円</dd>
            </div>
          </dl>
          <p className="pay__note">毎月のお支払い</p>
        </Reveal>

        <Reveal className="pay pay--best spot" delay={140}>
          <span className="pay__badge">
            <Icon name="check" size={14} strokeWidth={2.4} />
            {yen(yearlySaving)}円お得
          </span>
          <p className="pay__type">年払い</p>
          <p className="pay__price">
            <CountUp value={nikoniko.yearly} />
            <span>円／年</span>
          </p>
          <dl className="pay__rows">
            <div>
              <dt>月あたり換算</dt>
              <dd>{yen(yearlyPerMonth)}円</dd>
            </div>
          </dl>
          <p className="pay__note">年1回のお支払い</p>
        </Reveal>
      </div>

      <Reveal className="compare__bars" delay={200}>
        <p className="compare__bars-title">年間のお支払い額の比較</p>
        <div className="bar-row">
          <span className="bar-row__label">月払い</span>
          <span className="bar-row__track">
            <i style={{ '--w': '100%' }} />
          </span>
          <span className="bar-row__value">{yen(monthlyTotal)}円</span>
        </div>
        <div className="bar-row bar-row--best">
          <span className="bar-row__label">年払い</span>
          <span className="bar-row__track">
            <i style={{ '--w': `${ratio}%` }} />
          </span>
          <span className="bar-row__value">{yen(nikoniko.yearly)}円</span>
        </div>
        <p className="compare__saving">
          年払いなら、月払いより <b>{yen(yearlySaving)}円</b> お得です。
        </p>
      </Reveal>

      <Reveal as="p" className="compare__foot" delay={240}>
        ※ 上記の月額管理費のほか、初期制作費 {yen(nikoniko.initial)}円 がかかります。
        プランの内容・ご契約条件の詳細は、お問い合わせの際にご説明します。
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
