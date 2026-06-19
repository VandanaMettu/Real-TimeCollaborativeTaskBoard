import "./styles.css";
import { useState } from "react";
import TaskLayout from "./components/layout/TaskLayout";
import TaskContextProvider from "./context/TaskContextProvider";

export default function App() {
  return (
    <div className="App">
      <TaskContextProvider>
        <TaskLayout />
      </TaskContextProvider>
    </div>
  );
}
