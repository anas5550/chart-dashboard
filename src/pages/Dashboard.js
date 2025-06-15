import React, { useState, useCallback, useEffect } from 'react';
// import MainLayout from '../components/layouts/MainLayout';
import PerformanceLineChart from '../components/Charts/PerformanceLineChart';
import MetricsFilterDropdown from './../components/Dropdown/MetricsFilterDropdown';
import MainLayout from './../components/lauouts/MainLayout';

const Dashboard = () => {
  const [appliedMetrics, setAppliedMetrics] = useState([
    'CPC',
    'CR_perc',
    'ROAS',
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
          userIdentityConstant={
            process.env.REACT_APP_METRIC_FILTER_DROPDOWN_USER_IDENTITY
          }
        />

        <PerformanceLineChart selectedMetricsForChart={appliedMetrics} />

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            Additional Information
          </h2>
          <p className="mt-2 text-gray-600">
            You can add more dashboard widgets or content here.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
