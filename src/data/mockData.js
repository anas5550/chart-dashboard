export const metricOptions = ['Sales', 'Revenue', 'Growth', 'Clicks'];

export const chartData = [
  {
    name: 'Sales',
    data: [100, 200, 300, 400, 500],
  },
  {
    name: 'Revenue',
    data: [150, 250, 350, 450, 550],
  },
  {
    name: 'Clicks',
    data: [10, 20, 30, 40, 50],
  },
];

export const heatMapData = [
  { day: 'Monday', hour: 0, metric: 'Impressions', value: 50 },
  { day: 'Monday', hour: 0, metric: 'Clicks', value: 10 },
  { day: 'Monday', hour: 0, metric: 'CPM', value: 5 },

  { day: 'Tuesday', hour: 1, metric: 'Impressions', value: 60 },
  { day: 'Tuesday', hour: 1, metric: 'Clicks', value: 15 },
  { day: 'Tuesday', hour: 1, metric: 'CPM', value: 4 },

  // Add more data for other days and hours...
];
