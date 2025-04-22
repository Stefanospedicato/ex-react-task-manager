import { useGlobalContext } from "../Context/GlobalContext";
import TaskRow from "../Components/TaskRow";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";

const TaskList = () => {
  const { tasks } = useGlobalContext();
  const [sortOrder, setSortOrder] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prevOrder) => -prevOrder);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  };

  const sortedTasks = useMemo(() => {
    const orderMultiplier = sortOrder;

    return [...tasks].sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title) * orderMultiplier;
      } else if (sortBy === "status") {
        const statusOrder = { "To do": 1, Doing: 2, Done: 3 };
        return (
          (statusOrder[a.status] - statusOrder[b.status]) * orderMultiplier
        );
      } else if (sortBy === "createdAt") {
        return (
          (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
          orderMultiplier
        );
      }
      return 0;
    });
  }, [tasks, sortBy, sortOrder]);

  return (
    <div className="container mt-5 new-task p-5 mb-5 uppercase">
      <h1 className="text-center table-title bold">TASK LIST</h1>
      <table className="table text-center border mt-5">
        <thead>
          <tr>
            <th
              onClick={() => handleSort("title")}
              className={`col-4 table-title ${
                sortBy === "title" ? "active" : ""
              }`}
              scope="col"
            >
              NOME
            </th>
            <th
              onClick={() => handleSort("status")}
              className={`col-4 table-title ${
                sortBy === "status" ? "active" : ""
              }`}
              scope="col"
            >
              STATO
            </th>
            <th
              onClick={() => handleSort("createdAt")}
              className={`col-4 table-title ${
                sortBy === "createdAt" ? "active" : ""
              }`}
              scope="col"
            >
              DATA DI CREAZIONE
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center mt-5">
        <Link to="/add-task">
          <button className="btn btn-success">AGGIUNGI UNA NUOVA TASK</button>
        </Link>
      </div>
    </div>
  );
};

export default TaskList;
