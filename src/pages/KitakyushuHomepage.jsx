import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import Icon from '../components/Icon.jsx';
import PageOptions from '../components/PageOptions.jsx';
import WorksList from '../components/WorksList.jsx';
import FaqList from '../components/FaqList.jsx';
import DiagnosisBanner from '../components/DiagnosisBanner.jsx';
import CtaSection from '../components/CtaSection.jsx';
import { site } from '../data/site.js';
import { nikoniko, nikonikoIncludes, firstYearTotal, firstYearMonthlyTotal, monthlyEquivalent, annualSaving, yen, TAX } from '../data/pricing.js';
import { areas, checklist, industryPoints, steps, kitakyushuFaq } from '../data/kitakyushu.js';

/** 北九州市向けホームページ制作のご案内（/kitakyushu-homepage/） */
export default function KitakyushuHomepage() {
  return (
    <>
      <PageHero
        en="Website Design in Kitakyushu"
        title="北九州市のホームページ制作"
        lead={`${site.addressLocality}を拠点に、小倉・若松・遠賀・直方など周辺地域のホームページ制作に対応しています。地域の事業者が、無理のない費用でホームページを持ち、公開後も安心して使い続けられるようにお手伝いします。`}
        crumbs={['北九州市のホームページ制作']}
      />

      {/* 対応エリア */}
      <section className="section section--tight" id="area">
        <div className="container container--mid">
          <SectionTitle en="Area" lead="打ち合わせは電話・LINE・オンラインのほか、直接お会いしてのご相談にも対応します。">
            八幡西区を拠点に、北九州市と周辺地域へ
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
          <p className="notes kk-area-note">所在地：{site.address}</p>
        </div>
      </section>

      {/* 掲載情報のチェックリスト */}
      <section className="section section--tint" id="checklist">
        <div className="container">
          <SectionTitle en="Checklist" lead="地域で探しているお客様や取引先に、必要な情報がきちんと伝わるように。制作時には、次の6つを一緒に整理します。">
            地域の事業者がホームページに載せたい6つの情報
          </SectionTitle>
          <ol className="kk-check">
            {checklist.map((c, i) => (
              <Reveal as="li" key={c.title} className="kk-check__item spot" delay={(i % 3) * 80}>
                <span className="kk-check__no">{String(i + 1).padStart(2, '0')}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 料金 */}
      <section className="section" id="price">
        <div className="container container--mid">
          <SectionTitle en="Price" lead={`ホームページ制作は「${nikoniko.name}」でお受けしています。表示価格はすべて税込です。`}>
            ホームページ制作の料金
          </SectionTitle>
          <Reveal className="kk-price">
            <dl className="kk-price__list">
              <div>
                <dt>初期制作費</dt>
                <dd>
                  <b>{yen(nikoniko.initial)}</b>円{TAX}
                </dd>
              </div>
              <div>
                <dt>管理費（月払い）</dt>
                <dd>
                  <b>{yen(nikoniko.monthly)}</b>円／月{TAX}
                </dd>
              </div>
              <div>
                <dt>管理費（年払い）</dt>
                <dd>
                  <b>{yen(nikoniko.annual)}</b>円／年{TAX}
                  <small>
                    月換算{yen(monthlyEquivalent)}円・月払いより年間{yen(annualSaving)}円お得
                  </small>
                </dd>
              </div>
              <div className="is-total">
                <dt>初年度総額</dt>
                <dd>
                  年払い <b>{yen(firstYearTotal)}</b>円／月払い <b>{yen(firstYearMonthlyTotal)}</b>円
                </dd>
              </div>
              <div>
                <dt>最低契約期間・ページ数</dt>
                <dd>
                  {nikoniko.minMonths}か月・基本の制作ページ数は最大{nikoniko.maxPages}ページ
                </dd>
              </div>
            </dl>
            <p className="kk-price__links">
              <Link to="/pricing" className="text-link">
                料金案内を見る <Icon name="arrow" size={16} />
              </Link>
              <Link to="/nikoniko#methods" className="text-link">
                お支払い方法を見る <Icon name="arrow" size={16} />
              </Link>
            </p>
          </Reveal>
          <h3 className="kk-sub">ページを増やしたい場合</h3>
          <PageOptions />
        </div>
      </section>

      {/* サービス内容 */}
      <section className="section section--tint" id="service">
        <div className="container">
          <SectionTitle en="Service" lead="制作して終わりではなく、公開後の管理や修正まで含めたプランです。">
            ホームページ制作のサービス内容
          </SectionTitle>
          <ul className="includes__grid">
            {nikonikoIncludes.map((it, i) => (
              <Reveal as="li" key={it.title} className="include spot" delay={(i % 4) * 80}>
                <span className="include__icon">
                  <Icon name={it.icon} size={22} />
                </span>
                <b>{it.title}</b>
                <span>{it.text}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal as="p" className="kk-related">
            あわせてご依頼いただけるもの：
            <Link to="/services#recruit">ランディングページ制作</Link>／
            <Link to="/services#print">名刺・チラシ・パンフレット</Link>／
            <Link to="/card-order">名刺注文</Link>／
            <Link to="/system">業務管理システム開発・導入</Link>
          </Reveal>
        </div>
      </section>

      {/* 建設業・製造業 */}
      <section className="section" id="industry">
        <div className="container">
          <SectionTitle en="Construction & Manufacturing" lead="北九州の建設業・製造業の会社のホームページで、特にお手伝いできることです。">
            建設業・製造業のホームページ制作
          </SectionTitle>
          <div className="kk-industry">
            {industryPoints.map((p, i) => (
              <Reveal key={p.title} className="kk-industry__item spot" delay={(i % 3) * 80}>
                <span className="include__icon">
                  <Icon name={p.icon} size={22} />
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
          <p className="notes center">※ 掲載する実績・資格・数値などは、御社に確認いただいた事実のみを掲載します。成果（問い合わせ数や検索順位など）をお約束するものではありません。</p>
          <Reveal className="btn-row">
            <Link to="/system" className="btn btn--outline">
              業務管理システムについて
              <Icon name="arrow" size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 制作実績 */}
      <section className="section section--tint" id="works">
        <div className="container">
          <SectionTitle en="Works">制作実績</SectionTitle>
          <WorksList limit={3} />
          <Reveal className="center mt-l">
            <Link to="/works" className="btn btn--outline">
              制作実績一覧へ
              <Icon name="arrow" size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 流れ */}
      <section className="section" id="flow">
        <div className="container">
          <SectionTitle en="Flow" lead="まずは無料相談・無料診断から。無料デザイン案を見てからご検討いただけます。">
            ご相談から公開までの流れ
          </SectionTitle>
          <ol className="steps">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} className="steps__item" delay={i * 90}>
                <span className="steps__no">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="btn-row">
            <Link to="/diagnosis" className="btn btn--primary btn--lg">
              無料診断・無料デザイン案はこちら
              <Icon name="arrow" size={18} />
            </Link>
            <Link to="/contact?type=web" className="btn btn--outline btn--lg">
              無料で相談する
            </Link>
          </Reveal>
        </div>
      </section>

      {/* よくある質問 */}
      <section className="section section--tint" id="faq">
        <div className="container container--narrow">
          <SectionTitle en="FAQ">北九州市でのホームページ制作のよくある質問</SectionTitle>
          <FaqList items={kitakyushuFaq} />
          <Reveal className="center mt-l">
            <Link to="/nikoniko#faq" className="btn btn--outline">
              ニコニコプランのよくある質問
              <Icon name="arrow" size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <DiagnosisBanner />
      <CtaSection type="web" title="北九州市のホームページ制作、まずは無料でご相談ください。" />
    </>
  );
}
