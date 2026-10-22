/**
 * Google Search Console の所有権確認ファイル
 *
 * Cloudflare Pages は「〜.html」へのアクセスを拡張子なしのURLへ転送（308）するため、
 * Google の確認ロボットが転送を嫌って失敗しないよう、このURLだけは転送せずに
 * 確認ファイル（public/google4371407aef7b8b7f.html）と同じ内容をそのまま返します。
 */
const BODY = 'google-site-verification: google4371407aef7b8b7f.html';

export const onRequestGet = () =>
  new Response(BODY, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });

export const onRequestHead = () =>
  new Response(null, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
