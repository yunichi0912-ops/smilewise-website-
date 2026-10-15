import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { site } from './src/data/site.js';

/** `npm run preview` で /system などのURLに、生成済みの /system/index.html を返すための設定 */
const previewCleanUrls = () => ({
  name: 'preview-clean-urls',
  configurePreviewServer(server) {
    server.middlewares.use((req, _res, next) => {
      const [pathname, query] = req.url.split('?');
      const clean = pathname.replace(/\/+$/, '');
      if (clean && !path.extname(clean) && fs.existsSync(path.join('dist', clean, 'index.html'))) {
        req.url = `${clean}/index.html${query ? `?${query}` : ''}`;
      }
      next();
    });
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.SITE_URL || site.url).replace(/\/$/, '');
  return {
    plugins: [react(), previewCleanUrls()],
    // 1ファイル版プレビューでは画像もHTMLに埋め込む
    build: env.VITE_SINGLE_FILE || process.env.VITE_SINGLE_FILE ? { assetsInlineLimit: 100 * 1024 * 1024 } : {},
    define: {
      __SITE_URL__: JSON.stringify(siteUrl),
    },
  };
});
