import { useState, useEffect } from 'react';
import api from '../utils/services/api';
import { heatmapMetrics } from '../utils/constants/heatmapMetricsConstant';

const useHeatmapData = (userIdentityConstant) => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Now directly expose setError
  const [apiResponseMessage, setApiResponseMessage] = useState('');
  const [metricRanges, setMetricRanges] = useState({});

  const metricsToSend = heatmapMetrics.map((metric) => metric.value);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Clear error on new fetch attempt
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

        if (response.data && response.data.message) {
          setApiResponseMessage(response.data.message);
        }

        if (response.data && Array.isArray(response.data.result)) {
          const sortedData = [...response.data.result].sort(
            (a, b) => a.weekNumber - b.weekNumber,
          );
          setHeatmapData(sortedData);
        } else {
          setHeatmapData([]);
          setError(
            response.data.message ||
              'API returned an unexpected data format or no "result" array for heatmap.',
          );
        }
      } catch (err) {
        if (err.response) {
          setError(
            err.response.data.message ||
              'Failed to fetch heatmap data from the server.',
          );
          console.error(
            'useHeatmapData Hook - API Error Response:',
            err.response.data,
          );
        } else if (err.request) {
          setError('Network error: No response received for heatmap data.');
          console.error(
            'useHeatmapData Hook - Network Request Error:',
            err.request,
          );
        } else {
          setError(
            'An unexpected error occurred while setting up the heatmap data request.',
          );
          console.error(
            'useHeatmapData Hook - Request Setup Error:',
            err.message,
          );
        }
        setHeatmapData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userIdentityConstant]);

  useEffect(() => {
    const newMetricRanges = {};

    heatmapMetrics.forEach((metric) => {
      let currentMin = Infinity;
      let currentMax = -Infinity;

      heatmapData.forEach((day) => {
        day.Hourly_Data.forEach((hour) => {
          const value = hour[metric.value];
          if (typeof value === 'number' && !isNaN(value)) {
            currentMin = Math.min(currentMin, value);
            currentMax = Math.max(currentMax, value);
          }
        });
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
  }, [heatmapData]);

  // Return setError as well, so the component can clear the error state
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
