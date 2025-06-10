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

// Define your colors outside or pass them as a prop if they need to be dynamic
const colors = ['#8884d8', '#82ca9d', '#ff7300', '#0088FE', '#FF8042', '#d0ed57', '#a4de6c']; // Added more colors for more metrics

// Renamed prop from 'data' to 'chartData' to avoid confusion,
// but you can keep 'data' if you prefer.
const PerformanceLineChart = ({ chartData, selectedMetrics }) => {
  // No need for internal data transformation here, as the input 'chartData'
  // is already in the correct format for Recharts.

  // Add console log to ensure data is coming in correctly
  console.log('PerformanceLineChart received data:', chartData);
  console.log('PerformanceLineChart received selectedMetrics:', selectedMetrics);

  return (
    <div className="w-full h-80 p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-2">Performance Line Chart</h2>
      <ResponsiveContainer width="100%" height="100%">
        {/* Pass your 'chartData' directly to LineChart */}
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          {/* Use 'hour' as the dataKey for XAxis, as per your data format */}
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedMetrics.map((metric, idx) => (
            <Line
              key={metric}
              type="monotone"
              dataKey={metric} // This will now correctly pick 'Sales', 'Revenue', 'Clicks', etc.
              stroke={colors[idx % colors?.length]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

PerformanceLineChart.propTypes = {
  // Update propTypes to reflect the new expected data structure
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      hour: PropTypes.string.isRequired,
      Sales: PropTypes.number, // Optional, depending on if all metrics are always present
      Revenue: PropTypes.number,
      Clicks: PropTypes.number,
      // Add other potential metrics here as PropTypes.number
    })
  ).isRequired,
  selectedMetrics: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PerformanceLineChart;
