import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useMetricsFilter from '../../hooks/useMetricsFilter';
import { useMetricsContext } from '../../context/MetricsContext';
import {
  Button as MantineButton,
  useCombobox,
  Combobox,
  InputBase,
  ScrollArea,
  Checkbox,
  Group,
  Transition,
} from '@mantine/core';

//
const MetricsFilterDropdown = ({ initialAppliedMetrics }) => {
  const { selectedMetrics, setSelectedMetrics } = useMetricsContext();
  const userIdentityConstant = process.env.REACT_APP_USER_IDENTITY;
  const { metricsList, loading, error } =
    useMetricsFilter(userIdentityConstant);

  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('');
  const [localSelection, setLocalSelection] = useState(
    initialAppliedMetrics || [],
  );
  const [snapshot, setSnapshot] = useState([]);

  const wasApplied = useRef(false);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  useEffect(() => {
    if (metricsList.length > 0 && selectedMetrics.length === 0) {
      const defaultCodes = metricsList.slice(0, 4).map((m) => m.code);
      const mappedOptions = metricsList.map((m) => ({
        value: m.code,
        label: m.label,
      }));

      setOptions(mappedOptions);
      setSelectedMetrics(defaultCodes);
      setLocalSelection(defaultCodes);
    }
  }, [metricsList]);

  const handleOptionToggle = (val) => {
    setLocalSelection((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val],
    );
  };

  const filteredOptions = options.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase().trim()),
  );

  const toggleDropdown = () => {
    if (!combobox.dropdownOpened) {
      setSnapshot(localSelection);
      setSearch('');
    }
    combobox.toggleDropdown();
  };

  useEffect(() => {
    if (!combobox.dropdownOpened) {
      if (!wasApplied.current) {
        setLocalSelection(snapshot);
      }
      wasApplied.current = false;
    }
  }, [combobox.dropdownOpened]);

  return (
    <div className="w-full sm:w-auto ml-auto my-4 px-4 sm:px-0 flex justify-end">
      <Combobox
        store={combobox}
        onOptionSubmit={handleOptionToggle}
        withinPortal
        position="bottom-end"
        className="!w-full sm:!w-72 bg-white rounded-xl shadow-xl border border-gray-300"
      >
        <Combobox.Target>
          <InputBase
            onClick={toggleDropdown}
            component="button"
            type="button"
            pointer
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            className="w-full sm:w-72"
            size="md"
            radius="md"
            variant="filled"
            color="violet"
          >
            <span className="text-gray-700">Select metrics</span>
          </InputBase>
        </Combobox.Target>

        <Transition
          mounted={combobox.dropdownOpened}
          transition="pop"
          duration={180}
          timingFunction="ease"
        >
          {(styles) => (
            <Combobox.Dropdown
              className="w-full sm:w-72 bg-white rounded-xl shadow-xl border border-gray-300"
              style={{ maxWidth: '100vw', overflowWrap: 'break-word' }}
            >
              <Combobox.Search
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
                placeholder="Search..."
              />

              <ScrollArea.Autosize mah={200} type="scroll">
                <Combobox.Options>
                  {filteredOptions.map((item) => (
                    <Combobox.Option value={item.value} key={item.value}>
                      <Group className="px-1 py-1.5">
                        <Checkbox
                          checked={localSelection.includes(item.value)}
                          label={item.label}
                          pointer
                          size="sm"
                          color="violet"
                          readOnly
                        />
                      </Group>
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </ScrollArea.Autosize>

              <div className="border-t border-gray-200 px-3 py-2 flex justify-between gap-2 bg-white">
                <button
                  onClick={() => {
                    setLocalSelection(snapshot);
                    combobox.closeDropdown();
                  }}
                  className="w-1/2 text-sm bg-gray-200 hover:bg-gray-300 rounded px-3 py-1.5 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setSelectedMetrics(localSelection);
                    wasApplied.current = true;
                    combobox.closeDropdown();
                  }}
                  className="w-1/2 text-sm bg-violet-600 hover:bg-violet-700 text-white rounded px-3 py-1.5"
                >
                  Apply
                </button>
              </div>
            </Combobox.Dropdown>
          )}
        </Transition>
      </Combobox>
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
