import { NavLink } from "react-router-dom";
import styles from "./index.module.scss";

const NavBar = () => (
    <nav className={styles.AuthenNav}>
        <ul>
            <li>
                <NavLink exact to="/login" activeClassName={styles.active}>
                    SIGN IN
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/signup" activeClassName={styles.active}>
                    SIGN UP
                </NavLink>
            </li>
        </ul>
    </nav>
);

export default NavBar;
