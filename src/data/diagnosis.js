/**
 * 無料ホームページ診断（/diagnosis）の質問と、回答から診断結果を作るロジック
 *
 * 料金は src/data/pricing.js の値を使います（ここに金額を直接書かないでください）。
 * 標準料金（ニコニコプラン）で案内できるのは「会社・店舗ホームページ（最大5ページ）」のみです。
 * LP・特殊な機能・プランの範囲を超える内容は、同じ料金と断定せず「個別見積もり」と表示します。
 */
import { nikoniko, firstYearTotal, firstYearMonthlyTotal, annualSaving, pageOptions, extraWorks, yen } from './pricing.js';

export const questions = [
  {
    id: 'type',
    title: 'どのようなサイトをご希望ですか？',
    options: [
      { value: 'corporate', label: '会社・店舗のホームページ', sub: '会社案内・お店の紹介など' },
      { value: 'lp', label: 'LP（ランディングページ）', sub: '1ページで商品・サービスを紹介' },
      { value: 'renewal', label: '今のサイトのリニューアル', sub: '古くなった・スマホで見づらい' },
      { value: 'undecided', label: 'まだ決めていない', sub: '何が合うか知りたい' },
    ],
  },
  {
    id: 'purpose',
    title: 'いちばんの目的は何ですか？',
    options: [
      { value: 'attract', label: '集客・お問い合わせを増やしたい' },
      { value: 'trust', label: '信頼性を高めたい', sub: '取引先・お客様に安心してほしい' },
      { value: 'recruit', label: '採用・求人に活かしたい' },
      { value: 'intro', label: '事業内容をわかりやすく紹介したい' },
    ],
  },
  {
    id: 'current',
    title: '現在、ホームページはありますか？',
    options: [
      { value: 'none', label: 'ない' },
      { value: 'builder', label: 'Wixなどで自分で作ったものがある' },
      { value: 'agency', label: '制作会社が管理しているものがある' },
      { value: 'other', label: 'その他・わからない' },
    ],
  },
  {
    id: 'timing',
    title: '公開の希望時期はいつ頃ですか？',
    options: [
      { value: 'asap', label: 'できるだけ早く' },
      { value: 'month', label: '1か月以内' },
      { value: 'quarter', label: '3か月以内' },
      { value: 'undecided', label: 'まだ決めていない' },
    ],
  },
];

export const answerLabel = (qid, value) =>
  questions.find((q) => q.id === qid)?.options.find((o) => o.value === value)?.label ?? '';

/** 目的ごとに、構成例に加えるページと、制作のポイント */
const purposePlans = {
  attract: {
    page: { name: 'サービス・料金', note: '提供内容と料金の目安をわかりやすく' },
    points: ['「北九州市 ＋ 業種」など、地域名で探される言葉を意識した文章構成', 'スマホから電話・LINE・フォームへすぐ連絡できる導線', 'よくある質問で、問い合わせ前の不安を解消'],
  },
  trust: {
    page: { name: '会社概要・代表あいさつ', note: '事業者の顔が見える情報' },
    points: ['所在地・代表者・事業内容をきちんと掲載して安心感を', '落ち着いた配色と読みやすい文字組みで、きちんとした印象に', '実績は、掲載許可をいただいたものだけを掲載'],
  },
  recruit: {
    page: { name: '採用情報', note: '仕事内容・働く環境・募集要項' },
    points: ['仕事内容や1日の流れなど、求職者が知りたい情報を整理', '求人媒体からのリンク先として使える採用ページ', 'スマホでも応募・問い合わせまで迷わない導線'],
  },
  intro: {
    page: { name: '事業内容', note: '事業ごとの特徴・対応範囲' },
    points: ['事業の強みが一目で伝わるトップページ', '専門的な内容も、図や見出しで整理してわかりやすく', '取引先にURLを送るだけで紹介できるサイトに'],
  },
};

/** 現在のサイトの状況ごとの補足 */
const currentNotes = {
  none: '初めてのホームページでも、原稿の準備や写真選びからご相談いただけます。',
  builder: '今のサイトの文章や画像を活かせるか、ドメイン（URL）の状況とあわせて確認します。',
  agency: '現在の制作会社との契約内容や、ドメイン・サーバーの管理者を事前に確認させてください。',
  other: '現在の状況がわからなくても大丈夫です。ヒアリングの中で一緒に確認します。',
};

