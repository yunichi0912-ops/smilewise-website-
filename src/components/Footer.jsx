import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { navItems } from './Header.jsx';
import Icon from './Icon.jsx';
import { site, telHref, mailHref } from '../data/site.js';
import { services } from '../data/services.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link to="/" aria-label="トップページへ">
            <Logo plate />
          </Link>
          <p className="footer__desc">
            {site.name}（{site.nameKana}）は、北九州市八幡西区を拠点に、
            <br />
            北九州市・筑豊エリアのホームページ制作・デザイン・
            <br />
            業務管理システム開発で地域の企業を支えます。
          </p>
          <div className="footer__contact">
            <a href={telHref()} className="footer__tel">
              <Icon name="phone" size={22} />
              {site.tel}
            </a>
            <a href={mailHref()} className="footer__mail">
              <Icon name="mail" size={18} />
              {site.email}
            </a>
            <address className="footer__address">
              {site.name}（{site.nameKana}）代表：{site.representative}
              <br />
              <span className="nw">〒{site.postalCode}</span>{' '}
              <span className="nw">
                {site.addressRegion}
                {site.addressLocality}
              </span>
              <span className="nw">{site.streetAddress}</span>
            </address>
            <div className="footer__contact-btns">
              {site.lineUrl && (
                <a href={site.lineUrl} className="btn btn--line" target="_blank" rel="noopener noreferrer">
                  <Icon name="line" size={20} />
                  LINEで友だち追加
                </a>
              )}
              <Link to="/contact" className="btn btn--outline-light">
                お問い合わせフォーム
              </Link>
            </div>
          </div>
        </div>

        <div className="footer__cols">
          <div>
            <p className="footer__heading">Menu</p>
            <ul>
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/contact">お問い合わせ</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer__heading">Service</p>
            <ul>
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={s.href ?? `/services#${s.id}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <Link to="/privacy">プライバシーポリシー</Link>
          <small>
            &copy; {site.name}. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}
