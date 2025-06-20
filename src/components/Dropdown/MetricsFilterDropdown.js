import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useMetricsFilter from '../../hooks/useMetricsFilter';
import { useMetricsContext } from '../../context/MetricsContext';

const MetricsFilterDropdown = ({ initialAppliedMetrics }) => {
  const { selectedMetrics, setSelectedMetrics } = useMetricsContext();
  const userIdentityConstant = process.env.REACT_APP_USER_IDENTITY;
  const { metricsList, loading, error } =
    useMetricsFilter(userIdentityConstant);

  const [localSelection, setLocalSelection] = useState(
    initialAppliedMetrics || [],
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sync context state with local state on metrics fetch
  useEffect(() => {
    if (metricsList.length > 0 && selectedMetrics.length === 0) {
      const allCodes = metricsList.map((m) => m.code);
      setSelectedMetrics(allCodes);
      setLocalSelection(allCodes);
    }
  }, [metricsList]);

  // Sync local UI state with context when dropdown opens
  const toggleDropdown = () => {
    if (!isOpen) setLocalSelection(selectedMetrics);
    setIsOpen((prev) => !prev);
  };

  const handleCheckboxChange = (code) => {
    setLocalSelection((prev) =>
      prev.includes(code)
        ? prev.filter((item) => item !== code)
        : [...prev, code],
    );
  };

  const handleApply = () => {
    setSelectedMetrics(localSelection);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setLocalSelection(selectedMetrics);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) handleCancel();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, selectedMetrics]);

  return (
    <div className="relative w-full sm:w-auto z-10" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="bg-green-600 text-white px-6 py-2 my-4 w-full sm:w-auto rounded-md text-base font-medium shadow-md flex items-center justify-center hover:bg-green-700 transition-colors"
      >
        Select Metrics ({selectedMetrics.length})
        <svg
          className={`ml-2 h-4 w-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-full sm:w-72 bg-white border border-gray-200 rounded-md shadow-xl py-2 max-h-80 overflow-y-auto">
          <div className="px-4 py-2 text-sm text-gray-600 border-b">
            Select desired metrics:
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-4">
              <div className="h-6 w-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-sm text-gray-500">Loading...</span>
            </div>
          ) : error ? (
            <p className="px-4 py-2 text-sm text-red-600">Error: {error}</p>
          ) : metricsList.length > 0 ? (
            metricsList.map((metric) => (
              <label
                key={metric.code}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={metric.code}
                  checked={localSelection.includes(metric.code)}
                  onChange={() => handleCheckboxChange(metric.code)}
                  className="form-checkbox h-4 w-4 text-purple-600 rounded focus:ring-purple-500"
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

          <div className="flex justify-between gap-2 p-3 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="w-1/2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md py-2 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="w-1/2 text-sm font-medium text-white bg-green-600 rounded-md py-2 hover:bg-green-700"
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
  initialAppliedMetrics: PropTypes.arrayOf(PropTypes.string),
};

MetricsFilterDropdown.defaultProps = {
  initialAppliedMetrics: [],
};

export default MetricsFilterDropdown;
