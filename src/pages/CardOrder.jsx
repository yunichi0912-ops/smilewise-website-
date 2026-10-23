import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import CardOrderForm from '../components/CardOrderForm.jsx';
import { paperTypes, quantities, cardPrices } from '../data/businessCards.js';

const yen = (n) => `${n.toLocaleString('ja-JP')}円`;

export default function CardOrder() {
  return (
    <>
      <PageHero
        en="Business Card Order"
        title="名刺注文フォーム"
        lead="社員の皆さまの名刺を、まとめてご注文いただけます。注文者情報は1回だけ、名刺は人数分を追加して入力してください。お支払い方法は、注文確認後にご案内します。"
        crumbs={['名刺注文フォーム']}
      />

      <section className="section section--tight">
        <div className="container container--narrow">
          <SectionTitle en="Price">名刺の料金（税込）</SectionTitle>
          <Reveal className="table-wrap">
            <table className="price-table co-price">
              <thead>
                <tr>
                  <th scope="col">枚数</th>
                  {paperTypes.map((p) => (
                    <th key={p.value} scope="col">
                      {p.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {quantities.map((q) => (
                  <tr key={q}>
                    <th scope="row">{q}枚</th>
                    {paperTypes.map((p) => (
                      <td key={p.value} className="price-table__price">
                        {yen(cardPrices[p.value][q])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <p className="notes">※ 1人分（1種類の名刺）あたりの料金です。注文時点の概算で、追加制作費・送料などが発生する場合は別途ご案内します。</p>
        </div>
      </section>

      <section className="section section--tint co-section" id="order">
        <div className="container container--mid">
          <SectionTitle en="Order Form">ご注文内容の入力</SectionTitle>
          <CardOrderForm />
        </div>
      </section>
    </>
  );
}
