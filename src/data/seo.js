/**
 * ページごとのSEO情報（タイトル・説明文）。
 * ビルド時の静的HTML生成（scripts/prerender.mjs）と、画面遷移時の <title> 更新の両方で使われます。
 */
import { site } from './site.js';
import { nikoniko, systemPrice, monthlyEquivalent, firstYearTotal, yen, price } from './pricing.js';
import { nikonikoFaq } from './faq.js';

const suffix = `｜${site.name}（北九州市のWeb制作・業務システム開発）`;

export const pages = [
  {
    path: '/',
    title: `北九州市のホームページ制作・業務管理システム開発・DX支援｜${site.name}`,
    description: `北九州市のホームページ制作・IT/DX支援。初期制作費${price(nikoniko.initial)}、年間管理・運用費${price(nikoniko.annual)}（月額換算${yen(monthlyEquivalent)}円）の「${nikoniko.name}」で、最大${nikoniko.maxPages}ページのホームページを制作。業務管理システム開発・導入（${price(systemPrice.from, '〜')}）にも対応します。`,
  },
  {
    path: '/services',
    title: `サービス紹介${suffix}`,
    description:
      `ホームページ制作（${nikoniko.name}）、業務管理システム開発・導入、採用LP制作、名刺・チラシ・パンフレット制作、ロゴ・看板制作。北九州市の企業のWeb・デザイン・業務効率化をトータルで支援します。`,
  },
  {
    path: '/nikoniko',
    title: `ニコニコプラン（初期制作費${yen(nikoniko.initial)}円）｜北九州市のホームページ制作｜${site.name}`,
    description: `ホームページ制作「${nikoniko.name}」。初期制作費${price(nikoniko.initial)}、年間管理・運用費${price(nikoniko.annual)}（月額換算${yen(monthlyEquivalent)}円・お支払いは年1回）。最大${nikoniko.maxPages}ページ制作、スマートフォン対応、基本SEO設定、軽微な修正は回数制限なし。`,
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
    path: '/system',
    title: `業務管理システム開発・導入${suffix}`,
    description:
      `バラバラのExcel管理から、ひとつのシステムへ。見積書・請求書、顧客・取引先、案件・工事進捗、売上・入金をまとめて管理できる業務システムを、北九州市の建設業・製造業・中小企業向けにオーダーメイドで制作します。参考価格${price(systemPrice.from, '〜')}。`,
  },
  {
    path: '/works',
    title: `制作実績${suffix}`,
    description: `${site.name}の制作実績をご紹介します。`,
  },
  {
    path: '/pricing',
    title: `料金案内（ニコニコプラン・業務管理システム）${suffix}`,
    description:
      `ホームページ制作「${nikoniko.name}」は初期制作費${price(nikoniko.initial)}、年間管理・運用費${price(nikoniko.annual)}（月額換算${yen(monthlyEquivalent)}円・年払いのみ）。初年度総額${price(firstYearTotal)}、最低契約期間${nikoniko.minMonths}か月。業務管理システム開発・導入は${price(systemPrice.from, '〜')}（参考価格）。`,
  },
  {
    path: '/about',
    title: `事業概要${suffix}`,
    description: `${site.name}の事業概要。北九州市を拠点に、Web制作・デザイン・業務管理システム開発を行っています。`,
  },
  {
    path: '/contact',
    title: `お問い合わせ${suffix}`,
    description:
      'ホームページ制作・業務管理システム・デザイン制作のご相談、お見積りのご依頼はこちらから。北九州市を中心に対応しています。',
  },
  {
    path: '/privacy',
    title: `プライバシーポリシー${suffix}`,
    description: `${site.name}の個人情報の取り扱いについて。`,
  },
];

export const notFoundPage = {
  path: '/404',
  title: `ページが見つかりません${suffix}`,
  description: 'お探しのページは見つかりませんでした。',
};

export const findPage = (pathname) => {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return pages.find((p) => p.path === normalized) ?? notFoundPage;
};
