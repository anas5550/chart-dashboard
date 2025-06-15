import React, { useState } from 'react';
import MainLayout from '../components/lauouts/MainLayout';
import { metricOptions, chartData, heatMapData } from './../data/mockData';

import HeatMapTable from '../components/Tables/HeatMapTable';
import MetricsFilterDropdown from '../components/Dropdown/MetricsFilterDropdown';
import PerformanceLineChart from '../components/Charts/PerformanceLineChart';

const Dashboard = () => {
  const [appliedMetrics, setAppliedMetrics] = useState([
    'Spend',
    'Revenue',
    'Orders',
  ]);

  const handleMetricsApply = (metrics) => {
    setAppliedMetrics(metrics);
  };

  return (
    <MainLayout>
      <div className="w-[80vw] overflow-x-hidden">
        <MetricsFilterDropdown
          onApplyCallback={handleMetricsApply}
          initialAppliedMetrics={appliedMetrics}
        />
        <PerformanceLineChart selectedMetricsForChart={appliedMetrics} />

        <div className="p-4 overflow-x-auto">
          <HeatMapTable data={heatMapData} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
