import { useState, useEffect } from 'react';
import api from '../utils/services/api';
import { heatmapMetrics } from '../utils/constants/heatmapMetricsConstant';

const useHeatmapData = (userIdentityConstant) => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiResponseMessage, setApiResponseMessage] = useState('');
  const [metricRanges, setMetricRanges] = useState({});

  const metricsToSend = heatmapMetrics.map((metric) => metric.value);

  // Fetch heatmap data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setApiResponseMessage('');
      setHeatmapData([]);

      try {
        const response = await api.post(
          '/day-parting/heatmap-list',
          {
            startDate: '2024-06-08',
            endDate: '2024-07-07',
            metrics: metricsToSend,
          },
          {
            headers: {
              'X-USER-IDENTITY': userIdentityConstant,
            },
          },
        );

        if (response.data?.message) {
          setApiResponseMessage(response.data.message);
        }

        if (Array.isArray(response.data?.result)) {
          const sortedData = [...response.data.result].sort(
            (a, b) => a.weekNumber - b.weekNumber,
          );
          setHeatmapData(sortedData);
        } else {
          setHeatmapData([]);
          setError(
            response.data?.message ||
              'API returned an unexpected data format or missing "result" array.',
          );
        }
      } catch (err) {
        if (err.response) {
          setError(
            err.response.data?.message ||
              'Failed to fetch heatmap data from the server.',
          );
          console.error('API Error Response:', err.response.data);
        } else if (err.request) {
          setError('Network error: No response received for heatmap data.');
          console.error('Network Request Error:', err.request);
        } else {
          setError(
            'An unexpected error occurred while setting up the heatmap data request.',
          );
          console.error('Request Setup Error:', err.message);
        }
        setHeatmapData([]);
      } finally {
        setLoading(false);
      }
    };

    if (userIdentityConstant) {
      fetchData();
    }
  }, [userIdentityConstant]);

  // Compute min/max for each metric for color scaling
  useEffect(() => {
    if (loading || heatmapData.length === 0) return;

    const newMetricRanges = {};

    heatmapMetrics.forEach((metric) => {
      let currentMin = Infinity;
      let currentMax = -Infinity;

      heatmapData.forEach((day) => {
        if (Array.isArray(day.Hourly_Data)) {
          day.Hourly_Data.forEach((hour) => {
            const value = hour[metric.value];
            if (typeof value === 'number' && !isNaN(value)) {
              currentMin = Math.min(currentMin, value);
              currentMax = Math.max(currentMax, value);
            }
          });
        }

        const totalValue = day[`Total_${metric.value}`];
        if (typeof totalValue === 'number' && !isNaN(totalValue)) {
          currentMin = Math.min(currentMin, totalValue);
          currentMax = Math.max(currentMax, totalValue);
        }
      });

      newMetricRanges[metric.value] = {
        min: currentMin === Infinity ? 0 : currentMin,
        max: currentMax === -Infinity ? 0 : currentMax,
      };
    });

    setMetricRanges(newMetricRanges);
  }, [heatmapData, loading]);

  return {
    heatmapData,
    loading,
    error,
    setError,
    apiResponseMessage,
    metricRanges,
  };
};

export default useHeatmapData;
