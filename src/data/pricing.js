/**
 * 料金・プラン内容・契約条件のデータ
 * サイト全体の料金表示はすべてこのファイルから参照します（金額はすべて税込）。
 * 金額や条件を変更するときは、ここだけを書き換えてください。
 */

export const TAX = '（税込）';

export const yen = (n) => n.toLocaleString('ja-JP');
/** 例: 2,525円（税込） */
export const price = (n, suffix = '') => `${yen(n)}円${suffix}${TAX}`;

export const nikoniko = {
  name: 'ニコニコプラン',
  service: 'ホームページ制作',
  initial: 2525, // 初期制作費（税込）
  monthly: 9500, // 管理費・月払い（税込・1か月あたり）
  annual: 96000, // 管理費・年払い（税込・1年あたり）
  minMonths: 12, // 最低契約期間（か月）
  maxPages: 5, // 基本制作ページ数の上限
  payment: '月払い または 年払い',
};

/** 年払いの月換算（年払い ÷ 12） */
export const monthlyEquivalent = nikoniko.annual / 12;
/** 月払いの年間合計（月払い × 12か月） */
export const monthlyYearTotal = nikoniko.monthly * 12;
/** 年払いにした場合に、月払いより年間でお得になる金額 */
export const annualSaving = monthlyYearTotal - nikoniko.annual;
/** 初年度総額（年払い）：初期制作費＋年払い */
export const firstYearTotal = nikoniko.initial + nikoniko.annual;
/** 初年度総額（月払い）：初期制作費＋月払い×12か月 */
export const firstYearMonthlyTotal = nikoniko.initial + monthlyYearTotal;
/** 2年目以降（年間・年払い） */
export const laterYears = nikoniko.annual;

/** お支払い方法ごとの料金（切り替え表示・比較用） */
export const paymentPlans = [
  {
    id: 'annual',
    label: '年払い',
    badge: `年間${yen(annualSaving)}円お得`,
    fee: nikoniko.annual,
    unit: '年',
    sub: `月換算 ${yen(monthlyEquivalent)}円`,
    schedule: '年1回のお支払い',
    yearTotal: nikoniko.annual,
    firstYear: firstYearTotal,
  },
  {
    id: 'monthly',
    label: '月払い',
    badge: '',
    fee: nikoniko.monthly,
    unit: '月',
    sub: `年間合計 ${yen(monthlyYearTotal)}円`,
    schedule: '毎月のお支払い',
    yearTotal: monthlyYearTotal,
    firstYear: firstYearMonthlyTotal,
  },
];

/**
 * お支払い方法（クレジットカード決済〈Stripe〉・銀行振込）
 * 決済リンク・振込先口座はサイトに掲載せず、ご契約時に個別にご案内します。
 */
export const paymentMethods = [
  {
    id: 'card',
    label: 'クレジットカード決済',
    via: 'Stripe',
    monthly: '毎月の自動決済',
    annual: '年額を一括で決済',
  },
  {
    id: 'bank',
    label: '銀行振込',
    via: '請求書',
    monthly: '毎月請求書を発行し、指定期日までにお振込み',
    annual: '請求書による年額の一括払い',
  },
];
/** お支払いに関する共通事項 */
export const paymentCommon = [
  `初期制作費は${price(nikoniko.initial)}です`,
  `最低契約期間は、月払い・年払いどちらも${nikoniko.minMonths}か月です`,
  '銀行振込の振込手数料は、お客様のご負担となります',
  '初回のご入金を確認したあとに、制作を開始します',
  '毎月の具体的なお支払い期日は、ご契約時にご案内します',
];
/** サイト上で決済の準備が完了していると誤解されないための案内 */
export const paymentProcedureNote =
  'クレジットカード決済のお手続き（決済ページ）や、振込先口座・請求書は、ご契約時に個別にご案内します。このサイト上でお支払いいただくことはありません。';

