import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { site, telHref } from '../data/site.js';
import {
  paperTypes,
  quantities,
  cardPrices,
  orderTypes,
  designChanges,
  labelOf,
  priceOf,
  cardOrderNotes,
} from '../data/businessCards.js';

/**
 * 名刺注文フォーム（入力 → 確認 → 送信完了）
 *
 * 送信先：環境変数 VITE_ORDER_FORM_ENDPOINT（名刺注文用の Formspree フォーム）。
 * 未設定の場合は、お問い合わせフォームと同じ VITE_FORM_ENDPOINT に送信します。
 * どちらも未設定の場合は「テストモード」（送信せずに完了画面まで確認できる）になります。
 */
const pick = (...urls) => urls.map((u) => (u || '').trim()).find((u) => /^https:\/\//.test(u)) || '';
const ENDPOINT = pick(import.meta.env.VITE_ORDER_FORM_ENDPOINT, import.meta.env.VITE_FORM_ENDPOINT);
const DRAFT_KEY = 'smilewise-card-order-draft';

const yen = (n) => `${n.toLocaleString('ja-JP')}円`;
let seq = 0;
const newCard = () => ({ id: `c${Date.now().toString(36)}${(seq += 1)}`, name: '', paper: '', quantity: '', design: '', note: '' });
const emptyOrderer = { company: '', name: '', tel: '', email: '', orderType: '' };

const makeOrderId = () => {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  return `SW-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
};

function validate(orderer, cards, agree) {
  const e = {};
  if (!orderer.company.trim()) e['o.company'] = '会社名を入力してください。（個人の場合は屋号またはお名前）';
  if (!orderer.name.trim()) e['o.name'] = 'ご担当者名を入力してください。';
  if (!orderer.tel.trim()) e['o.tel'] = '電話番号を入力してください。';
  else if (!/^[0-9０-９+\-－() ]{10,}$/.test(orderer.tel.trim())) e['o.tel'] = '電話番号の形式が正しくありません。（例：080-0000-0000）';
  if (!orderer.email.trim()) e['o.email'] = 'メールアドレスを入力してください。';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderer.email.trim())) e['o.email'] = 'メールアドレスの形式が正しくありません。';
  if (!orderer.orderType) e['o.orderType'] = '注文区分（新規注文・増刷注文）を選択してください。';
  cards.forEach((c, i) => {
    const n = `${i + 1}人目`;
    if (!c.name.trim()) e[`c.${c.id}.name`] = `${n}：名刺に印刷する氏名を入力してください。`;
    if (!c.paper) e[`c.${c.id}.paper`] = `${n}：紙質を選択してください。`;
    if (!c.quantity) e[`c.${c.id}.quantity`] = `${n}：枚数を選択してください。`;
    if (!c.design) e[`c.${c.id}.design`] = `${n}：デザイン変更の有無を選択してください。`;
    if (c.note.length > 500) e[`c.${c.id}.note`] = `${n}：備考は500文字以内で入力してください。`;
  });
  if (!agree) e.agree = 'プライバシーポリシーへの同意が必要です。';
  return e;
}

/** 選択肢をボタン状に並べるラジオグループ */
function Choice({ name, options, value, onChange, error, label, idBase }) {
  return (
    <fieldset className={`co-choice${error ? ' is-error' : ''}`} aria-invalid={error ? true : undefined} aria-describedby={error ? `${idBase}-err` : undefined}>
      <legend className="form__label">
        {label}
        <span className="form__req">必須</span>
      </legend>
      <div className="co-choice__opts">
        {options.map((o) => (
          <label key={o.value} className={`co-chip${value === o.value ? ' is-on' : ''}`}>
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} data-field={idBase} />
            <span>{o.label}</span>
            {o.sub && <small>{o.sub}</small>}
          </label>
        ))}
      </div>
      {error && (
        <p className="form__error" id={`${idBase}-err`}>
          {error}
        </p>
      )}
    </fieldset>
  );
}

export default function CardOrderForm() {
  const [step, setStep] = useState('input'); // input | confirm | done
  const [orderer, setOrderer] = useState(emptyOrderer);
  const [cards, setCards] = useState(() => [{ ...newCard(), id: 'c-first' }]);
  const [agree, setAgree] = useState(false);
  const [gotcha, setGotcha] = useState('');
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | error
  const [removing, setRemoving] = useState(null);
  const [done, setDone] = useState(null);
  const orderId = useRef('');
  const sendingRef = useRef(false);
  const shownAt = useRef(0);
  const topRef = useRef(null);
  const focusNext = useRef(null);

  // 入力途中の内容をブラウザに一時保存（再読み込みしても消えないように）
  useEffect(() => {
    shownAt.current = Date.now();
    try {
      const d = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || 'null');
      if (d?.orderer && Array.isArray(d.cards) && d.cards.length) {
        setOrderer({ ...emptyOrderer, ...d.orderer });
        setCards(d.cards.map((c) => ({ ...newCard(), ...c })));
      }
    } catch {
      /* 保存領域が使えない場合は何もしない */
    }
  }, []);
  useEffect(() => {
    if (step !== 'input') return;
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ orderer, cards }));
    } catch {
      /* noop */
    }
  }, [orderer, cards, step]);

  // 追加したカードの氏名欄にカーソルを移す
  useEffect(() => {
    if (focusNext.current) {
      document.getElementById(`card-${focusNext.current}-name`)?.focus();
      focusNext.current = null;
    }
  }, [cards]);

  const total = cards.reduce((sum, c) => sum + (priceOf(c) ?? 0), 0);
  const priced = cards.filter((c) => priceOf(c) != null).length;

  const clearError = (key) => errors[key] && setErrors((er) => ({ ...er, [key]: undefined }));
  const setO = (k, v) => {
    setOrderer((o) => ({ ...o, [k]: v }));
    clearError(`o.${k}`);
  };
  const setC = (id, k, v) => {
    setCards((cs) => cs.map((c) => (c.id === id ? { ...c, [k]: v } : c)));
    clearError(`c.${id}.${k}`);
  };
  const addCard = () => {
    const c = newCard();
    focusNext.current = c.id;
    setCards((cs) => [...cs, c]);
  };
  const removeCard = (id) => {
    setCards((cs) => (cs.length > 1 ? cs.filter((c) => c.id !== id) : cs));
    setRemoving(null);
    setErrors((er) => Object.fromEntries(Object.entries(er).filter(([k]) => !k.startsWith(`c.${id}.`))));
  };
  const askRemove = (c) => {
    const filled = c.name || c.paper || c.quantity || c.design || c.note;
    if (filled) setRemoving(c.id);
    else removeCard(c.id);
  };

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const goConfirm = () => {
    const e = validate(orderer, cards, agree);
    setErrors(e);
    const keys = Object.keys(e);
    if (keys.length) {
      setShowSummary(true);
      // 最初の入力漏れへ移動
      const first = keys[0];
      const el =
        document.querySelector(`[data-field="${first}"]`) ||
        document.getElementById(first === 'agree' ? 'co-agree' : '');
      el?.focus();
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setShowSummary(false);
    setStatus('idle');
    setStep('confirm');
    setTimeout(scrollTop, 0);
  };

  const submit = async () => {
    if (sendingRef.current) return; // 二重送信の防止
    // 迷惑送信対策（隠し項目に入力／表示から5秒未満の送信）は、送信せずに完了扱い
    if (gotcha || Date.now() - shownAt.current < 5000) {
      setDone({ id: makeOrderId(), test: !ENDPOINT });
      setStep('done');
      return;
    }
    sendingRef.current = true;
    setStatus('sending');
    if (!orderId.current) orderId.current = makeOrderId(); // 再送信しても同じ注文番号

    const lines = cards.map((c, i) => {
      const p = priceOf(c);
      return [
        `【${i + 1}人目】${c.name}`,
        `紙質：${labelOf(paperTypes, c.paper)}`,
        `枚数：${c.quantity}枚`,
        `デザイン変更：${labelOf(designChanges, c.design)}`,
        `概算料金：${yen(p)}（税込）`,
        c.note ? `備考：${c.note}` : '',
      ]
        .filter(Boolean)
        .join('\n');
    });
    const payload = {
      注文番号: orderId.current,
      注文区分: labelOf(orderTypes, orderer.orderType),
      会社名: orderer.company,
      ご担当者名: orderer.name,
      電話番号: orderer.tel,
      メールアドレス: orderer.email,
      注文人数: `${cards.length}名`,
      合計金額: `${yen(total)}（税込・概算）`,
      注文明細: lines.join('\n\n'),
      お支払い: '注文確認後にStripe決済リンクをLINEまたはメールでご案内',
      email: orderer.email,
      _replyto: orderer.email,
      _subject: `【名刺注文】${orderer.company} 様（${cards.length}名・${yen(total)}）${orderId.current}`,
      _gotcha: gotcha,
    };

    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      } else {
        await new Promise((r) => setTimeout(r, 800));
        console.info('[テストモード] 名刺注文の内容（実際には送信されていません）', payload);
      }
      setDone({ id: orderId.current, test: !ENDPOINT, email: orderer.email });
      setStep('done');
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* noop */
      }
      setTimeout(scrollTop, 0);
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      sendingRef.current = false;
    }
  };

  const restart = () => {
    setOrderer(emptyOrderer);
    setCards([newCard()]);
    setAgree(false);
    setErrors({});
    setStatus('idle');
    orderId.current = '';
    shownAt.current = Date.now();
    setStep('input');
    setTimeout(scrollTop, 0);
  };

  /* ---------- 送信完了 ---------- */
  if (step === 'done' && done) {
    return (
      <div className="co" ref={topRef}>
        <div className="form-done co-done" role="status">
          <span className="form-done__icon">
            <Icon name="check" size={36} strokeWidth={2} />
          </span>
          <h2>名刺のご注文を受け付けました</h2>
          <p className="co-done__id">
            注文番号：<b>{done.id}</b>
          </p>
          <p>
            ご注文内容とデザインを確認のうえ、SmileWiseから
            <b>LINEまたはメールで、お支払い方法（決済リンク）をご案内</b>します。
            <br />
            お支払いの確認後に制作を進めます。
          </p>
          {done.test && (
            <p className="form-test-note">
              ※ 現在テストモードのため、実際には送信されていません（送信内容はブラウザのコンソールに表示されています）。
            </p>
          )}
          <p className="co-done__help">
            数日たっても連絡がない場合は、お手数ですがお電話（<a href={telHref()}>{site.tel}</a>）またはLINEでお問い合わせください。
          </p>
          <div className="form-done__actions">
            <Link to="/" className="btn btn--outline">
              トップページへ戻る
            </Link>
            <button type="button" className="btn btn--ghost" onClick={restart}>
              別の注文を入力する
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- 確認画面 ---------- */
  if (step === 'confirm') {
    return (
      <div className="co" ref={topRef}>
        <p className="co-steps" aria-label="注文の手順">
          <span>1. 入力</span>
          <span className="is-on">2. 確認</span>
          <span>3. 送信完了</span>
        </p>
        <section className="co-panel">
          <h2 className="co-panel__title">注文者情報</h2>
          <dl className="co-dl">
            <div>
              <dt>注文区分</dt>
              <dd>{labelOf(orderTypes, orderer.orderType)}</dd>
            </div>
            <div>
              <dt>会社名</dt>
              <dd>{orderer.company}</dd>
            </div>
            <div>
              <dt>ご担当者名</dt>
              <dd>{orderer.name}</dd>
            </div>
            <div>
              <dt>電話番号</dt>
              <dd>{orderer.tel}</dd>
            </div>
            <div>
              <dt>メールアドレス</dt>
              <dd>{orderer.email}</dd>
            </div>
          </dl>
        </section>

        <section className="co-panel">
          <h2 className="co-panel__title">
            名刺の注文内容<span className="co-count">注文人数 {cards.length}名</span>
          </h2>
          <div className="table-wrap">
            <table className="co-table">
              <thead>
                <tr>
                  <th scope="col">氏名</th>
                  <th scope="col">紙質</th>
                  <th scope="col">枚数</th>
                  <th scope="col">デザイン変更</th>
                  <th scope="col">料金（税込）</th>
                </tr>
              </thead>
              <tbody>
                {cards.map((c, i) => (
                  <tr key={c.id}>
                    <th scope="row">
                      <small>{i + 1}人目</small>
                      {c.name}
                      {c.note && <span className="co-table__note">備考：{c.note}</span>}
                    </th>
                    <td data-label="紙質">{labelOf(paperTypes, c.paper)}</td>
                    <td data-label="枚数">{c.quantity}枚</td>
                    <td data-label="デザイン変更">{labelOf(designChanges, c.design)}</td>
                    <td data-label="料金" className="co-table__price">
                      {yen(priceOf(c))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="co-total co-total--static">
            <span>合計金額（税込・概算）</span>
            <b>{yen(total)}</b>
          </div>
        </section>

        <div className="co-pay">
          <Icon name="yen" size={22} />
          <div>
            <b>注文確認後にお支払い方法をご案内します</b>
            <p>このフォームでのお支払い（クレジットカード決済）はありません。SmileWiseがご注文内容とデザインを確認後、LINEまたはメールで決済リンクをお送りします。</p>
          </div>
        </div>
        <ul className="notes">
          {cardOrderNotes.map((n) => (
            <li key={n}>※ {n}</li>
          ))}
        </ul>

        {status === 'error' && (
          <p className="form__alert" role="alert">
            送信に失敗しました。入力内容は残っていますので、通信状況をご確認のうえ、もう一度「注文を送信する」を押してください。解決しない場合は、お電話（
            <a href={telHref()}>{site.tel}</a>）またはLINEでご連絡ください。
          </p>
        )}
        {!ENDPOINT && <p className="form-test-note">※ 現在テストモードです。送信してもメールは届きません。</p>}

        <div className="co-actions">
          <button type="button" className="btn btn--outline btn--lg" onClick={() => setStep('input')} disabled={status === 'sending'}>
            注文内容を修正する
          </button>
          <button type="button" className="btn btn--primary btn--lg" onClick={submit} disabled={status === 'sending'} aria-busy={status === 'sending'}>
            {status === 'sending' ? '送信中…' : '注文を送信する'}
            {status !== 'sending' && <Icon name="arrow" size={18} />}
          </button>
        </div>
      </div>
    );
  }

  /* ---------- 入力画面 ---------- */
  const errorList = Object.values(errors).filter(Boolean);
  const oField = (k) => ({
    id: `o-${k}`,
    value: orderer[k],
    onChange: (e) => setO(k, e.target.value),
    'data-field': `o.${k}`,
    'aria-invalid': errors[`o.${k}`] ? true : undefined,
    'aria-describedby': errors[`o.${k}`] ? `o-${k}-err` : undefined,
  });
  const Err = ({ k, id }) =>
    errors[k] ? (
      <p className="form__error" id={id}>
        {errors[k]}
      </p>
    ) : null;

  return (
    <div className="co" ref={topRef}>
      <p className="co-steps" aria-label="注文の手順">
        <span className="is-on">1. 入力</span>
        <span>2. 確認</span>
        <span>3. 送信完了</span>
      </p>
      {!ENDPOINT && (
        <p className="form-test-note">※ このフォームは現在テストモードです。確認画面・送信完了までの動作を確認できますが、注文は送信されません。</p>
      )}
      {showSummary && errorList.length > 0 && (
        <div className="co-errors" role="alert">
          <b>入力内容をご確認ください（{errorList.length}件）</b>
          <ul>
            {errorList.slice(0, 6).map((m) => (
              <li key={m}>{m}</li>
            ))}
            {errorList.length > 6 && <li>ほか {errorList.length - 6}件</li>}
          </ul>
        </div>
      )}

      {/* 1. 注文者情報 */}
      <section className="co-panel">
        <h2 className="co-panel__title">
          <span className="co-panel__no">1</span>注文者情報
          <small>注文全体で1回だけ入力してください</small>
        </h2>
        <div className="form">
          <Choice
            name="orderType"
            label="注文区分"
            idBase="o.orderType"
            options={orderTypes}
            value={orderer.orderType}
            onChange={(v) => setO('orderType', v)}
            error={errors['o.orderType']}
          />
          <div className="form__2col">
            <div className="form__row">
              <label htmlFor="o-company" className="form__label">
                会社名<span className="form__req">必須</span>
              </label>
              <input type="text" autoComplete="organization" maxLength={100} placeholder="例）株式会社〇〇" {...oField('company')} />
              <Err k="o.company" id="o-company-err" />
            </div>
            <div className="form__row">
              <label htmlFor="o-name" className="form__label">
                ご担当者名<span className="form__req">必須</span>
              </label>
              <input type="text" autoComplete="name" maxLength={50} placeholder="例）山田 太郎" {...oField('name')} />
              <Err k="o.name" id="o-name-err" />
            </div>
          </div>
          <div className="form__2col">
            <div className="form__row">
              <label htmlFor="o-tel" className="form__label">
                電話番号<span className="form__req">必須</span>
              </label>
              <input type="tel" autoComplete="tel" inputMode="tel" maxLength={20} placeholder="例）080-0000-0000" {...oField('tel')} />
              <Err k="o.tel" id="o-tel-err" />
            </div>
            <div className="form__row">
              <label htmlFor="o-email" className="form__label">
                メールアドレス<span className="form__req">必須</span>
              </label>
              <input type="email" autoComplete="email" inputMode="email" maxLength={254} placeholder="例）info@example.com" {...oField('email')} />
              <Err k="o.email" id="o-email-err" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. 名刺の注文内容（人数分） */}
      <section className="co-panel co-panel--cards">
        <h2 className="co-panel__title">
          <span className="co-panel__no">2</span>名刺の注文内容
          <small>名刺を作る方の人数分、入力してください</small>
        </h2>

        <ol className="co-cards">
          {cards.map((c, i) => {
            const p = priceOf(c);
            const k = (f) => `c.${c.id}.${f}`;
            return (
              <li key={c.id} className="co-card">
                <div className="co-card__head">
                  <span className="co-card__no">{i + 1}人目</span>
                  <span className="co-card__price">{p != null ? yen(p) : '—'}</span>
                  <button
                    type="button"
                    className="co-card__remove"
                    onClick={() => askRemove(c)}
                    disabled={cards.length === 1}
                    aria-label={`${i + 1}人目の名刺を削除`}
                    title={cards.length === 1 ? '1人分は必要です' : '削除'}
                  >
                    <Icon name="x" size={18} />
                    <span>削除</span>
                  </button>
                </div>
                {removing === c.id && (
                  <div className="co-card__confirm" role="alertdialog" aria-label="削除の確認">
                    <p>{c.name ? `「${c.name}」さん` : `${i + 1}人目`}の名刺を削除しますか？</p>
                    <div>
                      <button type="button" className="btn btn--outline" onClick={() => setRemoving(null)}>
                        やめる
                      </button>
                      <button type="button" className="btn btn--primary" onClick={() => removeCard(c.id)}>
                        削除する
                      </button>
                    </div>
                  </div>
                )}

                <div className="form">
                  <div className="form__row">
                    <label htmlFor={`card-${c.id}-name`} className="form__label">
                      名刺に印刷する氏名<span className="form__req">必須</span>
                    </label>
                    <input
                      id={`card-${c.id}-name`}
                      type="text"
                      maxLength={50}
                      placeholder="例）山田 太郎"
                      value={c.name}
                      onChange={(e) => setC(c.id, 'name', e.target.value)}
                      data-field={k('name')}
                      aria-invalid={errors[k('name')] ? true : undefined}
                    />
                    <Err k={k('name')} />
                  </div>
                  <Choice
                    name={`paper-${c.id}`}
                    label="紙質"
                    idBase={k('paper')}
                    options={paperTypes}
                    value={c.paper}
                    onChange={(v) => setC(c.id, 'paper', v)}
                    error={errors[k('paper')]}
                  />
                  <Choice
                    name={`qty-${c.id}`}
                    label="枚数"
                    idBase={k('quantity')}
                    options={quantities.map((q) => ({
                      value: q,
                      label: `${q}枚`,
                      sub: c.paper ? yen(cardPrices[c.paper][q]) : '',
                    }))}
                    value={c.quantity}
                    onChange={(v) => setC(c.id, 'quantity', v)}
                    error={errors[k('quantity')]}
                  />
                  <Choice
                    name={`design-${c.id}`}
                    label="デザイン変更"
                    idBase={k('design')}
                    options={designChanges}
                    value={c.design}
                    onChange={(v) => setC(c.id, 'design', v)}
                    error={errors[k('design')]}
                  />
                  <div className="form__row">
                    <label htmlFor={`card-${c.id}-note`} className="form__label">
                      備考<span className="form__opt">任意</span>
                    </label>
                    <textarea
                      id={`card-${c.id}-note`}
                      rows={2}
                      maxLength={500}
                      placeholder="例）役職を「営業部長」に変更、裏面は前回と同じ など"
                      value={c.note}
                      onChange={(e) => setC(c.id, 'note', e.target.value)}
                      data-field={k('note')}
                    />
                    <Err k={k('note')} />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <button type="button" className="co-add" onClick={addCard}>
          <Icon name="plus" size={20} strokeWidth={2} />
          別の人の名刺を追加
        </button>
      </section>

      {/* 料金の注意・同意 */}
      <section className="co-panel">
        <div className="co-pay">
          <Icon name="yen" size={22} />
          <div>
            <b>注文確認後にお支払い方法をご案内します</b>
            <p>このフォームでのお支払い（クレジットカード決済）はありません。</p>
          </div>
        </div>
        <ul className="notes">
          {cardOrderNotes.map((n) => (
            <li key={n}>※ {n}</li>
          ))}
        </ul>
        <div className="form__hp" aria-hidden="true">
          <label>
            この項目は入力しないでください
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" value={gotcha} onChange={(e) => setGotcha(e.target.value)} />
          </label>
        </div>
        <div className="form__row form__agree">
          <label className="checkbox">
            <input
              id="co-agree"
              type="checkbox"
              checked={agree}
              onChange={(e) => {
                setAgree(e.target.checked);
                clearError('agree');
              }}
              data-field="agree"
              aria-invalid={errors.agree ? true : undefined}
            />
            <span>
              <Link to="/privacy" target="_blank" rel="noopener">
                プライバシーポリシー
              </Link>
              に同意する<span className="form__req">必須</span>
            </span>
          </label>
          <Err k="agree" />
          <p className="form__privacy-note">
            送信内容は、フォーム送信サービス「Formspree」（提供：Formspree, Inc.／アメリカ合衆国）を経由して当事業者に届きます。
          </p>
        </div>
      </section>

      {/* 合計（スマホでは画面下に固定） */}
      <div className="co-total" aria-live="polite">
        <div className="co-total__sum">
          <span>
            合計（税込・概算）<small>{cards.length}名分{priced < cards.length ? `／うち${cards.length - priced}名は未選択` : ''}</small>
          </span>
          <b>{yen(total)}</b>
        </div>
        <button type="button" className="btn btn--primary co-total__btn" onClick={goConfirm}>
          注文内容を確認する
          <Icon name="arrow" size={18} />
        </button>
      </div>
    </div>
  );
}