/** 希望時期ごとの補足（具体的な納期は内容確認後にご案内） */
const timingNotes = {
  asap: 'お急ぎの場合は、まず掲載内容を絞って早めに公開する進め方もご相談できます。具体的な公開日は内容を確認してからご案内します。',
  month: '1か月以内の公開をご希望とのこと、原稿や写真のご準備状況を伺ってスケジュールをご提案します。',
  quarter: '3か月以内であれば、内容をじっくり固めながら進められます。',
  undecided: '時期が決まっていなくても大丈夫です。まずはデザイン案を見てからご検討ください。',
};

/** 標準料金（ニコニコプラン）の表示用データ */
export const standardPrices = {
  plan: nikoniko.name,
  initial: nikoniko.initial,
  annual: nikoniko.annual,
  monthly: nikoniko.monthly,
  firstYear: firstYearTotal,
  firstYearMonthly: firstYearMonthlyTotal,
  saving: annualSaving,
  payment: nikoniko.payment,
  minMonths: nikoniko.minMonths,
  maxPages: nikoniko.maxPages,
};

/** 標準料金に含まれず「個別見積もり」となる主な内容 */
export const quoteItems = ['LP（ランディングページ）制作', '特殊デザイン・機能', ...extraWorks.filter((w) => w !== '全面リニューアル')];

/** ページ追加オプションの案内文（6ページ目以降） */
export const pageOptionText = `${nikoniko.maxPages + 1}ページ目以降は、${pageOptions
  .filter((o) => o.price != null)
  .map((o) => `${o.title}1ページ${yen(o.price)}円（${o.when}）`)
  .join('、')}で追加できます（税込・原則1回限りの制作費）。`;

/**
 * 回答から診断結果を作る
 * @returns {{ kind, title, summary, pricing: 'standard' | 'quote', pages, sections, points, notes }}
 */
export function diagnose(a) {
  const plan = purposePlans[a.purpose] ?? purposePlans.intro;
  const notes = [currentNotes[a.current], timingNotes[a.timing]].filter(Boolean);

  if (a.type === 'lp') {
    return {
      kind: 'lp',
      title: 'LP（ランディングページ）',
      summary: '伝えたい商品・サービスを1ページにまとめ、問い合わせや申し込みにつなげる構成がおすすめです。',
      pricing: 'quote',
      sections: ['ファーストビュー（キャッチコピー・メイン画像）', 'こんなお悩みはありませんか？', `${a.purpose === 'recruit' ? '仕事内容・働く魅力' : 'サービス・商品の特長'}`, '選ばれる理由', 'ご利用の流れ・よくある質問', 'お問い合わせ・申し込み'],
      points: plan.points,
      notes: [...notes, 'LPは構成やボリュームによって制作内容が大きく変わるため、ニコニコプランとは別の個別見積もりとなります。'],
    };
  }

  const pages = [
    { name: 'トップページ', note: 'ひと目で事業の魅力が伝わる入口' },
    plan.page,
    a.purpose === 'trust'
      ? { name: '事業内容・サービス', note: '提供している仕事の紹介' }
      : { name: '会社概要', note: '所在地・代表者・沿革など' },
    a.purpose === 'attract' ? { name: 'よくある質問', note: '問い合わせ前の不安を解消' } : { name: '実績・事例', note: '掲載許可をいただいたものから' },
    { name: 'お問い合わせ', note: '電話・LINE・フォーム' },
  ];

  if (a.type === 'renewal') {
    return {
      kind: 'renewal',
      title: 'ホームページのリニューアル（ニコニコプラン）',
      summary: `今のサイトの内容を整理し、スマホで見やすいデザインの${nikoniko.maxPages}ページ以内のサイトとして新しく作り直す方法がおすすめです。`,
      pricing: 'standard',
      pages,
      points: plan.points,
      notes: [...notes, `今のサイトのページ数が多い場合は、ページ追加オプションの料金がかかります。データの移行や特別な機能が必要な場合は、個別見積もりとなることがあります。`],
    };
  }

  return {
    kind: 'corporate',
    title: a.type === 'undecided' ? '会社・店舗のホームページ（ニコニコプラン）から始めるのがおすすめ' : '会社・店舗のホームページ（ニコニコプラン）',
    summary:
      a.type === 'undecided'
        ? `まずは事業の基本情報がそろった${nikoniko.maxPages}ページ以内のホームページを持つことで、名刺や求人・SNSからの紹介先として幅広く活用できます。`
        : `事業の基本情報をそろえた${nikoniko.maxPages}ページ以内のホームページで、「${answerLabel('purpose', a.purpose)}」という目的に合わせた構成がおすすめです。`,
    pricing: 'standard',
    pages,
    points: plan.points,
    notes,
  };
}
