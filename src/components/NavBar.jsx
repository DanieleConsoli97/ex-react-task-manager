import { NavLink, Link } from "react-router-dom";
function NavBar() {
  
    return (
        <nav>
            <NavLink to={"/"} >
                Task List
                
            </NavLink>
            <NavLink to={"/addTask"} >
               Add Task
            </NavLink>
        </nav>
    );
}


export default NavBar;