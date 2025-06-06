
import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
const DefaultLayout = () => {
    return (
        <>
            <NavBar />
            <main className="container">
                <Outlet />
            </main>
        </>
    )
}

export default DefaultLayout