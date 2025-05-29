import { createContext, useContext, useState,useEffect } from "react"

const GlobalContext = createContext()


function GlobalProvider({ children }) {
    const BASE_URL = import.meta.env.VITE_BASE_URL_SERVER;
    const [Task,SetTask] = useState()
 
    const fetchData = async () => {
       
        try {
            const response = await fetch(`${BASE_URL}/tasks`);
            const data = await response.json();
            SetTask(data)
            console.log("Data fetched successfully:", data);
        } catch (error) { 
            console.error("Error fetching data:", error);
            SetTask(null);
        }
    }
    useEffect(() => { fetchData() }, []);

   const addTask =  () => {}
   const removeTask = ()=>{}
   const  updateTask = ()=>{}

    const value = {
        fetchData,
        Task,
        addTask,
        removeTask,
        updateTask
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext }