import { useState, useEffect } from 'react';
import api from '../services/api';

const usePerformanceMetrics = (selectedMetrics, userIdentityConstant) => {
  const [chartDataArray, setChartDataArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiResponseMessage, setApiResponseMessage] = useState('');

  useEffect(() => {
    const fetchMetricsData = async () => {
      setLoading(true);
      setError(null);
      setApiResponseMessage('');
      setChartDataArray([]);

      if (!selectedMetrics || selectedMetrics.length === 0) {
        setLoading(false);
        setError('No metrics selected for the chart.');
        return;
      }

      try {
        const response = await api.post(
          '/day-parting/DayPartingPerformanceGraphList',
          {
            startDate: '2024-06-08',
            endDate: '2024-07-07',
            metrics: selectedMetrics,
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

        if (
          response.data &&
          response.data.result &&
          Array.isArray(response.data.result.categories) &&
          Array.isArray(response.data.result.series)
        ) {
          const { categories, series } = response.data.result;

          if (categories.length > 0 && series.length > 0) {
            const transformedData = categories.map((category, index) => {
              const dataPoint = { date: category };
              series.forEach((s) => {
                if (
                  selectedMetrics.includes(s.name) &&
                  s.data &&
                  s.data.length > index
                ) {
                  dataPoint[s.name] = s.data[index];
                }
              });
              return dataPoint;
            });
            setChartDataArray(transformedData);
          } else {
            setChartDataArray([]);
            setError(
              'API returned no chart data points for the selected period/metrics.',
            );
          }
        } else {
          setChartDataArray([]);
          setError(
            response.data.message ||
              'API returned an unexpected data structure. Expected "result" with "categories" and "series".',
          );
        }
      } catch (err) {
        if (err.response) {
          setError(
            err.response.data.message ||
              'Failed to fetch performance data from the server.',
          );
          console.error(
            'usePerformanceMetrics Hook - API Error Response:',
            err.response.data,
          );
        } else if (err.request) {
          setError('Network error: No response received for performance data.');
          console.error(
            'usePerformanceMetrics Hook - Network Request Error:',
            err.request,
          );
        } else {
          setError(
            'An unexpected error occurred while setting up the performance data request.',
          );
          console.error(
            'usePerformanceMetrics Hook - Request Setup Error:',
            err.message,
          );
        }
        setChartDataArray([]);
      } finally {
        setLoading(false);
      }
    };

    if (selectedMetrics && selectedMetrics.length > 0) {
      fetchMetricsData();
    } else {
      setLoading(false);
      setChartDataArray([]);
      setApiResponseMessage('');
    }
  }, [selectedMetrics, userIdentityConstant]);

  return { chartDataArray, loading, error, apiResponseMessage };
};

export default usePerformanceMetrics;
