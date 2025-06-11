import { Dock, FilePlus2, FileSearch, ListTree, MessageSquareDiff } from "lucide-react"

//NOTE - "Componente Form per l'aggiunta di nuove task"
const Form = ({ taskName, handleChange, onClickFunction, selectRef, textRef }) => {

    //NOTE - "Simboli non consentiti nel nome della task"
    const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.\<>?/~`

    //NOTE - "Funzione di validazione per il nome della task"
    const validateName = (title) => {
        if (!title || title.trim() === "") {
            return <p className="bg-danger-subtle text-center rounded fs-4">Il nome della task non può essere vuoto</p>
        }
        if (title.split("").some((letter) => symbols.includes(letter))) {
            return <p className="bg-danger-subtle text-center rounded fs-4">Il nome della task non può contenere simboli speciali.</p>
        }
        return <p className="bg-success-subtle text-center rounded fs-4">Il nome della task è valido.</p>
    }

    return (
        <form className="my-5" action="submit" onSubmit={(e) => {
            e.preventDefault();
            onClickFunction()
        }}>
            <div className="mb-3 text-center fs-3">
                <label className="form-label " htmlFor="">Nome della Task <Dock /></label>
                <input className="form-control fs-4 text-center" onChange={handleChange} type="text" value={taskName} />
                {validateName(taskName)}
            </div>

            <div className="mb-3 text-center fs-3">
                <label className="form-label " htmlFor="">Descrizione <MessageSquareDiff /></label>
                <textarea className="form-control fs-4 text-center" ref={textRef} />
            </div>
            <div className="mb-3 text-center fs-3">
                <label className="form-label" htmlFor="">Stato <ListTree /></label>
                <select className="form-control text-center fs-4" ref={selectRef} defaultValue={"To do"} name="">
                    <option className="bg-danger-subtle" value="To do">To do</option>
                    <option className="bg-warning-subtle" value="Doing">Doing</option>
                    <option className="bg-success-subtle" value="Done">Done</option>
                </select>
                <button disabled={!taskName.trim()} className="btn btn-secondary mt-4 fs-3" type="submit">Aggiungi Task <FilePlus2 /></button>
            </div>

        </form>
    )
}

export default Form
