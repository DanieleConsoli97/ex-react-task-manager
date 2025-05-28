function TaskList({ children }) {
  return (
    <>
    <div className="task-manager">
      {/* NavBar viene renderizzato qui come children */}
      {children}
      
      <div className="tasks-container">
        <h2>Add Task</h2>
        {/* Logica della lista task */}
      </div>
    </div>
    </>
  );
}

export default TaskList;