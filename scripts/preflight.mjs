/**
 * ビルド前の安全確認
 * Cloudflare Pages の本番ビルド（main ブランチ）で、公開に必要な環境変数が
 * 設定されていない場合はビルドを止め、未完成のまま公開されるのを防ぎます。
 * （手元でのビルドやプレビュー用ビルドでは何もしません）
 */
import { resolveSiteUrl } from './site-url.mjs';

const isCloudflareProduction = process.env.CF_PAGES === '1' && process.env.CF_PAGES_BRANCH === 'main';

if (isCloudflareProduction) {
  const problems = [];
  const siteUrl = resolveSiteUrl();
  if (!/^https:\/\/[^/]+$/.test(siteUrl))
    problems.push('環境変数 SITE_URL（例: https://smilewise-website.pages.dev）が設定されていません');
  const endpoint = (process.env.VITE_FORM_ENDPOINT || '').trim();
  if (!endpoint && process.env.ALLOW_TEST_FORM !== '1')
    problems.push('環境変数 VITE_FORM_ENDPOINT（Formspree のフォームURL）が設定されていません');
  else if (endpoint && !/^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(endpoint))
    problems.push(`環境変数 VITE_FORM_ENDPOINT の形式が正しくありません（${endpoint}）。https://formspree.io/f/英数字 の形で入力してください`);
  const orderEndpoint = (process.env.VITE_ORDER_FORM_ENDPOINT || '').trim();
  if (orderEndpoint && !/^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(orderEndpoint))
    problems.push(`環境変数 VITE_ORDER_FORM_ENDPOINT の形式が正しくありません（${orderEndpoint}）`);
  if (problems.length) {
    console.error('\n✖ 本番ビルドを中止しました（未設定の項目があります）');
    problems.forEach((p) => console.error(`  - ${p}`));
    console.error('Cloudflare Pages の「設定 → 環境変数」で登録してから、再デプロイしてください。\n');
    process.exit(1);
  }
  console.log(`✔ 本番ビルドの設定を確認しました（${siteUrl}）`);
}
