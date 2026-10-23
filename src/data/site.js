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
    '北九州市・筑豊を中心に、ホームページ制作から業務管理システムの開発・導入まで。Webとデジタルの力で、地域企業の「伝わる」と「はかどる」を支えます。',

  // 公開URL（末尾スラッシュなし）。ビルド時に環境変数 SITE_URL があればそちらを優先します。
  url: 'https://www.example.com',

  area: '福岡県北九州市',
  serviceArea: '北九州市・筑豊地域を中心に、福岡県内・近隣エリア（オンライン対応は全国）',
  /** 検索エンジン向けの対応エリア（構造化データ） */
  areasServed: ['北九州市', '筑豊地域', '飯塚市', '直方市', '田川市', '福岡県'],

  // 事業者情報
  representative: '吉野 勇太',
  postalCode: '807-0803',
  addressRegion: '福岡県',
  addressLocality: '北九州市八幡西区',
  streetAddress: '千代ケ崎2丁目14-19-201',
  /** 表示用の所在地（〒を含む） */
  get address() {
    return `〒${this.postalCode} ${this.addressRegion}${this.addressLocality}${this.streetAddress}`;
  },
  tel: '080-9034-7853',
  email: 'smilewise1111@gmail.com',
  /** 事業内容（会社概要・構造化データに表示） */
  businesses: [
    'ホームページ制作',
    'ランディングページ制作',
    '名刺・チラシ・パンフレット・ロゴ制作',
    '業務管理システム開発・導入',
    'IT・DX支援',
  ],
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
/** メール作成リンク（例: mailto:smilewise1111@gmail.com?subject=...） */
export const mailHref = (subject = 'SmileWiseへのお問い合わせ') =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
