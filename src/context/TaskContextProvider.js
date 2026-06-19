import { createContext, useReducer, useEffect } from "react";
import { initialState, reducer } from "./TaskReducer";

export const TaskContext = createContext();

const TaskContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
