import React, { useState } from 'react';
import MainLayout from './../layouts/MainLayout';
import { metricOptions, sineWaveChartData, heatMapData } from './../data/mockData';

import MultiSelectDropdown from '../components/Dropdown/MultiSelectDropdown';
import PerformanceLineChart from '../components/Charts/PerformanceLineChart';
import HeatMapTable from '../components/Tables/HeatMapTable';

const Dashboard = () => {
  const [selectedMetrics, setSelectedMetrics] = useState(['Sales', 'Growth']);
  const [selected, setSelected] = useState(metricOptions.slice(0, 2));
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold mb-4">TechSavvy Dashoard</h1>
          <MultiSelectDropdown
            options={metricOptions}
            selected={selectedMetrics}
            setSelected={setSelectedMetrics}
          />
        </div>

        <PerformanceLineChart chartData={sineWaveChartData} selectedMetrics={selectedMetrics} />

        <HeatMapTable data={heatMapData} />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
