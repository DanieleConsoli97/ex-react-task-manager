//NOTE - "Componente Form per l'aggiunta di nuove task"
const Form = ({ taskName, handleChange, onClickFunction, selectRef, textRef }) => {

    //NOTE - "Simboli non consentiti nel nome della task"
    const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.\<>?/~`

    //NOTE - "Funzione di validazione per il nome della task"
    const validateName = (title) => {
        if (!title || title.trim() === "") {
            return <p style={{ backgroundColor: "lightcoral" }}>Il nome della task non può essere vuoto</p>
        }
        if (title.split("").some((letter) => symbols.includes(letter))) {
            return <p style={{ backgroundColor: "lightcoral" }}>Il nome della task non può contenere simboli speciali.</p>
        }
        return <p style={{ backgroundColor: "lightgreen" }}>Il nome della task è valido.</p>
    }
    
    return (
        <form action="submit" onSubmit={(e) => {
            e.preventDefault();
            onClickFunction()
        }}>
            <label htmlFor="">Nome della Task</label>
            <input onChange={handleChange} type="text" value={taskName} />
            {validateName(taskName)}
            <label htmlFor="">Descrizione</label>
            <textarea ref={textRef} />
            <label htmlFor="">Stato</label>
            <select ref={selectRef} defaultValue={"To do"} name="">
                <option className="Todo" value="To do">To do</option>
                <option className="Doing" value="Doing">Doing</option>
                <option className="Done" value="Done">Done</option>
            </select>
            <button type="submit">Aggiungi</button>
        </form>
    )
}

export default Form
