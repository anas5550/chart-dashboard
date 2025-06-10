import React from 'react';
import PropTypes from 'prop-types';

const darkToLightMetrics = ['CPC', 'CPM', 'CPO', 'ACOS', 'CPA'];

const getColor = (value, max, reverse = false) => {
  const intensity = value / max;
  const color = reverse ? 255 - intensity * 160 : 255 - (1 - intensity) * 160;
  return `rgb(255, ${color}, ${color})`;
};

const hours = Array.from({ length: 24 }, (_, i) => i);
const formatHour = (hour) => {
  const suffix = hour < 12 ? 'AM' : 'PM';
  const formatted = hour % 12 === 0 ? 12 : hour % 12;
  return `${formatted}${suffix}`;
};

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const metrics = ['Impressions', 'Clicks', 'CPM']; // You can update/add more metrics here

const HeatMapTable = ({ data }) => {
  const maxVal = Math.max(...data.map((d) => d.value || 0));

  return (
    <div className="overflow-x-auto p-4 bg-white rounded shadow text-sm">
      <h2 className="text-lg font-semibold mb-4">Heat Map Table</h2>
      <table className="table-auto border-collapse text-center">
        <thead>
          <tr>
            <th className="border px-2 py-1 bg-gray-100">Hour / Day-Metric</th>
            {days.map((day) =>
              metrics.map((metric) => (
                <th key={`${day}-${metric}`} className="border px-2 py-1 bg-gray-100">
                  {day} <br /> <span className="text-gray-500 text-xs">{metric}</span>
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td className="border px-2 py-1 font-medium bg-gray-50">{formatHour(hour)}</td>
              {days.map((day) =>
                metrics.map((metric) => {
                  const cell = data.find(
                    (d) => d.day === day && d.hour === hour && d.metric === metric
                  );
                  const reverse = darkToLightMetrics.includes(metric);
                  const bgColor = cell ? getColor(cell.value, maxVal, reverse) : '#f0f0f0';

                  return (
                    <td
                      key={`${day}-${metric}-${hour}`}
                      className="border px-2 py-1"
                      style={{ backgroundColor: bgColor }}
                    >
                      {cell ? cell.value : '-'}
                    </td>
                  );
                })
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

HeatMapTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired, // e.g., 'Monday'
      hour: PropTypes.number.isRequired, // 0–23
      metric: PropTypes.string.isRequired, // 'Impressions', 'Clicks', 'CPM', etc.
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default HeatMapTable;
