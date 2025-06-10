import React from 'react';
import PropTypes from 'prop-types';
import { chartLineColors } from './../../utils/chartLineColors';
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

const PerformanceLineChart = ({ chartData, selectedMetrics }) => {
  // A helper function to format the Y-axis ticks for currency.
  // It converts large numbers to 'K' (thousands) and adds a rupee symbol.
  const formatYAxisCurrencyTick = (value) => {
    if (value === 0) return '₹0';
    return `₹${(value / 1000).toFixed(1)}K`;
  };

  // Set the specific range and tick marks for the Y-axis.
  // This ensures your vertical scale is consistent from 0 to 24000.
  const yAxisValueDomain = [0, 24000];
  const yAxisFixedTicks = Array.from({ length: 7 }, (_, index) => 24000 - index * 4000).reverse();

  // --- X-Axis Spreading Logic ---
  // To spread the hours evenly, we need to treat the X-axis as a numerical scale.
  // First, we transform the incoming data to include a numeric 'hourValue'.
  const processedChartData = chartData.map((dataPoint) => ({
    ...dataPoint,
    // Convert '0Hr', '2Hr', etc., into actual numbers (0, 2)
    hourValue: parseInt(dataPoint.hour.replace('Hr', ''), 10),
  }));

  // Define the numerical points where you want X-axis labels to appear.
  // This matches your data's hour intervals.
  const xAxisNumericalTicks = [0, 2, 4, 6, 8, 10, 12];

  // A formatter for X-axis ticks to convert the numerical hour back into '0Hr' string.
  const formatXAxisHourTick = (value) => {
    return `${value}Hr`;
  };
  // --- End X-Axis Spreading Logic ---

  return (
    <div className="w-full h-80 p-2 my-5 mb-20 bg-white shadow rounded">
      <h2 className="text-lg font-semibold">Performance Chart</h2>

      <p className="text-sm text-gray-600 mb-4">
        Key Metrics for dayparting schedule performance evaluation
      </p>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={processedChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          {/* X-Axis Configuration */}
          <XAxis
            dataKey="hourValue" // Use the new numerical hour field for positioning
            type="number" // Crucially, set the axis type to 'number' for continuous spacing
            domain={[0, 12]} // Define the min and max numerical range for the hours
            ticks={xAxisNumericalTicks} // Specify exactly which numerical points should have labels
            tickFormatter={formatXAxisHourTick} // Format the numerical labels back to your desired string format
            allowDataOverflow={true} // Helps ensure all data points are visible even if slightly outside strict domain bounds
          />
          {/* Y-Axis Configuration */}
          <YAxis
            tickFormatter={formatYAxisCurrencyTick} // Apply the custom currency formatter
            domain={yAxisValueDomain} // Set the fixed value domain
            ticks={yAxisFixedTicks} // Set the specific tick marks for the Y-axis
          />
          <Tooltip /> {/* Shows details on hover */}
          <Legend wrapperStyle={{ marginTop: '20px' }} />
          {/* Displays line indicators and labels */}
          {/* Render each selected metric as a line */}
          {selectedMetrics.map((metric, index) => (
            <Line
              key={metric}
              type="monotone" // Smooth curve for the line
              dataKey={metric} // The metric (e.g., 'Sales', 'Revenue') to plot
              stroke={chartLineColors[index % chartLineColors.length]} // Assign a color from your palette
              strokeWidth={2} // Make the line a bit thicker
              dot={true} // Display a dot at each data point
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

PerformanceLineChart.propTypes = {
  // PropTypes to ensure the data structure is correct
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      hour: PropTypes.string.isRequired, // Expects the original hour string
      Sales: PropTypes.number,
      Revenue: PropTypes.number,
      Clicks: PropTypes.number,
      // You can add more props here if your data contains other metrics
    })
  ).isRequired,
  selectedMetrics: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PerformanceLineChart;
