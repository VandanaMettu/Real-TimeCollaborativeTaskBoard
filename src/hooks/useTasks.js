import { TaskContext } from "../context/TaskContextProvider";
import { useContext } from "react";

const useTasks = () => {
  const { state, dispatch } = useContext(TaskContext);

  return {
    state,
    dispatch,
  };
};

export default useTasks;
