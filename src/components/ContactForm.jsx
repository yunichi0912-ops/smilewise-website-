import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Icon from './Icon.jsx';

/**
 * お問い合わせフォーム
 *
 * 送信先は環境変数 VITE_FORM_ENDPOINT で指定します（Formspree などのフォーム送信サービスのURL）。
 * 未設定の場合は「テストモード」となり、入力チェックと送信完了画面までを確認できます
 * （送信内容はブラウザの開発者ツールのコンソールに表示され、メールは送信されません）。
 */
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '';

export const inquiryTypes = [
  { value: 'web', label: 'ホームページ制作' },
  { value: 'system', label: '業務管理システム開発・導入' },
  { value: 'recruit', label: '採用LP制作' },
  { value: 'print', label: '名刺・チラシ・パンフレット制作' },
  { value: 'logo', label: 'ロゴ・看板制作' },
  { value: 'maintenance', label: 'ホームページ年間管理' },
  { value: 'other', label: 'その他・まだ決まっていない' },
];

const initial = {
  company: '',
  name: '',
  email: '',
  tel: '',
  type: '',
  message: '',
  agree: false,
  _gotcha: '',
};

const validate = (v) => {
  const e = {};
  if (!v.name.trim()) e.name = 'お名前を入力してください。';
  if (!v.email.trim()) e.email = 'メールアドレスを入力してください。';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'メールアドレスの形式が正しくありません。';
  if (v.tel && !/^[0-9０-９+\-－() ]{10,}$/.test(v.tel.trim())) e.tel = '電話番号の形式が正しくありません。';
  if (!v.type) e.type = 'ご相談内容を選択してください。';
  if (!v.message.trim()) e.message = 'お問い合わせ内容を入力してください。';
  else if (v.message.length > 3000) e.message = '3000文字以内で入力してください。';
  if (!v.agree) e.agree = 'プライバシーポリシーへの同意が必要です。';
  return e;
};

export default function ContactForm() {
  const [params] = useSearchParams();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  // サービスページ等から ?type=system のように遷移してきた場合、ご相談内容を自動選択
  useEffect(() => {
    const t = params.get('type');
    if (t && inquiryTypes.some((i) => i.value === t)) setValues((v) => ({ ...v, type: t }));
  }, [params]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = document.querySelector(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }
    if (values._gotcha) return; // スパム対策（ボットのみが入力する隠し項目）

    const payload = {
      会社名: values.company,
      お名前: values.name,
      メールアドレス: values.email,
      電話番号: values.tel,
      ご相談内容: inquiryTypes.find((i) => i.value === values.type)?.label,
      お問い合わせ内容: values.message,
      _replyto: values.email,
      _subject: `【お問い合わせ】${inquiryTypes.find((i) => i.value === values.type)?.label}（${values.name}様）`,
    };

    setStatus('sending');
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      } else {
        // テストモード：送信はせず、内容をコンソールに表示
        await new Promise((r) => setTimeout(r, 800));
        // eslint-disable-next-line no-console
        console.info('[テストモード] お問い合わせ内容（実際には送信されていません）', payload);
      }
      setStatus('done');
      setValues(initial);
      window.scrollTo({ top: document.getElementById('contact-form')?.offsetTop - 120 || 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div className="form-done" id="contact-form" role="status">
        <span className="form-done__icon">
          <Icon name="check" size={36} strokeWidth={2} />
        </span>
        <h2>お問い合わせありがとうございます</h2>
        <p>
          内容を確認のうえ、担当者よりご連絡いたします。
          <br />
          しばらくお待ちくださいますようお願いいたします。
        </p>
        {!ENDPOINT && (
          <p className="form-test-note">
            ※ 現在テストモードのため、実際には送信されていません（送信内容はブラウザのコンソールに表示されています）。
          </p>
        )}
        <div className="form-done__actions">
          <Link to="/" className="btn btn--outline">
            トップページへ戻る
          </Link>
          <button type="button" className="btn btn--ghost" onClick={() => setStatus('idle')}>
            続けて入力する
          </button>
        </div>
      </div>
    );
  }

  const field = (name) => ({
    id: `f-${name}`,
    name,
    value: values[name],
    onChange,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `e-${name}` : undefined,
  });
  const Err = ({ name }) =>
    errors[name] ? (
      <p className="form__error" id={`e-${name}`}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <form className="form" id="contact-form" onSubmit={onSubmit} noValidate>
      {!ENDPOINT && (
        <p className="form-test-note">
          ※ このフォームは現在テストモードです。入力チェックと送信完了までの動作を確認できますが、メールは送信されません。
        </p>
      )}

      <div className="form__row">
        <label htmlFor="f-company" className="form__label">
          会社名・屋号<span className="form__opt">任意</span>
        </label>
        <input type="text" autoComplete="organization" placeholder="例）株式会社〇〇" {...field('company')} />
      </div>

      <div className="form__row">
        <label htmlFor="f-name" className="form__label">
          お名前<span className="form__req">必須</span>
        </label>
        <input type="text" autoComplete="name" placeholder="例）山田 太郎" {...field('name')} />
        <Err name="name" />
      </div>

      <div className="form__2col">
        <div className="form__row">
          <label htmlFor="f-email" className="form__label">
            メールアドレス<span className="form__req">必須</span>
          </label>
          <input type="email" autoComplete="email" inputMode="email" placeholder="例）info@example.com" {...field('email')} />
          <Err name="email" />
        </div>
        <div className="form__row">
          <label htmlFor="f-tel" className="form__label">
            電話番号<span className="form__opt">任意</span>
          </label>
          <input type="tel" autoComplete="tel" inputMode="tel" placeholder="例）093-000-0000" {...field('tel')} />
          <Err name="tel" />
        </div>
      </div>

      <div className="form__row">
        <label htmlFor="f-type" className="form__label">
          ご相談内容<span className="form__req">必須</span>
        </label>
        <div className="form__select">
          <select {...field('type')}>
            <option value="">選択してください</option>
            {inquiryTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <Err name="type" />
      </div>

      <div className="form__row">
        <label htmlFor="f-message" className="form__label">
          お問い合わせ内容<span className="form__req">必須</span>
        </label>
        <textarea
          rows={7}
          placeholder={
            values.type === 'system'
              ? '例）現在Excelで見積書と請求書を管理しており、まとめて管理できるシステムを検討しています。'
              : '例）会社のホームページを新しく作りたいと考えています。'
          }
          {...field('message')}
        />
        <Err name="message" />
      </div>

      <div className="form__hp" aria-hidden="true">
        <label>
          この項目は入力しないでください
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" value={values._gotcha} onChange={onChange} />
        </label>
      </div>

      <div className="form__row form__agree">
        <label className="checkbox">
          <input type="checkbox" {...field('agree')} checked={values.agree} value="yes" />
          <span>
            <Link to="/privacy" target="_blank" rel="noopener">
              プライバシーポリシー
            </Link>
            に同意する<span className="form__req">必須</span>
          </span>
        </label>
        <Err name="agree" />
      </div>

      {status === 'error' && (
        <p className="form__alert" role="alert">
          送信に失敗しました。お手数ですが、時間をおいて再度お試しください。
        </p>
      )}

      <div className="form__submit">
        <button type="submit" className="btn btn--primary btn--lg" disabled={status === 'sending'}>
          {status === 'sending' ? '送信中…' : '内容を送信する'}
          {status !== 'sending' && <Icon name="arrow" size={18} />}
        </button>
      </div>
    </form>
  );
}
