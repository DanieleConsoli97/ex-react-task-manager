import { createContext, useContext, useState } from "react"

const GlobalContext = createContext()


function GlobalProvider({ children }) {
    
    const BASE_URL = import.meta.env.VITE_BASE_URL_SERVER;
    const [Task,SetTask] = useState()
 
    const fetchData = async () => {
       
        try {
            const response = await fetch(`${BASE_URL}/tasks`);
            const data = await response.json();
            SetTask(data)
        } catch (error) { 
            console.error("Error fetching data:", error);
            SetTask(null);
        }
    }
    const value = {
        fetchData,
        Task,
        prova: "prova",
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext }