import React, { useState, useCallback, useEffect } from 'react';
import PerformanceLineChart from '../components/Charts/PerformanceLineChart';
import MetricsFilterDropdown from './../components/Dropdown/MetricsFilterDropdown';
import MainLayout from './../components/lauouts/MainLayout';
import HeatMapTable from '../components/Tables/HeatMapTable';

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-8 p-4 sm:p-6 lg:p-8">
        <PerformanceLineChart />
        <HeatMapTable />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
