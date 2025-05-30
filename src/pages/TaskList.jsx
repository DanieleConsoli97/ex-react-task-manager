import { memo } from "react"
import { useGlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow"

const TaskList = () => {
  const value = useGlobalContext()
  const { Task} = value

  

  const TaskRowMemo = memo(TaskRow)

  return (
    <>
      {/* gestione dello stato di task */}
      {Task === null && ("nessuna task trovata")}
      {Task === undefined && <p>Loading...</p>}
      {Task && Task.length === 0 && <p>Nessuna task trovata</p>}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Stato</th>
            <th>Data di Creazione</th>
          </tr>
        </thead>
        <tbody>
          {Task && Task?.map((task) => {
            return <TaskRowMemo key={task.id} task={task} />
          })}
        </tbody>
      </table>
    </>
  )
}

export default TaskList
