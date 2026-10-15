import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import qrUrl from '../assets/line-qr.jpg';
import { site, telHref, mailHref } from '../data/site.js';

/**
 * お問い合わせの3つの窓口（電話／LINE／フォーム）
 * variant="full"：お問い合わせページ用（QRコードつき）
 * variant="compact"：各ページ下部のお問い合わせ帯用
 */
export default function ContactChannels({ variant = 'full', formTo = '#contact-form' }) {
  const full = variant === 'full';
  const FormLink = ({ children, className }) =>
    formTo.startsWith('#') ? (
      <a href={formTo} className={className}>
        {children}
      </a>
    ) : (
      <Link to={formTo} className={className}>
        {children}
      </Link>
    );

  return (
    <div className={`channels channels--${variant}`}>
      {/* 電話 */}
      <Reveal className="channel channel--tel spot">
        <span className="channel__icon">
          <Icon name="phone" size={22} />
        </span>
        <p className="channel__label">電話で相談</p>
        <a href={telHref()} className="channel__tel">
          {site.tel}
        </a>
        {site.hours && <p className="channel__note">{site.hours}</p>}
        {full && <p className="channel__note">スマートフォンでは、番号をタップするとそのまま発信できます。</p>}
        <a href={telHref()} className="btn btn--outline channel__btn">
          <Icon name="phone" size={18} />
          電話をかける
        </a>
      </Reveal>

      {/* LINE */}
      <Reveal className="channel channel--line spot" delay={100}>
        <span className="channel__icon channel__icon--line">
          <Icon name="line" size={24} />
        </span>
        <p className="channel__label">LINEで無料相談</p>
        {full ? (
          <>
            <img src={qrUrl} alt="SmileWise公式LINEの友だち追加用QRコード" width="612" height="612" className="channel__qr" loading="lazy" />
            <p className="channel__note">QRコードを読み取って、友だち追加してください。</p>
          </>
        ) : (
          <p className="channel__text">気軽に質問・相談ができます</p>
        )}
        {site.lineUrl ? (
          <a href={site.lineUrl} className="btn btn--line channel__btn" target="_blank" rel="noopener noreferrer">
            <Icon name="line" size={20} />
            LINEで友だち追加
          </a>
        ) : (
          !full && (
            <Link to="/contact#channels" className="btn btn--line channel__btn">
              <Icon name="line" size={20} />
              QRコードを表示
            </Link>
          )
        )}
      </Reveal>

      {/* フォーム */}
      <Reveal className="channel channel--form spot" delay={200}>
        <span className="channel__icon">
          <Icon name="mail" size={22} />
        </span>
        <p className="channel__label">お問い合わせフォーム</p>
        <p className="channel__text">24時間受付。内容を確認のうえご連絡します。</p>
        <FormLink className="btn btn--primary channel__btn">
          フォームで相談する
          <Icon name="arrow" size={18} />
        </FormLink>
      </Reveal>
      {site.email && (
        <p className="channels__mail">
          <Icon name="mail" size={18} />
          メールでのお問い合わせ：
          <a href={mailHref()}>{site.email}</a>
        </p>
      )}
    </div>
  );
}
