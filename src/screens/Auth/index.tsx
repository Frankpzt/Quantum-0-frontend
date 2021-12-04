import { useLocation } from "react-router-dom";
import Signin from "./SignIn/SignIn";
import Signup from "./SignUp/SignUp";
import NavBar from "../../layouts/AuthNav";
import LeftLogo from "../../layouts/LeftLogo";
import styles from "./index.module.scss";

const Authen = () => {
    const location = useLocation();
    return (
        <div className={styles.container}>
            <div className={styles.sideLogo}>
                <LeftLogo />
            </div>
            <div className={styles.authField}>
                <div className={styles.navField}>
                    <NavBar />
                </div>
                <div className={styles.authForm}>
                    {location.pathname === "/login" ? <Signin /> : <Signup />}
                </div>
            </div>
        </div>
    );
};

export default Authen;
