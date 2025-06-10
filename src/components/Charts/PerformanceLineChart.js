import React from 'react';
import PropTypes from 'prop-types';
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

const PerformanceLineChart = ({ data, selectedMetrics }) => {
  // Create unified data format for the chart
  const chartData = [];

  if (data.length > 0) {
    const length = data[0].data.length;

    for (let i = 0; i < length; i++) {
      const entry = { name: `Point ${i + 1}` };
      data.forEach((metric) => {
        if (selectedMetrics.includes(metric.name)) {
          entry[metric.name] = metric.data[i];
        }
      });
      chartData.push(entry);
    }
  }

  return (
    <div className="w-full h-80 p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-2">Performance Line Chart</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedMetrics.map((metric, idx) => (
            <Line
              key={metric}
              type="monotone"
              dataKey={metric}
              stroke={colors[idx % colors.length]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const colors = ['#8884d8', '#82ca9d', '#ff7300', '#0088FE', '#FF8042'];

PerformanceLineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ).isRequired,
  selectedMetrics: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PerformanceLineChart;
