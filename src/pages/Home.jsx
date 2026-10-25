import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import Icon from '../components/Icon.jsx';
import Hero from '../components/Hero.jsx';
import CountUp from '../components/CountUp.jsx';
import CtaSection from '../components/CtaSection.jsx';
import SystemMockup from '../components/SystemMockup.jsx';
import BeforeAfter from '../components/BeforeAfter.jsx';
import WorksList from '../components/WorksList.jsx';
import NikonikoFeature from '../components/NikonikoFeature.jsx';
import PaymentToggle from '../components/PaymentToggle.jsx';
import ServiceGrid from '../components/ServiceGrid.jsx';
import FaqList from '../components/FaqList.jsx';
import DiagnosisBanner from '../components/DiagnosisBanner.jsx';
import { systemPrice, annualSaving, yen, TAX } from '../data/pricing.js';
import { nikonikoFaq } from '../data/faq.js';
import { reasons } from '../data/reasons.js';

export default function Home() {
  return (
    <>
      {/* 1. ファーストビュー */}
      <Hero />

      {/* 2. ニコニコプラン */}
      <section className="section section--niko" id="nikoniko">
        <div className="container">
          <SectionTitle en="Main Service 01" lead="初期費用を抑えて、本格的なホームページを。公開後の軽微な修正は、管理費の範囲で回数制限なく対応します。">
            ホームページ制作「ニコニコプラン」
          </SectionTitle>
          <NikonikoFeature />
        </div>
      </section>

      {/* 3. お支払い（月払い・年払い） */}
      <section className="section section--tint">
        <div className="container container--mid">
          <SectionTitle en="Payment" lead={`管理費のお支払いは、月払い・年払いからお選びいただけます。年払いなら年間${yen(annualSaving)}円お得です。`}>
            月払い・年払いと初年度総額
          </SectionTitle>
          <PaymentToggle methodsLink="/nikoniko#methods" />
        </div>
      </section>

      {/* 4. 業務管理システム */}
      <section className="section dark-section">
        <div className="dark-section__bg" aria-hidden="true" />
        <div className="container">
          <div className="sysx">
            <div className="sysx__text">
              <Reveal as="p" className="tag-light">
                Main Service 02
              </Reveal>
              <Reveal as="h2" className="sysx__title" variant="mask" delay={80}>
                <span className="nw">バラバラの</span>
                <span className="nw">Excel管理から、</span>
                <br />
                <span className="nw">ひとつの</span>
                <span className="nw grad-text-light">システムへ。</span>
              </Reveal>
              <Reveal as="p" className="sysx__lead" delay={160}>
                会社に合わせた、使いやすい業務管理システムを制作します。
                見積書・請求書、顧客、案件・工事の進捗、売上・入金までをひとつにまとめ、
                北九州市の建設業・製造業・中小企業の業務効率化（DX）を支援します。
              </Reveal>
              <Reveal className="sysx__price" delay={220}>
                <span className="sysx__price-label">業務管理システム開発・導入</span>
                <span className="sysx__price-value">
                  <CountUp value={systemPrice.from} />
                  <small>円〜{TAX}</small>
                </span>
                <span className="sysx__price-note">{systemPrice.note}</span>
              </Reveal>
            </div>
            <Reveal className="sysx__visual" variant="right" delay={150}>
              <SystemMockup compact />
            </Reveal>
          </div>

          <Reveal className="glass-panel">
            <h3 className="glass-panel__title">導入前と導入後</h3>
            <BeforeAfter limit={3} />
          </Reveal>

          <Reveal className="btn-row" delay={100}>
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

      {/* 5. サービス一覧 */}
      <section className="section">
        <div className="container">
          <SectionTitle en="Services" lead="Web・デザイン・業務システムまで、企業の課題にあわせてワンストップでご提案します。">
            サービス一覧
          </SectionTitle>
          <ServiceGrid />
        </div>
      </section>

      {/* 6. 選ばれる理由 */}
      <section className="section section--tint">
        <div className="container">
          <SectionTitle en="Why SmileWise">SmileWiseが選ばれる理由</SectionTitle>
          <div className="reasons">
            {reasons.map((r, i) => (
              <Reveal key={r.title} className="reason spot" delay={(i % 2) * 120}>
                <span className="reason__icon">
                  <Icon name={r.icon} size={26} />
                </span>
                <span className="reason__no">Reason {String(i + 1).padStart(2, '0')}</span>
                <h3 className="reason__title">{r.title}</h3>
                <p className="reason__text">{r.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. 制作実績 */}
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

      {/* よくある質問 */}
      <section className="section section--tint">
        <div className="container container--narrow">
          <SectionTitle en="FAQ">ニコニコプランのよくある質問</SectionTitle>
          <FaqList items={nikonikoFaq.slice(0, 4)} />
          <Reveal className="center mt-l">
            <Link to="/nikoniko#faq" className="btn btn--outline">
              よくある質問をすべて見る
              <Icon name="arrow" size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <DiagnosisBanner />

      {/* 8. お問い合わせ */}
      <CtaSection />
    </>
  );
}
