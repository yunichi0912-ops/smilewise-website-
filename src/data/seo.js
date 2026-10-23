/**
 * ページごとのSEO情報（タイトル・説明文）。
 * ビルド時の静的HTML生成（scripts/prerender.mjs）と、画面遷移時の <title> 更新の両方で使われます。
 */
import { site } from './site.js';
import { nikoniko, systemPrice, monthlyEquivalent, firstYearTotal, yen, price } from './pricing.js';
import { nikonikoFaq } from './faq.js';

const brand = `${site.name}（${site.nameKana}）`;
/** 全ページのタイトル末尾に屋号（英字＋カタカナ）を入れ、サイト名として認識されやすくする */
const suffix = `｜${brand}`;

export const pages = [
  {
    path: '/',
    title: `${brand}｜北九州市・筑豊のホームページ制作・業務管理システム開発`,
    description: `${brand}は、北九州市八幡西区を拠点に北九州市・筑豊エリアでホームページ制作・LP制作・業務管理システム開発・IT/DX支援を行うWeb制作事業者です。「${nikoniko.name}」は初期制作費${price(nikoniko.initial)}、初年度総額${price(firstYearTotal)}（年払いのみ）。業務管理システムは${price(systemPrice.from, '〜')}。`,
  },
  {
    path: '/nikoniko',
    title: `ニコニコプラン｜北九州市・筑豊のホームページ制作 初期${yen(nikoniko.initial)}円${suffix}`,
    description: `ホームページ制作「${nikoniko.name}」初期制作費${price(nikoniko.initial)}、初年度総額${price(firstYearTotal)}、2年目以降は年間管理費${price(nikoniko.annual)}（月額換算${yen(monthlyEquivalent)}円・年払いのみ）。最大${nikoniko.maxPages}ページ、スマホ・タブレット対応、サーバー・ドメイン管理、SSL、保守・サポート込み。`,
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
    title: `サービス一覧｜北九州市・筑豊のホームページ・LP・ロゴ制作、業務システム${suffix}`,
    description: `北九州市・筑豊の${brand}のサービス一覧。ホームページ制作（${nikoniko.name}）、採用などのランディングページ制作、名刺・チラシ・パンフレット・ロゴ・看板のデザイン、業務管理システム開発・導入、IT・DX支援。`,
  },
  {
    path: '/system',
    title: `業務管理システム開発・導入｜北九州市・筑豊の企業向け${suffix}`,
    description: `見積書・請求書、顧客・取引先、案件・工事進捗、売上・入金をひとつにまとめる業務管理システムを、北九州市・筑豊の建設業・製造業・中小企業向けにオーダーメイドで開発・導入します。${price(systemPrice.from, '〜')}（個別見積もり）。`,
  },
  {
    path: '/works',
    title: `制作実績｜北九州市・筑豊のホームページ制作${suffix}`,
    description: `北九州市・筑豊の${brand}が制作したホームページ・デザイン・業務システムの実績を、掲載許可をいただいたものから順次ご紹介します。`,
  },
  {
    path: '/pricing',
    title: `料金案内｜ホームページ制作・業務管理システムの料金（税込）${suffix}`,
    description: `ホームページ制作「${nikoniko.name}」は初期制作費${price(nikoniko.initial)}、初年度総額${price(firstYearTotal)}、2年目以降は年間管理費${price(nikoniko.annual)}（年払いのみ・月額換算${yen(monthlyEquivalent)}円）。業務管理システム開発・導入は${price(systemPrice.from, '〜')}。`,
  },
  {
    path: '/about',
    title: `事業概要｜北九州市八幡西区のホームページ制作・システム開発${suffix}`,
    description: `${brand}の事業概要。代表：${site.representative}。所在地：${site.addressRegion}${site.addressLocality}。北九州市・筑豊を中心に、ホームページ制作、LP制作、名刺・チラシ・ロゴ制作、業務管理システム開発・導入、IT・DX支援を行っています。`,
  },
  {
    path: '/contact',
    title: `お問い合わせ（電話・LINE・メール）${suffix}`,
    description: `ホームページ制作・業務管理システムのご相談・お見積りは無料です。電話（${site.tel}）、LINE、メールフォームからお気軽にどうぞ。北九州市・筑豊を中心に対応しています。`,
  },
  {
    path: '/privacy',
    title: `プライバシーポリシー${suffix}`,
    description: `${brand}の個人情報の取り扱い（取得する情報、利用目的、外部サービスの利用、開示等のご請求、お問い合わせ窓口）について。`,
  },
];

export const notFoundPage = {
  path: '/404',
  title: `ページが見つかりません｜${brand}`,
  description: 'お探しのページは見つかりませんでした。',
};

export const findPage = (pathname) => {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return pages.find((p) => p.path === normalized) ?? notFoundPage;
};
