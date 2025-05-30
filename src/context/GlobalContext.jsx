import { createContext, useContext, useState, useEffect } from "react"

const GlobalContext = createContext()

function GlobalProvider({ children }) {

    const BASE_URL = import.meta.env.VITE_BASE_URL_SERVER;
    
    const [Task, SetTask] = useState()

    //NOTE - fetch tasks

    const fetchData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/tasks`);
            const data = await response.json();
            if (response.ok) {
            SetTask( ()=> data )
            console.log("Data fetched successfully:", data);
        }
            
        } catch (error) {
            console.error("Error fetching data:", error);
            SetTask();
        }
    }
    useEffect(() => { fetchData() }, []);

    //NOTE - fetch add, remove, update tasks

    const addTask = async (obj) => {
        
        try {
        
            const response = await fetch(`${BASE_URL}/tasks`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            })

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            
            console.log(responseData)
            
            if (responseData.success) {
                console.log("task Creata",responseData.task)
                fetchData()
            }
            if (!responseData.success) {
                throw new Error(response.success);
            }
        } catch (error) {
            throw new Error("Error adding task: " + error.message);
        }

    }
    const removeTask = () => { }
    
    const updateTask = () => { }
    
    //NOTE - Export value
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