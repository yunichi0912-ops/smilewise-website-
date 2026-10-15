/**
 * サイト全体の基本情報。
 * 屋号・連絡先などはここを書き換えるだけで全ページに反映されます。
 * 空文字（''）の項目は、事業概要ページやフッターに表示されません。
 */
export const site = {
  name: 'SmileWise',
  nameKana: 'スマイルワイズ',
  tagline: '北九州のWeb制作・デザイン・業務システム開発',
  description:
    '北九州市を中心に、ホームページ制作から業務管理システムの開発・導入まで。Webとデジタルの力で、地域企業の「伝わる」と「はかどる」を支えます。',

  // 公開URL（末尾スラッシュなし）。ビルド時に環境変数 SITE_URL があればそちらを優先します。
  url: 'https://www.example.com',

  area: '福岡県北九州市',
  serviceArea: '北九州市を中心に、福岡県内・近隣エリア（オンライン対応は全国）',

  // 以下は公開前に実際の情報を入力してください（空のままなら非表示）
  representative: '',
  address: '',
  tel: '080-9034-7853',
  email: '',
  hours: '',
  established: '',

  // 所在地を掲載しない場合は true にすると、プライバシーポリシーに
  // 「ご請求に応じて遅滞なくお知らせします」と表示します（個人情報保護法で認められている方法）
  addressOnRequest: false,

  // プライバシーポリシーの制定日（公開日に合わせて変更してください）
  privacyEstablished: '2026年10月15日',

  // 公式LINEの友だち追加URL（QRコードと同じURL）。変更する場合はここを書き換えてください。
  // 空文字にすると「友だち追加」ボタンは表示されず、QRコードのみの表示になります。
  lineUrl: 'https://line.me/ti/p/9kEKeXYgSw',
};

/** 電話番号から tel: リンク用の文字列を作成（例: tel:08090347853） */
export const telHref = (tel = site.tel) => `tel:${tel.replace(/[^0-9+]/g, '')}`;
