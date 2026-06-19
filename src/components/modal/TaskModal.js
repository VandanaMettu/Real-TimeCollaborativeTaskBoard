import React from "react";
import styled from "styled-components";
import TaskForm from "../forms/TaskForm";
import useEscapeKey from "../../hooks/useEscapeKey";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
`;

const CloseBtn = styled.button`
  float: right;
  border: none;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
`;

const TaskModal = ({ onClose }) => {
  useEscapeKey(onClose, true);
  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>✕</CloseBtn>

        <h2>Add Task</h2>
        <TaskForm onClose={onClose} />
      </ModalBox>
    </Overlay>
  );
};

export default TaskModal;
