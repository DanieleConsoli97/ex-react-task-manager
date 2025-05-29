import { useGlobalContext } from "../context/GlobalContext";
import { useRef, useState } from "react";
import Form from "../components/Form";
function TaskList() {

  const [taskName, setNameTask] = useState("")
  const [task, setTask] = useState({})
  const Select = useRef()
  const textArea = useRef()

  const handleChange = (e) => {
    setNameTask(e.target.value);
    console.log(taskName);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setTask(() => {
      const task = { name: taskName, description: textArea.current.value, state: Select.current.value }
      console.log("Task submitted:", task)
      return task
    }
    );
  }
  return (
    <>
      {
        task && <p>Task Name: {task.name}</p>
      }
      <Form taskName={taskName} handleChange={handleChange} onClickFunction={handleSubmit} selectRef={Select} textRef={textArea} />
    </>
  );
}

export default TaskList;