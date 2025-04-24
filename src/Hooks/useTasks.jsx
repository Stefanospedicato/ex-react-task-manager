import { useState, useEffect } from "react";

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const useTasks = (initialTasks = []) => {
  const [tasks, setTasks] = useState(initialTasks);

  async function fetchTasks() {
    try {
      const response = await fetch(VITE_API_URL + "/tasks");
      if (!response) {
        throw new Error("Errore nel recupero delle task");
      }
      const data = await response.json();
      setTasks(data);
      console.log(data);
    } catch (error) {
      console.error("Errore nel recupero delle task:", error.message);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function addTask(newTask) {
    try {
      const response = await fetch(VITE_API_URL + "/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const { success, message, task } = await response.json();

      if (!success) throw new Error(message);

      setTasks((prev) => [...prev, task]);
    } catch (error) {
      console.error("Errore durante l'aggiunta della task:", error.message);
    }
  }

  async function removeTask(taskId) {
    try {
      const response = await fetch(VITE_API_URL + "/tasks/" + taskId, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        console.log("Task rimossa:", taskId);
      } else {
        console.error("Errore durante la rimozione della task:", data.message);
      }
    } catch (error) {
      console.error("Errore durante la rimozione della task:", error.message);
    }
  }

  async function updateTask(updatedTask = {}) {
    try {
      const response = await fetch(VITE_API_URL + "/tasks/" + updatedTask.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      const data = await response.json();

      if (data.success) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? data.task : task
          )
        );
        console.log("Task aggiornata:", data.task);
      } else {
        throw new Error(
          data.message || "Errore durante l'aggiornamento della task"
        );
      }
    } catch (error) {
      console.error(
        "Errore durante l'aggiornamento della task:",
        error.message
      );
    }
  }

  return { fetchTasks, tasks, addTask, removeTask, updateTask };
};

export default useTasks;
