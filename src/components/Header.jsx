import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import Icon from './Icon.jsx';
import { site, telHref } from '../data/site.js';

export const navItems = [
  { to: '/', label: 'ホーム', end: true },
  { to: '/nikoniko', label: 'ニコニコプラン' },
  { to: '/services', label: 'サービス' },
  { to: '/system', label: '業務システム' },
  { to: '/works', label: '制作実績' },
  { to: '/pricing', label: '料金案内' },
  { to: '/about', label: '事業概要' },
  { to: '/card-order', label: '名刺注文' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const onDark = pathname === '/system' && !scrolled && !open;

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-menu-open', open);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}${onDark ? ' is-on-dark' : ''}`}>
      <div className="header__inner">
        <Link to="/" className="header__logo" aria-label="トップページへ">
          <Logo />
        </Link>

        <nav id="global-nav" className="header__nav" aria-label="グローバルナビゲーション">
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn btn--primary header__cta">
            お問い合わせ
          </Link>
          {/* メニューを開いたとき（スマホ・タブレット）の連絡先 */}
          <div className="header__menu-contact">
            <a href={telHref()} className="btn btn--outline">
              <Icon name="phone" size={18} />
              {site.tel}
            </a>
            {site.lineUrl && (
              <a href={site.lineUrl} className="btn btn--line" target="_blank" rel="noopener noreferrer">
                <Icon name="line" size={20} />
                LINEで友だち追加
              </a>
            )}
          </div>
        </nav>

        <a href={telHref()} className="header__tel" aria-label={`電話で相談する ${site.tel}`}>
          <span className="header__tel-icon">
            <Icon name="phone" size={18} />
          </span>
          <span className="header__tel-text">
            <small>お電話でのご相談</small>
            <b>{site.tel}</b>
          </span>
        </a>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="global-nav"
          aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
