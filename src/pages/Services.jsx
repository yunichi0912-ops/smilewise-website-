import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icon.jsx';
import CtaSection from '../components/CtaSection.jsx';
import { services, formatPrice } from '../data/services.js';

export default function Services() {
  return (
    <>
      <PageHero
        en="Service"
        title="サービス紹介"
        lead="ホームページ制作から、デザイン制作、業務管理システムの開発・導入まで。企業の「伝える」と「はかどる」をトータルで支援します。"
        crumbs={['サービス紹介']}
      />

      <section className="section">
        <div className="container">
          <nav className="service-index" aria-label="サービス一覧">
            {services.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="service-index__item">
                <Icon name={s.icon} size={22} />
                {s.title}
              </a>
            ))}
          </nav>

          <div className="service-detail-list">
            {services.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                className={`service-detail${i % 2 ? ' service-detail--reverse' : ''}${s.featured ? ' service-detail--featured' : ''}`}
              >
                <Reveal className="service-detail__visual" variant={i % 2 ? 'right' : 'left'}>
                  <span className="service-detail__num">{String(i + 1).padStart(2, '0')}</span>
                  <Icon name={s.icon} size={72} strokeWidth={1} />
                  <span className="service-detail__en">{s.en}</span>
                </Reveal>
                <Reveal className="service-detail__body" delay={120}>
                  {s.featured && <span className="badge">企業の業務効率化を支援</span>}
                  <h2 className="service-detail__title">{s.title}</h2>
                  <p className="service-detail__lead">{s.lead}</p>
                  <p>{s.text}</p>
                  <ul className="check-list">
                    {s.points.map((p) => (
                      <li key={p}>
                        <Icon name="check" size={16} strokeWidth={2} />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="service-detail__foot">
                    <p className="service-detail__price">
                      <span>料金</span>
                      {formatPrice(s)}
                      {s.priceNote && <small>{s.priceNote}</small>}
                    </p>
                    <div className="service-detail__actions">
                      {s.href && (
                        <Link to={s.href} className="btn btn--primary">
                          詳しく見る
                          <Icon name="arrow" size={16} />
                        </Link>
                      )}
                      <Link to={`/contact?type=${s.id}`} className="btn btn--outline">
                        このサービスを相談する
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </section>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
