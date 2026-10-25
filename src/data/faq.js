import {
  nikoniko,
  monthlyEquivalent,
  monthlyYearTotal,
  annualSaving,
  firstYearTotal,
  firstYearMonthlyTotal,
  pageOptions,
  pageOptionNote,
  paymentMethods,
  paymentProcedureNote,
  freeFixes,
  extraWorks,
  fixNote,
  contractTerms,
  nikonikoIncludes,
  price,
  yen,
} from './pricing.js';

/** ニコニコプランのよくある質問（料金ページ・ニコニコプランページに全件、トップページに先頭4件を表示） */
export const nikonikoFaq = [
  {
    q: '本当に初期制作費2,525円でホームページを作ってもらえますか？',
    a: `はい。ニコニコプランの初期制作費は${price(nikoniko.initial)}です。別途、管理費（月払い${price(nikoniko.monthly)}／月、または年払い${price(nikoniko.annual)}／年）がかかります。最低契約期間は${nikoniko.minMonths}か月です。`,
  },
  {
    q: '初年度と2年目以降は、それぞれいくらかかりますか？',
    a: `初年度は、年払いの場合は初期制作費${price(nikoniko.initial)}と年払い${price(nikoniko.annual)}を合わせた${price(firstYearTotal)}、月払いの場合は初期制作費と月払い${yen(nikoniko.monthly)}円×12か月を合わせた${price(firstYearMonthlyTotal)}です。2年目以降は管理費のみで、年払いは年間${price(nikoniko.annual)}、月払いは月${price(nikoniko.monthly)}（年間${yen(monthlyYearTotal)}円）です。`,
  },
  {
    q: '月払いと年払いは選べますか？どちらがお得ですか？',
    a: `はい、管理費は月払い（${price(nikoniko.monthly)}／月）と年払い（${price(nikoniko.annual)}／年）からお選びいただけます。年払いは月換算${yen(monthlyEquivalent)}円で、月払い（年間${yen(monthlyYearTotal)}円）より年間${yen(annualSaving)}円お得です。最低契約期間は、どちらも${nikoniko.minMonths}か月です。`,
  },
  {
    q: '支払い方法は何がありますか？',
    a: `クレジットカード決済（Stripe）と銀行振込からお選びいただけます。${paymentMethods.map((m) => `${m.label}の場合、月払いは${m.monthly}、年払いは${m.annual}です。`).join('')}${paymentProcedureNote}`,
  },
  {
    q: '銀行振込の手数料や、支払い期日はどうなりますか？',
    a: '銀行振込の振込手数料は、お客様のご負担となります。毎月の具体的なお支払い期日は、ご契約時にご案内します。',
  },
  {
    q: '制作はいつから始まりますか？',
    a: 'ご契約後、初回のご入金を確認したあとに制作を開始します。',
  },
  {
    q: '最低契約期間はありますか？',
    a: `最低契約期間は${nikoniko.minMonths}か月です。${contractTerms.pendingNote}`,
  },
  {
    q: '何ページまで作ってもらえますか？',
    a: `基本の制作ページ数は最大${nikoniko.maxPages}ページです。ページを追加する場合は、${pageOptions.map((o) => (o.price != null ? `${o.title}（${o.when}）が1ページ${price(o.price)}` : `${o.title}は個別見積もり`)).join('、')}です。${pageOptionNote}`,
  },
  {
    q: 'ニコニコプランには何が含まれますか？',
    a: `${nikonikoIncludes.map((i) => i.title).join('、')}が含まれます。軽微な修正は、無料修正の範囲内で回数制限なく対応します。`,
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
    a: 'はい。スマートフォン・タブレットでも見やすいレイアウトで制作します。',
  },
  {
    q: 'Googleアナリティクスの設定はできますか？',
    a: 'はい。ご希望の方には、アクセス状況を確認できるGoogleアナリティクスの設定にも対応します。お問い合わせの際にお知らせください。',
  },
  {
    q: '予約機能やネットショップの決済機能は付けられますか？',
    a: '予約・決済機能やシステム開発は、ニコニコプランとは別にお見積りとなります。業務の効率化をご検討の場合は、業務管理システム開発・導入もご相談いただけます。',
  },
];
