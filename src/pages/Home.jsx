import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import Icon from '../components/Icon.jsx';
import CtaSection from '../components/CtaSection.jsx';
import SystemMockup from '../components/SystemMockup.jsx';
import BeforeAfter from '../components/BeforeAfter.jsx';
import WorksList from '../components/WorksList.jsx';
import { services, formatPrice } from '../data/services.js';
import { site } from '../data/site.js';

const strengths = [
  {
    num: '01',
    title: '地元・北九州で、顔の見える対応',
    text: '北九州市を中心に、直接お会いしてのご相談にも対応します。地域の事情を踏まえたご提案を心がけています。',
  },
  {
    num: '02',
    title: 'Web・デザイン・システムをワンストップで',
    text: 'ホームページ、印刷物、ロゴ、業務システムまで。窓口をひとつにまとめることで、やりとりの手間と統一感のズレをなくします。',
  },
  {
    num: '03',
    title: 'わかりやすい言葉と、明確な料金',
    text: '専門用語をできるだけ使わずにご説明します。料金の目安を公開し、正式なお見積りでは内訳までご提示します。',
  },
];

const flow = [
  { title: 'お問い合わせ', text: 'フォームからお気軽にご連絡ください。' },
  { title: 'ヒアリング', text: 'ご要望や現状の課題をお聞きします。' },
  { title: 'ご提案・お見積り', text: '内容と費用を明確にご提示します。' },
  { title: '制作・開発', text: '確認を重ねながら丁寧に進めます。' },
  { title: '公開・納品', text: '公開後・導入後のサポートも承ります。' },
];

