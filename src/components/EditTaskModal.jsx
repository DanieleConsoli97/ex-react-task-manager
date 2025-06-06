
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
            <label htmlFor="">Nome Task <Dock /></label>
            <input onChange={(e) => setTitle(() => e.target.value)} value={title} type="text" />
            <label htmlFor="">Descrizione <FileText /></label>
            <textarea onChange={(e) => setDescription(() => e.target.value)} value={description} name="" id="">
            </textarea>
            <label htmlFor="">Stato Task <ListTree /></label>
            <select onChange={(e) => setStatus(() => e.target.value)} value={status} name="" id="">
                <option value="To do">To do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
            </select>
        </form>
    </>)



    const modalProps = {
        title: <h1>Modifica Task <FilePenLine /> </h1>,
        content: form,
        show: true,
        onConfirm: () => formRef.current?.requestSubmit(),
        confirmText: (
            <>
                <span>Conferma</span>
                <FileCheck2 /> 
            </>
        )
    }

    return (
        <>
            <button onClick={onClose}> Modifica Task <FilePenLine /></button>


            {show && (
                <Modal {...modalProps} />
            )
            }
        </>
    )
}

export default EditTaskModal