import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import Icon from '../components/Icon.jsx';
import CtaSection from '../components/CtaSection.jsx';
import { services } from '../data/services.js';

const byId = Object.fromEntries(services.map((s) => [s.id, s]));
const yen = (n) => n.toLocaleString('ja-JP');

export default function Pricing() {
  const web = byId.web;
  const maint = byId.maintenance;
  const sys = byId.system;
  const others = ['recruit', 'print', 'logo'].map((id) => byId[id]);

  return (
    <>
      <PageHero
        en="Price"
        title="料金案内"
        lead="料金の目安を公開しています。ご要望をお伺いしたうえで、内訳を明記した正式なお見積りをご提示します。"
        crumbs={['料金案内']}
      />

      <section className="section">
        <div className="container">
          <SectionTitle en="Main Plan">主な料金</SectionTitle>
          <div className="plan-grid">
            <Reveal className="plan plan--primary">
              <p className="plan__en">Website</p>
              <h3 className="plan__name">{web.title}</h3>
              <p className="plan__price">
                {yen(web.price)}
                <span>円</span>
              </p>
              <ul className="check-list">
                {web.points.map((p) => (
                  <li key={p}>
                    <Icon name="check" size={16} strokeWidth={2} />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="plan__plus">
                <span>＋</span>
                <div>
                  <p className="plan__plus-name">{maint.title}</p>
                  <p className="plan__plus-price">
                    {yen(maint.price)}円<small>{maint.priceSuffix}</small>
                  </p>
                  <p className="plan__plus-note">{maint.points.join('／')}</p>
                </div>
              </div>
              <Link to="/contact?type=web" className="btn btn--primary btn--block">
                ホームページ制作を相談する
              </Link>
            </Reveal>

            <Reveal className="plan" delay={120}>
              <span className="plan__badge">業務効率化</span>
              <p className="plan__en">Business System</p>
              <h3 className="plan__name">{sys.title}</h3>
              <p className="plan__price">
                {yen(sys.price)}
                <span>円〜</span>
              </p>
              <p className="plan__ref">参考価格</p>
              <ul className="check-list">
                {sys.points.map((p) => (
                  <li key={p}>
                    <Icon name="check" size={16} strokeWidth={2} />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="plan__note">機能や規模によって、個別にお見積りします。</p>
              <div className="plan__btns">
                <Link to="/system" className="btn btn--outline btn--block">
                  詳しく見る
                </Link>
                <Link to="/contact?type=system" className="btn btn--primary btn--block">
                  システム導入を相談する
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container container--narrow">
          <SectionTitle en="Other" lead="内容・数量・仕様によって費用が異なるため、個別にお見積りいたします。">
            その他のサービス
          </SectionTitle>
          <Reveal>
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
                    <td>{s.points.join('／')}</td>
                    <td className="price-table__price">お見積り</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal as="ul" className="notes">
            <li>※ 掲載の料金は目安です。ご要望の内容に応じて、正式なお見積りをご提示します。</li>
            <li>※ ドメイン・サーバーの費用、印刷・看板の製作費用などは別途となる場合があります。</li>
            <li>※ ご相談・お見積りは無料です。お見積り後に無理な営業はいたしません。</li>
          </Reveal>
        </div>
      </section>

      <CtaSection title="ご予算に合わせて、ご提案します。" />
    </>
  );
}
