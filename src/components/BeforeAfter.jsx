import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import { beforeAfter } from '../data/system.js';

export default function BeforeAfter({ limit }) {
  const rows = limit ? beforeAfter.slice(0, limit) : beforeAfter;
  return (
    <div className="ba">
      <div className="ba__head" aria-hidden="true">
        <span />
        <span className="ba__tag ba__tag--before">導入前</span>
        <span />
        <span className="ba__tag ba__tag--after">導入後</span>
      </div>
      <ul className="ba__list">
        {rows.map((r, i) => (
          <Reveal as="li" key={r.label} className="ba__row" delay={i * 60}>
            <span className="ba__label">{r.label}</span>
            <p className="ba__before">
              <span className="ba__sp">導入前</span>
              <Icon name="x" size={16} />
              {r.before}
            </p>
            <span className="ba__arrow" aria-hidden="true">
              <Icon name="arrow" size={20} />
            </span>
            <p className="ba__after">
              <span className="ba__sp">導入後</span>
              <Icon name="check" size={16} strokeWidth={2} />
              {r.after}
            </p>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
