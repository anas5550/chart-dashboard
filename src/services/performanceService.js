import api from './api';

export const fetchPerformanceData = async (metrics, userIdentity) => {
  try {
    const response = await api.post(
      '/day-parting/DayPartingPerformanceGraphList',
      {
        startDate: '2024-06-08',
        endDate: '2024-07-07',
        metrics,
      },
      {
        headers: {
          'X-USER-IDENTITY': userIdentity,
        },
      },
    );

    const message = response.data?.message || '';

    const { categories, series } = response.data?.result || {};

    if (!Array.isArray(categories) || !Array.isArray(series)) {
      throw (
        response.data?.message ||
        'API returned an unexpected structure. Expected arrays in "result".'
      );
    }

    const chartData = categories.map((category, index) => {
      const row = { date: category };
      series.forEach((s) => {
        if (metrics.includes(s.name) && Array.isArray(s.data)) {
          row[s.name] = s.data[index];
        }
      });
      return row;
    });

    return { chartData, message };
  } catch (err) {
    if (err.response?.data) {
      throw (
        err.response.data.message ||
        'Failed to fetch performance data from server.'
      );
    } else if (err.request) {
      throw 'Network error: No response received for performance data.';
    } else {
      throw 'Unexpected error while requesting performance data.';
    }
  }
};
