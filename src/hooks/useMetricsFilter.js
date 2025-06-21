import { useState, useEffect } from 'react';
import api from './../utils/services/api';

const useMetricsFilter = (userIdentityConstant) => {
  const [metricsList, setMetricsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.post(
          '/day-parting/DayPartingFilterList',
          { type: 'customizeMetrics' },
          {
            headers: { 'X-USER-IDENTITY': userIdentityConstant },
          },
        );

        if (response.data && Array.isArray(response.data.result)) {
          setMetricsList(response.data.result);
        } else {
          setMetricsList([]);
          setError(
            'API returned an unexpected data format or no "result" array.',
          );
        }
      } catch (err) {
        if (err.response) {
          setError(
            err.response.data.message || 'Failed to fetch metrics list.',
          );
          console.error('useMetricsFilter - API Error:', err.response.data);
        } else if (err.request) {
          setError('Network error: No response from server for metrics list.');
          console.error('useMetricsFilter - Network Error:', err.request);
        } else {
          setError('An unexpected error occurred fetching metrics.');
          console.error('useMetricsFilter - Request Setup Error:', err.message);
        }
        setMetricsList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [userIdentityConstant]);

  return { metricsList, loading, error };
};

export default useMetricsFilter;
