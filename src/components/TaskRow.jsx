import { Link } from "react-router-dom";
const TaskRow = ({task}) => {
  
  const { id, title, status, createdAt } = task;
  console.log("Rendering TaskRow:", task);  
  return (
    <tr>
        <td><Link to={`/Task/${id}`} >{ title }</Link></td>
        <td className={ status && status.replaceAll(" ","") } >{status}</td>
        <td>{ createdAt }</td>
    </tr>
  )
}

export default TaskRow