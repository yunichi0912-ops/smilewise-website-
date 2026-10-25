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
| `/diagnosis` | 無料ホームページ診断・無料デザイン案の申し込み |
| `/card-order` | 名刺注文フォーム |
| `/contact` | お問い合わせ |
| `/privacy` | プライバシーポリシー |

## 料金・プラン内容について

料金・プラン内容・修正範囲・契約条件は `src/data/pricing.js` の1か所で管理しています（表示価格はすべて税込）。
トップ・ニコニコプラン・サービス・料金・業務システムの各ページ、よくある質問、SEO用の説明文まで自動で反映されます。
年払いの月換算・月払いの年間合計・年払いのお得額・初年度総額（月払い／年払い）も自動計算です。

| 項目 | 内容 |
| --- | --- |
| ニコニコプラン 初期制作費 | 2,525円（税込） |
| 管理費（月払い） | 9,500円／月（税込） |
| 管理費（年払い） | 96,000円／年（税込）／月換算 8,000円・月払いより年間18,000円お得 |
| 初年度総額 | 年払い 98,525円／月払い 116,525円（税込） |
| 2年目以降 | 年払い 年間96,000円／月払い 月9,500円（税込） |
| 基本制作ページ数 | 最大5ページ |
| ページ追加（6ページ目以降） | 通常ページ 1ページ10,000円／簡易ページ（施工実績など）1ページ5,000円／特殊デザイン・機能は個別見積もり（原則1回限りの制作費） |
| 最低契約期間 | 12か月 |
| 業務管理システム開発・導入 | 150,000円〜（税込・個別見積もり） |

- プランに含まれる内容：`nikonikoIncludes`
- 無料修正の範囲／別途お見積り：`freeFixes` / `extraWorks`
- ページ追加オプション：`pageOptions` / `pageOptionNote`
- 月払い・年払いの切り替え表示：`src/components/PaymentToggle.jsx`（データは `paymentPlans`）
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
| `src/data/pricing.js` | **料金（全ページ共通）**：ニコニコプラン（初期制作費・管理費の月払い/年払い・ページ追加オプション）、業務管理システムの参考価格、プランの内容・契約条件 |
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

1. Formspree に smilewise1111@gmail.com でアカウント登録し、「New Form」でフォームを作成（通知先は smilewise1111@gmail.com）
2. 表示されるエンドポイントURL（`https://formspree.io/f/xxxxxxx`）をコピー
3. プロジェクト直下に `.env` を作成し、以下を記入（`.env.example` を参考に）
   ```
   VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
   SITE_URL=https://（公開するドメイン）
   ```
   Cloudflare Pages で公開する場合は、プロジェクトの環境変数に同じ値を設定します。
4. 再ビルドすると、テストモードの表示が消えて実際に送信されるようになります

迷惑送信対策：画面に見えない入力欄（ボットだけが入力）と、表示から3秒未満の送信を機械的な送信とみなして破棄します。Formspree 側の迷惑メール判定も併用されます。

本番ビルドの安全装置：Cloudflare Pages の main ブランチのビルドで `SITE_URL` または `VITE_FORM_ENDPOINT` が未設定の場合、ビルドを中止します（`scripts/preflight.mjs`）。

JSON の POST を受け付けるサービスであれば、Formspree 以外（Getform、自前のAPIなど）でも同じ設定で使えます。

## 公開（Cloudflare Pages）

| 項目 | 設定値 |
| --- | --- |
| 本番ブランチ | `main` |
| フレームワーク プリセット | なし（None） |
| ビルドコマンド | `npm run build` |
| ビルド出力ディレクトリ | `dist` |
| ルートディレクトリ | 空欄（リポジトリ直下） |

環境変数（本番：Production）

| 変数名 | 値の例 | 内容 |
| --- | --- | --- |
| `SITE_URL` | `https://smilewise-website.pages.dev` | 公開URL（末尾スラッシュなし）。独自ドメインにしたら変更 |
| `VITE_FORM_ENDPOINT` | `https://formspree.io/f/mbgdpdvq` | お問い合わせフォームの送信先（Formspree。通知先 smilewise1111@gmail.com） |
| `VITE_DIAGNOSIS_FORM_ENDPOINT` | （任意）`https://formspree.io/f/xxxxxxx` | 無料デザイン案申し込みの送信先。未設定なら `VITE_FORM_ENDPOINT` に送信 |
| `NODE_VERSION` | `22` | ビルドに使う Node.js（`.node-version` でも指定済み） |

