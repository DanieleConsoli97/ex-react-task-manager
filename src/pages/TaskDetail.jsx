import React, { useState } from "react"
import { useGlobalContext } from "../context/GlobalContext"
import { useParams } from "react-router-dom"
import Modal from "../components/Modal"
import EditTaskModal from "../components/EditTaskModal"
import dayjs from "dayjs"

const TaskDetail = () => {

    const { id } = useParams()
    const value = useGlobalContext()
    const { Task, removeTask, updateTask } = value
    const [showModal, setShowModal] = useState(false)
    const [showModalEditTask, setShowModalEditTask] = useState(false)
    const singleTask = Task.find((t) => t.id === parseInt(id))

    const modalProps = {
        title: "Elimina Task",
        content: "Sei sicuro di voler eliminare definitivamente la task?",
        show: showModal,
        onClose: () => { setShowModal((curr) => curr = curr ? false : true) },
        onConfirm: () => removeTask(id),
        confirmText: "Conferma ❌"
    }

    const editModalTask = {
        show: showModalEditTask,
        onClose: () => { setShowModalEditTask((curr) => curr = curr ? false : true) },
        onSave: (id, obj) => updateTask(id, obj),
        task: Task.find((t) => t.id === parseInt(id))

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
                    <p>{dayjs(singleTask.createdAt).format('DD/MM/YYYY')}</p>
                    <button
                        onClick={() => { setShowModal((curr) => curr = curr ? false : true) }}
                    >Elimina Task
                    </button>
                </div>
            )}
            <Modal  {...modalProps} />
            <EditTaskModal {...editModalTask} />
        </div>
    )
}

export default TaskDetail