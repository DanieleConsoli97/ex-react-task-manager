import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import DefaultLayout from "./layout/DefaultLayout";
import { GlobalProvider } from "./context/GlobalContext";
function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<TaskList />} />
            <Route path="/addTask" element={<AddTask />} />
          </Route>
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;