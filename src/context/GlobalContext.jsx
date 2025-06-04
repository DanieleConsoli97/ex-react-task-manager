import { createContext, useContext, useState } from "react"
import useTask from "../hooks/useTask";

const GlobalContext = createContext()

function GlobalProvider({ children }) {

  

    const dataTask = useTask()

    //NOTE - Export value

    const value = {
        ...dataTask,
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext }