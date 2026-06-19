import { mockTasks } from "../data/MockData";

const storedTasks = JSON.parse(localStorage.getItem("tasks") || "null");

export const initialState = {
  tasks: storedTasks || mockTasks,
  selectedTask: null,
  loadingTasks: {},
  backupTasks: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    //  Add new task
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            ...action.payload,
            id: Date.now().toString(),
            status: action.payload.status || "Todo",
            createdAt: new Date().toISOString(),
          },
        ],
      };

    //when drag fails
    case "ROLLBACK_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, status: action.payload.prevStatus }
            : task
        ),
      };

    //loading state after operation
    case "SET_LOADING":
      return {
        ...state,
        loadingTasks: {
          ...state.loadingTasks,
          [action.payload.id]: action.payload.isLoading,
        },
      };

    // error message
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    //Move task (update status)
    case "MOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, status: action.payload.status }
            : task
        ),
      };

    //  Edit task (update ANY field)
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                ...action.payload.updates,
              }
            : task
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
