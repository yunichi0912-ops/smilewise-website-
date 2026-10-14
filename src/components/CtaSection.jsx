import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import { site } from '../data/site.js';

export default function CtaSection({
  title = 'まずは、お気軽にご相談ください。',
  text = 'ホームページのこと、日々の業務のこと。「何から始めればいいかわからない」という段階でも大丈夫です。ご相談・お見積りは無料です。',
  type,
}) {
  const to = type ? `/contact?type=${type}` : '/contact';
  return (
    <section className="cta">
      <div className="cta__bg" aria-hidden="true" />
      <div className="container cta__inner">
        <Reveal as="p" className="cta__en">
          Contact
        </Reveal>
        <Reveal as="h2" className="cta__title" variant="mask" delay={80}>
          {title}
        </Reveal>
        <Reveal as="p" className="cta__text" delay={160}>
          {text}
        </Reveal>
        <Reveal className="cta__actions" delay={220}>
          <Link to={to} className="btn btn--white btn--lg">
            <Icon name="mail" size={20} />
            お問い合わせ・無料相談
            <Icon name="arrow" size={18} />
          </Link>
          {site.tel && (
            <a href={`tel:${site.tel.replace(/[^0-9+]/g, '')}`} className="cta__tel">
              <Icon name="phone" size={20} />
              <span>
                {site.tel}
                {site.hours && <small>{site.hours}</small>}
              </span>
            </a>
          )}
        </Reveal>
        {!type && (
          <Reveal className="cta__quick" delay={280}>
            <Link to="/contact?type=web">ニコニコプランの相談</Link>
            <Link to="/contact?type=system">業務管理システムの相談</Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
