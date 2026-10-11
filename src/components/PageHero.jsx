import { Link } from 'react-router-dom';

export default function PageHero({ en, title, lead, crumbs = [] }) {
  return (
    <section className="page-hero">
      <div className="page-hero__deco" aria-hidden="true" />
      <div className="container">
        <nav className="breadcrumb" aria-label="パンくずリスト">
          <ol>
            <li>
              <Link to="/">ホーム</Link>
            </li>
            {crumbs.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ol>
        </nav>
        <p className="page-hero__en">{en}</p>
        <h1 className="page-hero__title">{title}</h1>
        {lead && <p className="page-hero__lead">{lead}</p>}
      </div>
    </section>
  );
}
