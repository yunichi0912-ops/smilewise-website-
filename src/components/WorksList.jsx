import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import { works, workCategories } from '../data/works.js';

export default function WorksList({ limit, category = 'all' }) {
  const filtered = works.filter((w) => category === 'all' || w.category === category);
  const items = limit ? filtered.slice(0, limit) : filtered;

  if (items.length === 0) {
    return (
      <Reveal className="works-empty">
        <span className="works-empty__icon">
          <Icon name="monitor" size={32} />
        </span>
        <p className="works-empty__title">制作実績は現在準備中です</p>
        <p className="works-empty__text">
          掲載許可をいただいた実績から、順次ご紹介してまいります。
          <br className="pc-only" />
          制作の進め方やイメージについては、お気軽にお問い合わせください。
        </p>
      </Reveal>
    );
  }

  return (
    <div className="works-grid">
      {items.map((w, i) => {
        const body = (
          <>
            <div className="work-card__thumb">
              {w.image ? (
                <img src={w.image} alt={w.title} loading="lazy" width="640" height="400" />
              ) : (
                <span className="work-card__noimg">
                  <Icon name="monitor" size={36} />
                </span>
              )}
            </div>
            <div className="work-card__body">
              <p className="work-card__meta">
                <span className="work-card__cat">{workCategories[w.category] ?? w.category}</span>
                {w.year && <span>{w.year}</span>}
              </p>
              <h3 className="work-card__title">{w.title}</h3>
              {w.client && <p className="work-card__client">{w.client}</p>}
              {w.summary && <p className="work-card__summary">{w.summary}</p>}
              {w.tags?.length > 0 && (
                <ul className="work-card__tags">
                  {w.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
            </div>
          </>
        );
        return (
          <Reveal key={w.id} delay={(i % 3) * 100}>
            {w.url ? (
              <a className="work-card" href={w.url} target="_blank" rel="noopener noreferrer">
                {body}
              </a>
            ) : (
              <div className="work-card">{body}</div>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
