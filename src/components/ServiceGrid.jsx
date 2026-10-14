import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import { services } from '../data/services.js';

/** サービス一覧（主力2サービスを大きく、その他を小さく配置するグリッド） */
export default function ServiceGrid() {
  return (
    <div className="bento">
      {services.map((s, i) => (
        <Reveal key={s.id} className={`bento__cell${s.featured ? ' bento__cell--main' : ''}`} delay={(i % 3) * 100}>
          <Link to={s.href ?? `/services#${s.id}`} className={`svc spot${s.featured ? ' svc--main' : ''}`}>
            <span className="svc__top">
              <span className="svc__icon">
                <Icon name={s.icon} size={s.featured ? 30 : 24} />
              </span>
              {s.featured && <span className="svc__badge">主力サービス</span>}
            </span>
            <span className="svc__en">{s.en}</span>
            <span className="svc__title">{s.title}</span>
            {s.plan && <span className="svc__plan">{s.plan}</span>}
            <span className="svc__lead">{s.lead}</span>
            <span className="svc__price">
              <b>{s.priceLabel}</b>
              {s.priceSub && <small>{s.priceSub}</small>}
            </span>
            <span className="svc__more">
              詳しく見る <Icon name="arrow" size={16} />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
