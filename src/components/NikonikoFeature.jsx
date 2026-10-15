import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import CountUp from './CountUp.jsx';
import { nikoniko, nikonikoIncludes, monthlyEquivalent, firstYearTotal, laterYears, yen, TAX } from '../data/pricing.js';

/** ニコニコプラン（初期制作費 2,525円）の大きな紹介ブロック＋プラン内容 */
export default function NikonikoFeature({ showIncludes = true }) {
  return (
    <>
      <div className="niko">
        <div className="niko__glow" aria-hidden="true" />
        <Reveal className="niko__main" variant="scale">
          <p className="niko__plan">
            <span className="niko__smile" aria-hidden="true">
              <svg viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M12 22.5c1.8 3.2 4.7 5 8 5s6.2-1.8 8-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                <circle cx="15" cy="15.5" r="1.8" fill="currentColor" />
                <circle cx="25" cy="15.5" r="1.8" fill="currentColor" />
              </svg>
            </span>
            ホームページ制作「{nikoniko.name}」
          </p>
          <p className="niko__label">初期制作費</p>
          <p className="niko__price">
            <CountUp value={nikoniko.initial} duration={1800} />
            <span className="niko__yen">
              円<small>{TAX}</small>
            </span>
          </p>
          <p className="niko__pun">ニコ・ニコ ＝ 2,525。笑顔で始められるホームページ制作プランです。</p>
          <p className="niko__min">
            <Icon name="calendar" size={16} />
            最低契約期間 {nikoniko.minMonths}か月・年払いのみ
          </p>
        </Reveal>

        <div className="niko__side">
          <Reveal className="niko__item" delay={120}>
            <span className="niko__item-label">初期制作費</span>
            <span className="niko__item-value">
              {yen(nikoniko.initial)}
              <small>円{TAX}</small>
            </span>
          </Reveal>
          <Reveal className="niko__item niko__item--best" delay={200}>
            <span className="niko__item-label">
              年間管理・運用費
              <em>
                月額換算 {yen(monthlyEquivalent)}円・お支払いは年1回
              </em>
            </span>
            <span className="niko__item-value">
              {yen(nikoniko.annual)}
              <small>円／年{TAX}</small>
            </span>
          </Reveal>
          <Reveal className="niko__item" delay={280}>
            <span className="niko__item-label">
              初年度総額
              <em>2年目以降は年間 {yen(laterYears)}円</em>
            </span>
            <span className="niko__item-value">
              {yen(firstYearTotal)}
              <small>円{TAX}</small>
            </span>
          </Reveal>
          <Reveal className="niko__desc" delay={340}>
            <p>
              初期費用を抑えてホームページを持ち、年間管理・運用費で公開後の軽微な修正に回数制限なく対応するプランです。お支払いは年払いのみ（年1回）です。
            </p>
            <Link to="/nikoniko#scope" className="text-link">
              修正範囲・契約条件を見る <Icon name="arrow" size={16} />
            </Link>
          </Reveal>
        </div>
      </div>

      {showIncludes && (
        <div className="includes">
          <Reveal as="h3" className="includes__title">
            ニコニコプランに含まれる内容
          </Reveal>
          <ul className="includes__grid">
            {nikonikoIncludes.map((it, i) => (
              <Reveal as="li" key={it.title} className="include spot" delay={(i % 4) * 80}>
                <span className="include__icon">
                  <Icon name={it.icon} size={22} />
                </span>
                <b>{it.title}</b>
                <span>{it.text}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
