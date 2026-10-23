import logoUrl from '../assets/logo.png';
import { site } from '../data/site.js';

/** SmileWise ロゴ（画像）。plate=true で白い台座の上に表示（濃い背景用） */
export default function Logo({ plate = false, className = '' }) {
  return (
    <span className={`logo${plate ? ' logo--plate' : ''}${className ? ` ${className}` : ''}`}>
      <img src={logoUrl} alt={`${site.name}（${site.nameKana}）`} width="400" height="103" className="logo__img" decoding="async" />
    </span>
  );
}
