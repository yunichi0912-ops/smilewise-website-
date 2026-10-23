/**
 * 名刺注文フォームの料金・選択肢（すべて税込）
 * 料金を変更するときは、このファイルだけを書き換えてください。
 * ※ 表示する金額は注文時点の概算です。追加制作費・送料などは SmileWise から別途ご案内します。
 */

export const paperTypes = [
  { value: 'premium', label: '極上紙' },
  { value: 'standard', label: '普通紙' },
];

export const quantities = [50, 100, 200, 300, 500];

/** 紙質 × 枚数 の料金表（税込・円） */
export const cardPrices = {
  premium: { 50: 3500, 100: 4000, 200: 8000, 300: 12000, 500: 20000 },
  standard: { 50: 2500, 100: 2000, 200: 4000, 300: 6000, 500: 10000 },
};

export const orderTypes = [
  { value: 'new', label: '新規注文' },
  { value: 'reprint', label: '増刷注文' },
];

export const designChanges = [
  { value: 'no', label: 'なし' },
  { value: 'yes', label: 'あり' },
];

export const labelOf = (list, value) => list.find((i) => i.value === value)?.label ?? '';

/** 1人分の概算料金（紙質・枚数が未選択なら null） */
export const priceOf = (card) => cardPrices[card.paper]?.[card.quantity] ?? null;

export const cardOrderNotes = [
  '表示金額は注文時点の概算（税込）です。',
  'デザイン変更や追加制作が必要な場合の費用、送料などが発生する場合は、SmileWiseから別途ご案内します。',
  'フォームでのお支払い（クレジットカード決済）はありません。注文確認後にお支払い方法をご案内します。',
];
