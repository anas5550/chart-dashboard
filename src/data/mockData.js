export const metricOptions = ['Sales', 'Revenue', 'Growth', 'Clicks'];

export const sineWaveChartData = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  const angle = (hour / 24) * 2 * Math.PI; // Normalize hour to 0-2PI for sine wave

  // Sine wave for Sales, peaking around 12-14 hours (midday/early afternoon)
  const sales = Math.round(15000 + 10000 * Math.sin(angle - Math.PI / 2)); // Shift phase to start high, dip, then peak
  // Ensure sales don't go below zero
  const finalSales = Math.max(0, sales);

  // Cosine wave for Revenue, slightly offset from sales, maybe peaking earlier or later
  const revenue = Math.round(12000 + 8000 * Math.cos(angle - Math.PI / 4)); // Shift phase
  const finalRevenue = Math.max(0, revenue);

  // More fluctuating data for Clicks
  const clicks = Math.round(50 + 40 * Math.random() - 20 * Math.sin(angle * 2));
  const finalClicks = Math.max(10, clicks); // Ensure clicks don't go too low

  return {
    hour: `${hour}Hr`,
    Sales: finalSales,
    Revenue: finalRevenue,
    Clicks: finalClicks,
  };
});
export const heatMapData = [
  { day: 'Sunday', hour: 0, metric: 'Impressions', value: 120 },
  { day: 'Sunday', hour: 0, metric: 'Clicks', value: 30 },
  { day: 'Sunday', hour: 0, metric: 'CPM', value: '₹6' },

  { day: 'Sunday', hour: 1, metric: 'Impressions', value: 95 },
  { day: 'Sunday', hour: 1, metric: 'Clicks', value: 22 },
  { day: 'Sunday', hour: 1, metric: 'CPM', value: '4₹' },

  { day: 'Monday', hour: 0, metric: 'Impressions', value: 130 },
  { day: 'Monday', hour: 0, metric: 'Clicks', value: 28 },
  { day: 'Monday', hour: 0, metric: 'CPM', value: '7₹' },

  { day: 'Monday', hour: 1, metric: 'Impressions', value: 140 },
  { day: 'Monday', hour: 1, metric: 'Clicks', value: 32 },
  { day: 'Monday', hour: 1, metric: 'CPM', value: '5₹' },

  { day: 'Tuesday', hour: 0, metric: 'Impressions', value: 110 },
  { day: 'Tuesday', hour: 0, metric: 'Clicks', value: 20 },
  { day: 'Tuesday', hour: 0, metric: 'CPM', value: '3₹' },

  { day: 'Tuesday', hour: 1, metric: 'Impressions', value: 60 },
  { day: 'Tuesday', hour: 1, metric: 'Clicks', value: 15 },
  { day: 'Tuesday', hour: 1, metric: 'CPM', value: '4₹' },

  { day: 'Wednesday', hour: 0, metric: 'Impressions', value: 100 },
  { day: 'Wednesday', hour: 0, metric: 'Clicks', value: 25 },
  { day: 'Wednesday', hour: 0, metric: 'CPM', value: '6₹' },

  { day: 'Wednesday', hour: 1, metric: 'Impressions', value: 115 },
  { day: 'Wednesday', hour: 1, metric: 'Clicks', value: 27 },
  { day: 'Wednesday', hour: 1, metric: 'CPM', value: '5₹' },

  { day: 'Thursday', hour: 0, metric: 'Impressions', value: 90 },
  { day: 'Thursday', hour: 0, metric: 'Clicks', value: 18 },
  { day: 'Thursday', hour: 0, metric: 'CPM', value: '3₹' },

  { day: 'Thursday', hour: 1, metric: 'Impressions', value: 80 },
  { day: 'Thursday', hour: 1, metric: 'Clicks', value: 21 },
  { day: 'Thursday', hour: 1, metric: 'CPM', value: '4₹' },

  { day: 'Friday', hour: 0, metric: 'Impressions', value: 150 },
  { day: 'Friday', hour: 0, metric: 'Clicks', value: 40 },
  { day: 'Friday', hour: 0, metric: 'CPM', value: '7₹' },

  { day: 'Friday', hour: 1, metric: 'Impressions', value: 135 },
  { day: 'Friday', hour: 1, metric: 'Clicks', value: 38 },
  { day: 'Friday', hour: 1, metric: 'CPM', value: '6₹' },

  { day: 'Saturday', hour: 0, metric: 'Impressions', value: 125 },
  { day: 'Saturday', hour: 0, metric: 'Clicks', value: 26 },
  { day: 'Saturday', hour: 0, metric: 'CPM', value: '5₹' },

  { day: 'Saturday', hour: 1, metric: 'Impressions', value: 110 },
  { day: 'Saturday', hour: 1, metric: 'Clicks', value: 22 },
  { day: 'Saturday', hour: 1, metric: 'CPM', value: '4₹' },

  { day: 'Sunday', hour: 2, metric: 'Impressions', value: 98 },
  { day: 'Sunday', hour: 2, metric: 'Clicks', value: 24 },
  { day: 'Sunday', hour: 2, metric: 'CPM', value: '5₹' },

  { day: 'Monday', hour: 2, metric: 'Impressions', value: 102 },
  { day: 'Monday', hour: 2, metric: 'Clicks', value: 27 },
  { day: 'Monday', hour: 2, metric: 'CPM', value: '6₹' },

  { day: 'Tuesday', hour: 2, metric: 'Impressions', value: 89 },
  { day: 'Tuesday', hour: 2, metric: 'Clicks', value: 17 },
  { day: 'Tuesday', hour: 2, metric: 'CPM', value: '4₹' },

  { day: 'Wednesday', hour: 2, metric: 'Impressions', value: 111 },
  { day: 'Wednesday', hour: 2, metric: 'Clicks', value: 31 },
  { day: 'Wednesday', hour: 2, metric: 'CPM', value: '7₹' },

  { day: 'Thursday', hour: 2, metric: 'Impressions', value: 77 },
  { day: 'Thursday', hour: 2, metric: 'Clicks', value: 19 },
  { day: 'Thursday', hour: 2, metric: 'CPM', value: '3₹' },

  { day: 'Friday', hour: 2, metric: 'Impressions', value: 140 },
  { day: 'Friday', hour: 2, metric: 'Clicks', value: 35 },
  { day: 'Friday', hour: 2, metric: 'CPM', value: '6₹' },

  { day: 'Saturday', hour: 2, metric: 'Impressions', value: 120 },
  { day: 'Saturday', hour: 2, metric: 'Clicks', value: 30 },
  { day: 'Saturday', hour: 2, metric: 'CPM', value: '5₹' },
];
