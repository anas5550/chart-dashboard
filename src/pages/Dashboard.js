import React, { useState, useCallback, useEffect } from 'react';
import PerformanceLineChart from '../components/Charts/PerformanceLineChart';
import MetricsFilterDropdown from './../components/Dropdown/MetricsFilterDropdown';
import MainLayout from './../components/lauouts/MainLayout';
import HeatMapTable from '../components/Tables/HeatMapTable';
import { MetricsProvider } from '../context/MetricsContext';

const Dashboard = () => {
  return (
    <MetricsProvider>
      <MainLayout>
        <MetricsFilterDropdown />
        <PerformanceLineChart />
        <HeatMapTable />
      </MainLayout>
    </MetricsProvider>
  );
};

export default Dashboard;
