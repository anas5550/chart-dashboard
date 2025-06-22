import api from './../services/api';

export const fetchMetricsList = async (userIdentityConstant, signal) => {
  try {
    const response = await api.post(
      '/day-parting/DayPartingFilterList',
      { type: 'customizeMetrics' },
      {
        headers: { 'X-USER-IDENTITY': userIdentityConstant },
        signal,
      },
    );

    const data = response?.data?.result;

    if (!Array.isArray(data)) {
      throw new Error('Unexpected data format: metrics list missing');
    }

    return data;
  } catch (error) {
    if (error.name === 'CanceledError' || error.name === 'AbortError') {
      throw new Error('Request was cancelled');
    }
    throw error;
  }
};
