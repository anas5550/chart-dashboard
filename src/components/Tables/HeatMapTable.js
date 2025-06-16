import React, { useMemo, useCallback, memo } from 'react'; // Import useMemo, useCallback, memo
import PropTypes from 'prop-types';
import useHeatmapData from '../../hooks/useHeatmapData'; // Import the new hook
import { heatmapMetrics } from '../../utils/constants/heatmapMetricsConstant';
import { daysOfWeek } from './../../utils/constants/daysOfWeekConstant';

const HEATMAP_USER_IDENTITY = process.env.REACT_APP_USER_IDENTITY;

const HeatMapTable = memo(() => {
  const {
    heatmapData,
    loading,
    error: chartError,
    setError: setChartError,
    apiResponseMessage,
    metricRanges,
  } = useHeatmapData(HEATMAP_USER_IDENTITY);
  const hoursOfDay = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
    [],
  );

  const getCellColor = useCallback(
    (value, metricValue) => {
      const range = metricRanges[metricValue];
      // If no range is available, value is null/NaN, or min equals max (no variation),
      // return a neutral gray background.
      if (
        !range ||
        value === null ||
        !Number.isFinite(value) || // Ensure value is a finite number
        range.min === range.max
      ) {
        return 'bg-gray-200';
      }

      // Normalize the value to a 0-1 scale based on the metric's min and max.
      const normalizedValue = (value - range.min) / (range.max - range.min);

      let r, g, b;
      // For ROAS and CR% (Conversion Rate Percentage), a higher value is considered better.
      // So, as normalizedValue increases, green increases and red decreases.
      if (metricValue === 'ROAS' || metricValue === 'CR_perc') {
        r = Math.round(255 * (1 - normalizedValue)); // Red component: decreases from 255 to 0
        g = Math.round(255 * normalizedValue); // Green component: increases from 0 to 255
        b = 0; // Blue component is kept at 0 for a red-green spectrum
      } else {
        // For CPC (Cost Per Click), a lower value is considered better.
        // So, as normalizedValue increases, red increases and green decreases.
        r = Math.round(255 * normalizedValue); // Red component: increases from 0 to 255
        g = Math.round(255 * (1 - normalizedValue)); // Green component: decreases from 255 to 0
        b = 0; // Blue component is kept at 0 for a red-green spectrum
      }
      // Return a Tailwind CSS class with the dynamically calculated RGB color
      return `bg-[rgb(${r},${g},${b})]`;
    },
    [metricRanges],
  );
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 my-6 w-full overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 border-b-2 border-green-500 pb-2 flex-grow">
          Heatmap
        </h2>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex items-center justify-center h-80 flex-col">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          <p className="ml-4 text-lg text-gray-600 mt-4">
            Loading heatmap data...
          </p>
        </div>
      )}

      {/* Error message display */}
      {chartError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{chartError}</span>
          <button
            type="button"
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setChartError(null)}
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

      {/* Render table if not loading and no error, and data is available */}
      {!loading && !chartError && heatmapData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                {/* Table header for Time, spanning two rows */}
                <th
                  rowSpan="2"
                  className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200"
                >
                  Time
                </th>
                {/* Day headers, each spanning across its associated metrics */}
                {daysOfWeek.map((day) => (
                  <th
                    key={day}
                    colSpan={heatmapMetrics.length}
                    className="px-2 py-2 text-center text-xs font-medium text-gray-600 uppercase tracking-wider border-l border-gray-200"
                  >
                    {day.substring(0, 3)}{' '}
                    {/* Display abbreviated day (e.g., "Sun") */}
                  </th>
                ))}
              </tr>
              <tr>
                {/* Metric headers repeated for each day */}
                {daysOfWeek.map((day) => (
                  <React.Fragment key={`${day}-metrics`}>
                    {heatmapMetrics.map((metric) => (
                      <th
                        key={`${day}-${metric.value}`}
                        className="px-1 py-1 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-l border-r border-gray-200"
                      >
                        {metric.label.replace('_perc', '%')}{' '}
                        {/* Format label (e.g., "CR%") */}
                      </th>
                    ))}
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Render rows for each hour of the day */}
              {hoursOfDay.map((hour) => (
                <tr key={hour}>
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200 sticky left-0 bg-white z-10">
                    {hour}
                  </td>
                  {/* Render cells for each day and metric */}
                  {daysOfWeek.map((day) => {
                    // Find the data for the current day
                    const dayData = heatmapData.find((d) => d.weekday === day);
                    // Find the hourly data for the current hour within that day
                    const hourlyMetricData = dayData
                      ? dayData.Hourly_Data.find((h) => h.time_part === hour)
                      : null;
                    return (
                      <React.Fragment key={`${day}-${hour}-data`}>
                        {heatmapMetrics.map((metric) => {
                          // Get the value for the specific metric and hour
                          const value = hourlyMetricData
                            ? hourlyMetricData[metric.value]
                            : null;
                          return (
                            <td
                              key={`${day}-${hour}-${metric.value}`}
                              className={`px-1 py-1 whitespace-nowrap text-xs text-center border-l border-r border-gray-200 ${value !== null ? getCellColor(value, metric.value) : 'bg-gray-100 text-gray-500'}`}
                              title={
                                // Tooltip for detailed value
                                value !== null
                                  ? `${metric.label}: ${value.toFixed(2)}`
                                  : 'N/A'
                              }
                            >
                              {value !== null ? value.toFixed(2) : 'N/A'}
                            </td>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </tr>
              ))}
              {/* Total Row - sums up metrics for each day */}
              <tr className="bg-gray-100 border-t-2 border-gray-300 font-bold">
                <th className="px-3 py-2 text-left text-sm text-gray-800 uppercase tracking-wider border-r border-gray-300">
                  Total
                </th>
                {daysOfWeek.map((day) => {
                  const dayData = heatmapData.find((d) => d.weekday === day);
                  return (
                    <React.Fragment key={`${day}-totals`}>
                      {heatmapMetrics.map((metric) => {
                        const totalValue = dayData
                          ? dayData[`Total_${metric.value}`]
                          : null;
                        return (
                          <td
                            key={`${day}-total-${metric.value}`}
                            className={`px-1 py-1 whitespace-nowrap text-xs text-center border-l border-r border-gray-200 ${totalValue !== null ? getCellColor(totalValue, metric.value) : 'bg-gray-300 text-gray-600'}`}
                            title={
                              totalValue !== null
                                ? `Total ${metric.label}: ${totalValue.toFixed(2)}`
                                : 'N/A'
                            }
                          >
                            {totalValue !== null
                              ? totalValue.toFixed(2)
                              : 'N/A'}
                          </td>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </tr>
            </tbody>
          </table>
          <p className="text-right text-gray-600 text-sm mt-2">
            Colors indicate relative performance: Green = Better (Lower CPC,
            Higher CR%/ROAS); Red = Worse.
          </p>
        </div>
      ) : (
        // Display message if no data is available after loading and without errors
        !loading &&
        !chartError && (
          <p className="text-gray-600 col-span-full text-center py-8">
            {apiResponseMessage ||
              'No heatmap data available for the selected period.'}
          </p>
        )
      )}
    </div>
  );
});
HeatMapTable.displayName = 'HeatMapTable';

HeatMapTable.propTypes = {}; // No props needed as data fetching is internal

export default HeatMapTable;
