import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import FloatingCta from './FloatingCta.jsx';
import RouteEffects from './RouteEffects.jsx';

export default function Layout() {
  return (
    <>
      <RouteEffects />
      <a href="#main" className="skip-link">
        本文へスキップ
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
