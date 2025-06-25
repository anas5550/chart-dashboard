import React, { useState, useCallback, useEffect } from 'react';
import PerformanceChart from '../../features/performanceChart';
import HeatMapTable from '../../features/heatMapTable';
import MetricsFilterDropdown from '../../components/Dropdown/MetricsFilterDropdown';
import MainLayout from '../../components/lauouts/MainLayout';
import { MetricsProvider } from '../../context/MetricsContext';

const Dashboard = () => {
  return (
    <MetricsProvider>
      <MainLayout>
        {/* <MetricsFilterDropdown /> */}
        <PerformanceChart />
        <HeatMapTable />
      </MainLayout>
    </MetricsProvider>
  );
};

export default Dashboard;
