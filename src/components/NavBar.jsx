import { AppWindow, FolderPlus } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
function NavBar() {

    return (
        <nav className="navbar navbar-expand bg-dark nav-underline nav-fill p-4" data-bs-theme="dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item fs-3">
                            <NavLink
                                className={"nav-link"}
                                to={"/"}
                            >Task List <AppWindow />
                            </NavLink>
                        </li >
                        <li className="nav-item fs-3">
                            <NavLink
                                className={"nav-link"}
                                to={"/addTask"}
                            >Add Task <FolderPlus />
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}


export default NavBar;