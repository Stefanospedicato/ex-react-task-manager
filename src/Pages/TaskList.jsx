import { useGlobalContext } from "../Context/GlobalContext";
import TaskRow from "../Components/TaskRow";
import { Link } from "react-router-dom";

const TaskList = () => {
  const { tasks } = useGlobalContext();

  return (
    <div className="container mt-5 new-task p-5 mb-5 uppercase">
      <h1 className="text-center table-title bold">TASK LIST</h1>
      <table className="table text-center border mt-5">
        <thead>
          <tr>
            <th className="col-4 table-title" scope="col">
              NOME
            </th>
            <th className="col-4 table-title" scope="col">
              STATO
            </th>
            <th className="col-4 table-title" scope="col">
              DATA DI CREAZIONE
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center mt-5">
        <Link to="/add-task">
          <button className="btn btn-success ">AGGIUNGI UNA NUOVA TASK</button>
        </Link>
      </div>
    </div>
  );
};

export default TaskList;
