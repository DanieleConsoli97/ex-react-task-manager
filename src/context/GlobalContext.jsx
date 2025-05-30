import { createContext, useContext, useState,useEffect } from "react"

const GlobalContext = createContext()


function GlobalProvider({ children }) {
    const BASE_URL = import.meta.env.VITE_BASE_URL_SERVER;
    const defaultTask = {
        title:"",
        description:"",
        status:"To do"
    }
    const [Task,SetTask] = useState(defaultTask)
 
    const fetchData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/tasks`);
            const data = await response.json();
            SetTask( ()=> data )
            console.log("Data fetched successfully:", data);
        } catch (error) { 
            console.error("Error fetching data:", error);
            SetTask(null);
        }
    }
    useEffect(() => { fetchData() }, []);

   const addTask = async (obj) => {
    try {
        const response = await fetch(`${BASE_URL}/tasks`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        SetTask( ()=> data )
    } catch (error) {
        throw new Error("Error adding task: " + error.message);
        
    }
   }
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