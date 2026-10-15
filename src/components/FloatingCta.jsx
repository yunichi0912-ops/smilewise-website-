import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import { site, telHref } from '../data/site.js';

/** スマートフォンで画面下部に固定表示する問い合わせ導線（電話／LINE／フォーム） */
export default function FloatingCta() {
  const { pathname } = useLocation();
  const type = pathname === '/system' ? '?type=system' : pathname === '/nikoniko' ? '?type=web' : '';
  return (
    <nav className="floating-cta" aria-label="お問い合わせ">
      <a href={telHref()} className="floating-cta__item">
        <Icon name="phone" size={20} />
        <span>電話</span>
      </a>
      {site.lineUrl ? (
        <a href={site.lineUrl} className="floating-cta__item floating-cta__item--line" target="_blank" rel="noopener noreferrer">
          <Icon name="line" size={22} />
          <span>LINE</span>
        </a>
      ) : (
        <Link to="/contact#channels" className="floating-cta__item floating-cta__item--line">
          <Icon name="line" size={22} />
          <span>LINE</span>
        </Link>
      )}
      <Link to={pathname === '/contact' ? '/contact#contact-form' : `/contact${type}`} className="floating-cta__item floating-cta__item--form">
        <Icon name="mail" size={20} />
        <span>フォームで相談</span>
      </Link>
    </nav>
  );
}
