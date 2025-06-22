export const heatmapMetrics = [
  { value: 'Spend', label: 'Spend' },
  { value: 'Revenue', label: 'Revenue' },
  { value: 'Orders', label: 'Orders' },
  { value: 'CPC', label: 'CPC' },
  { value: 'CPM', label: 'CPM' },
  { value: 'CPO', label: 'CPO' },
  { value: 'ACOS', label: 'ACOS' },
  { value: 'CPA', label: 'CPA' },
  { value: 'ROAS', label: 'ROAS' },
  { value: 'Impressions', label: 'Impressions' },
  { value: 'Clicks', label: 'Clicks' },
];

export const reverseMetrics = ['CPC', 'CPM', 'CPO', 'ACOS', 'CPA'];

export const metricLabelMap = heatmapMetrics.reduce((acc, metric) => {
  acc[metric.value] = metric.label.replace('_perc', '%');
  return acc;
}, {});