- ページは `about.html` のように出力され、Cloudflare Pages では `/about`（末尾スラッシュなし）で表示されます。`/about/` や `/about.html` は自動で `/about` に転送されます。
- `public/_headers` でセキュリティ用ヘッダーと画像・JSのキャッシュを設定しています。
- 環境変数を変更したときは、再デプロイ（Deployments → 最新 → Retry deployment）で反映されます。
- 本番ブランチ以外のブランチを自動で公開しないよう、Settings → Builds → Branch control で「Preview branch」を None にすることをおすすめします。

### 公開前チェック

```bash
npm run build && npm run check
```

全ページのタイトル・説明文・canonical・h1、リンク切れ、料金表示、電話・LINEリンク、sitemap.xml、未設定項目（公開URL・フォーム送信先・事業者情報）を確認します。

## 実装済みのSEO設定

- 全ページを静的HTMLとして事前生成（JavaScriptなしでも本文・タイトルが読める）
- ページごとの `<title>`・`meta description`・canonical・OGP（SNS共有画像 `public/og-image.png`）
- `sitemap.xml`・`robots.txt` の自動生成
- 構造化データ（JSON-LD / ProfessionalService、対応エリア：北九州市・福岡県）
- 見出し構造・パンくずリスト・`lang="ja"`・画像の代替テキスト

## Google Search Console の所有権確認

- 確認ファイル：`public/google4371407aef7b8b7f.html`（公開URL：`/google4371407aef7b8b7f.html`）
- Cloudflare Pages は「〜.html」へのアクセスを拡張子なしのURLへ転送するため、確認ファイルのURLだけは
  `functions/google4371407aef7b8b7f.html.js`（Pages Functions）で転送せずに同じ内容を返しています。
- `public/_routes.json` で、Functions が動くのをこのURLだけに限定しています（他のページは通常の静的配信）。
- 確認ファイルは、所有権の確認後も削除しないでください（削除すると確認が外れます）。

## 名刺注文フォーム（/card-order）

- 料金・選択肢：`src/data/businessCards.js`（紙質×枚数の料金表。表示金額は税込・概算）
- フォーム本体：`src/components/CardOrderForm.jsx`（入力 → 確認 → 送信完了）
- 送信先：環境変数 `VITE_ORDER_FORM_ENDPOINT`（名刺注文専用の Formspree フォーム）。未設定の場合は `VITE_FORM_ENDPOINT`（お問い合わせと同じフォーム、通知先 smilewise1111@gmail.com）に送信します。
- メールの件名は「【名刺注文】会社名 様（人数・合計）注文番号」。注文明細は人ごとに改行して届きます。
- 対策：入力漏れの一覧表示と該当欄への移動、二重送信の防止、送信エラー時は入力を残して再送信可能（同じ注文番号）、隠し項目と5秒未満の送信を機械送信として破棄、入力途中の内容をブラウザに一時保存。
- 決済はフォームでは行いません。注文確認後に Stripe の決済リンクを LINE またはメールで個別に送る運用です。
- 注文者への受付完了メール（自動返信）は Formspree の「Autoresponse」機能で設定します（利用できるプランは Formspree の料金ページで確認してください）。

## 無料ホームページ診断・無料デザイン案（/diagnosis）

- 質問・選択肢・診断結果の内容：`src/data/diagnosis.js`（料金は `src/data/pricing.js` から自動表示。金額を直接書かない）
- 画面本体：`src/components/DiagnosisTool.jsx`（4問 → 診断結果 → 申し込み入力 → 確認 → 送信完了）
- 標準料金（初期2,525円、管理費 月払い9,500円／年払い96,000円、初年度総額 年払い98,525円／月払い116,525円）を表示するのは「会社・店舗HP」「リニューアル」「未定」の結果のみ。6ページ目以降はページ追加オプションの料金を案内し、LPと特殊デザイン・機能・予約/決済機能などは「個別見積もり」と表示します。
- 「診断だけで終了する」を選んだ場合、回答はどこにも送信されません。
- 送信先：`VITE_DIAGNOSIS_FORM_ENDPOINT`（専用の Formspree フォーム、任意）→ 未設定なら `VITE_FORM_ENDPOINT`。診断の回答とフォーム入力をまとめて1通で送信し、件名は「【無料デザイン案】会社名 様（ニコニコプラン／個別見積もり）受付番号」です。
- Formspree のフォームURLは公開されても問題ない値です。APIキーなどの秘密情報はフロントエンドに入れていません。
- 対策：隠し項目と4秒未満の送信を機械送信として破棄、二重送信防止、送信失敗時は入力を残して再送信可能（同じ受付番号）、回答途中の内容をブラウザに一時保存。
- 入口：トップのメイン画面下のリンク、トップ・ニコニコプラン・お問い合わせページの案内枠、フッターのメニュー。
