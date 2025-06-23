import { useState, useEffect } from 'react';
import { fetchPerformanceData } from '../services/performanceService';

const usePerformanceMetrics = (selectedMetrics, userIdentityConstant) => {
  const [chartDataArray, setChartDataArray] = useState([]);
  const [loading, setLoading] = useState(false); // set false initially
  const [error, setError] = useState(null);
  const [apiResponseMessage, setApiResponseMessage] = useState('');

  useEffect(() => {
    // Guard: Wait until both values are ready
    if (!selectedMetrics?.length || !userIdentityConstant) return;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      setApiResponseMessage('');
      setChartDataArray([]);

      try {
        const { chartData, message } = await fetchPerformanceData(
          selectedMetrics,
          userIdentityConstant,
        );

        if (chartData.length > 0) {
          setChartDataArray(chartData);
        } else {
          setError(
            'API returned no chart data points for the selected period/metrics.',
          );
        }

        if (message) setApiResponseMessage(message);
      } catch (errMsg) {
        setError(errMsg);
        setChartDataArray([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedMetrics, userIdentityConstant]);

  return { chartDataArray, loading, error, apiResponseMessage };
};

export default usePerformanceMetrics;
