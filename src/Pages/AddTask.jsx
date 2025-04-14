import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import corretto
import useTasks from "../useTasks";

const AddTask = () => {
  const initialFormData = {
    title: "",
  };

  const symbols = '!@#$%^&*()-_=+[]{}|;:\\",.<>?/`~';
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState("");
  const descRef = useRef();
  const statusRef = useRef();
  const { addTask } = useTasks();
  const navigate = useNavigate(); // Assicurati che sia definito correttamente

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title } = formData;

    if (!title.trim()) {
      setErrorMessage("Il campo Nome non può essere vuoto.");
      return;
    }

    if ([...symbols].some((symbol) => title.includes(symbol))) {
      setErrorMessage("Il campo Nome non può contenere simboli speciali.");
      return;
    }

    setErrorMessage("");

    const description = descRef.current.value;
    const status = statusRef.current.value;

    const newTask = {
      ...formData,
      description,
      status,
    };

    try {
      await addTask(newTask);
      alert("Task creata con successo!");
      setFormData(initialFormData);
      descRef.current.value = "";
      statusRef.current.value = "";
      navigate("/task-list"); // Naviga alla lista delle task
    } catch (error) {
      alert(`Errore: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="new-task container my-5 p-5">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">AGGIUNGI UNA NUOVA TASK</h1>
        <div className="mt-5 mb-3">
          <h5>Nome della Task</h5>
          <input
            type="text"
            name="title"
            className="w-100 p-2"
            placeholder="Scrivi il nome della task..."
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        {errorMessage && (
          <div className="text-danger my-3">
            <p>{errorMessage}</p>
          </div>
        )}
        <div className="my-3 flex">
          <h5>Descrizione della Task</h5>
          <textarea
            placeholder="Scrivi la descrizione della task..."
            className="w-100 p-2"
            ref={descRef}
          />
        </div>
        <div className="my-3">
          <h5>Stato</h5>
          <select className="w-100 p-2" ref={statusRef}>
            <option value="">Seleziona lo stato...</option>
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          AGGIUNGI TASK
        </button>
      </form>
    </div>
  );
};

export default AddTask;
