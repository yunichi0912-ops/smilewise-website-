import Reveal from './Reveal.jsx';

export default function SectionTitle({ en, children, lead, align = 'center', light = false }) {
  return (
    <Reveal className={`section-title section-title--${align}${light ? ' section-title--light' : ''}`}>
      <span className="section-title__en">{en}</span>
      <h2 className="section-title__ja">{children}</h2>
      {lead && <p className="section-title__lead">{lead}</p>}
    </Reveal>
  );
}
