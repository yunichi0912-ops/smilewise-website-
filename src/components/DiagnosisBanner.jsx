import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';

/** 無料ホームページ診断への案内（トップ・ニコニコプラン・お問い合わせなどに配置） */
export default function DiagnosisBanner() {
  return (
    <section className="section section--tight">
      <div className="container container--mid">
        <Reveal className="dg-banner">
          <div className="dg-banner__text">
            <p className="dg-banner__en">Free Website Check</p>
            <h2 className="dg-banner__title">
              4つの質問で、あなたに合うホームページがわかる
              <span>無料ホームページ診断</span>
            </h2>
            <p>所要時間は約1分。診断結果をもとに、無料のデザイン案もお申し込みいただけます。診断だけのご利用もできます。</p>
          </div>
          <Link to="/diagnosis" className="btn btn--primary btn--lg">
            無料で診断する
            <Icon name="arrow" size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
