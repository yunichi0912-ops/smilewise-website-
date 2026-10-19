import { nikoniko, systemPrice, monthlyEquivalent, firstYearTotal, yen, price } from './pricing.js';

/**
 * サービス一覧。トップページ・サービス紹介ページ・料金ページで共通利用します。
 * 料金の数値は src/data/pricing.js で管理しています。
 */
export const services = [
  {
    id: 'web',
    icon: 'monitor',
    en: 'Website',
    title: 'ホームページ制作',
    plan: nikoniko.name,
    lead: `初期制作費 ${price(nikoniko.initial)} で始める、ニコニコプラン。`,
    text: `企業の強みや想いを丁寧にヒアリングし、スマートフォン・タブレットでも見やすいホームページを制作します（最大${nikoniko.maxPages}ページ）。サーバー・ドメインの管理、SSL・セキュリティ対応、基本SEO設定、お問い合わせフォームの設置・管理、公開後の保守・サポートまで。軽微な文章・画像修正は回数制限なく対応します。`,
    priceLabel: `初期制作費 ${price(nikoniko.initial)}`,
    priceSub: `初年度総額 ${price(firstYearTotal)}／2年目以降 年間管理費 ${price(nikoniko.annual)}（月額換算${yen(monthlyEquivalent)}円・年払いのみ）・最低契約期間${nikoniko.minMonths}か月`,
    href: '/nikoniko',
    featured: true,
  },
  {
    id: 'system',
    icon: 'system',
    en: 'Business System',
    title: '業務管理システム開発・導入',
    lead: 'バラバラのExcel管理から、ひとつのシステムへ。',
    text: '見積書・請求書、顧客、案件・工事の進捗、売上・入金。会社ごとに異なる業務の流れに合わせて、パソコンでもスマートフォンでも使える業務管理システムをオーダーメイドで制作します。',
    priceLabel: price(systemPrice.from, '〜'),
    priceSub: '個別見積もり',
    href: '/system',
    featured: true,
  },
  {
    id: 'recruit',
    icon: 'people',
    en: 'Landing Page',
    title: 'ランディングページ制作',
    lead: '採用・集客など、目的に合わせた1ページを。',
    text: '採用、商品・サービスの紹介、キャンペーンの告知など、目的に合わせて情報を1ページにわかりやすくまとめたランディングページ（LP）を制作します。求人媒体や広告からの誘導先としてもご活用いただけます。',
    priceLabel: 'お見積り',
  },
  {
    id: 'print',
    icon: 'print',
    en: 'Print Design',
    title: '名刺・チラシ・パンフレット制作',
    lead: '手に取った瞬間に、印象に残るデザインを。',
    text: '名刺・チラシ・パンフレット・リーフレットなど、紙媒体のデザインを制作します。ホームページとデザインのトーンを揃えることで、会社としての統一感を高めます。',
    priceLabel: 'お見積り',
  },
  {
    id: 'logo',
    icon: 'pen',
    en: 'Logo & Signage',
    title: 'ロゴ・看板制作',
    lead: '会社の「顔」を、長く愛されるかたちに。',
    text: '企業理念や事業内容をもとに、覚えてもらいやすく、さまざまな媒体で使いやすいロゴを制作します。店舗・事務所の看板デザインにも対応します。',
    priceLabel: 'お見積り',
  },
];
