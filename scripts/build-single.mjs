/**
 * 確認用の「1ファイル版」HTMLを作成します（npm run build:preview）。
 * CSS・JavaScript をすべて1つのHTMLに埋め込むため、ファイル単体で全ページを確認できます。
 * 出力: dist-single/smilewise-preview.html
 */
import fs from 'node:fs';
import path from 'node:path';

const dir = 'dist-single';
const assets = fs.readdirSync(path.join(dir, 'assets'));
const read = (ext) => fs.readFileSync(path.join(dir, 'assets', assets.find((f) => f.endsWith(ext))), 'utf8');
const css = read('.css').replace(/<\/style/gi, '<\\/style');
const js = read('.js').replace(/<\/script/gi, '<\\/script');
const fonts = fs.readFileSync(path.join(dir, 'index.html'), 'utf8').match(/<link\s+href="https:\/\/fonts\.googleapis\.com[^>]*>/)[0];

const html = `<title>SmileWise ホームページ</title>
<meta name="robots" content="noindex" />
${fonts}
<style>${css}</style>
<noscript><style>.reveal{opacity:1!important;transform:none!important}</style></noscript>
<div id="root"></div>
<script type="module">${js}</script>
`;

fs.writeFileSync(path.join(dir, 'smilewise-preview.html'), html);
console.log(`created ${dir}/smilewise-preview.html (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB)`);
