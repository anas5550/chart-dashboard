import { useState, useEffect } from 'react';
import { fetchMetricsList } from '../services/metricsService';

const useMetricsFilter = (userIdentityConstant) => {
  const [metricsList, setMetricsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userIdentityConstant) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchMetricsList(userIdentityConstant, signal);
        setMetricsList(data);
      } catch (err) {
        if (err.message !== 'Request was cancelled') {
          setError(err.message || 'Failed to fetch metrics list');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort(); // Abort on unmount or re-call
    };
  }, [userIdentityConstant]);

  return {
    metricsList,
    loading,
    error,
  };
};

export default useMetricsFilter;
