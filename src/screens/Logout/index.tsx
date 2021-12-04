import { useEffect } from "react";
import { logout } from "../../services/auth";

function Logout(props: any) {
    useEffect(() => {
        logout();
        props.history.replace("/login");
    });
    return <h1>You have logged out</h1>;
}
export default Logout;
