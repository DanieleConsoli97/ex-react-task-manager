import { memo, useCallback, useMemo, useState } from "react"
import { useGlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow"

const TaskList = () => {

  const value = useGlobalContext()
  const { Task } = value
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState(1)
  const TaskRowMemo = memo(TaskRow)
  const [searchQuery, SetSearchQuery] = useState("")

  const handleSort = (type) => {
    if (sortBy === type) {

      setSortOrder(prev => prev * -1)
    } else {

      setSortBy(type)
      setSortOrder(1)
    }
  }

  const handleChange = (e) => {

    SetSearchQuery(() => e.target.value)

  }

  const debouncefunc = (callBack, delay) => {
    let timeout
    return (value) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        callBack(value)
      }, delay)
    }
  }

  const debounceUsecall = useCallback(debouncefunc((e)=>handleChange(e),300),[])

  const sortedTask = useMemo(() => {

    const copyTask = [...Task]


    if (sortBy === "name") {
      return copyTask.sort((a, b) => sortOrder * a.title.localeCompare(b.title))
    }

    if (sortBy === "state") {
      console.log("stato")
      const statusOrder = {
        'To do': 0,
        'Doing': 1,
        'Done': 2
      };

      const orderObb = copyTask.sort((a, b) => sortOrder * (statusOrder[a.status] - statusOrder[b.status]))

      return orderObb
    }

    if (sortBy === "createdAt") {

      const orderObb = copyTask.sort((a, b) => sortOrder * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))

      return orderObb
    }

    return copyTask

  }, [Task, sortBy, sortOrder])

  console.log(searchQuery)
  return (
    <>
      {/* gestione dello stato di task */}
      {Task === null && ("nessuna task trovata")}
      {Task === undefined && <p>Loading...</p>}
      {Task && Task.length === 0 && <p>Nessuna task trovata</p>}
      <label htmlFor="">Cerca la tua task </label>
      <input onChange={debounceUsecall} type="text" />
      <table>
        <thead>
          <tr>
            <th><button onClick={() => handleSort("name")}>Nome</button></th>
            <th><button onClick={() => handleSort("state")}>Stato</button></th>
            <th><button onClick={() => handleSort("createdAt")}>Data di Creazione</button></th>

          </tr>
        </thead>
        <tbody>
          {Task && sortedTask?.filter((t) => t.title.includes(searchQuery)).map((task) => {
            return <TaskRowMemo key={task.id} task={task} />
          })
          }
        </tbody>
      </table>
    </>
  )
}

export default TaskList
