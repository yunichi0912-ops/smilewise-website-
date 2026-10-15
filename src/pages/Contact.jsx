import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icon.jsx';
import ContactForm from '../components/ContactForm.jsx';
import ContactChannels from '../components/ContactChannels.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import { site } from '../data/site.js';

export default function Contact() {
  return (
    <>
      <PageHero
        en="Contact"
        title="お問い合わせ"
        lead="ご相談・お見積りは無料です。お電話・LINE・フォームから、内容が固まっていない段階でもお気軽にご連絡ください。"
        crumbs={['お問い合わせ']}
      />
      <section className="section contact-channels" id="channels">
        <div className="container">
          <SectionTitle en="3 Ways to Contact" lead="お電話・LINE・お問い合わせフォームの3つの方法でご相談いただけます。ご都合のよい方法をお選びください。">
            ご相談の方法
          </SectionTitle>
          <ContactChannels variant="full" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle en="Form">お問い合わせフォーム</SectionTitle>
        </div>
        <div className="container contact">
          <Reveal as="aside" className="contact__aside">
            <h2 className="contact__aside-title">ご相談の前に</h2>
            <ul className="contact__points">
              <li>
                <Icon name="chat" size={22} />
                <span>
                  <b>どんな段階でもご相談ください</b>
                  「何から始めればいいかわからない」という状態でも大丈夫です。
                </span>
              </li>
              <li>
                <Icon name="yen" size={22} />
                <span>
                  <b>ご相談・お見積りは無料</b>
                  内容を確認し、内訳を明記したお見積りをお出しします。
                </span>
              </li>
              <li>
                <Icon name="map" size={22} />
                <span>
                  <b>北九州市を中心に対応</b>
                  {site.serviceArea}
                </span>
              </li>
              <li>
                <Icon name="excel" size={22} />
                <span>
                  <b>業務システムのご相談</b>
                  現在お使いのExcelファイルなどがあれば、ご相談時に拝見しながらお話しできます。
                </span>
              </li>
            </ul>
            {site.email && (
              <div className="contact__direct">
                <p>
                  <Icon name="mail" size={18} /> {site.email}
                </p>
              </div>
            )}
          </Reveal>
          <Reveal className="contact__main" delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
