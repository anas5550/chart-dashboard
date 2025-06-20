import React, { useEffect, memo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { useMetricsContext } from '../../context/MetricsContext';
import usePerformanceMetrics from '../../hooks/usePerformanceMetrics';
import { colors } from '../../utils/constants/colorConstants';

const PerformanceLineChart = memo(() => {
  const userIdentityConstant = process.env.REACT_APP_USER_IDENTITY;
  const { selectedMetrics, setSelectedMetrics } = useMetricsContext();

  const {
    chartDataArray,
    loading: loadingChartData,
    error: chartError,
    apiResponseMessage,
  } = usePerformanceMetrics(selectedMetrics, userIdentityConstant);

  useEffect(() => {
    // Optional: if you want default selection logic when empty
    // Uncomment below to select first 3 metrics from hook or context if needed
    // if (availableMetrics.length > 0 && selectedMetrics.length === 0) {
    //   const defaultSelected = availableMetrics.slice(0, 3).map((m) => m.code);
    //   setSelectedMetrics(defaultSelected);
    // }
  }, [selectedMetrics]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 my-6 w-full overflow-hidden relative">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">
        Metrics Performance Chart
      </h2>

      {/* Loading State */}
      {loadingChartData && (
        <div className="flex items-center justify-center h-80 flex-col">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-lg text-gray-600 mt-4">
            Loading performance data...
          </p>
        </div>
      )}

      {/* Error State */}
      {chartError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{chartError}</span>
          <button
            type="button"
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setSelectedMetrics([])}
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.303l-2.651 2.651a1.2 1.2 0 1 1-1.697-1.697L8.303 10l-2.651-2.651a1.2 1.2 0 1 1 1.697-1.697L10 8.697l2.651-2.651a1.2 1.2 0 1 1 1.697 1.697L11.697 10l2.651 2.651a1.2 1.2 0 0 1 0 1.697z" />
            </svg>
          </button>
        </div>
      )}

      {/* Success State */}
      {!loadingChartData && !chartError && chartDataArray.length > 0 ? (
        <div className="w-full h-80 sm:h-96 lg:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartDataArray}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="date"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                angle={-30}
                textAnchor="end"
                height={50}
              />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                }}
                labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                itemStyle={{ color: '#4b5563' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
              {selectedMetrics.map((metric, index) => (
                <Line
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  stroke={colors[index % colors.length]}
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        !loadingChartData &&
        !chartError && (
          <p className="text-gray-600 text-center py-8">
            {apiResponseMessage ||
              'No performance data available for the selected period.'}
          </p>
        )
      )}
    </div>
  );
});

PerformanceLineChart.displayName = 'PerformanceLineChart';

export default PerformanceLineChart;
