import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import Authen from "../screens/Auth";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../screens/Dashboard";
import Calendar from "../screens/Calendar";
import Inventory from "../screens/Inventory";
import OrderHistory from "../screens/OrderHistory";
import UserProfile from "../screens/UserProfile/UserProfile";
import Logout from "../screens/Logout";
import CarDetail from "../screens/CarDetail/CarDetail";
import styles from "./ProtectedRoute.module.scss";

export default function Routes() {
    return (
        <div className={styles.box}>
            <Router>
                <Switch>
                    <Route path="/login" exact component={Authen} />
                    <Route path="/signup" exact component={Authen} />
                    <ProtectedRoute path="/" exact component={Dashboard} />
                    <ProtectedRoute path="/dashboard" component={Dashboard} />
                    <ProtectedRoute path="/calendar" component={Calendar} />
                    <ProtectedRoute path="/inventory" component={Inventory} />
                    <ProtectedRoute path="/carDetail" component={CarDetail} />
                    <ProtectedRoute
                        path="/orderHistory"
                        component={OrderHistory}
                    />
                    <ProtectedRoute
                        path="/userProfile"
                        component={UserProfile}
                    />
                    <ProtectedRoute path="/logout" component={Logout} />
                    <Route>
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}
