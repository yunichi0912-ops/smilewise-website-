import { nikoniko, systemPrice, yen } from './pricing.js';

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
    title: 'わかりやすい料金',
    text: `ホームページ制作は初期制作費${yen(nikoniko.initial)}円の「${nikoniko.name}」、業務管理システムは${yen(systemPrice.from)}円〜。料金の目安を公開し、ご相談時に内容をご説明します。`,
  },
  {
    icon: 'chat',
    title: '専門用語を使わず、丁寧に',
    text: 'ITやWebに詳しくない方にも伝わる言葉でご説明します。「何から始めればいいかわからない」という段階からご相談いただけます。',
  },
];
