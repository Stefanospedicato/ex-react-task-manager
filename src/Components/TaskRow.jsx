import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";

const TaskRow = React.memo(({ task }) => {
  const { id, title, status, createdAt } = task;

  const getStatusClass = (status) => {
    switch (status) {
      case "To do":
        return "table-danger";
      case "Doing":
        return "table-warning";
      case "Done":
        return "table-success";
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
