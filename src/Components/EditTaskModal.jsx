import React, { useState, useRef } from "react";
import Modal from "./Modal";

const EditTaskModal = ({ show, onClose, task = {}, onSave }) => {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status || "To do");
  const editFormRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      title,
      description,
      status,
    };
    onSave(updatedTask);
    onClose();
  };

  const updateForm = (
    <form ref={editFormRef} onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="task-title" className="form-label">
          Nome
        </label>
        <input
          type="text"
          id="task-title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="task-description" className="form-label">
          Descrizione
        </label>
        <textarea
          id="task-description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="task-status" className="form-label">
          Stato
        </label>
        <select
          id="task-status"
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="To do">To do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </form>
  );

  return (
    <Modal
      title="Modifica Task"
      content={updateForm}
      show={show}
      onClose={onClose}
      onConfirm={() => editFormRef.current.requestSubmit()}
      confirmText="Salva"
    />
  );
};

export default EditTaskModal;
