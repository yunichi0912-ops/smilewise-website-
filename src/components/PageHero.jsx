import { Link } from 'react-router-dom';

export default function PageHero({ en, title, lead, crumbs = [] }) {
  return (
    <section className="page-hero">
      <div className="hero__bg" aria-hidden="true">
        <span className="blob blob--1" />
        <span className="blob blob--2" />
        <span className="hero__grid" />
      </div>
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
        <p className="page-hero__en">
          <span className="dot" aria-hidden="true" />
          {en}
        </p>
        <h1 className="page-hero__title">{title}</h1>
        {lead && <p className="page-hero__lead">{lead}</p>}
      </div>
    </section>
  );
}
