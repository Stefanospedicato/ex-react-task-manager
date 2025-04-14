import { useGlobalContext } from "../Context/GlobalContext";
import TaskRow from "../Components/TaskRow";

const TaskList = () => {
  const { tasks } = useGlobalContext();

  return (
    <div className="container mt-5">
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
    </div>
  );
};

export default TaskList;
