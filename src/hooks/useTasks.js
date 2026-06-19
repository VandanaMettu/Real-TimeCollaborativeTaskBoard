import { TaskContext } from "../context/TaskContextProvider";
import { useContext } from "react";
import {
  fakeUpdateTaskStatus,
  fakeAddTask,
  fakeEditTask,
} from "../utils/apiUtils";

const useTasks = () => {
  const { state, dispatch } = useContext(TaskContext);

  const triggerNotification = (type, message) => {
    dispatch({
      type: "SET_NOTIFICATION",
      payload: { type, message },
    });
    setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: null,
      });
    }, 3000);
  };

  const updateTaskStatusAsync = async (taskId, newStatus) => {
    // dispatch({ type: "IS_LOADING", payload: true });
    const task = state.tasks.find((t) => t.id === taskId);
    if (!task) return;
    const prevStatus = task.status;
    dispatch({
      type: "SET_TASK_STATUS",
      payload: { id: taskId, status: newStatus },
    });

    try {
      await fakeUpdateTaskStatus(taskId, newStatus);

      triggerNotification("success", "Task moved successfully!");
    } catch (error) {
      dispatch({
        type: "SET_TASK_STATUS",
        payload: { id: taskId, status: prevStatus },
      });
      triggerNotification(
        "error",
        "Server dropped connection. Reverting card."
      );
    }
  };

  const addTaskAsync = async (taskData) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const serverSavedTask = await fakeAddTask(taskData);
      dispatch({ type: "ADD_TASK", payload: serverSavedTask });
      triggerNotification("success", "New task committed successfully!");
    } catch (error) {
      triggerNotification("error", "Failed to create task.");
    } finally {
      dispatch({ type: "IS_LOADING", payload: false });
    }
  };

  const editTaskAsync = async (taskId, updates) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const serverUpdatedData = await fakeEditTask(taskId, updates);
      dispatch({ type: "EDIT_TASK", payload: serverUpdatedData });
      triggerNotification("success", "Changes synchronized safely.");
    } catch (error) {
      triggerNotification("error", "Could not save modifications.");
    } finally {
      dispatch({ type: "IS_LOADING", payload: false });
    }
  };

  return {
    state,
    dispatch,
    updateTaskStatusAsync,
    addTaskAsync,
    editTaskAsync,
  };
};

export default useTasks;
