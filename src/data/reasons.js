import { nikoniko, systemPrice, price } from './pricing.js';

/** トップページ「選ばれる理由」 */
export const reasons = [
  {
    icon: 'map',
    title: '北九州の地元で、顔の見える対応',
    text: '北九州市を拠点に、直接お会いしてのご相談にも対応します。地域の事情や商習慣を踏まえて、無理のないご提案を心がけています。',
  },
  {
    icon: 'system',
    title: 'ホームページも業務システムも、ワンストップ',
    text: '会社の「顔」となるホームページから、社内の業務を支えるシステムまで。窓口をひとつにまとめることで、やりとりの手間を減らします。',
  },
  {
    icon: 'yen',
    title: '税込でわかりやすい料金',
    text: `ホームページ制作は初期制作費${price(nikoniko.initial)}の「${nikoniko.name}」、業務管理システムは${price(systemPrice.from, '〜')}。料金とプラン内容、無料修正の範囲を公開しています。`,
  },
  {
    icon: 'chat',
    title: '公開後も、修正は回数制限なし',
    text: 'ニコニコプランでは、文章の修正や営業時間・電話番号の変更などの軽微な修正に回数制限なく対応します。ITやWebに詳しくない方にも、わかりやすい言葉でご説明します。',
  },
];
