import { useState, useEffect } from 'react';
import api from '../utils/services/api'; // Assuming your api.js is in utils/services

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

      // If no metrics are selected, don't make an API call
      if (!selectedMetrics || selectedMetrics.length === 0) {
        setLoading(false);
        setError('No metrics selected for the chart.');
        return;
      }

      try {
        const response = await api.post(
          '/day-parting/DayPartingPerformanceGraphList',
          {
            startDate: '2024-06-08', // Hardcoded dates for the API request
            endDate: '2024-07-07',
            metrics: selectedMetrics, // Pass selected metrics to the API
          },
          {
            headers: {
              'X-USER-IDENTITY': userIdentityConstant, // Use the provided user identity
            },
          },
        );

        // Store and display any message from the API response
        if (response.data && response.data.message) {
          setApiResponseMessage(response.data.message);
        }

        // Process the API result to transform it into chart-compatible data
        if (
          response.data &&
          response.data.result &&
          Array.isArray(response.data.result.categories) &&
          Array.isArray(response.data.result.series)
        ) {
          const { categories, series } = response.data.result;

          if (categories.length > 0 && series.length > 0) {
            const transformedData = categories.map((category, index) => {
              const dataPoint = { date: category }; // 'date' for X-axis
              series.forEach((s) => {
                // Only include data for metrics that are currently selected
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
        // Handle various types of errors from the API call
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
        setLoading(false); // Always set loading to false after attempt
      }
    };

    // Only trigger data fetching if selectedMetrics are available
    if (selectedMetrics && selectedMetrics.length > 0) {
      fetchMetricsData();
    } else {
      // If no metrics are selected, stop loading and clear existing chart data/messages
      setLoading(false);
      setChartDataArray([]);
      setApiResponseMessage('');
    }
  }, [selectedMetrics, userIdentityConstant]); // Dependencies: re-run when selectedMetrics or userIdentityConstant changes

  return { chartDataArray, loading, error, apiResponseMessage };
};

export default usePerformanceMetrics;
