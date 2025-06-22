import { PERCENTAGE_METRICS } from './constants/chartConstants';

export const isPercentageMetric = (metric) =>
  PERCENTAGE_METRICS.some((key) => metric.toLowerCase().includes(key));

export const formatTooltipLabel = (ctx) => {
  const value = ctx.raw;
  const label = ctx.dataset.label;

  if (isPercentageMetric(label)) return `${label}: ${value.toFixed(2)}%`;
  if (value > 100) return `${label}: ₹${value.toLocaleString()}`;
  return `${label}: ${value}`;
};
