import React from "react";
import Auth from "./pages/Auth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Auth} />
            </Switch>
        </Router>
    );
}

export default App;
