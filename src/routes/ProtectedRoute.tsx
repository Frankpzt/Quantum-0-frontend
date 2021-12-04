import { useState } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/routerAuth";
import styles from "./ProtectedRoute.module.scss";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";

const ProtectedRoute = (props: any) => {
    const location = useLocation();
    const [isNavigationUnfolded, setIsNavigationUnfolded] = useState(true);

    if (isAuthenticated()) {
        return (
            <div className={styles.container}>
                <Header IsNavigationUnfolded={isNavigationUnfolded} />
                <main className={styles.content}>
                    <Sidebar
                        IsNavigationUnfolded={isNavigationUnfolded}
                        setIsNavigationUnfolded={setIsNavigationUnfolded}
                    />
                    <Route {...props} />
                </main>
            </div>
        );
    }
    return <Redirect to="/login" from={location.pathname} />;
};

export default ProtectedRoute;
