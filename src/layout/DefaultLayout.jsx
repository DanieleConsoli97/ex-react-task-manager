
import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
const DefaultLayout = () => {
    return (
    <>
        <NavBar />
        <Outlet />
    </>
    )
}

export default DefaultLayout