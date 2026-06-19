import { useState, useEffect } from "react";
import styled from "styled-components";
import TaskDashBoard from "../dashboard/TaskDashBoard";
import TaskDetailPanel from "../panel/TaskDetailPanel";
import useTasks from "../../hooks/useTasks";
import TaskModal from "../modal/TaskModal";
import TaskFilter from "../filters/TaskFilters";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-width: 320px;
  height: 100vh;
`;

const Header = styled.div`
  background: #222;
  color: white;
  display: flex;
  align-items: center;
  padding: 16px 20px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  &.split {
    grid-template-columns: 3fr 1fr;
  }

  @media (max-width: 768px) {
    &.split {
      grid-template-columns: 1fr; /* disable split */
    }
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;

  h2 {
    margin: 0;
    flex: 1 100%;
  }

  @media (max-width: 768px) {
    justify-content: center;
    gap: 10px;
  }
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap; /* helps responsiveness */
`;

const AddButton = styled.button`
  background: #4f46e5;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #4338ca;
  }
`;
const ToastNotification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  min-width: 280px;
  padding: 12px 16px;
  border-radius: 6px;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  background-color: ${(props) =>
    props.type === "success" ? "#eff6ff" : "#fef2f2"};
  color: ${(props) => (props.type === "success" ? "#1e40af" : "#991b1b")};
  border-left: 4px solid
    ${(props) => (props.type === "success" ? "#3b82f6" : "#ef4444")};
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  font-family: sans-serif;
`;

const TaskLayout = () => {
  const { state } = useTasks();
  const isSplitView = !!state.selectedTask;
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    assignee: "",
    priority: "",
    search: "",
  });

  return (
    <Container>
      {state.isLoading && (
        <LoadingOverlay>
          <div>Saving Changes...</div>
        </LoadingOverlay>
      )}

      {state.notification && (
        <ToastNotification type={state.notification.type}>
          {state.notification.message}
        </ToastNotification>
      )}
      <Header>
        <HeaderContent>
          Task Manager
          <RightControls>
            <AddButton onClick={() => setShowModal(true)}>+ Add Task</AddButton>
            <TaskFilter filters={filters} setFilters={setFilters} />
          </RightControls>
        </HeaderContent>
      </Header>
      {showModal && <TaskModal onClose={() => setShowModal(false)} />}
      <Content className={isSplitView ? "split" : ""}>
        <TaskDashBoard filters={filters} />
        {isSplitView && <TaskDetailPanel />}
      </Content>
    </Container>
  );
};

export default TaskLayout;