export default function Home() {
  const mainServices = services.filter((s) => s.id !== 'maintenance');

  return (
    <>
      {/* ヒーロー */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <span className="hero__circle hero__circle--1" />
          <span className="hero__circle hero__circle--2" />
          <span className="hero__line" />
        </div>
        <div className="container hero__inner">
          <p className="hero__en">Kitakyushu Web Design &amp; Business System</p>
          <h1 className="hero__title">
            <span className="hero__title-line">伝わるデザインと、</span>
            <span className="hero__title-line">はかどる仕組みを。</span>
          </h1>
          <p className="hero__lead">
            北九州市を中心に、ホームページ制作・デザイン制作から
            <br className="pc-only" />
            業務管理システムの開発・導入まで。
            <br className="pc-only" />
            企業の「信頼」と「効率」を、かたちにします。
          </p>
          <div className="hero__actions">
            <Link to="/contact" className="btn btn--primary btn--lg">
              無料相談・お見積り
              <Icon name="arrow" size={18} />
            </Link>
            <Link to="/services" className="btn btn--ghost btn--lg">
              サービスを見る
            </Link>
          </div>
        </div>
        <div className="hero__scroll" aria-hidden="true">
          <span>Scroll</span>
        </div>
      </section>

      {/* コンセプト */}
      <section className="section concept">
        <div className="container concept__inner">
          <Reveal className="concept__text">
            <p className="eyebrow">About us</p>
            <h2 className="concept__title">
              地域の企業に、
              <br />
              もうひとつの「頼れる窓口」を。
            </h2>
            <p>
              {site.name}は、{site.area}を拠点にWeb制作・デザイン・業務管理システム開発を行っています。
              会社の顔となるホームページや印刷物はもちろん、日々の事務作業を支える業務システムまで、
              企業の成長に必要な「伝える力」と「仕組み」をまとめてご提供します。
            </p>
            <Link to="/about" className="text-link">
              事業概要を見る
              <Icon name="arrow" size={16} />
            </Link>
          </Reveal>
          <div className="concept__strengths">
            {strengths.map((s, i) => (
              <Reveal key={s.num} className="strength" delay={i * 120}>
                <span className="strength__num">{s.num}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* サービス */}
      <section className="section section--tint">
        <div className="container">
          <SectionTitle en="Service" lead="Web・デザイン・業務システムまで、企業の課題にあわせてご提案します。">
            サービス紹介
          </SectionTitle>
          <div className="service-grid">
            {mainServices.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 100}>
                <Link
                  to={s.href ?? `/services#${s.id}`}
                  className={`service-card${s.featured ? ' service-card--featured' : ''}`}
                >
                  {s.featured && <span className="service-card__badge">NEW</span>}
                  <span className="service-card__icon">
                    <Icon name={s.icon} size={30} />
                  </span>
                  <span className="service-card__en">{s.en}</span>
                  <h3 className="service-card__title">{s.title}</h3>
                  <p className="service-card__text">{s.lead}</p>
                  <span className="service-card__price">{formatPrice(s)}</span>
                  <span className="service-card__more">
                    詳しく見る <Icon name="arrow" size={16} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 業務管理システム紹介 */}
      <section className="section system-intro">
        <div className="system-intro__bg" aria-hidden="true" />
        <div className="container">
          <div className="system-intro__head">
            <Reveal className="system-intro__text">
              <p className="eyebrow eyebrow--light">Business System</p>
              <p className="system-intro__label">業務管理システム開発・導入</p>
              <h2 className="system-intro__title">
                <span className="nw">バラバラの</span>
                <span className="nw">Excel管理から、</span>
                <br />
                <span className="nw">ひとつの</span>
                <span className="nw">システムへ。</span>
              </h2>
              <p className="system-intro__lead">
                会社に合わせた、使いやすい業務管理システムを制作します。
                <br className="pc-only" />
                見積書・請求書、顧客、案件・工事の進捗、売上・入金までをひとつにまとめ、
                北九州市の建設業・製造業・中小企業の業務効率化を支援します。
              </p>
              <ul className="system-intro__tags">
                <li>見積・請求</li>
                <li>顧客・取引先</li>
                <li>案件・工事進捗</li>
                <li>売上・入金</li>
                <li>Excel移行</li>
                <li>オーダーメイド</li>
              </ul>
            </Reveal>
            <Reveal className="system-intro__visual" delay={150} variant="right">
              <SystemMockup compact />
            </Reveal>
          </div>

          <Reveal className="system-intro__compare">
            <h3 className="system-intro__subtitle">導入前と導入後</h3>
            <BeforeAfter limit={3} />
          </Reveal>

          <Reveal className="system-intro__actions">
            <Link to="/system" className="btn btn--white btn--lg">
              業務管理システムについて詳しく
              <Icon name="arrow" size={18} />
            </Link>
            <Link to="/contact?type=system" className="btn btn--outline-light btn--lg">
              システム導入を相談する
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 制作実績 */}
      <section className="section">
        <div className="container">
          <SectionTitle en="Works">制作実績</SectionTitle>
          <WorksList limit={3} />
          <Reveal className="center mt-l">
            <Link to="/works" className="btn btn--outline">
              制作実績一覧へ
              <Icon name="arrow" size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 料金 */}
      <section className="section section--tint">
        <div className="container">
          <SectionTitle en="Price" lead="料金の目安を公開しています。内容に応じて、正式なお見積りをご提示します。">
            料金案内
          </SectionTitle>
          <div className="price-summary">
            {services
              .filter((s) => s.price != null)
              .map((s, i) => (
                <Reveal key={s.id} className="price-summary__item" delay={i * 100}>
                  <p className="price-summary__name">{s.title}</p>
                  <p className="price-summary__price">
                    {s.price.toLocaleString('ja-JP')}
                    <span>円{s.priceSuffix}</span>
                  </p>
                  {s.priceNote && <p className="price-summary__note">{s.priceNote}</p>}
                </Reveal>
              ))}
          </div>
          <Reveal className="center mt-l">
            <Link to="/pricing" className="btn btn--outline">
              料金の詳細を見る
              <Icon name="arrow" size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 流れ */}
      <section className="section">
        <div className="container">
          <SectionTitle en="Flow">ご依頼の流れ</SectionTitle>
          <ol className="flow">
            {flow.map((f, i) => (
              <Reveal as="li" key={f.title} className="flow__item" delay={i * 100}>
                <span className="flow__step">STEP {String(i + 1).padStart(2, '0')}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
