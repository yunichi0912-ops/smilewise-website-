import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import { freeFixes, extraWorks, fixNote } from '../data/pricing.js';

/** 無料修正の範囲／別途お見積りの作業 */
export default function FixScope() {
  return (
    <div className="scope">
      <div className="scope__cols">
        <Reveal className="scope__col scope__col--free spot">
          <p className="scope__tag">
            <Icon name="check" size={16} strokeWidth={2.4} />
            年間管理費に含まれます
          </p>
          <h3 className="scope__title">無料修正の範囲</h3>
          <p className="scope__sub">回数制限なし</p>
          <ul>
            {freeFixes.map((f) => (
              <li key={f}>
                <Icon name="check" size={16} strokeWidth={2} />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="scope__col spot" delay={120}>
          <p className="scope__tag scope__tag--mute">
            <Icon name="plus" size={16} strokeWidth={2} />
            ご相談ください
          </p>
          <h3 className="scope__title">別途お見積りの作業</h3>
          <p className="scope__sub">内容に応じてお見積りします</p>
          <ul>
            {extraWorks.map((f) => (
              <li key={f}>
                <Icon name="plus" size={16} strokeWidth={2} />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <Reveal as="p" className="scope__note" delay={160}>
        <Icon name="calendar" size={18} />
        {fixNote}
      </Reveal>
    </div>
  );
}
