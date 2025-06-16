import React, { useState, useEffect } from 'react';
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
import PropTypes from 'prop-types';
import api from './../../utils/services/api';
import { colors } from '../../utils/constants/getColor';

///

const PerformanceLineChart = ({ selectedMetricsForChart }) => {
  const [apiResponse, setApiResponse] = useState(null);
  const [chartDataArray, setChartDataArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiResponseMessage, setApiResponseMessage] = useState('');

  useEffect(() => {
    // Log the selected metrics whenever the effect runs
    console.log(
      'PerformanceLineChart - selectedMetricsForChart updated:',
      selectedMetricsForChart,
    );

    const fetchPerformanceMetrics = async () => {
      setLoading(true);
      setError(null);
      setApiResponseMessage('');
      setChartDataArray([]);
      setApiResponse(null);

      if (!selectedMetricsForChart || selectedMetricsForChart.length === 0) {
        setLoading(false);
        setError(
          'No metrics selected for the chart. Please select metrics from the dropdown.',
        );
        return;
      }

      try {
        const response = await api.post(
          '/day-parting/DayPartingPerformanceGraphList',
          {
            startDate: '2024-06-08',
            endDate: '2024-07-07',
            metrics: selectedMetricsForChart, // This sends the selected metrics to the API
          },
          {
            headers: {
              'X-USER-IDENTITY': process.env.REACT_APP_USER_IDENTITY,
            },
          },
        );

        setApiResponse(response.data);

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
                  selectedMetricsForChart.includes(s.name) &&
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
              'Failed to fetch data from the server.',
          );
          console.error(
            'PerformanceLineChart - API Error Response:',
            err.response.data,
          );
        } else if (err.request) {
          setError('Network error: No response received from the server.');
          console.error(
            'PerformanceLineChart - Network Request Error:',
            err.request,
          );
        } else {
          setError(
            'An unexpected error occurred while setting up the request.',
          );
          console.error(
            'PerformanceLineChart - Request Setup Error:',
            err.message,
          );
        }
        setChartDataArray([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceMetrics();
  }, [selectedMetricsForChart]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 my-6 w-full overflow-hidden">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
        Metrics Performance Chart
      </h2>

      {loading && (
        <div className="flex items-center justify-center h-80 flex-col">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-lg text-gray-600 mt-4">
            Loading performance data...
          </p>
        </div>
      )}

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
          <button
            type="button"
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setError(null)}
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

      {!loading && !error && chartDataArray.length > 0 ? (
        <div className="w-full h-80 sm:h-96 lg:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartDataArray}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
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

              {selectedMetricsForChart.map((metric, index) => (
                <Line
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  stroke={colors[index % colors.length]}
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        !loading &&
        !error && (
          <p className="text-gray-600 col-span-full text-center py-8">
            {apiResponseMessage ||
              'No performance data available for the selected period.'}
          </p>
        )
      )}
    </div>
  );
};

PerformanceLineChart.propTypes = {
  selectedMetricsForChart: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PerformanceLineChart;
