import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();
const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const GlobalProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  function fetchTasks() {
    fetch(VITE_API_URL + "/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Errore nel recupero delle task:", error);
      });
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const value = {
    tasks,
    setTasks,
    fetchTasks,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };
