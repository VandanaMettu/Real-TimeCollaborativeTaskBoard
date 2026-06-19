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
  padding: 0 20px;
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
  }
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
      <Header>
        <HeaderContent>
          Task Manager
          <AddButton onClick={() => setShowModal(true)}>+ Add Task</AddButton>
          <TaskFilter filters={filters} setFilters={setFilters} />
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
