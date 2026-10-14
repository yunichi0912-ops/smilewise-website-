/**
 * 料金データ（サイト全体の料金表示はすべてこのファイルから参照します）
 * 金額を変更するときは、ここだけを書き換えてください。
 */
export const nikoniko = {
  name: 'ニコニコプラン',
  service: 'ホームページ制作',
  initial: 2525, // 初期制作費
  monthly: 10000, // 月額管理費（月払い）
  yearly: 108000, // 年払い
};

/** 年払いのお得額（月払い12か月分 − 年払い） */
export const yearlySaving = nikoniko.monthly * 12 - nikoniko.yearly;
/** 年払いの月あたり換算 */
export const yearlyPerMonth = Math.round(nikoniko.yearly / 12);

export const systemPrice = {
  name: '業務管理システム開発・導入',
  from: 150000, // 参考価格（〜）
  note: '参考価格。機能や規模によって個別にお見積りします。',
};

/**
 * プランに含まれる内容・ご契約条件
 * 確定した内容をここに追記すると、料金ページとトップページに一覧で表示されます。
 * （空の間は「詳細はお問い合わせ時にご説明します」と表示されます）
 * 例: nikonikoIncludes = ['スマートフォン・パソコン対応', ...]
 */
export const nikonikoIncludes = [];
export const nikonikoTerms = [];

export const yen = (n) => n.toLocaleString('ja-JP');
