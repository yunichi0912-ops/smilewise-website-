import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import SectionTitle from './SectionTitle.jsx';
import Icon from './Icon.jsx';
import { areas, kitakyushuPath } from '../data/kitakyushu.js';

/** 対応エリアの紹介（北九州市向けページへの導線） */
export default function AreaSection({ tint = false }) {
  return (
    <section className={`section${tint ? ' section--tint' : ''}`} id="area">
      <div className="container container--mid">
        <SectionTitle en="Area" lead="北九州市八幡西区を拠点に、北九州市内と周辺地域のホームページ制作に対応しています。電話・LINE・オンラインのほか、直接お会いしてのご相談にも対応します。">
          北九州市と周辺地域のホームページ制作
        </SectionTitle>
        <Reveal as="ul" className="area-chips">
          {areas.map((a) => (
            <li key={a.name} className={a.base ? 'is-base' : undefined}>
              {a.base && <Icon name="map" size={16} />}
              <b>{a.name}</b>
              <small>{a.note}</small>
            </li>
          ))}
        </Reveal>
        <Reveal className="center mt-l">
          <Link to={kitakyushuPath} className="btn btn--outline">
            北九州市のホームページ制作
            <Icon name="arrow" size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
