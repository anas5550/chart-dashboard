import React, { useEffect, useRef } from 'react';
import usePerformanceMetrics from '../../hooks/usePerformanceMetrics';
import { useMetricsContext } from '../../context/MetricsContext';
import { Center, Loader, Text } from '@mantine/core';
import { Chart, registerables } from 'chart.js';
import {
  CHART_COLORS,
  X_AXIS_LABELS,
} from '../../utils/constants/chartConstants';
import { isPercentageMetric, formatTooltipLabel } from '../../utils/chartUtils';
import MetricsFilterDropdown from '../../components/Dropdown/MetricsFilterDropdown';

Chart.register(...registerables);

const PerformanceChart = () => {
  const { selectedMetrics } = useMetricsContext();
  const userIdentityConstant = process.env.REACT_APP_USER_IDENTITY;

  const { chartDataArray, loading, error } = usePerformanceMetrics(
    selectedMetrics,
    userIdentityConstant,
  );

  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!chartDataArray || !canvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    const datasets = selectedMetrics.map((metric, index) => ({
      label: metric,
      data: chartDataArray.map((entry) => entry[metric]),
      borderColor: CHART_COLORS[index % CHART_COLORS.length],
      backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
      yAxisID: isPercentageMetric(metric) ? 'percentage' : 'monetary',
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 5,
    }));

    const ctx = canvasRef.current.getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: X_AXIS_LABELS,
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            bottom: 20,
          },
        },
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: formatTooltipLabel,
            },
          },
        },
        scales: {
          monetary: {
            type: 'linear',
            position: 'left',
            ticks: {
              callback: (val) => `₹${(val / 1000).toFixed(1)}k`,
              font: { size: 12 },
            },
            grid: { drawOnChartArea: true },
          },
          percentage: {
            type: 'linear',
            position: 'right',
            ticks: {
              callback: (val) => `${val.toFixed(0)}%`,
              font: { size: 12 },
              stepSize: 5,
              reverse: true,
              max: 50,
              min: 0,
            },
            grid: { drawOnChartArea: false },
          },
          x: {
            ticks: {
              font: { size: 12 },
              maxRotation: 0,
              autoSkip: true,
            },
          },
        },
      },
    });

    chartInstanceRef.current = newChart;

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [chartDataArray, selectedMetrics]);

  if (error)
    return <div className="text-red-600 text-sm text-center">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 lg:p-10 w-full h-[28rem] overflow-hidden my-4">
      <div className="h-full w-full transform scale-[0.80] sm:scale-100 origin-top">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
          <div>
            <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">
              Performance Chart
            </h2>
            <p className="text-sm text-gray-500">
              Key Metrics for Dayparting Schedule Performance Evaluation
            </p>
          </div>

          {/* Embedded Dropdown with line chart at the right side */}
          <div className="w-full sm:w-auto">
            <MetricsFilterDropdown />
          </div>
        </div>

        {loading || (!chartDataArray?.length && !error) ? (
          <Center className="h-48 sm:h-64 md:h-80 p-4">
            <div className="flex flex-col items-center space-y-2">
              <Loader size="md" />
              <Text className="text-xs sm:text-sm text-gray-600">
                Loading Performance Chart...
              </Text>
            </div>
          </Center>
        ) : (
          <canvas className="pb-4" ref={canvasRef}></canvas>
        )}
      </div>
    </div>
  );
};

export default PerformanceChart;
