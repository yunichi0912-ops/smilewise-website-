import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import FloatingCta from './FloatingCta.jsx';
import RouteEffects from './RouteEffects.jsx';
import Effects from './Effects.jsx';

export default function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <RouteEffects />
      <Effects />
      <a href="#main" className="skip-link">
        本文へスキップ
      </a>
      <Header />
      <main id="main">
        {/* ページ切り替え時にふわっと表示 */}
        <div key={pathname} className="page">
          <Outlet />
        </div>
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
