import api from './api';

export const fetchHeatmapData = async ({ userIdentityConstant, metrics }) => {
  try {
    const response = await api.post(
      '/day-parting/heatmap-list',
      {
        startDate: '2024-06-08',
        endDate: '2024-07-07',
        metrics,
      },
      {
        headers: {
          'X-USER-IDENTITY': userIdentityConstant,
        },
      },
    );

    if (Array.isArray(response.data?.result)) {
      return {
        data: response.data.result,
        message: response.data.message || '',
      };
    }

    throw new Error(
      response.data?.message || 'Invalid data received from heatmap API.',
    );
  } catch (err) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    } else if (err.request) {
      throw new Error('Network error: No response from heatmap server.');
    } else {
      throw new Error(
        err.message || 'Unexpected error occurred while fetching heatmap data.',
      );
    }
  }
};
