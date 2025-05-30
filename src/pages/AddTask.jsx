import { useGlobalContext } from "../context/GlobalContext";
import { useRef, useState } from "react";
import Form from "../components/Form";

function TaskList() {
  const { addTask } = useGlobalContext()
  const [taskName, setNameTask] = useState("")
  const Select = useRef()
  const textArea = useRef()

  const handleChange = (e) => {
    setNameTask(e.target.value);
  }

  const handleSubmit = async () => {
    const task = { title: taskName, description: textArea.current.value, status: Select.current.value }
    try {
      const success = await addTask(task)
      console.log(success)
      if (success) {
        setNameTask("")
        textArea.current.value = ""
        Select.current.value = "To do"
      }

    } catch (error) {
      alert(error)
      throw new Error(error);
    }

  }
  return (
    <>
      <Form taskName={taskName} handleChange={handleChange} onClickFunction={handleSubmit} selectRef={Select} textRef={textArea} />

    </>
  )
}

export default TaskList;