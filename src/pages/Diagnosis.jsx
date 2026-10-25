import PageHero from '../components/PageHero.jsx';
import DiagnosisTool from '../components/DiagnosisTool.jsx';
import CtaSection from '../components/CtaSection.jsx';

export default function Diagnosis() {
  return (
    <>
      <PageHero
        en="Free Website Check"
        title="無料ホームページ診断"
        lead="4つの質問に答えるだけで、あなたの事業に合ったホームページの種類と構成例がわかります。診断結果をもとに、無料のデザイン案をお申し込みいただくこともできます（診断だけのご利用も大歓迎です）。"
        crumbs={['無料ホームページ診断']}
      />

      <section className="section section--tint dg-section" id="diagnosis">
        <div className="container container--mid">
          <DiagnosisTool />
          <ul className="dg-facts">
            <li>所要時間 約1分・4問</li>
            <li>診断だけなら情報の送信なし</li>
            <li>お申し込みでも契約・支払いは発生しません</li>
          </ul>
        </div>
      </section>

      <CtaSection
        type="web"
        title="診断を使わずに、直接ご相談いただくこともできます。"
        text="お電話・LINE・お問い合わせフォームから、ご都合のよい方法でご連絡ください。ご相談・お見積りは無料です。"
      />
    </>
  );
}
