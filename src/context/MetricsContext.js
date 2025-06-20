import React from 'react';
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const MetricsContext = createContext();

export const MetricsProvider = ({ children }) => {
  const [selectedMetrics, setSelectedMetrics] = useState([]);

  return (
    <MetricsContext.Provider value={{ selectedMetrics, setSelectedMetrics }}>
      {children}
    </MetricsContext.Provider>
  );
};
MetricsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useMetricsContext = () => useContext(MetricsContext);
