import { useGlobalContext } from "../context/GlobalContext";
function TaskList() {
  const { prova } = useGlobalContext();
  console.log(prova); // Stampa "prova" dalla context
  return (
    <>
    <div className="task-manager">
      {/* NavBar viene renderizzato qui come children */}
      <div className="tasks-container">
        <h2>Add Task</h2>
        {/* Logica della lista task */}
      </div>
    </div>
    </>
  );
}

export default TaskList;