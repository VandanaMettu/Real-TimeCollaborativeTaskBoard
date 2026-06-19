import styled from "styled-components";
import useTasks from "../../hooks/useTasks";
import { useRef, useState } from "react";

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

  // ✅ Assignee list
  const assigneeList = [...new Set(state.tasks.map((t) => t.assignee))];

  // ✅ Debounced search update
  if (!debounceRef.current) {
    debounceRef.current = debounce((value) => {
      setFilters((prev) => ({ ...prev, search: value }));
    }, 300);
  }

  return (
    <FilterWrapper>
      {/* ✅ Assignee Filter */}
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

      {/* ✅ Priority Filter */}
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

      {/* ✅ Search (debounced) */}
      <SearchInput
        placeholder="Search..."
        value={searchText}
        onChange={(e) => {
          const value = e.target.value;
          setSearchText(value); // instant UI
          debounceRef.current(value); // delayed filter update
        }}
      />
    </FilterWrapper>
  );
};

export default TaskFilter;
