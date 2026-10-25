import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { site, telHref } from '../data/site.js';
import { yen, TAX } from '../data/pricing.js';
import { questions, answerLabel, diagnose, standardPrices, quoteItems, pageOptionText } from '../data/diagnosis.js';

/**
 * 無料ホームページ診断（4問）→ 診断結果 → 無料デザイン案の申し込み（入力 → 確認 → 送信完了）
 *
 * 送信先：環境変数 VITE_DIAGNOSIS_FORM_ENDPOINT（診断・デザイン提案用の Formspree フォーム）。
 * 未設定の場合は、お問い合わせフォームと同じ VITE_FORM_ENDPOINT に送信します。
 * どちらも未設定の場合は「テストモード」（送信せずに完了画面まで確認できる）になります。
 * ※ Formspree のフォームURLは公開されても問題のない値です（APIキーなどの秘密情報は使いません）。
 */
const pick = (...urls) => urls.map((u) => (u || '').trim()).find((u) => /^https:\/\//.test(u)) || '';
const ENDPOINT = pick(import.meta.env.VITE_DIAGNOSIS_FORM_ENDPOINT, import.meta.env.VITE_FORM_ENDPOINT);
const STORE_KEY = 'smilewise-diagnosis';
const ADVANCE_MS = 260; // 選択した状態を見せてから次の質問へ
const MIN_FILL_MS = 4000; // 申し込み画面の表示からこれより早い送信は機械的な送信とみなす

const emptyForm = { company: '', industry: '', name: '', email: '', tel: '', siteUrl: '', reference: '' };

const makeId = () => {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  return `SW-D-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
};

function validate(f, agree) {
  const e = {};
  if (!f.company.trim()) e.company = '会社名を入力してください。（個人の場合は屋号またはお名前）';
  if (!f.industry.trim()) e.industry = '業種を入力してください。（例：建設業、美容室、飲食店 など）';
  if (!f.name.trim()) e.name = 'お名前を入力してください。';
  if (!f.email.trim()) e.email = 'メールアドレスを入力してください。';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'メールアドレスの形式が正しくありません。';
  if (f.tel.trim() && !/^[0-9０-９+\-－() ]{10,}$/.test(f.tel.trim())) e.tel = '電話番号の形式が正しくありません。（例：080-0000-0000）';
  if (f.siteUrl.trim() && !/^(https?:\/\/)?[^\s/.]+\.[^\s]{2,}$/i.test(f.siteUrl.trim()))
    e.siteUrl = 'URLの形式が正しくありません。（例：https://example.com）';
  if (f.reference.length > 1000) e.reference = '希望・参考サイトは1000文字以内で入力してください。';
  if (!agree) e.agree = '個人情報の取り扱いへの同意が必要です。';
  return e;
}

/** 診断結果（料金はすべて pricing.js から） */
function ResultView({ result }) {
  return (
    <>
      <div className="dg-result__head">
        <p className="dg-result__label">あなたにおすすめのサイト</p>
        <h2 className="dg-result__title" tabIndex={-1} data-autofocus>
          {result.title}
        </h2>
        <p className="dg-result__summary">{result.summary}</p>
      </div>

      <section className="dg-block" aria-labelledby="dg-structure">
        <h3 id="dg-structure" className="dg-block__title">
          <Icon name="system" size={20} />
          {result.pages ? `構成例（${result.pages.length}ページ）` : '構成例（1ページの流れ）'}
        </h3>
        <ol className="dg-structure">
          {(result.pages ?? result.sections.map((name) => ({ name }))).map((p, i) => (
            <li key={p.name}>
              <span className="dg-structure__no">{i + 1}</span>
              <span>
                <b>{p.name}</b>
                {p.note && <small>{p.note}</small>}
              </span>
            </li>
          ))}
        </ol>
        <p className="dg-small">※ 構成は一例です。ヒアリングの内容に合わせてご提案します。</p>
      </section>

      <section className="dg-block" aria-labelledby="dg-points">
        <h3 id="dg-points" className="dg-block__title">
          <Icon name="check" size={20} />
          制作のポイント
        </h3>
        <ul className="dg-points">
          {result.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section className="dg-block dg-price" aria-labelledby="dg-price">
        <h3 id="dg-price" className="dg-block__title">
          <Icon name="yen" size={20} />
          料金の目安
        </h3>
        {result.pricing === 'standard' ? (
          <>
            <p className="dg-price__plan">
              標準料金：{standardPrices.plan}（最大{standardPrices.maxPages}ページ）
            </p>
            <dl className="dg-price__list">
              <div>
                <dt>初期制作費</dt>
                <dd>
                  <b>{yen(standardPrices.initial)}</b>円<small>{TAX}</small>
                </dd>
              </div>
              <div>
                <dt>
                  管理費（年払い）<small>月払いより年間{yen(standardPrices.saving)}円お得</small>
                </dt>
                <dd>
                  <b>{yen(standardPrices.annual)}</b>円／年<small>{TAX}</small>
                </dd>
              </div>
              <div>
                <dt>管理費（月払い）</dt>
                <dd>
                  <b>{yen(standardPrices.monthly)}</b>円／月<small>{TAX}</small>
                </dd>
              </div>
              <div className="is-total">
                <dt>初年度総額（年払い）</dt>
                <dd>
                  <b>{yen(standardPrices.firstYear)}</b>円<small>{TAX}</small>
                </dd>
              </div>
              <div>
                <dt>初年度総額（月払い）</dt>
                <dd>
                  <b>{yen(standardPrices.firstYearMonthly)}</b>円<small>{TAX}</small>
                </dd>
              </div>
            </dl>
            <p className="dg-small">
              ※ 最低契約期間は{standardPrices.minMonths}か月です。{pageOptionText}
              <Link to="/nikoniko">プランの詳細を見る</Link>
            </p>
          </>
        ) : (
          <div className="dg-price__quote">
            <b>個別見積もり</b>
            <p>LPは、構成・ボリューム・必要な機能によって制作内容が変わるため、ニコニコプランの標準料金とは別に、内容を伺ってからお見積りします。</p>
          </div>
        )}
        <details className="dg-quote">
          <summary>標準料金に含まれず、個別見積もりとなる内容</summary>
          <ul>
            {quoteItems.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </details>
      </section>

      {result.notes.length > 0 && (
        <ul className="dg-notes">
          {result.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}
    </>
  );
}

/** 無料デザイン案・個人情報についての説明（申し込み画面と確認画面で共通） */
function ProposalNotes() {
  return (
    <ul className="dg-terms">
      <li>
        <Icon name="pen" size={18} />
        <span>
          無料デザイン案は、<b>初回のご提案用の簡易的なデザイン案</b>
          （トップページのイメージ）です。完成したホームページの公開や、無条件での提供をお約束するものではありません。
        </span>
      </li>
      <li>
        <Icon name="shield" size={18} />
        <span>
          無料診断・デザイン提案のお申し込みで、<b>ご契約やお支払いが発生することはありません。</b>
          ご依頼いただく場合は、内容とお見積りをご確認いただいたうえで、あらためてご契約となります。
        </span>
      </li>
    </ul>
  );
}

function PrivacyPurpose() {
  return (
    <div className="dg-privacy">
      <b>個人情報の利用目的</b>
      <p>
        ご入力いただいた情報と診断の回答は、無料デザイン案の作成・ご提案、およびお申し込み内容に関するご連絡のために利用します。法令に基づく場合を除き、ご本人の同意なく第三者に提供することはありません。
      </p>
      <p>
        送信内容は、フォーム送信サービス「Formspree」（提供：Formspree, Inc.／アメリカ合衆国）を経由して当事業者に届きます。詳しくは
        <Link to="/privacy" target="_blank" rel="noopener">
          プライバシーポリシー
        </Link>
        をご確認ください。
      </p>
    </div>
  );
}

export default function DiagnosisTool() {
  const [stage, setStage] = useState('q'); // q | result | end | form | confirm | done
  const [qi, setQi] = useState(0);
  const [dir, setDir] = useState('none'); // none | next | back（画面切り替えの動きの向き）
  const [answers, setAnswers] = useState({});
  const [form, setForm] = useState(emptyForm);
  const [agree, setAgree] = useState(false);
  const [gotcha, setGotcha] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | error
  const [doneInfo, setDoneInfo] = useState(null);
  const appId = useRef('');
  const sendingRef = useRef(false);
  const advancing = useRef(false);
  const formShownAt = useRef(0);
  const rootRef = useRef(null);
  const mounted = useRef(false);

  // 途中まで回答した内容を、再読み込みしても残るようにブラウザに一時保存
  useEffect(() => {
    try {
      const d = JSON.parse(sessionStorage.getItem(STORE_KEY) || 'null');
      if (d?.answers) {
        setAnswers(d.answers);
        setForm({ ...emptyForm, ...d.form });
        const answered = questions.filter((q) => d.answers[q.id]).length;
        if (answered === questions.length && ['result', 'form'].includes(d.stage)) setStage(d.stage);
        else setQi(Math.min(answered, questions.length - 1));
        if (d.stage === 'form') formShownAt.current = Date.now();
      }
    } catch {
      /* 保存領域が使えない場合は何もしない */
    }
  }, []);
  useEffect(() => {
    if (!['q', 'result', 'form'].includes(stage)) return;
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify({ answers, form, stage }));
    } catch {
      /* noop */
    }
  }, [answers, form, stage]);

  // 画面が切り替わったら、見出しへフォーカスを移して読み上げ・表示位置を合わせる（初回表示は除く）
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const root = rootRef.current;
    if (!root) return;
    const top = root.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.4) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    root.querySelector('[data-autofocus]')?.focus({ preventScroll: true });
  }, [stage, qi]);

  const go = (nextStage, nextQi = qi, d = 'next') => {
    setDir(d);
    setQi(nextQi);
    setStage(nextStage);
  };

  const choose = (qid, value) => {
    if (advancing.current) return; // 連続タップで2問進まないように
    advancing.current = true;
    setAnswers((a) => ({ ...a, [qid]: value }));
    setTimeout(() => {
      advancing.current = false;
      if (qi < questions.length - 1) go('q', qi + 1);
      else go('result');
    }, ADVANCE_MS);
  };

  const back = () => {
    if (stage === 'q' && qi > 0) go('q', qi - 1, 'back');
    else if (stage === 'result') go('q', questions.length - 1, 'back');
    else if (stage === 'form') go('result', qi, 'back');
    else if (stage === 'confirm') go('form', qi, 'back');
  };

  const restart = () => {
    setAnswers({});
    setForm(emptyForm);
    setAgree(false);
    setErrors({});
    setStatus('idle');
    appId.current = '';
    try {
      sessionStorage.removeItem(STORE_KEY);
    } catch {
      /* noop */
    }
    go('q', 0, 'back');
  };

  const endOnly = () => {
    try {
      sessionStorage.removeItem(STORE_KEY);
    } catch {
      /* noop */
    }
    go('end');
  };

  const openForm = () => {
    formShownAt.current = Date.now();
    go('form');
  };

  const setF = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const goConfirm = () => {
    const e = validate(form, agree);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      const el = rootRef.current?.querySelector(`[data-field="${first}"]`);
      el?.focus();
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setStatus('idle');
    go('confirm');
  };

  const result = questions.every((q) => answers[q.id]) ? diagnose(answers) : null;

  const submit = async () => {
    if (sendingRef.current) return; // 二重送信の防止
    // 迷惑送信対策（隠し項目に入力／表示から短時間での送信）は、送信せずに完了扱い
    if (gotcha || Date.now() - formShownAt.current < MIN_FILL_MS) {
      setDoneInfo({ id: makeId(), test: !ENDPOINT });
      go('done');
      return;
    }
    sendingRef.current = true;
    setStatus('sending');
    if (!appId.current) appId.current = makeId(); // 再送信しても同じ受付番号

    const url = form.siteUrl.trim();
    const payload = {
      受付番号: appId.current,
      お申し込み内容: '無料ホームページ診断・無料デザイン案の申し込み',
      会社名: form.company,
      業種: form.industry,
      お名前: form.name,
      メールアドレス: form.email,
      電話番号: form.tel || '（未入力）',
      現在のサイトURL: url ? (/^https?:\/\//i.test(url) ? url : `https://${url}`) : '（未入力）',
      '希望・参考サイト': form.reference || '（未入力）',
      診断結果: questions.map((q) => `${q.title}\n→ ${answerLabel(q.id, answers[q.id])}`).join('\n\n'),
      おすすめ: result?.title ?? '',
      料金区分: result?.pricing === 'standard' ? '標準料金（ニコニコプラン・月払い／年払い）' : '個別見積もり',
      個人情報の取り扱い: '利用目的・プライバシーポリシーに同意済み',
      email: form.email,
      _replyto: form.email,
      _subject: `【無料デザイン案】${form.company} 様（${result?.pricing === 'standard' ? 'ニコニコプラン' : '個別見積もり'}）${appId.current}`,
      _gotcha: gotcha,
    };

    try {
      if (ENDPOINT) {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 20000);
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
          signal: ctrl.signal,
        }).finally(() => clearTimeout(timer));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      } else {
        await new Promise((r) => setTimeout(r, 800));
        console.info('[テストモード] 無料デザイン案の申し込み内容（実際には送信されていません）', payload);
      }
      setDoneInfo({ id: appId.current, test: !ENDPOINT, email: form.email });
      try {
        sessionStorage.removeItem(STORE_KEY);
      } catch {
        /* noop */
      }
      go('done');
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      sendingRef.current = false;
    }
  };

  /* ---------- 進捗表示 ---------- */
  const answeredCount = questions.filter((q) => answers[q.id]).length;
  const progress = stage === 'q' ? Math.max(answeredCount, qi) / questions.length : 1;
  const flow = ['診断', '結果', '申し込み', '確認', '完了'];
  const flowIndex = { q: 0, result: 1, end: 1, form: 2, confirm: 3, done: 4 }[stage];

  const field = (k) => ({
    id: `dg-${k}`,
    value: form[k],
    onChange: (e) => setF(k, e.target.value),
    'data-field': k,
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `dg-${k}-err` : undefined,
  });
  const Err = ({ k }) =>
    errors[k] ? (
      <p className="form__error" id={`dg-${k}-err`}>
        {errors[k]}
      </p>
    ) : null;
  const errorList = Object.values(errors).filter(Boolean);

  let body;
  if (stage === 'q') {
    const q = questions[qi];
    body = (
      <div className="dg-q">
        <p className="dg-q__count">
          <span className="dg-q__en">Q{qi + 1}</span>
          質問 {qi + 1} / {questions.length}
        </p>
        <h2 className="dg-q__title" id="dg-q-title" tabIndex={-1} data-autofocus>
          {q.title}
        </h2>
        <div className="dg-options" role="group" aria-labelledby="dg-q-title">
          {q.options.map((o) => {
            const on = answers[q.id] === o.value;
            return (
              <button key={o.value} type="button" className={`dg-option${on ? ' is-on' : ''}`} aria-pressed={on} onClick={() => choose(q.id, o.value)}>
                <span className="dg-option__text">
                  <b>{o.label}</b>
                  {o.sub && <small>{o.sub}</small>}
                </span>
                <span className="dg-option__mark" aria-hidden="true">
                  <Icon name={on ? 'check' : 'arrow'} size={18} strokeWidth={2} />
                </span>
              </button>
            );
          })}
        </div>
        <p className="dg-small dg-q__hint">選ぶと次の質問に進みます。</p>
      </div>
    );
  } else if (stage === 'result' && result) {
    body = (
      <div className="dg-result">
        <ResultView result={result} />
        <div className="dg-offer">
          <p className="dg-offer__en">Free Design</p>
          <h3 className="dg-offer__title">この診断結果をもとに、無料でデザイン案をお作りします</h3>
          <ProposalNotes />
          <div className="dg-actions">
            <button type="button" className="btn btn--primary btn--lg" onClick={openForm}>
              無料デザイン案を申し込む
              <Icon name="arrow" size={18} />
            </button>
            <button type="button" className="btn btn--ghost" onClick={endOnly}>
              相談せず、診断だけで終了する
            </button>
          </div>
        </div>
      </div>
    );
  } else if (stage === 'end') {
    body = (
      <div className="dg-end">
        <h2 className="dg-panel-title" tabIndex={-1} data-autofocus>
          診断をご利用いただき、ありがとうございました
        </h2>
        <p>回答内容はどこにも送信されていません。この画面を閉じれば診断は終了です。</p>
        <p>あとからご相談・デザイン案のお申し込みをご希望の場合は、もう一度診断するか、お電話・LINE・お問い合わせフォームからお気軽にどうぞ。</p>
        <div className="dg-actions">
          <button type="button" className="btn btn--outline" onClick={restart}>
            もう一度診断する
          </button>
          <Link to="/" className="btn btn--ghost">
            トップページへ
          </Link>
        </div>
      </div>
    );
  } else if (stage === 'form') {
    body = (
      <div className="dg-form">
        <h2 className="dg-panel-title" tabIndex={-1} data-autofocus>
          無料デザイン案のお申し込み
        </h2>
        <p className="dg-small">診断の回答（{result?.title}）とあわせて送信されます。</p>
        {!ENDPOINT && <p className="form-test-note">※ このフォームは現在テストモードです。確認画面・送信完了までの動作を確認できますが、送信はされません。</p>}
        {errorList.length > 0 && (
          <div className="co-errors" role="alert">
            <b>入力内容をご確認ください（{errorList.length}件）</b>
            <ul>
              {errorList.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="form">
          <div className="form__2col">
            <div className="form__row">
              <label htmlFor="dg-company" className="form__label">
                会社名<span className="form__req">必須</span>
              </label>
              <input type="text" autoComplete="organization" maxLength={100} placeholder="例）株式会社〇〇（個人の方は屋号）" {...field('company')} />
              <Err k="company" />
            </div>
            <div className="form__row">
              <label htmlFor="dg-industry" className="form__label">
                業種<span className="form__req">必須</span>
              </label>
              <input type="text" maxLength={50} placeholder="例）建設業、美容室、飲食店" {...field('industry')} />
              <Err k="industry" />
            </div>
          </div>
          <div className="form__2col">
            <div className="form__row">
              <label htmlFor="dg-name" className="form__label">
                お名前<span className="form__req">必須</span>
              </label>
              <input type="text" autoComplete="name" maxLength={50} placeholder="例）山田 太郎" {...field('name')} />
              <Err k="name" />
            </div>
            <div className="form__row">
              <label htmlFor="dg-email" className="form__label">
                メールアドレス<span className="form__req">必須</span>
              </label>
              <input type="email" autoComplete="email" inputMode="email" maxLength={254} placeholder="例）info@example.com" {...field('email')} />
              <Err k="email" />
            </div>
          </div>
          <div className="form__2col">
            <div className="form__row">
              <label htmlFor="dg-tel" className="form__label">
                電話番号<span className="form__opt">任意</span>
              </label>
              <input type="tel" autoComplete="tel" inputMode="tel" maxLength={20} placeholder="例）080-0000-0000" {...field('tel')} />
              <Err k="tel" />
            </div>
            <div className="form__row">
              <label htmlFor="dg-siteUrl" className="form__label">
                現在のサイトURL<span className="form__opt">任意</span>
              </label>
              <input type="url" inputMode="url" autoComplete="url" maxLength={300} placeholder="例）https://example.com" {...field('siteUrl')} />
              <Err k="siteUrl" />
            </div>
          </div>
          <div className="form__row">
            <label htmlFor="dg-reference" className="form__label">
              ご希望・参考サイト<span className="form__opt">任意</span>
            </label>
            <textarea
              rows={4}
              maxLength={1000}
              placeholder="例）明るく親しみやすい雰囲気にしたい／参考：https://〜 のような写真を大きく使ったデザイン など"
              {...field('reference')}
            />
            <Err k="reference" />
          </div>

          <ProposalNotes />
          <PrivacyPurpose />

          <div className="form__hp" aria-hidden="true">
            <label>
              この項目は入力しないでください
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" value={gotcha} onChange={(e) => setGotcha(e.target.value)} />
            </label>
          </div>
          <div className="form__row form__agree">
            <label className="checkbox">
              <input
                id="dg-agree"
                type="checkbox"
                checked={agree}
                onChange={(e) => {
                  setAgree(e.target.checked);
                  if (errors.agree) setErrors((er) => ({ ...er, agree: undefined }));
                }}
                data-field="agree"
                aria-invalid={errors.agree ? true : undefined}
                aria-describedby={errors.agree ? 'dg-agree-err' : undefined}
              />
              <span>
                上記の利用目的とプライバシーポリシーに同意する<span className="form__req">必須</span>
              </span>
            </label>
            <Err k="agree" />
          </div>
        </div>
        <div className="dg-actions">
          <button type="button" className="btn btn--primary btn--lg" onClick={goConfirm}>
            入力内容を確認する
            <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>
    );
  } else if (stage === 'confirm') {
    const rows = [
      ['会社名', form.company],
      ['業種', form.industry],
      ['お名前', form.name],
      ['メールアドレス', form.email],
      ['電話番号', form.tel || '（未入力）'],
      ['現在のサイトURL', form.siteUrl || '（未入力）'],
      ['ご希望・参考サイト', form.reference || '（未入力）'],
    ];
    body = (
      <div className="dg-confirm">
        <h2 className="dg-panel-title" tabIndex={-1} data-autofocus>
          送信内容の確認
        </h2>
        <h3 className="dg-block__title">診断の回答</h3>
        <dl className="co-dl">
          {questions.map((q) => (
            <div key={q.id}>
              <dt>{q.title}</dt>
              <dd>{answerLabel(q.id, answers[q.id])}</dd>
            </div>
          ))}
          <div>
            <dt>おすすめ</dt>
            <dd>{result?.title}</dd>
          </div>
        </dl>
        <h3 className="dg-block__title">お客様の情報</h3>
        <dl className="co-dl">
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd className="dg-pre">{v}</dd>
            </div>
          ))}
        </dl>
        <ProposalNotes />
        <PrivacyPurpose />
        <p className="dg-agreed">
          <Icon name="check" size={18} strokeWidth={2} />
          個人情報の利用目的・プライバシーポリシーに同意済み
        </p>

        {status === 'error' && (
          <p className="form__alert" role="alert">
            送信に失敗しました。入力内容は残っていますので、通信状況をご確認のうえ、もう一度「この内容で申し込む」を押してください。解決しない場合は、お電話（
            <a href={telHref()}>{site.tel}</a>）またはLINEでご連絡ください。
          </p>
        )}
        {!ENDPOINT && <p className="form-test-note">※ 現在テストモードです。送信してもメールは届きません。</p>}
        <div className="dg-actions">
          <button type="button" className="btn btn--primary btn--lg" onClick={submit} disabled={status === 'sending'} aria-busy={status === 'sending'}>
            {status === 'sending' ? '送信中…' : 'この内容で申し込む'}
            {status !== 'sending' && <Icon name="arrow" size={18} />}
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {status === 'sending' ? '送信中です' : ''}
        </p>
      </div>
    );
  } else if (stage === 'done' && doneInfo) {
    body = (
      <div className="form-done dg-done" role="status">
        <span className="form-done__icon">
          <Icon name="check" size={36} strokeWidth={2} />
        </span>
        <h2 tabIndex={-1} data-autofocus>
          お申し込みを受け付けました
        </h2>
        <p className="co-done__id">
          受付番号：<b>{doneInfo.id}</b>
        </p>
        <p>
          診断の回答とご希望の内容を確認のうえ、SmileWiseからメール
          {form.tel ? 'またはお電話' : ''}
          でご連絡します。
          <br />
          お申し込みによって、ご契約やお支払いが発生することはありません。
        </p>
        {doneInfo.test && <p className="form-test-note">※ 現在テストモードのため、実際には送信されていません（送信内容はブラウザのコンソールに表示されています）。</p>}
        <p className="co-done__help">
          数日たっても連絡がない場合は、お手数ですがお電話（<a href={telHref()}>{site.tel}</a>）またはLINEでお問い合わせください。
        </p>
        <div className="form-done__actions">
          <Link to="/" className="btn btn--outline">
            トップページへ戻る
          </Link>
          <Link to="/nikoniko" className="btn btn--ghost">
            ニコニコプランを見る
          </Link>
        </div>
      </div>
    );
  }

  const canBack = (stage === 'q' && qi > 0) || ['result', 'form'].includes(stage) || (stage === 'confirm' && status !== 'sending');

  return (
    <div className="dg" ref={rootRef}>
      <div className="dg-bar">
        <ol className="dg-flow" aria-label="お申し込みまでの流れ">
          {flow.map((f, i) => (
            <li key={f} className={i === flowIndex ? 'is-on' : i < flowIndex ? 'is-done' : ''} aria-current={i === flowIndex ? 'step' : undefined}>
              {f}
            </li>
          ))}
        </ol>
        {stage === 'q' && (
          <div
            className="dg-progress"
            role="progressbar"
            aria-label="診断の進み具合"
            aria-valuemin={0}
            aria-valuemax={questions.length}
            aria-valuenow={Math.round(progress * questions.length)}
            aria-valuetext={`${questions.length}問中${answeredCount}問回答済み`}
          >
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
        )}
      </div>

      <div className="dg-card">
        {canBack && (
          <button type="button" className="dg-back" onClick={back}>
            <Icon name="arrow" size={16} />
            戻る
          </button>
        )}
        <div key={`${stage}-${qi}`} className={`dg-pane dg-pane--${dir}`}>
          {body}
        </div>
      </div>
    </div>
  );
}
