import { createContext, useContext } from "react";
import useTasks from "../Hooks/useTasks";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const { tasks, fetchTasks, addTask, removeTask, updateTask } = useTasks();

  const value = {
    tasks,
    fetchTasks,
    addTask,
    removeTask,
    updateTask,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };
