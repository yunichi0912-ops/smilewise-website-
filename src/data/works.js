/**
 * 制作実績データ
 * ------------------------------------------------------------
 * 実績を追加するときは、下の works 配列にオブジェクトを追加してください。
 * 配列が空の間は、制作実績ページに「準備中」のメッセージが表示されます。
 *
 * ※ 実際に制作・公開したもののみ掲載してください（掲載許可も確認してください）。
 *
 * 項目:
 *   id        : 英数字の識別子（重複しないもの）
 *   title     : 実績タイトル（例: 「○○株式会社様 コーポレートサイト」）
 *   category  : 'web' | 'system' | 'recruit' | 'print' | 'logo' のいずれか
 *   client    : 業種や企業名（掲載許可がある範囲で）
 *   year      : 制作年（例: '2026'）
 *   image     : 画像パス。画像は public/works/ フォルダに置き、'/works/xxx.jpg' のように指定
 *   summary   : 概要文
 *   tags      : 補足タグ（任意）
 *   url       : 公開サイトURL（任意）
 *
 * 記入例（コメントを外して内容を書き換えてください）:
 *
 *   {
 *     id: 'example-001',
 *     title: '○○株式会社様 コーポレートサイト',
 *     category: 'web',
 *     client: '建設業',
 *     year: '2026',
 *     image: '/works/example-001.jpg',
 *     summary: '会社の信頼感が伝わるデザインで、採用ページも含めて制作しました。',
 *     tags: ['レスポンシブ', 'SEO基本設定'],
 *     url: 'https://example.com',
 *   },
 */
export const works = [];

export const workCategories = {
  web: 'ホームページ制作',
  system: '業務管理システム',
  recruit: 'ランディングページ',
  print: '印刷物デザイン',
  logo: 'ロゴ・看板',
};
