import { reverseMetrics } from '../utils/constants/heatmapMetricsConstant';

/**
 * Format 24-hour string like "14:00:00" to "2pm", "00:00:00" to "12am", etc.
 */
export const formatHour = (hourString) => {
  const hour = parseInt(hourString.slice(0, 2), 10);
  if (hour === 0) return '12am';
  if (hour === 12) return '12pm';
  return hour < 12 ? `${hour}am` : `${hour - 12}pm`;
};

/**
 * Return cell background color based on value and metric.
 */
export const getCellColor = (value, metric, metricRanges) => {
  const range = metricRanges[metric];
  if (!range || value == null || isNaN(value)) return 'rgb(240,240,240)';
  if (range.min === range.max) return 'rgb(200,200,200)';

  const normalized = (value - range.min) / (range.max - range.min);
  const isReversed = reverseMetrics.includes(metric);
  const factor = isReversed ? 1 - normalized : normalized;

  const r = Math.round(255 * (1 - factor));
  const g = Math.round(255 * (1 - factor));
  const b = Math.round(100 + 100 * factor);

  return `rgb(${r},${g},${b})`;
};

/**
 * Return text color based on background color for readability.
 */
export const getTextColor = (backgroundColor) => {
  const match = backgroundColor.match(/\d+/g);
  if (!match) return 'black';
  const [r, g, b] = match.map(Number);

  // Luminance formula
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 150 ? 'black' : 'white';
};
