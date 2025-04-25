import { useGlobalContext } from "../Context/GlobalContext";
import TaskRow from "../Components/TaskRow";
import { Link } from "react-router-dom";
import { useState, useMemo, useCallback } from "react";

const TaskList = () => {
  const { tasks } = useGlobalContext();
  const [sortOrder, setSortOrder] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  function debounce(func, delay) {
    let timer;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(value);
      }, delay);
    };
  }

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prevOrder) => -prevOrder);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  };

  const handleSearch = useCallback(
    debounce((query) => {
      setDebouncedQuery(query);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const filteredAndSortedTasks = useMemo(() => {
    const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    return filteredTasks.sort((a, b) => {
      switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title) * sortOrder;
      case "status":
        const status = ["To do", "Doing", "Done"];
        return (
        (status.indexOf(a.status) - status.indexOf(b.status)) * sortOrder
        );
      case "createdAt":
        return (
        (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
        sortOrder
        );
      default:
        return 0;
      }
    });
  }, [tasks, sortBy, sortOrder, debouncedQuery]);

  return (
    <div className="container mt-5 new-task p-5 mb-5 uppercase">
      <h1 className="text-center table-title bold">TASK LIST</h1>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Cerca per nome..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <table className="table text-center border mt-5">
        <thead>
          <tr>
            <th
              onClick={() => handleSort("title")}
              className={`col-4 table-title ${
                sortBy === "title" ? "active" : ""
              }`}
            >
              NOME
            </th>
            <th
              onClick={() => handleSort("status")}
              className={`col-4 table-title ${
                sortBy === "status" ? "active" : ""
              }`}
            >
              STATO
            </th>
            <th
              onClick={() => handleSort("createdAt")}
              className={`col-4 table-title ${
                sortBy === "createdAt" ? "active" : ""
              }`}
            >
              DATA DI CREAZIONE
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center mt-5">
        <Link className="w-100" to="/add-task">
          <button className="btn btn-success w-100">
            AGGIUNGI UNA NUOVA TASK
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TaskList;
