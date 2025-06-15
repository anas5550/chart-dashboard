import React, { useState, useEffect, useRef } from 'react';
import api from './../../utils/services/api';

const MetricsFilterDropdown = () => {
  const [metricsList, setMetricsList] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [appliedMetrics, setAppliedMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchMetricsFilterList = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.post(
          '/day-parting/DayPartingFilterList',
          {
            type: 'customizeMetrics',
          },
          {
            headers: {
              'X-USER-IDENTITY':
                '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',
            },
          },
        );

        // The API response is an object with a 'result' key containing the array
        if (
          response.data &&
          Array.isArray(response.data.result) &&
          response.data.result.length > 0
        ) {
          setMetricsList(response.data.result);
          const initialCodes = response.data.result.map(
            (metric) => metric.code,
          );
          setSelectedMetrics(initialCodes);
          setAppliedMetrics(initialCodes);
        } else if (
          response.data &&
          Array.isArray(response.data.result) &&
          response.data.result.length === 0
        ) {
          setMetricsList([]);
          setSelectedMetrics([]);
          setAppliedMetrics([]);
          // Optionally set a message if an empty array is a 'no data' scenario
          // setError('No metrics available based on current criteria.');
        } else {
          // This branch will be hit if response.data is NOT an object with a 'result' array
          setError(
            'API returned an unexpected data format. Expected an object with a "result" array.',
          );
          setMetricsList([]);
          setSelectedMetrics([]);
          setAppliedMetrics([]);
        }
      } catch (err) {
        if (err.response) {
          setError(
            err.response.data.message ||
              'Failed to fetch filter list from the server.',
          );
          console.error('API Error:', err.response.data);
        } else if (err.request) {
          setError('Network error: No response received from the server.');
          console.error('Network Error:', err.request);
        } else {
          setError(
            'An unexpected error occurred while setting up the request.',
          );
          console.error('Request Setup Error:', err.message);
        }
        setMetricsList([]);
        setSelectedMetrics([]);
        setAppliedMetrics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMetricsFilterList();
  }, []);

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
    console.log('Applied Metrics:', selectedMetrics);
  };

  const handleCancel = () => {
    setSelectedMetrics(appliedMetrics);
    setIsOpen(false);
  };

  return (
    <div className="p-2 sm:p-4 lg:p-6 bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg max-w-full mx-auto p-4 md:p-4 relative">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-purple-500 pb-2">
          Metrics Filter Options
        </h2>

        {loading && (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
            <p className="ml-3 text-base text-gray-600">
              Loading metrics filter options...
            </p>
          </div>
        )}

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
            <button
              type="button"
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setError(null)}
            >
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.303l-2.651 2.651a1.2 1.2 0 1 1-1.697-1.697L8.303 10l-2.651-2.651a1.2 1.2 0 1 1 1.697-1.697L10 8.697l2.651-2.651a1.2 1.2 0 1 1 1.697 1.697L11.697 10l2.651 2.651a1.2 1.2 0 0 1 0 1.697z" />
              </svg>
            </button>
          </div>
        )}

        {!loading && !error && (
          <div
            className="relative inline-block w-full sm:w-auto z-10"
            ref={dropdownRef}
          >
            <button
              onClick={toggleDropdown}
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200 text-base font-medium shadow-md flex items-center justify-center w-full sm:w-auto"
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
                {metricsList.length > 0 ? (
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
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors duration-200"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {metricsList.length === 0 && !loading && !error && (
          <p className="text-gray-600 text-center py-6">
            No metrics available for filtering.
          </p>
        )}
      </div>
    </div>
  );
};

export default MetricsFilterDropdown;
