# SmileWise 公式ホームページ

北九州市を中心に活動する Web制作・デザイン・業務管理システム開発事業の公式サイトです。
React + Vite で作られており、ビルド時に全ページの静的HTMLを生成するため、どの静的ホスティングでもそのまま公開できます。

## ページ構成

| URL | ページ |
| --- | --- |
| `/` | トップページ（業務管理システムの紹介を含む） |
| `/services` | サービス紹介 |
| `/nikoniko` | ニコニコプラン（専用ページ） |
| `/system` | 業務管理システム開発・導入（専用ページ） |
| `/works` | 制作実績 |
| `/pricing` | 料金案内 |
| `/about` | 事業概要 |
| `/contact` | お問い合わせ |
| `/privacy` | プライバシーポリシー |

## 料金・プラン内容について

料金・プラン内容・修正範囲・契約条件は `src/data/pricing.js` の1か所で管理しています（表示価格はすべて税込）。
トップ・ニコニコプラン・サービス・料金・業務システムの各ページ、よくある質問、SEO用の説明文まで自動で反映されます。
月額換算・初年度総額・2年目以降の金額も自動計算です。

| 項目 | 内容 |
| --- | --- |
| ニコニコプラン 初期制作費 | 2,525円（税込） |
| 年間管理・運用費 | 114,000円（税込）／月額換算 9,500円 |
| お支払い方法 | 年払いのみ（年1回） |
| 初年度総額 | 116,525円（税込） |
| 2年目以降 | 年間 114,000円（税込） |
| 最低契約期間 | 12か月 |
| 業務管理システム開発・導入 | 150,000円〜（税込・参考価格） |

- プランに含まれる内容：`nikonikoIncludes`
- 無料修正の範囲／別途お見積り：`freeFixes` / `extraWorks`
- 契約条件：`contractTerms.decided` に確定した条件を追加すると、「ご契約条件」に表示されます
- よくある質問：`src/data/faq.js`

## ロゴ・電話番号・公式LINE

- ロゴ画像：`src/assets/logo.png`（いただいたロゴの白背景を透明化し、余白を切り詰めたもの）
- 公式LINEのQRコード：`src/assets/line-qr.jpg`
- 電話番号・LINEの友だち追加URL：`src/data/site.js` の `tel` / `lineUrl`
  - `lineUrl` を空にすると「友だち追加」ボタンは非表示になり、QRコードのみ表示されます
  - 現在の `lineUrl` は、QRコードを読み取って得たURL（https://line.me/ti/p/9kEKeXYgSw）です

## プレビュー方法

Node.js（v20 以上）が必要です。

```bash
npm install        # 初回のみ
npm run dev        # 開発用プレビュー → http://localhost:5173 をブラウザで開く
```

公開時と同じ状態で確認したいとき:

```bash
npm run build      # dist/ フォルダに公開用ファイルを生成
npm run preview    # → http://localhost:4173 をブラウザで開く
```

1ファイル版の確認用プレビュー（スマホだけで確認する用）は `npm run build:preview` で `dist-single/smilewise-preview.html` に作成されます。

スマートフォンでの表示は、ブラウザの開発者ツール（Chrome なら F12 → 端末アイコン）で確認できます。
同じWi-Fiの実機で見る場合は `npm run dev -- --host` を実行し、表示された `Network:` のURLをスマホで開いてください。

## 公開前に編集する場所

| ファイル | 内容 |
| --- | --- |
| `src/data/site.js` | 屋号・代表者・所在地・電話番号・メール・公開URL など（空欄の項目は非表示） |
| `src/data/pricing.js` | **料金（全ページ共通）**：ニコニコプラン（初期制作費・月額・年払い）、業務管理システムの参考価格、プランの内容・契約条件 |
| `src/data/services.js` | サービス内容 |
| `src/data/system.js` | 業務管理システムページの掲載内容（機能・比較表・流れ・FAQ） |
| `src/data/works.js` | 制作実績（下記参照） |
| `src/data/seo.js` | 各ページのタイトル・説明文（SEO） |

### 制作実績の追加

`src/data/works.js` の `works` 配列に項目を追加します（書き方はファイル内のコメント参照）。
画像は `public/works/` に置き、`image: '/works/ファイル名.jpg'` のように指定します。
配列が空の間は「準備中」と表示されます。**実際に制作し、掲載許可を得たものだけ**を掲載してください。

## お問い合わせフォームの設定

フォームは送信先が未設定の状態では **テストモード** で動きます。
入力チェック → 送信 → 完了画面までの動作を確認できますが、メールは届きません（送信内容はブラウザのコンソールに表示されます）。

実際にメールを受け取るには、外部のフォーム送信サービスを使います。例として [Formspree](https://formspree.io/)（無料プランあり）の場合:

1. Formspree にアカウント登録し、「New Form」でフォームを作成（通知先メールアドレスを設定）
2. 表示されるエンドポイントURL（`https://formspree.io/f/xxxxxxx`）をコピー
3. プロジェクト直下に `.env` を作成し、以下を記入（`.env.example` を参考に）
   ```
   VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
   SITE_URL=https://（公開するドメイン）
   ```
   Vercel / Netlify で公開する場合は、管理画面の「Environment Variables」に同じ値を設定します。
4. 再ビルドすると、テストモードの表示が消えて実際に送信されるようになります

JSON の POST を受け付けるサービスであれば、Formspree 以外（Getform、自前のAPIなど）でも同じ設定で使えます。

## 公開（デプロイ）方法

`npm run build` で生成される `dist/` フォルダの中身をアップロードすれば公開できます。

- **Vercel / Netlify**：GitHub リポジトリを連携し、Build command `npm run build`、Output directory `dist` を指定
- **レンタルサーバー**：`dist/` の中身を FTP で公開フォルダにアップロード

公開URLが決まったら `SITE_URL`（または `src/data/site.js` の `url`）を設定して再ビルドしてください。
canonical・OGP・`sitemap.xml`・`robots.txt` に反映されます。公開後は Google Search Console に `sitemap.xml` を登録すると効果的です。

## 実装済みのSEO設定

- 全ページを静的HTMLとして事前生成（JavaScriptなしでも本文・タイトルが読める）
- ページごとの `<title>`・`meta description`・canonical・OGP（SNS共有画像 `public/og-image.png`）
- `sitemap.xml`・`robots.txt` の自動生成
- 構造化データ（JSON-LD / ProfessionalService、対応エリア：北九州市・福岡県）
- 見出し構造・パンくずリスト・`lang="ja"`・画像の代替テキスト
