import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';

/** スマートフォンで画面下部に固定表示する問い合わせ導線 */
export default function FloatingCta() {
  const { pathname } = useLocation();
  if (pathname === '/contact') return null;
  const type = pathname === '/system' ? '?type=system' : '';
  return (
    <div className="floating-cta">
      <Link to={`/contact${type}`} className="floating-cta__btn">
        <Icon name="mail" size={20} />
        無料相談・お見積り
      </Link>
    </div>
  );
}
