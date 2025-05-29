import { useEffect } from "react"
import {useGlobalContext} from "../context/GlobalContext"

const TaskList = () => {
  const value  = useGlobalContext()
  const {Task,fetchData} = value 
  
  console.log(Task)
  useEffect(() => {fetchData()},[])

  return (
    <>
    {/* gestione dello stato di task */}
    {Task === null  && ("nessuna task trovata") }
    {Task === undefined && <p>Loading...</p>}
    {Task && Task.length === 0 && <p>Nessuna task trovata</p>}
    {Task && Task.map((task) => (
      <div key={task.id}>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
      </div>
    ))}

    
    </>
  )
}

export default TaskList
