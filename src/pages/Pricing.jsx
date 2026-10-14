import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import Icon from '../components/Icon.jsx';
import CountUp from '../components/CountUp.jsx';
import CtaSection from '../components/CtaSection.jsx';
import NikonikoFeature from '../components/NikonikoFeature.jsx';
import PlanCompare from '../components/PlanCompare.jsx';
import FixScope from '../components/FixScope.jsx';
import FaqList from '../components/FaqList.jsx';
import { services } from '../data/services.js';
import { nikonikoFaq } from '../data/faq.js';
import {
  nikoniko,
  yearlySaving,
  firstYearMonthly,
  firstYearYearly,
  contractTerms,
  systemPrice,
  yen,
  TAX,
} from '../data/pricing.js';

const toc = [
  { id: 'nikoniko', label: 'ニコニコプラン' },
  { id: 'payment', label: '月払い・年払い' },
  { id: 'scope', label: '修正の範囲' },
  { id: 'contract', label: '契約条件' },
  { id: 'system', label: '業務管理システム' },
  { id: 'faq', label: 'よくある質問' },
];

export default function Pricing() {
  const others = services.filter((s) => !s.featured);

  return (
    <>
      <PageHero
        en="Price"
        title="料金案内"
        lead="ホームページ制作は「ニコニコプラン」、業務の効率化は業務管理システムで。表示価格はすべて税込です。"
        crumbs={['料金案内']}
      />

      {/* 料金サマリー */}
      <section className="section section--tight">
        <div className="container">
          <nav className="chip-nav chip-nav--tight" aria-label="ページ内の項目">
            {toc.map((t) => (
              <a key={t.id} href={`#${t.id}`} className="chip-nav__item">
                {t.label}
              </a>
            ))}
          </nav>
          <div className="price-overview">
            <Reveal className="po spot">
              <span className="po__tag">ホームページ制作</span>
              <p className="po__name">{nikoniko.name}</p>
              <dl className="po__list">
                <div>
                  <dt>初期ホームページ制作費</dt>
                  <dd>
                    <b>{yen(nikoniko.initial)}</b>円{TAX}
                  </dd>
                </div>
                <div>
                  <dt>月額管理費</dt>
                  <dd>
                    <b>{yen(nikoniko.monthly)}</b>円／月{TAX}
                  </dd>
                </div>
                <div>
                  <dt>年払い</dt>
                  <dd>
                    <b>{yen(nikoniko.yearly)}</b>円／年{TAX}
                    <em>{yen(yearlySaving)}円お得</em>
                  </dd>
                </div>
                <div>
                  <dt>最低契約期間</dt>
                  <dd>
                    <b>{nikoniko.minMonths}</b>か月
                  </dd>
                </div>
              </dl>
              <p className="po__total">
                初年度総額{TAX}：月払い <b>{yen(firstYearMonthly)}円</b>／年払い <b>{yen(firstYearYearly)}円</b>
              </p>
              <a href="#nikoniko" className="text-link">
                プラン内容を見る <Icon name="arrow" size={16} />
              </a>
            </Reveal>
            <Reveal className="po po--dark spot" delay={120}>
              <span className="po__tag">業務管理システム開発・導入</span>
              <p className="po__name">オーダーメイド</p>
              <p className="po__big">
                <CountUp value={systemPrice.from} />
                <small>円〜{TAX}</small>
              </p>
              <p className="po__note">{systemPrice.note}</p>
              <a href="#system" className="text-link text-link--light">
                詳細を見る <Icon name="arrow" size={16} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ニコニコプラン */}
      <section className="section section--niko" id="nikoniko">
        <div className="container">
          <SectionTitle en="Website" lead="初期費用を抑えて、本格的なホームページを。公開後の維持管理と軽微な修正まで、月額管理費でお任せいただけます。">
            ホームページ制作「ニコニコプラン」
          </SectionTitle>
          <NikonikoFeature />
        </div>
      </section>

      <section className="section section--tint" id="payment">
        <div className="container container--mid">
          <SectionTitle en="Monthly / Yearly" lead="管理費は月払い・年払いからお選びいただけます。">
            月払い・年払いの比較
          </SectionTitle>
          <PlanCompare />
        </div>
      </section>

      {/* 修正範囲 */}
      <section className="section" id="scope">
        <div className="container container--mid">
          <SectionTitle en="Update" lead="ニコニコプランでは、軽微な修正に回数制限なく対応します。">
            無料修正の範囲と別途お見積り
          </SectionTitle>
          <FixScope />
        </div>
      </section>

      {/* 契約条件 */}
      <section className="section section--tint" id="contract">
        <div className="container container--narrow">
          <SectionTitle en="Contract">ご契約条件</SectionTitle>
          <Reveal>
            <dl className="terms">
              {contractTerms.decided.map((t) => (
                <div key={t.label} className="terms__row">
                  <dt>{t.label}</dt>
                  <dd>{t.value}</dd>
                </div>
              ))}
              <div className="terms__row">
                <dt>料金</dt>
                <dd>
                  初期ホームページ制作費 {yen(nikoniko.initial)}円／月額管理費 {yen(nikoniko.monthly)}円（年払い{' '}
                  {yen(nikoniko.yearly)}円）
                  <small>表示価格はすべて税込です。</small>
                </dd>
              </div>
              <div className="terms__row">
                <dt>その他の条件</dt>
                <dd>{contractTerms.pendingNote}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* 業務管理システム */}
      <section className="section" id="system">
        <div className="container">
          <SectionTitle en="Business System">業務管理システム開発・導入</SectionTitle>
          <Reveal className="sys-price spot">
            <div className="sys-price__main">
              <p className="sys-price__name">業務管理システム開発・導入</p>
              <p className="sys-price__amount">
                <CountUp value={systemPrice.from} />
                <span>円〜</span>
              </p>
              <p className="sys-price__ref">税込・参考価格</p>
            </div>
            <div className="sys-price__body">
              <p>
                必要な機能や規模、データ移行の量などによって費用が変わるため、
                <strong>ヒアリングのうえ個別にお見積り</strong>いたします。
              </p>
              <ul className="check-list">
                <li>
                  <Icon name="check" size={16} strokeWidth={2} />
                  見積書・請求書／顧客・取引先／案件・工事進捗／売上・入金 などの管理
                </li>
                <li>
                  <Icon name="check" size={16} strokeWidth={2} />
                  Excelデータの移行・一元管理
                </li>
                <li>
                  <Icon name="check" size={16} strokeWidth={2} />
                  ご相談・お見積りは無料です
                </li>
              </ul>
              <div className="btn-row btn-row--left">
                <Link to="/system" className="btn btn--outline">
                  サービス内容を見る
                </Link>
                <Link to="/contact?type=system" className="btn btn--primary">
                  お見積りを依頼する
                  <Icon name="arrow" size={16} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* その他 */}
      <section className="section section--tint">
        <div className="container container--narrow">
          <SectionTitle en="Other" lead="内容・数量・仕様によって費用が異なるため、個別にお見積りいたします。">
            その他のサービス
          </SectionTitle>
          <Reveal className="table-wrap">
            <table className="price-table">
              <thead>
                <tr>
                  <th scope="col">サービス</th>
                  <th scope="col">内容</th>
                  <th scope="col">料金</th>
                </tr>
              </thead>
              <tbody>
                {others.map((s) => (
                  <tr key={s.id}>
                    <th scope="row">{s.title}</th>
                    <td>{s.lead}</td>
                    <td className="price-table__price">{s.priceLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal as="ul" className="notes">
            <li>※ 表示価格はすべて税込です。</li>
            <li>※ ご相談・お見積りは無料です。</li>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container container--narrow">
          <SectionTitle en="FAQ">ニコニコプランのよくある質問</SectionTitle>
          <FaqList items={nikonikoFaq} />
        </div>
      </section>

      <CtaSection title="ご予算に合わせて、ご提案します。" />
    </>
  );
}
