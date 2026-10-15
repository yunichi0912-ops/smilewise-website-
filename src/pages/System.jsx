import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import Icon from '../components/Icon.jsx';
import CtaSection from '../components/CtaSection.jsx';
import CountUp from '../components/CountUp.jsx';
import { systemPrice, yen, TAX } from '../data/pricing.js';
import SystemMockup from '../components/SystemMockup.jsx';
import BeforeAfter from '../components/BeforeAfter.jsx';
import {
  systemFeatures,
  systemProblems,
  industries,
  systemFlow,
  systemFaq,
} from '../data/system.js';

const ContactButton = ({ children = 'システム導入を無料で相談する', variant = 'primary' }) => (
  <Link to="/contact?type=system" className={`btn btn--${variant} btn--lg`}>
    <Icon name="mail" size={20} />
    {children}
    <Icon name="arrow" size={18} />
  </Link>
);

export default function System() {
  return (
    <>
      {/* ヒーロー */}
      <section className="sys-hero">
        <div className="sys-hero__bg" aria-hidden="true" />
        <div className="container sys-hero__inner">
          <div className="sys-hero__text">
            <nav className="breadcrumb breadcrumb--light" aria-label="パンくずリスト">
              <ol>
                <li>
                  <Link to="/">ホーム</Link>
                </li>
                <li>業務管理システム開発・導入</li>
              </ol>
            </nav>
            <p className="sys-hero__label">業務管理システム開発・導入</p>
            <h1 className="sys-hero__title">
              <span className="nw">バラバラの</span>
              <span className="nw">Excel管理から、</span>
              <br />
              <span className="nw">ひとつの</span>
              <span className="nw">システムへ。</span>
            </h1>
            <p className="sys-hero__lead">
              <span className="nw">会社に合わせた、</span>
              <span className="nw">使いやすい業務管理システムを</span>
              <span className="nw">制作します。</span>
            </p>
            <p className="sys-hero__sub">
              北九州市を中心とした建設業・製造業・中小企業の皆さまへ。
              見積・請求、顧客、案件・工事の進捗、売上・入金の管理をひとつにまとめ、
              日々の業務をもっとスムーズにします。
            </p>
            <div className="sys-hero__actions">
              <ContactButton variant="white" />
              <a href="#price" className="sys-hero__price">
                <span>導入費用</span>
                <strong>
                  {yen(systemPrice.from)}
                  <small>円〜{TAX}</small>
                </strong>
                <em>個別見積もり</em>
              </a>
            </div>
          </div>
          <Reveal className="sys-hero__visual" variant="right" delay={200}>
            <SystemMockup compact />
          </Reveal>
        </div>
      </section>

      {/* お悩み */}
      <section className="section">
        <div className="container">
          <SectionTitle en="Problem" lead="ひとつでも当てはまったら、業務管理システムで解決できるかもしれません。">
            こんなお悩みはありませんか？
          </SectionTitle>
          <ul className="problem-list">
            {systemProblems.map((p, i) => (
              <Reveal as="li" key={p} className="problem-list__item" delay={(i % 3) * 80}>
                <span className="problem-list__check" aria-hidden="true">
                  <Icon name="check" size={18} strokeWidth={2.2} />
                </span>
                {p}
              </Reveal>
            ))}
          </ul>
          <Reveal className="problem-answer">
            <p>
              その「手間」と「不安」、
              <strong>会社に合わせたシステム</strong>
              でまとめて解決しませんか。
            </p>
          </Reveal>
        </div>
      </section>

      {/* 導入前・導入後 */}
      <section className="section section--tint">
        <div className="container">
          <SectionTitle en="Before / After" lead="Excelやファイルでの管理を、ひとつのシステムに置き換えると、こう変わります。">
            導入前と導入後の比較
          </SectionTitle>
          <BeforeAfter />
          <Reveal className="center mt-l">
            <ContactButton>自社の場合を相談してみる</ContactButton>
          </Reveal>
        </div>
      </section>

      {/* 対応システム */}
      <section className="section" id="features">
        <div className="container">
          <SectionTitle en="Lineup" lead="必要な機能だけを選んで、組み合わせて導入できます。">
            制作できる業務管理システム
          </SectionTitle>
          <div className="feature-grid">
            {systemFeatures.map((f, i) => (
              <Reveal key={f.title} className="feature-card spot" delay={(i % 3) * 100}>
                <span className="feature-card__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="feature-card__icon">
                  <Icon name={f.icon} size={32} />
                </span>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__text">{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 画面イメージ */}
      <section className="section section--tint screen-section">
        <div className="container">
          <SectionTitle en="Screen Image" lead="事務所ではパソコンで、現場や外出先ではスマートフォンで。同じ情報にどこからでもアクセスできます。">
            パソコンでも、スマホでも。
          </SectionTitle>
          <Reveal>
            <SystemMockup />
          </Reveal>
          <div className="screen-points">
            {[
              { icon: 'monitor', title: '事務所ではパソコンで', text: '見積・請求書の作成や、売上の集計など、細かな作業は大きな画面で。' },
              { icon: 'phone', title: '現場ではスマートフォンで', text: '工事の進み具合や、顧客情報の確認・更新を外出先からその場で。' },
              { icon: 'people', title: '社内で同じ情報を共有', text: 'ファイルの送り合いは不要。全員が常に最新の情報を確認できます。' },
            ].map((p, i) => (
              <Reveal key={p.title} className="screen-point" delay={i * 100}>
                <Icon name={p.icon} size={28} />
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 対象業種 */}
      <section className="section">
        <div className="container">
          <SectionTitle en="Industry" lead="北九州市を中心とした、地域の企業の業務に寄り添います。">
            このような企業におすすめです
          </SectionTitle>
          <div className="industry-grid">
            {industries.map((ind, i) => (
              <Reveal key={ind.title} className="industry-card spot" delay={i * 120}>
                <span className="industry-card__icon">
                  <Icon name={ind.icon} size={36} />
                </span>
                <h3>{ind.title}</h3>
                <ul>
                  {ind.items.map((it) => (
                    <li key={it}>
                      <Icon name="check" size={16} strokeWidth={2} />
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 料金 */}
      <section className="section section--tint" id="price">
        <div className="container">
          <SectionTitle en="Price">導入費用</SectionTitle>
          <Reveal className="sys-price spot">
            <div className="sys-price__main">
              <p className="sys-price__name">業務管理システム開発・導入</p>
              <p className="sys-price__amount">
                <CountUp value={systemPrice.from} />
                <span>円〜</span>
              </p>
              <p className="sys-price__ref">税込・個別見積もり</p>
            </div>
            <div className="sys-price__body">
              <p>
                必要な機能や規模、データ移行の量などによって費用が変わるため、
                <strong>ヒアリングのうえ個別にお見積り</strong>いたします。
              </p>
              <ul>
                <li>
                  <Icon name="check" size={16} strokeWidth={2} />
                  ご相談・お見積りは無料です
                </li>
                <li>
                  <Icon name="check" size={16} strokeWidth={2} />
                  小さな機能から始めて、段階的に拡張することも可能です
                </li>
                <li>
                  <Icon name="check" size={16} strokeWidth={2} />
                  お見積り内容は、機能ごとの内訳までご説明します
                </li>
              </ul>
              <ContactButton>無料でお見積りを依頼する</ContactButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 流れ */}
      <section className="section">
        <div className="container">
          <SectionTitle en="Flow">導入までの流れ</SectionTitle>
          <ol className="vflow">
            {systemFlow.map((f, i) => (
              <Reveal as="li" key={f.title} className="vflow__item" delay={i * 60}>
                <span className="vflow__step">
                  STEP
                  <b>{String(i + 1).padStart(2, '0')}</b>
                </span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--tint">
        <div className="container container--narrow">
          <SectionTitle en="FAQ">よくあるご質問</SectionTitle>
          <div className="faq">
            {systemFaq.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="faq__item">
                  <summary>
                    <span className="faq__q">Q</span>
                    {f.q}
                  </summary>
                  <div className="faq__a">
                    <span className="faq__a-mark">A</span>
                    <p>{f.a}</p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        type="system"
        title="バラバラの管理を、ひとつに。"
        text="「今のExcelをどうにかしたい」「何をシステム化できるか知りたい」という段階からご相談いただけます。現在お使いのファイルを拝見しながら、最適な形をご提案します。"
      />
    </>
  );
}
