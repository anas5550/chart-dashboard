import React from 'react';
import PropTypes from 'prop-types';
import { days, metrics, darkToLightMetrics } from '../../constants/metricConfig';
import { getColor } from '../../utils/getColor';

const hours = Array.from({ length: 24 }, (_, i) => i);
const formatHour = (hour) => {
  const suffix = hour < 12 ? 'AM' : 'PM';
  const formatted = hour % 12 === 0 ? 12 : hour % 12;
  return `${formatted}${suffix}`;
};

const HeatMapTable = ({ data }) => {
  const maxVal = Math.max(...data.map((d) => d.value || 0));

  return (
    // Outer container for the Heat Map Table.
    // It will take full width (w-full) of its parent.
    <div className="w-full h-full my-10 p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-4">Heat Map Table</h2>

      {/* Legend - Responsive layout with flex-wrap */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 mb-4">
        {/* Dark to Light Legend */}
        <div className="flex-1 min-w-[250px] max-w-full sm:max-w-none">
          <div className="font-medium text-sm mb-1">Color Legend (Dark → Light)</div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-4 border"
                style={{ backgroundColor: getColor(i / 4, 1, true) }}
              />
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-1">{darkToLightMetrics.join(', ')}</div>
        </div>

        {/* Light to Dark Legend */}
        <div className="flex-1 min-w-[250px] max-w-full sm:max-w-none">
          <div className="font-medium text-sm mb-1">Color Legend (Light → Dark)</div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-4 border"
                style={{ backgroundColor: getColor(i / 4, 1, false) }}
              />
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-1">Other Metrics</div>
        </div>
      </div>

      {/* Table Container - This is the key to control behavior */}
      {/*
        - `w-full`: Ensures this div takes 100% of the parent's width.
        - `overflow-x-auto`: Provides horizontal scrolling *within this div* if content is too wide.
        - `overflow-y-auto`: Provides vertical scrolling if content is too tall.
        - `max-h-[calc(100vh-250px)]`: Limits the table's height to prevent it from pushing content off screen. Adjust 250px as needed.
      */}
      <div className="w-full overflow-x-auto overflow-y-auto border rounded max-h-[calc(100vh-250px)]">
        {/* The table itself should *not* have min-w-full, but allow content to define its width */}
        <table className="border-collapse text-sm">
          <thead className="sticky top-0 bg-white z-10">
            <tr>
              {/* Fixed 'Hour / Metric' header column */}
              <th className="border px-2 py-1 bg-gray-100 sticky left-0 z-20 whitespace-nowrap min-w-[100px]">
                Hour / Metric
              </th>
              {/* Dynamic Day/Metric headers */}
              {days.map((day) =>
                metrics.map((metric) => (
                  <th
                    key={`${day}-${metric}`}
                    className="border px-3 py-2 bg-gray-100 whitespace-nowrap min-w-[80px]" // Fixed min-width for each data column
                  >
                    {day}
                    <div className="text-gray-500 text-xs">{metric}</div>
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                {/* Fixed Hour column */}
                <td className="border px-3 py-1 sticky left-0 bg-white z-10 font-medium whitespace-nowrap min-w-[100px]">
                  {formatHour(hour)}
                </td>
                {/* Data cells */}
                {days.map((day) =>
                  metrics.map((metric) => {
                    const cell = data.find(
                      (d) => d.day === day && d.hour === hour && d.metric === metric
                    );
                    const reverse = darkToLightMetrics.includes(metric);
                    const bgColor = cell ? getColor(cell.value, maxVal, reverse) : '#f3f4f6';

                    return (
                      <td
                        key={`${day}-${metric}-${hour}`}
                        className="border px-2 py-1 relative group text-center whitespace-nowrap min-w-[80px]" // Fixed min-width for each data cell
                        style={{ backgroundColor: bgColor }}
                      >
                        {cell ? cell.value : '-'}
                        {cell && (
                          <div className="absolute z-30 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out bg-black text-white text-xs px-2 py-1 rounded shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none">
                            {`${day}, ${formatHour(hour)} • ${metric}: ${cell.value}`}
                          </div>
                        )}
                      </td>
                    );
                  })
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

HeatMapTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      hour: PropTypes.number.isRequired,
      metric: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default HeatMapTable;
