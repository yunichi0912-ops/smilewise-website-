/**
 * 公開前チェック（npm run check）
 * ビルド済みの dist/ を検査し、公開前に直すべき点（エラー）と確認事項（注意）を表示します。
 *   ・各ページのタイトル／説明文／canonical／OGP／h1
 *   ・サイト内リンク・ページ内リンクのリンク切れ
 *   ・料金表示（許可した金額以外が出ていないか）
 *   ・電話番号・LINEリンク、sitemap.xml・robots.txt
 *   ・公開に必要な設定（SITE_URL、フォーム送信先、事業者情報）
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const { pages } = await import(pathToFileURL(path.join(root, 'src/data/seo.js')).href);
const { site } = await import(pathToFileURL(path.join(root, 'src/data/site.js')).href);
const pricing = await import(pathToFileURL(path.join(root, 'src/data/pricing.js')).href);

const errors = [];
const warnings = [];
const yen = (n) => n.toLocaleString('ja-JP');

// 表示してよい金額（料金データから自動生成）＋画面イメージのサンプル値
const allowed = new Set(
  [
    pricing.nikoniko.initial,
    pricing.nikoniko.annual,
    pricing.monthlyEquivalent,
    pricing.firstYearTotal,
    pricing.laterYears,
    pricing.systemPrice.from,
  ].map(yen),
);
allowed.add('3,240'); // 業務システム画面イメージのサンプル値

const fileFor = (p) => (p === '/' ? 'index.html' : `${p.slice(1)}.html`);
const html = Object.fromEntries(pages.map((p) => [p.path, fs.readFileSync(path.join(dist, fileFor(p.path)), 'utf8')]));
const text = (h) =>
  h
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"');
const attr = (h, re) => (h.match(re) || [])[1];

const siteUrl = attr(html['/'], /<link rel="canonical" href="([^"]+)\/"/);
const titles = new Set();
const descs = new Set();

for (const p of pages) {
  const h = html[p.path];
  const t = attr(h, /<title>([^<]*)<\/title>/);
  const d = attr(h, /<meta name="description" content="([^"]*)"/);
  const c = attr(h, /<link rel="canonical" href="([^"]+)"/);
  const og = attr(h, /<meta property="og:image" content="([^"]+)"/);
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  if (!t) errors.push(`${p.path}: <title> がありません`);
  else if (titles.has(t)) errors.push(`${p.path}: タイトルが他のページと重複しています`);
  titles.add(t);
  if (!d) errors.push(`${p.path}: 説明文（description）がありません`);
  else if (descs.has(d)) errors.push(`${p.path}: 説明文が他のページと重複しています`);
  descs.add(d);
  if (c !== `${siteUrl}${p.path}`) errors.push(`${p.path}: canonical が不正です（${c}）`);
  if (!og?.startsWith('https://')) errors.push(`${p.path}: OGP画像のURLが不正です`);
  if (h1 !== 1) errors.push(`${p.path}: h1 が ${h1} 個あります（1個が適切）`);
  if (!h.includes(`data-prerendered="${p.path}"`)) errors.push(`${p.path}: 静的HTMLが生成されていません`);

  // 金額
  const nums = new Set(text(h).match(/\d{1,3}(?:,\d{3})+/g) || []);
  for (const n of nums) if (!allowed.has(n)) errors.push(`${p.path}: 料金データにない金額「${n}」が表示されています`);

  // リンク
  for (const [, href] of h.matchAll(/href="([^"]+)"/g)) {
    if (href.startsWith('http') || href.startsWith('mailto:')) continue;
    if (href.startsWith('tel:')) {
      if (href !== `tel:${site.tel.replace(/[^0-9+]/g, '')}`) errors.push(`${p.path}: 電話リンクが不正です（${href}）`);
      continue;
    }
    if (href.startsWith('/assets/') || /\.(png|jpg|svg|ico|css|js)$/.test(href)) {
      if (!fs.existsSync(path.join(dist, href.split('?')[0]))) errors.push(`${p.path}: ファイルが見つかりません（${href}）`);
      continue;
    }
    const [pathPart, hash] = href.split('#');
    const target = pathPart ? pathPart.split('?')[0].replace(/\/$/, '') || '/' : p.path;
    if (!html[target]) {
      errors.push(`${p.path}: リンク切れ（${href}）`);
      continue;
    }
    if (hash && !html[target].includes(`id="${hash}"`)) errors.push(`${p.path}: ページ内リンク先がありません（${href}）`);
  }
  if (!h.includes('href="tel:')) errors.push(`${p.path}: 電話番号のリンクがありません`);
  if (site.lineUrl && !h.includes(site.lineUrl)) errors.push(`${p.path}: LINEのリンクがありません`);
}

// sitemap / robots
const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
for (const p of pages) if (!sitemap.includes(`<loc>${siteUrl}${p.path}</loc>`)) errors.push(`sitemap.xml に ${p.path} がありません`);
const robots = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) errors.push('robots.txt のサイトマップURLが不正です');
for (const f of ['404.html', '_headers', 'og-image.png', 'favicon-48.png', 'apple-touch-icon.png'])
  if (!fs.existsSync(path.join(dist, f))) errors.push(`${f} がありません`);

// 公開に必要な設定
if (/example\.com/.test(siteUrl)) warnings.push(`公開URL（SITE_URL）が未設定です（現在：${siteUrl}）`);
if (html['/contact'].includes('テストモード')) warnings.push('お問い合わせフォームがテストモードです（VITE_FORM_ENDPOINT が未設定）');
if (!site.representative)
  warnings.push('事業者情報「代表者名（氏名）」が未入力です（src/data/site.js）。プライバシーポリシーへの記載が必要です');
if (!site.address && !site.addressOnRequest)
  warnings.push('事業者情報「所在地」が未入力です（src/data/site.js）。住所を掲載するか、addressOnRequest を true にしてください');
if (!site.email) warnings.push('メールアドレスが未入力です（任意。未入力の場合は表示されません）');

console.log(`\n公開前チェック：${pages.length}ページ（${siteUrl}）`);
console.log(errors.length ? `\n✖ エラー ${errors.length}件` : '\n✔ エラーなし');
errors.forEach((e) => console.log(`  - ${e}`));
console.log(warnings.length ? `\n⚠ 公開前の確認事項 ${warnings.length}件` : '\n✔ 確認事項なし');
warnings.forEach((w) => console.log(`  - ${w}`));
process.exitCode = errors.length ? 1 : 0;
