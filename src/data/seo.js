/**
 * ページごとのSEO情報（タイトル・説明文）。
 * ビルド時の静的HTML生成（scripts/prerender.mjs）と、画面遷移時の <title> 更新の両方で使われます。
 */
import { site } from './site.js';

const suffix = `｜${site.name}（北九州市のWeb制作・業務システム開発）`;

export const pages = [
  {
    path: '/',
    title: `北九州市のホームページ制作・業務管理システム開発${'｜' + site.name}`,
    description: site.description,
  },
  {
    path: '/services',
    title: `サービス紹介${suffix}`,
    description:
      'ホームページ制作、業務管理システム開発・導入、採用LP制作、名刺・チラシ・パンフレット制作、ロゴ・看板制作。北九州市の企業のWeb・デザイン・業務効率化をトータルで支援します。',
  },
  {
    path: '/system',
    title: `業務管理システム開発・導入${suffix}`,
    description:
      'バラバラのExcel管理から、ひとつのシステムへ。見積書・請求書、顧客・取引先、案件・工事進捗、売上・入金をまとめて管理できる業務システムを、北九州市の建設業・製造業・中小企業向けにオーダーメイドで制作します。',
  },
  {
    path: '/works',
    title: `制作実績${suffix}`,
    description: `${site.name}の制作実績をご紹介します。`,
  },
  {
    path: '/pricing',
    title: `料金案内${suffix}`,
    description:
      'ホームページ制作150,000円、年間管理費48,000円、業務管理システム導入100,000円〜（参考価格）。採用LP・印刷物・ロゴ・看板は内容に応じてお見積りします。',
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
