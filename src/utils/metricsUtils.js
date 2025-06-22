export const calculateMetricRanges = (heatmapData, metricsToSend) => {
  const newMetricRanges = {};

  metricsToSend.forEach((metric) => {
    let min = Infinity;
    let max = -Infinity;

    heatmapData.forEach((day) => {
      if (Array.isArray(day.Hourly_Data)) {
        day.Hourly_Data.forEach((hour) => {
          const value = hour[metric];
          if (typeof value === 'number' && !isNaN(value)) {
            min = Math.min(min, value);
            max = Math.max(max, value);
          }
        });
      }

      const total = day[`Total_${metric}`];
      if (typeof total === 'number' && !isNaN(total)) {
        min = Math.min(min, total);
        max = Math.max(max, total);
      }
    });

    newMetricRanges[metric] = {
      min: min === Infinity ? 0 : min,
      max: max === -Infinity ? 0 : max,
    };
  });

  return newMetricRanges;
};
