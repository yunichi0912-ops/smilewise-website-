import Reveal from './Reveal.jsx';

export default function SectionTitle({ en, children, lead, align = 'center', light = false }) {
  return (
    <div className={`section-title section-title--${align}${light ? ' section-title--light' : ''}`}>
      <Reveal as="p" className="section-title__en">
        <span className="dot" aria-hidden="true" />
        {en}
      </Reveal>
      <Reveal as="h2" className="section-title__ja" variant="mask" delay={80}>
        {children}
      </Reveal>
      {lead && (
        <Reveal as="p" className="section-title__lead" delay={160}>
          {lead}
        </Reveal>
      )}
    </div>
  );
}
