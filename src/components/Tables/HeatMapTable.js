import React, { useMemo, useCallback, memo } from 'react';
import {
  Box,
  Title,
  Text,
  Loader,
  Center,
  Alert,
  Table,
  rem,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

import useHeatmapData from '../../hooks/useHeatmapData';
import { useMetricsContext } from '../../context/MetricsContext';
import { daysOfWeek } from '../../utils/constants/daysOfWeekConstant';
import { heatmapMetrics } from '../../utils/constants/heatmapMetricsConstant';

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

  const reverseMetrics = ['CPC', 'CPM', 'CPO', 'ACOS', 'CPA'];

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
  };

  const stickyCell = {
    position: 'sticky',
    left: 0,
    zIndex: 20,
    backgroundColor: 'white',
    borderRight: `1px solid var(--mantine-color-gray-2)`,
  };

  // ✅ fallback to full heatmapMetrics if selectedMetrics is empty
  const metricsToRender = selectedMetrics?.length
    ? selectedMetrics
    : heatmapMetrics.map((m) => m.value);

  // ✅ map value-to-label for display
  const metricLabelMap = useMemo(() => {
    const map = {};
    heatmapMetrics.forEach(({ label, value }) => {
      map[value] = label;
    });
    return map;
  }, []);

  return (
    <Box className="bg-white shadow-md rounded-lg p-4 w-full overflow-x-auto">
      <Title order={2} mb="xs">
        Heat Map
      </Title>
      <Text c="gray.6" size="sm" mb="md">
        Day-Parting Hourly Breakdown
      </Text>

      {loading ? (
        <Center h={300} className="flex flex-col">
          <Loader />
          <Text size="sm" mt="sm" c="gray.6">
            Loading heatmap...
          </Text>
        </Center>
      ) : error ? (
        <Alert
          icon={<IconAlertCircle />}
          color="red"
          title="Error"
          onClose={() => setError(null)}
          withCloseButton
        >
          {error}
        </Alert>
      ) : (
        <Box className="max-h-[600px] overflow-auto w-full">
          <Table
            highlightOnHover
            striped
            withTableBorder
            withColumnBorders
            fz="xs"
            className="min-w-[1000px]"
          >
            <thead>
              <tr>
                <th style={{ ...stickyHeader, minWidth: rem(80) }}>Time</th>
                {daysOfWeek.map((day) => (
                  <th
                    key={day}
                    colSpan={metricsToRender.length}
                    style={{ textAlign: 'center' }}
                  >
                    {day}
                  </th>
                ))}
              </tr>
              <tr>
                <th style={{ ...stickyHeader, minWidth: rem(80) }}></th>
                {daysOfWeek.map((day) =>
                  metricsToRender.map((metric) => (
                    <th
                      key={`${day}-${metric}`}
                      style={{ textAlign: 'center' }}
                    >
                      {metricLabelMap[metric] || metric}
                    </th>
                  )),
                )}
              </tr>
            </thead>
            <tbody>
              {hoursOfDay.map((hour) => (
                <tr key={hour} className="even:bg-gray-50">
                  <td style={{ ...stickyCell, minWidth: rem(80) }}>
                    {formatHour(hour)}
                  </td>
                  {daysOfWeek.map((day) => {
                    const currentDay = heatmapData.find(
                      (d) => d.weekday === day,
                    );
                    const hourData = currentDay?.Hourly_Data?.find(
                      (h) => h.time_part === hour,
                    );
                    return metricsToRender.map((metric) => {
                      const value = hourData?.[metric];
                      return (
                        <td
                          key={`${day}-${hour}-${metric}`}
                          style={{
                            backgroundColor: getCellColor(value, metric),
                            textAlign: 'center',
                            padding: '0.4rem',
                          }}
                          title={
                            value != null
                              ? `${metricLabelMap[metric] || metric}: ${value.toFixed(2)}`
                              : 'N/A'
                          }
                        >
                          {value != null ? value.toFixed(0) : 'N/A'}
                        </td>
                      );
                    });
                  })}
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
});

HeatMapTable.displayName = 'HeatMapTable';

export default HeatMapTable;
