import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { navItems } from './Header.jsx';
import { site } from '../data/site.js';
import { services } from '../data/services.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo light />
          <p className="footer__desc">
            {site.area}を拠点に、
            <br />
            Web制作・デザイン・業務管理システム開発で
            <br />
            地域の企業を支えます。
          </p>
          <Link to="/contact" className="btn btn--outline-light">
            お問い合わせ・無料相談
          </Link>
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
