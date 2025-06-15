import React, { useState, useCallback, useEffect } from 'react';
import PerformanceLineChart from '../components/Charts/PerformanceLineChart';
import MetricsFilterDropdown from './../components/Dropdown/MetricsFilterDropdown';
import MainLayout from './../components/lauouts/MainLayout';
import HeatMapTable from '../components/Tables/HeatMapTable';

const Dashboard = () => {
  const [appliedMetrics, setAppliedMetrics] = useState([
    'Spend',
    'Revenue',
    'Orders',
  ]);

  const handleMetricsApply = useCallback((metrics) => {
    setAppliedMetrics(metrics);
  }, []);

  useEffect(() => {}, [appliedMetrics]);

  return (
    <MainLayout>
      <div className="space-y-8 p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Your Dashboard Overview
        </h1>

        <MetricsFilterDropdown
          onApplyCallback={handleMetricsApply}
          initialAppliedMetrics={appliedMetrics}
        />

        <PerformanceLineChart selectedMetricsForChart={appliedMetrics} />

        {/* HeatMapTable */}
        <HeatMapTable />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
