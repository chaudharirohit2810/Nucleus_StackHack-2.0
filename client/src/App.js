import React from "react";
import Auth from "./pages/Auth";
import Employee from "./pages/Employee";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Auth} />
                <Route exact path="/employee" component={Employee} />
            </Switch>
        </Router>
    );
}

export default App;
