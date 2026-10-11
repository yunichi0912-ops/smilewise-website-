import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/global.css';

// 1ファイル版プレビュー（npm run build:preview）では、URLに依存しない MemoryRouter を使う
const Router = import.meta.env.VITE_SINGLE_FILE ? MemoryRouter : BrowserRouter;

const app = (
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);

const root = document.getElementById('root');
const path = window.location.pathname.replace(/\/+$/, '') || '/';

// ビルド時に生成した静的HTMLが現在のURLと一致する場合は hydrate、それ以外（開発時など）は通常描画
if (root.dataset.prerendered === path) {
  hydrateRoot(root, app);
} else {
  root.textContent = '';
  createRoot(root).render(app);
}
