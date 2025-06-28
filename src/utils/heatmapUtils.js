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

//  Return cell background color based on value and metric.
export const getCellColor = (value, metric, metricRanges) => {
  const range = metricRanges[metric];
  if (!range || value == null || isNaN(value)) return '#f0f0f0';
  if (range.min === range.max) return '#d0d0d0';

  const normalized = (value - range.min) / (range.max - range.min);
  const isReversed = reverseMetrics.includes(metric);
  const t = isReversed ? 1 - normalized : normalized;

  // Extracted from Figma (sorted from light to strong gradient visually)
  const colorStops = [
    { stop: 0.0, color: [243, 235, 255] }, // #F3EBFF
    { stop: 0.1, color: [235, 225, 255] }, // #EBE1FF
    { stop: 0.2, color: [226, 217, 250] }, // #E2D9FA
    { stop: 0.3, color: [231, 212, 248] }, // #E7D4F8
    { stop: 0.4, color: [255, 217, 243] }, // #FFD9F3
    { stop: 0.5, color: [255, 191, 235] }, // #FFBFEB
    { stop: 0.6, color: [255, 185, 235] }, // #FFB9EB
    { stop: 0.7, color: [144, 222, 243] }, // #90DEF3
    { stop: 0.85, color: [113, 213, 240] }, // #71D5F0
    { stop: 1.0, color: [22, 171, 212] }, // #16ABD4
  ];

  const interpolateColor = (t) => {
    let start = colorStops[0];
    let end = colorStops[colorStops.length - 1];
    for (let i = 0; i < colorStops.length - 1; i++) {
      if (t >= colorStops[i].stop && t <= colorStops[i + 1].stop) {
        start = colorStops[i];
        end = colorStops[i + 1];
        break;
      }
    }

    const localT = (t - start.stop) / (end.stop - start.stop);
    const r = Math.round(
      start.color[0] + localT * (end.color[0] - start.color[0]),
    );
    const g = Math.round(
      start.color[1] + localT * (end.color[1] - start.color[1]),
    );
    const b = Math.round(
      start.color[2] + localT * (end.color[2] - start.color[2]),
    );

    return `rgb(${r}, ${g}, ${b})`;
  };

  return interpolateColor(t);
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
  return luminance > 150 ? '#5932EA' : 'white';
};
