import Icon from './Icon.jsx';

/**
 * 業務管理システムの画面イメージ（HTML/CSSで描画したサンプル）。
 * 表示している数値・名称はすべて説明用のサンプルです。
 */

const projects = [
  { name: 'サンプル工事 A', client: 'サンプル商事', status: '施工中', progress: 65, tone: 'run' },
  { name: 'サンプル工事 B', client: 'サンプル工業', status: '見積提出', progress: 15, tone: 'wait' },
  { name: 'サンプル案件 C', client: 'サンプル建設', status: '請求済', progress: 100, tone: 'done' },
  { name: 'サンプル案件 D', client: 'サンプル製作所', status: '施工中', progress: 40, tone: 'run' },
];

const menu = [
  { icon: 'system', label: 'ダッシュボード', active: true },
  { icon: 'invoice', label: '見積・請求' },
  { icon: 'client', label: '顧客・取引先' },
  { icon: 'progress', label: '案件・工事' },
  { icon: 'yen', label: '売上・入金' },
];

const bars = [42, 58, 50, 66, 61, 78];

export function DesktopMockup() {
  return (
    <div className="mock-pc" role="img" aria-label="パソコンで表示した業務管理システムのダッシュボード画面イメージ">
      <div className="mock-pc__screen">
        <div className="mock-pc__chrome" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>業務管理システム（画面イメージ）</span>
        </div>
        <div className="mock-app" aria-hidden="true">
          <aside className="mock-app__side">
            <div className="mock-app__brand">業務管理</div>
            {menu.map((m) => (
              <div key={m.label} className={`mock-app__menu${m.active ? ' is-active' : ''}`}>
                <Icon name={m.icon} size={13} />
                <span>{m.label}</span>
              </div>
            ))}
          </aside>
          <div className="mock-app__main">
            <div className="mock-app__head">
              <strong>ダッシュボード</strong>
              <span className="mock-app__search">案件・顧客を検索</span>
            </div>
            <div className="mock-app__kpis">
              <div className="mock-kpi">
                <span>今月の売上</span>
                <strong>
                  3,240<small>千円</small>
                </strong>
              </div>
              <div className="mock-kpi">
                <span>進行中の案件</span>
                <strong>
                  12<small>件</small>
                </strong>
              </div>
              <div className="mock-kpi mock-kpi--alert">
                <span>未入金の請求</span>
                <strong>
                  3<small>件</small>
                </strong>
              </div>
            </div>
            <div className="mock-app__grid">
              <div className="mock-card">
                <p className="mock-card__title">案件・工事の進捗</p>
                <table className="mock-table">
                  <tbody>
                    {projects.map((p) => (
                      <tr key={p.name}>
                        <td>
                          <b>{p.name}</b>
                          <span>{p.client}</span>
                        </td>
                        <td>
                          <em className={`mock-pill mock-pill--${p.tone}`}>{p.status}</em>
                        </td>
                        <td className="mock-table__bar">
                          <i style={{ width: `${p.progress}%` }} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mock-card">
                <p className="mock-card__title">月別売上</p>
                <div className="mock-chart">
                  {bars.map((h, i) => (
                    <i key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mock-pc__stand" aria-hidden="true" />
    </div>
  );
}

export function PhoneMockup() {
  return (
    <div className="mock-phone" role="img" aria-label="スマートフォンで表示した案件進捗画面のイメージ">
      <div className="mock-phone__screen" aria-hidden="true">
        <div className="mock-phone__notch" />
        <div className="mock-phone__head">
          <span>案件・工事</span>
          <b>進捗一覧</b>
        </div>
        <div className="mock-phone__list">
          {projects.slice(0, 3).map((p) => (
            <div key={p.name} className="mock-phone__item">
              <div>
                <b>{p.name}</b>
                <em className={`mock-pill mock-pill--${p.tone}`}>{p.status}</em>
              </div>
              <div className="mock-table__bar">
                <i style={{ width: `${p.progress}%` }} />
              </div>
              <span>{p.progress}% 完了</span>
            </div>
          ))}
        </div>
        <div className="mock-phone__btn">＋ 状況を報告する</div>
        <div className="mock-phone__tab">
          {menu.slice(0, 4).map((m) => (
            <Icon key={m.label} name={m.icon} size={14} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SystemMockup({ compact = false }) {
  return (
    <figure className={`mockup${compact ? ' mockup--compact' : ''}`}>
      <div className="mockup__devices">
        <DesktopMockup />
        <PhoneMockup />
      </div>
      <figcaption className="mockup__caption">
        ※ 画面はイメージです。表示内容はすべてサンプルで、実際の機能・画面構成はご要望に合わせて設計します。
      </figcaption>
    </figure>
  );
}
