import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { findPage } from '../data/seo.js';

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

/** ページ遷移時のスクロール位置リセットと、<title>・説明文の更新 */
export default function RouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  useEffect(() => {
    const page = findPage(pathname);
    document.title = page.title;
    const base = __SITE_URL__;
    setMeta('meta[name="description"]', 'content', page.description);
    setMeta('meta[property="og:title"]', 'content', page.title);
    setMeta('meta[property="og:description"]', 'content', page.description);
    setMeta('meta[property="og:url"]', 'content', base + page.path);
    setMeta('link[rel="canonical"]', 'href', base + page.path);
  }, [pathname]);

  return null;
}
