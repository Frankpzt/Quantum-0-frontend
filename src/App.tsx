import { BrowserRouter as Router } from "react-router-dom";
import style from "./App.module.scss";
import Routes from "./routes";

function App() {
    return (
        <div className={style.App}>
            <Router>
                <Routes />
            </Router>
        </div>
    );
}

export default App;
