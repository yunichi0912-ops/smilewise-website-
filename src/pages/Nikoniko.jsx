import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import Icon from '../components/Icon.jsx';
import CtaSection from '../components/CtaSection.jsx';
import NikonikoFeature from '../components/NikonikoFeature.jsx';
import PaymentToggle from '../components/PaymentToggle.jsx';
import PageOptions from '../components/PageOptions.jsx';
import FixScope from '../components/FixScope.jsx';
import ContractTerms from '../components/ContractTerms.jsx';
import FaqList from '../components/FaqList.jsx';
import DiagnosisBanner from '../components/DiagnosisBanner.jsx';
import { nikonikoFaq } from '../data/faq.js';
import { nikoniko, firstYearTotal, annualSaving, yen } from '../data/pricing.js';

const toc = [
  { id: 'plan', label: 'プラン内容' },
  { id: 'payment', label: 'お支払い' },
  { id: 'options', label: 'ページ追加' },
  { id: 'scope', label: '修正の範囲' },
  { id: 'contract', label: '契約条件' },
  { id: 'faq', label: 'よくある質問' },
];

export default function Nikoniko() {
  return (
    <>
      <PageHero
        en="Nikoniko Plan"
        title="ニコニコプラン"
        lead={`初期制作費${yen(nikoniko.initial)}円・初年度総額${yen(firstYearTotal)}円（税込）で始めるホームページ制作プラン。管理費は月払い（${yen(nikoniko.monthly)}円／月）・年払い（${yen(nikoniko.annual)}円／年）から選べます。公開後はサーバー・ドメイン管理、保守・サポート、軽微な修正に対応します。`}
        crumbs={['ニコニコプラン']}
      />

      <section className="section section--niko" id="plan">
        <div className="container">
          <nav className="chip-nav chip-nav--tight" aria-label="ページ内の項目">
            {toc.map((t) => (
              <a key={t.id} href={`#${t.id}`} className="chip-nav__item">
                {t.label}
              </a>
            ))}
          </nav>
          <NikonikoFeature />
        </div>
      </section>

      <section className="section section--tint" id="payment">
        <div className="container container--mid">
          <SectionTitle en="Payment" lead={`月払い・年払いを切り替えて、初年度総額を確認できます。年払いなら年間${yen(annualSaving)}円お得です。`}>
            管理費とお支払い
          </SectionTitle>
          <PaymentToggle />
        </div>
      </section>

      <section className="section" id="options">
        <div className="container container--mid">
          <SectionTitle en="Page Option">
            ページ追加オプション
          </SectionTitle>
          <PageOptions />
        </div>
      </section>

      <section className="section" id="scope">
        <div className="container container--mid">
          <SectionTitle en="Update" lead="定められた範囲内の軽微な修正に、回数制限なく対応します。">
            無料修正の範囲と別途お見積り
          </SectionTitle>
          <FixScope />
        </div>
      </section>

      <section className="section section--tint" id="contract">
        <div className="container container--narrow">
          <SectionTitle en="Contract">ご契約条件</SectionTitle>
          <ContractTerms />
          <Reveal className="center mt-l">
            <Link to="/pricing" className="btn btn--outline">
              すべての料金を見る
              <Icon name="arrow" size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container container--narrow">
          <SectionTitle en="FAQ">ニコニコプランのよくある質問</SectionTitle>
          <FaqList items={nikonikoFaq} />
        </div>
      </section>

      <DiagnosisBanner />

      <CtaSection type="web" title="ニコニコプランで、ホームページを始めませんか。" text="「どんなページを作れるか知りたい」「費用の詳細を聞きたい」など、お気軽にご相談ください。ご相談・お見積りは無料です。" />
    </>
  );
}
