import React, { useMemo, useCallback, memo } from 'react';
import {
  Box,
  Title,
  Text,
  Loader,
  Center,
  Alert,
  Table,
  NumberFormatter,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

import useHeatmapData from '../../hooks/useHeatmapData';
import { useMetricsContext } from '../../context/MetricsContext';
import {
  heatmapMetrics,
  reverseMetrics,
} from '../../utils/constants/heatmapMetricsConstant';
import { daysOfWeek } from '../../utils/constants/daysOfWeekConstant';
import {
  getCellColor,
  getTextColor,
  formatHour,
} from '../../utils/heatmapUtils';

const HEATMAP_USER_IDENTITY = process.env.REACT_APP_USER_IDENTITY; /// .env unique user identity

const HeatMapTable = memo(() => {
  const { selectedMetrics } = useMetricsContext();
  const { heatmapData, loading, error, setError, metricRanges } =
    useHeatmapData(HEATMAP_USER_IDENTITY);

  const hoursOfDay = useMemo(
    () =>
      Array.from(
        { length: 24 },
        (_, i) => `${String(i).padStart(2, '0')}:00:00`,
      ),
    [],
  );

  const stickyHeader = {
    position: 'sticky',
    left: 0,
    zIndex: 30,
    backgroundColor: 'white',
    borderRight: '1px solid var(--mantine-color-gray-3)',
    boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    backgroundClip: 'padding-box',
    minWidth: '60px',
    maxWidth: '80px',
    textAlign: 'center',
  };

  const stickyCell = {
    position: 'sticky',
    left: 0,
    backgroundColor: 'white',
    borderRight: '1px solid var(--mantine-color-gray-2)',
    boxShadow: '2px 0 4px rgba(0,0,0,0.05)',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    backgroundClip: 'padding-box',
    minWidth: '60px',
    maxWidth: '80px',
    textAlign: 'center',
  };

  const metricsToRender = selectedMetrics?.length
    ? selectedMetrics
    : heatmapMetrics.map((m) => m.value);

  const metricLabelMap = useMemo(() => {
    return heatmapMetrics.reduce((acc, { label, value }) => {
      acc[value] = label;
      return acc;
    }, []);
  }, {});

  const totalRow = useMemo(() => {
    const totals = {};
    daysOfWeek.forEach((day) => {
      const currentDay = heatmapData.find((d) => d.weekday === day);
      if (currentDay?.Hourly_Data) {
        metricsToRender.forEach((metric) => {
          totals[`${day}-${metric}`] = currentDay.Hourly_Data.reduce(
            (sum, h) => {
              const val = h[metric];
              return val != null && !isNaN(val) ? sum + val : sum;
            },
            0,
          );
        });
      }
    });
    return totals;
  }, [heatmapData, metricsToRender]);

  return (
    <div className="bg-white rounded-lg shadow-md p-1 sm:p-2 md:p-4 h-full w-full my-2 sm:my-4 mb-4 sm:mb-8">
      <div className="p-1 sm:p-2 md:p-4">
        <h2 className="text-base sm:text-lg md:text-2xl font-semibold text-gray-800">
          Heat Map
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Day-Parting Hourly Breakdown
        </p>
      </div>

      <div className="relative w-full overflow-x-auto rounded-md  shadow-sm">
        {loading ? (
          <Center className="h-48 sm:h-64 md:h-80 p-4">
            <div className="flex flex-col items-center space-y-2">
              <Loader size="md" />
              <Text className="text-xs sm:text-sm text-gray-600">
                Loading Heatmap...
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
          <div className="relative w-full overflow-x-auto">
            <Table
              highlightOnHover
              className="min-w-[700px] sm:min-w-[900px] md:min-w-[1024px] text-[10px] sm:text-xs md:text-sm"
              style={{ tableLayout: 'auto' }}
            >
              <thead className="bg-white sticky top-0 z-10">
                <tr className="bg-white">
                  {daysOfWeek.map((day) => (
                    <th
                      key={day}
                      colSpan={metricsToRender.length}
                      className="text-center  text-[#9D9D9D] font-light"
                      // sunday, monday
                    >
                      <div className="truncate">
                        <span className="hidden sm:inline">{day}</span>
                        <span className="sm:hidden">{day.slice(0, 3)}</span>
                      </div>
                    </th>
                  ))}
                </tr>
                {/* imp clicks, cpm */}
                <tr className="bg-white p-4">
                  <th style={{ ...stickyHeader }}></th>
                  {daysOfWeek.map((day) =>
                    metricsToRender.map((metric, index) => (
                      <th
                        key={`${day}-${metric}`}
                        className={`text-center px-0.5 sm:px-1 py-0.5 sm:py-1 sm:text-xs md:text-sm text-[#797979] font-normal`}
                      >
                        <div
                          className="truncate"
                          title={metricLabelMap[metric] || metric}
                        >
                          <span className="hidden md:inline">
                            {metricLabelMap[metric] || metric}
                          </span>
                          <span className="md:hidden">
                            {(metricLabelMap[metric] || metric).length > 4
                              ? (metricLabelMap[metric] || metric).slice(0, 3) +
                                '.'
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
                    className={`${hourIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} transition-colors duration-150 `}
                  >
                    <td
                      style={{ ...stickyCell }}
                      className="text-center text-[10px] sm:text-xs md:text-sm font-normal text-gray-700"
                    >
                      <div className="truncate text-[10px] sm:text-xs md:text-sm text-[#9D9D9D]">
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
                        const bgColor = getCellColor(
                          value,
                          metric,
                          metricRanges,
                        );
                        return (
                          <td
                            key={`${day}-${hour}-${metric}`}
                            style={{
                              backgroundColor: bgColor,
                              border: '3px solid white',
                              minWidth: 48,
                              maxWidth: 80,
                              padding: '0px',
                            }}
                            className={`transition-transform duration-200 relative hover:z-10 cursor-default hover:brightness-110 md:hover:scale-[1.05] text-center px-0.5 sm:px-1 py-0.5 sm:py-1`}
                            title={
                              value != null
                                ? `${metricLabelMap[metric] || metric}: ${value}`
                                : 'N/A'
                            }
                          >
                            <div
                              className="truncate font-normal text-[10px] sm:text-xs md:text-sm px-0.5 sm:px-1 py-0.5 sm:py-1"
                              style={{ color: getTextColor(bgColor) }}
                            >
                              {value != null ? (
                                <NumberFormatter
                                  value={value}
                                  thousandSeparator
                                  prefix={metric === 'cpm' ? '₹' : ''}
                                  decimalScale={2}
                                />
                              ) : (
                                'N/A'
                              )}
                            </div>
                          </td>
                        );
                      });
                    })}
                  </tr>
                ))}
                <tr className="bg-blue-50 font-normal">
                  <td
                    style={{ ...stickyCell }}
                    className="text-[10px] sm:text-xs md:text-sm"
                  >
                    Total
                  </td>
                  {daysOfWeek.map((day) =>
                    metricsToRender.map((metric, index) => {
                      const total = totalRow[`${day}-${metric}`];
                      return (
                        <td
                          key={`total-${day}-${metric}`}
                          className={`text-center text-[10px] sm:text-xs md:text-sm px-0.5 sm:px-1 py-1 bg-gray-100 ${index === 0 ? 'border-l border-gray-300' : ''}`}
                        >
                          <NumberFormatter
                            value={total}
                            thousandSeparator
                            prefix={metric === 'cpm' ? '₹' : ''}
                            decimalScale={2}
                          />
                        </td>
                      );
                    }),
                  )}
                </tr>
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
});

HeatMapTable.displayName = 'HeatMapTable';
export default HeatMapTable;
