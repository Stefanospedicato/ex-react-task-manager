import { useState, useEffect } from "react";

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const useTasks = (initialTasks = []) => {
  const [tasks, setTasks] = useState(initialTasks);

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

  function addTask() {}
  function removeTask() {}
  function updateTask() {}

  return { fetchTasks, tasks, addTask, removeTask, updateTask };
};

export default useTasks;
