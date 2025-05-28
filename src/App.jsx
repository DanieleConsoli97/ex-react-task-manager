import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import DefaultLayout from "./layout/DefaultLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout/>}>
          <Route path="/" element={<TaskList />}/>
          <Route path="/addTask" element={<AddTask/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;