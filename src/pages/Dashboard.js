import React, { useState } from 'react';
import MainLayout from './../layouts/MainLayout';
import { metricOptions, chartData, heatMapData } from './../data/mockData';

import MultiSelectDropdown from '../components/Dropdown/MultiSelectDropdown';
import PerformanceLineChart from '../components/Charts/PerformanceLineChart';
import HeatMapTable from '../components/Tables/HeatMapTable';

const Dashboard = () => {
  const [selectedMetrics, setSelectedMetrics] = useState(['Sales', 'Revenue', 'Clicks']);

  return (
    <MainLayout>
      <div className="w-[80vw] overflow-x-hidden">
        <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h1 className="text-2xl font-semibold mb-0 sm:mb-0">TechSavvy Dashboard</h1>
          <MultiSelectDropdown
            options={metricOptions}
            selected={selectedMetrics}
            setSelected={setSelectedMetrics}
          />
        </div>

        <div className="p-4">
          <PerformanceLineChart chartData={chartData} selectedMetrics={selectedMetrics} />
        </div>

        {/* --- FIX STARTS HERE --- */}
        {/*
          Apply overflow-x-auto to the div that wraps HeatMapTable in Dashboard.
          This div already has `p-4`. So, its effective content width will be
          `w-full - (2 * p-4)`. If HeatMapTable tries to be wider, this div will scroll.
        */}
        <div className="p-4 overflow-x-auto">
          {' '}
          {/* Added overflow-x-auto here */}
          <HeatMapTable data={heatMapData} />
        </div>
        {/* --- FIX ENDS HERE --- */}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
