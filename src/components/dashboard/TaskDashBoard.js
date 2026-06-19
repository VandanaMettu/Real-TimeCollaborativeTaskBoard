import styled from "styled-components";
import useTasks from "../../hooks/useTasks";
import TaskColumn from "./TaskColumn";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { useMemo } from "react";
import { filterTasks, groupTasksByStatus } from "../../utils/taskUtils";
import { fakeUpdateTaskStatus } from "../../utils/apiUtils";

const columns = [
  { key: "todo", title: "Todo" },
  { key: "in-progress", title: "In Progress" },
  { key: "done", title: "Done" },
];

export const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* ✅ 3 columns */
  gap: 16px;
  padding: 16px;
  height: 100%;
`;

export const Column = styled.div`
  background: #f0f2f5;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
`;

export const ColumnTitle = styled.h3`
  margin-bottom: 10px;
`;

export const TaskCard = styled.div`
  background: white;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background: #f9fafb;
  }
`;

const TaskDashBoard = ({ filters }) => {
  const { state, dispatch } = useTasks();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const filteredTasks = useMemo(() => {
    return filterTasks(state.tasks, filters);
  }, [state.tasks, filters]);

  const groupedTasks = useMemo(() => {
    return groupTasksByStatus(filteredTasks);
  }, [filteredTasks]);

  const columns = [
    { key: "todo", title: "Todo" },
    { key: "in-progress", title: "In Progress" },
    { key: "done", title: "Done" },
  ];

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const task = state.tasks.find((t) => t.id === taskId);
    const prevStatus = task.status;

    if (state.loadingTasks[taskId]) return;

    dispatch({
      type: "MOVE_TASK",
      payload: { id: taskId, status: newStatus },
    });

    dispatch({
      type: "SET_LOADING",
      payload: { id: taskId, isLoading: true },
    });

    try {
      await fakeUpdateTaskStatus(taskId, newStatus);

      console.log("Success");
    } catch (err) {
      dispatch({
        type: "ROLLBACK_TASK",
        payload: { id: taskId, prevStatus },
      });

      dispatch({
        type: "SET_ERROR",
        payload: err,
      });

      console.log(" Failed → Rolled back");
    } finally {
      dispatch({
        type: "SET_LOADING",
        payload: { id: taskId, isLoading: false },
      });
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <BoardWrapper>
        {columns.map((col) => (
          <TaskColumn
            columnKey={col.key}
            title={col.title}
            tasks={groupedTasks[col.key] || []}
            key={col.key}
          />
        ))}
      </BoardWrapper>
    </DndContext>
  );
};

export default TaskDashBoard;
