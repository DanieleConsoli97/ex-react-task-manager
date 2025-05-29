import { useEffect } from "react";

const Form = ({taskName, handleChange, onClickFunction, selectRef, textRef }) => {

    const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~`


    const validateName = (name) => {

        if (!name || name.trim() === "") {
    
            return <p style={{backgroundColor:"lightcoral"}}>Il nome della task non può essere vuoto</p>
        }
           

        if (name.split("").some((letter) => symbols.includes(letter))) {
            console.log(name.split("").some((letter) => symbols.includes(letter)))
            return <p  style={{backgroundColor:"lightcoral"}}>Il nome della task non può contenere simboli speciali.</p>

        }

        return <p style={{backgroundColor:"lightgreen"}}>Il nome della task è valido.</p>

    }
    return (
        <form action="submit" onSubmit={(e) => {
            onClickFunction(e)
            
        }}>
            <label htmlFor="">Nome della Task</label>
            <input onChange={handleChange} type="text" />
            {validateName(taskName)} 
            <label htmlFor="">Descrizione</label>
            <textarea ref={textRef} />
            <label htmlFor="">Stato</label>
            <select  ref={selectRef} defaultValue={"To do"} name="" id="">
                <option className="Todo" value="To do">To do</option>
                <option className="Doing"  value="Doing">Doing</option>
                <option className="Done" value="Done">Done</option>
            </select>
            <button type="submit">Aggiungi</button>
        </form>
    )
}

export default Form
