import React from "react";
import ReactDOM from "react-dom";

const Modal = ({
  title,
  content,
  show,
  onClose,
  onConfirm,
  confirmText = "Conferma",
}) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-content">{content}</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Annulla
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
