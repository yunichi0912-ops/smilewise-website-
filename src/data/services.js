/**
 * サービス一覧。トップページ・サービス紹介ページ・料金ページで共通利用します。
 * price は数値（円）。未定のものは null にすると「お見積り」と表示されます。
 */
export const services = [
  {
    id: 'web',
    icon: 'monitor',
    en: 'Website',
    title: 'ホームページ制作',
    lead: '信頼が伝わる、成果につながるホームページを。',
    text: '企業の強みや想いを丁寧にヒアリングし、スマートフォン・パソコンのどちらでも見やすいホームページを制作します。SEOの基本設定やお問い合わせフォームまで、公開に必要な要素をまとめてご用意します。',
    points: ['スマートフォン・パソコン両対応', 'SEOの基本設定', 'お問い合わせフォーム設置', '公開・ドメイン設定のサポート'],
    price: 150000,
    priceSuffix: '',
    priceNote: '',
  },
  {
    id: 'system',
    icon: 'system',
    en: 'Business System',
    title: '業務管理システム開発・導入',
    lead: 'バラバラのExcel管理から、ひとつのシステムへ。',
    text: '見積書・請求書、顧客、案件・工事の進捗、売上・入金。会社ごとに異なる業務の流れに合わせて、パソコンでもスマートフォンでも使える業務管理システムをオーダーメイドで制作します。',
    points: ['見積・請求の一括管理', '顧客・取引先管理', '案件・工事進捗管理', 'Excelデータの移行'],
    price: 100000,
    priceSuffix: '〜',
    priceNote: '参考価格。機能・規模により個別にお見積りします。',
    href: '/system',
    featured: true,
  },
  {
    id: 'recruit',
    icon: 'people',
    en: 'Recruit LP',
    title: '採用LP制作',
    lead: '求職者の「ここで働きたい」を後押し。',
    text: '仕事内容や職場の雰囲気、働く魅力を1ページにわかりやすくまとめた採用専用のランディングページを制作します。求人媒体からの誘導先としてもご活用いただけます。',
    points: ['求職者目線の構成', '応募フォーム設置', '求人媒体・SNSとの連携'],
    price: null,
  },
  {
    id: 'print',
    icon: 'print',
    en: 'Print Design',
    title: '名刺・チラシ・パンフレット制作',
    lead: '手に取った瞬間に、印象に残るデザインを。',
    text: '名刺・チラシ・パンフレット・リーフレットなど、紙媒体のデザインを制作します。ホームページとデザインのトーンを揃えることで、会社としての統一感を高めます。',
    points: ['名刺・ショップカード', 'チラシ・ポスター', 'パンフレット・会社案内'],
    price: null,
  },
  {
    id: 'logo',
    icon: 'pen',
    en: 'Logo & Signage',
    title: 'ロゴ・看板制作',
    lead: '会社の「顔」を、長く愛されるかたちに。',
    text: '企業理念や事業内容をもとに、覚えてもらいやすく、さまざまな媒体で使いやすいロゴを制作します。店舗・事務所の看板デザインにも対応します。',
    points: ['ロゴマーク・ロゴタイプ', '看板・サインのデザイン', '各種データ形式で納品'],
    price: null,
  },
  {
    id: 'maintenance',
    icon: 'shield',
    en: 'Maintenance',
    title: 'ホームページ年間管理',
    lead: '公開後も、安心してお任せください。',
    text: 'ホームページ公開後の軽微な更新、動作確認、サーバー・ドメインまわりのご相談など、運用をサポートします。',
    points: ['軽微な文章・画像の更新', '定期的な動作確認', '運用に関するご相談'],
    price: 48000,
    priceSuffix: '／年',
    priceNote: '',
  },
];

export const formatPrice = (service) =>
  service.price == null
    ? 'お見積り'
    : `${service.price.toLocaleString('ja-JP')}円${service.priceSuffix ?? ''}`;
