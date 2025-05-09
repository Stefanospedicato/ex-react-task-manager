import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useGlobalContext } from "../Context/GlobalContext";
import Modal from "../Components/Modal";
import EditTaskModal from "../Components/EditTaskModal";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask, updateTask } = useGlobalContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const task = tasks.find((t) => t.id === parseInt(id));

  const getStatusClass = (status) => {
    switch (status) {
      case "To do":
        return "text-danger fw-bold p-3";
      case "Doing":
        return "text-warning fw-bold p-3";
      case "Done":
        return "text-success fw-bold p-3";
      default:
        return "";
    }
  };

  if (!task) {
    return <p>Task non trovata.</p>;
  }

  const { title, description, status, createdAt } = task;

  const handleRemoveTask = () => {
    removeTask(task.id);
    navigate("/task-list");
  };

  const handleSaveTask = async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      alert("Task modificata con successo!");
      setShowEditModal(false);
    } catch (error) {
      alert(`Errore durante la modifica della task: ${error.message}`);
    }
  };

  return (
    <div className="container my-5 detail-task">
      <h1 className="text-center mt-3 mb-5">DETTAGLIO TASK</h1>
      <div className="m-4">
        <div className="p-3">
          <h5>TITOLO:</h5> {title}
        </div>
        <div className="p-3">
          <h5>DESCRIZIONE:</h5> {description}
        </div>
        <div className={getStatusClass(status)}>
          <h5>STATO:</h5> {status}
        </div>
        <div className="p-3">
          <h5>DATA DI CREAZIONE:</h5> {dayjs(createdAt).format("DD/MM/YYYY")}
        </div>
        <button
          className="btn btn-primary w-100 mb-3"
          onClick={() => setShowEditModal(true)}
        >
          MODIFICA TASK
        </button>
        <button
          className="btn btn-danger w-100"
          onClick={() => setShowDeleteModal(true)}
        >
          ELIMINA TASK
        </button>
      </div>

      <Modal
        title="Conferma Eliminazione"
        content="Sei sicuro di voler eliminare questa task? L'operazione è irreversibile."
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleRemoveTask}
        confirmText="Elimina"
      />

      <EditTaskModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        task={task}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default TaskDetail;
