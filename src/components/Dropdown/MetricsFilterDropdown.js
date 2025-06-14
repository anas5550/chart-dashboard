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
                // 'U2FsdGVkX18lreBwDMZIZaWXmCA+9GGYXAFttifVV7ovRjRGNNlnl3F8QSfmgxbGrm4zk42ud8ygR0rZccDFlOVDj01aIUTjKrX6TNza+qoIkSe0xGH0MxBlUXrV+c+ULtgFHS9XcTXbrIGbSN1CUTjKrX6TNza+qoIkSe0xGH0MxBlUXrV+c+ULtgFHS9XcTXbrIGbSN1Cwt18SZK5UOGF3aavkG5ZGXwOAopznMUp4CJOxE9a7DzNsb0rJpsguSXehn+Fw0b6GT30m/c0+7Nhbtwi8GFflEgr8F41hE4jMoLwCEajSkxQhTxorAqtJRF0tlM5sUeAvBODqx4sZMB8MNv9v9NzQ7cA+P+FKB6VSS9QIwRx5PC4LQnmthfupakaZmnRL1YbZ56rPbt8lu3QSRS1yuV/GwRuCN3MBwaHitsgzMYEnAMiYGup+W/nbNsukqCXhSZGtg==',
                'U2FsdGVkX18lreBwDMZIZaWXmCA+9GGYXAFttifVV7ovRjRGNNlnl3F8QSfmgxbGrm4zk42ud8ygR0rZccDFlOVDj01aIUTjKrX6TNza+qoIkSe0xGH0MxBlUXrV+c+ULtgFHS9XcTXbrIGbSN1Cwt18SZK5UOGF3aavkG5ZGXwOAopznMUp4CJOxE9a7DzNsb0rJpsguSXehn+Fw0b6GT30m/c0+7Nhbtwi8GFflEgr8F41hE4jMoLwCEajSkxQhTxorAqtJRF0tlM5sUeAvBODqx4sZMB8MNv9v9NzQ7cA+P+FKB6VSS9QIwRx5PC4LQnmthfupakaZmnRL1YbZ56rPbt8lu3QSRS1yuV/GwRuCN3MBwaHitsgzMYEnAMiYGup+W/nbNsukqCXhSZGtg==',
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
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-[calc(100vh-100px)]">
      <div className="bg-white shadow-lg rounded-lg max-w-full mx-auto my-6 p-6 md:p-8 relative">
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
