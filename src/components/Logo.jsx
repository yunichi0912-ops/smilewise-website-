import { site } from '../data/site.js';

export default function Logo({ light = false }) {
  return (
    <span className={`logo${light ? ' logo--light' : ''}`}>
      <svg className="logo__mark" viewBox="0 0 40 40" aria-hidden="true">
        <rect x="1" y="1" width="38" height="38" rx="10" fill="currentColor" />
        <path
          d="M12 22.5c1.8 3.2 4.7 5 8 5s6.2-1.8 8-5"
          fill="none"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="15" cy="15.5" r="2" fill="#fff" />
        <circle cx="25" cy="15.5" r="2" fill="#fff" />
      </svg>
      <span className="logo__text">
        <span className="logo__name">{site.name}</span>
        <span className="logo__sub">Web Design &amp; Business System</span>
      </span>
    </span>
  );
}
