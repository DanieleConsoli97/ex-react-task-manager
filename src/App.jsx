import { Route, Router, BrowserRouter, Routes } from "react-router-dom"
import TaskList from "./components/TaskList";
function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<></>}
        />
      </Routes>
    </BrowserRouter >

  )
}

export default App
