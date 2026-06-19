import {memo, useCallback} from "react";
import { Column, ColumnTitle } from "./TaskDashBoard";
import useTasks from "../../hooks/useTasks";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title, tasks, columnKey }) => {
  const { dispatch } = useTasks();

  const { setNodeRef } = useDroppable({
    id: columnKey,
  });

  const onSelect = useCallback(
    (task) => {
      dispatch({ type: "SELECT_TASK", payload: task });
    },
    [dispatch]
  );


  return (
    <Column ref={setNodeRef}>
      <ColumnTitle>{title}</ColumnTitle>

      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        tasks.map((task) => <TaskCard task={task} key={task.id} onSelect={onSelect} />)
      )}
    </Column>
  );
};

export default memo(TaskColumn);

