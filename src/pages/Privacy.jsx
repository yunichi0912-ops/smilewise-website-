import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import CtaSection from '../components/CtaSection.jsx';
import { site, telHref, mailHref } from '../data/site.js';

/**
 * プライバシーポリシー
 * 事業者情報（代表者・所在地）は src/data/site.js の値を表示します。
 * 個人情報保護法により、事業者の名称・住所・代表者氏名の公表が求められるため、公開前に必ず入力してください。
 */
export default function Privacy() {
  const owner = [
    ['名称', `${site.name}（${site.nameKana}）`],
    ['代表者', site.representative],
    ['所在地', site.address || (site.addressOnRequest ? 'ご請求があった場合は、遅滞なくお知らせします' : '')],
    ['電話番号', site.tel],
    ['メールアドレス', site.email],
  ].filter(([, v]) => v);

  return (
    <>
      <PageHero en="Privacy Policy" title="プライバシーポリシー" crumbs={['プライバシーポリシー']} />
      <section className="section">
        <div className="container container--narrow prose">
          <p>
            {site.name}（以下「当事業者」）は、お客様の個人情報を適切に取り扱うことが重要な責務であると考え、個人情報の保護に関する法律（個人情報保護法）その他の関係法令を遵守し、以下の方針に基づき個人情報の保護に努めます。
          </p>

          <h2>1. 事業者情報</h2>
          <dl className="prose-dl">
            {owner.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <h2>2. 取得する個人情報</h2>
          <p>当事業者は、適正な手段により、次の個人情報を取得します。</p>
          <ul>
            <li>お問い合わせフォームにご入力いただいた情報（会社名・屋号、氏名、メールアドレス、電話番号、ご相談内容など）</li>
            <li>名刺注文フォームにご入力いただいた情報（会社名、ご担当者名、電話番号、メールアドレス、名刺に印刷する方の氏名、ご注文内容など）</li>
            <li>お電話・LINE・メールなどでのやりとりの中でご提供いただいた情報</li>
            <li>ご契約・お見積り・制作の過程でご提供いただいた情報</li>
            <li>当サイトの閲覧時に自動的に記録される情報（IPアドレス、ブラウザの種類、閲覧日時など）</li>
          </ul>

          <h2>3. 利用目的</h2>
          <ul>
            <li>お問い合わせ・ご相談への回答、ご連絡のため</li>
            <li>お見積り・ご提案、契約の締結および履行のため</li>
            <li>制作したホームページ・システムの管理・運用・修正対応のため</li>
            <li>ご注文いただいた名刺などの印刷物の制作・お届け、お支払い方法のご案内のため</li>
            <li>当事業者のサービスに関するご案内のため</li>
            <li>当サイトの安全な運営、不正利用の防止のため</li>
          </ul>

          <h2>4. 第三者への提供</h2>
          <p>当事業者は、次の場合を除き、ご本人の同意なく個人情報を第三者に提供しません。</p>
          <ul>
            <li>法令に基づく場合</li>
            <li>人の生命、身体または財産の保護のために必要があり、ご本人の同意を得ることが困難な場合</li>
            <li>その他、個人情報保護法で認められる場合</li>
          </ul>

          <h2>5. 外部サービスの利用（業務委託・外国にある事業者）</h2>
          <p>当事業者は、当サイトの運営やお問い合わせへの対応のため、次の外部サービスを利用しています。これらのサービスを通じて、個人情報が各事業者のサーバーで取り扱われる場合があります。</p>
          <div className="table-wrap">
            <table className="prose-table">
              <thead>
                <tr>
                  <th scope="col">サービス</th>
                  <th scope="col">提供事業者（所在国）</th>
                  <th scope="col">取り扱われる情報</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>お問い合わせフォーム・名刺注文フォームの送信（Formspree）</td>
                  <td>Formspree, Inc.（アメリカ合衆国）</td>
                  <td>フォームにご入力いただいた情報</td>
                </tr>
                <tr>
                  <td>当サイトの配信（Cloudflare Pages）</td>
                  <td>Cloudflare, Inc.（アメリカ合衆国）</td>
                  <td>IPアドレスなどの閲覧情報</td>
                </tr>
                <tr>
                  <td>Webフォントの表示（Google Fonts）</td>
                  <td>Google LLC（アメリカ合衆国）</td>
                  <td>IPアドレスなどの閲覧情報</td>
                </tr>
                <tr>
                  <td>LINEでのご相談（LINE公式アカウント等）</td>
                  <td>LINEヤフー株式会社（日本）</td>
                  <td>LINEでやりとりした内容など</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            アメリカ合衆国の個人情報の保護に関する制度については、
            <a href="https://www.ppc.go.jp/personalinfo/legal/kaiseihogohou/#gaikoku" target="_blank" rel="noopener noreferrer">
              個人情報保護委員会のウェブサイト
            </a>
            をご参照ください。各事業者における個人情報の取り扱いは、それぞれのプライバシーポリシーに従います。
          </p>

          <h2>6. Cookie等について</h2>
          <p>
            当サイトでは現在、アクセス解析ツールや広告配信を目的としたCookieは使用していません。今後これらを導入する場合は、本ポリシーを改定してお知らせします。
          </p>

          <h2>7. 安全管理措置</h2>
          <p>当事業者は、取り扱う個人情報の漏えい・滅失・毀損を防止するため、次のような安全管理措置を講じます。</p>
          <ul>
            <li>個人情報を取り扱う者を限定し、アクセスできる範囲を必要最小限にします</li>
            <li>個人情報を取り扱う機器・アカウントは、パスワード等で適切に管理します</li>
            <li>当サイトとの通信は暗号化（SSL/TLS）しています</li>
            <li>利用目的の達成に必要な範囲で保管し、不要となった個人情報は適切な方法で削除します</li>
          </ul>

          <h2>8. 開示・訂正・利用停止等のご請求</h2>
          <p>
            ご本人から、保有個人データの利用目的の通知、開示、訂正・追加・削除、利用停止・消去、第三者提供の停止などのご請求があった場合は、ご本人であることを確認したうえで、法令に従い遅滞なく対応します。ご請求は、下記のお問い合わせ窓口までご連絡ください。
          </p>

          <h2>9. お問い合わせ窓口</h2>
          <p>個人情報の取り扱いに関するお問い合わせ・苦情は、次の窓口までご連絡ください。</p>
          <ul>
            <li>
              {site.name}（代表：{site.representative}）　電話：<a href={telHref()}>{site.tel}</a>
            </li>
            {site.email && (
              <li>
                メール：<a href={mailHref('個人情報の取り扱いについて')}>{site.email}</a>
              </li>
            )}
            <li>
              <Link to="/contact">お問い合わせフォーム</Link>
            </li>
          </ul>

          <h2>10. 改定</h2>
          <p>本ポリシーの内容は、法令の改正や事業内容の変更に応じて改定することがあります。改定後の内容は、本ページに掲載した時点から効力を生じます。</p>

          {site.privacyEstablished && <p className="prose-date">制定日：{site.privacyEstablished}</p>}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
