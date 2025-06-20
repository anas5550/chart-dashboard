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

  useEffect(() => {}, [selectedMetrics]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-3 sm:p-4 md:p-6 lg:p-8 my-4 sm:my-6 w-full overflow-hidden relative">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-800 border-b-2 border-blue-500 pb-2 mb-3 sm:mb-4 break-words">
        Metrics Performance Chart
      </h2>

      {/* Loading State */}
      {loadingChartData && (
        <div className="flex items-center justify-center h-64 sm:h-80 md:h-96 flex-col space-y-3 sm:space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-b-2 border-blue-500"></div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center px-4">
            Loading performance data...
          </p>
        </div>
      )}

      {/* Error State */}
      {chartError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <div className="pr-8 sm:pr-12">
            <strong className="font-bold text-sm sm:text-base">Error:</strong>
            <span className="block sm:inline ml-0 sm:ml-2 mt-1 sm:mt-0 text-sm sm:text-base break-words">
              {chartError}
            </span>
          </div>
          <button
            type="button"
            className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1 sm:p-2 hover:bg-red-200 rounded transition-colors duration-200"
            onClick={() => setSelectedMetrics([])}
          >
            <svg
              className="fill-current h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-red-500"
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
        <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartDataArray}
              margin={{
                top: 5,
                right: 10,
                left: 5,
                bottom: 20,
                // Responsive margins for different screen sizes
                ...(window.innerWidth < 640 && {
                  right: 5,
                  left: 0,
                  bottom: 30,
                }),
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="date"
                tick={{
                  fill: '#6b7280',
                  fontSize:
                    window.innerWidth < 640
                      ? 10
                      : window.innerWidth < 768
                        ? 11
                        : 12,
                }}
                angle={window.innerWidth < 640 ? -45 : -30}
                textAnchor="end"
                height={window.innerWidth < 640 ? 60 : 50}
                interval={window.innerWidth < 640 ? 'preserveStartEnd' : 0}
              />
              <YAxis
                tick={{
                  fill: '#6b7280',
                  fontSize:
                    window.innerWidth < 640
                      ? 10
                      : window.innerWidth < 768
                        ? 11
                        : 12,
                }}
                width={window.innerWidth < 640 ? 40 : 60}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: window.innerWidth < 640 ? '12px' : '14px',
                  maxWidth: window.innerWidth < 640 ? '200px' : '300px',
                  wordWrap: 'break-word',
                }}
                labelStyle={{
                  color: '#374151',
                  fontWeight: 'bold',
                  fontSize: window.innerWidth < 640 ? '12px' : '14px',
                }}
                itemStyle={{
                  color: '#4b5563',
                  fontSize: window.innerWidth < 640 ? '11px' : '13px',
                }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: '15px',
                  fontSize: window.innerWidth < 640 ? '12px' : '14px',
                }}
                iconType="circle"
                layout={window.innerWidth < 640 ? 'horizontal' : 'horizontal'}
                align="center"
                verticalAlign="bottom"
              />
              {selectedMetrics.map((metric, index) => (
                <Line
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  stroke={colors[index % colors.length]}
                  activeDot={{ r: window.innerWidth < 640 ? 6 : 8 }}
                  strokeWidth={window.innerWidth < 640 ? 2 : 3}
                  dot={false} // Hide dots on mobile for cleaner look
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        !loadingChartData &&
        !chartError && (
          <div className="text-gray-600 text-center py-6 sm:py-8 px-4">
            <p className="text-sm sm:text-base md:text-lg break-words">
              {apiResponseMessage ||
                'No performance data available for the selected period.'}
            </p>
          </div>
        )
      )}
    </div>
  );
});

PerformanceLineChart.displayName = 'PerformanceLineChart';

export default PerformanceLineChart;
