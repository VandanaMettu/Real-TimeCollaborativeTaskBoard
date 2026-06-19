import styled from "styled-components";
import { useDraggable } from "@dnd-kit/core";
import useTasks from "../../hooks/useTasks";

const Card = styled.div`
  background: white;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background: #f9fafb;
  }
`;

import { useRef } from "react";

const TaskCard = ({ task }) => {
  const { state, dispatch } = useTasks();
  // const isDraggingRef = useRef(false);
  // const isLoading = state.loadingTasks[task.id];

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    zIndex: transform ? 999 : undefined,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => {
        dispatch({ type: "SELECT_TASK", payload: task });
      }}
    >
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <small>
        {task.assignee} • {task.priority}
      </small>
    </Card>
  );
};
export default TaskCard;