/** ページ追加オプション（基本の最大5ページを超える場合） */
export const pageOptions = [
  { title: '通常ページ', when: `${nikoniko.maxPages + 1}ページ目以降`, price: 10000, unit: '1ページ' },
  { title: '簡易ページ', when: '施工実績・事例紹介など', price: 5000, unit: '1ページ' },
  { title: '特殊デザイン・機能', when: '特別なデザインや機能が必要なページ', price: null, unit: '' },
];
export const pageOptionNote = '追加ページの料金は、原則1回限りの制作費です。';

/** ニコニコプランに含まれる内容 */
export const nikonikoIncludes = [
  { icon: 'monitor', title: `ホームページ制作（最大${nikoniko.maxPages}ページ）`, text: `最大${nikoniko.maxPages}ページまでのホームページを制作します。` },
  { icon: 'phone', title: 'スマートフォン・タブレット対応', text: 'スマートフォンやタブレットでも見やすいレイアウトで制作します。' },
  { icon: 'system', title: 'サーバー管理', text: 'ホームページを公開するサーバーを管理します。' },
  { icon: 'map', title: 'ドメイン管理', text: 'ホームページのドメインを管理します。' },
  { icon: 'shield', title: 'SSL・セキュリティ対応', text: '通信の暗号化（SSL）など、安心して閲覧できる状態を保ちます。' },
  { icon: 'chart', title: '基本SEO設定', text: 'タイトルや説明文など、検索エンジン向けの基本設定を行います。' },
  { icon: 'mail', title: 'お問い合わせフォーム設置・管理', text: 'ホームページにお問い合わせフォームを設置し、管理します。' },
  { icon: 'pen', title: '軽微な文章・画像修正は回数制限なし', text: '下記「無料修正の範囲」の修正に、回数制限なく対応します。' },
  { icon: 'chat', title: '公開後の保守・サポート', text: '公開後も、ホームページの保守とご相談に対応します。' },
];

/** ご希望の方に対応するサービス（プランの標準内容とは別に紹介） */
export const nikonikoOptions = [
  { title: 'Googleアナリティクスの設定', text: 'ご希望の方には、アクセス状況を確認できるGoogleアナリティクスの設定にも対応します。' },
];

/** 無料修正の範囲（管理費に含まれる軽微な修正） */
export const freeFixes = [
  '文章の修正',
  '営業時間や電話番号の変更',
  '支給写真の差し替え',
  'リンクの修正',
  '既存ページ内の軽微なレイアウト調整',
];

/** 別途お見積りとなる作業 */
export const extraWorks = [
  '全面リニューアル',
  '大幅なデザイン変更',
  '新規画像の制作',
  '写真撮影',
  '文章の作成',
  '予約・決済機能',
  'システム開発',
];

export const fixNote = '修正回数に制限はありませんが、作業内容に応じて対応期間を調整させていただきます。';

/**
 * 契約条件
 * decided: 確定している条件（サイトに掲載）
 * 未確定の条件（途中解約時の精算・契約更新方法・解約申請期限・ドメインの取得/更新費・データ引き渡し）は
 * 正式決定後に decided へ追加してください。決定前はサイト上で「ご契約前にご説明します」と表示します。
 */
export const contractTerms = {
  decided: [
    { label: '最低契約期間', value: `${nikoniko.minMonths}か月` },
    { label: 'お支払いプラン', value: `月払い（${yen(nikoniko.monthly)}円／月）または 年払い（${yen(nikoniko.annual)}円／年）` },
    { label: 'お支払い方法', value: 'クレジットカード決済（Stripe）または銀行振込' },
    { label: '振込手数料', value: '銀行振込の場合、振込手数料はお客様のご負担となります' },
    { label: '制作の開始', value: '初回のご入金を確認したあとに開始します' },
    { label: 'お支払い期日', value: '毎月の具体的なお支払い期日は、ご契約時にご案内します' },
  ],
  pendingNote: 'その他のご契約条件（契約の更新・解約の手続き、ドメイン費用の扱いなど）は、ご契約前に個別にご説明します。',
};

export const systemPrice = {
  name: '業務管理システム開発・導入',
  from: 150000, // 税込・〜（個別見積もり）
  note: '税込・個別見積もり。機能や規模に応じてお見積りします。',
};

