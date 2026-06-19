import React, { useState, useEffect } from "react";
import useTasks from "../../hooks/useTasks";
import styled from "styled-components";

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Input = styled.input`
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;

  &:focus {
    border-color: #4f46e5;
  }
`;

export const TextArea = styled.textarea`
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  min-height: 80px;
  resize: none;

  &:focus {
    border-color: #4f46e5;
  }
`;

export const Select = styled.select`
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;

  &:focus {
    border-color: #4f46e5;
  }
`;

export const Button = styled.button`
  padding: 10px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #4338ca;
  }
`;

const initialFormState = {
  title: "",
  description: "",
  assignee: "",
  priority: "low",
  status: "todo",
};

const TaskForm = ({ onClose }) => {
  const { state, dispatch, editTaskAsync, addTaskAsync } = useTasks();

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (state.selectedTask) {
      setFormData(state.selectedTask);
    }
  }, [state.selectedTask]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.selectedTask) {
      await editTaskAsync(state.selectedTask.id, formData);
    } else {
      await addTaskAsync(formData);
    }
    if (onClose) {
      onClose();
    } else {
      dispatch({ type: "CLEAR_SELECTED_TASK" });
    }
    setFormData(initialFormState);
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />

      <TextArea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <Input
        name="assignee"
        value={formData.assignee}
        onChange={handleChange}
        placeholder="Assignee"
      />

      <Select name="status" value={formData.status} onChange={handleChange}>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </Select>

      <Select name="priority" value={formData.priority} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </Select>

      <Button type="submit">
        {state.selectedTask ? "Update Task" : "Add Task"}
      </Button>
    </FormWrapper>
  );
};

export default TaskForm;
