import React, { useState, useCallback, useEffect } from 'react';
import PerformanceLineChart from '../components/Charts/PerformanceLineChart';
import MetricsFilterDropdown from './../components/Dropdown/MetricsFilterDropdown';
import MainLayout from './../components/lauouts/MainLayout';
import HeatMapTable from '../components/Tables/HeatMapTable';
import { MetricsProvider } from '../context/MetricsContext';

const Dashboard = () => {
  return (
    // <MainLayout>

    <MetricsProvider>
      <div className="w-full max-w-full overflow-x-hidden">
        <MetricsFilterDropdown />
        <PerformanceLineChart />
        <HeatMapTable />
      </div>
    </MetricsProvider>
    // </MainLayout>
  );
};

export default Dashboard;
