import {
  nikoniko,
  monthlyEquivalent,
  firstYearTotal,
  laterYears,
  freeFixes,
  extraWorks,
  fixNote,
  contractTerms,
  price,
  yen,
} from './pricing.js';

/** ニコニコプランのよくある質問（料金ページ・ニコニコプランページに全件、トップページに先頭4件を表示） */
export const nikonikoFaq = [
  {
    q: '本当に初期制作費2,525円でホームページを作ってもらえますか？',
    a: `はい。ニコニコプランの初期制作費は${price(nikoniko.initial)}です。別途、年間管理・運用費${price(nikoniko.annual)}がかかります。最低契約期間は${nikoniko.minMonths}か月です。`,
  },
  {
    q: '初年度と2年目以降は、それぞれいくらかかりますか？',
    a: `初年度は、初期制作費${price(nikoniko.initial)}と年間管理・運用費${price(nikoniko.annual)}を合わせた${price(firstYearTotal)}です。2年目以降は、年間管理・運用費の${price(laterYears)}のみです。`,
  },
  {
    q: '月払いはできますか？',
    a: `お支払いは年払いのみ（年1回）です。月払いはご用意していません。年間管理・運用費${price(nikoniko.annual)}を月額に換算すると${yen(monthlyEquivalent)}円ですが、実際のお支払いは年1回となります。`,
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
    q: 'ニコニコプランには何が含まれますか？',
    a: `最大${nikoniko.maxPages}ページの制作、スマートフォン対応、基本SEO設定、軽微な修正（回数制限なし・下記の無料修正の範囲内）が含まれます。`,
  },
  {
    q: '修正は何回まで無料ですか？',
    a: `定められた範囲内の軽微な修正であれば、回数制限はありません。無料修正の範囲は、${freeFixes.join('、')}です。${fixNote}`,
  },
  {
    q: '別料金になるのはどんな作業ですか？',
    a: `${extraWorks.join('、')}は別途お見積りとなります。`,
  },
  {
    q: 'スマートフォンにも対応していますか？',
    a: 'はい。スマートフォンでも見やすいレイアウトで制作します。',
  },
  {
    q: '予約機能やネットショップの決済機能は付けられますか？',
    a: '予約・決済機能やシステム開発は、ニコニコプランとは別にお見積りとなります。業務の効率化をご検討の場合は、業務管理システム開発・導入もご相談いただけます。',
  },
];
