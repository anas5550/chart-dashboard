import React, { useMemo, useCallback, memo } from 'react';
import { Box, Title, Text, Loader, Center, Alert, Table } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

import useHeatmapData from '../../hooks/useHeatmapData';
import { useMetricsContext } from '../../context/MetricsContext';
import {
  heatmapMetrics,
  reverseMetrics,
} from '../../utils/constants/heatmapMetricsConstant';
import { daysOfWeek } from '../../utils/constants/daysOfWeekConstant';

const HEATMAP_USER_IDENTITY = process.env.REACT_APP_USER_IDENTITY;

const HeatMapTable = memo(() => {
  const { selectedMetrics } = useMetricsContext();
  const {
    heatmapData,
    loading,
    error,
    setError,
    apiResponseMessage,
    metricRanges,
  } = useHeatmapData(HEATMAP_USER_IDENTITY);

  const hoursOfDay = useMemo(
    () =>
      Array.from(
        { length: 24 },
        (_, i) => `${String(i).padStart(2, '0')}:00:00`,
      ),
    [],
  );

  const formatHour = useCallback((hourString) => {
    const hour = parseInt(hourString.slice(0, 2), 10);
    if (hour === 0) return '12am';
    if (hour === 12) return '12pm';
    return hour < 12 ? `${hour}am` : `${hour - 12}pm`;
  }, []);

  const getCellColor = useCallback(
    (value, metricValue) => {
      const range = metricRanges[metricValue];
      if (!range || value == null || isNaN(value)) return 'rgb(240,240,240)';
      if (range.min === range.max) return 'rgb(200,200,200)';

      const normalized = (value - range.min) / (range.max - range.min);
      const isReversed = reverseMetrics.includes(metricValue);
      const factor = isReversed ? normalized : 1 - normalized;

      const r = Math.round(255 * factor);
      const g = Math.round(255 * (1 - factor));
      const b = Math.round(100 * (1 - factor));

      return `rgb(${r},${g},${b})`;
    },
    [metricRanges],
  );

  const stickyHeader = {
    position: 'sticky',
    left: 0,
    zIndex: 30,
    backgroundColor: 'white',
    borderRight: `1px solid var(--mantine-color-gray-3)`,
    boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
  };

  const stickyCell = {
    position: 'sticky',
    left: 0,
    zIndex: 20,
    backgroundColor: 'white',
    borderRight: `1px solid var(--mantine-color-gray-2)`,
    boxShadow: '2px 0 4px rgba(0,0,0,0.05)',
  };

  const metricsToRender = selectedMetrics?.length
    ? selectedMetrics
    : heatmapMetrics.map((m) => m.value);

  const metricLabelMap = useMemo(() => {
    const map = {};
    heatmapMetrics.forEach(({ label, value }) => {
      map[value] = label;
    });
    return map;
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-1 sm:p-2 md:p-4 lg:p-6">
      <Box className="bg-white shadow-sm sm:shadow-md rounded-lg w-full overflow-hidden">
        <div className="p-2 sm:p-4 md:p-6 border-b border-gray-200">
          <Title
            order={2}
            className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-1 sm:mb-2"
          >
            Heat Map
          </Title>
          <Text className="text-xs sm:text-sm md:text-base text-gray-600">
            Day-Parting Hourly Breakdown
          </Text>
        </div>

        <div className="relative">
          {loading ? (
            <Center className="h-48 sm:h-64 md:h-80 p-4">
              <div className="flex flex-col items-center space-y-2">
                <Loader size="md" />
                <Text className="text-xs sm:text-sm text-gray-600">
                  Loading heatmap...
                </Text>
              </div>
            </Center>
          ) : error ? (
            <div className="p-2 sm:p-4">
              <Alert
                icon={<IconAlertCircle className="w-4 h-4" />}
                color="red"
                title="Error"
                onClose={() => setError(null)}
                withCloseButton
                className="text-xs sm:text-sm"
              >
                {error}
              </Alert>
            </div>
          ) : (
            <div className="relative">
              <div className="block sm:hidden bg-blue-50 border-l-4 border-blue-400 p-2 mb-2 mx-2">
                <Text className="text-xs text-blue-700">
                  💡 Swipe left/right to see all data
                </Text>
              </div>

              <div className="overflow-x-auto overflow-y-visible w-full">
                <div className="inline-block min-w-full align-middle">
                  <div
                    className="relative"
                    style={{
                      minWidth: `${80 + daysOfWeek.length * metricsToRender.length * 45}px`,
                    }}
                  >
                    <Table
                      highlightOnHover
                      striped
                      withTableBorder
                      withColumnBorders
                      className="w-full text-xs"
                      style={{
                        fontSize: window.innerWidth < 640 ? '10px' : '12px',
                        tableLayout: 'fixed',
                      }}
                    >
                      <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                          <th
                            style={{
                              ...stickyHeader,
                              minWidth: '50px',
                              width: '50px',
                              maxWidth: '50px',
                            }}
                            className="px-1 py-2 text-center text-xs font-semibold text-gray-700"
                          >
                            <div className="truncate">Time</div>
                          </th>
                          {daysOfWeek.map((day) => (
                            <th
                              key={day}
                              colSpan={metricsToRender.length}
                              className="text-center px-1 py-2 text-xs font-semibold text-gray-700 border-l border-gray-300"
                              style={{
                                minWidth: `${metricsToRender.length * 45}px`,
                                width: `${metricsToRender.length * 45}px`,
                              }}
                            >
                              <div className="truncate">
                                <span className="hidden sm:inline">{day}</span>
                                <span className="sm:hidden">
                                  {day.slice(0, 3)}
                                </span>
                              </div>
                            </th>
                          ))}
                        </tr>

                        <tr className="bg-gray-100">
                          <th
                            style={{
                              ...stickyHeader,
                              minWidth: '50px',
                              width: '50px',
                              maxWidth: '50px',
                            }}
                          ></th>
                          {daysOfWeek.map((day) =>
                            metricsToRender.map((metric, index) => (
                              <th
                                key={`${day}-${metric}`}
                                className={`text-center px-1 py-1 text-xs font-medium text-gray-600 ${index === 0 ? 'border-l border-gray-300' : ''}`}
                                style={{
                                  minWidth: '45px',
                                  width: '45px',
                                  maxWidth: '45px',
                                }}
                              >
                                <div
                                  className="truncate"
                                  title={metricLabelMap[metric] || metric}
                                >
                                  <span className="hidden md:inline">
                                    {metricLabelMap[metric] || metric}
                                  </span>
                                  <span className="md:hidden">
                                    {(metricLabelMap[metric] || metric).length >
                                    4
                                      ? (
                                          metricLabelMap[metric] || metric
                                        ).slice(0, 3) + '.'
                                      : metricLabelMap[metric] || metric}
                                  </span>
                                </div>
                              </th>
                            )),
                          )}
                        </tr>
                      </thead>

                      <tbody>
                        {hoursOfDay.map((hour, hourIndex) => (
                          <tr
                            key={hour}
                            className={`${hourIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-150`}
                          >
                            <td
                              style={{
                                ...stickyCell,
                                minWidth: '50px',
                                width: '50px',
                                maxWidth: '50px',
                              }}
                              className="px-1 py-2 text-center text-xs font-medium text-gray-700"
                            >
                              <div className="truncate text-xs">
                                {formatHour(hour)}
                              </div>
                            </td>
                            {daysOfWeek.map((day) => {
                              const currentDay = heatmapData.find(
                                (d) => d.weekday === day,
                              );
                              const hourData = currentDay?.Hourly_Data?.find(
                                (h) => h.time_part === hour,
                              );
                              return metricsToRender.map((metric, index) => {
                                const value = hourData?.[metric];
                                return (
                                  <td
                                    key={`${day}-${hour}-${metric}`}
                                    style={{
                                      backgroundColor: getCellColor(
                                        value,
                                        metric,
                                      ),
                                      minWidth: '45px',
                                      width: '45px',
                                      maxWidth: '45px',
                                    }}
                                    className={`px-1 py-2 text-center text-xs whitespace-nowrap transition-all duration-200 hover:scale-105 cursor-default ${index === 0 ? 'border-l border-gray-300' : ''}`}
                                    title={
                                      value != null
                                        ? `${metricLabelMap[metric] || metric}: ${value.toFixed(2)}`
                                        : 'N/A'
                                    }
                                  >
                                    <div className="truncate font-medium text-xs">
                                      {value != null
                                        ? value >= 1000
                                          ? (value / 1000).toFixed(1) + 'k'
                                          : value >= 100
                                            ? value.toFixed(0)
                                            : value.toFixed(1)
                                        : 'N/A'}
                                    </div>
                                  </td>
                                );
                              });
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Box>
    </div>
  );
});

HeatMapTable.displayName = 'HeatMapTable';
export default HeatMapTable;
