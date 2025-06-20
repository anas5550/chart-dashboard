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
import { heatmapMetrics } from '../../utils/constants/heatmapMetricsConstant';
import { daysOfWeek } from '../../utils/constants/daysOfWeekConstant';

const HEATMAP_USER_IDENTITY = process.env.REACT_APP_USER_IDENTITY;

const HeatMapTable = memo(() => {
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
      let r = 255 * (1 - normalized);
      let g = 255 * normalized;
      let b = 100 * normalized;

      if (['CPC', 'CPM', 'CPO', 'ACOS', 'CPA'].includes(metricValue)) {
        [r, g] = [255 * normalized, 255 * (1 - normalized)];
      }

      return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
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

  return (
    <Box className="bg-white shadow-md rounded-lg p-4">
      <Title order={2} mb="xs">
        Heat Map
      </Title>
      <Text c="gray.6" size="sm" mb="md">
        Day-Parting Hourly Breakdown
      </Text>

      {loading ? (
        <Center h={300}>
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
        <Box style={{ maxHeight: '600px', overflow: 'auto' }}>
          <Table
            highlightOnHover
            striped
            withTableBorder
            withColumnBorders
            fz="xs"
          >
            <thead>
              <tr>
                <th style={{ ...stickyHeader, minWidth: rem(80) }}>Time</th>
                {daysOfWeek.map((day) => (
                  <th
                    key={day}
                    colSpan={heatmapMetrics.length}
                    style={{ textAlign: 'center' }}
                  >
                    {day}
                  </th>
                ))}
              </tr>
              <tr>
                <th style={{ ...stickyHeader, minWidth: rem(80) }}></th>
                {daysOfWeek.map((day) =>
                  heatmapMetrics.map((metric) => (
                    <th
                      key={`${day}-${metric.value}`}
                      style={{ textAlign: 'center' }}
                    >
                      {metric.label.replace('_perc', '%')}
                    </th>
                  )),
                )}
              </tr>
            </thead>
            <tbody>
              {hoursOfDay.map((hour) => (
                <tr key={hour}>
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
                    return heatmapMetrics.map((metric) => {
                      const value = hourData?.[metric.value];
                      return (
                        <td
                          key={`${day}-${hour}-${metric.value}`}
                          style={{
                            backgroundColor: getCellColor(value, metric.value),
                            textAlign: 'center',
                            padding: '0.4rem',
                          }}
                          title={
                            value != null
                              ? `${metric.label}: ${value.toFixed(2)}`
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
