import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const useTask = () => {
    const navigate = useNavigate()
    const BASE_URL = import.meta.env.VITE_BASE_URL_SERVER;

    const [Task, SetTask] = useState([])


    //FUNCTION - fetch tasks
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

    //FUNCTION - fetch add, remove, update tasks

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

    //FUNCTION - removeTask

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
                navigate("/")
                return true
            }

        } catch (error) {
            alert("Error remove task: " + error.message)
            throw new Error("Error remove task: " + error.message);

        }
        return false;
    }

    //FUNCTION - UpdateTask

    /**
       * Update Task.
       * @param {number} id - id task.
       * @param {object} obj - Il secondo numero da sommare.
       * @returns {boolean} true/false.
   */

    const updateTask = async (id, obj) => {
        try {
            console.log(id)
            console.log(obj)
            const response = await fetch(`${BASE_URL}/tasks/${id}`, {
                method: 'PUT',
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
                alert("task Modificata")
                fetchData()
                return true
            }

        } catch (error) {
            alert("Error Update task: " + error.message)
            throw new Error("Error Update task: " + error.message);
        }
        return false;
    }
    return {
        fetchData,
        Task,
        addTask,
        removeTask,
        updateTask
    }
}

export default useTask