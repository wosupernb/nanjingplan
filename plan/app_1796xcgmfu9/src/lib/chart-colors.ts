// EXPORTS: CHART_COLORS, CHART_COLORS_LIGHT

/** 静谧奢雅 — slate-900 / blue-600 / slate-500 / lime-400 / blue-400 5 色 hex 数组 */
export const CHART_COLORS = [
  '#0F172A', // slate-900
  '#2563EB', // blue-600
  '#64748B', // slate-500
  '#A3E635', // lime-400
  '#60A5FA', // blue-400
] as const;

/** 半透明版本，用于 area / background 等 */
export const CHART_COLORS_LIGHT = [
  'rgba(15_23_42_/_0.20)',
  'rgba(37_99_235_/_0.20)',
  'rgba(100_116_139_/_0.20)',
  'rgba(163_230_53_/_0.20)',
  'rgba(96_165_250_/_0.20)',
] as const;
