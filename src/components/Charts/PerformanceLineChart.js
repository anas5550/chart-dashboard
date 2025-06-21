import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import usePerformanceMetrics from '../../hooks/usePerformanceMetrics';
import { useMetricsContext } from '../../context/MetricsContext';
import { Loader } from '@mantine/core';

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
);

const PerformanceChart = () => {
  const { selectedMetrics } = useMetricsContext();
  const userIdentityConstant = process.env.REACT_APP_USER_IDENTITY;

  const {
    chartDataArray, // assumed you restructure API to return [{ hour: 0, ROAS: 6.4, AOV: 45.5, ... }, ...]
    loading,
    error,
  } = usePerformanceMetrics(selectedMetrics, userIdentityConstant);

  const [chartConfig, setChartConfig] = useState(null);

  useEffect(() => {
    if (!chartDataArray || chartDataArray.length === 0) return;

    const hours = [0, 2, 4, 6, 8, 10, 12];
    const labels = hours.map((h) => `${h}Hr`);
    const datasets = selectedMetrics.map((metric, index) => {
      const isPercentage = ['cr', 'ctr', 'rate', 'acos'].some((k) =>
        metric.toLowerCase().includes(k),
      );
      const color = [
        '#6366F1',
        '#10B981',
        '#F59E0B',
        '#EF4444',
        '#8B5CF6',
        '#3B82F6',
        '#EC4899',
        '#22D3EE',
      ][index % 8];

      return {
        label: metric,
        data: chartDataArray.map((d) => d[metric]),
        borderColor: color,
        backgroundColor: color,
        yAxisID: isPercentage ? 'percentage' : 'monetary',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      };
    });

    setChartConfig({
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { size: 12 } },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const value = ctx.raw;
                const isPercent = ['cr', 'ctr', 'rate', 'acos'].some((k) =>
                  ctx.dataset.label.toLowerCase().includes(k),
                );
                if (isPercent)
                  return `${ctx.dataset.label}: ${value.toFixed(2)}%`;
                if (value > 100)
                  return `${ctx.dataset.label}: ₹${value.toLocaleString()}`;
                return `${ctx.dataset.label}: ${value}`;
              },
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
            },
          },
        },
      },
    });
  }, [chartDataArray, selectedMetrics]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-96">
        <Loader size="lg" color="blue" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!chartConfig) return <div>No data</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 w-full h-96">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
        Performance Chart
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Key Metrics for Dayparting Schedule Performance Evaluation
      </p>
      <Line data={chartConfig.data} options={chartConfig.options} />
    </div>
  );
};

export default PerformanceChart;
