import { useState, useEffect } from 'react';
import { useMetricsContext } from '../context/MetricsContext';
import { fetchHeatmapData } from '../services/heatmapService';
import { calculateMetricRanges } from '../utils/metricsUtils';

const useHeatmapData = (userIdentityConstant) => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiResponseMessage, setApiResponseMessage] = useState('');
  const [metricRanges, setMetricRanges] = useState({});

  const { selectedMetrics } = useMetricsContext();
  const metricsToSend = selectedMetrics || [];

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      setApiResponseMessage('');
      setHeatmapData([]);

      try {
        const { data, message } = await fetchHeatmapData({
          userIdentityConstant,
          metrics: metricsToSend,
        });

        if (message) setApiResponseMessage(message);

        if (Array.isArray(data)) {
          const sortedData = [...data].sort(
            (a, b) => a.weekNumber - b.weekNumber,
          );
          setHeatmapData(sortedData);
        } else {
          setError('Unexpected API format or missing "result"');
        }
      } catch (errMsg) {
        setError(errMsg);
        setHeatmapData([]);
      } finally {
        setLoading(false);
      }
    };

    if (userIdentityConstant && metricsToSend.length > 0) {
      getData();
    }
  }, [userIdentityConstant, JSON.stringify(metricsToSend)]);

  useEffect(() => {
    if (loading || heatmapData.length === 0 || metricsToSend.length === 0)
      return;

    const ranges = calculateMetricRanges(heatmapData, metricsToSend);
    setMetricRanges(ranges);
  }, [heatmapData, loading, JSON.stringify(metricsToSend)]);

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
