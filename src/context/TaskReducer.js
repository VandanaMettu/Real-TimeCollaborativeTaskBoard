import { mockTasks } from "../data/MockData";

const storedTasks = JSON.parse(localStorage.getItem("tasks") || "null");

export const initialState = {
  tasks: storedTasks && storedTasks.length > 0 ? storedTasks : mockTasks,
  selectedTask: null,
  isLoading: false,
  notification: null,
  lockedTaskId: null,
  lockedBy: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "SET_NOTIFICATION":
      return {
        ...state,
        notification: action.payload,
      };

    case "ADD_TASK":
      return {
        ...state,
        // action.payload is now the final 'serverSavedTask' from the API
        tasks: [...state.tasks, action.payload],
      };

    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                ...action.payload.updatedTask,
              }
            : task
        ),
      };
    case "SET_TASK_STATUS":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id
            ? { ...t, status: action.payload.status }
            : t
        ),
      };

    //state to show the preview panel
    case "SELECT_TASK":
      return {
        ...state,
        selectedTask: action.payload,
      };

    //one the update task happens we will clear the selection and close preview panel
    case "CLEAR_SELECTED_TASK":
      return {
        ...state,
        selectedTask: null,
      };

    default:
      return state;
  }
};
