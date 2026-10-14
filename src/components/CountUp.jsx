import { useEffect, useRef, useState } from 'react';

const fmt = (n) => n.toLocaleString('ja-JP');

/**
 * 画面に入ったときに 0 から目標値までカウントアップする数字。
 * ・静的HTML（SEO）や JavaScript 無効時は最終値がそのまま表示されます
 * ・「視差効果を減らす」設定の環境ではアニメーションしません
 */
export default function CountUp({ value, duration = 1600, className = '' }) {
  const ref = useRef(null);
  const [n, setN] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    let raf = 0;
    const run = () => {
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 4);
        setN(Math.round(value * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    setN(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span className={`count ${className}`}>
      <span ref={ref} aria-hidden="true">
        {fmt(n)}
      </span>
      <span className="sr-only">{fmt(value)}</span>
    </span>
  );
}
