import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MultiSelectDropdown = ({ options, selected, setSelected }) => {
  const [open, setOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState([...selected]);

  const toggleTempOption = (option) => {
    setTempSelected((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const applySelection = () => {
    setSelected(tempSelected);
    setOpen(false);
  };

  const cancelSelection = () => {
    setTempSelected([...selected]);
    setOpen(false);
  };

  return (
    <div className="relative w-64 ">
      <button
        onClick={() => setOpen(!open)}
        className="w-full border rounded px-4 py-2 text-left bg-white shadow "
      >
        {selected.length > 0 ? selected.join(', ') : 'Select Metrics'}
      </button>

      {open && (
        <div className="absolute mt-1 w-full border rounded bg-white shadow z-10 max-h-72 overflow-y-auto">
          <div className="p-2 space-y-1">
            {options.map((option) => (
              <label key={option} className="flex items-center px-2 py-1 hover:bg-gray-100 rounded">
                <input
                  type="checkbox"
                  checked={tempSelected.includes(option)}
                  onChange={() => toggleTempOption(option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
          <div className="flex justify-end p-2 border-t gap-2 bg-gray-50">
            <button
              onClick={cancelSelection}
              className="px-3 py-1 rounded border border-gray-400 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={applySelection}
              className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

MultiSelectDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default MultiSelectDropdown;
