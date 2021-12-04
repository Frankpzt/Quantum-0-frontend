import { NavLink } from "react-router-dom";

const NavBar = () => (
    <nav>
        <li>
            <NavLink to="/signup">Sign Up</NavLink>
        </li>
        <li>
            <NavLink to="/login">Sign In</NavLink>
        </li>
        <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
            <NavLink to="/calendar">Calendar</NavLink>
        </li>
        <li>
            <NavLink to="/inventory">Inventory</NavLink>
        </li>
        <li>
            <NavLink to="/orderHistory">Order History</NavLink>
        </li>
        <li>
            <NavLink to="/userProfile">User Profile</NavLink>
        </li>
        <li>
            <NavLink to="/logout">Logout</NavLink>
        </li>
    </nav>
);

export default NavBar;
