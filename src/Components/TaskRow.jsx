import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";

const TaskRow = React.memo(({ task }) => {
  const { id, title, status, createdAt } = task;

  const getStatusClass = (status) => {
    switch (status) {
      case "To do":
        return "bg-red";
      case "Doing":
        return "bg-yellow";
      case "Done":
        return "bg-green";
      default:
        return "";
    }
  };

  return (
    <tr>
      <td>
        <Link to={`task/${id}`}>{title}</Link>
      </td>
      <td className={getStatusClass(status)}>{status}</td>
      <td>{dayjs(createdAt).format("DD/MM/YYYY")}</td>
    </tr>
  );
});

export default TaskRow;
