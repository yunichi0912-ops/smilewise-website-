import Reveal from './Reveal.jsx';
import ContactChannels from './ContactChannels.jsx';

export default function CtaSection({
  title = 'まずは、お気軽にご相談ください。',
  text = 'ホームページのこと、日々の業務のこと。「何から始めればいいかわからない」という段階でも大丈夫です。お電話・LINE・フォームから、ご都合のよい方法でご連絡ください。ご相談・お見積りは無料です。',
  type,
}) {
  const to = type ? `/contact?type=${type}` : '/contact';
  return (
    <section className="cta">
      <div className="cta__bg" aria-hidden="true" />
      <div className="container cta__inner">
        <Reveal as="p" className="cta__en">
          Contact
        </Reveal>
        <Reveal as="h2" className="cta__title" variant="mask" delay={80}>
          {title}
        </Reveal>
        <Reveal as="p" className="cta__text" delay={160}>
          {text}
        </Reveal>
        <ContactChannels variant="compact" formTo={to} />
      </div>
    </section>
  );
}
