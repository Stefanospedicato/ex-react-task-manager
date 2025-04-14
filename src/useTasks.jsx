import { useState, useEffect } from "react";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const useTasks = (initialTasks = []) => {
  const [tasks, setTasks] = useState(initialTasks);

  function fetchTasks() {
    axios
      .get(VITE_API_URL + "/tasks")
      .then((response) => {
        setTasks(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Errore nel recupero delle task:", error.message);
      });
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function addTask(defaultObj) {
    try {
      const response = await axios.post(VITE_API_URL + "/tasks", defaultObj);

      if (response.data.success) {
        setTasks((prevTasks) => [...prevTasks, response.data.task]);
        console.log("Nuova task aggiunta:", response.data.task);
      } else {
        throw new Error(
          response.data.message || "Errore sconosciuto nell'aggiunta della task"
        );
      }
    } catch (error) {
      console.error("Errore durante l'aggiunta della task:", error.message);
    }
  }

  function removeTask(taskId) {
    axios
      .delete(VITE_API_URL + "/tasks/" + taskId)
      .then((response) => {
        if (response.data.success) {
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== taskId)
          );
          console.log("Task rimossa:", taskId);
        } else {
          console.error(
            "Errore durante la rimozione della task:",
            response.data.message
          );
        }
      })
      .catch((error) => {
        console.error("Errore durante la rimozione della task:", error.message);
      });
  }

  function updateTask() {}

  return { fetchTasks, tasks, addTask, removeTask, updateTask };
};

export default useTasks;
