import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useMetricsFilter from '../../hooks/useMetricsFilter';

const MetricsFilterDropdown = ({ onApplyCallback, initialAppliedMetrics }) => {
  const { metricsList, loading, error } = useMetricsFilter(); // hook to fetch the metrics filter options

  const [selectedMetrics, setSelectedMetrics] = useState(
    initialAppliedMetrics || [],
  );

  const [appliedMetrics, setAppliedMetrics] = useState(
    initialAppliedMetrics || [],
  );

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (
      JSON.stringify(initialAppliedMetrics) !== JSON.stringify(appliedMetrics)
    ) {
      setAppliedMetrics(initialAppliedMetrics);
      setSelectedMetrics(initialAppliedMetrics);
    }
  }, [initialAppliedMetrics, appliedMetrics]);

  useEffect(() => {
    if (metricsList.length > 0) {
      if (initialAppliedMetrics && initialAppliedMetrics.length > 0) {
        setSelectedMetrics(initialAppliedMetrics);
        setAppliedMetrics(initialAppliedMetrics);
      } else if (appliedMetrics.length === 0) {
        const allFetchedCodes = metricsList.map((m) => m.code);
        setSelectedMetrics(allFetchedCodes);
        setAppliedMetrics(allFetchedCodes);
        onApplyCallback(allFetchedCodes);
      }
    } else if (
      metricsList.length === 0 &&
      !loading &&
      !error &&
      appliedMetrics.length > 0
    ) {
      setAppliedMetrics([]);
      setSelectedMetrics([]);
      onApplyCallback([]);
    }
  }, [metricsList, initialAppliedMetrics, loading, error, onApplyCallback]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) {
          handleCancel();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, appliedMetrics]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      setSelectedMetrics(appliedMetrics);
    }
  };

  const handleCheckboxChange = (code) => {
    setSelectedMetrics((prevSelected) => {
      if (prevSelected.includes(code)) {
        return prevSelected.filter((item) => item !== code);
      }
      return [...prevSelected, code];
    });
  };

  const handleApply = () => {
    setAppliedMetrics(selectedMetrics);
    setIsOpen(false);
    onApplyCallback(selectedMetrics);
  };

  const handleCancel = () => {
    setSelectedMetrics(appliedMetrics);
    setIsOpen(false);
  };

  return (
    <div
      className="relative inline-block w-full sm:w-auto z-10"
      ref={dropdownRef}
    >
      <button
        onClick={toggleDropdown}
        className="bg-green-600 text-white px-6 my-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 text-base font-medium shadow-md flex items-center justify-center w-full sm:w-auto"
      >
        Select Metrics ({appliedMetrics.length})
        <svg
          className={`ml-2 h-4 w-4 transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-200`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-full sm:w-64 bg-white rounded-md shadow-xl border border-gray-200 py-2 max-h-80 overflow-y-auto">
          <div className="px-4 py-2 text-sm text-gray-500 border-b">
            Select desired metrics:
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              <p className="ml-2 text-sm text-gray-600">Loading...</p>
            </div>
          ) : error ? (
            <p className="px-4 py-2 text-red-600 text-sm">Error: {error}</p>
          ) : metricsList.length > 0 ? (
            metricsList.map((metric) => (
              <label
                key={metric.code}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={metric.code}
                  checked={selectedMetrics.includes(metric.code)}
                  onChange={() => handleCheckboxChange(metric.code)}
                  className="form-checkbox h-4 w-4 text-purple-600 rounded-sm focus:ring-purple-500 transition-colors duration-150"
                />
                <span className="ml-2 text-gray-800 text-base">
                  {metric.label}
                </span>
              </label>
            ))
          ) : (
            <p className="px-4 py-2 text-gray-600 text-sm">
              No metrics available.
            </p>
          )}
          <div className="flex justify-end p-2 border-t border-gray-200 space-x-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors duration-200"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

MetricsFilterDropdown.propTypes = {
  onApplyCallback: PropTypes.func.isRequired,
  initialAppliedMetrics: PropTypes.arrayOf(PropTypes.string),
  userIdentityConstant: PropTypes.string.isRequired,
};

MetricsFilterDropdown.defaultProps = {
  initialAppliedMetrics: [],
};

export default MetricsFilterDropdown;
