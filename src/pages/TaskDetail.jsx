import React, { useState } from "react"
import { useGlobalContext } from "../context/GlobalContext"
import { useParams } from "react-router-dom"
import Modal from "../components/Modal"
import EditTaskModal from "../components/EditTaskModal"
import dayjs from "dayjs"
import { FileX2, FileX } from "lucide-react"

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
        confirmText: (
            <>
                <span>Conferma <FileX2 /> </span>
            </>


        )
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
                <div className="card text-center mt-5">
                    <div className="card-header">
                        {singleTask.title}
                    </div>
                    <div className="card-body py-4">
                        <p className="card-header">Destrizione</p>
                        <p className="card-text">{singleTask.description}</p>
                        <p className="card-header">Stato</p>
                        <p className="card-text">{singleTask.status}</p>
                        <p className="card-header">Data di creazione</p>
                        <p>{dayjs(singleTask.createdAt).format('DD/MM/YYYY')}</p>
                        <button
                            className="btn btn-secondary me-2"
                            onClick={() => { setShowModal((curr) => curr = curr ? false : true) }}
                        >Elimina Task <FileX />
                        </button>
                        <Modal  {...modalProps} />
                        <EditTaskModal {...editModalTask} />
                    </div>

                </div>
            )}
        </div>
    )
}

export default TaskDetail
