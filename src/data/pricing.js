/**
 * 料金・プラン内容・契約条件のデータ
 * サイト全体の料金表示はすべてこのファイルから参照します（金額はすべて税込）。
 * 金額や条件を変更するときは、ここだけを書き換えてください。
 */

export const TAX = '（税込）';

export const nikoniko = {
  name: 'ニコニコプラン',
  service: 'ホームページ制作',
  initial: 2525, // 初期制作費（税込）
  annual: 114000, // 年間管理・運用費（税込・年払いのみ）
  minMonths: 12, // 最低契約期間（か月）
  maxPages: 5, // 制作ページ数の上限
  payment: '年払いのみ（年1回）',
};

/** 月額換算（年間管理・運用費 ÷ 12）。実際のお支払いは年1回です */
export const monthlyEquivalent = nikoniko.annual / 12;
/** 初年度総額（初期制作費＋年間管理・運用費） */
export const firstYearTotal = nikoniko.initial + nikoniko.annual;
/** 2年目以降（年間） */
export const laterYears = nikoniko.annual;

/** ニコニコプランに含まれる内容 */
export const nikonikoIncludes = [
  { icon: 'monitor', title: `最大${nikoniko.maxPages}ページ制作`, text: `最大${nikoniko.maxPages}ページまでのホームページを制作します。` },
  { icon: 'phone', title: 'スマートフォン対応', text: 'スマートフォンでも見やすいレイアウトで制作します。' },
  { icon: 'chart', title: '基本SEO設定', text: 'タイトルや説明文など、検索エンジン向けの基本設定を行います。' },
  { icon: 'pen', title: '軽微な修正は回数制限なし', text: '下記「無料修正の範囲」の修正に、回数制限なく対応します。' },
];

/** 無料修正の範囲（年間管理・運用費に含まれる軽微な修正） */
export const freeFixes = [
  '文章の修正',
  '営業時間や電話番号の変更',
  '支給写真の差し替え',
  'リンクの修正',
  '既存ページ内の軽微なレイアウト調整',
];

/** 別途お見積りとなる作業 */
export const extraWorks = [
  '新規ページの追加',
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
    { label: 'お支払い方法', value: nikoniko.payment },
  ],
  pendingNote: 'その他のご契約条件（契約の更新・解約の手続き、ドメイン費用の扱いなど）は、ご契約前に個別にご説明します。',
};

export const systemPrice = {
  name: '業務管理システム開発・導入',
  from: 150000, // 参考価格（税込・〜）
  note: '参考価格。機能や規模によって個別にお見積りします。',
};

export const yen = (n) => n.toLocaleString('ja-JP');
/** 例: 2,525円（税込） */
export const price = (n, suffix = '') => `${yen(n)}円${suffix}${TAX}`;
