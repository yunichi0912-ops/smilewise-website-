import {
  nikoniko,
  yearlySaving,
  firstYearMonthly,
  firstYearYearly,
  freeFixes,
  extraWorks,
  fixNote,
  contractTerms,
  price,
} from './pricing.js';

/** ニコニコプランのよくある質問（料金ページに全件、トップページに先頭4件を表示） */
export const nikonikoFaq = [
  {
    q: '本当に初期制作費2,525円でホームページを作ってもらえますか？',
    a: `はい。ニコニコプランの初期ホームページ制作費は${price(nikoniko.initial)}です。別途、月額管理費${price(nikoniko.monthly)}（年払いの場合は${price(nikoniko.yearly)}）がかかります。最低契約期間は${nikoniko.minMonths}か月です。`,
  },
  {
    q: '初年度は合計でいくらかかりますか？',
    a: `初期制作費と12か月分の管理費を合わせて、月払いの場合は${price(firstYearMonthly)}、年払いの場合は${price(firstYearYearly)}です。`,
  },
  {
    q: '月払いと年払いは、どちらがお得ですか？',
    a: `年払い（${price(nikoniko.yearly)}）のほうが、月払い12か月分（${price(nikoniko.monthly * 12)}）より${yen(yearlySaving)}円お得です。`,
  },
  {
    q: '最低契約期間はありますか？',
    a: `最低契約期間は${nikoniko.minMonths}か月です。${contractTerms.pendingNote}`,
  },
  {
    q: '何ページまで作ってもらえますか？',
    a: `最大${nikoniko.maxPages}ページまで制作します。ページの追加をご希望の場合は、別途お見積りとなります。`,
  },
  {
    q: '月額管理費には何が含まれますか？',
    a: 'サーバー・ホームページの維持管理と、軽微な修正（回数制限なし）が含まれます。独自ドメイン対応、SSL設定、基本SEO設定、お問い合わせフォームの設置、スマートフォン・PC対応もプランの内容に含まれます。',
  },
  {
    q: '修正は何回まで無料ですか？',
    a: `軽微な修正であれば回数制限はありません。無料修正の範囲は、${freeFixes.join('、')}です。${fixNote}`,
  },
  {
    q: '別料金になるのはどんな作業ですか？',
    a: `${extraWorks.join('、')}は別途お見積りとなります。`,
  },
  {
    q: 'スマートフォンにも対応していますか？',
    a: 'はい。スマートフォン・PCのどちらでも見やすいレイアウトで制作します。',
  },
  {
    q: '予約機能やネットショップの決済機能は付けられますか？',
    a: '予約・決済機能やシステム開発は、ニコニコプランとは別にお見積りとなります。業務の効率化をご検討の場合は、業務管理システム開発・導入もご相談いただけます。',
  },
];

function yen(n) {
  return n.toLocaleString('ja-JP');
}
