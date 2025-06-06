import { Link } from "react-router-dom";
import dayjs from "dayjs";
const TaskRow = ({task}) => {
  const statusClassMap = {
  Done: "table-success",
  Doing: "table-warning",
  "To do": "table-danger"
};
  const { id, title, status, createdAt } = task;
  console.log("Rendering TaskRow:", task);  
  return (
    <tr className="text-center">
        <td><Link className="text-decoration-none text-reset" to={`/Task/${id}`} >{ title }</Link></td>
        <td className={ statusClassMap[status] || "" } >{status}</td>
        <td>{ dayjs(createdAt).format('DD/MM/YYYY') }</td>
    </tr>
  )
}

export default TaskRow