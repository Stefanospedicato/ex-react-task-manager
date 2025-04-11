import dayjs from "dayjs";
import React from "react";

const TaskRow = React.memo(({ task }) => {
  const { title, status, createdAt } = task;

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
      <td>{title}</td>
      <td className={getStatusClass(status)}>{status}</td>
      <td>{dayjs(createdAt).format("dddd, MMMM D, YYYY h:mm A")}</td>
    </tr>
  );
});

export default TaskRow;
