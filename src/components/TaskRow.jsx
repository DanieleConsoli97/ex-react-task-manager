const TaskRow = ({task}) => {
  const { title, status, createdAt } = task;
  console.log("Rendering TaskRow:", task);  
  return (
    <tr>
        <td>{title}</td>
        <td className={status && status.replaceAll(" ","")} >{status}</td>
        <td>{createdAt}</td>
    </tr>
  )
}

export default TaskRow