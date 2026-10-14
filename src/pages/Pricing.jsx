import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import Icon from '../components/Icon.jsx';
import CountUp from '../components/CountUp.jsx';
import CtaSection from '../components/CtaSection.jsx';
import NikonikoFeature from '../components/NikonikoFeature.jsx';
import PlanCompare from '../components/PlanCompare.jsx';
import { services } from '../data/services.js';
import { nikoniko, nikonikoTerms, systemPrice, yen } from '../data/pricing.js';

export default function Pricing() {
  const others = services.filter((s) => !s.featured);

  return (
    <>
      <PageHero
        en="Price"
        title="料金案内"
        lead="ホームページ制作は「ニコニコプラン」、業務の効率化は業務管理システムで。料金の目安を公開しています。"
        crumbs={['料金案内']}
      />

      {/* 料金サマリー */}
      <section className="section section--tight">
        <div className="container">
          <div className="price-overview">
            <Reveal className="po spot">
              <span className="po__tag">ホームページ制作</span>
              <p className="po__name">{nikoniko.name}</p>
              <dl className="po__list">
                <div>
                  <dt>初期制作費</dt>
                  <dd>
                    <b>{yen(nikoniko.initial)}</b>円
                  </dd>
                </div>
                <div>
                  <dt>月額管理費</dt>
                  <dd>
                    <b>{yen(nikoniko.monthly)}</b>円／月
                  </dd>
                </div>
                <div>
                  <dt>年払い</dt>
                  <dd>
                    <b>{yen(nikoniko.yearly)}</b>円／年
                    <em>{yen(nikoniko.monthly * 12 - nikoniko.yearly)}円お得</em>
                  </dd>
                </div>
              </dl>
              <a href="#nikoniko" className="text-link">
                プランの詳細を見る <Icon name="arrow" size={16} />
              </a>
            </Reveal>
            <Reveal className="po po--dark spot" delay={120}>
              <span className="po__tag">業務管理システム開発・導入</span>
              <p className="po__name">オーダーメイド</p>
              <p className="po__big">
                <CountUp value={systemPrice.from} />
                <small>円〜</small>
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
          <SectionTitle en="Website" lead="初期費用を抑えて、本格的なホームページを。">
            ホームページ制作「ニコニコプラン」
          </SectionTitle>
          <NikonikoFeature />
          {nikonikoTerms.length > 0 && (
            <Reveal as="ul" className="notes mt-l">
              {nikonikoTerms.map((t) => (
                <li key={t}>※ {t}</li>
              ))}
            </Reveal>
          )}
        </div>
      </section>

      <section className="section section--tint">
        <div className="container container--mid">
          <SectionTitle en="Monthly / Yearly">月払い・年払いの比較</SectionTitle>
          <PlanCompare />
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
              <p className="sys-price__ref">参考価格</p>
            </div>
            <div className="sys-price__body">
              <p>
                必要な機能や規模、データ移行の量などによって費用が変わるため、
                <strong>ヒアリングのうえ個別にお見積り</strong>いたします。
              </p>
              <ul className="check-list">
                <li>
                  <Icon name="check" size={16} strokeWidth={2} />
                  見積書・請求書／顧客・取引先／案件・工事進捗／売上・入金 など
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
            <li>※ 掲載の料金は目安です。ご要望の内容に応じて、正式なお見積りをご提示します。</li>
            <li>※ プランの内容・ご契約条件・お支払い方法の詳細は、お問い合わせの際にご説明します。</li>
            <li>※ ご相談・お見積りは無料です。</li>
          </Reveal>
        </div>
      </section>

      <CtaSection title="ご予算に合わせて、ご提案します。" />
    </>
  );
}
