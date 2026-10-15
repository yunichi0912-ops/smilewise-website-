import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import CountUp from './CountUp.jsx';
import { nikoniko, systemPrice, monthlyEquivalent, yen, TAX } from '../data/pricing.js';

/**
 * トップページのファーストビュー
 * 動くグラデーション背景 ＋ 奥行きのあるガラス調カード（PCではマウスに合わせて立体的に傾く）
 */
export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const fine = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!el || !fine || reduce) return undefined;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        el.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
    };
    el.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      el.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" ref={ref}>
      <div className="hero__bg" aria-hidden="true">
        <span className="blob blob--1" />
        <span className="blob blob--2" />
        <span className="blob blob--3" />
        <span className="hero__grid" />
        <span className="hero__noise" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span className="pulse" aria-hidden="true" />
            Web &amp; DX Partner in Kitakyushu
          </p>
          <h1 className="hero__title">
            <span className="hero__line">
              <span>伝わるデザインと、</span>
            </span>
            <span className="hero__line">
              <span className="grad-text">はかどる仕組みを。</span>
            </span>
          </h1>
          <p className="hero__lead">
            北九州市のホームページ制作・IT/DX支援。
            <span className="nw">初期費用を抑えた「{nikoniko.name}」で、</span>
            地域企業のWeb活用を始めませんか。
          </p>

          <Link to="/nikoniko" className="price-plate spot">
            <span className="price-plate__head">
              <span className="price-plate__plan">ホームページ制作「{nikoniko.name}」</span>
              <span className="price-plate__label">初期制作費</span>
            </span>
            <span className="price-plate__price">
              <CountUp value={nikoniko.initial} duration={1800} />
              <span className="price-plate__yen">
                円<small>{TAX}</small>
              </span>
            </span>
            <span className="price-plate__meta">
              <span>
                年間管理・運用費 <b>{yen(nikoniko.annual)}円</b>
                {TAX}
              </span>
              <span>
                月額換算 <b>{yen(monthlyEquivalent)}円</b>（お支払いは年1回）
              </span>
              <span>
                最低契約期間 <b>{nikoniko.minMonths}か月</b>
              </span>
            </span>
          </Link>

          <div className="hero__actions">
            <Link to="/contact?type=web" className="btn btn--primary btn--lg">
              無料で相談する
              <Icon name="arrow" size={18} />
            </Link>
            <Link to="/nikoniko" className="btn btn--glass btn--lg">
              ニコニコプランを見る
            </Link>
          </div>
        </div>

        <div className="hero__stage" aria-hidden="true">
          <div className="stage">
            <div className="ring" />
            <div className="glass glass--plan">
              <p className="glass__label">
                <Icon name="monitor" size={14} /> {nikoniko.name}に含まれる内容
              </p>
              <ul className="glass__list">
                <li>最大{nikoniko.maxPages}ページ制作</li>
                <li>スマートフォン対応</li>
                <li>基本SEO設定</li>
                <li>軽微な修正は回数制限なし</li>
              </ul>
              <div className="glass__bar">
                <i />
              </div>
              <p className="glass__foot">お支払いは年払いのみ（年1回）</p>
            </div>
            <div className="glass glass--dash">
              <p className="glass__label">
                <Icon name="system" size={14} /> 業務管理システム
              </p>
              <div className="mini-kpis">
                <span>
                  <em>進行中の案件</em>
                  <b>12</b>
                </span>
                <span>
                  <em>入金待ち</em>
                  <b>3</b>
                </span>
              </div>
              <div className="mini-chart">
                {[38, 52, 46, 64, 58, 80, 72].map((h, i) => (
                  <i key={i} style={{ height: `${h}%`, '--i': i }} />
                ))}
              </div>
              <p className="glass__note">画面イメージ</p>
            </div>
            <div className="glass glass--chip">
              <Icon name="check" size={16} strokeWidth={2.2} />
              Excel → ひとつのシステムへ
            </div>
          </div>
        </div>
      </div>

      <div className="container hero__cards">
        <Link to="/nikoniko" className="hero-card spot">
          <span className="hero-card__tag">Main Service 01</span>
          <span className="hero-card__title">ホームページ制作 {nikoniko.name}</span>
          <span className="hero-card__price">
            初期制作費 <b>{yen(nikoniko.initial)}</b>円{TAX}
          </span>
          <Icon name="arrow" size={20} className="hero-card__arrow" />
        </Link>
        <Link to="/system" className="hero-card spot">
          <span className="hero-card__tag">Main Service 02</span>
          <span className="hero-card__title">業務管理システム開発・導入</span>
          <span className="hero-card__price">
            <b>{yen(systemPrice.from)}</b>円〜{TAX} <small>個別見積もり</small>
          </span>
          <Icon name="arrow" size={20} className="hero-card__arrow" />
        </Link>
      </div>
    </section>
  );
}
