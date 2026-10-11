import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import WorksList from '../components/WorksList.jsx';
import CtaSection from '../components/CtaSection.jsx';
import { works, workCategories } from '../data/works.js';

export default function Works() {
  const [category, setCategory] = useState('all');
  const used = Object.keys(workCategories).filter((c) => works.some((w) => w.category === c));

  return (
    <>
      <PageHero en="Works" title="制作実績" lead="これまでに制作したホームページ・デザイン・システムをご紹介します。" crumbs={['制作実績']} />
      <section className="section">
        <div className="container">
          {used.length > 1 && (
            <div className="filter" role="group" aria-label="カテゴリで絞り込み">
              {['all', ...used].map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`filter__btn${category === c ? ' is-active' : ''}`}
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                >
                  {c === 'all' ? 'すべて' : workCategories[c]}
                </button>
              ))}
            </div>
          )}
          <WorksList category={category} />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
