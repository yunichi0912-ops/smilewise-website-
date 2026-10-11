import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icon.jsx';
import ContactForm from '../components/ContactForm.jsx';
import { site } from '../data/site.js';

export default function Contact() {
  return (
    <>
      <PageHero
        en="Contact"
        title="お問い合わせ"
        lead="ご相談・お見積りは無料です。内容が固まっていない段階でも、お気軽にご連絡ください。"
        crumbs={['お問い合わせ']}
      />
      <section className="section">
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
            {(site.tel || site.email) && (
              <div className="contact__direct">
                {site.tel && (
                  <p>
                    <Icon name="phone" size={18} /> {site.tel}
                    {site.hours && <small>（{site.hours}）</small>}
                  </p>
                )}
                {site.email && (
                  <p>
                    <Icon name="mail" size={18} /> {site.email}
                  </p>
                )}
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
