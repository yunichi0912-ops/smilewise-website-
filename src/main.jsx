import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/global.css';

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
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
