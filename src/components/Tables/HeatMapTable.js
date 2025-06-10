import React from 'react';
import PropTypes from 'prop-types';
import { days, metrics, darkToLightMetrics } from '../../constants/metricConfig';

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

const HeatMapTable = ({ data }) => {
  const maxVal = Math.max(...data.map((d) => d.value || 0));

  return (
    <div className="w-full p-4">
      <h2 className="text-lg font-semibold mb-4">Heat Map Table</h2>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 mb-4">
        <div>
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

        <div>
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

      {/* Scrollable Heatmap */}
      <div className="max-w-screen-md max-h-screen overflow-scroll border rounded">
        <table className="border-collapse min-w-max text-sm">
          <thead className="sticky top-0 bg-white z-10">
            <tr>
              <th className="border px-2 py-1 bg-gray-100 sticky left-0 z-20 ">Hour / Metric</th>
              {days.map((day) =>
                metrics.map((metric) => (
                  <th
                    key={`${day}-${metric}`}
                    className="border px-3 py-2 bg-gray-100 whitespace-nowrap"
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
                <td className="border px-3 py-1 sticky left-0 bg-white z-10 font-medium">
                  {formatHour(hour)}
                </td>
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
                        className="border px-2 py-1 relative group text-center"
                        style={{ backgroundColor: bgColor }}
                      >
                        {cell ? cell.value : '-'}
                        {cell && (
                          <div className="absolute z-30 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded shadow-md top-6 left-6 whitespace-nowrap">
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
