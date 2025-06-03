import React from "react"
import { useGlobalContext } from "../context/GlobalContext"
import { useParams } from "react-router-dom"
import Modal from "../components/Modal"

const TaskDetail = () => {
    const { id } = useParams()
    const value = useGlobalContext()
    const { Task,removeTask } = value
    const singleTask = Task.find((t) => t.id === parseInt(id))
    
    return (

        <div>
            {/* gestione dello stato di task */}
            {singleTask === undefined && <p>Nessuna task trovata.</p>}
            {singleTask && Task.length === 0 && <p>Nessuna task trovata</p>}
            {singleTask && singleTask?.id && (
                <div>
                    <p> {singleTask.title}</p>
                    <p>{singleTask.description}</p>
                    <p>{singleTask.status}</p>
                    <p>{singleTask.createdAt}</p>
                    <button onClick={()=>{removeTask(id)}}>Elimino Task</button>
                </div>
            )}
            {
                <Modal></Modal>
            }
        </div>
    )
}

export default TaskDetail