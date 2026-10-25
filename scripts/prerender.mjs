/**
 * ビルド後処理：各ページの静的HTML・sitemap.xml・robots.txt を生成します。
 * これにより、JavaScriptを実行しない検索エンジンやSNSにも、ページごとの
 * タイトル・説明文・本文が正しく伝わります。また、どのレンタルサーバー・
 * 静的ホスティングでも /services などのURLでそのまま表示できます。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const serverEntry = path.join(root, 'dist-server', 'entry-server.js');

const { render } = await import(pathToFileURL(serverEntry).href);
const { pages, notFoundPage } = await import(pathToFileURL(path.join(root, 'src/data/seo.js')).href);
const { site } = await import(pathToFileURL(path.join(root, 'src/data/site.js')).href);

const { resolveSiteUrl } = await import(pathToFileURL(path.join(root, 'scripts/site-url.mjs')).href);
const siteUrl = resolveSiteUrl({ root, fallback: site.url });

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const pricing = await import(pathToFileURL(path.join(root, 'src/data/pricing.js')).href);

// 事業者情報の構造化データ（Google などの検索エンジン向け）
const business = {
  '@type': 'ProfessionalService',
  '@id': `${siteUrl}/#business`,
  name: site.name,
  alternateName: site.nameKana,
  description: site.description,
  url: `${siteUrl}/`,
  logo: `${siteUrl}/icon-512.png`,
  image: `${siteUrl}/og-image.jpg`,
  telephone: site.tel,
  email: site.email,
  founder: { '@type': 'Person', name: site.representative },
  address: {
    '@type': 'PostalAddress',
    postalCode: site.postalCode,
    addressRegion: site.addressRegion,
    addressLocality: site.addressLocality,
    streetAddress: site.streetAddress,
    addressCountry: 'JP',
  },
  areaServed: site.areasServed.map((name) => ({
    '@type': /市$/.test(name) ? 'City' : 'AdministrativeArea',
    name,
  })),
  knowsAbout: site.businesses,
  ...(site.lineUrl ? { sameAs: [site.lineUrl] } : {}),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'サービス・料金',
    itemListElement: [
      {
        '@type': 'Offer',
        name: `ホームページ制作「${pricing.nikoniko.name}」初期制作費`,
        price: pricing.nikoniko.initial,
        priceCurrency: 'JPY',
        url: `${siteUrl}/nikoniko`,
      },
      {
        '@type': 'Offer',
        name: `${pricing.nikoniko.name} 管理費（年払い・1年）`,
        price: pricing.nikoniko.annual,
        priceCurrency: 'JPY',
        url: `${siteUrl}/nikoniko`,
      },
      {
        '@type': 'Offer',
        name: `${pricing.nikoniko.name} 管理費（月払い・1か月）`,
        price: pricing.nikoniko.monthly,
        priceCurrency: 'JPY',
        url: `${siteUrl}/nikoniko`,
      },
      {
        '@type': 'Offer',
        name: '業務管理システム開発・導入（個別見積もり）',
        priceSpecification: { '@type': 'PriceSpecification', minPrice: pricing.systemPrice.from, priceCurrency: 'JPY' },
        url: `${siteUrl}/system`,
      },
    ],
  },
};

// サイト名（Google 検索結果に表示される名前）を伝える WebSite の構造化データ
const website = {
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: site.name,
  alternateName: [site.nameKana, `${site.name}（${site.nameKana}）`],
  url: `${siteUrl}/`,
  inLanguage: 'ja',
  publisher: { '@id': `${siteUrl}/#business` },
};

const jsonLd = { '@context': 'https://schema.org', '@graph': [website, business] };

const build = (page, url) => {
  const canonical = siteUrl + page.path;
  const head = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    page === notFoundPage ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${siteUrl}/og-image.jpg" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
  ].join('\n    ');

  return template
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, head)
    .replace(
      '<!--jsonld-->',
      [page.path === '/' ? jsonLd : null, page.jsonLd]
        .filter(Boolean)
        .map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`)
        .join(''),
    )
    .replace('<div id="root"><!--app-html-->', `<div id="root" data-prerendered="${page.path}">${render(url)}`);
};

// Cloudflare Pages では /about.html を /about（末尾スラッシュなし）で配信するため、
// トップ以外は「ページ名.html」で出力する（canonical URL と一致させる）
for (const page of pages) {
  const file = page.path === '/' ? path.join(dist, 'index.html') : path.join(dist, `${page.path.slice(1)}.html`);
  fs.writeFileSync(file, build(page, page.path));
  console.log(`  prerendered ${page.path} -> ${path.relative(dist, file)}`);
}
fs.writeFileSync(path.join(dist, '404.html'), build(notFoundPage, '/404'));
console.log('  prerendered 404.html');

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${siteUrl}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p.path === '/' ? '1.0' : p.path === '/privacy' ? '0.3' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
console.log(`  sitemap.xml / robots.txt (${siteUrl})`);

fs.rmSync(path.join(root, 'dist-server'), { recursive: true, force: true });
