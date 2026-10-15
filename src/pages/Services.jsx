import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import Icon from '../components/Icon.jsx';
import CtaSection from '../components/CtaSection.jsx';
import { services } from '../data/services.js';

const flow = [
  { title: 'お問い合わせ', text: 'フォームからお気軽にご連絡ください。' },
  { title: 'ヒアリング', text: 'ご要望や現状の課題をお聞きします。' },
  { title: 'ご提案・お見積り', text: '内容と費用をご説明します。' },
  { title: '制作・開発', text: '確認を重ねながら丁寧に進めます。' },
  { title: '公開・導入', text: '公開後・導入後もご相談を承ります。' },
];

export default function Services() {
  return (
    <>
      <PageHero
        en="Services"
        title="サービス紹介"
        lead="ホームページ制作から、デザイン制作、業務管理システムの開発・導入まで。企業の「伝える」と「はかどる」をトータルで支援します。"
        crumbs={['サービス紹介']}
      />

      <section className="section">
        <div className="container">
          <nav className="chip-nav" aria-label="サービス一覧">
            {services.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="chip-nav__item">
                <Icon name={s.icon} size={18} />
                {s.title}
              </a>
            ))}
          </nav>

          <div className="sd-list">
            {services.map((s, i) => (
              <section key={s.id} id={s.id} className={`sd${i % 2 ? ' sd--reverse' : ''}${s.featured ? ' sd--main' : ''}`}>
                <Reveal className="sd__visual" variant="scale">
                  <span className="sd__orb" aria-hidden="true" />
                  <span className="sd__icon">
                    <Icon name={s.icon} size={56} strokeWidth={1.2} />
                  </span>
                  <span className="sd__en">{s.en}</span>
                </Reveal>
                <div className="sd__body">
                  {s.featured && (
                    <Reveal as="span" className="badge">
                      主力サービス
                    </Reveal>
                  )}
                  <Reveal as="h2" className="sd__title" variant="mask" delay={60}>
                    {s.title}
                    {s.plan && <span className="sd__plan">「{s.plan}」</span>}
                  </Reveal>
                  <Reveal delay={120}>
                    <p className="sd__lead">{s.lead}</p>
                    <p className="sd__text">{s.text}</p>
                    <div className="sd__foot">
                      <p className="sd__price">
                        <span className="sd__price-label">料金</span>
                        <b>{s.priceLabel}</b>
                        {s.priceSub && <small>{s.priceSub}</small>}
                      </p>
                      <div className="sd__actions">
                        {s.href && (
                          <Link to={s.href} className="btn btn--primary">
                            {s.id === 'web' ? 'ニコニコプランを見る' : '詳しく見る'}
                            <Icon name="arrow" size={16} />
                          </Link>
                        )}
                        <Link to={`/contact?type=${s.id}`} className="btn btn--outline">
                          このサービスを相談する
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionTitle en="Flow">ご依頼の流れ</SectionTitle>
          <ol className="steps">
            {flow.map((f, i) => (
              <Reveal as="li" key={f.title} className="steps__item" delay={i * 90}>
                <span className="steps__no">{String(i + 1).padStart(2, '0')}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
