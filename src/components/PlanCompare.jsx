import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import CountUp from './CountUp.jsx';
import {
  nikoniko,
  yearlySaving,
  yearlyPerMonth,
  firstYearMonthly,
  firstYearYearly,
  yen,
  TAX,
} from '../data/pricing.js';

/** ニコニコプラン：月払い・年払いの比較と初年度総額 */
export default function PlanCompare() {
  const ratio = (firstYearYearly / firstYearMonthly) * 100;

  return (
    <div className="compare">
      <div className="compare__cards">
        <Reveal className="pay spot">
          <p className="pay__type">月払い</p>
          <p className="pay__price">
            <CountUp value={nikoniko.monthly} />
            <span>円／月{TAX}</span>
          </p>
          <dl className="pay__rows">
            <div>
              <dt>管理費 12か月分</dt>
              <dd>{yen(nikoniko.monthly * 12)}円</dd>
            </div>
            <div>
              <dt>初期ホームページ制作費</dt>
              <dd>{yen(nikoniko.initial)}円</dd>
            </div>
            <div className="pay__total">
              <dt>初年度総額{TAX}</dt>
              <dd>{yen(firstYearMonthly)}円</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="pay pay--best spot" delay={140}>
          <span className="pay__badge">
            <Icon name="check" size={14} strokeWidth={2.4} />
            {yen(yearlySaving)}円お得
          </span>
          <p className="pay__type">年払い</p>
          <p className="pay__price">
            <CountUp value={nikoniko.yearly} />
            <span>円／年{TAX}</span>
          </p>
          <dl className="pay__rows">
            <div>
              <dt>月あたり換算</dt>
              <dd>{yen(yearlyPerMonth)}円</dd>
            </div>
            <div>
              <dt>初期ホームページ制作費</dt>
              <dd>{yen(nikoniko.initial)}円</dd>
            </div>
            <div className="pay__total">
              <dt>初年度総額{TAX}</dt>
              <dd>{yen(firstYearYearly)}円</dd>
            </div>
          </dl>
        </Reveal>
      </div>

      <Reveal className="compare__bars" delay={200}>
        <p className="compare__bars-title">初年度総額の比較{TAX}</p>
        <div className="bar-row">
          <span className="bar-row__label">月払い</span>
          <span className="bar-row__track">
            <i style={{ '--w': '100%' }} />
          </span>
          <span className="bar-row__value">{yen(firstYearMonthly)}円</span>
        </div>
        <div className="bar-row bar-row--best">
          <span className="bar-row__label">年払い</span>
          <span className="bar-row__track">
            <i style={{ '--w': `${ratio}%` }} />
          </span>
          <span className="bar-row__value">{yen(firstYearYearly)}円</span>
        </div>
        <p className="compare__saving">
          年払いなら、月払いより <b>{yen(yearlySaving)}円</b> お得です。
        </p>
      </Reveal>

      <Reveal as="p" className="compare__foot" delay={240}>
        ※ 最低契約期間は{nikoniko.minMonths}か月です。初年度総額は、初期ホームページ制作費と12か月分の管理費の合計です。
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
