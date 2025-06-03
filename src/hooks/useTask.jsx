import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const useTask = () => {
    const navigate=useNavigate()
  const BASE_URL = import.meta.env.VITE_BASE_URL_SERVER;

    const [Task, SetTask] = useState([])

    //NOTE - fetch tasks

    const fetchData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/tasks`);
            const data = await response.json();
            if (response.ok) {
                SetTask(() => data)
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

            const response = await fetch(`${BASE_URL}/tasks`, {
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
                fetchData()
                alert("task Creata")
                return true
            }

            if (!responseData.success) {
                throw new Error(response.success)
            }

        } catch (error) {
            throw new Error("Error adding task: " + error.message);
        }

        return false;
    }

    const removeTask = async (id) => {
        try {

            const response = await fetch(`${BASE_URL}/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();

            console.log(responseData)

            if (responseData.success) {
                alert("task Eliminata")
                fetchData()
                navigate ("/")
                return true
            }

            

        } catch (error) {
            alert("Error remove task: " + error.message)
            throw new Error("Error remove task: " + error.message);
            
        }
        return false;
    }
    

    const updateTask = () => { }

    return {
        fetchData,
        Task,
        addTask,
        removeTask,
        updateTask
    }
}

export default useTask