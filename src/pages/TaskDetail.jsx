import React from "react"
import { useGlobalContext } from "../context/GlobalContext"
import { useParams } from "react-router-dom"
import Modal from "../components/Modal"

const TaskDetail = () => {
    const { id } = useParams()
    const value = useGlobalContext()
    const { Task, removeTask, showModal, setShowModal } = value
    const singleTask = Task.find((t) => t.id === parseInt(id))

    const modalProps = {
        title: "Elimina Task",
        content: "Sei sicuro di voler eliminare definitivamente la task?",
        show: showModal,
        onClose: () => { setShowModal((curr) => curr = curr ? false : true) },
        onConfirm: () =>removeTask(id) ,
        confirmText: "Conferma ❌"
    }
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
                    <button
                        onClick={() => { setShowModal((curr) => curr = curr ? false : true) }}
                    >Elimina Task
                    </button>
                </div>
            )}
            
            {

                <Modal  {...modalProps} />
            }
        </div>
    )
}

export default TaskDetail