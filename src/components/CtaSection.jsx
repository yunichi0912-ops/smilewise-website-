import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import { site } from '../data/site.js';

export default function CtaSection({
  title = 'まずは、お気軽にご相談ください。',
  text = 'ホームページのこと、デザインのこと、日々の業務のこと。「何から始めればいいかわからない」という段階でも大丈夫です。ご相談・お見積りは無料です。',
  type,
}) {
  const to = type ? `/contact?type=${type}` : '/contact';
  return (
    <section className="cta">
      <div className="cta__bg" aria-hidden="true" />
      <Reveal className="container cta__inner">
        <p className="cta__en">Contact</p>
        <h2 className="cta__title">{title}</h2>
        <p className="cta__text">{text}</p>
        <div className="cta__actions">
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
        </div>
      </Reveal>
    </section>
  );
}
