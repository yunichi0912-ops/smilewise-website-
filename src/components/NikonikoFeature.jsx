import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import CountUp from './CountUp.jsx';
import { nikoniko, nikonikoIncludes, yen } from '../data/pricing.js';

/** ニコニコプラン（初期制作費 2,525円）の大きな紹介ブロック */
export default function NikonikoFeature() {
  return (
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
          <span className="niko__yen">円</span>
        </p>
        <p className="niko__pun">ニコ・ニコ ＝ 2,525。笑顔で始められるホームページ制作プランです。</p>
      </Reveal>

      <div className="niko__side">
        <Reveal className="niko__item" delay={120}>
          <span className="niko__item-label">初期制作費</span>
          <span className="niko__item-value">
            {yen(nikoniko.initial)}
            <small>円</small>
          </span>
        </Reveal>
        <Reveal className="niko__item" delay={200}>
          <span className="niko__item-label">月額管理費</span>
          <span className="niko__item-value">
            {yen(nikoniko.monthly)}
            <small>円／月</small>
          </span>
        </Reveal>
        <Reveal className="niko__item niko__item--best" delay={280}>
          <span className="niko__item-label">
            年払い <em>{yen(nikoniko.monthly * 12 - nikoniko.yearly)}円お得</em>
          </span>
          <span className="niko__item-value">
            {yen(nikoniko.yearly)}
            <small>円／年</small>
          </span>
        </Reveal>
        <Reveal className="niko__desc" delay={340}>
          {nikonikoIncludes.length > 0 ? (
            <ul className="check-list">
              {nikonikoIncludes.map((t) => (
                <li key={t}>
                  <Icon name="check" size={16} strokeWidth={2} />
                  {t}
                </li>
              ))}
            </ul>
          ) : (
            <p>初期費用を抑えてホームページを持ち、月々の管理費で公開後も継続してお付き合いするプランです。プランの内容・ご契約条件の詳細は、お問い合わせの際にご説明します。</p>
          )}
        </Reveal>
      </div>
    </div>
  );
}
