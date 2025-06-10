import React, { useState } from 'react';
import MainLayout from './../layouts/MainLayout';
import { metricOptions, chartData, heatMapData } from './../data/mockData';

import MultiSelectDropdown from '../components/Dropdown/MultiSelectDropdown';
import PerformanceLineChart from '../components/Charts/PerformanceLineChart';
import HeatMapTable from '../components/Tables/HeatMapTable';

const Dashboard = () => {
  const [selectedMetrics, setSelectedMetrics] = useState(['Sales', 'Growth']);
  const [selected, setSelected] = useState(metricOptions.slice(0, 2));
  return (
    <MainLayout>
      <div className="w-full p-2 overflow-hidden">
        {/* <h1 className="text-2xl font-semibold">TechSavvy Dashoard</h1> */}
        <MultiSelectDropdown
          options={metricOptions}
          selected={selectedMetrics}
          setSelected={setSelectedMetrics}
        />

        <PerformanceLineChart chartData={chartData} selectedMetrics={selectedMetrics} />
        <HeatMapTable data={heatMapData} />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
