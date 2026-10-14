import { Link } from 'react-router-dom';
import CtaSection from '../components/CtaSection.jsx';

export default function NotFound() {
  return (
    <>
      <section className="section notfound">
        <div className="container center">
          <p className="notfound__code">404</p>
          <h1 className="notfound__title">ページが見つかりません</h1>
          <p>お探しのページは移動または削除された可能性があります。</p>
          <Link to="/" className="btn btn--primary mt-l">
            トップページへ戻る
          </Link>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
