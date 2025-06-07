
import { Dock, FileCheck2, FilePenLine, FileText, ListTree } from "lucide-react";
import Modal from "./Modal"

import { useState, useEffect, useRef } from "react"

const EditTaskModal = (props) => {

    const { show, onClose, task, onSave } = props

    const [title, setTitle] = useState(task?.title);
    const [description, setDescription] = useState(task?.description);
    const [status, setStatus] = useState(task?.status);

    useEffect(() => {
        if (task) {
            setTitle(task.title || "");
            setDescription(task.description || "");
            setStatus(task.status || "To do");
        }
    }, [task]);


    const formRef = useRef()

    const form = (<>
        <form ref={formRef} onSubmit={(e) => {
            e.preventDefault()

            const obj = {
                title: title,
                description: description,
                status: status
            }
            onSave(parseInt(task?.id), obj)
            onClose()
        }
        }>
            <div>
                <div className="mb-3 text-center fs-3">
                    <label className="form-label" htmlFor="">Nome Task <Dock /></label>
                    <input className="form-control fs-4 text-center" onChange={(e) => setTitle(() => e.target.value)} value={title} type="text" />
                </div>
                <div>
                    <label className="mb-3 text-center fs-3" htmlFor="">Descrizione <FileText /></label>
                    <textarea className="form-control fs-4 text-center" onChange={(e) => setDescription(() => e.target.value)} value={description} name="" id="">
                    </textarea>
                </div>
                <div>
                    <label className="form-label " htmlFor="">Stato Task <ListTree /></label>
                    <select className="form-control fs-4 text-center" onChange={(e) => setStatus(() => e.target.value)} value={status} name="" id="">
                        <option className="bg-danger-subtle" value="To do">To do</option>
                        <option className="bg-warning-subtle" value="Doing">Doing</option>
                        <option className="bg-success-subtle" value="Done">Done</option>
                    </select>
                </div>
            </div>
        </form>
    </>)



    const modalProps = {
        title: (
            <h1 className="d-flex align-items-center justify-content-center gap-2">
                Modifica Task <FilePenLine />
            </h1>
        ),
        content: form,
        show: show,
        onClose: onClose,
        onConfirm: () => formRef.current?.requestSubmit(),
        confirmText: (
            <span className="d-flex align-items-center justify-content-center gap-2">
                Conferma <FileCheck2 />
            </span>
        ),
    }

    return (
        <>
            <button className="btn btn-secondary ms-2" onClick={onClose}> Modifica Task <FilePenLine /></button>


            {show && (
                <Modal {...modalProps} />
            )
            }
        </>
    )
}

export default EditTaskModal