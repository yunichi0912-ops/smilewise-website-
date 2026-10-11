import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import CtaSection from '../components/CtaSection.jsx';
import { site } from '../data/site.js';
import { services } from '../data/services.js';

const values = [
  { en: 'Trust', title: '信頼', text: '約束したことを、きちんと守る。小さな確認と報告を積み重ね、安心してお任せいただける関係を築きます。' },
  { en: 'Clarity', title: 'わかりやすさ', text: 'デザインも、システムも、説明も。使う人・見る人にとってわかりやすいことを、いちばん大切にしています。' },
  { en: 'Partnership', title: '伴走', text: '納品して終わりではなく、公開後・導入後も、企業の成長に合わせて一緒に改善を続けます。' },
];

export default function About() {
  const rows = [
    ['屋号', `${site.name}（${site.nameKana}）`],
    ['代表者', site.representative],
    ['所在地', site.address || site.area],
    ['設立', site.established],
    ['電話番号', site.tel],
    ['メール', site.email],
    ['営業時間', site.hours],
    ['事業内容', services.map((s) => s.title).join('\n')],
    ['対応エリア', site.serviceArea],
  ].filter(([, v]) => v);

  return (
    <>
      <PageHero en="About" title="事業概要" lead={`${site.area}を拠点に、Web制作・デザイン・業務管理システム開発を行っています。`} crumbs={['事業概要']} />

      <section className="section">
        <div className="container message">
          <Reveal className="message__head">
            <p className="eyebrow">Message</p>
            <h2 className="message__title">
              地域の企業の、
              <br />
              「伝わる」と「はかどる」を。
            </h2>
          </Reveal>
          <Reveal className="message__body" delay={120}>
            <p>
              どれだけ良い商品やサービス、技術を持っていても、それが伝わらなければ、お客様にも、未来の仲間にも届きません。
              そして、日々の事務作業に追われていては、本来の仕事に向き合う時間が削られてしまいます。
            </p>
            <p>
              {site.name}は、ホームページやデザインで企業の魅力を「伝わる」かたちにし、
              業務管理システムで日々の仕事を「はかどる」ものにする。その両面から、北九州の企業を支えたいと考えています。
            </p>
            <p>まずはお気軽に、今のお困りごとをお聞かせください。</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionTitle en="Policy">大切にしていること</SectionTitle>
          <div className="value-grid">
            {values.map((v, i) => (
              <Reveal key={v.en} className="value" delay={i * 120}>
                <p className="value__en">{v.en}</p>
                <h3 className="value__title">{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <SectionTitle en="Outline">事業概要</SectionTitle>
          <Reveal>
            <dl className="outline">
              {rows.map(([k, v]) => (
                <div key={k} className="outline__row">
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
