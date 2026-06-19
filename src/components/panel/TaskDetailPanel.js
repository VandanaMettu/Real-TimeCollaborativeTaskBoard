import { useCallback } from "react";
import useTasks from "../../hooks/useTasks";
import TaskForm from "../forms/TaskForm";
import styled from "styled-components";
import useEscapeKey from "../../hooks/useEscapeKey";

const Panel = styled.div`
  padding: 20px;
  background: white;
  border-left: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: #ef4444;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #dc2626;
  }
`;

const TaskDetailPanel = ({ setIsSplitView }) => {
  const { state, dispatch } = useTasks();

  const onCloseHandler = () => {
    dispatch({ type: "CLEAR_SELECTED_TASK" });
  };

  useEscapeKey(onCloseHandler, !!state.selectedTask);

  if (!state.selectedTask) return null;

  return (
    <Panel>
      <CloseButton onClick={onCloseHandler}>Close ✕</CloseButton>

      <h2>Edit Task</h2>
      <TaskForm />
    </Panel>
  );
};

export default TaskDetailPanel;
