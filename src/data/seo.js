/**
 * ページごとのSEO情報（タイトル・説明文）。
 * ビルド時の静的HTML生成（scripts/prerender.mjs）と、画面遷移時の <title> 更新の両方で使われます。
 */
import { site } from './site.js';
import { nikoniko, systemPrice, monthlyEquivalent, firstYearTotal, yen, price } from './pricing.js';
import { nikonikoFaq } from './faq.js';

const brand = `${site.name}（${site.nameKana}）`;
const suffix = `｜北九州市のホームページ制作 ${site.name}`;

export const pages = [
  {
    path: '/',
    title: `北九州市のホームページ制作・業務管理システム開発｜${brand}`,
    description: `北九州市八幡西区の${brand}は、ホームページ制作・LP制作・業務管理システム開発・IT/DX支援を行うWeb制作事業者です。初期制作費${price(nikoniko.initial)}の「${nikoniko.name}」、業務管理システム開発・導入は${price(systemPrice.from, '〜')}。`,
  },
  {
    path: '/nikoniko',
    title: `ホームページ制作「${nikoniko.name}」初期制作費${yen(nikoniko.initial)}円${suffix}`,
    description: `初期制作費${price(nikoniko.initial)}、年間管理・運用費${price(nikoniko.annual)}（月額換算${yen(monthlyEquivalent)}円・年払いのみ）。初年度総額${price(firstYearTotal)}。最大${nikoniko.maxPages}ページ制作・スマートフォン対応・基本SEO設定、軽微な修正は回数制限なし。最低契約期間${nikoniko.minMonths}か月。`,
    // よくある質問の構造化データ（検索結果に表示される場合があります）
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: nikonikoFaq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  },
  {
    path: '/services',
    title: `サービス一覧｜ホームページ・LP・印刷物・ロゴ制作、業務管理システム${suffix}`,
    description: `北九州市の${site.name}のサービス一覧。ホームページ制作（${nikoniko.name}）、採用などのランディングページ制作、名刺・チラシ・パンフレット・ロゴ・看板のデザイン、業務管理システム開発・導入、IT・DX支援。`,
  },
  {
    path: '/system',
    title: `業務管理システム開発・導入｜Excel管理を一元化${suffix}`,
    description: `見積書・請求書、顧客・取引先、案件・工事進捗、売上・入金をひとつにまとめる業務管理システムを、北九州市の建設業・製造業・中小企業向けにオーダーメイドで開発・導入します。${price(systemPrice.from, '〜')}（個別見積もり）。`,
  },
  {
    path: '/works',
    title: `制作実績${suffix}`,
    description: `北九州市の${site.name}が制作したホームページ・デザイン・業務システムの実績を、掲載許可をいただいたものから順次ご紹介します。`,
  },
  {
    path: '/pricing',
    title: `料金案内｜ニコニコプラン・業務管理システムの料金（税込）${suffix}`,
    description: `ホームページ制作「${nikoniko.name}」は初期制作費${price(nikoniko.initial)}、年間管理・運用費${price(nikoniko.annual)}（年払いのみ・初年度総額${price(firstYearTotal)}）。業務管理システム開発・導入は${price(systemPrice.from, '〜')}。その他のサービスは個別見積もり。`,
  },
  {
    path: '/about',
    title: `事業概要｜北九州市八幡西区のWeb制作・システム開発${suffix}`,
    description: `${brand}の事業概要。代表：${site.representative}。所在地：${site.addressRegion}${site.addressLocality}。ホームページ制作、LP制作、名刺・チラシ・ロゴ制作、業務管理システム開発・導入、IT・DX支援。`,
  },
  {
    path: '/contact',
    title: `お問い合わせ（電話・LINE・メール）${suffix}`,
    description: `ホームページ制作・業務管理システムのご相談・お見積りは無料です。電話（${site.tel}）、LINE、メールフォームからお気軽にどうぞ。北九州市を中心に対応しています。`,
  },
  {
    path: '/privacy',
    title: `プライバシーポリシー${suffix}`,
    description: `${brand}の個人情報の取り扱い（取得する情報、利用目的、外部サービスの利用、開示等のご請求、お問い合わせ窓口）について。`,
  },
];

export const notFoundPage = {
  path: '/404',
  title: `ページが見つかりません｜${site.name}`,
  description: 'お探しのページは見つかりませんでした。',
};

export const findPage = (pathname) => {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return pages.find((p) => p.path === normalized) ?? notFoundPage;
};
