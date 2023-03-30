import { Link } from "react-router-dom";
import './Navbar.scss';

const Navbar = () => {
    return (
        <div className="navBar">
            <header className="container">
                <Link className="logo" to='/'>TASK MANAGER</Link>
                <div className="nav_menu">
                    <Link className="nav_item" to='/employees'>Employees</Link>
                    <Link className="nav_item" to='/tasks'>Tasks</Link>
                </div>
            </header>
        </div>
    )
}

export default Navbar