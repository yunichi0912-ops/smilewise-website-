/**
 * 公開URL（canonical・sitemap・OGPに使うURL）を決める共通処理
 *
 * 優先順位：環境変数 SITE_URL → .env の SITE_URL → src/data/site.js の url
 * ただし Cloudflare Pages でのビルド中に、SITE_URL が「別の *.pages.dev」を指している場合は、
 * 実際に公開されるプロジェクトのURL（例: https://smilewise-website.pages.dev）に自動で置き換えます。
 * （存在しないURLを canonical にすると、Google がページを正しく登録できないため）
 * 独自ドメイン（*.pages.dev 以外）を SITE_URL に設定した場合は、そのまま使います。
 */
import fs from 'node:fs';
import path from 'node:path';

const trim = (u) => (u || '').trim().replace(/\/+$/, '');

/** Cloudflare Pages の本番URL（CF_PAGES_URL = https://<デプロイID>.<プロジェクト>.pages.dev から求める） */
export function cloudflareProjectUrl(env = process.env) {
  const u = trim(env.CF_PAGES_URL);
  const m = u.match(/^https:\/\/(?:[^.]+\.)?([a-z0-9-]+\.pages\.dev)$/i);
  if (!m) return '';
  const host = u.replace(/^https:\/\//, '');
  // デプロイ固有のサブドメイン（xxxx.project.pages.dev）なら先頭を外す
  const labels = host.split('.');
  return `https://${labels.length > 3 ? labels.slice(1).join('.') : host}`;
}

export function resolveSiteUrl({ root = process.cwd(), env = process.env, fallback = '' } = {}) {
  let fromFile = '';
  const envFile = ['.env.production.local', '.env.local', '.env.production', '.env']
    .map((f) => path.join(root, f))
    .find((f) => fs.existsSync(f));
  if (envFile) fromFile = fs.readFileSync(envFile, 'utf8').match(/^SITE_URL=(.+)$/m)?.[1] ?? '';

  const explicit = trim(env.SITE_URL) || trim(fromFile);
  const actual = cloudflareProjectUrl(env);
  // SITE_URL が未設定でも、Cloudflare Pages 上なら実際の公開URLを使う
  let url = explicit || actual || trim(fallback);
  if (actual && /\.pages\.dev$/i.test(url) && url !== actual) {
    console.warn(`⚠ SITE_URL（${url}）が実際の公開URLと違うため、${actual} を使います`);
    url = actual;
  }
  return url;
}
