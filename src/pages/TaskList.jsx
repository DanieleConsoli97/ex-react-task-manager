import { memo, useCallback, useMemo, useState } from "react"
import { useGlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow"
import { Dock, FileClock, FileSearch, ListTree } from "lucide-react"

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

  const debounceUsecall = useCallback(debouncefunc((e) => handleChange(e), 300), [])

  const sortedTask = useMemo(() => {
    if (Task) {
const copyTask = [...Task]


    if (sortBy === "name") {
      return copyTask.sort((a, b) => sortOrder * a.title.localeCompare(b.title))
    }

    if (sortBy === "state") {
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
    }
    

  }, [Task, sortBy, sortOrder])

  console.log(searchQuery)
  return (
    <>
      {/* gestione dello stato di task */}
      {Task === null && ("nessuna task trovata")}
      {Task === undefined && <p>Loading...</p>}
      {Task && Task.length === 0 && <p>Nessuna task trovata</p>}
      {Task && Task.length > 0 &&(
      <div className="container">
              <div className="row justify-content-center">
                <div className="col-8">
                  <div className="row py-3">
                    <div className="col-5 ">
                      <label className="fs-3" htmlFor="">Cerca la tua task <FileSearch size={"2rem"} /></label>
                    </div>
                    <div className="col-7 align-self-center">
                      <input className="w-100" onChange={debounceUsecall} type="text" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-8 ">
                  <table className="table w-100">
                    <thead>
                      <tr>
                        <th><button className="btn btn-secondary w-100" onClick={() => handleSort("name")}>Nome Task <Dock /></button> </th>
                        <th><button className="btn btn-secondary w-100" onClick={() => handleSort("state")}>Stato <ListTree /></button></th>
                        <th><button className="btn btn-secondary w-100" onClick={() => handleSort("createdAt")}>Data di Creazione<FileClock /></button></th>
                      </tr>
                    </thead>
                    <tbody>
                      {Task && sortedTask?.filter((t) => t.title.includes(searchQuery)).map((task) => {
                        return <TaskRowMemo key={task.id} task={task} />
                      })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>)
      }
    </>
  )
}

export default TaskList
