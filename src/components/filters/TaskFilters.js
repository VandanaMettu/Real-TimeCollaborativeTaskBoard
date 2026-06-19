import styled from "styled-components";
import useTasks from "../../hooks/useTasks";
import { useRef, useState, useMemo } from "react";

export const FilterWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Select = styled.select`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;

  &:focus {
    border-color: #4f46e5;
  }
`;

export const SearchInput = styled.input`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;

  &:focus {
    border-color: #4f46e5;
  }
`;

const debounce = (callback, delay = 300) => {
  let timer = null;

  return function (...args) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

const TaskFilter = ({ filters, setFilters }) => {
  const { state } = useTasks();

  const [searchText, setSearchText] = useState(filters.search);
  const debounceRef = useRef();

  const assigneeList = useMemo(
    () => [...new Set(state.tasks.map((t) => t.assignee))],
    [state.tasks]
  );

  if (!debounceRef.current) {
    debounceRef.current = debounce((value) => {
      setFilters((prev) => ({ ...prev, search: value }));
    }, 300);
  }

  return (
    <FilterWrapper>
      <Select
        value={filters.assignee}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            assignee: e.target.value,
          }))
        }
      >
        <option value="">All Assignees</option>
        {assigneeList.map((assignee) => (
          <option key={assignee} value={assignee}>
            {assignee}
          </option>
        ))}
      </Select>

      <Select
        value={filters.priority}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            priority: e.target.value,
          }))
        }
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </Select>

      <SearchInput
        placeholder="Search..."
        value={searchText}
        onChange={(e) => {
          const value = e.target.value;
          setSearchText(value);
          debounceRef.current(value);
        }}
      />
    </FilterWrapper>
  );
};

export default TaskFilter;
